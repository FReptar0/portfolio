"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface TypewriterEffectProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  cursor?: boolean;
}

export function TypewriterEffect({ 
  text, 
  delay = 0, 
  speed = 50, 
  className = "",
  cursor = true 
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (cursor) {
        // Blink cursor after typing is complete
        const cursorBlink = setInterval(() => {
          setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(cursorBlink);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay, speed, cursor]);

  return (
    <span className={className}>
      {displayText}
      {cursor && currentIndex <= text.length && (
        <span 
          className={`inline-block w-0.5 h-1em bg-current ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
          style={{ animation: currentIndex >= text.length ? 'blink 1s infinite' : 'none' }}
        >
          |
        </span>
      )}
    </span>
  );
}

interface DecryptEffectProps {
  text: string;
  delay?: number;
  className?: string;
  trigger?: boolean;
}

export function DecryptEffect({ 
  text, 
  delay = 0, 
  className = "",
  trigger = true 
}: DecryptEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  useEffect(() => {
    if (!trigger) return;

    const timeout = setTimeout(() => {
      setIsDecrypting(true);
      let iteration = 0;
      
      const interval = setInterval(() => {
        setDisplayText(() => 
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsDecrypting(false);
          setDisplayText(text);
        }

        iteration += 1 / 3;
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, trigger, chars]);

  return (
    <span className={`${className} inline-block`} style={{ minWidth: `${text.length}ch` }}>
      <span className={isDecrypting ? 'font-mono' : ''}>
        {displayText || text}
      </span>
    </span>
  );
}

interface GlitchEffectProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export function GlitchEffect({ 
  text, 
  className = "",
  intensity = 'medium' 
}: GlitchEffectProps) {
  const intensitySettings = {
    low: { duration: 0.1, iterations: 2 },
    medium: { duration: 0.2, iterations: 3 },
    high: { duration: 0.3, iterations: 5 }
  };

  const settings = intensitySettings[intensity];

  return (
    <motion.span 
      className={`${className} relative inline-block`}
      whileHover={{
        x: [0, -2, 2, -1, 1, 0],
        textShadow: [
          "0 0 0 transparent",
          "2px 0 0 #ff0000, -2px 0 0 #00ffff",
          "-2px 0 0 #ff0000, 2px 0 0 #00ffff",
          "1px 0 0 #ff0000, -1px 0 0 #00ffff",
          "0 0 0 transparent"
        ]
      }}
      transition={{ 
        duration: settings.duration, 
        repeat: settings.iterations,
        repeatType: "reverse"
      }}
    >
      {text}
    </motion.span>
  );
}

interface ScrambleEffectProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function ScrambleEffect({ 
  text, 
  className = "",
  delay = 0,
  speed = 100 
}: ScrambleEffectProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const scramble = () => {
    setIsScrambling(true);
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(() => 
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }

      iteration += 1;
    }, speed);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      scramble();
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <motion.span 
      className={`${className} ${isScrambling ? 'font-mono' : ''} cursor-pointer`}
      onHoverStart={scramble}
    >
      {displayText}
    </motion.span>
  );
}

interface BackspaceTypeEffectProps {
  texts: string[];
  className?: string;
  typeSpeed?: number;
  backspaceSpeed?: number;
  pauseTime?: number;
}

export function BackspaceTypeEffect({
  texts,
  className = "",
  typeSpeed = 100,
  backspaceSpeed = 50,
  pauseTime = 2000
}: BackspaceTypeEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentDisplayText, setCurrentDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const currentText = texts[currentTextIndex];
    
    if (isTyping) {
      // Typing phase
      if (currentDisplayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setCurrentDisplayText(currentText.slice(0, currentDisplayText.length + 1));
        }, typeSpeed);
      } else {
        // Finished typing, pause then start backspacing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseTime);
      }
    } else {
      // Backspacing phase
      if (currentDisplayText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentDisplayText(currentDisplayText.slice(0, -1));
        }, backspaceSpeed);
      } else {
        // Finished backspacing, move to next text
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentDisplayText, currentTextIndex, isTyping, texts, typeSpeed, backspaceSpeed, pauseTime]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {currentDisplayText}
      <span 
        className={`inline-block w-0.5 h-1em bg-current ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
      >
        |
      </span>
    </span>
  );
}