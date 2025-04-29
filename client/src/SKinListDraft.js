import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function SkinList() {
  const [skins, setSkins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

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
        setError(err.message);
        setLoading(false);
      });
  }, []);


  if (loading) return <div>Loading skins…</div>;
  if (error)   return <div>Error: {error}</div>;

  // helper returns array of <li>
  /*const renderSkinsList = () =>
    skins.map(skin => (
      <li key={skin.id} className="card">
        <Link to={`/skins/${skin.id}`}>
          <img src={skin.image_url}
               alt={skin.skin_name}
               className="card-img" />
          <div className="card-name">{skin.skin_name}</div>
        </Link>

        
        <div className="card-details">
          <div>Gun: {skin.gun_name}</div>
          <div>Rarity: {skin.rarity}</div>
          <div>Collection: {skin.collection}</div>
          <div>Price: {skin.price}</div>
          {skin.stattrak_price && (
            <div>StatTrak: {skin.stattrak_price}</div>
          )}
        </div>
      </li> 
    ));*/
    


  return (
    /*<div className="container">
      <h1 className="title">Skin Catalog</h1>
      <ul className="grid">
        {renderSkinsList()}
      </ul>
    </div>*/
    <div className="container">
      <h1 className="title">Skin Catalog</h1>


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
                <Link to={`/skins/${skin.id}`} className="table-link">
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
  );
}
