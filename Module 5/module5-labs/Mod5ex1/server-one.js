const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Server One</h1><p>This is running on port 3000.</p>');
});

app.get('/about', (req, res) => {
  res.send('<h2>About Server One</h2><p>This is just a basic Express server.</p>');
});

app.listen(PORT, () => {
  console.log(`Server One is running at http://localhost:${PORT}`);
});
