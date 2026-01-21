import { sendMail } from "../../utils/sendEmail.js";
import dayjs from "dayjs";

const meetingNoteCreatedEmail = async ({
    receiverName,
    receiverEmail,
    meetingTitle,
    meetingDate,
    department,
    meetingMode,
    meetingDescription,
    createdByName
}) => {

    const subject = `📝 Meeting Notes Available - ${meetingTitle}`;

    const formattedDate = meetingDate
        ? dayjs(meetingDate).format("D MMMM YYYY, hh:mm A")
        : "N/A";

    const htmlBody = `
        <div style="max-width: 700px; margin: auto; border: 1px solid #ddd; border-radius: 8px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fff; color: #333;">
            
            <!-- Header -->
            <div style="background-color: #0047AB; color: #fff; padding: 20px 30px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0;">Jasmine Automate</h2>
                <p style="margin: 5px 0 0;">Meeting Notes Notification</p>
            </div>

            <!-- Body -->
            <div style="padding: 30px; font-size: 16px; line-height: 1.6;">
                <p>Hi <strong>${receiverName}</strong>,</p>

                <p>The meeting notes for the following meeting have been created by <strong>${createdByName}</strong>:</p>

                <table style="width: 100%; margin-top: 20px; border-collapse: collapse; font-size: 14px;">
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background-color: #f1f5fb;"><strong>Meeting Title</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${meetingTitle}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background-color: #f1f5fb;"><strong>Date</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${formattedDate}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background-color: #f1f5fb;"><strong>Department</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${department || "N/A"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd; background-color: #f1f5fb;"><strong>Mode</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${meetingMode}</td>
                    </tr>
                </table>

                <p style="margin-top: 25px;"><strong>Meeting Summary:</strong></p>
                <p style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; border: 1px solid #ddd;">
                    ${meetingDescription}
                </p>

                <p style="margin-top: 25px;">
                    Please review the meeting notes carefully and take action on any responsibilities assigned to you.
                </p>

                <p style="margin-top: 40px;">Warm regards</p>
            </div>

            <!-- Footer -->
            <div style="background-color: #f1f1f1; color: #777; text-align: center; padding: 15px; border-top: 1px solid #ddd; border-radius: 0 0 8px 8px; font-size: 12px;">
                <p style="margin: 0;">© ${new Date().getFullYear()} Jasmine Automate. All rights reserved.</p>
            </div>
        </div>
    `;

    await sendMail(receiverEmail, subject, htmlBody);
};

export default meetingNoteCreatedEmail;
