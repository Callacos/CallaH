import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import { SearchBar } from './SearchBar'; // 👈 importer le bon composant

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <motion.header 
      className="relative bg-black/30 backdrop-blur-xl border-b border-purple-500/20 p-4 z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <motion.h1 
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          CallaH
        </motion.h1>

        {/* 🔍 Barre de recherche importée */}
        <div className="flex-1 max-w-md">
          <SearchBar />
        </div>

        {/* Profil + Déconnexion */}
        <div className="flex items-center space-x-4 text-white">
          <User className="w-5 h-5" />
          <span>{user?.username}</span>
          <motion.button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};
