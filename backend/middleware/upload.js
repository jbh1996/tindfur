const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

// Connect to AWS S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});

// Upload User and Pet Photo in bucket
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      
      // If user photo, store in userpics folder
      let folder = 'userpics';

      // If pet photo, store into petpics folder
      if (req.originalUrl.includes('petprofile')) folder = 'petpics';
      cb(null, `${folder}/${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

module.exports = { upload };