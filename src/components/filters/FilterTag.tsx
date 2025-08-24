import React from 'react';
import type { FilterTag as FilterTagType } from '../../types/filter';
import styles from './FilterTag.module.css';

export interface FilterTagProps {
  filter: FilterTagType;
  isActive: boolean;
  onClick: () => void;
}

export const FilterTag: React.FC<FilterTagProps> = ({
  filter,
  isActive,
  onClick,
}) => {
  const buttonClasses = [
    styles.tag,
    isActive && styles.tagActive,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`${isActive ? 'Remove' : 'Apply'} ${filter.label} filter`}
    >
      {filter.label}
      {isActive && (
        <span className={styles.activeIcon} aria-hidden="true">
          ✓
        </span>
      )}
    </button>
  );
};
