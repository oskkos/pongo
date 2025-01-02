import { getUserIdFromSession } from '@/auth';
import EditApartmentDetails from '@/components/editApartmentDetails';

export default async function AddNewApartment() {
  const userId = await getUserIdFromSession();
  return <EditApartmentDetails userId={userId} />;
}
