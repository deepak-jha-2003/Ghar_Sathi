import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      // Send payment info to your backend
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
          amount: amount,
        }),
      });

      const result = await response.json();

      if (result.error) {
        setError(result.error);
        setProcessing(false);
      } else {
        setError(null);
        setSucceeded(true);
        setProcessing(false);
        onSuccess(result);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <h3 className="title">Payment Details</h3>
      <div className="stripe-element">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      {error && <div className="payment-error">{error}</div>}
      {succeeded && <div className="payment-success">Payment successful!</div>}
      <button
        className="payment-button"
        type="submit"
        disabled={!stripe || processing || succeeded}
      >
        {processing ? (
          <span className="payment-loading">
            Processing...
          </span>
        ) : (
          `Pay ₹${amount}`
        )}
      </button>
    </form>
  );
};

const Payment = ({ amount, onSuccess }) => {
  return (
    <div className="payment-container">
      <Elements stripe={stripePromise}>
        <PaymentForm amount={amount} onSuccess={onSuccess} />
      </Elements>
    </div>
  );
};

export default Payment;