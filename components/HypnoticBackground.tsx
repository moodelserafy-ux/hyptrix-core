'use client';

import React, { useEffect, useRef } from 'react';

export default function HypnoticBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Hypnotic geometric wave and orbital field
    let time = 0;
    const numOrbits = 5;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Blindingly clean #F8FAFC light base gradient with subtle radial illumination
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.25,
        80,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.9
      );
      bgGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      bgGrad.addColorStop(0.4, 'rgba(248, 250, 252, 1)');
      bgGrad.addColorStop(1, 'rgba(241, 245, 249, 1)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.35;

      // Draw subtle hypnotic concentric orbital rings with harmonic rotation
      for (let i = 1; i <= numOrbits; i++) {
        const radius = i * 95 + Math.sin(time + i) * 12;
        const alpha = Math.max(0.06, 0.22 - i * 0.03);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(time * (0.15 / i) * (i % 2 === 0 ? 1 : -1));

        // Primary Ring (Sky Blue #38BDF8)
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 14]);
        ctx.stroke();

        // Node satellites (Luxury Lavender #A78BFA and Sky Blue #38BDF8)
        const nodeAngle = time * 0.6 + (i * Math.PI) / 2.5;
        const nodeX = Math.cos(nodeAngle) * radius;
        const nodeY = Math.sin(nodeAngle) * radius;

        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(167, 139, 250, 0.75)' : 'rgba(56, 189, 248, 0.85)';
        ctx.fill();

        ctx.restore();
      }

      // Elegant, subtle ambient energy curves
      ctx.save();
      ctx.beginPath();
      for (let x = 0; x < width; x += 15) {
        const y =
          centerY +
          Math.sin(x * 0.003 + time * 1.2) * 45 +
          Math.cos(x * 0.006 - time * 0.8) * 35;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* High-performance canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Subtle fine architectural hairline crosshairs / grid on light canvas */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(to right, #0B1220 1px, transparent 1px), linear-gradient(to bottom, #0B1220 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Gentle vignette scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8FAFC]/40 to-[#F8FAFC]" />
    </div>
  );
}
