"use client";

import { z } from "zod";

export const candidateRegistrationSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter your name",
  }),
  email: z.string(),
  experience: z.string().min(1, {
    message: "Please enter your experience",
  }),
  address: z.string(),
  province: z.string().min(1, {
    message: "Please choose your province",
  }),
  resume: z.string().min(1, {
    message: "Resume is required",
  }),

  status: z.string().optional(),
});
