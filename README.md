# The Osint (Open-source Intelligence) Test Challenge 

## Application Overview 
This application allows you to upload images and add GPS coordinates (latitude and longitude) to the image's metadata. It also helps display images and their respective GPS data.

## Application Workflow

This Node.js and Express application is designed to accurately identify the location of photos taken with an iPhone. For images that lack GPS coordinates in their EXIF metadata, the following approach is taken:

1. **Identify the location using [Google Lens](https://lens.google.com/search):**  
   Analyze the image using Google Lens to determine the potential location.

2. **Upload the image and enter the address:**  
   After identifying the location, upload the image via the user interface and enter the address obtained from Google Lens.

3. **Geocode the address:**  
   The `getLatLng` function is used to convert the entered address into latitude and longitude.

4. **Add GPS coordinates to the image:**  
   If the uploaded image does not contain `GPSLatitude` or `GPSLongitude` in its EXIF data, the latitude and longitude obtained from the `getLatLng` function are added to the image.

5. **Display uploaded images with GPS data:**  
   All uploaded images are displayed, along with their corresponding GPS coordinates if available.


## Application Files

- **`app.js`**:  
  Configures the Express app, handles image uploads, and serves the upload and image display pages.

- **`upload.js`**:  
  Handles image upload, processes EXIF metadata, and adds GPS data to the image if it's not already present.

- **`images.js`**:  
  Displays a list of uploaded images and their respective GPS coordinates (if available).

- **`exif.js`**:  
  Contains logic for adding GPS coordinates to image EXIF metadata.

- **`geocode.js`**:  
  Provides functionality to convert an address to latitude and longitude using the Google Maps API.

- **`images.ejs`**:  
  Display all uploaded images.

- **`upload.ejs`**:  
  Upload an image with the option to provide image address.
