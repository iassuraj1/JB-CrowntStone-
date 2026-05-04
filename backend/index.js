// import express from 'express';
// import nodemailer from 'nodemailer';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import authRoutes from './auth.js';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// const transporter = nodemailer.createTransport({
//   host: 'smtp.ethereal.email',
//   port: 587,
//   secure: false,
//   auth: {
//     user: 'your-ethereal-user',
//     pass: 'your-ethereal-pass',
//   },
// });

// // For testing, let's use Ethereal Email
// async function createTestTransporter() {
//   const testAccount = await nodemailer.createTestAccount();
//   console.log('Ethereal test account created:', testAccount);

//   return nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass,
//     },
//   });
// }

// // Use test transporter for now
// createTestTransporter().then(testTransporter => {
//   global.transporter = testTransporter;
//   console.log('Test SMTP transporter ready');
// }).catch(err => {
//   console.error('Failed to create test transporter:', err);
// });

// app.post('/api/contact', async (req, res) => {
//   const { name, email, service, message } = req.body;

//   console.log('Contact form submission received:', { name, email, service, message });

//   if (!name || !email) {
//     console.log('Missing name or email, returning 400');
//     return res.status(400).json({ error: 'Name and email are required.' });
//   }

//   if (!global.transporter) {
//     console.error('Transporter not initialized');
//     return res.status(500).json({ error: 'Email service not ready' });
//   }

//   try {
//     console.log('Attempting to send email...');
//     const result = await global.transporter.sendMail({
//       from: `"JB Crownstone Website" <${process.env.SMTP_USER || 'noreply@jbcrownstone.com'}>`,
//       to: 'admin@jbcrownstone.com',
//       replyTo: email,
//       subject: `New Enquiry — ${service || 'General Inquiry'}`,
//       html: `
//         <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d0f1a;color:#e8dcc8;padding:40px;border-radius:8px;border:1px solid #c9a84c;">
//           <h2 style="color:#c9a84c;margin-top:0;">New Website Enquiry</h2>
//           <table style="width:100%;border-collapse:collapse;">
//             <tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;width:140px;">Name</td><td style="padding:10px 0;border-bottom:1px solid #333;">${name}</td></tr>
//             <tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;">Email</td><td style="padding:10px 0;border-bottom:1px solid #333;"><a href="mailto:${email}" style="color:#c9a84c;">${email}</a></td></tr>
//             <tr><td style="padding:10px 0;border-bottom:1px solid #333;color:#999;">Service</td><td style="padding:10px 0;border-bottom:1px solid #333;">${service || '—'}</td></tr>
//             <tr><td style="padding:10px 0;color:#999;vertical-align:top;">Message</td><td style="padding:10px 0;white-space:pre-wrap;">${message || '—'}</td></tr>
//           </table>
//           <p style="margin-top:32px;font-size:12px;color:#555;">Sent via JB Crownstone contact form</p>
//         </div>
//       `,
//     });
//     console.log('Email sent successfully:', result.messageId);
//     if (nodemailer.getTestMessageUrl) {
//       const testUrl = nodemailer.getTestMessageUrl(result);
//       console.log('Preview URL:', testUrl);
//       res.json({ success: true, previewUrl: testUrl });
//     } else {
//       res.json({ success: true });
//     }
//   } catch (err) {
//     console.error('Mail error:', err);
//     res.status(500).json({ error: 'Failed to send email. Please try again.' });
//   }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT,'0.0.0.0', () => console.log(`Backend running on http://localhost:${PORT}`));
















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

// --- UPDATED TRANSPORTER ---
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true', // false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Your App Password
  },
});

// Verification check
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ SMTP Connection Error:', error);
  } else {
    console.log('✅ SMTP Server is ready to send emails');
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, service, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    const result = await transporter.sendMail({
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
    
    console.log('Email sent successfully:', result.messageId);
    res.json({ success: true });
  } catch (err) {
    console.error('Mail error:', err);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));