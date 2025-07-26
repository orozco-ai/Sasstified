// server.js

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Load .env variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// === Middleware ===
app.use(cors());
app.use(express.json());

// === Static Files (Vite Build) ===
app.use(express.static(path.join(__dirname, 'dist')));

// === API Routes ===
try {
  const getPersonas = require('./api/getPersonas');
  const chat = require('./api/chat');

  app.use('/api/personas', getPersonas);
  app.use('/api/chat', chat);
} catch (err) {
  console.error("❌ Error loading routes:", err.message);
}

// === SPA Fallback ===
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
