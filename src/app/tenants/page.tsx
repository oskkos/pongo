import AddNewBtn from '@/components/addNewBtn';
import { i18n } from '@/lib/i18n';
import getAllTenants from '@/services/tenantService';
import TenantTable from './tenantTable';

export default async function Tenants() {
  const tenants = await getAllTenants();
  return (
    <main>
      <div>
        <AddNewBtn label={i18n.AddNewTenant} path="/tenants/add" />
      </div>
      <div>
        <TenantTable tenants={tenants} />
      </div>
    </main>
  );
}
