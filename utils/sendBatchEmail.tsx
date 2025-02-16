import { CreateBatchOptions, CreateEmailOptions, Resend } from "resend";

export async function sendBatchEmails(
  apiKey: string,
  subject: string,
  emails: string[],
  html: string
) {
  const errStr =
    "An error occurred while sending the emails. Please try again.";

  try {
    // Instantiate the Resend client
    const resend = new Resend(apiKey);

    // Send the emails
    const sendEmailList: CreateBatchOptions = [];

    emails.forEach((email: string) => {
        const emailOptions: CreateEmailOptions = {
            from: "Me",
            to: email,
            subject,
            html,
        };
        sendEmailList.push(emailOptions);
    });

    console.log(sendEmailList);
    await resend.batch.send(sendEmailList);
  } catch (error) {
    console.error("Error sending emails:", error);
    return errStr;
  }
}
