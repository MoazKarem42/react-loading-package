import { Spinner, Dots, Bars } from 'react-loading-kit';
import {
  PulsePreview,
  RingPreview,
  ProgressBarPreview,
  SkeletonPreview,
  SkeletonTextPreview,
  SkeletonCardPreview,
  SkeletonAvatarPreview,
  LoadingOverlayPreview,
  UseLoadingPreview,
} from './previewComponents';
import type { LoaderRegistryItem, LoaderId } from './types';

export const loaderRegistry: Record<LoaderId, LoaderRegistryItem> = {
  spinner: {
    id: 'spinner',
    name: 'Spinner',
    category: 'loaders',
    description: 'Circular animated loading indicator with customizable stroke and track.',
    component: Spinner,
    defaultProps: {
      size: 'md',
      color: '#FFFFFF',
      thickness: 3,
      speed: 0.8,
      label: 'Loading...',
    },
    controls: [
      {
        name: 'size',
        label: 'Size',
        type: 'select',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
      {
        name: 'color',
        label: 'Color',
        type: 'color',
        defaultValue: '#FFFFFF',
      },
      {
        name: 'thickness',
        label: 'Thickness',
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
        step: 0.1,
        unit: 's',
        defaultValue: 0.8,
      },
    ],
    generateSnippet: (props) => {
      const sizeVal = props.size !== 'md' ? `size="${props.size}"` : '';
      const colorVal = props.color && props.color !== '#FFFFFF' ? `color="${props.color}"` : '';
      const thickVal = props.thickness !== 3 ? `thickness={${props.thickness}}` : '';
      const speedVal = props.speed !== 0.8 ? `speed={${props.speed}}` : '';

      const attrs = [sizeVal, colorVal, thickVal, speedVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { Spinner } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <Spinner${attrStr} />;\n}`;
    },
  },

  dots: {
    id: 'dots',
    name: 'Dots',
    category: 'loaders',
    description: 'Three bouncing dots loading indicator with custom pacing and gap spacing.',
    component: Dots,
    defaultProps: {
      size: 'md',
      color: '#FFFFFF',
      speed: 1.4,
      spacing: 4,
      label: 'Loading...',
    },
    controls: [
      {
        name: 'size',
        label: 'Size',
        type: 'select',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
      {
        name: 'color',
        label: 'Color',
        type: 'color',
        defaultValue: '#FFFFFF',
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
    ],
    generateSnippet: (props) => {
      const sizeVal = props.size !== 'md' ? `size="${props.size}"` : '';
      const colorVal = props.color && props.color !== '#FFFFFF' ? `color="${props.color}"` : '';
      const speedVal = props.speed !== 1.4 ? `speed={${props.speed}}` : '';

      const attrs = [sizeVal, colorVal, speedVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { Dots } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <Dots${attrStr} />;\n}`;
    },
  },

  bars: {
    id: 'bars',
    name: 'Bars',
    category: 'loaders',
    description: 'Animated vertical bars loader with staggered wave animation.',
    component: Bars,
    defaultProps: {
      size: 'md',
      color: '#FFFFFF',
      speed: 1.0,
      count: 4,
      label: 'Loading...',
    },
    controls: [
      {
        name: 'size',
        label: 'Size',
        type: 'select',
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
      {
        name: 'color',
        label: 'Color',
        type: 'color',
        defaultValue: '#FFFFFF',
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
    ],
    generateSnippet: (props) => {
      const sizeVal = props.size !== 'md' ? `size="${props.size}"` : '';
      const colorVal = props.color && props.color !== '#FFFFFF' ? `color="${props.color}"` : '';
      const speedVal = props.speed !== 1.0 ? `speed={${props.speed}}` : '';

      const attrs = [sizeVal, colorVal, speedVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { Bars } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <Bars${attrStr} />;\n}`;
    },
  },

  pulse: {
    id: 'pulse',
    name: 'Pulse',
    category: 'loaders',
    description: 'Pulsing radial ring loading indicator.',
    component: PulsePreview,
    defaultProps: {
      color: '#FFFFFF',
      speed: 1.2,
    },
    controls: [
      {
        name: 'color',
        label: 'Color',
        type: 'color',
        defaultValue: '#FFFFFF',
      },
      {
        name: 'speed',
        label: 'Speed',
        type: 'number',
        min: 0.4,
        max: 3,
        step: 0.1,
        unit: 's',
        defaultValue: 1.2,
      },
    ],
    generateSnippet: () => `import { Pulse } from 'react-loading-kit';\n\nexport default function Example() {\n  return <Pulse size="md" color="#FFFFFF" />;\n}`,
  },

  ring: {
    id: 'ring',
    name: 'Ring',
    category: 'loaders',
    description: 'Dashed rotating ring indicator with lightweight keyframes.',
    component: RingPreview,
    defaultProps: {
      color: '#FFFFFF',
      speed: 0.8,
      thickness: 2,
    },
    controls: [
      {
        name: 'color',
        label: 'Color',
        type: 'color',
        defaultValue: '#FFFFFF',
      },
      {
        name: 'thickness',
        label: 'Thickness',
        type: 'number',
        min: 1,
        max: 6,
        step: 1,
        unit: 'px',
        defaultValue: 2,
      },
    ],
    generateSnippet: () => `import { Ring } from 'react-loading-kit';\n\nexport default function Example() {\n  return <Ring size="md" color="#FFFFFF" thickness={2} />;\n}`,
  },

  progressbar: {
    id: 'progressbar',
    name: 'ProgressBar',
    category: 'loaders',
    description: 'Hardware-accelerated horizontal indeterminate progress bar.',
    component: ProgressBarPreview,
    defaultProps: {
      color: '#FFFFFF',
      speed: 1.5,
    },
    controls: [
      {
        name: 'color',
        label: 'Color',
        type: 'color',
        defaultValue: '#FFFFFF',
      },
    ],
    generateSnippet: () => `import { ProgressBar } from 'react-loading-kit';\n\nexport default function Example() {\n  return <ProgressBar color="#FFFFFF" />;\n}`,
  },

  skeleton: {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'skeletons',
    description: 'Composable skeleton rectangle placeholder with optional shimmer.',
    component: SkeletonPreview,
    defaultProps: {
      shimmer: true,
    },
    controls: [
      {
        name: 'shimmer',
        label: 'Shimmer',
        type: 'select',
        options: ['true', 'false'],
        defaultValue: 'true',
      },
    ],
    generateSnippet: () => `import { Skeleton } from 'react-loading-kit';\n\nexport default function Example() {\n  return <Skeleton width="240px" height="40px" shimmer />;\n}`,
  },

  'skeleton-text': {
    id: 'skeleton-text',
    name: 'SkeletonText',
    category: 'skeletons',
    description: 'Multi-line skeleton text generator with randomized trailing widths.',
    component: SkeletonTextPreview,
    defaultProps: {
      lines: 3,
      shimmer: true,
    },
    controls: [
      {
        name: 'lines',
        label: 'Lines',
        type: 'number',
        min: 1,
        max: 6,
        step: 1,
        defaultValue: 3,
      },
    ],
    generateSnippet: () => `import { SkeletonText } from 'react-loading-kit';\n\nexport default function Example() {\n  return <SkeletonText lines={3} shimmer />;\n}`,
  },

  'skeleton-card': {
    id: 'skeleton-card',
    name: 'SkeletonCard',
    category: 'skeletons',
    description: 'Preset card skeleton with avatar and body placeholders.',
    component: SkeletonCardPreview,
    defaultProps: {
      shimmer: true,
    },
    controls: [],
    generateSnippet: () => `import { SkeletonCard } from 'react-loading-kit';\n\nexport default function Example() {\n  return <SkeletonCard shimmer />;\n}`,
  },

  'skeleton-avatar': {
    id: 'skeleton-avatar',
    name: 'SkeletonAvatar',
    category: 'skeletons',
    description: 'Circular avatar and adjacent label skeleton preset.',
    component: SkeletonAvatarPreview,
    defaultProps: {
      shimmer: true,
    },
    controls: [],
    generateSnippet: () => `import { SkeletonAvatar } from 'react-loading-kit';\n\nexport default function Example() {\n  return <SkeletonAvatar size="md" />;\n}`,
  },

  overlay: {
    id: 'overlay',
    name: 'LoadingOverlay',
    category: 'state',
    description: 'Scoped container loading overlay with backdrop blur and spinner.',
    component: LoadingOverlayPreview,
    defaultProps: {},
    controls: [],
    generateSnippet: () => `import { LoadingOverlay } from 'react-loading-kit';\n\nexport default function Example() {\n  return (\n    <LoadingOverlay active={true} spinner="spinner" text="Loading...">\n      <CardContent />\n    </LoadingOverlay>\n  );\n}`,
  },

  'use-loading': {
    id: 'use-loading',
    name: 'useLoading',
    category: 'state',
    description: 'Hook for scoped and global asynchronous loading state management.',
    component: UseLoadingPreview,
    defaultProps: {},
    controls: [],
    generateSnippet: () => `import { useLoading } from 'react-loading-kit';\n\nexport default function Example() {\n  const { isLoading, withLoading } = useLoading('profile');\n  return <div>State: {isLoading ? 'Loading' : 'Idle'}</div>;\n}`,
  },
};

export const loaderList = Object.values(loaderRegistry);
