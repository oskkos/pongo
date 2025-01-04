import AddNewBtn from '@/components/addNewBtn';
import { i18n } from '@/lib/i18n';
import { getAllFinancialRecords, getFinancialRecordCategories } from '@/services/financeService';
import FinancialRecordTable from './financialRecordTable';

export default async function finances() {
  const records = await getAllFinancialRecords();
  const categories = await getFinancialRecordCategories();
  return (
    <main>
      <div>
        <AddNewBtn label={i18n.AddNewFinancialRecord} path="/finances/add" />
      </div>
      {records.length ? (
        <div>
          <FinancialRecordTable records={records} categories={categories} />
        </div>
      ) : (
        <h2 className="mt-4">{i18n.NoFinancialRecordsAdded}</h2>
      )}
    </main>
  );
}
