import { Link } from 'react-router-dom'
import DotGrid from './ReactBits/DotGrid';
import './ReactBits/reactBits.css';
import Navbar from '../Navbar.jsx';
import Hero from './Hero.jsx';

export default function Landing() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#0a0e1a' }}>
      
      {/* DotGrid Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="#334155"
          activeColor="#4f46e5"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>

      {/* Navbar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 10 }}>
        <Navbar />
      </div>
      {/* Hero Section */}
      <Hero/>
    </div>
  )
}