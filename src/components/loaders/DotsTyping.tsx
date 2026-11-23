"use client";

import * as React from "react";
import type { BaseLoaderProps, LoaderSize } from "../../types";
import { cn } from "../../utils/cn";

export interface DotsTypingProps extends BaseLoaderProps, React.HTMLAttributes<HTMLSpanElement> {
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
function resolveDotsTypingSize(size: LoaderSize): { className?: string; inlineStyle?: React.CSSProperties } {
  if (typeof size === "number") {
    return {
      inlineStyle: {
        "--rl-dots-size": `${size}px`,
        "--rl-dots-gap": `${Math.max(2, Math.round(size * 0.5))}px`,
      } as React.CSSProperties,
    };
  }

  return {
    className: `rl-dots-typing--${size}`,
  };
}

/**
 * Subtle chat typing wave indicator simulating user conversation typing in chat bubbles.
 *
 * @example
 * ```tsx
 * //Default medium typing indicator
 * <DotsTyping />
 *
 * //Customized size and color
 * <DotsTyping size="sm" color="#64748b" label="Sarah is typing..." />
 *
 * //Explicit pixel sizing
 * <DotsTyping size={6} spacing={4} />
 * ```
 */
export const DotsTyping = React.forwardRef<HTMLSpanElement, DotsTypingProps>(
  (
    {
      size = "md",
      color,
      speed,
      spacing,
      label = "Typing...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const { className: sizeClassName, inlineStyle: sizeInlineStyle } = resolveDotsTypingSize(size);

    const mergedStyle: React.CSSProperties = {
      ...sizeInlineStyle,
      ...(color ? ({ "--rl-dots-typing-color": color } as React.CSSProperties) : {}),
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
        className={cn("rl-dots-typing", sizeClassName, className)}
        style={mergedStyle}
        {...rest}
      >
        <span className="rl-dots-typing-dot rl-animated" aria-hidden="true" />
        <span className="rl-dots-typing-dot rl-animated" aria-hidden="true" />
        <span className="rl-dots-typing-dot rl-animated" aria-hidden="true" />

        {label ? <span className="rl-sr-only">{label}</span> : null}
      </span>
    );
  }
);

DotsTyping.displayName = "DotsTyping";
