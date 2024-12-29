import slugify from 'slugify';

import CoverPhotoUploader from '@/app/apartments/[slug]/coverPhotoUploader';
import Image from '@/components/image';
import { getApartmentBySlug } from '@/services/apartmentService';
import ApartmentDetails from './apartmentDetails';

export default async function Apartment({ params }: { params: Promise<{ slug: string }> }) {
  const slug = slugify((await params).slug, { lower: true });
  const apartment = await getApartmentBySlug(slug);
  if (!apartment) {
    return <div>Apartment not found</div>;
  }

  return (
    <div className="relative">
      <Image
        alt={apartment.streetAddress}
        src={apartment.coverImageId ?? 'pongo'}
        width="1600"
        height="800"
        crop={{
          type: 'fill',
        }}
      />
      <ApartmentDetails apartment={apartment} />
      <div className="p-4">
        <CoverPhotoUploader slug={slug} />
      </div>
    </div>
  );
}
