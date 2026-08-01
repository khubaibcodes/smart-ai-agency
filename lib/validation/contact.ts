import { z } from "zod";
import type { ContactFormPayload } from "@/lib/types";

export const contactFormSchema = z.object({
  firstName: z.string().trim().min(2, "First name is required"),
  lastName: z.string().trim().min(2, "Last name is required"),
  email: z.string().trim().email("Valid email is required"),
  company: z.string().trim().optional(),
  service: z.string().trim().min(1, "Please select a service"),
  budget: z.string().trim().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export function validateContactPayload(body: unknown):
  | { success: true; data: ContactFormPayload }
  | { success: false; error: string } {
  const result = contactFormSchema.safeParse(body);

  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message ?? "Invalid form data" };
  }

  return {
    success: true,
    data: {
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      email: result.data.email,
      company: result.data.company,
      service: result.data.service,
      budget: result.data.budget,
      message: result.data.message,
    },
  };
}
