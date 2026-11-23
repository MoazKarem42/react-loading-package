import * as React from 'react';
import { Spinner } from 'react-loading-kit';

//Preview component for Pulse loader
export const PulsePreview: React.FC<{ size?: string | number; color?: string; speed?: number }> = ({
  color = '#FFFFFF',
  speed = 1.2,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
      }}
    >
      <span
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          backgroundColor: color,
        }}
      />
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: `2px solid ${color}`,
          opacity: 0.75,
          animation: `rl-pulse ${speed}s cubic-bezier(0, 0, 0.2, 1) infinite`,
        }}
      />
      <style>{`
        @keyframes rl-pulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

//Preview component for Ring loader
export const RingPreview: React.FC<{ size?: string | number; color?: string; speed?: number; thickness?: number }> = ({
  color = '#FFFFFF',
  speed = 0.8,
  thickness = 2,
}) => {
  return (
    <div
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: `${thickness}px dashed ${color}`,
        animation: `rl-spin ${speed}s linear infinite`,
      }}
    >
      <style>{`
        @keyframes rl-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

//Preview component for ProgressBar loader
export const ProgressBarPreview: React.FC<{ color?: string; speed?: number }> = ({
  color = '#FFFFFF',
  speed = 1.5,
}) => {
  return (
    <div
      style={{
        width: '200px',
        height: '6px',
        backgroundColor: '#212121',
        borderRadius: '9999px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '50%',
          backgroundColor: color,
          borderRadius: '9999px',
          animation: `rl-indeterminate ${speed}s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`,
        }}
      />
      <style>{`
        @keyframes rl-indeterminate {
          0% { left: -50%; width: 50%; }
          100% { left: 100%; width: 50%; }
        }
      `}</style>
    </div>
  );
};

//Preview component for Skeleton base
export const SkeletonPreview: React.FC<{ shimmer?: boolean }> = ({ shimmer = true }) => {
  return (
    <div
      style={{
        width: '240px',
        height: '40px',
        backgroundColor: '#212121',
        borderRadius: '4px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {shimmer && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
            animation: 'rl-shimmer 1.6s infinite',
          }}
        />
      )}
      <style>{`
        @keyframes rl-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

//Preview component for SkeletonText
export const SkeletonTextPreview: React.FC<{ lines?: number; shimmer?: boolean }> = ({
  lines = 3,
  shimmer = true,
}) => {
  const lineArray = Array.from({ length: lines }, (_, i) => i);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '240px' }}>
      {lineArray.map((idx) => {
        let width = '100%';
        if (idx === lineArray.length - 1) {
          width = '70%';
        } else if (idx === lineArray.length - 2) {
          width = '85%';
        }
        return (
          <div
            key={idx}
            style={{
              height: '12px',
              width,
              backgroundColor: '#212121',
              borderRadius: '2px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {shimmer && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
                  animation: 'rl-shimmer 1.6s infinite',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

//Preview component for SkeletonCard
export const SkeletonCardPreview: React.FC<{ shimmer?: boolean }> = ({ shimmer = true }) => {
  return (
    <div
      style={{
        width: '240px',
        padding: '16px',
        backgroundColor: '#1b1b1b',
        border: '1px solid #2a2a2a',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#212121' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <div style={{ width: '70%', height: '10px', backgroundColor: '#212121', borderRadius: '2px' }} />
          <div style={{ width: '40%', height: '8px', backgroundColor: '#212121', borderRadius: '2px' }} />
        </div>
      </div>
      <div style={{ width: '100%', height: '32px', backgroundColor: 'rgba(53, 53, 53, 0.6)', borderRadius: '4px' }} />
      {shimmer && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
            animation: 'rl-shimmer 1.6s infinite',
          }}
        />
      )}
    </div>
  );
};

//Preview component for SkeletonAvatar
export const SkeletonAvatarPreview: React.FC<{ shimmer?: boolean }> = ({ shimmer = true }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#212121',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {shimmer && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
              animation: 'rl-shimmer 1.6s infinite',
            }}
          />
        )}
      </div>
      <div
        style={{
          width: '80px',
          height: '12px',
          borderRadius: '2px',
          backgroundColor: '#212121',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {shimmer && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
              animation: 'rl-shimmer 1.6s infinite',
            }}
          />
        )}
      </div>
    </div>
  );
};

//Preview component for LoadingOverlay
export const LoadingOverlayPreview: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        backgroundColor: '#1f1f1f',
        border: '1px solid #2a2a2a',
        borderRadius: '6px',
      }}
    >
      <Spinner size="sm" color="#AEC6FF" />
      <span style={{ fontSize: '13px', color: '#c4c7c8', fontFamily: 'var(--rl-demo-font-sans)' }}>
        Loading...
      </span>
    </div>
  );
};

//Preview component for useLoading state
export const UseLoadingPreview: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 12px',
        backgroundColor: '#1f1f1f',
        border: '1px solid #2a2a2a',
        borderRadius: '12px',
        fontSize: '12px',
        fontFamily: 'var(--rl-demo-font-mono)',
        color: '#AEC6FF',
      }}
    >
      <span
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#AEC6FF',
          animation: 'rl-pulse 1.2s infinite',
        }}
      />
      isLoading: true
    </div>
  );
};
