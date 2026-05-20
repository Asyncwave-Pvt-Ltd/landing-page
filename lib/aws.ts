import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { fromEnv } from "@aws-sdk/credential-providers";

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
});

export const sendEmail = async (params: {
  to: string[];
  subject: string;
  body: string;
}) => {
  try {
    const fromEmail = process.env.AWS_SES_FROM_EMAIL;
    if (!fromEmail) {
      throw new Error("AWS_SES_FROM_EMAIL environment variable is not set");
    }

    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: params.to,
      },
      Message: {
        Body: {
          Text: {
            Data: params.body,
          },
        },
        Subject: {
          Data: params.subject,
        },
      },
      Source: fromEmail,
    });

    const result = await sesClient.send(command);
    return { success: true, messageId: result.MessageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sesClient;
