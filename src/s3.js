import { S3Client, CreateBucketCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || 'us-east-1',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
})

const bucket = process.env.S3_BUCKET

// Ensure bucket exists
try {
  await client.send(new CreateBucketCommand({ Bucket: bucket }))
} catch (error) {
  if (error.name !== 'BucketAlreadyOwnedByYou')
    throw error
}

const uploadFile = async ({ key, body }) => {
  const upload = new Upload({
    client,
    params: {
      Bucket: bucket,
      Key: key,
      Body: body,
    },
  })

  upload.on('httpUploadProgress', ({ loaded, total }) => {
    console.log(`${key}: Uploaded ${loaded} of ${total} bytes`)
  })

  await upload.done()
}

export {
  client,
  uploadFile,
}
