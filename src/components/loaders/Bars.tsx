"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface BarsProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
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
function resolveBarsSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        "--rl-bars-height": `${size}px`,
        "--rl-bars-width": `${Math.max(2, Math.round(size * 0.16))}px`,
        "--rl-bars-gap": `${Math.max(2, Math.round(size * 0.15))}px`,
      } as React.CSSProperties,
    };
  }

  return {
    className: `rl-bars--${size}`,
  };
}

/**
 * Five animated vertical bars loading indicator with a staggered wave effect and accessibility support.
 *
 * @example
 * ```tsx
 * // Default medium wave bars
 * <Bars />
 *
 * // Customized size, color, and speed
 * <Bars size="lg" color="#2563eb" speed={0.8} label="Processing audio..." />
 *
 * // Explicit pixel sizing and custom spacing
 * <Bars size={32} spacing={4} />
 * ```
 */
export const Bars = React.forwardRef<HTMLSpanElement, BarsProps>(
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
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveBarsSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-bars-color": color } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...(spacing !== undefined
        ? ({
            "--rl-bars-gap": typeof spacing === "number" ? `${spacing}px` : spacing,
          } as React.CSSProperties)
        : {}),
      ...style,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-bars", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <span className="rl-bars-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-bar rl-animated" aria-hidden="true" />

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

Bars.displayName = "Bars";
