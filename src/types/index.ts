import type { HTMLAttributes } from "react";

/**
 * Standard preset size variants or an explicit pixel number.
 */
export type LoaderSize = "sm" | "md" | "lg" | "xl" | number;

/**
 * Base props common to visual loader components.
 */
export interface BaseLoaderProps {
  /**
   * Size of the loader. Accepts preset tokens ("sm", "md", "lg", "xl") or an explicit pixel number.
   * @default "md"
   */
  size?: LoaderSize;

  /**
   * Color of the animated loader element.
   * Defaults to CSS variable `--rl-primary`.
   */
  color?: string;

  /**
   * Animation cycle speed in seconds.
   * Overrides the component's default animation duration.
   */
  speed?: number;

  /**
   * Accessible announcement for screen readers.
   * @default "Loading..."
   */
  label?: string;
}

/**
 * Visual shape variants for skeleton placeholders.
 */
export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";

/**
 * Animation style modes for skeleton placeholders.
 */
export type SkeletonAnimation = "shimmer" | "pulse" | "none";

/**
 * Base props common to skeleton loading placeholder components.
 */
export interface BaseSkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Explicit width of the skeleton element (CSS string or pixel number).
   */
  width?: string | number;

  /**
   * Explicit height of the skeleton element (CSS string or pixel number).
   */
  height?: string | number;

  /**
   * Custom border radius (CSS string or pixel number).
   */
  borderRadius?: string | number;

  /**
   * Visual shape variant.
   * @default "text"
   */
  variant?: SkeletonVariant;

  /**
   * Animation effect applied to the placeholder.
   * @default "shimmer"
   */
  animation?: SkeletonAnimation;
}
