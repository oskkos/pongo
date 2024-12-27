import 'server-only';

import slugify from 'slugify';

import * as apartmentRepository from '@/repositories/apartmentRepository';
import { AddNewApartmentData } from '@/schemas/addNewApartmentSchema';

export function getAllApartments() {
  return apartmentRepository.getAllApartments();
}
export async function addNewApartment(data: AddNewApartmentData) {
  const slug = slugify(data.streetAddress, { lower: true });
  await apartmentRepository.addNewApartment({ ...data, slug: slug });
}
