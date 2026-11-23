/**
 * Standard preset size variants or an explicit pixel number.
 */
export type LoaderSize = "sm" | "md" | "lg" | "xl" | number;

/**
 * Base props common to visual loader components.
 */
export interface BaseLoaderProps {
  /**
   * Size of the loader. Accepts preset tokens ("sm", "md", "lg", "xl") or an explicit pixel number.
   * @default "md"
   */
  size?: LoaderSize;

  /**
   * Color of the animated loader element.
   * Defaults to CSS variable `--rl-primary`.
   */
  color?: string;

  /**
   * Animation cycle speed in seconds.
   * Overrides the component's default animation duration.
   */
  speed?: number;

  /**
   * Accessible announcement for screen readers.
   * @default "Loading..."
   */
  label?: string;
}
