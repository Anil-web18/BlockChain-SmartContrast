const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'us-east-1'
});

const getS3Data = async (bucketName, fileKey) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: fileKey
    };
    
    const obj = await s3.getObject(params).promise();
    const data = obj.Body.toString('utf-8');
    return data;
  } catch (error) {
    throw new Error(`S3 Error: ${error.message}`);
  }
};

module.exports = { getS3Data };