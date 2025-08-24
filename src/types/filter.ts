export type FilterType = 'discounted' | 'topSelling' | 'recentlyAdded' | 'frequentlyOrdered';

export interface FilterTag {
  id: FilterType;
  label: string;
  isActive: boolean;
}

export interface FilterState {
  activeFilters: Set<FilterType>;
  searchQuery?: string; // Future enhancement
}

export interface CategoryExpansionState {
  [category: string]: boolean; // true = expanded, false = collapsed
}
