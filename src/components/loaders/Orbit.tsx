"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface OrbitProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Background track color for the orbit path.
   * Defaults to CSS variable `--rl-spinner-track`.
   */
  trackColor?: string;

  /**
   * Diameter of the orbiting satellite dot in pixels.
   * @default 5
   */
  dotSize?: number;

  /**
   * Whether to display a central core dot.
   * @default false
   */
  showCore?: boolean;
}

/**
 * Maps size prop to standard dimension (number in px or CSS dimension).
 */
function resolveOrbitSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  }

  return {
    className: `rl-orbit--${size}`,
  };
}

/**
 * Smooth satellite dot orbiting around a circular track.
 *
 * @example
 * ```tsx
 * //Default medium orbit loader
 * <Orbit />
 *
 * //Customized size, color, and central core
 * <Orbit size="lg" color="#3b82f6" showCore dotSize={6} />
 *
 * //Explicit pixel sizing
 * <Orbit size={44} />
 * ```
 */
export const Orbit = React.forwardRef<HTMLSpanElement, OrbitProps>(
  (
    {
      size = "md",
      color,
      trackColor,
      dotSize = 5,
      showCore = false,
      speed,
      label = "Loading...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveOrbitSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-orbit-color": color } as React.CSSProperties) : {}),
      ...(trackColor ? ({ "--rl-orbit-track": trackColor } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...style,
    };

    const satelliteRadius = dotSize / 2;

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-orbit", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <svg
          className="rl-orbit-svg"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/*Circular orbit track */}
          <circle
            className="rl-orbit-track"
            cx="16"
            cy="16"
            r={12}
            strokeWidth={1.5}
          />
          {/*Optional central core dot */}
          {showCore ? (
            <circle
              className="rl-orbit-core"
              cx="16"
              cy="16"
              r={2.5}
            />
          ) : null}
          {/*Orbiting satellite group */}
          <g className="rl-orbit-satellite rl-animated">
            <circle
              className="rl-orbit-dot"
              cx="16"
              cy={4}
              r={satelliteRadius}
            />
          </g>
        </svg>

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

Orbit.displayName = "Orbit";
