'use client';

import { setCoverPhoto } from '@/actions';

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget ?? event.target);
  const slug = formData.get('slug') as string;
  const coverPhoto = formData.get('coverPhoto') as File;
  console.log('updating the photo', slug, coverPhoto);
  const result = await setCoverPhoto(slug, coverPhoto);
  if (result.status === 'error') {
    alert(result.error); // todo: toast
  }
}

export default function CoverPhotoUploader({ slug }: { slug: string }) {
  return (
    <div>
      <form onSubmit={handleSubmit} className="inline-flex flex-col">
        <input type="hidden" name="slug" value={slug} />
        <input type="file" name="coverPhoto" className="file-input file-input-bordered w-full max-w-xs" />
        <button className="btn btn-primary" type="submit">
          Upload cover photo
        </button>
      </form>
    </div>
  );
}
