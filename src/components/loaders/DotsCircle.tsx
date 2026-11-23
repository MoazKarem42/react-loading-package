"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface DotsCircleProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Diameter of each circle dot in pixels.
   * @default 4
   */
  dotSize?: number;
}

/**
 * Maps size prop to standard dimension (number in px or CSS dimension).
 */
function resolveDotsCircleSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  }

  return {
    className: `rl-dots-circle--${size}`,
  };
}

/**
 * Dots arranged in a circle with sequential opacity rotation in classic iOS style.
 *
 * @example
 * ```tsx
 * //Default medium circular dots loader
 * <DotsCircle />
 *
 * //Customized size, color, and dot diameter
 * <DotsCircle size="lg" color="#2563eb" dotSize={5} speed={0.8} />
 *
 * //Explicit pixel sizing
 * <DotsCircle size={32} />
 * ```
 */
export const DotsCircle = React.forwardRef<HTMLSpanElement, DotsCircleProps>(
  (
    {
      size = "md",
      color,
      dotSize = 4,
      speed,
      label = "Loading...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveDotsCircleSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-dots-circle-color": color } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...style,
    };

    const dotRadius = dotSize / 2;

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-dots-circle", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <svg
          className="rl-dots-circle-svg"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/*Clockwise 8 dots starting at 12 o'clock */}
          <circle className="rl-dots-circle-dot rl-animated" cx="16" cy="4" r={dotRadius} />
          <circle className="rl-dots-circle-dot rl-animated" cx="24.49" cy="7.51" r={dotRadius} />
          <circle className="rl-dots-circle-dot rl-animated" cx="28" cy="16" r={dotRadius} />
          <circle className="rl-dots-circle-dot rl-animated" cx="24.49" cy="24.49" r={dotRadius} />
          <circle className="rl-dots-circle-dot rl-animated" cx="16" cy="28" r={dotRadius} />
          <circle className="rl-dots-circle-dot rl-animated" cx="7.51" cy="24.49" r={dotRadius} />
          <circle className="rl-dots-circle-dot rl-animated" cx="4" cy="16" r={dotRadius} />
          <circle className="rl-dots-circle-dot rl-animated" cx="7.51" cy="7.51" r={dotRadius} />
        </svg>

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

DotsCircle.displayName = "DotsCircle";
