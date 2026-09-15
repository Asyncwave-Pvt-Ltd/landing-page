import { JWT } from "google-auth-library";

const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

let client: JWT | null = null;

const getClient = () => {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY;
  if (!email || !key) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY environment variables are not set",
    );
  }
  // The key is stored single-line in env, so the literal \n need unescaping.
  client ??= new JWT({
    email,
    key: key.replace(/\\n/g, "\n"),
    scopes: [SCOPE],
  });
  return client;
};

// Rate limits and Google-side blips are worth another go; a bad key or an
// unshared sheet never fixes itself, so those fail straight away.
export const isTransient = (error: unknown) => {
  const status = (error as { status?: number; response?: { status?: number } })
    ?.status;
  const responseStatus = (error as { response?: { status?: number } })?.response
    ?.status;
  const code = status ?? responseStatus;
  // No status at all means the request never landed (DNS, socket, timeout).
  return code === undefined || code === 429 || code >= 500;
};

const RETRY_DELAYS_MS = [500, 1500, 4000];

export const withRetry = async <T>(
  fn: () => Promise<T>,
  delays = RETRY_DELAYS_MS,
): Promise<T> => {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt >= delays.length || !isTransient(error)) throw error;
      console.warn(
        `Sheets append failed (attempt ${attempt + 1}), retrying:`,
        error,
      );
      await new Promise((r) => setTimeout(r, delays[attempt]));
    }
  }
};

export const appendRow = async (row: (string | number)[]) => {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    throw new Error("GOOGLE_SHEET_ID environment variable is not set");
  }
  const range = process.env.GOOGLE_SHEET_RANGE ?? "Sheet1!A:H";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await withRetry(() =>
    getClient().request({ url, method: "POST", data: { values: [row] } }),
  );
  return res.data;
};
