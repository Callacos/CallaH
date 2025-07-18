import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, Code, User, Eye, EyeOff } from 'lucide-react';
import { Comments } from './Comments';

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

interface PostCardProps {
  post: Post;
  onPostUpdated: () => void;
  compact?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onPostUpdated, compact = false }) => {
  const formatDate = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { 
      addSuffix: true,
      locale: fr 
    });
  };

  return (
    <motion.div
      className={`bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 ${
        compact ? 'p-4' : 'p-6'
      }`}
      whileHover={{ y: -2 }}
      layout
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            {post.is_anonymous ? (
              <EyeOff className="w-5 h-5 text-white" />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h3 className="text-white font-semibold">{post.author_name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.created_at)}</span>
            </div>
          </div>
        </div>
        
        {post.code && (
          <div className="flex items-center space-x-2 px-3 py-1 bg-purple-500/20 rounded-full">
            <Code className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400">{post.language}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-300 leading-relaxed">{post.content}</p>
      </div>

      {/* Media */}
      {post.media_path && (
        <div className="mb-4">
          {post.media_type === 'image' ? (
            <img 
              src={`http://localhost:3001${post.media_path}`}
              alt="Post media"
              className="w-full rounded-lg max-h-96 object-cover"
            />
          ) : (
            <video 
              src={`http://localhost:3001${post.media_path}`}
              controls
              className="w-full rounded-lg max-h-96"
            />
          )}
        </div>
      )}

      {/* Code Preview */}
      {post.code && !compact && (
        <div className="mb-4">
          <div className="bg-black/60 rounded-lg p-4 border border-purple-500/20">
            <pre className="text-sm text-gray-300 overflow-x-auto">
              <code>{post.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Updated indicator */}
      {post.updated_at !== post.created_at && (
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Eye className="w-3 h-3" />
          <span>Modifié {formatDate(post.updated_at)}</span>
        </div>
      )}

      {/* Comments section - only show in non-compact mode */}
      {!compact && <Comments postId={post.id} />}
    </motion.div>
  );
};