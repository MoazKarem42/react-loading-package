"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface BarsScaleProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Animation cycle speed in seconds.
   * @default 1
   */
  speed?: number;

  /**
   * Spacing between bars in pixels or CSS length.
   * Overrides the default size-based gap.
   */
  spacing?: number | string;
}

/**
 * Maps size prop to standard bar dimensions.
 */
function resolveBarsScaleSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        "--rl-bars-scale-height": `${size}px`,
        "--rl-bars-scale-width": `${Math.max(2, Math.round(size * 0.16))}px`,
        "--rl-bars-scale-gap": `${Math.max(2, Math.round(size * 0.15))}px`,
      } as React.CSSProperties,
    };
  }

  return {
    className: `rl-bars-scale--${size}`,
  };
}

/**
 * Symmetrically scaling vertical bars loader with smooth center-out expansion.
 *
 * @example
 * ```tsx
 * //Default medium scaling bars
 * <BarsScale />
 *
 * //Customized size, color, and speed
 * <BarsScale size="lg" color="#10b981" speed={0.9} label="Analyzing..." />
 *
 * //Explicit pixel sizing and spacing
 * <BarsScale size={28} spacing={3} />
 * ```
 */
export const BarsScale = React.forwardRef<HTMLSpanElement, BarsScaleProps>(
  (
    {
      size = "md",
      color,
      speed,
      spacing,
      label = "Loading...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveBarsScaleSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-bars-scale-color": color } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...(spacing !== undefined
        ? ({
            "--rl-bars-scale-gap": typeof spacing === "number" ? `${spacing}px` : spacing,
          } as React.CSSProperties)
        : {}),
      ...style,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-bars-scale", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <span className="rl-bars-scale-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-scale-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-scale-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-scale-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-scale-bar rl-animated" aria-hidden="true" />

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

BarsScale.displayName = "BarsScale";
