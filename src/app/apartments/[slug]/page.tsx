import { getApartmentBySlug } from '@/services/apartmentService';
import CoverPhotoUploader from './coverPhotoUploader';

export default async function Apartment({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const apartment = await getApartmentBySlug(slug);

  return (
    <div>
      Apartment: <pre>{JSON.stringify(apartment, null, 4)}</pre>
      <CoverPhotoUploader slug={slug} />
    </div>
  );
}
