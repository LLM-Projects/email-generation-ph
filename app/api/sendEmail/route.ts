"use server";

import { CreateBatchOptions, CreateEmailOptions, Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { apiKey, sender_name, sender_email, subject, emails, html } = await req.json();


    if (!apiKey || !sender_email || !sender_email || !subject || !emails || !html) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Instantiate the Resend client
    const resend = new Resend(apiKey);

    // Prepare batch email options
    const sendEmailList: CreateBatchOptions = [];

    emails.forEach((email: string) => {
      const emailOptions: CreateEmailOptions = {
        from: `${sender_name} <${sender_email}>`,
        to: [email],
        subject: subject,
        html: html,
      };
      sendEmailList.push(emailOptions);
    });

    // Send batch emails
    const { data, error } = await resend.batch.send(sendEmailList);

    if (error) {
      console.error("Resend API error:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Unexpected error sending emails:", error);
    return Response.json(
      { error: `An error occurred while sending the emails. Error: ${error}` },
      { status: 500 }
    );
  }
}
