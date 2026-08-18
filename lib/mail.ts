import nodemailer from "nodemailer";

export function getMailTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const user = process.env.SMTP_USER || "";
  const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "");
  const port = parseInt(process.env.SMTP_PORT || "587");
  const secure = port === 465;

  // Optimize for Gmail if host is gmail or user ends with @gmail.com
  if (host.includes("gmail") || user.endsWith("@gmail.com")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendVerificationEmail(
  toEmail: string,
  username: string,
  token: string
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const verifyUrl = `${appUrl}/api/auth/verify?token=${token}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 40px 20px; color: #202020; }
          .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 40px; border: 1px solid #e0e0e0; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
          .logo { font-size: 24px; font-weight: 800; color: #202020; margin-bottom: 24px; display: inline-flex; align-items: center; gap: 8px; }
          .logo-dot { color: #3D38E9; }
          h1 { font-size: 22px; font-weight: 700; color: #202020; margin-top: 0; margin-bottom: 12px; }
          p { font-size: 15px; line-height: 1.6; color: #555555; margin-bottom: 24px; }
          .btn { display: inline-block; background-color: #3D38E9; color: #ffffff !important; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 12px; margin-bottom: 24px; }
          .footer { font-size: 12px; color: #999999; border-top: 1px solid #eeeeee; padding-top: 20px; margin-top: 20px; }
          .link-fallback { word-break: break-all; color: #3D38E9; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <span>structui<span class="logo-dot">.</span></span>
          </div>
          <h1>Verify your structui account</h1>
          <p>Hello <strong>@${username}</strong>,</p>
          <p>Welcome to structui! Please click the button below to verify your email address and activate your developer account.</p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${verifyUrl}" class="btn" target="_blank">Verify Email Address</a>
          </div>
          <p>Or copy and paste this verification URL into your browser:</p>
          <p class="link-fallback">${verifyUrl}</p>
          <div class="footer">
            <p>If you did not request this email, please safely ignore it. This verification link expires in 24 hours.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const transporter = getMailTransporter();
    const sender = process.env.SMTP_FROM || (process.env.SMTP_USER ? `"structui" <${process.env.SMTP_USER}>` : '"structui" <no-reply@structui.dev>');
    
    const info = await transporter.sendMail({
      from: sender,
      to: toEmail,
      subject: "Verify your structui developer account",
      html: htmlContent,
    });
    console.log("Verification email dispatched:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("SMTP Delivery Warning (simulating in console for local dev):", error);
    console.log("-----------------------------------------");
    console.log(`[structui Local Dev Mailer] Verify URL for ${toEmail}:`);
    console.log(verifyUrl);
    console.log("-----------------------------------------");
    return { success: true, simulated: true };
  }
}

