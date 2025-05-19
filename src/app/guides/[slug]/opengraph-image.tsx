import { ImageResponse } from 'next/og'

export const alt = 'Bio Farm - Organic Fertilizer Solutions'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to right, #f0fdf4, #ffffff, #fefce8)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Decorative Elements */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '10px',
            width: '300px',
            height: '300px',
            background: 'rgba(34, 197, 94, 0.2)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '10px',
            width: '400px',
            height: '400px',
            background: 'rgba(234, 179, 8, 0.1)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
        />

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div
            style={{
              background: 'linear-gradient(to right, #16a34a, #22c55e)',
              padding: '24px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(34, 197, 94, 0.2)',
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: 'white' }}
            >
              <path
                d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Text Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #166534, #22c55e)',
                backgroundClip: 'text',
                color: 'transparent',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Bio Farm
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: '#4b5563',
                margin: 0,
              }}
            >
              Sustainable Organic Solutions
            </p>
          </div>
        </div>

        {/* Bottom Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '12px 24px',
            borderRadius: '100px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22c55e',
            }}
          />
          <span
            style={{
              fontSize: '20px',
              color: '#374151',
            }}
          >
            100% Organic • Eco-Friendly • Sustainable
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}