/**
 * Guards the Sheets retry policy. Run: npx tsx lib/sheets.test.ts
 * (retrying a 403 just burns the request budget; not retrying a 429 loses a lead)
 */
import assert from "node:assert";
import { isTransient, withRetry } from "@/lib/sheets";

assert.ok(isTransient({ status: 429 }), "429 not treated as transient");
assert.ok(isTransient({ status: 503 }), "503 not treated as transient");
assert.ok(
  isTransient({ response: { status: 500 } }),
  "nested 500 not treated as transient",
);
assert.ok(isTransient(new Error("socket hang up")), "network error not retried");
assert.ok(!isTransient({ status: 403 }), "403 treated as transient");
assert.ok(!isTransient({ status: 400 }), "400 treated as transient");

const run = async () => {
  let calls = 0;
  const value = await withRetry(async () => {
    calls++;
    if (calls < 3) throw { status: 503 };
    return "ok";
  }, [1, 1, 1]);
  assert.equal(value, "ok", "retry did not return the eventual success");
  assert.equal(calls, 3, `expected 3 attempts, got ${calls}`);

  calls = 0;
  await assert.rejects(
    withRetry(async () => {
      calls++;
      throw { status: 403 };
    }, [1, 1, 1]),
  );
  assert.equal(calls, 1, `permanent error retried ${calls} times`);

  calls = 0;
  await assert.rejects(
    withRetry(async () => {
      calls++;
      throw { status: 500 };
    }, [1, 1, 1]),
  );
  assert.equal(calls, 4, `expected 4 attempts before giving up, got ${calls}`);

  console.log("sheets.test.ts: all assertions passed");
};

run();
