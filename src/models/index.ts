export interface Apartment {
  id: string;
  apartmentSize: number;
  createdAt: Date;
  description: string | null;
  modifiedAt: Date;
  postalCode: string;
  postOffice: string;
  slug: string;
  streetAddress: string;
  title: string | null;
}
