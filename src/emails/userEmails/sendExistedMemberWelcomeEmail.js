import { sendMail } from "../../utils/sendEmail.js";

const sendExistedMemberWelcomeEmail = async({fullname, email, createdBy}) => {
    const subject = `👋 Welcome to Jasmine Automate!`;
    const htmlBody = `<div style="max-width: 700px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; border: 1px solid #ddd; border-radius: 8px; background-color: #fff;">
        <div style="background-color: #4CAF50; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Jasmine Automate</h2>
            <p style="margin: 5px 0 0;">You've been added to a team!</p>
        </div>

        <div style="padding: 30px; font-size: 16px; line-height: 1.6;">
            <p>Hi <strong>${fullname}</strong>,</p>

            <p><strong>${createdBy}</strong> has added you to their team on <strong>Jasmine Automate</strong>.</p>

            <p>You can now collaborate, view tasks, and stay in sync with your team’s goals.</p>

            <div style="text-align: center; margin: 30px 0;">
            <a href="www.example.com" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; font-weight: bold; border-radius: 6px;">Go to Dashboard</a>
            </div>

            <p>If you have any questions or face any issues, feel free to reach out to our support team.</p>

            <p>Best regards,<br/>
            <strong>Jasmine Automate</strong> Team</p>
        </div>

        <div style="background-color: #f9f9f9; color: #999; font-size: 12px; text-align: center; padding: 15px; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
        </div>
        </div>
    `;

    await sendMail(email, subject, htmlBody)
};

export {sendExistedMemberWelcomeEmail}