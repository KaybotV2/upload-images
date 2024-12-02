const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const ExifParser = require('exif-parser');
const router = express.Router();

// Display images 
router.get('/', async (req, res) => {
  const success = req.query.success === 'true';
  try {
    const imagesDir = path.join(__dirname, '..', 'public', 'images');
    const files = await fs.readdir(imagesDir); // Get list of files in the directory
    const imagesData = [];

    for (const file of files) {
      const filePath = path.join(imagesDir, file);

      try {
        const buffer = await fs.readFile(filePath);
        const parser = ExifParser.create(buffer);
        const metadata = parser.parse();
        
        // Extract GPS data if available
        const latitude = metadata.tags.GPSLatitude;
        const longitude = metadata.tags.GPSLongitude;

        imagesData.push({
          filename: file,
          latitude: latitude || 'Not available',
          longitude: longitude || 'Not available',
        });
        
      } catch (err) {
        console.error(`Error processing file ${file}:`, err.message);
      }
    }

    // Render a template to display the images data
    res.render("images", { pageTitle: "Image List", imagesData, success });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to retrieve images." });
  }
});

module.exports = router;
