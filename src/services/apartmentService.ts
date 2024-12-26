import 'server-only';

import * as apartmentRepository from '@/repositories/apartmentRepository';

export function getAllApartments() {
  return apartmentRepository.getAllApartments();
}
