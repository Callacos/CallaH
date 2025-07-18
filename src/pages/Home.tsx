import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { PostCard } from '../components/PostCard';
import { CreatePost } from '../components/CreatePost';
import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

interface Post {
  id: number;
  content: string;
  code?: string;
  language: string;
  is_anonymous: boolean;
  media_path?: string;
  media_type?: string;
  author_name: string;
  created_at: string;
  updated_at: string;
}

export const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/posts', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const handlePostCreated = () => {
    fetchPosts();
  };

  const handlePostUpdated = () => {
    fetchPosts();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Fil d'actualité
          </h1>
          <motion.button
            onClick={fetchPosts}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-400 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Actualiser</span>
          </motion.button>
        </div>

        <CreatePost onPostCreated={handlePostCreated} />
      </motion.div>

      {loading ? (
        <div className="text-center py-8">
          <div className="text-gray-400">Chargement des posts...</div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PostCard post={post} onPostUpdated={handlePostUpdated} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};