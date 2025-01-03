import { getApartmentsForSelect, getFinancialRecordCategories } from '@/actions';
import EditFinancialRecordDetails from '@/components/editFinancialRecordDetails';

export default async function AddNewTenant() {
  const apartments = await getApartmentsForSelect();
  const categories = await getFinancialRecordCategories();
  return <EditFinancialRecordDetails apartments={apartments} categories={categories} />;
}
