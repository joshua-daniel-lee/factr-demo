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

    // Detailed 3D Pufferfish ASCII art frames
    const frames = [
      // Frame 1 - Normal
      `
                                    .':cccccc:'.
                               .:cldkOOOOOOOOOkdlc:.
                           .:lxkOOOOOOOOOOOOOOOOOOkxl:.
                        .cxkOOOOOOOOOOOOOOOOOOOOOOOOOkxc.
                     .cxOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOxc.
                   .lkOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkl.
                 .lkOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkl.
                :kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk:
               :kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk:
              cOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOc
             :OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO:
            .kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk.
            lOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOl
           .OOOOOOOO0000000OOOOOOOOOOOOOOOOOOOOOOkxddddxkOOOOOOO.
           lOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOxc'      'cxOOOOOl
           kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc'          'ckOOOk
          .OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc'              'ckOO.
          .OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc'     .@@.         'ckO.
          .OOOOOOOOOOOOOOOOOOOOOOOOOOOOOx:       .@@.           :k.
          .OOOOOOOOOOOOOOOOOOOOOOOOOOOOx:         ''            :k.
          .OOOOOOOOOOOOOOOOOOOOOOOOOOOOx:.                     :kO.
          .OOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc'.                .'ckOO.
          'kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc'            'ckOOOOk'
           lOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc'        'ckOOOOOOl
           .OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc'    'ckOOOOOOO.
            lOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc''ckOOOOOOOOl
            .kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk.
             :OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO:
             'xOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOx'
              .dOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOd.
               .oOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo.
                 :xOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOx:
                  .lkOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkl.
                    .cxOOOOOOOOOOOOOOOOOOOOOOOOOOOxc.
                      .:dkOOOOOOOOOOOOOOOOOOOOkd:.
                         .:ldkOOOOOOOOOOOOkdl:.
                             .':cldxxxdlc:'.
      `,
      // Frame 2 - Puffing up
      `
                                 .':ccccccccc:'.
                            .:cloxkOOOOOOOOOOkxolc:.
                        .':ldkOOOOOOOOOOOOOOOOOOOkdl:'.
                     .:oxkOOOOOOOOOOOOOOOOOOOOOOOOOOkxo:.
                   .lkOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkl.
                 .lkOOOOOO#####OOOOOOOOOOOOOOOOOOOOOOOOOkl.
               .:kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk:.
              .lOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOl.
             'xOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOx'
            .dOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOd.
           .xOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOx.
          'kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk'
         .kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk.
        .dOOOOOOOO000000000OOOOOOOOOOOOOOOOOOOOOOxddddddxkOOOOOOOd.
        :OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO0d:.      .:dOOOOOO:
       .xOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOx:.          .:xOOOOx.
       'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO0l.    .####.   .l0OOO'
       .OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO0l.    .####.    .l0OO.
       .OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOx:.     ....    .:xOOO.
       .OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOd:.        .:dOOOOOO.
       .xOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOxc'..''cxOOOOOOOOx.
       'kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk'
        dOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOd
        .kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk.
         'xOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOx'
          .dOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOd.
           .oOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOo.
             :xOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOx:
              .lkOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkl.
                'oxOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOxo'
                  .:dkOOOOOOOOOOOOOOOOOOOOOOOOOOkd:.
                     .:ldkOOOOOOOOOOOOOOOOOkdl:.
                         .':clodxxxxxxdolc:'.
      `,
      // Frame 3 - Fully puffed
      `
                              ..':cccccccccc:'..
                         .':ldxkOOOOOOOOOOOOkxdl:'.
                     .':oxkOOOOOOOOOOOOOOOOOOOOOkxo:'.
                  .:dkOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkd:.
                'lkOOOOOOOO########OOOOOOOOOOOOOOOOOOOOkl'
              .ckOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc.
            .ckOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc.
           :kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk:
         .dOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOd.
        .xOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOx.
       .dOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOd.
      .xOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOx.
     .dOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOd.
     lOOOOOOOOOOO00000000000OOOOOOOOOOOOOOOOOOOOOOOkxddddddxkOOOOOOOl
    'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO0xc'.      .'cxOOOOOO'
    cOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkl.    ######.  .lkOOOc
   .OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO0l.    ######.   .l0OOO.
   .OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO0l.     ......    .l0OOO.
   .OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc.              .ckOOOO.
   'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOxc'.      .':xOOOOOOO'
    cOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkdl::ldkOOOOOOOOOc
    'kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk'
     lOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOl
     .dOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOd.
      .xOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOx.
       .dOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOd.
        .xOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOx.
         .dOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOd.
           :kOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOk:
            .ckOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc.
              .ckOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkc.
                'lkOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOkl'
                  .:dkOOOOOOOOOOOOOOOOOOOOOOOOOOkd:.
                     .':oxkOOOOOOOOOOOOOOOOkxo:'.
                         .':ldxkOOOOOOkxdl:'.
                              ..'::::'.
      `
    ];

    let frameIndex = 0;
    let time = 0;
    const fontSize = 10;
    const lineHeight = 11;

    // Enhanced color palette for depth
    const colors = [
      '#1a365d', // darkest blue
      '#2A4365', // bunting
      '#2c5282', // darker primary
      '#3182CE', // primary
      '#4299e1', // lighter blue
      '#63B3ED', // blue-chill
      '#90cdf4', // lightest blue
    ];

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

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
