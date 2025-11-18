const { Client } = require('minio')

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT) || 9000,
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
})

const BUCKET_NAME = process.env.MINIO_BUCKET || 'saas-uploads'

async function setupMinIO() {
  try {
    console.log('🔧 Configurando MinIO...')
    
    // Verificar si el bucket existe
    const bucketExists = await minioClient.bucketExists(BUCKET_NAME)
    
    if (!bucketExists) {
      console.log(`📦 Creando bucket: ${BUCKET_NAME}`)
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1')
      console.log('✅ Bucket creado')
    } else {
      console.log(`✅ Bucket ${BUCKET_NAME} ya existe`)
    }
    
    // Configurar política de acceso público para lectura
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
        },
      ],
    }
    
    await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy))
    console.log('✅ Política de acceso público configurada')
    
    // Crear carpetas iniciales
    const folders = [
      'templates/',
      'sites/',
      'products/',
      'pages/',
      'media/',
      'avatars/',
    ]
    
    for (const folder of folders) {
      try {
        await minioClient.putObject(
          BUCKET_NAME,
          folder + '.keep',
          Buffer.from(''),
          0
        )
        console.log(`📁 Carpeta creada: ${folder}`)
      } catch (err) {
        // Ignorar si ya existe
      }
    }
    
    console.log('✅ MinIO configurado correctamente')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error configurando MinIO:', error)
    process.exit(1)
  }
}

setupMinIO()
