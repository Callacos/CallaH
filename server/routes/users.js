import express from 'express';
import sqlite3pkg from 'sqlite3';

const router = express.Router();

const sqlite3 = sqlite3pkg.verbose();
const db = new sqlite3.Database('./database.sqlite');

// Middleware de vérification du token (à adapter selon ton système)
function authRequired(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Token requis' });
  // ici tu peux ajouter une vraie vérification si tu veux
  next();
}

router.get('/api/users', authRequired, (req, res) => {
  const search = (req.query.search || '').toLowerCase();

  if (!search) return res.json([]);

  db.all(
    `SELECT id, email, username FROM users
     WHERE (LOWER(email) LIKE ? OR LOWER(username) LIKE ?)
     AND email LIKE '%@holbertonstudents.com'
     LIMIT 10`,
    [`%${search}%`, `%${search}%`],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json(rows);
    }
  );
});

export default router;

