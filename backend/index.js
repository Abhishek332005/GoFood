
// index.js
const express = require('express');
const cors = require('cors'); // ✅ add this
const mongoDB = require('./db');

const app = express();
const port = 5000;

// ✅ CORS Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ✅ remove old res.setHeader block
// ❌ app.use((req,res,next) => {...});

app.use(express.json());

// MongoDB connect
mongoDB();

// Routes
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`✅ Backend running on port ${port}`);
});
