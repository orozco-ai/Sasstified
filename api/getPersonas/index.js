// api/getPersonas/index.js
const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const personaFiles = [
  'claudia.json',
  'jennifer.json',
  'kaija.json',
  'leila.json',
  'odalys.json'
];

router.get('/', (req, res) => {
  try {
    const personas = personaFiles.map(file => {
      const data = fs.readFileSync(path.join(__dirname, file), 'utf-8');
      return JSON.parse(data);
    });

    res.status(200).json({ personas });
  } catch (err) {
    console.error('Error reading persona files:', err);
    res.status(500).json({ error: 'Failed to load personas' });
  }
});

module.exports = router;
