// api/index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Vercel!');
});

module.exports = (req, res) => {
  // Create a new express app for the serverless function
  app(req, res);
};
