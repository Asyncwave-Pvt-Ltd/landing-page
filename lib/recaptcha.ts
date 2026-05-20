export const verifyRecaptcha = async (recaptchaToken: string) => {
  try {
    const recaptchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SITE_SECRET_KEY || "",
          response: recaptchaToken,
        }),
      }
    );

    const recaptchaData = await recaptchaResponse.json();
    return recaptchaData.success;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
};

export default verifyRecaptcha;
