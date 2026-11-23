import {
  Spinner,
  DualRing,
  ChasingRing,
  DashedSpinner,
  Orbit,
  Clock,
  Dots,
  Bars,
  DotsBounce,
  DotsFade,
  DotsScale,
  DotsTyping,
  DotsCircle,
} from 'react-loading-kit';
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

  'dual-ring': {
    id: 'dual-ring',
    name: 'DualRing',
    category: 'loaders',
    description: 'Concentric double rings rotating in opposing directions.',
    component: DualRing,
    defaultProps: {
      size: 'md',
      color: '#FFFFFF',
      secondaryColor: '#60A5FA',
      thickness: 2.5,
      speed: 1.2,
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
        label: 'Outer Color',
        type: 'color',
        defaultValue: '#FFFFFF',
      },
      {
        name: 'secondaryColor',
        label: 'Inner Color',
        type: 'color',
        defaultValue: '#60A5FA',
      },
      {
        name: 'thickness',
        label: 'Thickness',
        type: 'number',
        min: 1,
        max: 6,
        step: 0.5,
        unit: 'px',
        defaultValue: 2.5,
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
    generateSnippet: (props) => {
      const sizeVal = props.size !== 'md' ? `size="${props.size}"` : '';
      const colorVal = props.color && props.color !== '#FFFFFF' ? `color="${props.color}"` : '';
      const secColorVal =
        props.secondaryColor && props.secondaryColor !== '#60A5FA'
          ? `secondaryColor="${props.secondaryColor}"`
          : '';
      const thickVal = props.thickness !== 2.5 ? `thickness={${props.thickness}}` : '';
      const speedVal = props.speed !== 1.2 ? `speed={${props.speed}}` : '';

      const attrs = [sizeVal, colorVal, secColorVal, thickVal, speedVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { DualRing } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <DualRing${attrStr} />;\n}`;
    },
  },

  'chasing-ring': {
    id: 'chasing-ring',
    name: 'ChasingRing',
    category: 'loaders',
    description: 'Material Design-style expanding and contracting circular arc.',
    component: ChasingRing,
    defaultProps: {
      size: 'md',
      color: '#FFFFFF',
      thickness: 3,
      speed: 1.4,
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
        max: 6,
        step: 0.5,
        unit: 'px',
        defaultValue: 3,
      },
      {
        name: 'speed',
        label: 'Speed',
        type: 'number',
        min: 0.5,
        max: 3,
        step: 0.1,
        unit: 's',
        defaultValue: 1.4,
      },
    ],
    generateSnippet: (props) => {
      const sizeVal = props.size !== 'md' ? `size="${props.size}"` : '';
      const colorVal = props.color && props.color !== '#FFFFFF' ? `color="${props.color}"` : '';
      const thickVal = props.thickness !== 3 ? `thickness={${props.thickness}}` : '';
      const speedVal = props.speed !== 1.4 ? `speed={${props.speed}}` : '';

      const attrs = [sizeVal, colorVal, thickVal, speedVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { ChasingRing } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <ChasingRing${attrStr} />;\n}`;
    },
  },

  'dashed-spinner': {
    id: 'dashed-spinner',
    name: 'DashedSpinner',
    category: 'loaders',
    description: 'Rotating dashed circular ring indicator for upload and sync states.',
    component: DashedSpinner,
    defaultProps: {
      size: 'md',
      color: '#FFFFFF',
      thickness: 3,
      dashArray: '4 4',
      speed: 1.0,
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
        max: 6,
        step: 0.5,
        unit: 'px',
        defaultValue: 3,
      },
      {
        name: 'speed',
        label: 'Speed',
        type: 'number',
        min: 0.3,
        max: 3,
        step: 0.1,
        unit: 's',
        defaultValue: 1.0,
      },
    ],
    generateSnippet: (props) => {
      const sizeVal = props.size !== 'md' ? `size="${props.size}"` : '';
      const colorVal = props.color && props.color !== '#FFFFFF' ? `color="${props.color}"` : '';
      const thickVal = props.thickness !== 3 ? `thickness={${props.thickness}}` : '';
      const speedVal = props.speed !== 1.0 ? `speed={${props.speed}}` : '';

      const attrs = [sizeVal, colorVal, thickVal, speedVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { DashedSpinner } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <DashedSpinner${attrStr} />;\n}`;
    },
  },

  orbit: {
    id: 'orbit',
    name: 'Orbit',
    category: 'loaders',
    description: 'Smooth satellite dot orbiting around a circular track ring.',
    component: Orbit,
    defaultProps: {
      size: 'md',
      color: '#FFFFFF',
      dotSize: 5,
      showCore: false,
      speed: 1.2,
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
        name: 'dotSize',
        label: 'Dot Size',
        type: 'number',
        min: 2,
        max: 10,
        step: 1,
        unit: 'px',
        defaultValue: 5,
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
    generateSnippet: (props) => {
      const sizeVal = props.size !== 'md' ? `size="${props.size}"` : '';
      const colorVal = props.color && props.color !== '#FFFFFF' ? `color="${props.color}"` : '';
      const dotVal = props.dotSize !== 5 ? `dotSize={${props.dotSize}}` : '';
      const speedVal = props.speed !== 1.2 ? `speed={${props.speed}}` : '';

      const attrs = [sizeVal, colorVal, dotVal, speedVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { Orbit } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <Orbit${attrStr} />;\n}`;
    },
  },

  clock: {
    id: 'clock',
    name: 'Clock',
    category: 'loaders',
    description: 'Rotating hour and minute hands for scheduling and long-running operations.',
    component: Clock,
    defaultProps: {
      size: 'md',
      color: '#FFFFFF',
      thickness: 2,
      speed: 2.0,
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
        max: 5,
        step: 0.5,
        unit: 'px',
        defaultValue: 2,
      },
      {
        name: 'speed',
        label: 'Speed',
        type: 'number',
        min: 0.5,
        max: 5,
        step: 0.5,
        unit: 's',
        defaultValue: 2.0,
      },
    ],
    generateSnippet: (props) => {
      const sizeVal = props.size !== 'md' ? `size="${props.size}"` : '';
      const colorVal = props.color && props.color !== '#FFFFFF' ? `color="${props.color}"` : '';
      const thickVal = props.thickness !== 2 ? `thickness={${props.thickness}}` : '';
      const speedVal = props.speed !== 2.0 ? `speed={${props.speed}}` : '';

      const attrs = [sizeVal, colorVal, thickVal, speedVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { Clock } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <Clock${attrStr} />;\n}`;
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

  'dots-bounce': {
    id: 'dots-bounce',
    name: 'DotsBounce',
    category: 'loaders',
    description: 'Three bouncing dots animated loading indicator with sequential wave bounce.',
    component: DotsBounce,
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
      {
        name: 'spacing',
        label: 'Spacing',
        type: 'number',
        min: 2,
        max: 16,
        step: 1,
        unit: 'px',
        defaultValue: 4,
      },
    ],
    generateSnippet: (props) => {
      const sizeVal = props.size !== 'md' ? `size="${props.size}"` : '';
      const colorVal = props.color && props.color !== '#FFFFFF' ? `color="${props.color}"` : '';
      const speedVal = props.speed !== 1.4 ? `speed={${props.speed}}` : '';
      const spacingVal = props.spacing !== 4 ? `spacing={${props.spacing}}` : '';

      const attrs = [sizeVal, colorVal, speedVal, spacingVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { DotsBounce } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <DotsBounce${attrStr} />;\n}`;
    },
  },

  'dots-fade': {
    id: 'dots-fade',
    name: 'DotsFade',
    category: 'loaders',
    description: 'Three dots fading in and out smoothly in sequence with pure opacity transitions.',
    component: DotsFade,
    defaultProps: {
      size: 'md',
      color: '#FFFFFF',
      speed: 1.2,
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
        defaultValue: 1.2,
      },
      {
        name: 'spacing',
        label: 'Spacing',
        type: 'number',
        min: 2,
        max: 16,
        step: 1,
        unit: 'px',
        defaultValue: 4,
      },
    ],
    generateSnippet: (props) => {
      const sizeVal = props.size !== 'md' ? `size="${props.size}"` : '';
      const colorVal = props.color && props.color !== '#FFFFFF' ? `color="${props.color}"` : '';
      const speedVal = props.speed !== 1.2 ? `speed={${props.speed}}` : '';
      const spacingVal = props.spacing !== 4 ? `spacing={${props.spacing}}` : '';

      const attrs = [sizeVal, colorVal, speedVal, spacingVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { DotsFade } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <DotsFade${attrStr} />;\n}`;
    },
  },

  'dots-scale': {
    id: 'dots-scale',
    name: 'DotsScale',
    category: 'loaders',
    description: 'Three dots scaling up and down smoothly in sequence.',
    component: DotsScale,
    defaultProps: {
      size: 'md',
      color: '#FFFFFF',
      speed: 1.2,
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
        defaultValue: 1.2,
      },
      {
        name: 'spacing',
        label: 'Spacing',
        type: 'number',
        min: 2,
        max: 16,
        step: 1,
        unit: 'px',
        defaultValue: 4,
      },
    ],
    generateSnippet: (props) => {
      const sizeVal = props.size !== 'md' ? `size="${props.size}"` : '';
      const colorVal = props.color && props.color !== '#FFFFFF' ? `color="${props.color}"` : '';
      const speedVal = props.speed !== 1.2 ? `speed={${props.speed}}` : '';
      const spacingVal = props.spacing !== 4 ? `spacing={${props.spacing}}` : '';

      const attrs = [sizeVal, colorVal, speedVal, spacingVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { DotsScale } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <DotsScale${attrStr} />;\n}`;
    },
  },

  'dots-typing': {
    id: 'dots-typing',
    name: 'DotsTyping',
    category: 'loaders',
    description: 'Subtle chat typing wave indicator simulating user conversation typing.',
    component: DotsTyping,
    defaultProps: {
      size: 'md',
      color: '#FFFFFF',
      speed: 1.4,
      spacing: 4,
      label: 'Typing...',
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
      {
        name: 'spacing',
        label: 'Spacing',
        type: 'number',
        min: 2,
        max: 16,
        step: 1,
        unit: 'px',
        defaultValue: 4,
      },
    ],
    generateSnippet: (props) => {
      const sizeVal = props.size !== 'md' ? `size="${props.size}"` : '';
      const colorVal = props.color && props.color !== '#FFFFFF' ? `color="${props.color}"` : '';
      const speedVal = props.speed !== 1.4 ? `speed={${props.speed}}` : '';
      const spacingVal = props.spacing !== 4 ? `spacing={${props.spacing}}` : '';

      const attrs = [sizeVal, colorVal, speedVal, spacingVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { DotsTyping } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <DotsTyping${attrStr} />;\n}`;
    },
  },

  'dots-circle': {
    id: 'dots-circle',
    name: 'DotsCircle',
    category: 'loaders',
    description: 'Dots arranged in a circle with sequential opacity rotation in classic iOS style.',
    component: DotsCircle,
    defaultProps: {
      size: 'md',
      color: '#FFFFFF',
      dotSize: 4,
      speed: 1.0,
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
        name: 'dotSize',
        label: 'Dot Size',
        type: 'number',
        min: 2,
        max: 8,
        step: 1,
        unit: 'px',
        defaultValue: 4,
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
      const dotVal = props.dotSize !== 4 ? `dotSize={${props.dotSize}}` : '';
      const speedVal = props.speed !== 1.0 ? `speed={${props.speed}}` : '';

      const attrs = [sizeVal, colorVal, dotVal, speedVal].filter(Boolean).join(' ');
      const attrStr = attrs ? ` ${attrs}` : '';
      return `import { DotsCircle } from 'react-loading-kit';\nimport 'react-loading-kit/styles.css';\n\nexport default function Example() {\n  return <DotsCircle${attrStr} />;\n}`;
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
