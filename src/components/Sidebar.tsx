import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Code, User, Terminal } from 'lucide-react';

const menuItems = [
  { path: '/', icon: Home, label: 'Accueil' },
  { path: '/sandbox', icon: Code, label: 'Sandbox' },
  { path: '/profile', icon: User, label: 'Profil' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <motion.aside 
      className="w-64 bg-black/40 backdrop-blur-xl border-r border-purple-500/20 p-6"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center space-x-2 mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Terminal className="w-8 h-8 text-purple-400" />
        <h2 className="text-xl font-bold text-white">Menu</h2>
      </motion.div>
      
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <Link
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: menuItems.length * 0.1 + 0.3 }}
          className="pt-6 mt-6 border-t border-purple-500/20"
        >
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-base font-mono text-purple-400">&gt;_</span>
            </div>
            <h3 className="text-lg font-bold text-white">Conversation</h3>
          </div>
          
          {/* Section Groupe cliquable */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: menuItems.length * 0.1 + 0.4 }}
          >
            <Link
              to="/groupe"
              className={`flex items-center space-x-3 px-4 py-2 ml-8 rounded-lg transition-all duration-200 ${
                location.pathname === '/groupe'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
              }`}
            >
              <span className="text-sm">Groupe</span>
            </Link>
          </motion.div>
          
          {/* Section Chat cliquable */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: menuItems.length * 0.1 + 0.5 }}
          >
            <Link
              to="/chat"
              className={`flex items-center space-x-3 px-4 py-2 ml-8 rounded-lg transition-all duration-200 ${
                location.pathname === '/chat'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
              }`}
            >
              <span className="text-sm">Chat</span>
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Sous-menu Aide */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: menuItems.length * 0.1 + 0.3 }}
          className="pt-6 mt-6 border-t border-purple-500/20"
        >
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-base font-mono text-purple-400">&gt;_</span>
            </div>
            <h3 className="text-lg font-bold text-white">Aide</h3>
          </div>
          
          {/* Section Site web cliquable */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: menuItems.length * 0.1 + 0.4 }}
          >
            <Link
              to="/siteweb"
              className={`flex items-center space-x-3 px-4 py-2 ml-8 rounded-lg transition-all duration-200 ${
                location.pathname === '/siteweb'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
              }`}
            >
              <span className="text-sm">Site web</span>
            </Link>
          </motion.div>
          
          {/* Section Article cliquable */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: menuItems.length * 0.1 + 0.5 }}
          >
            <Link
              to="/article"
              className={`flex items-center space-x-3 px-4 py-2 ml-8 rounded-lg transition-all duration-200 ${
                location.pathname === '/article'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
              }`}
            >
              <span className="text-sm">Article</span>
            </Link>
          </motion.div>
          
          {/* Section Avantage cliquable */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: menuItems.length * 0.1 + 0.6 }}
          >
            <Link
              to="/avantage"
              className={`flex items-center space-x-3 px-4 py-2 ml-8 rounded-lg transition-all duration-200 ${
                location.pathname === '/avantage'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
              }`}
            >
              <span className="text-sm">Avantage</span>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: menuItems.length * 0.1 + 0.7 }}
          className="pt-6 mt-6 border-t border-purple-500/20"
        >
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-base font-mono text-purple-400">&gt;_</span>
            </div>
            <h3 className="text-lg font-bold text-white">Jeux</h3>
          </div>
          
          {/* Section Python cliquable */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: menuItems.length * 0.1 + 0.8 }}
          >
            <Link
              to="/python"
              className={`flex items-center space-x-3 px-4 py-2 ml-8 rounded-lg transition-all duration-200 ${
                location.pathname === '/python'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
              }`}
            >
              <span className="text-sm">Python</span>
            </Link>
          </motion.div>
          
          {/* Section CSS cliquable */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: menuItems.length * 0.1 + 0.9 }}
          >
            <Link
              to="/css"
              className={`flex items-center space-x-3 px-4 py-2 ml-8 rounded-lg transition-all duration-200 ${
                location.pathname === '/css'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
              }`}
            >
              <span className="text-sm">CSS</span>
            </Link>
          </motion.div>
          
          {/* Section HTML cliquable */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: menuItems.length * 0.1 + 1.0 }}
          >
            <Link
              to="/html"
              className={`flex items-center space-x-3 px-4 py-2 ml-8 rounded-lg transition-all duration-200 ${
                location.pathname === '/html'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
              }`}
            >
              <span className="text-sm">HTML</span>
            </Link>
          </motion.div>
          
          {/* Section C cliquable */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: menuItems.length * 0.1 + 1.1 }}
          >
            <Link
              to="/c"
              className={`flex items-center space-x-3 px-4 py-2 ml-8 rounded-lg transition-all duration-200 ${
                location.pathname === '/c'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
              }`}
            >
              <span className="text-sm">C</span>
            </Link>
          </motion.div>
        </motion.div>

        

        
        {/* Sous-menu Autre */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: menuItems.length * 0.1 + 0.7 }}
          className="pt-6 mt-6 border-t border-purple-500/20"
        >
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-base font-mono text-purple-400">&gt;_</span>
            </div>
            <h3 className="text-lg font-bold text-white">Autre</h3>
          </div>
          
          {/* Section Jolt cliquable */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: menuItems.length * 0.1 + 0.8 }}
          >
            <Link
              to="/jolt"
              className={`flex items-center space-x-3 px-4 py-2 ml-8 rounded-lg transition-all duration-200 ${
                location.pathname === '/jolt'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
              }`}
            >
              <span className="text-sm">Jolt</span>
            </Link>
          </motion.div>
          </motion.div>
  
          <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: menuItems.length * 0.1 + 1.1 }}
            >
              <Link
                to="/evenement"
                className={`flex items-center space-x-3 px-4 py-2 ml-8 rounded-lg transition-all duration-200 ${
                  location.pathname === '/c'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
                }`}
              >
                <span className="text-sm">Événements</span>
              </Link>
            </motion.div>
  
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: menuItems.length * 0.1 + 0.8 }}
            >
              <Link
                to="/sondage"
                className={`flex items-center space-x-3 px-4 py-2 ml-8 rounded-lg transition-all duration-200 ${
                  location.pathname === '/sondage'
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
                }`}
              >
                <span className="text-sm">Sondage</span>
              </Link>
            </motion.div>

          </nav>
      </motion.aside>
  );
};