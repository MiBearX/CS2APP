import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './App.css';


export default function SkinList() {
  const [skins, setSkins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [query, setQuery]     = useState('');

  const fetchSkins = useCallback(async (q = '') => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/skins' + (q ? `?query=${encodeURIComponent(q)}` : ''));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSkins(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => fetchSkins(query), 500);
    return () => clearTimeout(handler);
  }, [query, fetchSkins]);

  if (loading) return <div>Loading skins…</div>;
  if (error)   return <div>Error: {error}</div>;


  return (
    <div className="container">
      <h1 className="title">CS2 Skin Catalog</h1>

        {/* Search input */}
      <div style={{ marginBottom: '1em' }}>
        <input
          type="text"
          placeholder="Search skins or guns…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            width: '100%',
            maxWidth: 400,
            padding: '8px 12px',
            fontSize: '1em',
            boxSizing: 'border-box'
          }}
        />
      </div>
      <div className="table-container">
      <table className="skins-table">
        <thead>
          <tr>
            <th>Preview</th>
            <th>Skin Name</th>
            <th>Gun</th>
            <th>Rarity</th>
            <th>Collection</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {skins.map(skin => (
            <tr key={skin.id}>
              <td>
                <Link to={`/skins/${skin.id}`}>
                  <img
                    src={skin.image_url}
                    alt={skin.skin_name}
                    style={{ width: 200, height: 'auto', objectFit: 'cover' }}
                  />
                </Link>
              </td>
              <td>
                <Link to={`/skins/${skin.id}`}>
                  {skin.skin_name}
                </Link>
              </td>
              <td>{skin.gun_name}</td>
              <td>{skin.rarity}</td>
              <td>{skin.collection}</td>
              <td>{skin.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
