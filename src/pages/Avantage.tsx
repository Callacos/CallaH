import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

export const Avantage: React.FC = () => {
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
            <Award className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-6">Avantage</h1>
        </motion.div>
		 {/* Contenu ajouté */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }} 
          className="text-white text-center space-y-4"
        >
          <p className="text-lg">Avec Holberton School vous pouvez obtenir pleins avantages en voici quelques-uns en dessous et
			 comment y accéder :</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <img src="src/image/img1.png" alt="Avantage 1" className="w-120 h-100 object-cover rounded-lg" />
            <img src="src/image/img2.png" alt="Avantage 2" className="w-120 h-100 object-cover rounded-lg" />
            <img src="src/image/img3.png" alt="Avantage 3" className="w-120 h-100 object-cover rounded-lg" />
          </div>
		  <p> Pour accéder à ces avantages rendez-vous sur : https://intranet.hbtn.io <br/>une fois connecté aller sur la clé plate(My tools).
			 Cliquer sur "Access to the pack here", ensuite cliquer sur "Education" et suivez les instructions. Une fois connecté
			 vous aurez accès à tous les avantages.</p>
		  </motion.div>
      </div>
    </div>
  );
};
