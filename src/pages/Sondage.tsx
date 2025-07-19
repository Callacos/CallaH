import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

type Poll = {
  id: string;
  question: string;
  description: string;
  options: string[];
};

export const Sondage: React.FC = () => {
  const [votes, setVotes] = useState<{ [pollId: string]: { [option: string]: number } }>({});
  const [votedOption, setVotedOption] = useState<{ [pollId: string]: string }>({});

  const sondages: Poll[] = [
    {
      id: '1',
      question: 'Quel est ton langage préféré ?',
      description: 'Entre Python et JavaScript, lequel préfères-tu ?',
      options: ['Python', 'JavaScript'],
    },
    {
      id: '2',
      question: 'Coder le soir ou la journée ?',
      description: 'Quand es-tu le plus productif ?',
      options: ['Soir', 'Journée'],
    },
    {
      id: '3',
      question: 'Frontend ou Backend ?',
      description: 'Quel domaine préfères-tu explorer ?',
      options: ['Frontend', 'Backend'],
    },
  ];

  const handleVote = (pollId: string, option: string) => {
    if (votedOption[pollId]) return; // Empêche de voter plusieurs fois

    setVotes((prev) => {
      const currentVotes = prev[pollId] || {};
      const updatedVotes = {
        ...currentVotes,
        [option]: (currentVotes[option] || 0) + 1,
      };
      return {
        ...prev,
        [pollId]: updatedVotes,
      };
    });

    setVotedOption((prev) => ({
      ...prev,
      [pollId]: option,
    }));
  };

  const getTotalVotes = (pollVotes: { [option: string]: number }) =>
    Object.values(pollVotes).reduce((acc, val) => acc + val, 0);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">

        {/* Bouton Ajouter un sondage */}
        <div className="flex justify-end mb-6">
          <button className="px-4 py-2 bg-gradient-to-br from-purple-600 to-pink-500 text-white font-semibold rounded shadow hover:scale-105 transition">
            + Ajouter un sondage
          </button>
        </div>

        {/* Logo + Titre */}
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
            <BarChart3 className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-6">Sondages</h1>
        </motion.div>

        {/* Liste des sondages */}
        <div className="space-y-6">
          {sondages.map((poll, index) => {
            const pollVotes = votes[poll.id] || {};
            const total = getTotalVotes(pollVotes);

            return (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-black/30 backdrop-blur-md border border-purple-500/20 p-6 rounded-lg shadow"
              >
                <h2 className="text-2xl text-white font-semibold mb-2">{poll.question}</h2>
                <p className="text-gray-300 mb-4">{poll.description}</p>

                {!votedOption[poll.id] ? (
                  <div className="flex space-x-4">
                    {poll.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleVote(poll.id, option)}
                        className="px-4 py-2 bg-purple-800 text-purple-200 rounded-full hover:bg-purple-700 hover:text-white transition"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {poll.options.map((option) => {
                      const count = pollVotes[option] || 0;
                      const percent = total > 0 ? Math.round((count / total) * 100) : 0;

                      return (
                        <div key={option}>
                          <div className="flex justify-between mb-1">
                            <span className="text-white font-medium">{option}</span>
                            <span className="text-white font-medium">{percent}%</span>
                          </div>
                          <div className="w-full bg-purple-900 rounded-full h-4">
                            <div
                              className="bg-pink-500 h-4 rounded-full transition-all"
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
