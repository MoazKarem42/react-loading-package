export type ClassValue = string | number | boolean | undefined | null;

/**
 * Concatenates conditional class names into a single clean string.
 * Zero external dependencies.
 *
 * @param inputs - List of class names, falsy conditions, or arrays of class names.
 * @returns Clean space-separated class string.
 */
export function cn(...inputs: (ClassValue | ClassValue[])[]): string {
  return inputs
    .flat(Infinity)
    .filter((x): x is string | number => (typeof x === "string" && x.length > 0) || typeof x === "number")
    .join(" ");
}
