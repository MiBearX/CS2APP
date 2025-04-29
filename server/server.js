const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db');


const PORT = process.env.PORT || 8080;
const app = express()



app.get("/api", (req, res) => {
    res.json({"users": ["Bullshit1", "Bullshit2", "Bullshit3"] })
})

app.get('/api/skins', async (req, res) => {
    const {query} = req.query;
    try {
      let sqlQuery = 'SELECT * FROM skins';
      const parameters = [];

      if (query) {
        sqlQuery += " WHERE skin_name ILIKE $1 OR gun_name ILIKE $1";
        parameters.push(`%${query}%`)
      }

      sqlQuery += " ORDER BY NULLIF(regexp_replace(price,'[^0-9.]','','g'),'')::NUMERIC DESC NULLS LAST";
      const { rows } = await pool.query(sqlQuery, parameters);
      res.json(rows);
    } catch (err) {
      console.error('DB error on GET /api/skins:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.get('/api/skins/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const { rows } = await pool.query(
        'SELECT * FROM skins WHERE id = $1',
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Skin not found' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error('Error fetching skin by id:', err);
      res.status(500).json({ error: 'Database error' });
    }
  });

app.listen(PORT, () => {
    console.log("Server listening");
})
