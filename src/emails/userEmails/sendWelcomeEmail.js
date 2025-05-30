import { sendMail } from "../../utils/sendEmail.js";

const sendWelcomeEmail = async ({ fullname, email, password, createdBy }) => {
    const subject = `👋 Welcome to KPS Automate Business Solutions!`;

    const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #4CAF50;">Welcome to KPS Automate Business Solutions!</h2>
        <p>Hi <strong>${fullname}</strong>,</p>

        <p>We're excited to welcome you aboard! You have been added to our system by <strong>${createdBy}</strong>.</p>

        <p>Here are your initial login details:</p>
        <ul>
            <li>🧑‍💻 <strong>Email:</strong> ${email}</li>
            <li>🔐 <strong>Password:</strong> ${password}</li>
        </ul>

        <p style="color: red;"><strong>⚠️ Please change your password immediately after logging in to keep your account secure.</strong></p>

        <p>Get started by logging in and exploring your dashboard. If you have any questions, feel free to reach out.</p>

        <p>Best regards,<br />
        <strong>KPS Automate Business Solutions</strong> Team</p>
    </div>
    `;

    await sendMail(email, subject, htmlBody);
};

export default sendWelcomeEmail;
