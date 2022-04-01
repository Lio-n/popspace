const Aws = require("aws-sdk")

class S3 {
  constructor() {
    this.s3 = new Aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    })
  }

  getUploadUrl = (fileName, bucketName, contentType, filePath) => {
    const finalPath = filePath ? `${filePath}/${fileName}` : fileName

    return this.s3.getSignedUrl("putObject", {
      Bucket: bucketName,
      Key: finalPath,
      ContentType: contentType,
    })
  }

  getDownloadUrl = (fileName, bucketName, filePath) => {
    const finalPath = this.getFilePath(fileName, filePath)
    return `https://s3.${process.env.AWS_REGION}.amazonaws.com/${bucketName}/${finalPath}`
  }

  /**
   * @param {string} fileURL - the full file URL. Must be an S3 URL (s3.region.amazonaws.com/...)
   */
  deleteFile = (fileUrl) => {
    const parsed = new URL(fileUrl)
    const pathTokens = parsed.pathname.split("/").map(decodeURIComponent)
    // first item is always "" (because of the leading slash)
    pathTokens.shift()
    const bucketName = pathTokens.shift()
    const filePath = pathTokens.join("/")
    const objectParams = {
      Bucket: bucketName,
      Key: filePath
    }
    return this.s3.deleteObject(objectParams).promise()
  }

  getFilePath = (fileName, filePath) => {
    return filePath ? `${filePath}/${fileName}` : fileName
  }
}

module.exports = new S3()
