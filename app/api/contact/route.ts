import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { contactFormRequestSchema } from "@/lib/schema";
import { appendRow } from "@/lib/sheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactFormRequestSchema.parse(body);

    const recaptchaOk = await verifyRecaptcha(validatedData.recaptchaToken);
    if (!recaptchaOk) {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed" },
        { status: 400 },
      );
    }

    await appendRow([
      new Date().toISOString(),
      validatedData.fullName,
      validatedData.email,
      validatedData.phone || "N/A",
      validatedData.services.join(", "),
      validatedData.budget,
      validatedData.timeline,
      validatedData.message,
    ]);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error);
      return NextResponse.json(
        { message: "Validation error", errors: validationError.details },
        { status: 400 },
      );
    }
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your submission" },
      { status: 500 },
    );
  }
}
