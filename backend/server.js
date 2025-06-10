// server.js - Simple Express server to test MongoDB connection
require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const PORT = 3000;

// Your MongoDB connection string
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

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Express MongoDB Test Server',
    endpoints: {
      testConnection: '/test-connection',
      testDatabase: '/test-database'
    }
  });
});

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


// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('\n📋 Test your MongoDB connection:');
  console.log(`   • Basic connection: http://localhost:${PORT}/test-connection`);
  
});

