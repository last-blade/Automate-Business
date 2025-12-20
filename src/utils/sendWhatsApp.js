import dotenv from "dotenv";
import fetch from "node-fetch";


dotenv.config();

const normalizeTo = (input) => {
  if (!input) return null;
  let digits = String(input).replace(/\D/g, "");
  if (digits.length === 10) digits = `91${digits}`;
  return digits;
};

export const sendWhatsAppTemplate = async ({
  to,
  messages,
  templateName,
  languageCode,
}) => {
  if (!process.env.WHATSAPP_TOKEN) throw new Error("WHATSAPP_TOKEN missing");
  if (!process.env.WHATSAPP_PHONE_ID)
    throw new Error("WHATSAPP_PHONE_ID missing");
  if (!process.env.WHATSAPP_API_VERSION)
    throw new Error("WHATSAPP_API_VERSION missing");

  const normalizedTo = normalizeTo(to);
  if (!normalizedTo) throw new Error("Invalid phone number");
  if (!messages) throw new Error("Message missing");
// console.log("message", messages)
  const payload = {
    messaging_product: "whatsapp",
    to: normalizedTo,
    type: "template",
    template: {
      name: `${templateName}`,
      language: { code: `${languageCode}` },
      components: [
        {
          type: "body",
          parameters: messages.map((msg) => ({
            type: "text",
            text: String(msg)
          })),
        },
        {
          type: "button",
          sub_type: "url",
          index: "0",
          parameters: messages.map((msg) => ({
            type: "text",
            text: String(msg)
          })),
        },
      ],
    },
  };

  // console.log("WA FINAL PAYLOAD >>>", JSON.stringify(payload, null, 2));

  const response = await fetch(
    `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("WhatsApp API Error:", data);
    throw new Error(data?.error?.message);
  }

  return data;
};
