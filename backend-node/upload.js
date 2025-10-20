const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3();

const uploadFile = (filePath, bucketName, key) => {
  const fileContent = fs.readFileSync(filePath);
  
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileContent
  };
  
  s3.upload(params, (err, data) => {
    if (err) console.log(err);
    else console.log('Upload Success:', data.Location);
  });
};

// Usage: node upload.js
uploadFile('./your-dataset.csv', 'your-bucket-name', 'dataset/oil_supply.csv');