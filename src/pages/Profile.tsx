import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <User className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            {user?.username}
          </h1>
          <p className="text-gray-400">Étudiant Holberton</p>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-3 p-4 bg-black/20 rounded-lg"
          >
            <Mail className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-white">{user?.email}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center space-x-3 p-4 bg-black/20 rounded-lg"
          >
            <Calendar className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Membre depuis</p>
              <p className="text-white">18/07/2025</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};