"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface PulseProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Animation cycle speed in seconds.
   * @default 1.2
   */
  speed?: number;
}

/**
 * Maps size prop to standard dimensions.
 */
function resolvePulseSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        width: `${size}px`,
        height: `${size}px`,
        "--rl-pulse-core-size": `${Math.max(4, Math.round(size * 0.4))}px`,
      } as React.CSSProperties,
    };
  }

  return {
    className: `rl-pulse--${size}`,
  };
}

/**
 * Pulsing radial circular loading indicator with radiating ring animation.
 *
 * @example
 * ```tsx
 * //Default medium pulse indicator
 * <Pulse />
 *
 * //Customized size, color, and speed
 * <Pulse size="lg" color="#3b82f6" speed={1.0} label="Searching for signals..." />
 *
 * //Explicit pixel sizing
 * <Pulse size={40} />
 * ```
 */
export const Pulse = React.forwardRef<HTMLSpanElement, PulseProps>(
  (
    {
      size = "md",
      color,
      speed,
      label = "Loading...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolvePulseSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-pulse-color": color } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...style,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-pulse", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <span className="rl-pulse-ring rl-animated" aria-hidden="true" />
        <span className="rl-pulse-core rl-animated" aria-hidden="true" />

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

Pulse.displayName = "Pulse";
