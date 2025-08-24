export interface Product {
    id: string;
    type: ProductCategory;
    name: string;
    isDiscounted: boolean;
    offerPrice: number;
    originalPrice: number;
    imgUrl: string;
    lastOrderedTimeStamp: string; // ISO string for better serialization
  }
  
  export type ProductCategory = 'fruit' | 'grocery' | 'dairy' | 'bakery' | 'meat' | 'beverages';
  
  export interface ProductWithComputedFields extends Product {
    displayPrice: number;
    isTopSelling: boolean;
    isRecentlyAdded: boolean;
    isFrequentlyOrdered: boolean;
  }
  
  // For API responses
  export interface ProductListResponse {
    products: Product[];
    total: number;
    categories: ProductCategory[];
  }