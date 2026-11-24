"use client";

import * as React from "react";
import type { SkeletonAnimation } from "../../types";
import { cn } from "../../utils/cn";
import { Skeleton } from "./Skeleton";

export interface SkeletonFormProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of form field placeholders to render.
   * @default 3
   */
  fields?: number;

  /**
   * Whether to include a submit button skeleton placeholder.
   * @default true
   */
  hasSubmitButton?: boolean;

  /**
   * Vertical spacing between form fields (CSS string or pixel number).
   * @default 16
   */
  gap?: string | number;

  /**
   * Vertical spacing between label placeholder and input placeholder (CSS string or pixel number).
   * @default 6
   */
  fieldGap?: string | number;

  /**
   * Animation effect applied to skeleton elements.
   * @default "shimmer"
   */
  animation?: SkeletonAnimation;

  /**
   * Accessible announcement label for screen readers.
   * @default "Loading form..."
   */
  label?: string;

  /**
   * Width of the submit button placeholder (CSS string or pixel number).
   * @default 120
   */
  buttonWidth?: string | number;

  /**
   * Height of the submit button placeholder (CSS string or pixel number).
   * @default 38
   */
  buttonHeight?: string | number;

  /**
   * Height of each field input placeholder (CSS string or pixel number).
   * @default 38
   */
  inputHeight?: string | number;

  /**
   * Height of each field label placeholder (CSS string or pixel number).
   * @default 14
   */
  labelHeight?: string | number;

  /**
   * Width of each field label placeholder (CSS string or pixel number).
   * @default "30%"
   */
  labelWidth?: string | number;

  /**
   * Border radius of field input boxes (CSS string or pixel number).
   * @default 6
   */
  inputRadius?: string | number;

  /**
   * Border radius of submit button (CSS string or pixel number).
   * @default 6
   */
  buttonRadius?: string | number;
}

//Format dimension value with px unit when numeric
function resolveDimension(value: string | number | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (typeof value === "number") {
    return `${value}px`;
  }
  return value;
}

/**
 * Accessible skeleton loading placeholder for forms, inputs, and submit buttons.
 *
 * @example
 * ```tsx
 * //Default 3-field form skeleton with submit button
 * <SkeletonForm />
 *
 * //5-field contact form skeleton with pulse animation
 * <SkeletonForm fields={5} gap={20} animation="pulse" label="Loading contact form..." />
 *
 * //Form skeleton without submit button
 * <SkeletonForm fields={2} hasSubmitButton={false} />
 * ```
 */
export const SkeletonForm = React.forwardRef<HTMLDivElement, SkeletonFormProps>(
  (
    {
      fields = 3,
      hasSubmitButton = true,
      gap = 16,
      fieldGap = 6,
      animation = "shimmer",
      label = "Loading form...",
      buttonWidth = 120,
      buttonHeight = 38,
      inputHeight = 38,
      labelHeight = 14,
      labelWidth = "30%",
      inputRadius = 6,
      buttonRadius = 6,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const safeFields = Math.max(0, fields);
    //Generate array of field indices for mapping
    const fieldIndices = Array.from({ length: safeFields }, (_, i) => i);

    const containerStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: resolveDimension(gap),
      width: "100%",
      boxSizing: "border-box",
      ...style,
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn("rl-skeleton-form", className)}
        style={containerStyle}
        {...rest}
      >
        {label ? <span className="rl-sr-only">{label}</span> : null}
        {fieldIndices.map((fieldIdx) => (
          <div
            key={`field-${fieldIdx}`}
            className="rl-skeleton-form__field"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: resolveDimension(fieldGap),
              width: "100%",
            }}
          >
            <Skeleton
              variant="rounded"
              height={labelHeight}
              width={labelWidth}
              borderRadius={4}
              animation={animation}
              aria-hidden="true"
              label=""
              className="rl-skeleton-form__label"
              style={{ display: "block" }}
            />
            <Skeleton
              variant="rounded"
              height={inputHeight}
              width="100%"
              borderRadius={inputRadius}
              animation={animation}
              aria-hidden="true"
              label=""
              className="rl-skeleton-form__input"
              style={{ display: "block" }}
            />
          </div>
        ))}
        {hasSubmitButton ? (
          <div
            className="rl-skeleton-form__submit"
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: 4,
            }}
          >
            <Skeleton
              variant="rounded"
              height={buttonHeight}
              width={buttonWidth}
              borderRadius={buttonRadius}
              animation={animation}
              aria-hidden="true"
              label=""
              className="rl-skeleton-form__button"
              style={{ display: "block" }}
            />
          </div>
        ) : null}
      </div>
    );
  }
);

SkeletonForm.displayName = "SkeletonForm";
