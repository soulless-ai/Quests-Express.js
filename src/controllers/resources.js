import pool from '../db/database.js';

// Create (создать новый элемент)
export const createResource = async (req, res) => {
  const { resource } = req.body;
  try {
    const result = await pool.query('INSERT INTO resources (resource) VALUES ($1) RETURNING *', [resource]);
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read (получить все элементы)
export const getResources = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM resources');
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update (обновить элемент)
export const updateResource = async (req, res) => {
  const { resource } = req.body;
  try {
    const result = await pool.query(
      'UPDATE resources SET resource = $1 WHERE id = $2 RETURNING *',
      [resource, req.params.id]
    );
    res.status(200).send(result.rows[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete (удалить элемент)
export const deleteResource = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM resources WHERE id = $1 RETURNING *', [req.params.id]);
    res.status(200).send(result.rows[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};