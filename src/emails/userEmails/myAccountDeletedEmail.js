import { sendMail } from "../../utils/sendEmail.js";

const myAccountDeletedEmail = async ({ fullname, email }) => {
    const subject = `🗑️ Your KPS Account Has Been Deleted`;

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #d9534f;">We're sorry to see you go, ${fullname}!</h2>

            <p>Your account with <strong>KPS Automate Business Solutions</strong> has been successfully deleted as per your request.</p>

            <p>If you didn’t initiate this action or believe this was a mistake, please reach out to our support team immediately.</p>

            <p>We value your time with us and hope to serve you again in the future. You're always welcome back.</p>

            <p>Wishing you all the best,<br/>
            The <strong>KPS Automate Business Solutions</strong> Team</p>
        </div>
    `;

    await sendMail(email, subject, htmlBody);
};

export default myAccountDeletedEmail;
