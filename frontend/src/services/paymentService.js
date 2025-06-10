// frontend/src/services/paymentService.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class PaymentService {
  // Create Razorpay order
  static async createOrder(orderData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Verify payment
  static async verifyPayment(paymentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment verification failed');
      }

      return data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }

  // Get payment details
  static async getPaymentDetails(paymentId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/payment/${paymentId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch payment details');
      }

      return data;
    } catch (error) {
      console.error('Error fetching payment details:', error);
      throw error;
    }
  }

  // Open Razorpay checkout
  static openRazorpayCheckout(options) {
    return new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error('Razorpay SDK not loaded'));
        return;
      }

      const rzp = new window.Razorpay({
        ...options,
        handler: function (response) {
          resolve(response);
        },
        modal: {
          ondismiss: function() {
            reject(new Error('Payment cancelled by user'));
          }
        }
      });

      rzp.open();
    });
  }

  // Load Razorpay script
  static loadRazorpayScript() {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(new Error('Failed to load Razorpay SDK'));
      };
      document.body.appendChild(script);
    });
  }

  // Complete payment flow
  static async processPayment({
    amount,
    currency = 'INR',
    description,
    customerInfo,
    orderDetails,
    onSuccess,
    onFailure
  }) {
    try {
      // Load Razorpay script if not already loaded
      await this.loadRazorpayScript();

      // Create order on backend
      const orderData = {
        amount,
        currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          description: description || 'Ghar Sathi Service Booking',
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          ...orderDetails
        }
      };

      const orderResponse = await this.createOrder(orderData);

      if (!orderResponse.success) {
        throw new Error(orderResponse.message);
      }

      // Prepare Razorpay options
      const razorpayOptions = {
        key: orderResponse.key_id,
        amount: orderResponse.order.amount,
        currency: orderResponse.order.currency,
        name: 'Ghar Sathi',
        description: description || 'Professional Home Services',
        image: '/logo.png', // Add your logo path
        order_id: orderResponse.order.id,
        prefill: {
          name: customerInfo.name,
          email: customerInfo.email,
          contact: customerInfo.phone
        },
        theme: {
          color: '#FF6B6B'
        },
        modal: {
          escape: false,
          backdropclose: false
        }
      };

      // Open Razorpay checkout
      const paymentResponse = await this.openRazorpayCheckout(razorpayOptions);

      // Verify payment on backend
      const verificationData = {
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        order_details: orderDetails
      };

      const verificationResponse = await this.verifyPayment(verificationData);

      if (verificationResponse.success) {
        if (onSuccess) {
          onSuccess({
            payment_id: paymentResponse.razorpay_payment_id,
            order_id: paymentResponse.razorpay_order_id,
            amount: amount,
            ...verificationResponse
          });
        }
        return verificationResponse;
      } else {
        throw new Error('Payment verification failed');
      }

    } catch (error) {
      console.error('Payment processing error:', error);
      if (onFailure) {
        onFailure(error);
      }
      throw error;
    }
  }
}

export default PaymentService;