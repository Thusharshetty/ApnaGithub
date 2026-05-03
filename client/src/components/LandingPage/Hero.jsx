import { Link } from 'react-router-dom'
import '../../App.css'
export default function Hero() {
  return (
    <div style={{
        position: 'relative', zIndex: 5,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        height: '100vh', textAlign: 'center',
        padding: '0 1.5rem',
        paddingTop: '60px'  // offset for fixed navbar
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(99,102,241,0.12)',
          border: '0.5px solid rgba(99,102,241,0.4)',
          borderRadius: '999px', padding: '5px 16px',
          marginBottom: '28px'
        }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#4f46e5', display: 'inline-block'
          }}></span>
          <span style={{ fontSize: '13px', color: '#a5b4fc', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
            Open Source · Built with MERN Stack
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
          fontWeight: 700, color: '#f1f5f9',
          lineHeight: 1.15, marginBottom: '16px',
          letterSpacing: '-1.5px'
        }}>
          Code. Collaborate.
          <br />
          <span style={{
            color: '#818cf8',
            textShadow: '0 0 60px rgba(99,102,241,0.4)'
          }}>
            Ship faster.
          </span>
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          color: '#94a3b8', maxWidth: '540px',
          lineHeight: 1.75, marginBottom: '40px'
        }}>
          A modern Git platform for developers. Push code, open pull requests,
          track issues — everything GitHub does, built by you.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '64px' }}>
          <Link to="/signup" style={{
            padding: '13px 30px', borderRadius: '8px',
            background: '#4f46e5', color: '#fff',
            fontWeight: 600, fontSize: '15px',
            textDecoration: 'none',
            boxShadow: '0 0 30px rgba(79,70,229,0.35)',
            transition: 'all 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#4338ca'}
            onMouseLeave={e => e.currentTarget.style.background = '#4f46e5'}
          >
            Get started free →
          </Link>

          <Link to="/explore" style={{
            padding: '13px 30px', borderRadius: '8px',
            border: '0.5px solid rgba(148,163,184,0.25)',
            color: '#94a3b8', fontSize: '15px',
            textDecoration: 'none', background: 'rgba(15,23,42,0.5)',
            transition: 'all 0.2s'
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.borderColor = 'rgba(148,163,184,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(148,163,184,0.25)' }}
          >
            Explore repos
          </Link>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'flex', gap: '48px',
          borderTop: '0.5px solid rgba(99,102,241,0.15)',
          paddingTop: '32px',
          flexWrap: 'wrap', justifyContent: 'center'
        }}>
          {[
            ['12k+', 'Repositories'],
            ['3.4k+', 'Developers'],
            ['98k+', 'Commits'],
            ['99.9%', 'Uptime']
          ].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1.6rem', fontWeight: 700,
                color: '#818cf8', letterSpacing: '-0.5px'
              }}>{num}</div>
              <div style={{
                fontSize: '12px', color: '#64748b',
                fontFamily: 'monospace', marginTop: '2px',
                letterSpacing: '0.08em'
              }}>{label}</div>
            </div>
          ))}
        </div>

      </div>
  )
}