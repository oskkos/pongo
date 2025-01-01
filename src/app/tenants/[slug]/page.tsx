import { getAllApartments } from '@/actions';
import { i18n } from '@/lib/i18n';
import { transformToSlug } from '@/lib/slugify';
import { getTenantBySlug } from '@/services/tenantService';
import TenantDetails from './tenantDetails';

export const dynamic = 'force-dynamic';

export default async function Apartment({ params }: { params: Promise<{ slug: string }> }) {
  const slug = transformToSlug((await params).slug);
  const tenant = await getTenantBySlug(slug);

  const apartments = await getAllApartments();

  if (!tenant) {
    return <div>{i18n.TenantNotFound}</div>;
  }

  return <TenantDetails tenant={tenant} apartments={apartments} />;
}
