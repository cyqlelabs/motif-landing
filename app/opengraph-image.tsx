import { ImageResponse } from 'next/og';

export const alt = 'Motif — Animation & Design Studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          background: '#09090b',
          color: '#fafafa',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
          <span style={{ fontSize: 96, fontWeight: 800, letterSpacing: -3 }}>motif</span>
          <span style={{ fontSize: 96, fontWeight: 800, letterSpacing: -3, color: '#f97316' }}>.ad</span>
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: '#a1a1aa',
            letterSpacing: 6,
            textTransform: 'uppercase' as const,
          }}
        >
          Animation & Design
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 24px',
            border: '1px solid #27272a',
            borderRadius: 9999,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 1.5,
            textTransform: 'uppercase' as const,
            color: '#f97316',
            marginTop: 8,
          }}
        >
          Create with AI, Not Through It
        </div>
      </div>
    ),
    { ...size },
  );
}
