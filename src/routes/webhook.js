import express from "express";

const router = express.Router();

// ✅ Meta webhook verification (GET)
router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

// ✅ Incoming events (POST) - delivery/read/failed statuses yahin aayenge
router.post("/", (req, res) => {
  console.log("📩 WhatsApp Webhook Event:", JSON.stringify(req.body, null, 2));
  return res.sendStatus(200);
});

export default router;
