import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { query, initDb } from './db.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

// Create Test Email Account for Nodemailer
let transporter;
nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error('Failed to create a testing account. ' + err.message);
    return;
  }
  transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });
  console.log('Ethereal Email Setup Complete');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// API: Create Order
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { name, email, phone, amount } = req.body;
    
    if (!amount || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const amountInPaise = Math.round(parseFloat(amount) * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    // Insert pending order into DB
    await query(
      `INSERT INTO payments (name, email, phone, amount, order_id) VALUES ($1, $2, $3, $4, $5)`,
      [name, email, phone, amount, order.id]
    );

    res.json({ order, key_id: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error('Razorpay/DB Error:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

// API: Verify Payment
app.post('/api/payment/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    try {
      // Payment verified successfully
      await query(
        `UPDATE payments SET payment_id = $1, signature = $2, status = 'success' WHERE order_id = $3`,
        [razorpay_payment_id, razorpay_signature, razorpay_order_id]
      );
      
      // Fetch user details for email
      const result = await query(`SELECT * FROM payments WHERE order_id = $1`, [razorpay_order_id]);
      const row = result.rows[0];

      if (row && transporter) {
        try {
          // Send email to customer
          const customerMail = await transporter.sendMail({
            from: '"Shivansh Narain" <no-reply@shivanshnarain.com>',
            to: row.email,
            subject: 'Payment Confirmation',
            text: `Hello ${row.name},\n\nYour payment of ₹${row.amount} has been received successfully.\n\nThank you!\nShivansh Narain`,
          });
          console.log('Customer Email URL:', nodemailer.getTestMessageUrl(customerMail));

          // Send email to admin
          const adminMail = await transporter.sendMail({
            from: '"Payment System" <system@shivanshnarain.com>',
            to: 'shivanshnarain@gmail.com',
            subject: 'New Payment Received',
            text: `New Payment Received\n\nName: ${row.name}\nEmail: ${row.email}\nPhone: ${row.phone}\nAmount: ₹${row.amount}\nPayment ID: ${razorpay_payment_id}\nOrder ID: ${razorpay_order_id}`,
          });
          console.log('Admin Email URL:', nodemailer.getTestMessageUrl(adminMail));
        } catch(emailErr) {
           console.error("Failed to send email", emailErr);
        }
      }

      res.json({ success: true, message: 'Payment verified successfully' });
    } catch (dbErr) {
      console.error('Database Error:', dbErr.message);
      res.status(500).json({ error: 'Database update failed' });
    }
  } else {
    // Verification failed
    try {
      await query(`UPDATE payments SET status = 'failed' WHERE order_id = $1`, [razorpay_order_id]);
    } catch (err) {
      console.error('Error updating failed status:', err);
    }
    res.status(400).json({ success: false, message: 'Invalid signature' });
  }
});

const PORT = process.env.PORT || 5000;

// Initialize DB and start server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to initialize database", err);
});
