import db from '../db.js';

export const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, description, price, stock, category FROM products'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
