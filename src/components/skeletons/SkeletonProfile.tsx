"use client";

import * as React from "react";
import type { HTMLAttributes } from "react";
import type { SkeletonAnimation } from "../../types";
import { Skeleton } from "./Skeleton";
import { cn } from "../../utils/cn";

export interface SkeletonProfileProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Height of the cover banner placeholder (pixel number or CSS string).
   * @default 120
   */
  bannerHeight?: string | number;

  /**
   * Size (diameter) of the circular avatar placeholder (pixel number or CSS string).
   * @default 72
   */
  avatarSize?: string | number;

  /**
   * Whether the avatar overlaps the cover banner.
   * When true, the avatar is pulled upward using negative margin.
   * @default true
   */
  avatarOverlap?: boolean;

  /**
   * Number of bio description lines.
   * @default 2
   */
  bioLines?: number;

  /**
   * Whether to display the stats row.
   * @default true
   */
  hasStats?: boolean;

  /**
   * Number of statistics blocks in the stats row.
   * @default 3
   */
  statsCount?: number;

  /**
   * Animation style applied to all skeleton placeholders.
   * @default "shimmer"
   */
  animation?: SkeletonAnimation;

  /**
   * Accessible announcement label for screen readers.
   * @default "Loading profile..."
   */
  label?: string;
}

/**
 * Composite skeleton placeholder component representing a user or entity profile.
 *
 * @example
 * ```tsx
 * //Standard profile skeleton
 * <SkeletonProfile />
 *
 * //Profile with tall banner and pulse animation
 * <SkeletonProfile bannerHeight={160} avatarSize={80} animation="pulse" />
 *
 * //Compact profile without stats
 * <SkeletonProfile hasStats={false} bioLines={1} />
 * ```
 */
export const SkeletonProfile = React.forwardRef<HTMLDivElement, SkeletonProfileProps>(
  (
    {
      bannerHeight = 120,
      avatarSize = 72,
      avatarOverlap = true,
      bioLines = 2,
      hasStats = true,
      statsCount = 3,
      animation = "shimmer",
      label = "Loading profile...",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const bioLinesCount = Math.max(0, bioLines);
    const statsNum = Math.max(0, statsCount);

    let avatarNum = 72;
    if (typeof avatarSize === "number") {
      avatarNum = avatarSize;
    } else {
      const parsed = parseInt(avatarSize, 10);
      if (!Number.isNaN(parsed)) {
        avatarNum = parsed;
      }
    }

    const defaultProfileStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      boxSizing: "border-box",
      borderRadius: "var(--rl-skeleton-profile-radius, 12px)",
      border: "1px solid var(--rl-skeleton-profile-border, #e2e8f0)",
      backgroundColor: "var(--rl-skeleton-profile-bg, #ffffff)",
      overflow: "hidden",
      ...style,
    };

    const avatarWrapperStyle: React.CSSProperties = {
      display: "inline-block",
      alignSelf: "flex-start",
    };

    if (avatarOverlap) {
      avatarWrapperStyle.marginTop = `-${Math.round(avatarNum / 2)}px`;
      avatarWrapperStyle.position = "relative";
      avatarWrapperStyle.zIndex = 1;
    }

    const avatarInlineStyle: React.CSSProperties = {
      boxSizing: "content-box",
    };
    if (avatarOverlap) {
      avatarInlineStyle.border = "3px solid var(--rl-skeleton-profile-bg, #ffffff)";
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn("rl-skeleton-profile", className)}
        style={defaultProfileStyle}
        {...rest}
      >
        {label ? <span className="rl-sr-only">{label}</span> : null}

        <div
          className="rl-skeleton-profile__banner"
          style={{ width: "100%", lineHeight: 0 }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height={bannerHeight}
            animation={animation}
            aria-hidden="true"
            label=""
          />
        </div>

        <div
          className="rl-skeleton-profile__body"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            gap: "16px",
          }}
        >
          <div
            className="rl-skeleton-profile__avatar-wrapper"
            style={avatarWrapperStyle}
          >
            <Skeleton
              variant="circular"
              width={avatarSize}
              height={avatarSize}
              animation={animation}
              aria-hidden="true"
              label=""
              style={avatarInlineStyle}
            />
          </div>

          <div
            className="rl-skeleton-profile__info"
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          >
            <Skeleton
              variant="text"
              width="45%"
              height={20}
              animation={animation}
              aria-hidden="true"
              label=""
              className="rl-skeleton-profile__name"
              style={{ margin: 0, transform: "none" }}
            />

            {bioLinesCount > 0 ? (
              <div
                className="rl-skeleton-profile__bio"
                style={{ display: "flex", flexDirection: "column", gap: "6px" }}
              >
                {Array.from({ length: bioLinesCount }).map((_, index) => {
                  let bioWidth = "100%";
                  if (index === bioLinesCount - 1 && bioLinesCount > 1) {
                    bioWidth = "70%";
                  }

                  return (
                    <Skeleton
                      key={index}
                      variant="text"
                      width={bioWidth}
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

          {hasStats && statsNum > 0 ? (
            <div
              className="rl-skeleton-profile__stats"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                paddingTop: "12px",
                borderTop: "1px solid var(--rl-skeleton-profile-border, #e2e8f0)",
              }}
            >
              {Array.from({ length: statsNum }).map((_, index) => (
                <div
                  key={index}
                  className="rl-skeleton-profile__stat"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <Skeleton
                    variant="text"
                    width={44}
                    height={16}
                    animation={animation}
                    aria-hidden="true"
                    label=""
                    style={{ margin: 0, transform: "none" }}
                  />
                  <Skeleton
                    variant="text"
                    width={32}
                    height={12}
                    animation={animation}
                    aria-hidden="true"
                    label=""
                    style={{ margin: 0, transform: "none" }}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);

SkeletonProfile.displayName = "SkeletonProfile";
