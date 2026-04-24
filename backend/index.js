import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    // Google App Passwords are displayed with spaces — strip them
    pass: (process.env.SMTP_PASS || '').replace(/\s/g, ''),
  },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, service, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    await transporter.sendMail({
      from: `"JB Crownstone Website" <${process.env.SMTP_USER}>`,
      to: 'admin@jbcrownstone.com',
      replyTo: email,
      subject: `New Enquiry — ${service || 'General Inquiry'}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d0f1a;color:#e8dcc8;padding:40px;border-radius:8px;border:1px solid #c9a84c;">
          <h2 style="color:#c9a84c;margin-top:0;">New Website Enquiry</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;width:140px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #333;">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;">Email</td><td style="padding:10px 0;border-bottom:1px solid #333;"><a href="mailto:${email}" style="color:#c9a84c;">${email}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;">Service</td><td style="padding:10px 0;border-bottom:1px solid #333;">${service || '—'}</td></tr>
            <tr><td style="padding:10px 0;color:#999;vertical-align:top;">Message</td><td style="padding:10px 0;white-space:pre-wrap;">${message || '—'}</td></tr>
          </table>
          <p style="margin-top:32px;font-size:12px;color:#555;">Sent via JB Crownstone contact form</p>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
