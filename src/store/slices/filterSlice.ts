import { StateCreator } from 'zustand';
import type { FilterStore, AppStore } from '../types';
import type { FilterType, ProductWithComputedFields } from '../../types';
import { filterProductsByActiveFilters } from './productSlice';

export const createFilterSlice: StateCreator<
  AppStore,
  [],
  [],
  FilterStore
> = (set, get) => ({
  // Initial State
  activeFilters: new Set<FilterType>(),
  searchQuery: '',

  // Actions
  toggleFilter: (filterType: FilterType) => {
    set(state => {
      const newActiveFilters = new Set(state.activeFilters);
      
      if (newActiveFilters.has(filterType)) {
        newActiveFilters.delete(filterType);
      } else {
        newActiveFilters.add(filterType);
      }

      // Update filtered products based on new filters
      const filteredProducts = filterProductsByActiveFilters(
        state.products, 
        newActiveFilters
      );

      return {
        activeFilters: newActiveFilters,
        filteredProducts,
      };
    });
  },

  clearAllFilters: () => {
    set(state => ({
      activeFilters: new Set<FilterType>(),
      searchQuery: '',
      filteredProducts: state.products, // Show all products when no filters
    }));
  },

  setSearchQuery: (searchQuery: string) => {
    set(state => {
      // Apply search query along with active filters
      let filtered = filterProductsByActiveFilters(
        state.products, 
        state.activeFilters
      );

      // Apply search if query exists
      if (searchQuery.trim()) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      return {
        searchQuery,
        filteredProducts: filtered,
      };
    });
  },
});