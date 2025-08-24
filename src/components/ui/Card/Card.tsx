import React from "react";
import styles from "./Card.module.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "flat";
  padding?: "none" | "small" | "medium" | "large";
  interactive?: boolean;
  isLoading?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

// 👇 Extend the type to include subcomponents
interface CardComponent extends React.FC<CardProps> {
  Header: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Content: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  Footer: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

export const Card: CardComponent = ({
  variant = "default",
  padding = "medium",
  interactive = false,
  isLoading = false,
  header,
  footer,
  className = "",
  children,
  tabIndex,
  role,
  ...props
}) => {
  const cardClasses = [
    styles.card,
    styles[`card--${variant}`],
    styles[`card--padding-${padding}`],
    interactive && styles["card--interactive"],
    isLoading && styles["card--loading"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const accessibilityProps = interactive
    ? {
        tabIndex: tabIndex ?? 0,
        role: role ?? "button",
        ...props,
      }
    : props;

  return (
    <div className={cardClasses} {...accessibilityProps}>
      {isLoading && <div className={styles.loadingOverlay} aria-hidden="true" />}

      {header && <div className={styles.cardHeader}>{header}</div>}

      {children && <div className={styles.cardContent}>{children}</div>}

      {footer && <div className={styles.cardFooter}>{footer}</div>}
    </div>
  );
};

// Assign compound subcomponents
Card.Header = ({ className = "", children, ...props }) => (
  <div className={`${styles.cardHeader} ${className}`} {...props}>
    {children}
  </div>
);

Card.Content = ({ className = "", children, ...props }) => (
  <div className={`${styles.cardContent} ${className}`} {...props}>
    {children}
  </div>
);

Card.Footer = ({ className = "", children, ...props }) => (
  <div className={`${styles.cardFooter} ${className}`} {...props}>
    {children}
  </div>
);

// Skeleton component stays the same
export const CardSkeleton: React.FC<{
  variant?: CardProps["variant"];
  padding?: CardProps["padding"];
  height?: number;
  className?: string;
}> = ({ variant = "default", padding = "medium", height = 200, className = "" }) => (
  <div
    className={`${styles.card} ${styles[`card--${variant}`]} ${styles[`card--padding-${padding}`]} ${styles.skeleton} ${className}`}
    style={{ height }}
    aria-hidden="true"
  >
    <div className={styles.skeletonContent}>
      <div className={styles.skeletonLine} style={{ width: "60%", height: "20px" }} />
      <div className={styles.skeletonLine} style={{ width: "80%", height: "16px", marginTop: "12px" }} />
      <div className={styles.skeletonLine} style={{ width: "40%", height: "16px", marginTop: "8px" }} />
    </div>
  </div>
);
