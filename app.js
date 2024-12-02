const express = require('express');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

// Import Routes
const uploadRoutes = require('./routes/upload');
const imageRoutes = require('./routes/images');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set("view engine", "ejs");
app.set("views", "views");

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'public', 'images')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Routes
app.use('/upload', upload.single('image'), uploadRoutes);   
app.use('/images', imageRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
