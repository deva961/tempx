"use server";

import { Resend } from "resend";
import { MailTemplate } from "@/components/email/mail-template";

const resend = new Resend(process.env.RESEND_API_KEY);

interface MailProps {
  email: string;
  subject: string;
  name: string;
  message: string;
}

export const sendMail = async ({
  name,
  email,
  subject,
  message,
}: MailProps) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject,
    react: MailTemplate({
      name,
      message,
    }),
  });
};
