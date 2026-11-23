"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface BarsWaveProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Animation cycle speed in seconds.
   * @default 1.2
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
function resolveBarsWaveSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        "--rl-bars-wave-height": `${size}px`,
        "--rl-bars-wave-width": `${Math.max(2, Math.round(size * 0.16))}px`,
        "--rl-bars-wave-gap": `${Math.max(2, Math.round(size * 0.15))}px`,
      } as React.CSSProperties,
    };
  }

  return {
    className: `rl-bars-wave--${size}`,
  };
}

/**
 * Animated soundwave equalizer bars loader with sequential traveling wave effect.
 *
 * @example
 * ```tsx
 * //Default medium soundwave bars
 * <BarsWave />
 *
 * //Customized size, color, and animation speed
 * <BarsWave size="lg" color="#3b82f6" speed={1.0} label="Processing audio..." />
 *
 * //Explicit pixel sizing and spacing
 * <BarsWave size={32} spacing={4} />
 * ```
 */
export const BarsWave = React.forwardRef<HTMLSpanElement, BarsWaveProps>(
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
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveBarsWaveSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-bars-wave-color": color } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...(spacing !== undefined
        ? ({
            "--rl-bars-wave-gap": typeof spacing === "number" ? `${spacing}px` : spacing,
          } as React.CSSProperties)
        : {}),
      ...style,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-bars-wave", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <span className="rl-bars-wave-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-wave-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-wave-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-wave-bar rl-animated" aria-hidden="true" />
        <span className="rl-bars-wave-bar rl-animated" aria-hidden="true" />

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

BarsWave.displayName = "BarsWave";
