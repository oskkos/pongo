import { getApartmentsForSelect } from '@/actions';
import EditTenantDetails from '@/components/editTenantDetails';
import { i18n } from '@/lib/i18n';

export default async function AddNewTenant() {
  const apartments = await getApartmentsForSelect();

  if (!apartments.length) {
    return <h2 className="mt-4">{i18n.AddApartmentPriorTenant}</h2>;
  }
  return <EditTenantDetails apartments={apartments} />;
}
