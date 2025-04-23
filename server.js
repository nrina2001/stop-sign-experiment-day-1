const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // serve HTML/JS/CSS

// Save results
app.post('/api/save-results', (req, res) => {
  const data = req.body;
  const filename = `results/${data.participantId}.json`;

  fs.mkdirSync('results', { recursive: true });

  fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error saving file:", err);
      return res.status(500).json({ message: 'Failed to save results' });
    }
    res.json({ message: 'Results saved successfully!' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
