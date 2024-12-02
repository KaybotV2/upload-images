// Geocode address to get latitude and longitude
async function getLatLng(address) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const fetch = await import('node-fetch');
  
    const response = await fetch.default(url);
    const data = await response.json();
  
    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      return { Latitude: location.lat, Longitude: location.lng };
    }
    throw new Error(`Geocoding failed: ${data.status}`);
  }
  
  module.exports = { getLatLng };
  