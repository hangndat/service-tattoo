// Simple Express server setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 