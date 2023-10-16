const minioClient = require('../config/minio');
const { v4: uuidv4 } = require('uuid');

// Function to upload a media asset to Minio
const uploadMedia = (req, res) => {
  const file = req.files.file; // Assuming you are using a file upload library
  const metadata = req.body; // Metadata such as title, description, etc.

  const objectName = `${uuidv4()}-${file.name}`; // Generate a unique object name

  minioClient.putObject('media-bucket', objectName, file.data, (err, etag) => {
    if (err) {
      console.error('Error uploading media:', err);
      return res.status(500).json({ error: 'Error uploading media' });
    }

    // Save metadata to a database or as object metadata in Minio
    // For example, you can store metadata as object metadata:
    minioClient.setObjectMetadata('media-bucket', objectName, metadata, (metadataErr) => {
      if (metadataErr) {
        console.error('Error setting object metadata:', metadataErr);
        return res.status(500).json({ error: 'Error saving metadata' });
      }

      return res.status(200).json({ message: 'Media uploaded successfully' });
    });
  });
};

// Function to retrieve a media asset and its associated metadata
const getMedia = (req, res) => {
  const objectName = req.params.mediaId;

  minioClient.getObject('media-bucket', objectName, (err, stream) => {
    if (err) {
      console.error('Error retrieving media:', err);
      return res.status(404).json({ error: 'Media not found' });
    }

    // Get metadata for the object (e.g., as object metadata)
    minioClient.getObjectMetadata('media-bucket', objectName, (metadataErr, metadata) => {
      if (metadataErr) {
        console.error('Error retrieving metadata:', metadataErr);
        // You may choose to send the media without metadata in this case
      }

      // Here, you can send both the media and metadata back to the client
      // Modify this part based on your application's needs
      const mediaResponse = {
        mediaStream: stream,
        metadata: metadata,
      };

      return res.status(200).json(mediaResponse);
    });
  });
};

module.exports = {
  uploadMedia,
  getMedia,
};