import React from "react";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2rem', height: '60px',
      background: 'rgba(10, 14, 26, 0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: '0.5px solid rgba(99,102,241,0.2)',
    }}>

      {/* LEFT — Logo */}
      <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '28px', height: '28px', background: '#4f46e5',
          borderRadius: '7px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '14px'
        }}>G</div>
        <span style={{ fontWeight: 600, fontSize: '16px', color: '#f1f5f9' }}>GitClone</span>
      </Link>

      {/* CENTER — Search */}
      <div style={{ flex: 1, maxWidth: '380px', margin: '0 2rem' }}>
        <input
          type="text"
          placeholder="Search repositories, users..."
          style={{
            width: '100%', padding: '8px 14px',
            background: '#1e293b',
            border: '0.5px solid rgba(99,102,241,0.2)',
            borderRadius: '7px', color: '#f1f5f9',
            fontSize: '13px', outline: 'none',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* RIGHT — Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link to="/create" style={{
          padding: '7px 16px',
          background: '#4f46e5', color: '#fff',
          borderRadius: '7px', textDecoration: 'none',
          fontSize: '13px', fontWeight: 600
        }}>+ New repo</Link>

        <Link to="/profile">
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer'
          }}>T</div>
        </Link>
      </div>

    </nav>
  );
};

export default DashboardNavbar;