// frontend/src/components/PaymentGateway/PaymentGateway.jsx
import React, { useState } from 'react';
import PaymentService from '../../services/paymentService';
import './PaymentGateway.css';

const PaymentGateway = ({ 
  amount, 
  orderDetails, 
  customerInfo, 
  onSuccess, 
  onFailure,
  disabled = false 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      setError('Invalid amount');
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      setError('Please fill in all customer details');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      await PaymentService.processPayment({
        amount: parseFloat(amount),
        description: `Ghar Sathi - ${orderDetails.services?.length || 0} services`,
        customerInfo,
        orderDetails,
        onSuccess: (paymentData) => {
          setIsProcessing(false);
          if (onSuccess) {
            onSuccess(paymentData);
          }
        },
        onFailure: (error) => {
          setIsProcessing(false);
          setError(error.message);
          if (onFailure) {
            onFailure(error);
          }
        }
      });
    } catch (error) {
      setIsProcessing(false);
      setError(error.message);
      if (onFailure) {
        onFailure(error);
      }
    }
  };

  return (
    <div className="payment-gateway">
      {error && (
        <div className="payment-error">
          <p>❌ {error}</p>
        </div>
      )}
      
      <div className="payment-summary">
        <div className="payment-amount">
          <span className="label">Total Amount:</span>
          <span className="amount">₹{parseFloat(amount).toFixed(2)}</span>
        </div>
        
        <div className="payment-details">
          <p><strong>Customer:</strong> {customerInfo.name}</p>
          <p><strong>Email:</strong> {customerInfo.email}</p>
          <p><strong>Phone:</strong> {customerInfo.phone}</p>
          {orderDetails.services && (
            <p><strong>Services:</strong> {orderDetails.services.length} selected</p>
          )}
        </div>
      </div>
      
      <button
        className={`payment-button ${isProcessing ? 'processing' : ''}`}
        onClick={handlePayment}
        disabled={disabled || isProcessing || !amount || amount <= 0}
      >
        {isProcessing ? (
          <>
            <span className="spinner"></span>
            Processing Payment...
          </>
        ) : (
          <>
            <span className="payment-icon">💳</span>
            Pay ₹{parseFloat(amount).toFixed(2)}
          </>
        )}
      </button>
      
      <div className="payment-security">
        <div className="security-badges">
          <span className="badge">🔒 Secure Payment</span>
          <span className="badge">💳 Razorpay</span>
          <span className="badge">✅ 256-bit SSL</span>
        </div>
        <p className="security-text">
          Your payment information is encrypted and secure. We support all major 
          credit cards, debit cards, UPI, and net banking.
        </p>
      </div>
    </div>
  );
};

export default PaymentGateway;