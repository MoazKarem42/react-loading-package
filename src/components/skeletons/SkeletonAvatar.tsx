"use client";

import * as React from "react";
import type { HTMLAttributes } from "react";
import type { BaseSkeletonProps, SkeletonAnimation, SkeletonVariant } from "../../types";
import { cn } from "../../utils/cn";
import { Skeleton } from "./Skeleton";

/**
 * Supported size presets or pixel number for avatar skeletons.
 */
export type SkeletonAvatarSize = "sm" | "md" | "lg" | "xl" | number;

/**
 * Shape presets for avatar skeletons.
 */
export type SkeletonAvatarShape = "circular" | "rounded" | "square";

export interface SkeletonAvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Size of the avatar placeholder.
   * Preset options: "sm" (32px), "md" (40px), "lg" (48px), "xl" (64px), or custom pixel number.
   * @default "md"
   */
  size?: SkeletonAvatarSize;

  /**
   * Shape of the avatar placeholder.
   * @default "circular"
   */
  shape?: SkeletonAvatarShape;

  /**
   * Whether to display accompanying text skeleton lines (title and subtitle).
   * @default false
   */
  withText?: boolean;

  /**
   * Animation effect applied to the placeholder.
   * @default "shimmer"
   */
  animation?: SkeletonAnimation;

  /**
   * Custom border radius for the avatar placeholder (CSS length or pixel number).
   */
  borderRadius?: BaseSkeletonProps["borderRadius"];

  /**
   * Accessible announcement label for screen readers.
   * @default "Loading avatar..."
   */
  label?: string;
}

const AVATAR_SIZE_MAP: Record<"sm" | "md" | "lg" | "xl", number> = {
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
};

/**
 * Resolves avatar pixel dimension from the size prop.
 */
function resolveAvatarDimension(size: SkeletonAvatarSize): number {
  if (typeof size === "number") {
    return size;
  }
  return AVATAR_SIZE_MAP[size] || 40;
}

/**
 * Resolves the SkeletonVariant for the given avatar shape.
 */
function resolveAvatarVariant(shape: SkeletonAvatarShape): SkeletonVariant {
  if (shape === "rounded") {
    return "rounded";
  }
  if (shape === "square") {
    return "rectangular";
  }
  return "circular";
}

/**
 * Computes container styles depending on withText layout.
 */
function resolveAvatarContainerStyle(
  dimension: number,
  withText: boolean,
  style?: React.CSSProperties
): React.CSSProperties {
  if (withText) {
    return {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      ...style,
    };
  }
  return {
    display: "inline-flex",
    width: dimension,
    height: dimension,
    ...style,
  };
}

/**
 * Skeleton avatar placeholder for user profiles, accounts, and contact cards.
 *
 * @example
 * ```tsx
 * //Default medium circular avatar
 * <SkeletonAvatar />
 *
 * //Large rounded avatar with text skeleton lines
 * <SkeletonAvatar size="lg" shape="rounded" withText />
 *
 * //Square custom dimension with pulse animation
 * <SkeletonAvatar size={56} shape="square" animation="pulse" />
 * ```
 */
export const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  (
    {
      size = "md",
      shape = "circular",
      withText = false,
      animation = "shimmer",
      borderRadius,
      label = "Loading avatar...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const dimension = resolveAvatarDimension(size);
    const skeletonVariant = resolveAvatarVariant(shape);
    const containerStyle = resolveAvatarContainerStyle(dimension, withText, style);

    const titleWidth = Math.max(90, Math.round(dimension * 2.8));
    const titleHeight = Math.max(12, Math.round(dimension * 0.32));
    const subtitleWidth = Math.max(60, Math.round(dimension * 1.8));
    const subtitleHeight = Math.max(10, Math.round(dimension * 0.25));

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn(
          "rl-skeleton-avatar",
          `rl-skeleton-avatar--${shape}`,
          withText && "rl-skeleton-avatar--with-text",
          className
        )}
        style={containerStyle}
        {...rest}
      >
        {label ? <span className="rl-sr-only">{label}</span> : null}
        <Skeleton
          variant={skeletonVariant}
          animation={animation}
          width={dimension}
          height={dimension}
          borderRadius={borderRadius}
          aria-hidden={true}
          role="presentation"
          label=""
        />
        {withText ? (
          <div
            className="rl-skeleton-avatar__text"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              gap: 6,
              justifyContent: "center",
            }}
            aria-hidden={true}
          >
            <Skeleton
              variant="text"
              animation={animation}
              width={titleWidth}
              height={titleHeight}
              aria-hidden={true}
              role="presentation"
              label=""
            />
            <Skeleton
              variant="text"
              animation={animation}
              width={subtitleWidth}
              height={subtitleHeight}
              aria-hidden={true}
              role="presentation"
              label=""
            />
          </div>
        ) : null}
      </div>
    );
  }
);

SkeletonAvatar.displayName = "SkeletonAvatar";
