"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface HeartbeatProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Animation cycle speed in seconds.
   * @default 1.2
   */
  speed?: number;
}

/**
 * Maps size prop to standard dimensions.
 */
function resolveHeartbeatSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        width: `${size}px`,
        height: `${size}px`,
      },
    };
  }

  return {
    className: `rl-heartbeat--${size}`,
  };
}

/**
 * Pulsating cardiac heartbeat loader with realistic physiological double-beat rhythm.
 *
 * @example
 * ```tsx
 * //Default medium heartbeat loader
 * <Heartbeat />
 *
 * //Customized size, color, and pacing
 * <Heartbeat size="lg" color="#ef4444" speed={1.0} label="Monitoring vitals..." />
 *
 * //Explicit pixel sizing
 * <Heartbeat size={36} />
 * ```
 */
export const Heartbeat = React.forwardRef<HTMLSpanElement, HeartbeatProps>(
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
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveHeartbeatSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-heartbeat-color": color } as React.CSSProperties) : {}),
      ...(speed !== undefined ? ({ "--rl-speed": `${speed}s` } as React.CSSProperties) : {}),
      ...style,
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("rl-heartbeat", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <svg
          className="rl-heartbeat-svg rl-animated"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            className="rl-heartbeat-shape"
            d="M16 28.2S3 19.5 3 10.5C3 5.8 6.8 2 11.5 2C14.2 2 15.6 3.5 16 4.2C16.4 3.5 17.8 2 20.5 2C25.2 2 29 5.8 29 10.5C29 19.5 16 28.2 16 28.2Z"
          />
        </svg>

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

Heartbeat.displayName = "Heartbeat";
