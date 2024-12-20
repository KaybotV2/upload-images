const express = require('express');

const router = express.Router();
const fs = require('fs/promises');
const path = require('path');
const ExifParser = require('exif-parser');


const { getLatLng } = require('../utils/geocode');
const { addGPSDataToImage } = require('../utils/exif');

// Render upload page
router.get('/', (req, res) => {
  res.render("upload", { pageTitle: "Upload Images" });
});

// Handle image upload and address input
router.post('/', async (req, res) => {
  const { streetAddress, zipcode, country } = req.body;

  try {
    const address = `${streetAddress}, ${zipcode}, ${country}`;
    const filePath = path.join(__dirname, '..', 'public', 'images', req.file.filename);

    const buffer = await fs.readFile(filePath);
    const parser = ExifParser.create(buffer);
    const metadata = parser.parse();

    // Check if GPS data exists
    if (!metadata.tags.GPSLatitude || !metadata.tags.GPSLongitude) {
      const { Latitude, Longitude } = await getLatLng(address);
      // Add GPS coordinates to the image
      await addGPSDataToImage(filePath, Latitude, Longitude);
    }

    // Redirect to /images after success
    res.redirect('/images?success=true');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
