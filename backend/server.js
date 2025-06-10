// backend/server.js - Updated with payment routes
require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection string
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Add your frontend URLs
  credentials: true
}));

// Import payment routes
const paymentRoutes = require('./routes/payment');

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ghar Sathi API Server',
    version: '1.0.0',
    endpoints: {
      testConnection: '/test-connection',
      payment: '/api/payment'
    }
  });
});

// Use payment routes
app.use('/api/payment', paymentRoutes);

// Test MongoDB connection
app.get('/test-connection', async (req, res) => {
  try {
    console.log('🔄 Testing MongoDB connection...');
    
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    
    console.log('✅ MongoDB connection successful!');
    
    res.json({
      success: true,
      message: "MongoDB connection successful!",
      timestamp: new Date(),
      database: "Connected to MongoDB Atlas"
    });
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    
    res.status(500).json({
      success: false,
      message: "MongoDB connection failed",
      error: error.message,
      timestamp: new Date()
    });
  } finally {
    await client.close();
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('\n📋 Available endpoints:');
  console.log(`   • API Root: http://localhost:${PORT}/`);
  console.log(`   • MongoDB Test: http://localhost:${PORT}/test-connection`);
  console.log(`   • Payment API: http://localhost:${PORT}/api/payment`);
  console.log('\n💳 Payment endpoints:');
  console.log(`   • Create Order: POST /api/payment/create-order`);
  console.log(`   • Verify Payment: POST /api/payment/verify-payment`);
  console.log(`   • Payment Details: GET /api/payment/payment/:payment_id`);
  console.log(`   • Process Refund: POST /api/payment/refund`);
});