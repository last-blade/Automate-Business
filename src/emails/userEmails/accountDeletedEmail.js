import { sendMail } from "../../utils/sendEmail.js";

const accountDeletedEmail = async ({ fullname, email }) => {
    const subject = `❌ Your Account Has Been Deleted - KPS Automate Business Solutions`;

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #e74c3c;">Account Deletion Notice</h2>
            <p>Hi <strong>${fullname}</strong>,</p>
            <p>Your account has been <strong>deleted</strong> by the admin at <strong>KPS Automate Business Solutions</strong>.</p>

            <p>All your tasks and associated data have also been removed from the system.</p>

            <p>If you have questions or believe this was a mistake, please contact your reporting manager or system administrator.</p>

            <p>Thanks,<br />
            <strong>KPS Automate Business Solutions</strong> Team</p>
        </div>
    `;

    await sendMail(email, subject, htmlBody);
};

export default accountDeletedEmail;