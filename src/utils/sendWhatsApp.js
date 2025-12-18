import dotenv from "dotenv";
dotenv.config();

const normalizeTo = (input) => {
  if (input === null || input === undefined) return null;

  let digits = String(input).replace(/\D/g, "");

  if (digits.length === 10) digits = `91${digits}`;
  return digits;
};

export const sendWhatsAppTemplate = async ({
  to,
  templateName,
  languageCode = "en_US",
  bodyParams = [],
}) => {
  if (!process.env.WHATSAPP_TOKEN) throw new Error("WHATSAPP_TOKEN missing");
  if (!process.env.WHATSAPP_PHONE_ID) throw new Error("WHATSAPP_PHONE_ID missing");
  if (!process.env.WHATSAPP_API_VERSION) throw new Error("WHATSAPP_API_VERSION missing");

  const normalizedTo = normalizeTo(to);
  if (!normalizedTo) return;

  const url = `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${process.env.WHATSAPP_PHONE_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: normalizedTo,
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode },
      components: [
        {
          type: "body",
          parameters: bodyParams.map((p) => ({
            type: "text",
            text: String(p),
          })),
        },
        {
          type: "button",
          sub_type: "url",
          index: "0",
          parameters: [
            {
              type: "text",
              text: String(bodyParams[0]), // OTP again
            },
          ],
        },
      ],
    },
  };

  console.log("WA PAYLOAD >>>", JSON.stringify(payload, null, 2));

  const r = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await r.json().catch(() => ({}));
  if (!r.ok) {
    const err = new Error(`WhatsApp send failed (${r.status})`);
    err.meta = data;
    throw err;
  }

  return data;
};
