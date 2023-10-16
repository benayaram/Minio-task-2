const express = require('express');
const fileUpload = require('express-fileupload');
const Minio = require('minio');
const app = express();
const port = process.env.PORT || 3000;

// Set up Minio client for media storage
const minioClient = new Minio.Client({
  endPoint: 'your-minio-endpoint',
  port: 9000,
  useSSL: false,
  accessKey: 'your-access-key',
  secretKey: 'your-secret-key',
});

// Middleware for handling file uploads
app.use(fileUpload());

// Route for uploading media
app.post('/upload', (req, res) => {
  const file = req.files.file;
  const metadata = req.body; // You can extract metadata from the request

  const objectName = `media/${file.name}`; // You can define a suitable structure for your object names

  minioClient.putObject('media-bucket', objectName, file.data, (err, etag) => {
    if (err) {
      console.error('Error uploading media:', err);
      res.status(500).json({ error: 'Error uploading media' });
    } else {
      // Save metadata to your database or as object metadata in Minio
      // Respond with a success message
      res.status(200).json({ message: 'Media uploaded successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
