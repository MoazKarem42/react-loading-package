"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface DashedSpinnerProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Stroke width thickness of the dashed path in pixels.
   * @default 3
   */
  thickness?: number;

  /**
   * Dash pattern for the stroke (dash length and gap).
   * @default "4 4"
   */
  dashArray?: string;

  /**
   * Background track color for the full circle.
   * Defaults to "transparent".
   */
  trackColor?: string;
}

/**
 * Maps size prop to standard dimension (number in px or CSS dimension).
 */
function resolveDashedSpinnerSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  }

  return {
    className: `rl-dashed-spinner--${size}`,
  };
}

/**
 * Rotating dashed circular loading indicator for upload, synchronization, and progress states.
 *
 * @example
 * ```tsx
 * //Default medium dashed spinner
 * <DashedSpinner />
 *
 * //Customized size, color, and dash pattern
 * <DashedSpinner size="lg" color="#3b82f6" dashArray="6 3" thickness={3} />
 *
 * //Explicit pixel sizing
 * <DashedSpinner size={36} />
 * ```
 */
export const DashedSpinner = React.forwardRef<HTMLSpanElement, DashedSpinnerProps>(
  (
    {
      size = "md",
      color,
      trackColor,
      thickness = 3,
      dashArray = "4 4",
      speed,
      label = "Loading...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveDashedSpinnerSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-dashed-spinner-color": color } as React.CSSProperties) : {}),
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
        className={cn("rl-dashed-spinner rl-animated", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <svg
          className="rl-dashed-spinner-svg"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {trackColor ? (
            /*Static background track */
            <circle
              className="rl-dashed-spinner-track"
              cx="16"
              cy="16"
              r={radius}
              strokeWidth={thickness}
            />
          ) : null}
          {/*Animated rotating dashed ring */}
          <circle
            className="rl-dashed-spinner-head"
            cx="16"
            cy="16"
            r={radius}
            strokeWidth={thickness}
            strokeDasharray={dashArray}
          />
        </svg>

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

DashedSpinner.displayName = "DashedSpinner";
