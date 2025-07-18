import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Trash } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Article {
  id: number;
  url: string;
  title: string;
  description: string;
  style: string;
  username: string;
  user_id: number;
}

const styles = [
  'Python', 'C', 'C++', 'HTML', 'CSS', 'Réseaux sociaux',
  'IA', 'Site Web', 'Application', 'Jeux vidéo', 'VR', 'Cybersécurité'
];

export const Article: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newArticle, setNewArticle] = useState({

    url: '',
    title: '',
    description: '',
    style: '',
  });
	const [showFilter, setShowFilter] = useState(false);
	const [styleFilter, setStyleFilter] = useState('');
  const { token, user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:3001/api/articles', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(() => setArticles([]));
  }, [token]);

  const handleAddArticle = async () => {
    if (!newArticle.url || !newArticle.title || !newArticle.style) return;

    const res = await fetch('http://localhost:3001/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newArticle),
    });

    if (res.ok) {
      const saved = await res.json();
      setArticles([saved, ...articles]);
      setNewArticle({ url: '', title: '', description: '', style: '' });
      setShowForm(false);
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`http://localhost:3001/api/articles/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">

        {/* Titre */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FileText className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-6">Articles</h1>
        </motion.div>

        {/* Ajouter un article */}
       {/* Boutons Ajouter & Filtrer */}
<div className="flex justify-between items-center mb-6">
  <button
    onClick={() => setShowForm(!showForm)}
    className="flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-4 py-2 rounded-lg transition"
  >
    <Plus className="w-4 h-4" />
    <span>{showForm ? 'Annuler' : 'Ajouter un article'}</span>
  </button>

  <div className="flex items-center space-x-4">
    <button
      onClick={() => {
        setShowFilter(!showFilter);
        if (showFilter) setStyleFilter('');
      }}
      className="flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-4 py-2 rounded-lg transition"
    >
      <FileText className="w-4 h-4" />
      <span>{showFilter ? 'Annuler le filtre' : 'Filtrer par style'}</span>
    </button>

    {showFilter && (
      <select
        value={styleFilter}
        onChange={(e) => setStyleFilter(e.target.value)}
        className="bg-black text-white border border-purple-500/30 px-2 py-1 rounded"
      >
        <option value="">-- Tous les styles --</option>
        {styles.map((style, i) => (
          <option key={i} value={style}>{style}</option>
        ))}
      </select>
    )}
  </div>
</div>




        {/* Formulaire */}
        {showForm && (
          <div className="mb-8 bg-black/30 p-4 rounded-lg border border-purple-500/20 space-y-4">
            <input
              type="text"
              placeholder="URL de l'article"
              value={newArticle.url}
              onChange={(e) => setNewArticle({ ...newArticle, url: e.target.value })}
              className="w-full bg-black/20 border border-purple-500/20 px-4 py-2 rounded text-white placeholder-white/60"
            />
            <input
              type="text"
              placeholder="Titre"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              className="w-full bg-black/20 border border-purple-500/20 px-4 py-2 rounded text-white placeholder-white/60"
            />
            <textarea
              placeholder="Description"
              value={newArticle.description}
              onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
              className="w-full bg-black/20 border border-purple-500/20 px-4 py-2 rounded text-white placeholder-white/60"
            />
            <select
              style={{ backgroundColor: 'black' }}
              value={newArticle.style}
              onChange={(e) => setNewArticle({ ...newArticle, style: e.target.value })}
              className="w-full border border-purple-500/20 px-4 py-2 rounded text-white"
            >
              <option value="">-- Choisir un style --</option>
              {styles.map((style, i) => (
                <option key={i} value={style}>{style}</option>
              ))}
            </select>
            <button
              onClick={handleAddArticle}
              className="bg-purple-500/40 hover:bg-purple-500/60 text-white px-4 py-2 rounded"
            >
              Enregistrer
            </button>
          </div>
        )}

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles
  			.filter(article => !styleFilter || article.style === styleFilter)
  			.map((article, i) => (

            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-black/40 border border-purple-500/30 rounded-xl p-5 relative"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-white">{article.title}</h2>
                  <span className="text-xs text-purple-400 bg-purple-800/30 px-2 py-1 rounded">{article.style}</span>
                </div>
                <p className="text-sm text-white/70">{article.description}</p>
                <p className="text-xs text-white/30 mt-2 italic">Ajouté par {article.username}</p>
              </a>

              {/* Bouton supprimer */}
              {(user?.email === 'admin@holbertonstudents.com' || user?.id === article.user_id) && (
                <button
                  onClick={() => handleDelete(article.id)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                >
                  <Trash size={16} />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
