import React from 'react';
import { useActiveFilters, useHasActiveFilters, useFilterActions } from '../../store';
import { FILTER_TAGS } from '../../utils/constants';
import styles from './FilterTags.module.css';
import { FilterTag } from './FilterTag';

export const FilterTags: React.FC = () => {
  const activeFilters = useActiveFilters();
  const hasActiveFilters = useHasActiveFilters();
  const { toggleFilter, clearAllFilters } = useFilterActions();

  // Debug logging
  console.log('FilterTags - activeFilters:', Array.from(activeFilters));
  console.log('FilterTags - hasActiveFilters:', hasActiveFilters);

  return (
    <div className={styles.container}>
      <div className={styles.tags}>
        {FILTER_TAGS.map(filter => (
          <FilterTag
            key={filter.id}
            filter={filter}
            isActive={activeFilters.has(filter.id)}
            onClick={() => toggleFilter(filter.id)}
          />
        ))}
      </div>
      
      {hasActiveFilters && (
        <button 
          className={styles.clearButton}
          onClick={clearAllFilters}
          aria-label="Clear all filters"
        >
          Clear All
        </button>
      )}
    </div>
  );
};
