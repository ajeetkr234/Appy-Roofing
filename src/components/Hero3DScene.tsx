import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

interface HouseProps {
  materialType?: string;
  roofColor?: string;
  wireframe?: boolean;
  explodedOffset?: number;
}

export const RealisticHouseModel: React.FC<HouseProps> = ({
  materialType = 'metal',
  roofColor = '#2A3644',
  wireframe = false,
  explodedOffset = 0
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle floating/breathing animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
    }
  });

  // Calculate material roughness & metalness based on chosen material
  const isMetal = materialType.toLowerCase().includes('metal');
  const isTile = materialType.toLowerCase().includes('tile');
  const isSlate = materialType.toLowerCase().includes('slate');

  const roughness = isMetal ? 0.35 : isTile ? 0.75 : isSlate ? 0.85 : 0.65;
  const metalness = isMetal ? 0.65 : 0.05;

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Foundation & Lawn Base */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <boxGeometry args={[7.2, 0.3, 6.2]} />
        <meshStandardMaterial color="#1a2e26" roughness={0.9} />
      </mesh>

      {/* Concrete Perimeter Path / Porch */}
      <mesh position={[0, 0.02, 1.8]} receiveShadow>
        <boxGeometry args={[4.4, 0.08, 1.4]} />
        <meshStandardMaterial color="#8C9AA8" roughness={0.8} />
      </mesh>

      {/* Main House Body (Exterior Siding & Brick Base) */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 2.0, 3.4]} />
        <meshStandardMaterial color="#ECEFF1" roughness={0.5} />
      </mesh>

      {/* Lower Architectural Brick Wainscot */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.25, 0.7, 3.45]} />
        <meshStandardMaterial color="#78351F" roughness={0.9} />
      </mesh>

      {/* Front Entrance Portico Columns */}
      <mesh position={[-0.8, 1.0, 1.85]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 1.8, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </mesh>
      <mesh position={[0.8, 1.0, 1.85]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 1.8, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
      </mesh>

      {/* Front Solid Wood Door */}
      <mesh position={[0, 0.85, 1.71]}>
        <boxGeometry args={[0.8, 1.5, 0.04]} />
        <meshStandardMaterial color="#451A03" roughness={0.6} />
      </mesh>

      {/* Modern Windows with Reflective Glass */}
      {/* Ground Floor Windows */}
      <mesh position={[-1.2, 0.9, 1.71]}>
        <boxGeometry args={[0.7, 1.1, 0.04]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[1.2, 0.9, 1.71]}>
        <boxGeometry args={[0.7, 1.1, 0.04]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Second Floor Windows */}
      <mesh position={[-1.1, 1.65, 1.71]}>
        <boxGeometry args={[0.65, 0.85, 0.04]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[1.1, 1.65, 1.71]}>
        <boxGeometry args={[0.65, 0.85, 0.04]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Side Windows */}
      <mesh position={[-2.11, 1.2, 0]}>
        <boxGeometry args={[0.04, 0.9, 0.8]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[2.11, 1.2, 0]}>
        <boxGeometry args={[0.04, 0.9, 0.8]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* ---------------- ROOF ASSEMBLY (Animated with explodedOffset) ---------------- */}
      <group position={[0, 2.1 + explodedOffset * 1.5, 0]}>
        {/* Main Gable Roof Pitch - Left Slope */}
        <mesh
          position={[-1.15, 0.55 + explodedOffset * 0.4, 0]}
          rotation={[0, 0, Math.PI / 5.2]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[2.7, 0.12, 3.8]} />
          <meshStandardMaterial
            color={roofColor}
            roughness={roughness}
            metalness={metalness}
            wireframe={wireframe}
          />
        </mesh>

        {/* Main Gable Roof Pitch - Right Slope */}
        <mesh
          position={[1.15, 0.55 + explodedOffset * 0.4, 0]}
          rotation={[0, 0, -Math.PI / 5.2]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[2.7, 0.12, 3.8]} />
          <meshStandardMaterial
            color={roofColor}
            roughness={roughness}
            metalness={metalness}
            wireframe={wireframe}
          />
        </mesh>

        {/* Front Architectural Gabled Dormer Extension */}
        <group position={[0, 0.35 + explodedOffset * 0.6, 1.2]}>
          <mesh position={[-0.6, 0.25, 0.4]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <boxGeometry args={[1.1, 0.1, 1.4]} />
            <meshStandardMaterial color={roofColor} roughness={roughness} metalness={metalness} wireframe={wireframe} />
          </mesh>
          <mesh position={[0.6, 0.25, 0.4]} rotation={[0, 0, -Math.PI / 4]} castShadow>
            <boxGeometry args={[1.1, 0.1, 1.4]} />
            <meshStandardMaterial color={roofColor} roughness={roughness} metalness={metalness} wireframe={wireframe} />
          </mesh>
          {/* Dormer Window */}
          <mesh position={[0, 0.1, 0.95]}>
            <circleGeometry args={[0.22, 16]} />
            <meshStandardMaterial color="#0284C7" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        {/* Continuous High-Profile Ridge Cap */}
        <mesh position={[0, 1.25 + explodedOffset * 0.7, 0]} castShadow>
          <boxGeometry args={[0.18, 0.14, 3.84]} />
          <meshStandardMaterial color="#0F172A" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* Flashing & Chimney */}
        <group position={[1.2, 0.8 + explodedOffset * 0.2, -0.6]}>
          <mesh castShadow>
            <boxGeometry args={[0.55, 1.4, 0.55]} />
            <meshStandardMaterial color="#78351F" roughness={0.8} />
          </mesh>
          {/* Chimney Metal Cap & Spark Arrestor */}
          <mesh position={[0, 0.75, 0]}>
            <boxGeometry args={[0.65, 0.08, 0.65]} />
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Copper Step Flashing Juncture */}
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.62, 0.08, 0.62]} />
            <meshStandardMaterial color="#B45309" metalness={0.85} roughness={0.3} />
          </mesh>
        </group>

        {/* Seamless Gutters & Downspouts */}
        <mesh position={[-2.3, -0.05 + explodedOffset * 0.1, 0]}>
          <boxGeometry args={[0.1, 0.1, 3.82]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[2.3, -0.05 + explodedOffset * 0.1, 0]}>
          <boxGeometry args={[0.1, 0.1, 3.82]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Downspouts */}
        <mesh position={[-2.25, -0.9, 1.7]}>
          <cylinderGeometry args={[0.04, 0.04, 1.8, 12]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[2.25, -0.9, 1.7]}>
          <cylinderGeometry args={[0.04, 0.04, 1.8, 12]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
};

export const Hero3DCanvas: React.FC<{
  interactive?: boolean;
  materialType?: string;
  roofColor?: string;
}> = ({
  interactive = true,
  materialType = 'metal',
  roofColor = '#1e293b'
}) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [5.5, 3.2, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#091321']} />
        <fog attach="fog" args={['#091321', 9, 20]} />

        {/* Ambient & Golden Hour Cinematic Lighting */}
        <ambientLight intensity={0.65} />
        <directionalLight
          position={[8, 10, 6]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
          color="#FFF7ED"
        />
        {/* Cool Rim Lighting from Opposite Angle */}
        <directionalLight position={[-6, 4, -6]} intensity={0.6} color="#38BDF8" />
        <pointLight position={[0, 4, 2]} intensity={0.8} color="#F59E0B" />

        <RealisticHouseModel
          materialType={materialType}
          roofColor={roofColor}
          wireframe={false}
          explodedOffset={0}
        />

        <OrbitControls
          enableZoom={interactive}
          enablePan={false}
          autoRotate={!interactive}
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 4.5}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={4.2}
          maxDistance={8.5}
        />
      </Canvas>
    </div>
  );
};
