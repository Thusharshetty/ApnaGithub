import DotGrid from './ReactBits/DotGrid';
import './ReactBits/reactBits.css';
import Navbar from '../Navbar.jsx'

export default function Landing(){
    return(
<div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#0a0e1a' }}>
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

<div style={{ position: 'absolute', inset: 1, zIndex: 1 }}>
  <Navbar />
</div>

<div style={{ position: 'relative', zIndex: 10 }}>
    <h1 style={{ color: '#fff', textAlign: 'center', marginTop: '40vh', fontSize: '3rem' }}>Welcome to My App</h1>
    
      </div>
      
      

</div>
    )
}