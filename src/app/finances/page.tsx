import AddNewBtn from '@/components/addNewBtn';
import { i18n } from '@/lib/i18n';
import { getAllFinancialRecords } from '@/services/financeService';
import FinancialRecordTable from './financialRecordTable';

export default async function finances() {
  const records = await getAllFinancialRecords();
  return (
    <main>
      <div>
        <AddNewBtn label={i18n.AddNewFinancialRecord} path="/finances/add" />
      </div>
      {records.length ? (
        <div>
          <FinancialRecordTable records={records} />
        </div>
      ) : (
        <h2 className="mt-4">{i18n.NoFinancialRecordsAdded}</h2>
      )}
    </main>
  );
}
