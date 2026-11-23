"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface DotsFadeProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Animation cycle speed in seconds.
   * @default 1.2
   */
  speed?: number;

  /**
   * Spacing between dots in pixels or CSS length.
   * Overrides the default size-based gap.
   */
  spacing?: number | string;
}

/**
 * Maps size prop to standard dot dimensions.
 */
function resolveDotsFadeSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        "--rl-dots-size": `${size}px`,
        "--rl-dots-gap": `${Math.max(2, Math.round(size * 0.5))}px`,
      } as React.CSSProperties,
    };
  }

  return {
    className: `rl-dots-fade--${size}`,
  };
}

/**
 * Three dots fading in and out smoothly in sequence with pure opacity transitions.
 *
 * @example
 * ```tsx
 * //Default medium fading dots
 * <DotsFade />
 *
 * //Customized size, color, and speed
 * <DotsFade size="lg" color="#2563eb" speed={1.0} label="Syncing..." />
 *
 * //Explicit pixel sizing and spacing
 * <DotsFade size={10} spacing={6} />
 * ```
 */
export const DotsFade = React.forwardRef<HTMLSpanElement, DotsFadeProps>(
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
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveDotsFadeSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-dots-fade-color": color } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...(spacing !== undefined
        ? ({
            "--rl-dots-gap": typeof spacing === "number" ? `${spacing}px` : spacing,
          } as React.CSSProperties)
        : {}),
      ...style,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-dots-fade", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <span className="rl-dots-fade-dot rl-animated" aria-hidden="true" />
        <span className="rl-dots-fade-dot rl-animated" aria-hidden="true" />
        <span className="rl-dots-fade-dot rl-animated" aria-hidden="true" />

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

DotsFade.displayName = "DotsFade";
