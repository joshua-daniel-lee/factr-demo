'use client';

import { useEffect, useRef } from 'react';

export default function ASCIIPufferfish() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Pufferfish ASCII art frames
    const frames = [
      // Frame 1 - Normal
      `
                    ___
              ___---   ---___
          _--                --_
        _-         ><>           -_
      _-        ><(((°>            -_
     /-           ><>               -\\
    |  ><>    pufferfish    ><>      |
    |                                 |
     \\-         swimming           -/
      -_           here           _-
        -_                      _-
          --__              __--
              ---_______---
      `,
      // Frame 2 - Slightly puffed
      `
                    ___
              ___---   ---___
          _--                --_
        _-         ><>           -_
      _-        ><(((°>            -_
     /-           ><>               -\\
    |  ><> ><  pufferfish  >< ><>    |
    |   ><                    ><     |
     \\-    ><   swimming   ><     -/
      -_      ><  here  ><        _-
        -_                      _-
          --__              __--
              ---_______---
      `,
      // Frame 3 - More puffed
      `
                    ___
              ___---   ---___
          _--                --_
        _-      >< ><>  ><        -_
      _-     ><  ><(((°> ><         -_
     /-        ><  ><>  ><           -\\
    | ><><  ><  pufferfish  >< ><><   |
    |  ><  ><                ><  ><   |
     \\- ><   ><  swimming  ><   >< -/
      -_   ><   ><  here ><   ><   _-
        -_      ><      ><        _-
          --__              __--
              ---_______---
      `
    ];

    let frameIndex = 0;
    let time = 0;
    const fontSize = 12;
    const lineHeight = 14;

    // Colors from your brand
    const colors = ['#2A4365', '#3182CE', '#63B3ED']; // bunting, primary, blue-chill

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Dark background
      ctx.fillStyle = '#1a202c';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Set font
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = 'top';

      // Get current frame
      const currentFrame = frames[frameIndex];
      const lines = currentFrame.split('\n');

      // Calculate centering
      const textWidth = Math.max(...lines.map(line => line.length)) * (fontSize * 0.6);
      const textHeight = lines.length * lineHeight;
      const startX = (rect.width - textWidth) / 2;
      const startY = (rect.height - textHeight) / 2;

      // Add floating animation
      const floatOffset = Math.sin(time / 30) * 5;

      // Draw ASCII art with gradient effect
      lines.forEach((line, i) => {
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          if (char !== ' ') {
            // Create gradient effect based on position
            const colorIndex = Math.floor((i + j + time / 10) % colors.length);
            ctx.fillStyle = colors[colorIndex];
            
            // Add subtle wave effect
            const waveOffset = Math.sin((time + i * 5 + j * 2) / 20) * 2;
            
            ctx.fillText(
              char,
              startX + j * (fontSize * 0.6) + waveOffset,
              startY + i * lineHeight + floatOffset
            );
          }
        }
      });

      time++;

      // Change frame every 30 frames
      if (time % 30 === 0) {
        frameIndex = (frameIndex + 1) % frames.length;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ width: '100%', height: '400px' }}
    />
  );
}
