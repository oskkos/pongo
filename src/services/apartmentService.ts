import 'server-only';

import { Apartment } from '@/models';
import * as apartmentRepository from '@/repositories/apartmentRepository';

export function getAllApartments(): Promise<Apartment[]> {
  return apartmentRepository.getAllApartments();
}
