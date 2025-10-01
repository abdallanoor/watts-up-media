"use client";

import { useEffect, useRef } from "react";

interface Shape {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  type: "house" | "window" | "camera" | "frame";
  opacity: number;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create shapes
    const shapes: Shape[] = [];
    const shapeCount = 15;

    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 60 + 30,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        type: ["house", "window", "camera", "frame"][
          Math.floor(Math.random() * 4)
        ] as Shape["type"],
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    // Draw shapes
    const drawShape = (shape: Shape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.strokeStyle =
        shape.type === "house" || shape.type === "camera"
          ? `rgba(122, 139, 138, ${shape.opacity})` // Sage green
          : `rgba(201, 184, 150, ${shape.opacity})`; // Tan/beige
      ctx.lineWidth = 2;

      switch (shape.type) {
        case "house":
          // Simple house outline
          ctx.beginPath();
          ctx.moveTo(-shape.size / 2, 0);
          ctx.lineTo(0, -shape.size / 2);
          ctx.lineTo(shape.size / 2, 0);
          ctx.lineTo(shape.size / 2, shape.size / 3);
          ctx.lineTo(-shape.size / 2, shape.size / 3);
          ctx.closePath();
          ctx.stroke();
          break;

        case "window":
          // Window grid
          ctx.strokeRect(
            -shape.size / 3,
            -shape.size / 3,
            shape.size * 0.66,
            shape.size * 0.66
          );
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 3);
          ctx.lineTo(0, shape.size / 3);
          ctx.moveTo(-shape.size / 3, 0);
          ctx.lineTo(shape.size / 3, 0);
          ctx.stroke();
          break;

        case "camera":
          // Simple camera outline
          ctx.strokeRect(
            -shape.size / 3,
            -shape.size / 4,
            shape.size * 0.66,
            shape.size / 2
          );
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 6, 0, Math.PI * 2);
          ctx.stroke();
          break;

        case "frame":
          // Picture frame
          ctx.strokeRect(
            -shape.size / 2.5,
            -shape.size / 3,
            shape.size * 0.8,
            shape.size * 0.66
          );
          break;
      }

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        // Update position
        shape.x += shape.speedX;
        shape.y += shape.speedY;
        shape.rotation += shape.rotationSpeed;

        // Wrap around edges
        if (shape.x < -100) shape.x = canvas.width + 100;
        if (shape.x > canvas.width + 100) shape.x = -100;
        if (shape.y < -100) shape.y = canvas.height + 100;
        if (shape.y > canvas.height + 100) shape.y = -100;

        drawShape(shape);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
