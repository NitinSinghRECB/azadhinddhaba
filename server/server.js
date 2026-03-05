require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","PATCH","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static upload folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/settings', require('./routes/settings'));

// Test route
app.get("/", (req,res)=>{
  res.send("Azad Hind Dhaba Backend Running");
});

// Health check
app.get('/api/health', (req,res)=>{
  res.json({status:"ok"});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
  console.log(`🍛 Server running on port ${PORT}`);
});