import { useState, useEffect } from "react";
import DashboardNavbar from "../DashBoardNavbar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        const res = await fetch(`http://localhost:3000/repo/user/${userId}`);
        const data = await res.json();
        setRepositories(data.repositories);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const res = await fetch(`http://localhost:3000/repo/all`);
        const data = await res.json();
        setSuggestedRepositories(data);
      } catch (error) {
        console.error("Error fetching suggested repositories:", error);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
      return;
    }
    const results = repositories.filter(repo =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  }, [searchQuery, repositories]);

  return (
    <div style={{ background: '#0a0e1a', minHeight: '100vh', color: '#f1f5f9' }}>
      <DashboardNavbar />

      {/* Page body */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr 300px',
        gap: '0',
        maxWidth: '1280px',
        margin: '0 auto',
        paddingTop: '60px',
      }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={{
          padding: '24px 16px',
          borderRight: '0.5px solid rgba(99,102,241,0.1)',
          position: 'sticky', top: '60px',
          height: 'calc(100vh - 60px)', overflowY: 'auto'
        }}>

          {/* Top Repositories header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>Top repositories</span>
            <Link to="/create" style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 10px',
              background: '#4f46e5', color: '#fff',
              borderRadius: '6px', textDecoration: 'none',
              fontSize: '12px', fontWeight: 600
            }}>+ New</Link>
          </div>

          {/* Search repos */}
          <input
            type="text"
            placeholder="Find a repository..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '7px 12px',
              background: '#0f172a',
              border: '0.5px solid rgba(99,102,241,0.2)',
              borderRadius: '6px', color: '#f1f5f9',
              fontSize: '12px', outline: 'none',
              boxSizing: 'border-box', marginBottom: '12px'
            }}
          />

          {/* Repo list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {searchResults.map(repo => (
              <Link
                to={`/repo/${repo._id}`}
                key={repo._id}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '7px 8px', borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Avatar circle */}
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  flexShrink: 0
                }}></div>
                <span style={{
                  fontSize: '13px', color: '#a5b4fc',
                  fontFamily: 'monospace',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>
                  {localStorage.getItem("username") || "user"}/{repo.name}
                </span>
              </Link>
            ))}
          </div>

          {repositories.length > 6 && (
            <button style={{
              marginTop: '10px', background: 'none', border: 'none',
              color: '#818cf8', fontSize: '12px', cursor: 'pointer', padding: '4px 8px'
            }}>Show more</button>
          )}
        </aside>

        {/* ── CENTER FEED ── */}
        <main style={{ padding: '24px 24px', borderRight: '0.5px solid rgba(99,102,241,0.1)' }}>

          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f1f5f9', marginBottom: '20px' }}>
            Home
          </h2>

          {/* Quick action bar */}
          <div style={{
            display: 'flex', gap: '10px', flexWrap: 'wrap',
            marginBottom: '28px'
          }}>
            {[
              { label: '+ Create repo', to: '/create' },
              { label: '⑂ Create issue', to: '#' },
              { label: '⎇ Pull requests', to: '#' },
              { label: '★ Stars', to: '#' },
            ].map(item => (
              <Link key={item.label} to={item.to} style={{
                padding: '7px 14px',
                background: '#0f172a',
                border: '0.5px solid rgba(99,102,241,0.2)',
                borderRadius: '7px', color: '#94a3b8',
                textDecoration: 'none', fontSize: '13px',
                transition: 'all 0.15s'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.color = '#f1f5f9' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; e.currentTarget.style.color = '#94a3b8' }}
              >{item.label}</Link>
            ))}
          </div>

          {/* Feed label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#94a3b8' }}>Feed</span>
            <button style={{
              background: 'none', border: '0.5px solid rgba(99,102,241,0.2)',
              borderRadius: '6px', color: '#64748b',
              padding: '4px 10px', fontSize: '12px', cursor: 'pointer'
            }}>Filter</button>
          </div>

          {/* Feed cards — your repos as activity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {repositories.map(repo => (
              <div key={repo._id} style={{
                background: '#0f172a',
                border: '0.5px solid rgba(99,102,241,0.15)',
                borderRadius: '10px', padding: '18px 20px',
                transition: 'border-color 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.15)'}
              >
                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 700, fontSize: '13px', flexShrink: 0
                  }}>
                    {repo.name?.[0]?.toUpperCase() || 'R'}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#a5b4fc', fontFamily: 'monospace' }}>
                      {localStorage.getItem("username") || "user"}/{repo.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#475569' }}>
                      Updated {repo.updatedAt ? new Date(repo.updatedAt).toLocaleDateString() : 'recently'}
                    </div>
                  </div>
                  <span style={{
                    marginLeft: 'auto', fontSize: '10px',
                    padding: '2px 8px',
                    border: '0.5px solid rgba(99,102,241,0.25)',
                    borderRadius: '20px', color: '#64748b'
                  }}>{repo.isPrivate ? 'Private' : 'Public'}</span>
                </div>

                {/* Description */}
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 14px', lineHeight: 1.6 }}>
                  {repo.description || 'No description provided.'}
                </p>

                {/* Meta */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {repo.language && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f7df1e' }}></div>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>{repo.language}</span>
                    </div>
                  )}
                  <span style={{ fontSize: '12px', color: '#475569' }}>⭐ {repo.stars || 0}</span>
                  <span style={{ fontSize: '12px', color: '#475569' }}>⑂ {repo.forks || 0}</span>
                </div>
              </div>
            ))}

            {repositories.length === 0 && (
              <div style={{
                textAlign: 'center', padding: '60px 20px',
                color: '#475569', fontFamily: 'monospace', fontSize: '14px',
                border: '0.5px dashed rgba(99,102,241,0.15)', borderRadius: '10px'
              }}>
                No repositories yet. <Link to="/create" style={{ color: '#818cf8' }}>Create one →</Link>
              </div>
            )}
          </div>
        </main>

        {/* ── RIGHT SIDEBAR ── */}
        <aside style={{
          padding: '24px 16px',
          position: 'sticky', top: '60px',
          height: 'calc(100vh - 60px)', overflowY: 'auto'
        }}>

          {/* Suggested Repos */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>Suggested repositories</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {suggestedRepositories.slice(0, 4).map(repo => (
                <div key={repo._id} style={{
                  padding: '12px 14px',
                  background: '#0f172a',
                  border: '0.5px solid rgba(99,102,241,0.12)',
                  borderRadius: '8px',
                  transition: 'border-color 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.12)'}
                >
                  <div style={{ fontSize: '13px', color: '#818cf8', fontFamily: 'monospace', marginBottom: '4px' }}>
                    {repo.name}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '10px', lineHeight: 1.5 }}>
                    {repo.description || 'No description'}
                  </div>
                  <button style={{
                    padding: '4px 12px', fontSize: '11px',
                    background: 'rgba(99,102,241,0.1)',
                    border: '0.5px solid rgba(99,102,241,0.3)',
                    borderRadius: '5px', color: '#818cf8', cursor: 'pointer'
                  }}>⭐ Star</button>
                </div>
              ))}
            </div>
          </div>

          {/* Latest changelog / events */}
          <div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9', display: 'block', marginBottom: '14px' }}>
              Latest from changelog
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { time: '2 days ago', title: 'Added pull request review system' },
                { time: '1 week ago', title: 'Improved repo search with filters' },
                { time: '2 weeks ago', title: 'Launched GitClone v1.0 🎉' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', flexDirection: 'column', gap: '3px',
                  paddingLeft: '12px',
                  borderLeft: '2px solid rgba(99,102,241,0.3)'
                }}>
                  <span style={{ fontSize: '11px', color: '#475569' }}>{item.time}</span>
                  <span style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5 }}>{item.title}</span>
                </div>
              ))}
            </div>

            <button style={{
              marginTop: '16px', background: 'none', border: 'none',
              color: '#818cf8', fontSize: '12px', cursor: 'pointer', padding: 0
            }}>View changelog →</button>
          </div>

        </aside>
      </div>
    </div>
  );
}