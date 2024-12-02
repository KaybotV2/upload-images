const { exiftool } = require('exiftool-vendored');

// Add GPS data to image EXIF metadata
async function addGPSDataToImage(imagePath, latitude, longitude) {
  const tags = {
    GPSLatitude: latitude,
    GPSLatitudeRef: latitude >= 0 ? 'N' : 'S',
    GPSLongitude: longitude,
    GPSLongitudeRef: longitude >= 0 ? 'E' : 'W'
  };

  try {
    await exiftool.write(imagePath, tags);
    console.log('GPS data added successfully.');
  } catch (error) {
    console.error('Error writing EXIF data:', error);
  } finally {
    await exiftool.end();
  }
}

module.exports = { addGPSDataToImage };
