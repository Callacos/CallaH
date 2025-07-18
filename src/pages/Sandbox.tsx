import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { CodeEditor } from '../components/CodeEditor';
import { PostCard } from '../components/PostCard';
import { Code, Filter } from 'lucide-react';
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

export const Sandbox: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
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
        // Filtrer seulement les posts avec du code
        const codePosts = data.filter((post: Post) => post.code);
        setPosts(codePosts);
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

  const handlePostUpdated = () => {
    fetchPosts();
    if (selectedPost) {
      // Mettre à jour le post sélectionné
      const updatedPost = posts.find(p => p.id === selectedPost.id);
      if (updatedPost) {
        setSelectedPost(updatedPost);
      }
    }
  };

  return (
    <div className="flex h-full">
      {/* Liste des posts avec code */}
      <div className="w-1/3 border-r border-purple-500/20 bg-black/20 overflow-y-auto">
        <div className="p-4 border-b border-purple-500/20">
          <div className="flex items-center space-x-2 mb-4">
            <Code className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Posts avec code</h2>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Filter className="w-4 h-4" />
            <span>Cliquez sur un post pour l'éditer</span>
          </div>
        </div>
        
        {loading ? (
          <div className="p-4 text-center text-gray-400">
            Chargement...
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedPost?.id === post.id ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => setSelectedPost(post)}
                whileHover={{ scale: 1.02 }}
              >
                <PostCard post={post} onPostUpdated={handlePostUpdated} compact />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Éditeur de code */}
      <div className="flex-1 flex flex-col">
        {selectedPost ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="p-4 border-b border-purple-500/20 bg-black/20">
              <h3 className="text-lg font-semibold text-white mb-2">
                Édition du code - {selectedPost.author_name}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2">
                {selectedPost.content}
              </p>
            </div>
            <div className="flex-1">
              <CodeEditor
                postId={selectedPost.id}
                initialCode={selectedPost.code || ''}
                language={selectedPost.language}
                onSave={handlePostUpdated}
              />
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Code className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Sandbox collaboratif
              </h3>
              <p className="text-gray-400">
                Sélectionnez un post avec du code pour commencer à l'éditer
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};