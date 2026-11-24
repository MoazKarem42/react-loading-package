"use client";

import * as React from "react";
import type { HTMLAttributes } from "react";
import type { SkeletonAnimation } from "../../types";
import { Skeleton } from "./Skeleton";
import { cn } from "../../utils/cn";

export interface SkeletonListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Number of list items to render.
   * @default 5
   */
  items?: number;

  /**
   * Gap spacing between list items (pixel number or CSS string).
   * @default 12
   */
  gap?: string | number;

  /**
   * Whether each list item includes a circular avatar placeholder.
   * @default true
   */
  hasAvatar?: boolean;

  /**
   * Size (diameter) of the circular avatar placeholder (pixel number or CSS string).
   * @default 40
   */
  avatarSize?: string | number;

  /**
   * Whether to render dividing borders between list items.
   * @default false
   */
  hasDividers?: boolean;

  /**
   * Width of the primary title line (CSS string or pixel number).
   * If omitted, an organic varying pattern is used.
   */
  primaryWidth?: string | number;

  /**
   * Width of the secondary description line (CSS string or pixel number).
   * If omitted, an organic varying pattern is used.
   */
  secondaryWidth?: string | number;

  /**
   * Animation style applied to all skeleton placeholders.
   * @default "shimmer"
   */
  animation?: SkeletonAnimation;

  /**
   * Accessible announcement label for screen readers.
   * @default "Loading list..."
   */
  label?: string;
}

const PRIMARY_WIDTH_PATTERNS = ["60%", "75%", "50%", "65%", "70%"];
const SECONDARY_WIDTH_PATTERNS = ["80%", "55%", "70%", "90%", "60%"];

/**
 * Composite skeleton placeholder component representing a list of items.
 *
 * @example
 * ```tsx
 * //Standard list skeleton with 5 items
 * <SkeletonList />
 *
 * //List with 3 items, dividers, and pulse animation
 * <SkeletonList items={3} hasDividers animation="pulse" />
 *
 * //Text-only list without avatars
 * <SkeletonList hasAvatar={false} gap={16} />
 * ```
 */
export const SkeletonList = React.forwardRef<HTMLDivElement, SkeletonListProps>(
  (
    {
      items = 5,
      gap = 12,
      hasAvatar = true,
      avatarSize = 40,
      hasDividers = false,
      primaryWidth,
      secondaryWidth,
      animation = "shimmer",
      label = "Loading list...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const itemCount = Math.max(0, items);
    const gapValue = typeof gap === "number" ? `${gap}px` : gap;

    const defaultListStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: "border-box",
      gap: gapValue,
      ...style,
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn("rl-skeleton-list", className)}
        style={defaultListStyle}
        {...rest}
      >
        {label ? <span className="rl-sr-only">{label}</span> : null}

        {Array.from({ length: itemCount }).map((_, index) => {
          let rowPrimaryWidth = primaryWidth;
          if (rowPrimaryWidth === undefined) {
            rowPrimaryWidth = PRIMARY_WIDTH_PATTERNS[index % PRIMARY_WIDTH_PATTERNS.length];
          }

          let rowSecondaryWidth = secondaryWidth;
          if (rowSecondaryWidth === undefined) {
            rowSecondaryWidth = SECONDARY_WIDTH_PATTERNS[index % SECONDARY_WIDTH_PATTERNS.length];
          }

          const isDividerActive = hasDividers && index < itemCount - 1;

          const itemStyle: React.CSSProperties = {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            boxSizing: "border-box",
          };

          if (isDividerActive) {
            itemStyle.paddingBottom = gapValue;
            itemStyle.borderBottom = "1px solid var(--rl-skeleton-divider, #e2e8f0)";
          }

          return (
            <div
              key={index}
              className={cn(
                "rl-skeleton-list__item",
                isDividerActive ? "rl-skeleton-list__item--divider" : undefined
              )}
              style={itemStyle}
            >
              {hasAvatar ? (
                <Skeleton
                  variant="circular"
                  width={avatarSize}
                  height={avatarSize}
                  animation={animation}
                  aria-hidden="true"
                  label=""
                  className="rl-skeleton-list__avatar"
                />
              ) : null}

              <div
                className="rl-skeleton-list__content"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  flex: "1 1 auto",
                  minWidth: 0,
                }}
              >
                <Skeleton
                  variant="text"
                  width={rowPrimaryWidth}
                  height={16}
                  animation={animation}
                  aria-hidden="true"
                  label=""
                  className="rl-skeleton-list__title"
                  style={{ margin: 0, transform: "none" }}
                />
                <Skeleton
                  variant="text"
                  width={rowSecondaryWidth}
                  height={12}
                  animation={animation}
                  aria-hidden="true"
                  label=""
                  className="rl-skeleton-list__description"
                  style={{ margin: 0, transform: "none" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

SkeletonList.displayName = "SkeletonList";
