import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface User {
  id: number;
  email: string;
  name: string;
}

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 2) {
        fetch(`http://localhost:3001/api/users?search=${encodeURIComponent(query)}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
          .then(res => res.json())
          .then(data => setResults(data))
          .catch(() => setResults([]));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="relative w-full max-w-md mx-auto text-white">
      <div className="flex items-center bg-black/30 border border-purple-500/30 rounded-lg px-4 py-2">
        <Search className="w-5 h-5 text-purple-400 mr-2" />
        <input
          type="text"
          placeholder="Chercher des Holbies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
        />
      </div>
      {results.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-slate-800 border border-purple-500/20 rounded-lg mt-1 shadow-lg z-10">
          {results.map(user => (
            <div
              key={user.id}
              className="p-3 hover:bg-purple-500/10 border-b border-purple-500/10 transition-colors text-sm"
            >
              <strong>{user.name}</strong> — <span className="text-gray-400">{user.email}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
