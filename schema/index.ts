import { z } from "zod";

export const createGymSchema = z.object({
  name: z
    .string()
    .min(1, "name should be more than one character")
    .max(50, "name should be less than 50 characters"),
  logo: z.string().optional(),
  slug: z.string(),
  phone: z.string().optional(),
  email: z.email("email is required"),
  addressLine1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  openingTime: z.string(),
  closingTime: z.string(),
  maxMembers: z.number(),
});

export type createGymInput = z.infer<typeof createGymSchema>;
