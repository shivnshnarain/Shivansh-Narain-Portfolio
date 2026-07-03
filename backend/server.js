import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import db from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
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

// API: Create Order
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { name, email, phone, amount } = req.body;
    
    if (!amount || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const amountInPaise = Math.round(parseFloat(amount) * 100);

    const options = {
      amount: amountInPaise, // amount in the smallest currency unit (paise)
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    // Insert pending order into DB
    db.run(
      `INSERT INTO payments (name, email, phone, amount, order_id) VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, amount, order.id],
      function (err) {
        if (err) {
          console.error('Database Error:', err.message);
          return res.status(500).json({ error: 'Failed to create order in DB' });
        }
        res.json({ order, key_id: process.env.RAZORPAY_KEY_ID });
      }
    );
  } catch (error) {
    console.error('Razorpay Error:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

// API: Verify Payment
app.post('/api/payment/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    // Payment verified successfully
    db.run(
      `UPDATE payments SET payment_id = ?, signature = ?, status = 'success' WHERE order_id = ?`,
      [razorpay_payment_id, razorpay_signature, razorpay_order_id],
      async function (err) {
        if (err) {
          console.error('Database Error:', err.message);
          return res.status(500).json({ error: 'Database update failed' });
        }
        
        // Fetch user details for email
        db.get(`SELECT * FROM payments WHERE order_id = ?`, [razorpay_order_id], async (err, row) => {
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
        });

        res.json({ success: true, message: 'Payment verified successfully' });
      }
    );
  } else {
    // Verification failed
    db.run(`UPDATE payments SET status = 'failed' WHERE order_id = ?`, [razorpay_order_id]);
    res.status(400).json({ success: false, message: 'Invalid signature' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
