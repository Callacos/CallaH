import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Save, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';

interface CodeEditorProps {
  postId: number;
  initialCode: string;
  language: string;
  onSave: () => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  postId, 
  initialCode, 
  language, 
  onSave 
}) => {
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        toast.success('Code sauvegardé avec succès !');
        onSave();
      } else {
        throw new Error('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    toast.info('Code réinitialisé');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-black/20">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Langage: {language}</span>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/30 rounded-lg text-gray-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Réinitialiser</span>
          </motion.button>
          <motion.button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-400 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Sauvegarde...' : 'Sauvegarder'}</span>
          </motion.button>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full p-4 bg-black/60 text-white font-mono text-sm resize-none focus:outline-none border-none"
          placeholder="Écrivez votre code ici..."
          spellCheck={false}
        />
      </div>
    </div>
  );
};