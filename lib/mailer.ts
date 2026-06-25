import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface ContactData {
  name: string
  email: string
  phone: string
  zip_code: string
  subject: string
  message: string
}

export async function sendContactNotification(data: ContactData) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: `[The Plug AI] ${data.subject} — ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nZip: ${data.zip_code}\nSubject: ${data.subject}\n\n${data.message}`,
    html: `
<h2 style="color:#1A0533;font-family:sans-serif">New Contact — The Plug AI</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
  <tr><td style="padding:6px 16px 6px 0;color:#6B5A8E;font-weight:500">Name</td><td style="padding:6px 0;color:#1A0533">${data.name}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6B5A8E;font-weight:500">Email</td><td style="padding:6px 0;color:#1A0533"><a href="mailto:${data.email}">${data.email}</a></td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6B5A8E;font-weight:500">Phone</td><td style="padding:6px 0;color:#1A0533">${data.phone}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6B5A8E;font-weight:500">Zip Code</td><td style="padding:6px 0;color:#1A0533">${data.zip_code}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6B5A8E;font-weight:500">Subject</td><td style="padding:6px 0;color:#1A0533">${data.subject}</td></tr>
</table>
<p style="color:#1A0533;font-family:sans-serif;font-weight:500;margin-top:16px">Message:</p>
<p style="color:#1A0533;font-family:sans-serif;white-space:pre-wrap">${data.message}</p>
    `.trim(),
  })
}
