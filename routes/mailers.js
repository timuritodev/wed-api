const express = require("express");
const { sendAgreement } = require("../models/mailer");

const router = express.Router();

router.post("/api/send-email", async (req, res) => {
  try {
    const { email, text } = req.body;
    await sendAgreement({ email, text });

    res.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
