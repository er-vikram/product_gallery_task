import type { Product } from '../../types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'fruit_banana_001',
    type: 'fruit',
    name: 'Banana',
    isDiscounted: true,
    offerPrice: 12,
    originalPrice: 20,
    imgUrl: 'https://picsum.photos/seed/banana1/300/200',
    lastOrderedTimeStamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: 'fruit_apple_001',
    type: 'fruit',
    name: 'Apple',
    isDiscounted: false,
    offerPrice: 50,
    originalPrice: 50,
    imgUrl: 'https://picsum.photos/seed/apple2/300/200',
    lastOrderedTimeStamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'fruit_mango_001',
    type: 'fruit',
    name: 'Mango',
    isDiscounted: true,
    offerPrice: 80,
    originalPrice: 100,
    imgUrl: 'https://picsum.photos/seed/mango3/300/200',
    lastOrderedTimeStamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'fruit_grapes_001',
    type: 'fruit',
    name: 'Grapes',
    isDiscounted: false,
    offerPrice: 60,
    originalPrice: 60,
    imgUrl: 'https://picsum.photos/seed/grapes4/300/200',
    lastOrderedTimeStamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'fruit_pineapple_001',
    type: 'fruit',
    name: 'Pineapple',
    isDiscounted: true,
    offerPrice: 90,
    originalPrice: 120,
    imgUrl: 'https://picsum.photos/seed/pineapple5/300/200',
    lastOrderedTimeStamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'fruit_papaya_001',
    type: 'fruit',
    name: 'Papaya',
    isDiscounted: false,
    offerPrice: 40,
    originalPrice: 40,
    imgUrl: 'https://picsum.photos/seed/papaya6/300/200',
    lastOrderedTimeStamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'fruit_orange_001',
    type: 'fruit',
    name: 'Orange',
    isDiscounted: true,
    offerPrice: 55,
    originalPrice: 70,
    imgUrl: 'https://picsum.photos/seed/orange7/300/200',
    lastOrderedTimeStamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
  {
    id: 'fruit_kiwi_001',
    type: 'fruit',
    name: 'Kiwi',
    isDiscounted: false,
    offerPrice: 110,
    originalPrice: 110,
    imgUrl: 'https://picsum.photos/seed/kiwi8/300/200',
    lastOrderedTimeStamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  
  // Adding grocery items to test multiple categories
  {
    id: 'grocery_rice_001',
    type: 'grocery',
    name: 'Basmati Rice',
    isDiscounted: false,
    offerPrice: 120,
    originalPrice: 120,
    imgUrl: 'https://picsum.photos/seed/rice1/300/200',
    lastOrderedTimeStamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'grocery_oil_001',
    type: 'grocery',
    name: 'Sunflower Oil',
    isDiscounted: true,
    offerPrice: 150,
    originalPrice: 180,
    imgUrl: 'https://picsum.photos/seed/oil2/300/200',
    lastOrderedTimeStamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
  {
    id: 'grocery_dal_001',
    type: 'grocery',
    name: 'Toor Dal',
    isDiscounted: false,
    offerPrice: 95,
    originalPrice: 95,
    imgUrl: 'https://picsum.photos/seed/dal3/300/200',
    lastOrderedTimeStamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'grocery_salt_001',
    type: 'grocery',
    name: 'Rock Salt',
    isDiscounted: true,
    offerPrice: 25,
    originalPrice: 35,
    imgUrl: 'https://picsum.photos/seed/salt4/300/200',
    lastOrderedTimeStamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
];

// Helper function to generate additional products if needed (using same structure)
export const generateMockProduct = (overrides: Partial<Product>): Product => {
  const baseProduct: Product = {
    id: `generated_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: 'fruit',
    name: 'Sample Product',
    isDiscounted: Math.random() > 0.5,
    offerPrice: Math.floor(Math.random() * 100) + 10,
    originalPrice: Math.floor(Math.random() * 100) + 20,
    imgUrl: `https://picsum.photos/seed/product${Date.now()}/300/200`,
    lastOrderedTimeStamp: new Date(
      Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000)
    ).toISOString(),
    ...overrides,
  };
  
  // Ensure offer price is not higher than original price
  if (baseProduct.offerPrice > baseProduct.originalPrice) {
    baseProduct.originalPrice = baseProduct.offerPrice + Math.floor(Math.random() * 20) + 5;
  }
  
  return baseProduct;
};