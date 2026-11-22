import type { ComponentType } from 'react';

export type LoaderId = 'spinner' | 'dots' | 'bars';

export type LoaderControlFieldType = 'select' | 'color' | 'number' | 'text';

export interface LoaderControlConfig {
  name: string;
  label: string;
  type: LoaderControlFieldType;
  defaultValue: any;
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
  component: ComponentType<any>;
  defaultProps: Record<string, any>;
  controls: LoaderControlConfig[];
  generateSnippet: (props: Record<string, any>) => string;
}
