"use client";
import React from "react";

type Props = {
  size?: number;
  speed?: number; // secondes par rotation complète
  className?: string;
};

export default function PlanetMono({ 
  size = 72, 
  speed = 20, 
  className = "" 
}: Props) {
  return (
    <div
      className={`relative pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="animate-spin-slow will-change-transform"
        style={{ animationDuration: `${speed}s` }}
      >
        <defs>
          <radialGradient id="planetGrad" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#d1d5db" />
            <stop offset="85%" stopColor="#6b7280" />
            <stop offset="100%" stopColor="#1f2937" />
          </radialGradient>
          <filter id="planetShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Planète principale */}
        <circle 
          cx="50" 
          cy="50" 
          r="38" 
          fill="url(#planetGrad)" 
          filter="url(#planetShadow)"
        />
        
        {/* Cratères subtils */}
        <circle cx="38" cy="35" r="4" fill="#4b5563" opacity="0.3" />
        <circle cx="60" cy="45" r="3" fill="#4b5563" opacity="0.25" />
        <circle cx="45" cy="60" r="2.5" fill="#4b5563" opacity="0.2" />
        
        {/* Anneaux orbitaux */}
        <g opacity="0.3">
          <ellipse 
            cx="50" 
            cy="50" 
            rx="46" 
            ry="14" 
            fill="none" 
            stroke="#9ca3af" 
            strokeWidth="0.8"
          />
          <ellipse 
            cx="50" 
            cy="50" 
            rx="46" 
            ry="14" 
            fill="none" 
            stroke="#d1d5db" 
            strokeWidth="0.4"
            strokeDasharray="3 2"
          />
        </g>
      </svg>
      
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </div>
  );
}
