import { useEffect, useRef } from 'react';

export default function TechGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reduce load on high DPI screens
    const dpr = window.devicePixelRatio || 1;
    // Cap pixel ratio to 2 to prevent massive load on 4K screens
    const effectiveDpr = Math.min(dpr, 2); 

    const resize = () => {
      canvas.width = window.innerWidth * effectiveDpr;
      canvas.height = window.innerHeight * effectiveDpr;
      ctx.scale(effectiveDpr, effectiveDpr);
    };
    resize();

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    // REDUCED Particle Count for Laptop Performance
    // Old value: 50. New: Based on screen width but capped.
    const particleCount = Math.min(30, Math.floor(window.innerWidth / 30)); 
    const gridSize = 60; // Slightly larger grid = fewer lines to draw

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3, // Slower movement = smoother look
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
      });
    }

    function drawGrid() {
      if (!ctx || !canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.strokeStyle = 'rgba(59, 130, 246, 0.4)'; // Lower opacity
      ctx.lineWidth = 0.5; // Thinner lines
      // Removed excessive shadows for performance

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    function drawParticles() {
      if (!ctx) return;
      
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.fill();

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce
        if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
      });
    }

    function connectParticles() {
      if (!ctx) return;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Reduced connection distance to reduce draw calls
          if (distance < 120) {
            ctx.beginPath();
            const opacity = 0.3 - distance / 400;
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationFrameId: number;
    
    function animate() {
      if (!ctx || !canvas) return;

      // Use window dimensions instead of canvas props for clearing
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      drawGrid();
      drawParticles();
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
        resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-slate-950"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
