"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface ChasingRingProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Stroke width thickness of the chasing arc in pixels.
   * @default 3
   */
  thickness?: number;

  /**
   * Background track color for the circle.
   * Defaults to "transparent".
   */
  trackColor?: string;
}

/**
 * Maps size prop to standard dimension (number in px or CSS dimension).
 */
function resolveChasingRingSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  }

  return {
    className: `rl-chasing-ring--${size}`,
  };
}

/**
 * Material Design-style expanding and contracting circular arc loading indicator.
 *
 * @example
 * ```tsx
 * //Default medium chasing ring
 * <ChasingRing />
 *
 * //Customized size, color, and thickness
 * <ChasingRing size="lg" color="#3b82f6" thickness={3.5} />
 *
 * //Explicit pixel sizing
 * <ChasingRing size={48} />
 * ```
 */
export const ChasingRing = React.forwardRef<HTMLSpanElement, ChasingRingProps>(
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
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveChasingRingSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-chasing-ring-color": color } as React.CSSProperties) : {}),
      ...(trackColor ? ({ "--rl-spinner-track": trackColor } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...style,
    };

    const radius = 16 - thickness / 2;

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-chasing-ring", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <svg
          className="rl-chasing-ring-svg rl-animated"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {trackColor ? (
            /*Static background track */
            <circle
              className="rl-chasing-ring-track"
              cx="16"
              cy="16"
              r={radius}
              strokeWidth={thickness}
            />
          ) : null}
          {/*Animated expanding/contracting arc */}
          <circle
            className="rl-chasing-ring-arc rl-animated"
            cx="16"
            cy="16"
            r={radius}
            strokeWidth={thickness}
          />
        </svg>

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

ChasingRing.displayName = "ChasingRing";
