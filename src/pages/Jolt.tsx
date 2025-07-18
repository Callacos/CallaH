import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const Jolt: React.FC = () => {
  // Tableau d’images avec leurs liens
  const images = [
    { src: 'src/image/img4.png', alt: 'Points et des récompenses', link: 'https://airtable.com/app59tVVLedC57S5e/pagUGugr8yYu6oV2i' },
    { src: 'src/image/img5.png', alt: 'La boutique', link: 'https://airtable.com/app59tVVLedC57S5e/pagUGugr8yYu6oV2i' },
    { src: 'src/image/img6.png', alt: 'Les challenges', link: 'https://airtable.com/app59tVVLedC57S5e/pagUGugr8yYu6oV2i' },
  ];

  return (
    <div className="flex-1 overflow-y-auto relative bg-gradient-to-b from-red-800 to-black">
      {/* Fond dynamique */}
      <div className="absolute inset-0 animate-pulse bg-red-900 opacity-10 pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto p-8 relative z-10">
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
            className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Zap className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-6">Jolt</h1>
        </motion.div>

        {/* Texte au-dessus des images */}
        <p className="text-white text-center text-lg mb-8">
          Découvrez les fonctionnalités de Jolt en un clic :
        </p>

        {/* Images cliquables */}
        <div className="flex justify-center gap-6 flex-wrap mb-8">
          {images.map((img, i) => (
            <div key={i} className="text-center">
              <a href={img.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-120 h-100 object-cover rounded-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                />
              </a>
              <p className="mt-4 text-white/80">{img.alt}</p>
            </div>
          ))}
        </div>

        {/* Texte final */}
        <p className="text-white text-center text-md mt-4">
          Cliquez sur une image pour explorer davantage les capacités de Jolt.
        </p>
      </div>
    </div>
  );
};
