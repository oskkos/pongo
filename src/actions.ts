'use server';

import * as apartmentService from '@/services/apartmentService';

export async function getAllApartments() {
  return apartmentService.getAllApartments();
}
