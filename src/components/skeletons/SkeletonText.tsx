"use client";

import * as React from "react";
import type { HTMLAttributes } from "react";
import type { BaseSkeletonProps, SkeletonAnimation, SkeletonVariant } from "../../types";
import { cn } from "../../utils/cn";
import { Skeleton } from "./Skeleton";

export interface SkeletonTextProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Number of text lines to display.
   * @default 3
   */
  lines?: number;

  /**
   * Spacing between text lines (CSS length or pixel number).
   * @default 8
   */
  gap?: string | number;

  /**
   * Height of each individual text line (CSS length or pixel number).
   * @default 16
   */
  lineHeight?: string | number;

  /**
   * Width of the last text line (CSS length or pixel number).
   * Shorter than preceding lines unless lines is 1 or explicitly specified.
   * @default "60%"
   */
  lastLineWidth?: string | number;

  /**
   * Width of the container and standard text lines (CSS length or pixel number).
   * @default "100%"
   */
  width?: string | number;

  /**
   * Animation effect applied to the skeleton lines.
   * @default "shimmer"
   */
  animation?: SkeletonAnimation;

  /**
   * Visual shape variant for the skeleton lines.
   * @default "text"
   */
  variant?: SkeletonVariant;

  /**
   * Custom border radius for the skeleton lines (CSS length or pixel number).
   */
  borderRadius?: BaseSkeletonProps["borderRadius"];

  /**
   * Accessible announcement label for screen readers.
   * @default "Loading text..."
   */
  label?: string;
}

/**
 * Resolves the width for a given text skeleton line.
 */
function resolveLineWidth(
  index: number,
  totalLines: number,
  lastWidth: string | number,
  isLastLineExplicit: boolean
): string | number {
  if (totalLines === 1) {
    if (isLastLineExplicit) {
      return lastWidth;
    }
    return "100%";
  }

  if (index === totalLines - 1) {
    return lastWidth;
  }

  return "100%";
}

/**
 * Skeleton placeholder for multiline text blocks, paragraphs, and descriptions.
 *
 * @example
 * ```tsx
 * //Default 3 lines placeholder
 * <SkeletonText />
 *
 * //Single headline line
 * <SkeletonText lines={1} lineHeight={24} width="80%" />
 *
 * //Customized paragraphs with pulse animation
 * <SkeletonText lines={5} gap={12} lineHeight={18} lastLineWidth="40%" animation="pulse" />
 * ```
 */
export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  (
    {
      lines = 3,
      gap = 8,
      lineHeight = 16,
      lastLineWidth,
      width = "100%",
      animation = "shimmer",
      variant = "text",
      borderRadius,
      label = "Loading text...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const isLastLineExplicit = lastLineWidth !== undefined;
    const resolvedLastLineWidth = lastLineWidth !== undefined ? lastLineWidth : "60%";
    const totalLines = Math.max(1, lines);
    const lineIndices = Array.from({ length: totalLines }, (_, i) => i);

    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      width: typeof width === "number" ? `${width}px` : width,
      gap: typeof gap === "number" ? `${gap}px` : gap,
      ...style,
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn("rl-skeleton-text", className)}
        style={containerStyle}
        {...rest}
      >
        {label ? <span className="rl-sr-only">{label}</span> : null}
        {lineIndices.map((index) => {
          const currentLineWidth = resolveLineWidth(
            index,
            totalLines,
            resolvedLastLineWidth,
            isLastLineExplicit
          );

          return (
            <Skeleton
              key={index}
              variant={variant}
              animation={animation}
              width={currentLineWidth}
              height={lineHeight}
              borderRadius={borderRadius}
              aria-hidden={true}
              role="presentation"
              label=""
            />
          );
        })}
      </div>
    );
  }
);

SkeletonText.displayName = "SkeletonText";
