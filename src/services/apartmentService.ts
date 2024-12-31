import 'server-only';

import { Apartment } from '@prisma/client';

import { generateSlug } from '@/lib/slugify';
import * as apartmentRepository from '@/repositories/apartmentRepository';
import { EditApartmentData } from '@/schemas/editApartmentSchema';
import { uploadImage } from '@/services/imageUploadService';

export function getAllApartments() {
  return apartmentRepository.getAllApartments();
}
export function getApartmentBySlug(slug: string) {
  return apartmentRepository.getApartmentBySlug(slug);
}
async function setCoverPhoto(coverPhoto: File, slug: string) {
  const coverImageId = await uploadImage(coverPhoto, slug);
  await apartmentRepository.updateApartment(slug, { coverImageId });
}
async function streetAddressChanged(oldSlug: string, newStreetAddress: string) {
  const apartment = await getApartmentBySlug(oldSlug);
  return oldSlug && apartment?.streetAddress !== newStreetAddress;
}
export async function editApartment(data: EditApartmentData) {
  let apartment: Apartment;
  const { coverPhoto, ...apartmentData } = data;
  const oldSlug = data.slug;

  const slug =
    (oldSlug && (await streetAddressChanged(oldSlug, data.streetAddress))) || !oldSlug
      ? generateSlug(data.streetAddress)
      : oldSlug;

  if (!oldSlug) {
    apartment = await apartmentRepository.addNewApartment({ ...apartmentData, slug: slug });
  } else {
    apartment = await apartmentRepository.updateApartment(oldSlug, { ...apartmentData, slug: slug });
  }
  if (coverPhoto?.[0]) {
    await setCoverPhoto(coverPhoto[0], slug);
  }
  return apartment;
}
