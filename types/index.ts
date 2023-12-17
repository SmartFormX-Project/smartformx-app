import { z } from "zod";

export const SiteConfigSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  links: z.object({
    github: z.string(),
  }),
});

export type GotoProp = {
  status?: string;
  gotoForm: (index: number) => void;
};

export const UserFormSchema = z.object({
  userName: z
    .string()
    .min(0, { message: "name is too short" })
    .max(20, { message: "name is too long" }),
  userEmail: z.string().email({ message: "Invalid email address" }),
  userPassword: z.string().min(8, { message: "Enter valid password, min 8 characteres" }),
});

export const BillingSchema = z.object({
  planSelected: z.union([
    z.literal("arcade"),
    z.literal("advanced"),
    z.literal("pro"),
  ]),
  yearly: z.boolean(),
  addOns: z
    .object({
      id: z.number(),
      checked: z.boolean(),
      title: z.string(),
      subtitle: z.string(),
      price: z.number(),
    })
    .array(),
});

export type FormItems = z.infer<typeof BillingSchema>;
export type UserDetails = z.infer<typeof UserFormSchema>;
