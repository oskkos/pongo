import 'server-only';

import cloudinary from 'cloudinary';

import { auth, getUserIdFromSession } from '@/auth';

export async function uploadImage(file: File, apartmentSlug: string, type: 'apartment' | 'receipt') {
  const session = await auth();
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }
  const userId = await getUserIdFromSession();
  const imageBuffer = Buffer.from(await file.arrayBuffer());
  const uploadResult: cloudinary.UploadApiResponse | undefined = await new Promise((resolve) => {
    const folder =
      type === 'apartment' ? `pongo/${userId}/${apartmentSlug}` : `pongo/${userId}/${apartmentSlug}/receipts`;
    cloudinary.v2.uploader
      .upload_stream(
        { folder, unique_filename: true, resource_type: 'image', type: 'upload' },
        (error, uploadResult) => {
          if (error) {
            console.error(`Image upload error`, error);
            return resolve(undefined);
          }
          return resolve(uploadResult);
        }
      )
      .end(imageBuffer);
  });
  if (!uploadResult) {
    throw new Error('Upload failed');
  }
  return uploadResult.public_id;
}
