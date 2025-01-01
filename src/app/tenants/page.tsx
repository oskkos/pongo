import { getAllTenants } from '@/actions';
import AddNewBtn from '@/components/addNewBtn';
import { i18n } from '@/lib/i18n';
import TenantTable from './tenantTable';

export default async function Tenants() {
  const tenants = await getAllTenants();
  return (
    <main>
      <div>
        <AddNewBtn label={i18n.AddNewTenant} path="/tenants/add" />
      </div>
      {tenants.length ? (
        <div>
          <TenantTable tenants={tenants} />
        </div>
      ) : (
        <h2 className="mt-4">{i18n.NoTenantsAdded}</h2>
      )}
    </main>
  );
}
