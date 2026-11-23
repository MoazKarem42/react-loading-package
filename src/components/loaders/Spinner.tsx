"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface SpinnerProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Stroke width thickness of the spinner path in pixels.
   * @default 3
   */
  thickness?: number;

  /**
   * Background track color for the full circle.
   * Defaults to CSS variable `--rl-spinner-track`.
   */
  trackColor?: string;
}

/**
 * Maps size prop to standard dimension (number in px or CSS dimension).
 */
function resolveSpinnerSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  }

  return {
    className: `rl-spinner--${size}`,
  };
}

/**
 * Circular animated loading indicator with accessibility support.
 *
 * @example
 * ```tsx
 * //Default medium spinner
 * <Spinner />
 *
 * //Customized size, color, and thickness
 * <Spinner size="lg" color="#2563eb" thickness={4} label="Fetching records..." />
 *
 * //Explicit pixel sizing
 * <Spinner size={40} />
 * ```
 */
export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    {
      size = "md",
      color,
      trackColor,
      thickness = 3,
      speed,
      label = "Loading...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveSpinnerSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-spinner-head": color } as React.CSSProperties) : {}),
      ...(trackColor ? ({ "--rl-spinner-track": trackColor } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...style,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-spinner rl-animated", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <svg
          className="rl-spinner-svg"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/*Static background track */}
          <circle
            className="rl-spinner-track"
            cx="16"
            cy="16"
            r={16 - thickness}
            strokeWidth={thickness}
          />
          {/*Animated spinning arc */}
          <circle
            className="rl-spinner-head"
            cx="16"
            cy="16"
            r={16 - thickness}
            strokeWidth={thickness}
            strokeDasharray="60 30"
          />
        </svg>

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

Spinner.displayName = "Spinner";
