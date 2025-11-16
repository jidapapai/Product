import { EProductCategory } from '@/enums/product';

export const mappingCategoryLabel = (category: string) => {
  switch (category) {
    case EProductCategory.Accessory:
      return 'Accessory';
    case EProductCategory.Keyboard:
      return 'Keyboard';
    case EProductCategory.Display:
      return 'Display';
    case EProductCategory.Audio:
      return 'Audio';
    default:
      return '-';
  }
};
