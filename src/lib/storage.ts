import { Client } from 'minio'

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
})

const BUCKET_NAME = process.env.MINIO_BUCKET || 'saas-uploads'

export const storage = {
  /**
   * Upload a file to MinIO
   */
  async upload(
    file: Buffer,
    filename: string,
    folder: string = '/',
    contentType?: string
  ): Promise<string> {
    const path = `${folder}/${filename}`.replace(/\/+/g, '/')
    
    await minioClient.putObject(
      BUCKET_NAME,
      path,
      file,
      file.length,
      contentType ? { 'Content-Type': contentType } : undefined
    )

    return this.getPublicUrl(path)
  },

  /**
   * Get public URL for a file
   */
  getPublicUrl(path: string): string {
    const endpoint = process.env.MINIO_ENDPOINT || 'localhost'
    const port = process.env.MINIO_PORT || '9000'
    const useSSL = process.env.MINIO_USE_SSL === 'true'
    const protocol = useSSL ? 'https' : 'http'
    
    return `${protocol}://${endpoint}:${port}/${BUCKET_NAME}/${path}`
  },

  /**
   * Delete a file
   */
  async delete(path: string): Promise<void> {
    await minioClient.removeObject(BUCKET_NAME, path)
  },

  /**
   * Delete multiple files
   */
  async deleteMany(paths: string[]): Promise<void> {
    await minioClient.removeObjects(BUCKET_NAME, paths)
  },

  /**
   * List files in a folder
   */
  async list(folder: string = '/'): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const files: string[] = []
      const stream = minioClient.listObjects(BUCKET_NAME, folder, true)
      
      stream.on('data', (obj) => {
        if (obj.name) files.push(obj.name)
      })
      
      stream.on('error', reject)
      stream.on('end', () => resolve(files))
    })
  },

  /**
   * Check if file exists
   */
  async exists(path: string): Promise<boolean> {
    try {
      await minioClient.statObject(BUCKET_NAME, path)
      return true
    } catch {
      return false
    }
  },
}
