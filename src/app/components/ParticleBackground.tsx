import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  rotation: number;
}

interface Shape {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'diamond' | 'square' | 'circle' | 'triangle';
  color: string;
  duration: number;
  delay: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shapes, setShapes] = useState<Shape[]>([]);
  
  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        color: getRandomColor(0.1),
        duration: Math.random() * 20 + 10,
        rotation: Math.random() * 360
      });
    }
    setParticles(newParticles);

    // Generate shapes
    const newShapes: Shape[] = [];
    const shapeTypes: ('diamond' | 'square' | 'circle' | 'triangle')[] = ['diamond', 'square', 'circle', 'triangle'];
    for (let i = 0; i < 15; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: getRandomColor(0.05),
        duration: Math.random() * 40 + 20,
        delay: Math.random() * 20
      });
    }
    setShapes(newShapes);
  }, []);

  const getRandomColor = (opacity: number) => {
    const colors = [
      `rgba(59, 130, 246, ${opacity})`, // blue
      `rgba(16, 185, 129, ${opacity})`, // green
      `rgba(239, 68, 68, ${opacity})`, // red
      `rgba(217, 119, 6, ${opacity})`, // amber
      `rgba(124, 58, 237, ${opacity})`, // purple
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case 'diamond':
        return (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
              transform: 'rotate(45deg)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [45, 45 + Math.random() * 180, 45]
            }}
            transition={{ 
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut"
            }}
          />
        );
      case 'square':
        return (
          <motion.div
            key={shape.id}
            className="absolute rounded-sm"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, Math.random() * 180, 0]
            }}
            transition={{ 
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut"
            }}
          />
        );
      case 'circle':
        return (
          <motion.div
            key={shape.id}
            className="absolute rounded-full"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              backgroundColor: shape.color,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0]
            }}
            transition={{ 
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut"
            }}
          />
        );
      case 'triangle':
        return (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              rotate: [0, Math.random() * 180, 0]
            }}
            transition={{ 
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut"
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1],
            rotate: [particle.rotation, particle.rotation + 180, particle.rotation + 360]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      {shapes.map(renderShape)}
    </div>
  );
} 