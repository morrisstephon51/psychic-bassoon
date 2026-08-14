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

// Form values come straight from public POST bodies. Route validation only
// trims/length-caps them: name/subject/message get no content check at all,
// and the email regex still accepts `"`, `<`, `>`. Without escaping, a
// message of `<img src=x onerror=...>` injects markup, and a (space-free)
// email like `"><b>x</b>@e.com` passes validation yet breaks out of the
// mailto="" attribute — both landing in the notification inbox. Escape every
// user field before interpolating it into the HTML body.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function sendContactNotification(data: ContactData) {
  const h = {
    name:     escapeHtml(data.name),
    email:    escapeHtml(data.email),
    phone:    escapeHtml(data.phone),
    zip_code: escapeHtml(data.zip_code),
    subject:  escapeHtml(data.subject),
    message:  escapeHtml(data.message),
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    // Subject header and text/plain part are not HTML contexts (nodemailer
    // MIME-encodes the header and strips CRLF), so they keep the raw values.
    subject: `[The Plug AI] ${data.subject} — ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nZip: ${data.zip_code}\nSubject: ${data.subject}\n\n${data.message}`,
    html: `
<h2 style="color:#1A0533;font-family:sans-serif">New Contact — The Plug AI</h2>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
  <tr><td style="padding:6px 16px 6px 0;color:#6B5A8E;font-weight:500">Name</td><td style="padding:6px 0;color:#1A0533">${h.name}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6B5A8E;font-weight:500">Email</td><td style="padding:6px 0;color:#1A0533"><a href="mailto:${h.email}">${h.email}</a></td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6B5A8E;font-weight:500">Phone</td><td style="padding:6px 0;color:#1A0533">${h.phone}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6B5A8E;font-weight:500">Zip Code</td><td style="padding:6px 0;color:#1A0533">${h.zip_code}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#6B5A8E;font-weight:500">Subject</td><td style="padding:6px 0;color:#1A0533">${h.subject}</td></tr>
</table>
<p style="color:#1A0533;font-family:sans-serif;font-weight:500;margin-top:16px">Message:</p>
<p style="color:#1A0533;font-family:sans-serif;white-space:pre-wrap">${h.message}</p>
    `.trim(),
  })
}
