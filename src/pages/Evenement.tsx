import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

export const Evenement: React.FC = () => {
  const events = [
    {
      title: 'Hackathon Holberton',
      location: 'Fréjus',
      date: '20 juillet 2025',
      description: 'Un événement de 24h pour créer un projet en équipe.'
    },
    {
      title: 'JS Conf',
      location: 'Paris',
      date: '5 août 2025',
      description: 'Conférence sur JavaScript et les dernières technologies front-end.'
    },
    {
      title: 'DevFest',
      location: 'Nice',
      date: '12 septembre 2025',
      description: 'Rencontre de développeurs autour de conférences et d’ateliers.'
    },
    {
      title: 'React Meetup',
      location: 'Toulon',
      date: '30 août 2025',
      description: 'Soirée échanges autour de React, Next.js et React Native.'
    },
    {
      title: 'Forum des métiers du numérique',
      location: 'Marseille',
      date: '18 juillet 2025',
      description: 'Découverte des opportunités pro dans le domaine tech.'
    },
    {
      title: 'Soirée Coding Game',
      location: 'Remote',
      date: '1 août 2025',
      description: 'Affronte d’autres devs dans des défis d’algo fun.'
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
            <Cpu className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-6">Événements</h1>
        </motion.div>

        {/* Blocs d'événements */}
        <div className="grid grid-cols-1 gap-6 mt-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white/5 border border-purple-500/20 rounded-lg p-6 text-white shadow-md"
            >
              <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
              <p className="text-sm text-purple-300 mb-1"><strong>Lieu :</strong> {event.location}</p>
              <p className="text-sm text-purple-300 mb-2"><strong>Date :</strong> {event.date}</p>
              <p className="text-sm text-gray-300">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
