"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface RippleProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Border width thickness of the ripple rings in pixels.
   * @default 2
   */
  thickness?: number;
}

/**
 * Maps size prop to standard dimensions.
 */
function resolveRippleSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  }

  return {
    className: `rl-ripple--${size}`,
  };
}

/**
 * Expanding concentric ripple radar wave indicator with smooth dissipation.
 *
 * @example
 * ```tsx
 * //Default medium ripple loader
 * <Ripple />
 *
 * //Customized size, color, speed, and ring thickness
 * <Ripple size="lg" color="#06b6d4" thickness={3} speed={1.4} label="Scanning network..." />
 *
 * //Explicit pixel sizing
 * <Ripple size={48} thickness={2.5} />
 * ```
 */
export const Ripple = React.forwardRef<HTMLSpanElement, RippleProps>(
  (
    {
      size = "md",
      color,
      thickness = 2,
      speed,
      label = "Loading...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveRippleSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-ripple-color": color } as React.CSSProperties) : {}),
      ...(thickness !== 2 ? ({ "--rl-ripple-thickness": `${thickness}px` } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...style,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-ripple", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <span className="rl-ripple-ring rl-animated" aria-hidden="true" />
        <span className="rl-ripple-ring rl-animated" aria-hidden="true" />
        <span className="rl-ripple-ring rl-animated" aria-hidden="true" />

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

Ripple.displayName = "Ripple";
