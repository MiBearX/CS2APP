import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function SkinDetail() {
  const { id } = useParams();
  const [skin,    setSkin]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    fetch(`/api/skins/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setSkin(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading skin…</div>;
  if (error)   return <div>Error: {error}</div>;
  if (!skin)   return <div>Skin not found</div>;

  return (
    <div className="container">
      <Link to="/">← Back to Catalog</Link>
      <div className="card" style={{ maxWidth: '400px', margin: '1em auto' }}>
        <img src={skin.image_url}
             alt={skin.skin_name}
             className="card-img" />
        <h2 className="card-name">{skin.skin_name}</h2>
        <div className="card-details">
          <div>Gun: {skin.gun_name}</div>
          <div>Rarity: {skin.rarity}</div>
          <div>Collection: {skin.collection}</div>
          <div>Price: {skin.price}</div>
          {skin.stattrak_price && <div>StatTrak: {skin.stattrak_price}</div>}
        </div>
      </div>
    </div>
  );
}
