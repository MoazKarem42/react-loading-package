"use client";

import * as React from "react";
import type { BaseSkeletonProps } from "../../types";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends BaseSkeletonProps {
  /**
   * Accessible announcement label for screen readers.
   * @default "Loading..."
   */
  label?: string;
}

/**
 * Base skeleton placeholder primitive component for asynchronous loading states.
 *
 * @example
 * ```tsx
 * //Text placeholder
 * <Skeleton variant="text" width="60%" />
 *
 * //Circular avatar placeholder
 * <Skeleton variant="circular" width={48} height={48} />
 *
 * //Rectangular card banner with pulse animation
 * <Skeleton variant="rectangular" height={200} animation="pulse" />
 * ```
 */
export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  (
    {
      variant = "text",
      animation = "shimmer",
      width,
      height,
      borderRadius,
      label = "Loading...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const inlineStyle: React.CSSProperties = { ...style };

    if (width !== undefined) {
      inlineStyle.width = typeof width === "number" ? `${width}px` : width;
    }
    if (height !== undefined) {
      inlineStyle.height = typeof height === "number" ? `${height}px` : height;
    }
    if (borderRadius !== undefined) {
      inlineStyle.borderRadius = typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius;
    }

    const animClass = animation === "none" ? "rl-skeleton--none" : `rl-skeleton--${animation}`;
    const animatedClass = animation === "none" ? undefined : "rl-animated";

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn(
          "rl-skeleton",
          `rl-skeleton--${variant}`,
          animClass,
          animatedClass,
          className
        )}
        style={inlineStyle}
        {...rest}
      >
        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

Skeleton.displayName = "Skeleton";

