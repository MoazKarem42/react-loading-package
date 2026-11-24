"use client";

import * as React from "react";
import type { HTMLAttributes } from "react";
import type { BaseSkeletonProps, SkeletonAnimation } from "../../types";
import { cn } from "../../utils/cn";
import { Skeleton } from "./Skeleton";

/**
 * Supported size presets or pixel number for button skeletons.
 */
export type SkeletonButtonSize = "sm" | "md" | "lg" | number;

/**
 * Corner roundness presets or boolean flag for button skeletons.
 */
export type SkeletonButtonRounded = boolean | "sm" | "md" | "lg" | "full";

export interface SkeletonButtonProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Button size variant or custom height in pixels.
   * Preset options: "sm" (32px), "md" (40px), "lg" (48px), or custom pixel number.
   * @default "md"
   */
  size?: SkeletonButtonSize;

  /**
   * Whether the button placeholder expands to full width of its container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Corner radius preset or boolean flag.
   * @default "md"
   */
  rounded?: SkeletonButtonRounded;

  /**
   * Explicit width of the button placeholder (CSS length or pixel number).
   */
  width?: string | number;

  /**
   * Explicit height of the button placeholder (CSS length or pixel number).
   * Overrides the height determined by `size`.
   */
  height?: string | number;

  /**
   * Animation effect applied to the placeholder.
   * @default "shimmer"
   */
  animation?: SkeletonAnimation;

  /**
   * Custom border radius for the button placeholder (CSS length or pixel number).
   * Overrides `rounded`.
   */
  borderRadius?: BaseSkeletonProps["borderRadius"];

  /**
   * Accessible announcement label for screen readers.
   * @default "Loading button..."
   */
  label?: string;
}

const BUTTON_HEIGHT_MAP: Record<"sm" | "md" | "lg", number> = {
  sm: 32,
  md: 40,
  lg: 48,
};

const BUTTON_WIDTH_MAP: Record<"sm" | "md" | "lg", number> = {
  sm: 80,
  md: 100,
  lg: 120,
};

/**
 * Resolves button width and height dimensions.
 */
function resolveButtonDimensions(
  size: SkeletonButtonSize,
  fullWidth: boolean,
  customWidth?: string | number,
  customHeight?: string | number
): { height: string | number; width: string | number } {
  let height: string | number;
  let defaultWidth: string | number;

  if (typeof size === "number") {
    height = size;
    defaultWidth = Math.round(size * 2.5);
  } else {
    height = BUTTON_HEIGHT_MAP[size] || 40;
    defaultWidth = BUTTON_WIDTH_MAP[size] || 100;
  }

  if (customHeight !== undefined) {
    height = customHeight;
  }

  if (fullWidth) {
    return { height, width: "100%" };
  }

  if (customWidth !== undefined) {
    return { height, width: customWidth };
  }

  return { height, width: defaultWidth };
}

const ROUNDED_MAP: Record<"sm" | "md" | "lg" | "full", string> = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  full: "9999px",
};

/**
 * Resolves border radius CSS value from the rounded prop.
 */
function resolveBorderRadius(rounded: SkeletonButtonRounded): string {
  if (typeof rounded === "boolean") {
    if (rounded) {
      return "8px";
    }
    return "0px";
  }
  return ROUNDED_MAP[rounded] || "8px";
}

/**
 * Skeleton button placeholder for call-to-action buttons, toolbar actions, and interactive controls.
 *
 * @example
 * ```tsx
 * //Default medium button
 * <SkeletonButton />
 *
 * //Full width large pill button
 * <SkeletonButton size="lg" fullWidth rounded="full" />
 *
 * //Custom dimensions with pulse animation
 * <SkeletonButton width={140} height={44} rounded="sm" animation="pulse" />
 * ```
 */
export const SkeletonButton = React.forwardRef<HTMLDivElement, SkeletonButtonProps>(
  (
    {
      size = "md",
      fullWidth = false,
      rounded = "md",
      width: customWidth,
      height: customHeight,
      animation = "shimmer",
      borderRadius: customBorderRadius,
      label = "Loading button...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const dimensions = resolveButtonDimensions(size, fullWidth, customWidth, customHeight);
    const resolvedRadius = customBorderRadius !== undefined ? customBorderRadius : resolveBorderRadius(rounded);

    const sizeClass = typeof size === "string" ? `rl-skeleton-button--${size}` : undefined;

    const containerStyle: React.CSSProperties = {
      display: fullWidth ? "flex" : "inline-flex",
      width: typeof dimensions.width === "number" ? `${dimensions.width}px` : dimensions.width,
      height: typeof dimensions.height === "number" ? `${dimensions.height}px` : dimensions.height,
      ...style,
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn(
          "rl-skeleton-button",
          sizeClass,
          fullWidth && "rl-skeleton-button--full-width",
          className
        )}
        style={containerStyle}
        {...rest}
      >
        {label ? <span className="rl-sr-only">{label}</span> : null}
        <Skeleton
          variant="rectangular"
          animation={animation}
          width="100%"
          height="100%"
          borderRadius={resolvedRadius}
          aria-hidden={true}
          role="presentation"
          label=""
        />
      </div>
    );
  }
);

SkeletonButton.displayName = "SkeletonButton";
