import React from 'react';

function MediaView({ mediaUrl, mediaType }) {
  let mediaContent = null;

  // Define how to display different media types.
  if (mediaType === 'image') {
    mediaContent = <img src={mediaUrl} alt="Media" />;
  } else if (mediaType === 'video') {
    mediaContent = <video src={mediaUrl} controls />;
  } else if (mediaType === 'audio') {
    mediaContent = <audio src={mediaUrl} controls />;
  } else if (mediaType === 'pdf') {
    mediaContent = (
      <iframe
        src={mediaUrl}
        title="PDF Document"
        width="100%"
        height="600"
        frameBorder="0"
      ></iframe>
    );
  } else {
    mediaContent = <p>Unsupported media type</p>;
  }

  return (
    <div>
      <h2>View Media</h2>
      {mediaContent}
    </div>
  );
}

export default MediaView;