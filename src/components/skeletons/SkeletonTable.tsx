"use client";

import * as React from "react";
import type { SkeletonAnimation } from "../../types";
import { cn } from "../../utils/cn";
import { Skeleton } from "./Skeleton";

export interface SkeletonTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Number of data rows to display (excluding header).
   * @default 5
   */
  rows?: number;

  /**
   * Number of columns to display.
   * @default 4
   */
  columns?: number;

  /**
   * Whether to include a distinct table header row.
   * @default true
   */
  hasHeader?: boolean;

  /**
   * Animation effect applied to skeleton elements.
   * @default "shimmer"
   */
  animation?: SkeletonAnimation;

  /**
   * Accessible announcement label for screen readers.
   * @default "Loading table..."
   */
  label?: string;

  /**
   * Height of the header skeleton cells (CSS string or pixel number).
   * @default 24
   */
  headerHeight?: string | number;

  /**
   * Height of the data row skeleton cells (CSS string or pixel number).
   * @default 16
   */
  rowHeight?: string | number;

  /**
   * Custom border radius for cell skeleton bars (CSS string or pixel number).
   * @default 4
   */
  cellRadius?: string | number;
}

//Predefined column width patterns to simulate realistic tabular content
const HEADER_WIDTHS = ["65%", "80%", "55%", "70%", "60%"];
const CELL_WIDTHS = ["75%", "85%", "60%", "90%", "70%", "65%"];

function getHeaderCellWidth(colIndex: number): string {
  return HEADER_WIDTHS[colIndex % HEADER_WIDTHS.length];
}

function getDataCellWidth(rowIndex: number, colIndex: number): string {
  return CELL_WIDTHS[(rowIndex * 2 + colIndex) % CELL_WIDTHS.length];
}

/**
 * Accessible skeleton loading placeholder for tabular data layouts.
 *
 * @example
 * ```tsx
 * //Default 5 rows by 4 columns skeleton table
 * <SkeletonTable />
 *
 * //Custom 10-row data table with pulse animation
 * <SkeletonTable rows={10} columns={6} animation="pulse" label="Loading orders..." />
 *
 * //Table without header row
 * <SkeletonTable rows={3} columns={3} hasHeader={false} />
 * ```
 */
export const SkeletonTable = React.forwardRef<HTMLTableElement, SkeletonTableProps>(
  (
    {
      rows = 5,
      columns = 4,
      hasHeader = true,
      animation = "shimmer",
      label = "Loading table...",
      headerHeight = 24,
      rowHeight = 16,
      cellRadius = 4,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const safeRows = Math.max(0, rows);
    const safeColumns = Math.max(1, columns);

    const rowIndices = Array.from({ length: safeRows }, (_, i) => i);
    const colIndices = Array.from({ length: safeColumns }, (_, i) => i);

    return (
      <table
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn("rl-skeleton-table", className)}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          ...style,
        }}
        {...rest}
      >
        {label ? <caption className="rl-sr-only">{label}</caption> : null}
        {hasHeader && (
          <thead className="rl-skeleton-table__header">
            <tr className="rl-skeleton-table__header-row">
              {colIndices.map((colIdx) => (
                <th
                  key={`th-${colIdx}`}
                  className="rl-skeleton-table__header-cell"
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    borderBottom: "2px solid var(--rl-skeleton-border, #e2e8f0)",
                    backgroundColor: "var(--rl-skeleton-header-bg, rgba(0, 0, 0, 0.02))",
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    height={headerHeight}
                    width={getHeaderCellWidth(colIdx)}
                    borderRadius={cellRadius}
                    animation={animation}
                    aria-hidden="true"
                    label=""
                    style={{ display: "block" }}
                  />
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="rl-skeleton-table__body">
          {rowIndices.map((rowIdx) => (
            <tr key={`tr-${rowIdx}`} className="rl-skeleton-table__row">
              {colIndices.map((colIdx) => (
                <td
                  key={`td-${rowIdx}-${colIdx}`}
                  className="rl-skeleton-table__cell"
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid var(--rl-skeleton-border, #e2e8f0)",
                  }}
                >
                  <Skeleton
                    variant="rounded"
                    height={rowHeight}
                    width={getDataCellWidth(rowIdx, colIdx)}
                    borderRadius={cellRadius}
                    animation={animation}
                    aria-hidden="true"
                    label=""
                    style={{ display: "block" }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);

SkeletonTable.displayName = "SkeletonTable";
