export interface Vehicle {
  _id: string;
  agencyId: string;
  name: string;
  seater: string;
  image: string;
  features: string[];
  isAvailable: boolean;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}