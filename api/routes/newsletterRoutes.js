import express from "express";
import { validateSchema } from "../middleware/validation/validateSchema.js";
import { newsletterSubscribeZodSchema } from "../schemas/newsletterZodSchema.js";
import { sendOtpEmail } from "../services/userServices.js";

const router = express.Router();

router.post(
  "/subscribe",
  validateSchema(newsletterSubscribeZodSchema),
  async (req, res) => {
    const { email } = req.validatedData;
    try {
      const inbox = process.env.NEWSLETTER_INBOX || process.env.MAIL_FROM;
      if (inbox) {
        await sendOtpEmail(inbox, `New newsletter subscriber: ${email}`);
      }
    } catch (e) {
      console.error("Newsletter email failed:", e.message);
    }
    res.status(200).json({ message: "Subscription received" });
  }
);

export default router;
