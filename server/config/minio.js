const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: 'your-minio-endpoint', // Replace with your Minio server's endpoint
  port: 9000, // Replace with your Minio server's port
  useSSL: false, // Set to true if you are using HTTPS
  accessKey: 'your-access-key', // Replace with your Minio access key
  secretKey: 'your-secret-key', // Replace with your Minio secret key
});

module.exports = minioClient;
