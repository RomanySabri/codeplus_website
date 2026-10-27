"use server"

import { transporter, contactEmail } from "@/lib/mail"
import type { InternshipFormData } from "@/types/internship"

export async function sendInternshipApplication(data: InternshipFormData) {
  try {
    await transporter.sendMail({
      from: "CodePlus Careers <onboarding@codeplusdev.com>",
      to: contactEmail,
      replyTo: data.email,
      subject: `New Internship Application: ${data.position} - ${data.name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0A1F3D;
          color: #fff; padding: 40px; border-radius: 12px;
          max-width: 600px; border: 1px solid rgba(0,123,255,0.2);">

          <h2 style="color: #007BFF; font-size: 20px;
            margin: 0 0 24px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: bold;">
            NEW INTERNSHIP APPLICATION
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #94A3B8;
                font-size: 11px; letter-spacing: 0.2em;
                text-transform: uppercase; width: 160px;">
                Candidate Name
              </td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px; font-weight: bold;">
                ${data.name}
              </td>
            </tr>
            <tr style="border-top: 1px solid rgba(255,255,255,0.08);">
              <td style="padding: 10px 0; color: #94A3B8;
                font-size: 11px; letter-spacing: 0.2em;
                text-transform: uppercase;">
                Email Address
              </td>
              <td style="padding: 10px 0; color: #007BFF; font-size: 14px;">
                <a href="mailto:${data.email}" style="color: #007BFF; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr style="border-top: 1px solid rgba(255,255,255,0.08);">
              <td style="padding: 10px 0; color: #94A3B8;
                font-size: 11px; letter-spacing: 0.2em;
                text-transform: uppercase;">
                Target Position
              </td>
              <td style="padding: 10px 0; color: #007BFF; font-size: 14px; font-weight: bold;">
                ${data.position}
              </td>
            </tr>
            <tr style="border-top: 1px solid rgba(255,255,255,0.08);">
              <td style="padding: 10px 0; color: #94A3B8;
                font-size: 11px; letter-spacing: 0.2em;
                text-transform: uppercase;">
                CV / Resume Link
              </td>
              <td style="padding: 10px 0; font-size: 14px;">
                <a href="${data.cvLink}" target="_blank" style="color: #4DA3FF; text-decoration: underline;">
                  View CV / Resume
                </a>
              </td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding-top: 24px;
            border-top: 1px solid rgba(255,255,255,0.08);">
            <p style="color: #94A3B8; font-size: 11px;
              letter-spacing: 0.2em; text-transform: uppercase;
              margin: 0 0 12px;">
              Cover Letter / Message
            </p>
            <p style="color: #E6F0FF; font-size: 14px;
              line-height: 1.7; margin: 0; white-space: pre-wrap;">
              ${data.message || "No message provided."}
            </p>
          </div>

          <div style="margin-top: 32px; padding: 16px;
            background: #007BFF;
            border-radius: 8px; text-align: center;">
            <a href="mailto:${data.email}"
              style="color: #FFFFFF; font-size: 13px;
              text-decoration: none; letter-spacing: 0.1em; font-weight: bold; display: block;">
              REPLY TO APPLICANT →
            </a>
          </div>

          <p style="margin-top: 24px; color: rgba(255,255,255,0.2);
            font-size: 11px; text-align: center;">
            codeplusdev.com — Careers Portal
          </p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to send internship email:", error)
    return { success: false, error: "Failed to send email" }
  }
}
