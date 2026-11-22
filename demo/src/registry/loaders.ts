import { Spinner, Dots, Bars } from 'react-loading-kit';
import type { LoaderRegistryItem, LoaderId } from './types';

export const loaderRegistry: Record<LoaderId, LoaderRegistryItem> = {
  spinner: {
    id: 'spinner',
    name: 'Spinner',
    description: 'Circular animated loading indicator with customizable stroke and track.',
    component: Spinner,
    defaultProps: {
      size: 'md',
      color: '#3b82f6',
      trackColor: 'rgba(255, 255, 255, 0.12)',
      thickness: 3,
      speed: 0.75,
      label: 'Loading...',
    },
    controls: [
      {
        name: 'size',
        label: 'Size',
        type: 'select',
        options: ['sm', 'md', 'lg', 'xl'],
        defaultValue: 'md',
      },
      {
        name: 'color',
        label: 'Color',
        type: 'color',
        defaultValue: '#3b82f6',
      },
      {
        name: 'trackColor',
        label: 'Track Color',
        type: 'color',
        defaultValue: '#27272a',
      },
      {
        name: 'thickness',
        label: 'Stroke Thickness',
        type: 'number',
        min: 1,
        max: 8,
        step: 0.5,
        unit: 'px',
        defaultValue: 3,
      },
      {
        name: 'speed',
        label: 'Speed',
        type: 'number',
        min: 0.2,
        max: 3,
        step: 0.05,
        unit: 's',
        defaultValue: 0.75,
      },
      {
        name: 'label',
        label: 'A11y Label',
        type: 'text',
        defaultValue: 'Loading...',
      },
    ],
    generateSnippet: (props) => {
      const attrs = [
        props.size !== 'md' ? `size="${props.size}"` : null,
        props.color && props.color !== '#3b82f6' ? `color="${props.color}"` : null,
        props.trackColor ? `trackColor="${props.trackColor}"` : null,
        props.thickness !== 3 ? `thickness={${props.thickness}}` : null,
        props.speed !== 0.75 ? `speed={${props.speed}}` : null,
        props.label && props.label !== 'Loading...' ? `label="${props.label}"` : null,
      ]
        .filter(Boolean)
        .join(' ');

      return `import { Spinner } from "react-loading-kit";\nimport "react-loading-kit/styles.css";\n\nexport default function LoadingExample() {\n  return <Spinner${attrs ? ' ' + attrs : ''} />;\n}`;
    },
  },

  dots: {
    id: 'dots',
    name: 'Dots',
    description: 'Three bouncing dots loading indicator with custom pacing and gap spacing.',
    component: Dots,
    defaultProps: {
      size: 'md',
      color: '#3b82f6',
      speed: 1.4,
      spacing: 4,
      label: 'Loading...',
    },
    controls: [
      {
        name: 'size',
        label: 'Size',
        type: 'select',
        options: ['sm', 'md', 'lg', 'xl'],
        defaultValue: 'md',
      },
      {
        name: 'color',
        label: 'Color',
        type: 'color',
        defaultValue: '#3b82f6',
      },
      {
        name: 'speed',
        label: 'Speed',
        type: 'number',
        min: 0.4,
        max: 3,
        step: 0.1,
        unit: 's',
        defaultValue: 1.4,
      },
      {
        name: 'spacing',
        label: 'Spacing',
        type: 'number',
        min: 1,
        max: 16,
        step: 1,
        unit: 'px',
        defaultValue: 4,
      },
      {
        name: 'label',
        label: 'A11y Label',
        type: 'text',
        defaultValue: 'Loading...',
      },
    ],
    generateSnippet: (props) => {
      const attrs = [
        props.size !== 'md' ? `size="${props.size}"` : null,
        props.color && props.color !== '#3b82f6' ? `color="${props.color}"` : null,
        props.speed !== 1.4 ? `speed={${props.speed}}` : null,
        props.spacing !== 4 ? `spacing={${props.spacing}}` : null,
        props.label && props.label !== 'Loading...' ? `label="${props.label}"` : null,
      ]
        .filter(Boolean)
        .join(' ');

      return `import { Dots } from "react-loading-kit";\nimport "react-loading-kit/styles.css";\n\nexport default function LoadingExample() {\n  return <Dots${attrs ? ' ' + attrs : ''} />;\n}`;
    },
  },

  bars: {
    id: 'bars',
    name: 'Bars',
    description: 'Five vertical wave bars loading indicator with staggered wave rhythm.',
    component: Bars,
    defaultProps: {
      size: 'md',
      color: '#3b82f6',
      speed: 1.0,
      spacing: 4,
      label: 'Loading...',
    },
    controls: [
      {
        name: 'size',
        label: 'Size',
        type: 'select',
        options: ['sm', 'md', 'lg', 'xl'],
        defaultValue: 'md',
      },
      {
        name: 'color',
        label: 'Color',
        type: 'color',
        defaultValue: '#3b82f6',
      },
      {
        name: 'speed',
        label: 'Speed',
        type: 'number',
        min: 0.4,
        max: 3,
        step: 0.1,
        unit: 's',
        defaultValue: 1.0,
      },
      {
        name: 'spacing',
        label: 'Spacing',
        type: 'number',
        min: 1,
        max: 16,
        step: 1,
        unit: 'px',
        defaultValue: 4,
      },
      {
        name: 'label',
        label: 'A11y Label',
        type: 'text',
        defaultValue: 'Loading...',
      },
    ],
    generateSnippet: (props) => {
      const attrs = [
        props.size !== 'md' ? `size="${props.size}"` : null,
        props.color && props.color !== '#3b82f6' ? `color="${props.color}"` : null,
        props.speed !== 1.0 ? `speed={${props.speed}}` : null,
        props.spacing !== 4 ? `spacing={${props.spacing}}` : null,
        props.label && props.label !== 'Loading...' ? `label="${props.label}"` : null,
      ]
        .filter(Boolean)
        .join(' ');

      return `import { Bars } from "react-loading-kit";\nimport "react-loading-kit/styles.css";\n\nexport default function LoadingExample() {\n  return <Bars${attrs ? ' ' + attrs : ''} />;\n}`;
    },
  },
};

export const loaderList = Object.values(loaderRegistry);
