import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  className?: string;
}

export const MatrixRain: React.FC<MatrixRainProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Caractères utilisés (chiffres binaires, hex et quelques symboles de code)
    const chars = '0123456789ABCDEFabcdef{}[]()<>=+-*/&|^~%$#@!?.:;,';
    const charArray = chars.split('');

    // Configuration
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialiser les gouttes
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recalculer le nombre de colonnes après redimensionnement
      const newColumns = Math.floor(canvas.width / fontSize);
      while (drops.length < newColumns) {
        drops.push(Math.floor(Math.random() * canvas.height / fontSize));
      }
      while (drops.length > newColumns) {
        drops.pop();
      }
    };

    // Initialiser la taille du canvas
    resizeCanvas();

    const draw = () => {
      // Fond semi-transparent pour créer l'effet de traînée/pluie
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // Augmenté pour mieux effacer les anciens caractères
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Style du texte plus visible avec du violet
      ctx.fillStyle = 'rgba(147, 51, 234, 0.35)'; // Couleur purple-600 plus visible
      ctx.font = `${fontSize}px 'Fira Code', 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Caractère aléatoire
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Position
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient violet plus visible pour l'effet de brillance
        const gradient = ctx.createLinearGradient(x, y - fontSize * 3, x, y + fontSize);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); // Transparent
        gradient.addColorStop(0.3, 'rgba(5, 5, 5, 0)'); // Léger
        gradient.addColorStop(0.7, 'rgba(146, 51, 234, 0.14)'); // Plus visible
        gradient.addColorStop(1, 'rgba(146, 51, 234, 0.95)'); // Bien visible à la pointe
        
        ctx.fillStyle = gradient;
        ctx.fillText(char, x, y);

        // Réinitialiser la goutte si elle atteint le bas (plus fréquent)
        if (y > canvas.height && Math.random() > 0.95) { // Changé de 0.975 à 0.95
          drops[i] = 0;
        }
        
        // Faire tomber la goutte
        drops[i]++;
      }
    };

    // Animation plus lente et plus subtile
    const interval = setInterval(draw, 80); // Changé de 50ms à 80ms (12.5 FPS)

    // Gérer le redimensionnement
    window.addEventListener('resize', resizeCanvas);

    // Nettoyage
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 opacity-60 ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};
