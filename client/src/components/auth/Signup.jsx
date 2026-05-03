import { Link } from 'react-router-dom';
import Navbar from '../Navbar.jsx';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext.jsx';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useAuth();

    const handleSignup = async (e) => {

        e.preventDefault();
        
        if (!email || !password || !username) {
            alert("All fields are required!");
            return;
        }
        
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/signup", {
                email: email,
                password: password,
                username: username
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            setCurrentUser(res.data.userId);
            setLoading(false);
            window.location.href = "/dashboard";
        } catch (err) {
            console.error("Signup failed:", err);
            alert("Signup failed. Please try again.");
            setLoading(false);
        }
    }

    return (
        <>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', zIndex: 10 }}>
                <Navbar />
            </div>
            <div style={{
                width: '100vw', height: '100vh',
                background: '#0a0e1a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: '-20px'
            }}>

                <div style={{
                    background: '#0f172a',
                    border: '0.5px solid rgba(99,102,241,0.25)',
                    borderRadius: '12px',
                    padding: '30px 36px',
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
                        Create your account
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '28px' }}>
                        Already have an account? <Link to="/auth" style={{ color: '#818cf8', textDecoration: 'none' }}>Login</Link>
                    </p>

                    <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div>
                            <label style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }} htmlFor='username'>
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="thushar-shetty"
                                required={true}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id='username'
                                style={{
                                    width: '100%', padding: '10px 14px',
                                    background: '#1e293b', border: '0.5px solid rgba(99,102,241,0.2)',
                                    borderRadius: '7px', color: '#f1f5f9', fontSize: '14px',
                                    outline: 'none', boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }} htmlFor='email'>
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                required={true}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id='email'
                                style={{
                                    width: '100%', padding: '10px 14px',
                                    background: '#1e293b', border: '0.5px solid rgba(99,102,241,0.2)',
                                    borderRadius: '7px', color: '#f1f5f9', fontSize: '14px',
                                    outline: 'none', boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '13px', color: '#94a3b8', display: 'block', marginBottom: '6px' }} htmlFor='password'>
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required={true}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id='password'
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
                            style={{
                                width: '100%', padding: '11px',
                                background: '#4f46e5', color: '#fff',
                                border: 'none', borderRadius: '7px',
                                fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                                marginTop: '4px'
                            }} 
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Create account →'}
                        </button>
                    </form>

                    <p style={{ fontSize: '11px', color: '#475569', textAlign: 'center', marginTop: '20px' }}>
                        By signing up, you agree to our{' '}
                        <a href="#" style={{ color: '#818cf8', textDecoration: 'none' }}>Terms</a> and{' '}
                        <a href="#" style={{ color: '#818cf8', textDecoration: 'none' }}>Privacy Policy</a>
                    </p>

                </div>
            </div>
        </>
    )
}