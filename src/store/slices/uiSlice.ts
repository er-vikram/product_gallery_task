import { StateCreator } from 'zustand';
import type { UIStore, AppStore } from '../types';
import type { CategoryExpansionState } from '../../types';
import { STORAGE_KEYS } from '../../utils/constants';

export const createUISlice: StateCreator<
  AppStore,
  [],
  [],
  UIStore
> = (set, get) => ({
  // Initial State - Load from localStorage if available
  expandedCategories: loadExpandedCategoriesFromStorage(),

  // Actions
  toggleCategoryExpansion: (category: string) => {
    set(state => {
      const newExpandedCategories = {
        ...state.expandedCategories,
        [category]: !state.expandedCategories[category],
      };
      
      // Persist to localStorage
      saveExpandedCategoriesToStorage(newExpandedCategories);
      
      return {
        expandedCategories: newExpandedCategories,
      };
    });
  },

  setAllCategoriesExpanded: (expanded: boolean) => {
    set(state => {
      const { categories } = state;
      const newExpandedCategories = categories.reduce(
        (acc, category) => ({ ...acc, [category]: expanded }),
        {} as CategoryExpansionState
      );
      
      // Persist to localStorage
      saveExpandedCategoriesToStorage(newExpandedCategories);
      
      return {
        expandedCategories: newExpandedCategories,
      };
    });
  },

  resetUIState: () => {
    const resetState = {};
    saveExpandedCategoriesToStorage(resetState);
    set({ expandedCategories: resetState });
  },
});

// Helper functions for localStorage persistence
const loadExpandedCategoriesFromStorage = (): CategoryExpansionState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.EXPANDED_CATEGORIES);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to load expanded categories from storage:', error);
    return {};
  }
};

const saveExpandedCategoriesToStorage = (state: CategoryExpansionState): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.EXPANDED_CATEGORIES, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save expanded categories to storage:', error);
  }
};