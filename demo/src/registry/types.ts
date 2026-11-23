import type { ElementType } from 'react';

export type LoaderCategory = 'loaders' | 'skeletons' | 'state';

export type LoaderId =
  | 'spinner'
  | 'dots'
  | 'bars'
  | 'pulse'
  | 'ring'
  | 'progressbar'
  | 'skeleton'
  | 'skeleton-text'
  | 'skeleton-card'
  | 'skeleton-avatar'
  | 'overlay'
  | 'use-loading';

export type LoaderControlFieldType = 'select' | 'color' | 'number' | 'text' | 'boolean';

export interface LoaderControlConfig {
  name: string;
  label: string;
  type: LoaderControlFieldType;
  defaultValue: unknown;
  options?: (string | number)[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface LoaderRegistryItem {
  id: LoaderId;
  name: string;
  category: LoaderCategory;
  description: string;
  component: ElementType;
  defaultProps: Record<string, unknown>;
  controls: LoaderControlConfig[];
  generateSnippet: (props: Record<string, unknown>) => string;
}
