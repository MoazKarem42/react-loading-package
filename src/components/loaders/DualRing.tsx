"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface DualRingProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Stroke width thickness of the concentric rings in pixels.
   * @default 2.5
   */
  thickness?: number;

  /**
   * Color of the secondary (inner) ring.
   * Defaults to `color` or CSS variable `--rl-primary`.
   */
  secondaryColor?: string;

  /**
   * Background track color for the concentric circles.
   * Defaults to "transparent".
   */
  trackColor?: string;
}

/**
 * Maps size prop to standard dimension (number in px or CSS dimension).
 */
function resolveDualRingSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  }

  return {
    className: `rl-dual-ring--${size}`,
  };
}

/**
 * Dual concentric ring animated loading indicator with opposing spinning directions.
 *
 * @example
 * ```tsx
 * //Default medium dual ring
 * <DualRing />
 *
 * //Customized size, dual colors, and thickness
 * <DualRing size="lg" color="#3b82f6" secondaryColor="#93c5fd" thickness={3} />
 *
 * //Explicit pixel sizing
 * <DualRing size={40} />
 * ```
 */
export const DualRing = React.forwardRef<HTMLSpanElement, DualRingProps>(
  (
    {
      size = "md",
      color,
      secondaryColor,
      trackColor,
      thickness = 2.5,
      speed,
      label = "Loading...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveDualRingSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-dual-ring-outer": color } as React.CSSProperties) : {}),
      ...(secondaryColor ? ({ "--rl-dual-ring-inner": secondaryColor } as React.CSSProperties) : {}),
      ...(trackColor ? ({ "--rl-spinner-track": trackColor } as React.CSSProperties) : {}),
      ...(speed !== undefined
        ? ({
            "--rl-speed": `${speed}s`,
            "--rl-inner-speed": `${speed * 0.8}s`,
          } as React.CSSProperties)
        : {}),
      ...style,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-dual-ring", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <svg
          className="rl-dual-ring-svg"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {trackColor ? (
            <>
              {/*Static outer background track */}
              <circle
                className="rl-dual-ring-track"
                cx="16"
                cy="16"
                r={14}
                strokeWidth={thickness}
              />
              {/*Static inner background track */}
              <circle
                className="rl-dual-ring-track"
                cx="16"
                cy="16"
                r={9}
                strokeWidth={thickness}
              />
            </>
          ) : null}
          {/*Outer spinning ring */}
          <circle
            className="rl-dual-ring-outer rl-animated"
            cx="16"
            cy="16"
            r={14}
            strokeWidth={thickness}
            strokeDasharray="44 44"
          />
          {/*Inner reverse spinning ring */}
          <circle
            className="rl-dual-ring-inner rl-animated"
            cx="16"
            cy="16"
            r={9}
            strokeWidth={thickness}
            strokeDasharray="28 28"
          />
        </svg>

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

DualRing.displayName = "DualRing";
