import React, { useState } from 'react';

function MediaUpload() {
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({ title: '', description: '' });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleMetadataChange = (event) => {
    const { name, value } = event.target;
    setMetadata({
      ...metadata,
      [name]: value,
    });
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', metadata.title);
      formData.append('description', metadata.description);

      // Send the formData to the server for media upload using fetch or an API library.
      // Example using fetch:
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Media uploaded successfully, handle the response.
        console.log('Media uploaded successfully.');
      } else {
        // Handle errors if the upload failed.
        console.error('Media upload failed.');
      }
    } catch (error) {
      console.error('Error during upload:', error);
    }
  };

  return (
    <div>
      <h2>Upload Media</h2>
      <input type="file" onChange={handleFileChange} />
      <input type="text" name="title" value={metadata.title} onChange={handleMetadataChange} placeholder="Title" />
      <input type="text" name="description" value={metadata.description} onChange={handleMetadataChange} placeholder="Description" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default MediaUpload;