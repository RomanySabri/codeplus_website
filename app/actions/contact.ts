"use server"

import { transporter, contactEmail } from "@/lib/mail"
import type { ContactFormData } from "@/types/contact"

export async function sendContactEmail(data: ContactFormData) {
  try {
    await transporter.sendMail({
      from: "CodePlus Website <onboarding@codeplusdev.com>",
      to: contactEmail,
      replyTo: data.email,
      subject: `New inquiry from ${data.name}`,
      html: `
        <div style="font-family: monospace; background: #09090b;
          color: #fff; padding: 40px; border-radius: 8px;
          max-width: 600px;">

          <h2 style="color: #0ea5c8; font-size: 20px;
            margin: 0 0 24px; letter-spacing: 0.1em;">
            NEW PROJECT INQUIRY
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: rgba(255,255,255,0.4);
                font-size: 11px; letter-spacing: 0.2em;
                text-transform: uppercase; width: 140px;">
                Name
              </td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px;">
                ${data.name}
              </td>
            </tr>
            <tr style="border-top: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 10px 0; color: rgba(255,255,255,0.4);
                font-size: 11px; letter-spacing: 0.2em;
                text-transform: uppercase;">
                Email
              </td>
              <td style="padding: 10px 0; color: #0ea5c8; font-size: 14px;">
                <a href="mailto:${data.email}"
                  style="color: #0ea5c8;">${data.email}</a>
              </td>
            </tr>
            ${data.company ? `
            <tr style="border-top: 1px solid rgba(255,255,255,0.06);">
              <td style="padding: 10px 0; color: rgba(255,255,255,0.4);
                font-size: 11px; letter-spacing: 0.2em;
                text-transform: uppercase;">
                Company
              </td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px;">
                ${data.company}
              </td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 24px; padding-top: 24px;
            border-top: 1px solid rgba(255,255,255,0.06);">
            <p style="color: rgba(255,255,255,0.4); font-size: 11px;
              letter-spacing: 0.2em; text-transform: uppercase;
              margin: 0 0 12px;">
              Message
            </p>
            <p style="color: rgba(255,255,255,0.7); font-size: 14px;
              line-height: 1.7; margin: 0; white-space: pre-wrap;">
              ${data.message}
            </p>
          </div>

          <div style="margin-top: 32px; padding: 16px;
            background: rgba(14,165,200,0.05);
            border: 1px solid rgba(14,165,200,0.15);
            border-radius: 6px; text-align: center;">
            <a href="mailto:${data.email}"
              style="color: #0ea5c8; font-size: 12px;
              text-decoration: none; letter-spacing: 0.1em;">
              REPLY TO ${data.email} →
            </a>
          </div>

          <p style="margin-top: 24px; color: rgba(255,255,255,0.2);
            font-size: 11px; text-align: center;">
            codeplusdev.com — Contact Form
          </p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("🔴 Email send failed:", error)
    return { success: false, error: "Failed to send email" }
  }
}
