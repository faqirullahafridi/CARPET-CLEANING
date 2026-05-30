import nodemailer from "nodemailer";
import { logger } from "./logger";

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    logger.warn("SMTP credentials not configured — emails will be logged but not sent");
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

interface BookingEmailData {
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  address: string;
  postcode: string;
  totalGbp: number;
  subtotalGbp: number;
  discountGbp: number;
  items: Array<{ name: string; quantity: number; unitPrice: number; lineTotal: number }>;
  notes?: string | null;
  couponCode?: string | null;
}

function formatPrice(gbp: number) {
  return `£${gbp.toFixed(2)}`;
}

function buildCustomerEmailHtml(data: BookingEmailData): string {
  const itemRows = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #1e3a5f;color:#e2e8f0;">${item.name} x${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #1e3a5f;color:#22d3ee;text-align:right;">${formatPrice(item.lineTotal)}</td>
        </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#081120;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">FreshLux</div>
      <div style="font-size:13px;color:#64748b;margin-top:4px;">Deep Cleaning. Fresh Living.</div>
    </div>
    <div style="background:linear-gradient(135deg,#0f2040 0%,#0d1b35 100%);border:1px solid #1e3a5f;border-radius:16px;padding:32px;margin-bottom:24px;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="display:inline-block;background:linear-gradient(135deg,#2563eb,#22d3ee);border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;margin-bottom:16px;">✓</div>
        <h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:0 0 8px;">Booking Confirmed!</h1>
        <p style="color:#94a3b8;font-size:14px;margin:0;">Thank you for choosing FreshLux, ${data.customerName}</p>
      </div>
      <div style="background:#081120;border-radius:10px;padding:16px;margin-bottom:20px;text-align:center;">
        <div style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Booking Reference</div>
        <div style="font-size:28px;font-weight:800;color:#22d3ee;letter-spacing:2px;margin-top:4px;">${data.bookingNumber}</div>
      </div>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:13px;">Service</td>
          <td style="padding:8px 0;color:#e2e8f0;font-size:13px;text-align:right;font-weight:600;">${data.serviceName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:13px;">Date</td>
          <td style="padding:8px 0;color:#e2e8f0;font-size:13px;text-align:right;font-weight:600;">${data.date}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:13px;">Time</td>
          <td style="padding:8px 0;color:#e2e8f0;font-size:13px;text-align:right;font-weight:600;">${data.timeSlot}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#64748b;font-size:13px;">Address</td>
          <td style="padding:8px 0;color:#e2e8f0;font-size:13px;text-align:right;font-weight:600;">${data.address}, ${data.postcode}</td>
        </tr>
      </table>
    </div>
    <div style="background:#0f1f38;border:1px solid #1e3a5f;border-radius:12px;padding:24px;margin-bottom:24px;">
      <h2 style="color:#ffffff;font-size:16px;font-weight:700;margin:0 0 16px;">Price Breakdown</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${itemRows}
        <tr>
          <td style="padding:8px 12px;color:#94a3b8;font-size:13px;">Subtotal</td>
          <td style="padding:8px 12px;color:#e2e8f0;text-align:right;">${formatPrice(data.subtotalGbp)}</td>
        </tr>
        ${data.discountGbp > 0 ? `<tr>
          <td style="padding:8px 12px;color:#22d3ee;font-size:13px;">Discount ${data.couponCode ? `(${data.couponCode})` : ""}</td>
          <td style="padding:8px 12px;color:#22d3ee;text-align:right;">-${formatPrice(data.discountGbp)}</td>
        </tr>` : ""}
        <tr style="border-top:1px solid #1e3a5f;">
          <td style="padding:12px 12px 0;color:#ffffff;font-size:16px;font-weight:700;">Total</td>
          <td style="padding:12px 12px 0;color:#22d3ee;font-size:18px;font-weight:800;text-align:right;">${formatPrice(data.totalGbp)}</td>
        </tr>
      </table>
    </div>
    ${data.notes ? `<div style="background:#0f1f38;border:1px solid #1e3a5f;border-radius:12px;padding:20px;margin-bottom:24px;">
      <h3 style="color:#94a3b8;font-size:13px;margin:0 0 8px;text-transform:uppercase;letter-spacing:1px;">Special Instructions</h3>
      <p style="color:#e2e8f0;font-size:14px;margin:0;">${data.notes}</p>
    </div>` : ""}
    <div style="text-align:center;padding:24px 0;border-top:1px solid #1e3a5f;">
      <p style="color:#64748b;font-size:13px;margin:0 0 8px;">Questions? Contact us anytime</p>
      <p style="color:#22d3ee;font-size:13px;margin:0;font-weight:600;">hello@freshluxcleaning.co.uk · 0800 123 4567</p>
    </div>
    <div style="text-align:center;padding-top:16px;">
      <p style="color:#475569;font-size:12px;margin:0;">FreshLux Carpet Cleaning UK · Fully Insured & Certified</p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendBookingConfirmationToCustomer(data: BookingEmailData) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || "admin@freshluxcleaning.co.uk";

  if (!transporter) {
    logger.info({ bookingNumber: data.bookingNumber, to: data.customerEmail }, "Email: customer booking confirmation (not sent — SMTP not configured)");
    return;
  }

  await transporter.sendMail({
    from: `"FreshLux Carpet Cleaning" <${process.env.SMTP_USER}>`,
    to: data.customerEmail,
    subject: `Booking Confirmed — ${data.bookingNumber} | FreshLux Carpet Cleaning`,
    html: buildCustomerEmailHtml(data),
  });

  logger.info({ bookingNumber: data.bookingNumber, to: data.customerEmail }, "Sent customer booking confirmation");
}

export async function sendBookingNotificationToAdmin(data: BookingEmailData) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || "admin@freshluxcleaning.co.uk";

  if (!transporter) {
    logger.info({ bookingNumber: data.bookingNumber }, "Email: admin booking notification (not sent — SMTP not configured)");
    return;
  }

  await transporter.sendMail({
    from: `"FreshLux Bookings" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `New Booking: ${data.bookingNumber} — ${data.customerName}`,
    html: `<h2>New Booking Received</h2>
<p><strong>Ref:</strong> ${data.bookingNumber}</p>
<p><strong>Customer:</strong> ${data.customerName} (${data.customerEmail})</p>
<p><strong>Service:</strong> ${data.serviceName}</p>
<p><strong>Date:</strong> ${data.date} ${data.timeSlot}</p>
<p><strong>Address:</strong> ${data.address}, ${data.postcode}</p>
<p><strong>Total:</strong> ${formatPrice(data.totalGbp)}</p>
${data.notes ? `<p><strong>Notes:</strong> ${data.notes}</p>` : ""}`,
  });

  logger.info({ bookingNumber: data.bookingNumber }, "Sent admin booking notification");
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}) {
  const transporter = createTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || "admin@freshluxcleaning.co.uk";

  if (!transporter) {
    logger.info({ from: data.email }, "Email: contact form submission (not sent — SMTP not configured)");
    return;
  }

  await transporter.sendMail({
    from: `"FreshLux Contact Form" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    replyTo: data.email,
    subject: `Contact Enquiry${data.subject ? `: ${data.subject}` : ""} — ${data.name}`,
    html: `<h2>New Contact Enquiry</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ""}
<p><strong>Message:</strong><br>${data.message.replace(/\n/g, "<br>")}</p>`,
  });
}
