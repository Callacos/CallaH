import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MessageCircle, Send, Edit2, Trash2, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  username: string;
  created_at: string;
  updated_at: string;
}

interface CommentsProps {
  postId: number;
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (showComments) {
      fetchComments();
    }
  }, [postId, showComments]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${postId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || submitting) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment.trim() }),
      });

      if (response.ok) {
        const newCommentData = await response.json();
        setComments(prev => [...prev, newCommentData]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditComment = async (commentId: number) => {
    if (!editingContent.trim() || !user) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editingContent.trim() }),
      });

      if (response.ok) {
        const updatedComment = await response.json();
        setComments(prev => 
          prev.map(comment => 
            comment.id === commentId ? updatedComment : comment
          )
        );
        setEditingCommentId(null);
        setEditingContent('');
      }
    } catch (error) {
      console.error('Erreur lors de la modification du commentaire:', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!user || !confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setComments(prev => prev.filter(comment => comment.id !== commentId));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { 
      addSuffix: true,
      locale: fr 
    });
  };

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  return (
    <div className="border-t border-purple-500/20 pt-4 mt-4">
      {/* Comments Toggle */}
      <button
        onClick={() => setShowComments(!showComments)}
        className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors mb-4"
      >
        <MessageCircle className="w-5 h-5" />
        <span>
          {comments.length > 0 
            ? `${comments.length} commentaire${comments.length > 1 ? 's' : ''}`
            : 'Ajouter un commentaire'
          }
        </span>
      </button>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Comment Form */}
            {user && (
              <form onSubmit={handleSubmitComment} className="mb-6">
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Écrivez votre commentaire..."
                      className="w-full bg-black/40 border border-purple-500/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={!newComment.trim() || submitting}
                        className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        <span>{submitting ? 'Envoi...' : 'Publier'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {/* Comments List */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-gray-400 py-4">
                  Chargement des commentaires...
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center text-gray-400 py-4">
                  Aucun commentaire pour le moment.
                </div>
              ) : (
                comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex space-x-3"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 bg-black/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{comment.username}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">
                            {formatDate(comment.created_at)}
                            {comment.updated_at !== comment.created_at && ' (modifié)'}
                          </span>
                          {user && user.id === comment.user_id && (
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => startEditing(comment)}
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-gray-400 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {editingCommentId === comment.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="w-full bg-black/40 border border-purple-500/20 rounded-lg p-3 text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none resize-none"
                            rows={2}
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={cancelEditing}
                              className="px-3 py-1 text-gray-400 hover:text-white transition-colors"
                            >
                              Annuler
                            </button>
                            <button
                              onClick={() => handleEditComment(comment.id)}
                              className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors"
                            >
                              Sauvegarder
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-300 leading-relaxed">{comment.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
