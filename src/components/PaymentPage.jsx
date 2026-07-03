import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiCreditCard } from 'react-icons/fi';
import './PaymentPage.css';

export default function PaymentPage({ setActiveView }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', amount: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'success', 'error', 'cancelled'
  const [errorMsg, setErrorMsg] = useState('');
  const [paymentId, setPaymentId] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      // Create Order
      const orderResponse = await fetch('http://localhost:5001/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const orderData = await orderResponse.json();

      if (!orderData.order) {
        setErrorMsg('Something went wrong while processing your payment. Please try again.');
        setStatus('error');
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Shivansh Narain',
        description: 'Portfolio Payment',
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch('http://localhost:5001/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyResponse.json();
            if (verifyData.success) {
              setPaymentId(response.razorpay_payment_id);
              setStatus('success');
            } else {
              setErrorMsg('Something went wrong while processing your payment. Please try again.');
              setStatus('error');
            }
          } catch (err) {
            setErrorMsg('Something went wrong while processing your payment. Please try again.');
            setStatus('error');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#00FFB2',
        },
        modal: {
          ondismiss: function () {
            setStatus('cancelled');
            setLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      setErrorMsg('Something went wrong while processing your payment. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className="payment-page">
      <div className="payment-page-bg" />
      <div className="payment-page-content">
        <motion.div 
          className="payment-card"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="payment-header">
            <h2>Secure Payment</h2>
            <p>Enter your details below to proceed securely via Razorpay.</p>
          </div>

          <div className="payment-body">
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.form 
                  key="form"
                  onSubmit={handlePayment}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="payment-form-row">
                    <div className="payment-form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        required
                        className="payment-form-input"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                    <div className="payment-form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        required
                        className="payment-form-input"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <div className="payment-form-row">
                    <div className="payment-form-group">
                      <label>Mobile Number</label>
                      <input
                        type="tel"
                        required
                        className="payment-form-input"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                    <div className="payment-form-group">
                      <label>Amount (₹)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        className="payment-form-input"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  <button type="submit" className="payment-submit-btn" disabled={loading}>
                    {loading ? 'Processing...' : (
                      <>
                        <FiCreditCard /> Pay Securely
                      </>
                    )}
                  </button>
                  <button type="button" className="payment-submit-btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', marginTop: '12px' }} onClick={() => setActiveView('home')} disabled={loading}>
                    Back to Portfolio
                  </button>
                </motion.form>
              )}

              {status === 'success' && (
                <motion.div 
                  key="success"
                  className="payment-status-screen"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="payment-status-icon success">
                    <FiCheck />
                  </div>
                  <h3>Payment Successful!</h3>
                  <p>Payment ID: {paymentId}</p>
                  <p>Thank you for your payment. A confirmation email has been sent to {formData.email}.</p>
                  <button className="payment-submit-btn" onClick={() => setActiveView('home')}>Back to Portfolio</button>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div 
                  key="error"
                  className="payment-status-screen"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="payment-status-icon error">
                    <FiX />
                  </div>
                  <h3>Payment Failed</h3>
                  <p>{errorMsg}</p>
                  <button className="payment-submit-btn" onClick={() => { setStatus('idle'); setLoading(false); }} style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}>Try Again</button>
                </motion.div>
              )}

              {status === 'cancelled' && (
                <motion.div 
                  key="cancelled"
                  className="payment-status-screen"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="payment-status-icon error" style={{ color: '#FCD34D', background: 'rgba(252, 211, 77, 0.1)', boxShadow: '0 0 40px rgba(252, 211, 77, 0.2)' }}>
                    <FiX />
                  </div>
                  <h3>Payment Cancelled</h3>
                  <p>Payment cancelled by the user.</p>
                  <button className="payment-submit-btn" onClick={() => { setStatus('idle'); setLoading(false); }} style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}>Try Again</button>
                  <button type="button" className="payment-submit-btn" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', marginTop: '12px' }} onClick={() => setActiveView('home')} disabled={loading}>
                    Back to Portfolio
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
