import { sendMail } from "../../utils/sendEmail.js";

const teamMemberRemoveEmail = async ({ fullname, email, removedBy }) => {
    const subject = `👋You've Been Removed from a Team - Jasmine Automate`;

    const htmlBody = `
        <div style="max-width: 700px; margin: auto; border: 1px solid #ddd; border-radius: 8px; font-family: 'Segoe UI', Tahoma, sans-serif; background-color: #fff; color: #333;">
            <div style="background-color: #f44336; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0;">Jasmine Automate</h2>
                <p style="margin: 4px 0 0;">👋 Team Removal Notification</p>
            </div>

            <div style="padding: 30px;">
                <p style="font-size: 16px;">Hi <strong>${fullname}</strong>,</p>

                <p style="font-size: 15px;">
                    This is to inform you that <strong>${removedBy}</strong> has removed you from their team on <strong>Jasmine Automate</strong>.
                </p>

                <p style="margin-top: 15px;">
                    You will no longer have access to this team's tasks or collaboration features.
                </p>

                <p style="margin-top: 15px;">
                    If you think this was a mistake or have any concerns, please contact your team lead or the person who made this change.
                </p>

                <p style="margin-top: 30px; font-size: 14px;">Thank you for being part of the team.</p>

                <p style="margin-top: 30px; font-size: 14px;">Warm regards,</p>
                <p style="font-weight: 600; font-size: 15px;">Jasmine Automate<br/>Team Management</p>
            </div>

            <div style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #999; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px;">
                <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
            </div>
        </div>
    `;

    await sendMail(email, subject, htmlBody);
};

export default teamMemberRemoveEmail;