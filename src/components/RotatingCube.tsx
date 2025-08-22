'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Mesh } from 'three';

const SpinningCube: React.FC = () => {
  const meshRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  );
};

const RotatingCube: React.FC = () => (
  <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
    <Canvas camera={{ position: [3, 3, 4] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <SpinningCube />
      <OrbitControls enableZoom={false} />
    </Canvas>
  </div>
);

export default RotatingCube;

