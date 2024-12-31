import Image from '@/components/image';
import { transformToSlug } from '@/lib/slugify';
import { getApartmentBySlug } from '@/services/apartmentService';
import ApartmentDetails from './apartmentDetails';

export const dynamic = 'force-dynamic';

export default async function Apartment({ params }: { params: Promise<{ slug: string }> }) {
  const slug = transformToSlug((await params).slug);
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
        className="max-h-96 xl:max-h-[512px] object-cover"
        priority
      />
      <ApartmentDetails apartment={apartment} />
    </div>
  );
}
