import { createTransport } from "nodemailer"
import { z } from "zod";

const envSchema = z.object({
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.string().transform(Number),
  EMAIL_REPLY_TO: z.string(),
  EMAIL_NAME: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  CONTACT_EMAIL: z.string().optional(),
})

const env = envSchema.safeParse(process.env);

if (!env.success) {
  throw new Error("Invalid environment variables for SMTP configuration");
}

export const contactEmail = env.data.CONTACT_EMAIL || "hello@codeplusdev.com";

export const transporter = createTransport({
  host: env.data.EMAIL_HOST,
  port: env.data.EMAIL_PORT,
  secure: true,
  replyTo: env.data.EMAIL_REPLY_TO,
  name: env.data.EMAIL_NAME,
  auth: {
    user: env.data.EMAIL_USER,
    pass: env.data.EMAIL_PASS,
  },
});
