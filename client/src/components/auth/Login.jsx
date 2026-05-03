import { Link } from 'react-router-dom';
import Navbar from '../Navbar.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();


//   useEffect(()=>{
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     setCurrentUser(null);
//   }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      setLoading(false);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{
        width: '100vw', height: '100vh',
        background: '#0a0e1a',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>

        <div style={{
          background: '#0f172a',
          border: '0.5px solid rgba(99,102,241,0.25)',
          borderRadius: '12px',
          padding: '40px 36px',
          width: '100%', maxWidth: '400px',
        }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{
              width: '28px', height: '28px', background: '#4f46e5',
              borderRadius: '7px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '14px'
            }}>G</div>
            <span style={{ fontWeight: 600, fontSize: '16px', color: '#f1f5f9' }}>GitClone</span>
          </div>

          <h2 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: 600, marginBottom: '6px' }}>
            Login to your account
          </h2>
          <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '28px' }}>
            Don't have an account? <Link to="/signup" style={{ color: '#818cf8', textDecoration: 'none' }}>Sign up</Link>
          </p>

         
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            <div>
              <label htmlFor="email" style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%', padding: '10px 14px',
                  background: '#1e293b', border: '0.5px solid rgba(99,102,241,0.2)',
                  borderRadius: '7px', color: '#f1f5f9', fontSize: '14px',
                  outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label htmlFor="password" style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '10px 14px',
                  background: '#1e293b', border: '0.5px solid rgba(99,102,241,0.2)',
                  borderRadius: '7px', color: '#f1f5f9', fontSize: '14px',
                  outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ borderBottom: '1px solid white', marginBottom: '28px', marginTop: '28px' }}></div>
            
            <button 
              type="submit" 
              disabled={loading}
              style={{
                width: '100%', padding: '11px',
                background: '#4f46e5', color: '#fff',
                border: 'none', borderRadius: '7px',
                fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                marginTop: '4px'
              }}
            >
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>

          </form>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 10 }}>
        <Navbar />
      </div>
    </>
  );
}