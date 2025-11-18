const express = require('express');
const app = express();
const PORT = 3001;


app.get('/', (req, res) => {
  res.send('<h1>Welcome to Server Two</h1><p>This is running on port 3001.</p>');
});


app.get('/contact', (req, res) => {
  res.send('<h2>Contact Page (Server Two)</h2><p>You are viewing content from the second server.</p>');
});

app.listen(PORT, () => {
  console.log(`Server Two is running at http://localhost:${PORT}`);
});
