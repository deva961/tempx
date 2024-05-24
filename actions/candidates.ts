"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { candidateRegistrationSchema } from "@/schemas/candidate-form";
import { MailTemplate } from "@/components/email/mail-template";
import { Resend } from "resend";
import { revalidatePath } from "next/cache";
import { sendMail } from "./email";

const resend = new Resend(process.env.RESEND_API_KEY);

export const getCandidates = async () => {
  try {
    const candidates = await db.candidate.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return candidates;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
};

export const getCandidateById = async (id: string) => {
  try {
    const res = await db.candidate.findUnique({
      where: {
        id,
      },
    });
    return res;
  } catch (error) {
    // throw new Error("Failed to fetch candidates");
  }
};

export const updateApplicationById = async (
  id: string,
  values: z.infer<typeof candidateRegistrationSchema>
) => {
  try {
    const res = await db.candidate.update({
      where: {
        id,
      },
      data: {
        status: values.status,
      },
    });

    if (values.email) {
      let message = "";
      if (values.status === "interview") {
        message = "You are selected for this interview.";
      } else if (values.status === "selected") {
        message = "You are  selected for this job. We wish you all the best.";
      } else if (values.status === "rejected") {
        message =
          "You are not selected for this job. We wish you all the best.";
      }

      if (message) {
        await sendMail({
          name: values.name,
          email: values.email,
          subject: "Application update",
          message,
        });
      }
    }

    revalidatePath("/hirings");
    return res;
  } catch (error) {
    throw error;
  }
};

export const userApplication = async (
  values: z.infer<typeof candidateRegistrationSchema>
) => {
  try {
    const res = await db.candidate.create({
      data: {
        name: values.name,
        email: values.email,
        experience: values.experience,
        address: values.address,
        province: values.province,
        resume: values.resume,
      },
    });

    if (values.email) {
      await sendMail({
        name: values.name,
        email: values.email,
        subject: "Application receieved",
        message: "We received your application",
      });
    }

    return res;
  } catch (error) {
    throw error;
  }
};
