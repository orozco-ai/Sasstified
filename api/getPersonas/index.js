// api/getPersonas/index.js

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const personasDir = path.join(__dirname);

// GET /api/personas
router.get('/', (req, res) => {
  fs.readdir(personasDir, (err, files) => {
    if (err) {
      console.error('Error reading personas folder:', err);
      return res.status(500).json({ error: 'Failed to read personas folder' });
    }

    const jsonFiles = files.filter((file) => file.endsWith('.json'));
    const personas = [];

    jsonFiles.forEach((file) => {
      const filePath = path.join(personasDir, file);
      const data = fs.readFileSync(filePath, 'utf-8');
      try {
        const parsed = JSON.parse(data);
        personas.push(parsed);
      } catch (err) {
        console.warn(`Invalid JSON in ${file}`);
      }
    });

    res.json(personas);
  });
});

module.exports = router;
