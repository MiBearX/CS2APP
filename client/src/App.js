import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import SkinList   from './SkinList';
import SkinDetail from './SkinDetail';


/*function App() {
  const [skins, setSkins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/skins')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setSkins(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        console.log(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users…</div>;
  if (error)   return <div>Error: {error}</div>;

  const renderSkins = () => {
    return skins.map(skin => (
      <tr key={skin.id}>
        <td style={{ padding: '8px', border: '1px solid #ddd' }}>
          <img
            src={skin.image_url}
            alt={skin.skin_name}
            style={{ width: 160, height: 'auto', objectFit: 'cover' }}
          />
        </td>
        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{skin.skin_name}</td>
        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{skin.gun_name}</td>
        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{skin.rarity}</td>
        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{skin.collection}</td>
        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{skin.price}</td>
      </tr>
    ));
  };

  

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Skin List</h1>
      <ul>
        {skins.map((skin, i) => (
          <li key={i}>
            {skin.skin_name} - {skin.price}
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Skin List</h1>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Preview</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Skin Name</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Gun</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Rarity</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Collection</th>
            <th style={{ padding: '8px', border: '1px solid #ccc' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {renderSkins()}
        </tbody>
      </table>
    </div>
  );
}*/

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SkinList />} />
      <Route path="/skins/:id" element={<SkinDetail />} />
    </Routes>
    </BrowserRouter>
  );
}


export default App;
