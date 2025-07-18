import express from 'express';
import sqlite3 from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const db = sqlite3('database.sqlite');
const JWT_SECRET = 'holberton-secret-key-2024';

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Créer le dossier uploads s'il n'existe pas
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuration multer pour les uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Initialiser la base de données
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    username TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    content TEXT NOT NULL,
    code TEXT,
    language TEXT DEFAULT 'javascript',
    is_anonymous BOOLEAN DEFAULT 0,
    media_path TEXT,
    media_type TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS post_corrections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    user_id INTEGER,
    corrected_code TEXT NOT NULL,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`);

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token d\'accès requis' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

// Routes d'authentification
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Vérifier que l'email se termine par @holbertonstudents.com
    if (!email.endsWith('@holbertonstudents.com')) {
      return res.status(400).json({ 
        error: 'Seules les adresses email @holbertonstudents.com sont autorisées' 
      });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const result = db.prepare('INSERT INTO users (email, password, username) VALUES (?, ?, ?)')
      .run(email, hashedPassword, username);

    // Créer le token JWT
    const token = jwt.sign(
      { userId: result.lastInsertRowid, email, username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token,
      user: { id: result.lastInsertRowid, email, username }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier que l'email se termine par @holbertonstudents.com
    if (!email.endsWith('@holbertonstudents.com')) {
      return res.status(400).json({ 
        error: 'Seules les adresses email @holbertonstudents.com sont autorisées' 
      });
    }

    // Trouver l'utilisateur
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Créer le token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Connexion réussie',
      token,
      user: { id: user.id, email: user.email, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Routes pour les posts
app.post('/api/posts', authenticateToken, upload.single('media'), (req, res) => {
  try {
    const { content, code, language, is_anonymous } = req.body;
    let mediaPath = null;
    let mediaType = null;

    if (req.file) {
      mediaPath = `/uploads/${req.file.filename}`;
      mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';
    }

    const result = db.prepare(`
      INSERT INTO posts (user_id, content, code, language, is_anonymous, media_path, media_type)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      req.user.userId,
      content,
      code || null,
      language || 'javascript',
      is_anonymous === 'true' ? 1 : 0,
      mediaPath,
      mediaType
    );

    res.status(201).json({
      message: 'Post créé avec succès',
      postId: result.lastInsertRowid
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/posts', authenticateToken, (req, res) => {
  try {
    const posts = db.prepare(`
      SELECT 
        p.*,
        CASE 
          WHEN p.is_anonymous = 1 THEN 'Anonyme'
          ELSE u.username 
        END as author_name
      FROM posts p
      LEFT JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `).all();

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.put('/api/posts/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;

    // Vérifier que le post existe
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
    if (!post) {
      return res.status(404).json({ error: 'Post non trouvé' });
    }

    // Mettre à jour le code
    db.prepare('UPDATE posts SET code = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(code, id);

    // Enregistrer la correction
    db.prepare(`
      INSERT INTO post_corrections (post_id, user_id, corrected_code, comment)
      VALUES (?, ?, ?, ?)
    `).run(id, req.user.userId, code, 'Code corrigé via sandbox');

    res.json({ message: 'Post mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/api/posts/:id/corrections', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const corrections = db.prepare(`
      SELECT 
        pc.*,
        u.username
      FROM post_corrections pc
      JOIN users u ON pc.user_id = u.id
      WHERE pc.post_id = ?
      ORDER BY pc.created_at DESC
    `).all(id);

    res.json(corrections);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});