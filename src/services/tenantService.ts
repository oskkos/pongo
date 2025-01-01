import { Tenant } from '@prisma/client';

import { generateSlug } from '@/lib/slugify';
import * as tenantRepository from '@/repositories/tenantRepository';
import { EditTenantData } from '@/schemas/editTenantSchema';

export function getAllTenants() {
  return tenantRepository.getAllTenants();
}
export function getTenantBySlug(slug: string) {
  return tenantRepository.getTenantBySlug(slug);
}

function getName(tenant: { firstName: string; lastName: string }) {
  return `${tenant.firstName} ${tenant.lastName}`;
}
async function nameChanged(oldSlug: string, newName: string) {
  const tenant = await getTenantBySlug(oldSlug);
  if (!tenant) {
    return true;
  }
  return oldSlug && getName(tenant) !== newName;
}

export async function editTenant(data: EditTenantData) {
  let tenant: Tenant;
  const oldSlug = data.slug;

  const name = getName(data);
  const slug = (oldSlug && (await nameChanged(oldSlug, name))) || !oldSlug ? generateSlug(name) : oldSlug;

  const tenantData = {
    ...data,
    tenantFrom: new Date(data.tenantFrom),
    tenantTo: data.tenantTo ? new Date(data.tenantTo) : null,
    slug: slug,
  };

  if (!oldSlug) {
    tenant = await tenantRepository.addNewTenant(tenantData);
  } else {
    tenant = await tenantRepository.updateTenant(oldSlug, tenantData);
  }

  return tenant;
}
