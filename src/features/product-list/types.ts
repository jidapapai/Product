import type { EProductCategory } from '@/enums/product';
import type { ISortFilter } from '@/types/control';

export interface ProductDetailResponse {
  id: string;
  name: string;
  category: EProductCategory;
  price: number;
  isInstock: boolean;
  createdAt: string;
  updatedAt: string;
  image: string;
  description: string;
}

export interface ProductListItemResponse extends ProductDetailResponse {
  no: number;
}

export interface IProductListFilter {
  name: string;
  catagories: string[];
  isInstock: boolean;
  sortBy: ISortFilter;
}
