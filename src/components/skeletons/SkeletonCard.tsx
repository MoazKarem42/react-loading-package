"use client";

import * as React from "react";
import type { HTMLAttributes } from "react";
import type { SkeletonAnimation } from "../../types";
import { Skeleton } from "./Skeleton";
import { cn } from "../../utils/cn";

export interface SkeletonCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to display the media/image placeholder header.
   * @default true
   */
  hasImage?: boolean;

  /**
   * Height of the media/image placeholder (pixel number or CSS string).
   * @default 160
   */
  imageHeight?: string | number;

  /**
   * Shape variant for the media/image skeleton.
   * @default "rectangular"
   */
  imageVariant?: "rectangular" | "rounded";

  /**
   * Width of the title placeholder (CSS string or pixel number).
   * @default "70%"
   */
  titleWidth?: string | number;

  /**
   * Height of the title placeholder (CSS string or pixel number).
   * @default 20
   */
  titleHeight?: string | number;

  /**
   * Number of description lines to display.
   * @default 3
   */
  lines?: number;

  /**
   * Whether to display the card footer action buttons.
   * @default true
   */
  hasFooter?: boolean;

  /**
   * Alias for `hasFooter` to control footer action buttons.
   * @default true
   */
  hasActions?: boolean;

  /**
   * Number of action button skeletons in the footer.
   * @default 2
   */
  actionCount?: number;

  /**
   * Animation style applied to all skeleton placeholders.
   * @default "shimmer"
   */
  animation?: SkeletonAnimation;

  /**
   * Accessible announcement label for screen readers.
   * @default "Loading card..."
   */
  label?: string;
}

/**
 * Composite skeleton placeholder component representing a content card.
 *
 * @example
 * ```tsx
 * //Standard card skeleton
 * <SkeletonCard />
 *
 * //Custom card with 4 lines and pulse animation
 * <SkeletonCard lines={4} animation="pulse" imageHeight={200} />
 *
 * //Card without media header or footer
 * <SkeletonCard hasImage={false} hasFooter={false} />
 * ```
 */
export const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      hasImage = true,
      imageHeight = 160,
      imageVariant = "rectangular",
      titleWidth = "70%",
      titleHeight = 20,
      lines = 3,
      hasFooter,
      hasActions,
      actionCount = 2,
      animation = "shimmer",
      label = "Loading card...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    //Resolve footer visibility from hasFooter or hasActions alias
    let showFooter = true;
    if (hasFooter !== undefined) {
      showFooter = hasFooter;
    } else if (hasActions !== undefined) {
      showFooter = hasActions;
    }

    const linesCount = Math.max(0, lines);
    const actionsNum = Math.max(1, Math.min(actionCount, 4));

    const defaultCardStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: "border-box",
      borderRadius: "var(--rl-skeleton-card-radius, 8px)",
      border: "1px solid var(--rl-skeleton-card-border, #e2e8f0)",
      backgroundColor: "var(--rl-skeleton-card-bg, #ffffff)",
      overflow: "hidden",
      ...style,
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn("rl-skeleton-card", className)}
        style={defaultCardStyle}
        {...rest}
      >
        {label ? <span className="rl-sr-only">{label}</span> : null}

        {hasImage ? (
          <div
            className="rl-skeleton-card__media"
            style={{ width: "100%", lineHeight: 0 }}
          >
            <Skeleton
              variant={imageVariant}
              width="100%"
              height={imageHeight}
              animation={animation}
              aria-hidden="true"
              label=""
            />
          </div>
        ) : null}

        <div
          className="rl-skeleton-card__body"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "16px",
            flex: "1 1 auto",
          }}
        >
          <Skeleton
            variant="text"
            width={titleWidth}
            height={titleHeight}
            animation={animation}
            aria-hidden="true"
            label=""
            style={{ margin: 0, transform: "none" }}
          />

          {linesCount > 0 ? (
            <div
              className="rl-skeleton-card__lines"
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {Array.from({ length: linesCount }).map((_, index) => {
                let lineWidth = "100%";
                if (index === linesCount - 1 && linesCount > 1) {
                  lineWidth = "60%";
                } else if (index === linesCount - 2 && linesCount > 2) {
                  lineWidth = "85%";
                }

                return (
                  <Skeleton
                    key={index}
                    variant="text"
                    width={lineWidth}
                    height={14}
                    animation={animation}
                    aria-hidden="true"
                    label=""
                    style={{ margin: 0, transform: "none" }}
                  />
                );
              })}
            </div>
          ) : null}
        </div>

        {showFooter ? (
          <div
            className="rl-skeleton-card__footer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              borderTop: "1px solid var(--rl-skeleton-card-border, #e2e8f0)",
            }}
          >
            {Array.from({ length: actionsNum }).map((_, index) => {
              const buttonWidth = index === 0 ? 80 : 64;
              return (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width={buttonWidth}
                  height={32}
                  borderRadius={6}
                  animation={animation}
                  aria-hidden="true"
                  label=""
                />
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
);

SkeletonCard.displayName = "SkeletonCard";
