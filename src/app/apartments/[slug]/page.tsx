import { getUserIdFromSession } from '@/auth';
import Image from '@/components/image';
import { i18n } from '@/lib/i18n';
import { transformToSlug } from '@/lib/slugify';
import { getApartmentBySlug, getApartmentsForSelect } from '@/services/apartmentService';
import { getFinancialRecordCategories } from '@/services/financeService';
import ApartmentDetails from './apartmentDetails';
import ApartmentTabs from './apartmentTabs';

export const dynamic = 'force-dynamic';

export default async function Apartment({ params }: { params: Promise<{ slug: string }> }) {
  const userId = await getUserIdFromSession();
  const slug = transformToSlug((await params).slug);
  const apartment = await getApartmentBySlug(slug);
  if (!apartment) {
    return <div>{i18n.ApartmentNotFound}</div>;
  }
  const apartments = await getApartmentsForSelect();
  const categories = await getFinancialRecordCategories();
  return (
    <main>
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
        <ApartmentDetails apartment={apartment} userId={userId} />
      </div>
      <ApartmentTabs
        apartments={apartments}
        tenants={apartment.tenants}
        records={apartment.financialRecords}
        categories={categories}
      />
    </main>
  );
}
