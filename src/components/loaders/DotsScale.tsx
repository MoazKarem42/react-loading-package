"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface DotsScaleProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
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
function resolveDotsScaleSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        "--rl-dots-size": `${size}px`,
        "--rl-dots-gap": `${Math.max(2, Math.round(size * 0.5))}px`,
      } as React.CSSProperties,
    };
  }

  return {
    className: `rl-dots-scale--${size}`,
  };
}

/**
 * Three dots scaling up and down smoothly in sequence.
 *
 * @example
 * ```tsx
 * //Default medium scaling dots
 * <DotsScale />
 *
 * //Customized size, color, and speed
 * <DotsScale size="lg" color="#3b82f6" speed={1.0} label="Connecting..." />
 *
 * //Explicit pixel sizing and spacing
 * <DotsScale size={14} spacing={8} />
 * ```
 */
export const DotsScale = React.forwardRef<HTMLSpanElement, DotsScaleProps>(
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
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveDotsScaleSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-dots-scale-color": color } as React.CSSProperties) : {}),
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
        className={cn("rl-dots-scale", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <span className="rl-dots-scale-dot rl-animated" aria-hidden="true" />
        <span className="rl-dots-scale-dot rl-animated" aria-hidden="true" />
        <span className="rl-dots-scale-dot rl-animated" aria-hidden="true" />

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

DotsScale.displayName = "DotsScale";
