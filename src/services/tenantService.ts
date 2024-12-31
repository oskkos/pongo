import * as tenantRepository from '@/repositories/tenantRepository';

export default function getAllTenants() {
  return tenantRepository.getAllTenants();
}
