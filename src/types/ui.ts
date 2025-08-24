import { CategoryExpansionState } from "./filter";

export interface UIState {
    isLoading: boolean;
    error: string | null;
    expandedCategories: CategoryExpansionState;
  }
  
  // Shared component props interfaces
  export interface BaseComponentProps {
    className?: string;
    'data-testid'?: string;
  }