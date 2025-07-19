import React from 'react';
import { motion } from 'framer-motion';
import { Users, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Groupe: React.FC = () => {
  const groupes = [
    { nom: 'Dev Python', description: 'Un groupe pour les passionnés de Python.', statut: 'Public' },
    { nom: 'H4ckers', description: 'Communauté dédiée à la cybersécurité.', statut: 'Privé' },
    { nom: 'Design & CSS', description: 'Partagez vos idées de design.', statut: 'Public' },
    { nom: 'Jeux vidéo', description: 'Actualités, astuces et projets gaming.', statut: 'Public' },
    { nom: 'Startups IA', description: 'Groupe fermé pour projets IA confidentiels.', statut: 'Privé' },
    { nom: 'Projet JS', description: 'Collaboration autour de projets JavaScript.', statut: 'Public' },
  ];

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')               // accents → lettres normales
      .replace(/[\u0300-\u036f]/g, '') // suppression des accents
      .replace(/\s+/g, '-')           // espaces → tirets
      .replace(/[^a-z0-9-]/g, '');    // caractères spéciaux supprimés

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">

        {/* Titre */}
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
            <Users className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-6">Groupe</h1>
        </motion.div>

        {/* Bouton Créer un groupe */}
        <div className="text-right mb-6">
          <button
            onClick={() => alert('Démo : création de groupe')}
            className="flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-4 py-2 rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>Créer un groupe</span>
          </button>
        </div>

        {/* Groupes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {groupes.map((groupe, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Link
                to={`/groupe/${slugify(groupe.nom)}`}
                className="block bg-black/40 border border-purple-500/30 rounded-xl p-5 hover:bg-purple-500/10 transition"
              >
                <h2 className="text-xl font-bold text-white">{groupe.nom}</h2>
                <p className="text-white/70 mt-1">{groupe.description}</p>
                <span className={`inline-block mt-3 text-sm px-2 py-1 rounded ${
                  groupe.statut === 'Public'
                    ? 'bg-green-500/30 text-green-300'
                    : 'bg-red-500/30 text-red-300'
                }`}>
                  {groupe.statut}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};