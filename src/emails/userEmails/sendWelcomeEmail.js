import { sendMail } from "../../utils/sendEmail.js";

const sendWelcomeEmail = async ({ fullname, email, password, createdBy }) => {
    const subject = `👋 Welcome to KPS Automate Business Solutions!`;

    const htmlBody = `
        <div style="max-width: 700px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; border: 1px solid #ddd; border-radius: 8px; background-color: #fff;">
        <div style="background-color: #4CAF50; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Welcome to KPS Automate Business Solutions!</h2>
        </div>

        <div style="padding: 30px; font-size: 16px; line-height: 1.5;">
            <p>Hi <strong>${fullname}</strong>,</p>

            <p>We're excited to welcome you aboard! Your account has been created by <strong>${createdBy}</strong>.</p>

            <p>Here are your initial login credentials:</p>
            <ul style="list-style-type: none; padding-left: 0; font-size: 15px;">
            <li>🧑‍💻 <strong>Email:</strong> ${email}</li>
            <li>🔐 <strong>Password:</strong> ${password}</li>
            </ul>

            <p style="color: #d32f2f; font-weight: bold; margin-top: 20px;">
            ⚠️ Please change your password immediately after logging in to keep your account secure.
            </p>

            <p>Get started by logging in and exploring your dashboard. If you have any questions, feel free to reach out to our support team.</p>

            <p>Best regards,<br/>
            <strong>KPS Automate Business Solutions</strong> Team</p>
        </div>

        <div style="background-color: #f9f9f9; color: #999; font-size: 12px; text-align: center; padding: 15px; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} KPS Automate Business Solutions. All rights reserved.</p>
        </div>
        </div>
    `;

    await sendMail(email, subject, htmlBody);
};

export default sendWelcomeEmail;
