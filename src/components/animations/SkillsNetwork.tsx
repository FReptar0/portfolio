"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { skillCategories } from '@/data/skills';

interface SkillNode {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

export function SkillsNetwork({ className = "", size = 400 }: { className?: string; size?: number }) {
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Create multiple concentric circles with better spacing
  useEffect(() => {
    const allSkills = skillCategories.flatMap(category => 
      category.skills.map(skill => ({
        id: skill.name.toLowerCase().replace(/\s+/g, '-'),
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency
      }))
    );

    const centerX = size / 2;
    const centerY = size / 2;
    
    // Define multiple circles with different radii
    const circles = [
      { radius: size * 0.18, maxSkills: 6 },
      { radius: size * 0.28, maxSkills: 8 },
      { radius: size * 0.38, maxSkills: 10 },
      { radius: size * 0.46, maxSkills: 12 }
    ];
    
    const circleNodes: SkillNode[] = [];
    let skillIndex = 0;
    
    circles.forEach((circle, circleIndex) => {
      const skillsInThisCircle = Math.min(circle.maxSkills, allSkills.length - skillIndex);
      
      for (let i = 0; i < skillsInThisCircle && skillIndex < allSkills.length; i++) {
        const skill = allSkills[skillIndex];
        const angle = (i / skillsInThisCircle) * 2 * Math.PI + (circleIndex * 0.3); // Offset each circle slightly
        
        circleNodes.push({
          ...skill,
          x: centerX + Math.cos(angle) * circle.radius,
          y: centerY + Math.sin(angle) * circle.radius,
          angle,
          distance: circle.radius
        });
        
        skillIndex++;
      }
    });

    setNodes(circleNodes);
  }, [size]);

  // Handle mouse movement for wave effect
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      frontend: '#3B82F6', // Blue
      backend: '#10B981', // Green
      devops: '#F59E0B', // Orange
      architecture: '#8B5CF6' // Purple
    };
    return colors[category as keyof typeof colors] || '#6B7280';
  };

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`} 
      style={{ width: size, height: size }}
      onMouseMove={handleMouseMove}
    >
      {/* Central pulse effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 5 }}
      >
        <motion.div
          className="w-4 h-4 bg-primary/20 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Skill nodes with wave interaction */}
      {nodes.map((node, index) => {
        return (
          <motion.div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              left: node.x, 
              top: node.y,
              zIndex: 10
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: [0, -3, 0]
            }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.05,
              y: {
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3
              }
            }}
            whileHover={{ 
              scale: 1.3,
              zIndex: 50,
              transition: { duration: 0.2 }
            }}
          >
            {/* Wave effect based on mouse proximity */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                scale: {
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                },
                rotate: {
                  duration: 6 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 3
                }
              }}
              style={{
                x: springX,
                y: springY,
                scale: 1
              }}
              transformTemplate={({ x, y, scale }) => {
                // Calculate distance from mouse to this node
                const mouseDistance = Math.sqrt(
                  Math.pow(parseFloat(x as string) - node.x, 2) + 
                  Math.pow(parseFloat(y as string) - node.y, 2)
                );
                
                // Create wave effect within a certain radius
                const maxDistance = size * 0.15;
                const influence = Math.max(0, 1 - (mouseDistance / maxDistance));
                const waveScale = 1 + (influence * 0.3);
                const waveY = -influence * 8;
                
                return `translateX(-50%) translateY(-50%) translateY(${waveY}px) scale(${waveScale * parseFloat(scale as string)})`;
              }}
            >
              <Badge 
                variant="tech" 
                className="shadow-lg hover:shadow-xl transition-all duration-300 text-xs px-3 py-1 border-0"
                style={{ 
                  backgroundColor: getCategoryColor(node.category),
                  color: 'white'
                }}
              >
                {node.name}
              </Badge>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Multiple rotating rings */}
      {[0.6, 0.75, 0.9].map((scale, index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-primary/5 rounded-full"
          animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
          transition={{ 
            duration: 40 + index * 20, 
            repeat: Infinity, 
            ease: "linear"
          }}
          style={{ 
            width: size * scale, 
            height: size * scale,
            zIndex: 1
          }}
        />
      ))}
    </div>
  );
}