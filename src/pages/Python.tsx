import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Gamepad } from 'lucide-react';

export const Python: React.FC = () => {
  const jeux = [
    {
      nom: "Quiz Python",
      description: "Testez vos connaissances sur la syntaxe Python de base.",
      lien: "https://www.codingame.com/playgrounds/145395/python-beginner-quiz-10-questions",
    },
    {
      nom: "Debug Challenge",
      description: "Corrigez les bugs dans du code Python cassé.",
      lien: "#",
    },
    {
      nom: "Python Adventure",
      description: "Un jeu interactif en ligne de commande en Python.",
      lien: "#",
    },
  ];

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
            <Code2 className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-6">Python</h1>
        </motion.div>

        {/* Bouton Ajouter un jeu */}
        <div className="text-right mb-6">
          <button
            className="flex items-center space-x-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-4 py-2 rounded-lg transition"
            onClick={() => alert("Démonstration - ajouter un jeu")}
          >
            <Gamepad className="w-4 h-4" />
            <span>Ajouter un jeu</span>
          </button>
        </div>

        {/* Blocs de jeux */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jeux.map((jeu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-black/40 border border-purple-500/30 rounded-xl p-5 space-y-3"
            >
              <h2 className="text-xl font-bold text-white">{jeu.nom}</h2>
              <p className="text-white/70">{jeu.description}</p>
              <a
                href={jeu.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-purple-500/40 hover:bg-purple-500/60 text-white px-4 py-2 rounded"
              >
                Jouer
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
