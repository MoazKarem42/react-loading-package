"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface ClockProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Stroke thickness of the clock rim and hands in pixels.
   * @default 2
   */
  thickness?: number;

  /**
   * Background face color of the clock.
   * Defaults to "transparent".
   */
  faceColor?: string;
}

/**
 * Maps size prop to standard dimension (number in px or CSS dimension).
 */
function resolveClockSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  }

  return {
    className: `rl-clock--${size}`,
  };
}

/**
 * Clock animated loading indicator with rotating hour and minute hands for scheduling and long-running tasks.
 *
 * @example
 * ```tsx
 * //Default medium clock
 * <Clock />
 *
 * //Customized size, color, and thickness
 * <Clock size="lg" color="#3b82f6" thickness={2.5} speed={1.5} />
 *
 * //Explicit pixel sizing
 * <Clock size={48} />
 * ```
 */
export const Clock = React.forwardRef<HTMLSpanElement, ClockProps>(
  (
    {
      size = "md",
      color,
      faceColor,
      thickness = 2,
      speed,
      label = "Loading...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveClockSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-clock-color": color } as React.CSSProperties) : {}),
      ...(faceColor ? ({ "--rl-clock-face": faceColor } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...style,
    };

    const radius = 16 - thickness / 2;

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-clock", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <svg
          className="rl-clock-svg"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/*Clock outer rim */}
          <circle
            className="rl-clock-rim"
            cx="16"
            cy="16"
            r={radius}
            strokeWidth={thickness}
          />
          {/*Minute hand (faster rotation) */}
          <line
            className="rl-clock-minute rl-animated"
            x1="16"
            y1="16"
            x2="16"
            y2="7"
            strokeWidth={thickness * 0.85}
          />
          {/*Hour hand (slower rotation) */}
          <line
            className="rl-clock-hour rl-animated"
            x1="16"
            y1="16"
            x2="16"
            y2="10.5"
            strokeWidth={thickness * 1.15}
          />
          {/*Center pivot pin */}
          <circle
            className="rl-clock-pin"
            cx="16"
            cy="16"
            r={thickness}
          />
        </svg>

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

Clock.displayName = "Clock";
