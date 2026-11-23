"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface DotsBounceProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Animation cycle speed in seconds.
   * @default 1.4
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
function resolveDotsBounceSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        "--rl-dots-size": `${size}px`,
        "--rl-dots-gap": `${Math.max(2, Math.round(size * 0.5))}px`,
      } as React.CSSProperties,
    };
  }

  return {
    className: `rl-dots-bounce--${size}`,
  };
}

/**
 * Three bouncing dots animated loading indicator with sequential wave bounce.
 *
 * @example
 * ```tsx
 * //Default medium bouncing dots
 * <DotsBounce />
 *
 * //Customized size, color, and speed
 * <DotsBounce size="lg" color="#2563eb" speed={1.2} label="Waiting for response..." />
 *
 * //Explicit pixel sizing and custom spacing
 * <DotsBounce size={12} spacing={8} />
 * ```
 */
export const DotsBounce = React.forwardRef<HTMLSpanElement, DotsBounceProps>(
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
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveDotsBounceSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-dots-bounce-color": color } as React.CSSProperties) : {}),
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
        className={cn("rl-dots-bounce", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <span className="rl-dots-bounce-dot rl-animated" aria-hidden="true" />
        <span className="rl-dots-bounce-dot rl-animated" aria-hidden="true" />
        <span className="rl-dots-bounce-dot rl-animated" aria-hidden="true" />

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

DotsBounce.displayName = "DotsBounce";
