import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface Ami {
  id: number;
  nom: string;
}

interface Message {
  sender: string;
  content: string;
}

const amis: Ami[] = [
  { id: 1, nom: 'Alex' },
  { id: 2, nom: 'Sophie' },
  { id: 3, nom: 'Rayan' },
  { id: 4, nom: 'Emma' },
];

const messagesSimules: { [key: number]: Message[] } = {
  1: [
    { sender: 'Alex', content: 'Salut !' },
    { sender: 'Moi', content: 'Yo !' },
  ],
  2: [
    { sender: 'Sophie', content: 'Tu bosses sur quoi ?' },
    { sender: 'Moi', content: 'Un projet React !' },
  ],
  3: [{ sender: 'Rayan', content: 'T’as vu le nouveau défi ?' }],
  4: [],
};

export const Chat: React.FC = () => {
  const [amiActif, setAmiActif] = useState<Ami | null>(null);
  const [nouveauMessage, setNouveauMessage] = useState('');

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        {/* Titre */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <MessageCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-6">Chat</h1>
        </motion.div>

        {/* Liste d'amis */}
        {!amiActif && (
          <div className="grid grid-cols-2 gap-4 mt-8">
            {amis.map(ami => (
              <div
                key={ami.id}
                onClick={() => setAmiActif(ami)}
                className="cursor-pointer bg-black/40 border border-purple-500/20 p-4 rounded-lg hover:bg-purple-500/10 transition"
              >
                <h2 className="text-white font-semibold">{ami.nom}</h2>
                <p className="text-white/60 text-sm">Cliquer pour discuter</p>
              </div>
            ))}
          </div>
        )}

        {/* Zone de conversation */}
        {amiActif && (
          <div className="bg-black/30 border border-purple-500/30 rounded-lg p-4 mt-6">
            <button
              onClick={() => setAmiActif(null)}
              className="text-purple-400 text-sm mb-4 hover:underline"
            >
              ← Retour à la liste
            </button>

            <h2 className="text-white font-semibold text-xl mb-4">
              Conversation avec {amiActif.nom}
            </h2>

            <div className="space-y-2 mb-4 max-h-64 overflow-y-auto pr-2">
              {(messagesSimules[amiActif.id] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm px-3 py-2 rounded-lg w-fit ${
                    msg.sender === 'Moi'
                      ? 'ml-auto bg-purple-500/30 text-white'
                      : 'bg-purple-800/30 text-white'
                  }`}
                >
                  <strong>{msg.sender}</strong>: {msg.content}
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Écris un message..."
                className="flex-1 px-4 py-2 bg-black/30 text-white border border-purple-500/20 rounded"
                value={nouveauMessage}
                onChange={(e) => setNouveauMessage(e.target.value)}
              />
              <button
                className="bg-purple-500/40 hover:bg-purple-500/60 text-white px-4 py-2 rounded"
                onClick={() => {
                  // Simulation d'envoi de message (non persistant)
                  if (nouveauMessage.trim()) {
                    messagesSimules[amiActif.id]?.push({
                      sender: 'Moi',
                      content: nouveauMessage.trim(),
                    });
                    setNouveauMessage('');
                  }
                }}
              >
                Envoyer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
