
export interface IProduct {
  id?: number;

  name: string;
  description?: string;

  category: string;

  price: string;
  discountPrice?: string;

  unit: string;
  stock: string;

  image?: string;

  isAvailable?: boolean;
  isDeleted?: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}
