import { sendMail } from "../../utils/sendEmail.js";

const ticketRaisedEmail = async ({ fullname, email, subject, category, priority, ticketId }) => {
    const mailSubject = `📩 Support Ticket Raised Successfully`;

    const htmlBody = `
        <div style="max-width: 700px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; border: 1px solid #ddd; border-radius: 8px; background-color: #fff;">
            <div style="background-color: #2196F3; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0;">Support Ticket Confirmation</h2>
            </div>

            <div style="padding: 30px; font-size: 16px; line-height: 1.5;">
                <p>Hi <strong>${fullname}</strong>,</p>

                <p>We have received your support ticket at <strong>Jasmine Automate</strong>. Our team will review it and get back to you shortly.</p>

                <p><strong>Ticket Details:</strong></p>
                <ul style="padding-left: 20px;">
                    <li><strong>🎫 Ticket ID:</strong> ${ticketId}</li>
                    <li><strong>📌 Subject:</strong> ${subject}</li>
                    <li><strong>📂 Category:</strong> ${category}</li>
                    <li><strong>⚠️ Priority:</strong> ${priority}</li>
                </ul>

                <p>If you need to provide more information or attachments, feel free to reply to this email or reach out to the support team.</p>

                <p>Thank you,<br/>
                <strong>Jasmine Automate Support</strong> Team</p>
            </div>

            <div style="background-color: #f9f9f9; color: #999; font-size: 12px; text-align: center; padding: 15px; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
                <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
            </div>
        </div>
    `;

    await sendMail(email, mailSubject, htmlBody, {type: "support"});
};

export default ticketRaisedEmail;
