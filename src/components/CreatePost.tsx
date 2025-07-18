import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Send, Code, Image, Video, EyeOff, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface CreatePostProps {
  onPostCreated: () => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('code', code);
      formData.append('language', language);
      formData.append('is_anonymous', isAnonymous.toString());

      const response = await fetch('http://localhost:3001/api/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('Post créé avec succès !');
        setContent('');
        setCode('');
        setLanguage('javascript');
        setIsAnonymous(false);
        setShowCodeEditor(false);
        onPostCreated();
      } else {
        throw new Error('Erreur lors de la création du post');
      }
    } catch (error) {
      toast.error('Erreur lors de la création du post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Qu'est-ce que vous voulez partager ?"
            className="w-full p-4 bg-black/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none"
            rows={3}
            required
          />
        </div>

        {showCodeEditor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center space-x-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 bg-black/20 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-400"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Votre code ici..."
              className="w-full p-4 bg-black/20 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none font-mono text-sm"
              rows={8}
            />
          </motion.div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              type="button"
              onClick={() => setShowCodeEditor(!showCodeEditor)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                showCodeEditor 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                  : 'bg-black/20 text-gray-400 border border-purple-500/20 hover:bg-purple-500/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="w-4 h-4" />
              <span>Code</span>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isAnonymous 
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                  : 'bg-black/20 text-gray-400 border border-purple-500/20 hover:bg-orange-500/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAnonymous ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isAnonymous ? 'Anonyme' : 'Public'}</span>
            </motion.button>
          </div>

          <motion.button
            type="submit"
            disabled={loading || !content.trim()}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Publication...' : 'Publier'}</span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};