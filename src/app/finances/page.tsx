import AddNewBtn from '@/components/addNewBtn';
import { i18n } from '@/lib/i18n';

export default async function finances() {
  return (
    <main>
      <div>
        <AddNewBtn label={i18n.AddNewFinancialRecord} path="/finances/add" />
      </div>
    </main>
  );
}
