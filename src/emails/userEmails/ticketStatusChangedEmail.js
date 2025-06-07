import { sendMail } from "../../utils/sendEmail.js";

const ticketStatusChangedEmail = async ({ fullname, email, ticketId, newStatus }) => {
    const subject = `📢 Ticket #${ticketId} Status Updated`;

    const htmlBody = `
        <div style="max-width: 700px; margin: auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; border: 1px solid #ddd; border-radius: 8px; background-color: #fff;">
            <div style="background-color: #2196F3; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0;">Ticket Status Update</h2>
            </div>

            <div style="padding: 30px; font-size: 16px; line-height: 1.5;">
                <p>Hi <strong>${fullname}</strong>,</p>

                <p>Your support ticket with ID <strong>#${ticketId}</strong> has been updated.</p>

                <p><strong>New Status:</strong> 
                    <span style="color: green; font-weight: bold;">${newStatus}</span>
                </p>

                <p>If you have any questions or further concerns, feel free to respond to this email or reach out to our support team.</p>

                <p>Thank you,<br/>
                <strong>Jasmine Automate Support/strong> Team</p>
            </div>

            <div style="background-color: #f9f9f9; color: #999; font-size: 12px; text-align: center; padding: 15px; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
                <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
            </div>
        </div>
    `;

    await sendMail(email, subject, htmlBody);
};

export default ticketStatusChangedEmail;