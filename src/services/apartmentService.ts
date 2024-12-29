import 'server-only';

import slugify from 'slugify';

import * as apartmentRepository from '@/repositories/apartmentRepository';
import { AddNewApartmentData } from '@/schemas/addNewApartmentSchema';
import { uploadImage } from '@/services/imageUploadService';

export function getAllApartments() {
  return apartmentRepository.getAllApartments();
}
export function getApartmentBySlug(slug: string) {
  return apartmentRepository.getApartmentBySlug(slug);
}
export async function addNewApartment(data: AddNewApartmentData) {
  const slug = slugify(data.streetAddress, { lower: true });
  await apartmentRepository.addNewApartment({ ...data, slug: slug });
}
export async function setCoverPhoto(coverPhoto: File, slug: string) {
  const coverImageId = await uploadImage(coverPhoto, slug);
  await apartmentRepository.updateApartment(slug, { coverImageId });
}
