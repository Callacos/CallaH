import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Plus } from 'lucide-react';

interface Website {
  url: string;
  name: string;
  description: string;
}

export const SiteWeb: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([
    {
      url: 'https://www.holbertonschool.com',
      name: 'Holberton',
      description: 'École de développement logiciel full stack et IA',
    },
    {
      url: 'https://github.com',
      name: 'GitHub',
      description: 'Hébergement de code source et collaboration open source',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newSite, setNewSite] = useState<Website>({
    url: '',
    name: '',
    description: '',
  });

  const handleAddSite = () => {
    if (newSite.url && newSite.name && newSite.description) {
      setWebsites([...websites, newSite]);
      setNewSite({ url: '', name: '', description: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Titre + Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Globe className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-6">Sites Web</h1>
        </motion.div>

        {/* Bouton Ajouter */}
        <div className="text-right mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>{showForm ? 'Annuler' : 'Ajouter un site'}</span>
          </button>
        </div>

        {/* Formulaire */}
        {showForm && (
          <div className="mb-8 bg-black/30 p-4 rounded-lg border border-purple-500/20 space-y-4">
            <input
              type="text"
              placeholder="URL du site (https://...)"
              value={newSite.url}
              onChange={(e) => setNewSite({ ...newSite, url: e.target.value })}
              className="w-full bg-black/20 border border-purple-500/20 px-4 py-2 rounded text-white placeholder-white/60"
            />
            <input
              type="text"
              placeholder="Nom du site"
              value={newSite.name}
              onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
              className="w-full bg-black/20 border border-purple-500/20 px-4 py-2 rounded text-white placeholder-white/60"
            />
            <textarea
              placeholder="Description"
              value={newSite.description}
              onChange={(e) => setNewSite({ ...newSite, description: e.target.value })}
              className="w-full bg-black/20 border border-purple-500/20 px-4 py-2 rounded text-white placeholder-white/60"
            />
            <button
              onClick={handleAddSite}
              className="bg-purple-500/40 hover:bg-purple-500/60 text-white px-4 py-2 rounded"
            >
              Enregistrer
            </button>
          </div>
        )}

        {/* Cartes de site */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {websites.map((site, i) => (
            <motion.a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-black/40 border border-purple-500/30 rounded-xl p-5 hover:bg-black/60 transition-colors flex items-center space-x-4"
            >
              <img
                src={`https://www.google.com/s2/favicons?sz=64&domain_url=${site.url}`}
                alt={`${site.name} logo`}
                className="w-10 h-10 rounded"
              />
              <div>
                <h2 className="text-lg font-semibold text-white">{site.name}</h2>
                <p className="text-sm text-white/70">{site.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};
