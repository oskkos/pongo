'use client';

import { setCoverPhoto } from '@/actions';

export default function CoverPhotoUploader({ slug }: { slug: string }) {
  return (
    <div>
      <form action={setCoverPhoto} className="inline-flex flex-col">
        <input type="hidden" name="slug" value={slug} />
        <input type="file" name="coverPhoto" className="file-input file-input-bordered w-full max-w-xs" />
        <button className="btn btn-primary" type="submit">
          Upload cover photo
        </button>
      </form>
    </div>
  );
}
