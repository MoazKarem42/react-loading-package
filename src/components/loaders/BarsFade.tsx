"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface BarsFadeProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
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
function resolveBarsFadeSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        "--rl-bars-fade-height": `${size}px`,
        "--rl-bars-fade-width": `${Math.max(2, Math.round(size * 0.16))}px`,
        "--rl-bars-fade-gap": `${Math.max(2, Math.round(size * 0.15))}px`,
      } as React.CSSProperties,
    };
  }

  return {
    className: `rl-bars-fade--${size}`,
  };
}

/**
 * Vertical bars loader with sequential opacity fade wave transitions.
 *
 * @example
 * ```tsx
 * //Default medium fading bars
 * <BarsFade />
 *
 * //Customized size, color, and speed
 * <BarsFade size="lg" color="#8b5cf6" speed={1.2} label="Buffering..." />
 *
 * //Explicit pixel sizing and spacing
 * <BarsFade size={30} spacing={5} />
 * ```
 */
export const BarsFade = React.forwardRef<HTMLSpanElement, BarsFadeProps>(
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
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveBarsFadeSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-bars-fade-color": color } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...(spacing !== undefined
        ? ({
            "--rl-bars-fade-gap": typeof spacing === "number" ? `${spacing}px` : spacing,
          } as React.CSSProperties)
        : {}),
      ...style,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-bars-fade", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <span className="rl-bars-fade-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-fade-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-fade-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-fade-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-fade-bar rl-animated" aria-hidden="true" />

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

BarsFade.displayName = "BarsFade";
