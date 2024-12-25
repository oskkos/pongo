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
  tenants: Tenant[];
}
export interface Tenant {
  id: string;
  createdAt: Date;
  deposit: number;
  depositPaid: boolean;
  depositReturned: boolean;
  email: string;
  firstName: string;
  lastName: string;
  personId: string;
  phoneNumber: string;
  tenantFrom: Date;
  tenantTo: Date | null;
}
