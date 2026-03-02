import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { ApiConfig } from '@/models/ApiConfig';
import dbConnect from '@/lib/mongodb';

async function getActiveCloudinaryConfig() {
  await dbConnect();
  const config = await ApiConfig.findOne({ provider: 'cloudinary' });

  if (config && config.keys && config.keys.length > 0) {
    const currentKey = config.keys.find((k: any) => k.isActive && !k.isRateLimited);
    if (currentKey) {
      // Using 'key' for api_key and 'secret' for api_secret
      return {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
        api_key: currentKey.key,
        api_secret: currentKey.secret,
        id: currentKey._id.toString()
      };
    }
  }

  // Fallback to env vars
  return {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
  };
}

async function markKeyAsRateLimited(keyId: string) {
  await dbConnect();
  await ApiConfig.updateOne(
    { provider: 'cloudinary', 'keys._id': keyId },
    {
      $set: {
        'keys.$.isRateLimited': true,
        'keys.$.lastRateLimitedAt': new Date(),
      },
    }
  );
}

async function incrementKeyUsage(keyId: string) {
  await dbConnect();
  await ApiConfig.updateOne(
    { provider: 'cloudinary', 'keys._id': keyId },
    {
      $inc: { 'keys.$.requestCount': 1 },
      $set: { 'keys.$.lastUsedAt': new Date() },
    }
  );
}

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = 'healthdocx',
  isRetry: boolean = false
): Promise<{ url: string; publicId: string }> {
  const activeConfig = await getActiveCloudinaryConfig();

  // Set the configuration globally for this request
  // (Note: in a highly concurrent environment this global config might cause race conditions, 
  // but for our purposes it's the standard way Cloudinary node SDK works).
  cloudinary.config({
    cloud_name: activeConfig.cloud_name,
    api_key: activeConfig.api_key,
    api_secret: activeConfig.api_secret,
  });

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        async (error, result) => {
          if (error) {
            // If it's a rate limit or similar credential issue (http 400/401/429), handle it
            const isRateLimit = error.http_code === 429 || error.message?.includes('Rate limited');
            if (isRateLimit && activeConfig.id && !isRetry) {
              console.warn('Cloudinary key hit rate limit. Marking as limited and retrying...');
              await markKeyAsRateLimited(activeConfig.id);
              // Retry
              try {
                const retryResult = await uploadToCloudinary(fileBuffer, folder, true);
                return resolve(retryResult);
              } catch (retryErr) {
                return reject(retryErr);
              }
            }
            return reject(error);
          }

          if (activeConfig.id) {
            await incrementKeyUsage(activeConfig.id);
          }

          resolve({ url: result!.secure_url, publicId: result!.public_id });
        }
      )
      .end(fileBuffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  const activeConfig = await getActiveCloudinaryConfig();
  cloudinary.config({
    cloud_name: activeConfig.cloud_name,
    api_key: activeConfig.api_key,
    api_secret: activeConfig.api_secret,
  });

  await cloudinary.uploader.destroy(publicId);
}
