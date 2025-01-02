import 'server-only';

import cloudinary from 'cloudinary';

export async function uploadImage(file: File, slug: string) {
  const imageBuffer = Buffer.from(await file.arrayBuffer());
  const uploadResult: cloudinary.UploadApiResponse | undefined = await new Promise((resolve) => {
    cloudinary.v2.uploader
      .upload_stream(
        { folder: `pongo/${slug}`, unique_filename: true, resource_type: 'image', type: 'upload' },
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
