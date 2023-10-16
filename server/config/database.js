const minioClient = require('../config/minio');

// Handle media upload
app.post('/upload', (req, res) => {
  const file = req.files.file; // Assuming you are using a file upload library
  const metadata = req.body; // Metadata such as title, description, etc.

  // Upload the media file to Minio
  minioClient.putObject('bucket-name', file.name, file.data, (err, etag) => {
    if (err) {
      console.error('Error uploading media:', err);
      res.status(500).send('Error uploading media');
    } else {
      // Save metadata to your database or as object metadata in Minio
      // Respond with a success message
      res.status(200).send('Media uploaded successfully');
    }
  });
});
