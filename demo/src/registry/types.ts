import type { ElementType } from 'react';

export type LoaderId = 'spinner' | 'dots' | 'bars';

export type LoaderControlFieldType = 'select' | 'color' | 'number' | 'text';

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
  description: string;
  component: ElementType;
  defaultProps: Record<string, unknown>;
  controls: LoaderControlConfig[];
  generateSnippet: (props: Record<string, unknown>) => string;
}
