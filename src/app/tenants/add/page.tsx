import { getApartmentsForSelect } from '@/actions';
import EditTenantDetails from '@/components/editTenantDetails';

export default async function AddNewTenant() {
  const apartments = await getApartmentsForSelect();

  return <EditTenantDetails apartments={apartments} />;
}
