import { z } from "zod";

// Frontend Validation

export const OrganizationSchema = z.object({
  name: z.string()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name must be less than 100 characters"),
  address: z.string()
    .min(5, "Address must be at least 5 characters"),
  phone: z.string()
    .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number, use only numbers"),
  logo: z
    .instanceof(File)
    .optional()
    .refine(file => !file || file.size <= 2 * 1024 * 1024, "Max size 2MB")
    .refine(file => !file || ["image/jpg", "image/png"].includes(file.type), "Only JPG/PNG allowed"),
});

// backend validation 

export const OrganizationServerSchema = z.object({
  name: z.string().min(2).max(100),
  address: z.string().min(5),
  phone: z.string().regex(/^\+?[0-9]{7,15}$/),
  logo: z.string().optional()
});

export type organizationSchema = z.infer<typeof OrganizationSchema>
export type organizationServerSchema = z.infer<typeof OrganizationServerSchema>;


