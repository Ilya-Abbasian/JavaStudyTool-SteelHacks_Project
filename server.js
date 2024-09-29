require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const { runChat } = require('./chatbot');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve javastudytool.html as the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'javastudytool.html'));
});

app.use(express.json());

// Chat route
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const response = await runChat(message);
    res.json({ response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
}).on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`Port ${port} is busy, trying ${port + 1}`);
    server.listen(port + 1);
  } else {
    console.error(e);
  }
});