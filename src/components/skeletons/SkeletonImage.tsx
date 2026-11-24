"use client";

import * as React from "react";
import type { SkeletonAnimation } from "../../types";
import { cn } from "../../utils/cn";
import { Skeleton } from "./Skeleton";

export interface SkeletonImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Explicit width of the image skeleton placeholder (CSS string or pixel number).
   * @default "100%"
   */
  width?: string | number;

  /**
   * Explicit height of the image skeleton placeholder (CSS string or pixel number).
   * Defaults to 200 unless aspectRatio is specified.
   * @default 200
   */
  height?: string | number;

  /**
   * Aspect ratio for responsive image placeholder scaling (e.g., "16/9", "4/3", "1/1").
   */
  aspectRatio?: string;

  /**
   * Border radius of the image placeholder (CSS string or pixel number).
   * @default 8
   */
  borderRadius?: string | number;

  /**
   * Animation effect applied to the skeleton background.
   * @default "shimmer"
   */
  animation?: SkeletonAnimation;

  /**
   * Accessible announcement label for screen readers.
   * @default "Loading image..."
   */
  label?: string;

  /**
   * Custom placeholder icon node to render in the center.
   * Replaces the default landscape photo SVG icon.
   */
  icon?: React.ReactNode;

  /**
   * Size of the centered placeholder icon in pixels.
   * @default 40
   */
  iconSize?: number;
}

//Subtle default landscape vector icon representing an image placeholder
function DefaultImageIcon({ size = 40 }: { size?: number }): React.ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width={size}
      height={size}
      className="rl-skeleton-image__icon"
      style={{
        color: "var(--rl-skeleton-icon, #94a3b8)",
        opacity: 0.6,
        position: "relative",
        zIndex: 1,
        flexShrink: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

//Format dimension value with px unit when numeric
function resolveDimension(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (typeof value === "number") {
    return `${value}px`;
  }
  return value;
}

/**
 * Skeleton placeholder for images with configurable aspect ratio and subtle vector icon.
 *
 * @example
 * ```tsx
 * //Default full-width image placeholder
 * <SkeletonImage />
 *
 * //16:9 responsive video or banner placeholder
 * <SkeletonImage aspectRatio="16/9" />
 *
 * //Square avatar-like image placeholder
 * <SkeletonImage width={120} height={120} borderRadius={12} />
 * ```
 */
export const SkeletonImage = React.forwardRef<HTMLDivElement, SkeletonImageProps>(
  (
    {
      width = "100%",
      height,
      aspectRatio,
      borderRadius = 8,
      animation = "shimmer",
      label = "Loading image...",
      icon,
      iconSize = 40,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const containerStyle: React.CSSProperties = {
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      ...style,
    };

    if (width !== undefined) {
      containerStyle.width = resolveDimension(width);
    }

    if (aspectRatio !== undefined) {
      containerStyle.aspectRatio = aspectRatio;
      if (height !== undefined) {
        containerStyle.height = resolveDimension(height);
      }
    } else {
      //Resolve height when aspectRatio is not provided
      const resolvedHeight = height !== undefined ? height : 200;
      containerStyle.height = resolveDimension(resolvedHeight);
    }

    if (borderRadius !== undefined) {
      containerStyle.borderRadius = resolveDimension(borderRadius);
    }

    //Render centered placeholder icon or custom icon
    let renderedIcon: React.ReactNode;
    if (icon) {
      renderedIcon = (
        <span
          className="rl-skeleton-image__icon-wrapper"
          style={{
            position: "relative",
            zIndex: 1,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
      );
    } else {
      renderedIcon = <DefaultImageIcon size={iconSize} />;
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn("rl-skeleton-image", className)}
        style={containerStyle}
        {...rest}
      >
        <Skeleton
          variant="rectangular"
          animation={animation}
          aria-hidden="true"
          label=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
          }}
        />
        {renderedIcon}
        {label ? <span className="rl-sr-only">{label}</span> : null}
      </div>
    );
  }
);

SkeletonImage.displayName = "SkeletonImage";
