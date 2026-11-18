import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { EXPLODED_ROOF_LAYERS } from '../data/roofingData';
import { RoofLayer } from '../types';
import { Layers, Play, Pause, Info, CheckCircle2, Sliders, Shield, Award } from 'lucide-react';

interface ExplodedModelProps {
  explosionProgress: number; // 0 to 1
  selectedLayerId: string;
  onSelectLayer: (layer: RoofLayer) => void;
}

const ExplodedRoofScene: React.FC<ExplodedModelProps> = ({
  explosionProgress,
  selectedLayerId,
  onSelectLayer
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle idle rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  // Height separation offsets for 7 layers
  // Layer 1: Decking (Base)
  // Layer 2: Underlayment (+0.3 * progress)
  // Layer 3: Ice & Water (+0.6 * progress)
  // Layer 4: Flashing (+0.9 * progress)
  // Layer 5: Shingles (+1.25 * progress)
  // Layer 6: Ridge Caps (+1.65 * progress)
  // Layer 7: Ridge Vent (+2.05 * progress)

  const isLayerSelected = (id: string) => selectedLayerId === id;

  return (
    <group ref={groupRef} position={[0, -0.7, 0]}>
      {/* House Rafter Skeleton Base Support */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[4.8, 0.4, 3.8]} />
        <meshStandardMaterial color="#334155" roughness={0.9} />
      </mesh>

      {/* Rafter Beams */}
      {[-1.8, -0.9, 0, 0.9, 1.8].map((x, idx) => (
        <mesh key={idx} position={[x, 0.35, 0]}>
          <boxGeometry args={[0.08, 0.35, 3.8]} />
          <meshStandardMaterial color="#64748B" roughness={0.7} />
        </mesh>
      ))}

      {/* LAYER 1: ROOF DECKING (Sheathing) */}
      <group
        position={[0, 0.6 + explosionProgress * 0.05, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectLayer(EXPLODED_ROOF_LAYERS[0]); }}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.6, 0.1, 3.6]} />
          <meshStandardMaterial
            color={isLayerSelected('layer-decking') ? '#F59E0B' : '#B45309'}
            roughness={0.9}
            metalness={0.05}
          />
        </mesh>
      </group>

      {/* LAYER 2: SYNTHETIC FELT UNDERLAYMENT */}
      <group
        position={[0, 0.72 + explosionProgress * 0.35, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectLayer(EXPLODED_ROOF_LAYERS[1]); }}
      >
        <mesh castShadow>
          <boxGeometry args={[4.65, 0.04, 3.65]} />
          <meshStandardMaterial
            color={isLayerSelected('layer-underlayment') ? '#F59E0B' : '#2563EB'}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* LAYER 3: ICE & WATER SHIELD (Eaves & Valleys) */}
      <group
        position={[0, 0.8 + explosionProgress * 0.7, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectLayer(EXPLODED_ROOF_LAYERS[2]); }}
      >
        {/* Front eave strip */}
        <mesh position={[0, 0, 1.3]} castShadow>
          <boxGeometry args={[4.7, 0.03, 1.0]} />
          <meshStandardMaterial
            color={isLayerSelected('layer-ice-water') ? '#F59E0B' : '#059669'}
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>
        {/* Valley diagonal barrier */}
        <mesh position={[0, 0.01, -0.4]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[2.5, 0.03, 0.8]} />
          <meshStandardMaterial
            color={isLayerSelected('layer-ice-water') ? '#F59E0B' : '#059669'}
            roughness={0.5}
          />
        </mesh>
      </group>

      {/* LAYER 4: DRIP EDGE & METAL FLASHING */}
      <group
        position={[0, 0.9 + explosionProgress * 1.1, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectLayer(EXPLODED_ROOF_LAYERS[3]); }}
      >
        {/* Perimeter Drip Edge */}
        <mesh position={[0, 0, 1.83]}>
          <boxGeometry args={[4.76, 0.06, 0.08]} />
          <meshStandardMaterial
            color={isLayerSelected('layer-flashing') ? '#F59E0B' : '#CBD5E1'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[-2.36, 0, 0]}>
          <boxGeometry args={[0.08, 0.06, 3.7]} />
          <meshStandardMaterial
            color={isLayerSelected('layer-flashing') ? '#F59E0B' : '#CBD5E1'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[2.36, 0, 0]}>
          <boxGeometry args={[0.08, 0.06, 3.7]} />
          <meshStandardMaterial
            color={isLayerSelected('layer-flashing') ? '#F59E0B' : '#CBD5E1'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* LAYER 5: ROOFING SHINGLES / METAL PANELS */}
      <group
        position={[0, 1.05 + explosionProgress * 1.5, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectLayer(EXPLODED_ROOF_LAYERS[4]); }}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.78, 0.12, 3.72]} />
          <meshStandardMaterial
            color={isLayerSelected('layer-shingles') ? '#F59E0B' : '#1E293B'}
            roughness={0.8}
            metalness={0.15}
          />
        </mesh>
        {/* Simulated Shingle Courses (Ridges) */}
        {[-1.2, -0.6, 0, 0.6, 1.2].map((z, idx) => (
          <mesh key={idx} position={[0, 0.07, z]}>
            <boxGeometry args={[4.76, 0.02, 0.06]} />
            <meshStandardMaterial color="#0F172A" roughness={0.9} />
          </mesh>
        ))}
      </group>

      {/* LAYER 6: HIGH-PROFILE RIDGE CAPS */}
      <group
        position={[0, 1.22 + explosionProgress * 1.95, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectLayer(EXPLODED_ROOF_LAYERS[5]); }}
      >
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[4.8, 0.14, 0.28]} />
          <meshStandardMaterial
            color={isLayerSelected('layer-ridge-caps') ? '#F59E0B' : '#D97706'}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
      </group>

      {/* LAYER 7: RIDGE VENTILATION COMPONENT */}
      <group
        position={[0, 1.38 + explosionProgress * 2.4, 0]}
        onClick={(e) => { e.stopPropagation(); onSelectLayer(EXPLODED_ROOF_LAYERS[6]); }}
      >
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[4.75, 0.1, 0.32]} />
          <meshStandardMaterial
            color={isLayerSelected('layer-ventilation') ? '#F59E0B' : '#64748B'}
            roughness={0.4}
            metalness={0.5}
          />
        </mesh>
      </group>
    </group>
  );
};

export const ExplodedRoof3D: React.FC = () => {
  const [explosionProgress, setExplosionProgress] = useState(0.65); // 0 = assembled, 1 = exploded
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<RoofLayer>(EXPLODED_ROOF_LAYERS[4]); // Shingles by default
  const animationRef = useRef<number | null>(null);

  const toggleAnimate = () => {
    if (isPlaying) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      let direction = 1;
      const animate = () => {
        setExplosionProgress((prev) => {
          let next = prev + 0.008 * direction;
          if (next >= 1.0) {
            next = 1.0;
            direction = -1;
          } else if (next <= 0.0) {
            next = 0.0;
            direction = 1;
          }
          return next;
        });
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const handleSelectLayer = (layer: RoofLayer) => {
    setSelectedLayer(layer);
  };

  return (
    <section id="exploded-roof" className="py-8 sm:py-10 bg-[#060D17] text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
            <Layers className="w-3.5 h-3.5" />
            Engineered Roof Anatomy
          </div>
          <h2 className="type-h2 text-white">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Exploded 3D</span> Roof Architecture
          </h2>
          <p className="mt-2.5 type-body-lead text-slate-300">
            A premium roof is far more than surface shingles. Inspect all 7 protective engineered layers that defend your home from torrential rains, wind-driven moisture, and extreme heat.
          </p>
        </div>

        {/* 3D Model & Layer Selection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas Viewport (7 Cols) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#101D30] to-[#091321] rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden relative">
            <div className="h-[460px] sm:h-[540px] w-full relative">
              <Canvas
                shadows
                camera={{ position: [5.8, 4.2, 5.8], fov: 42 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              >
                <color attach="background" args={['#091321']} />
                <fog attach="fog" args={['#091321', 10, 22]} />

                <ambientLight intensity={0.75} />
                <directionalLight position={[7, 10, 7]} intensity={1.8} castShadow color="#FFF7ED" />
                <directionalLight position={[-6, 4, -6]} intensity={0.5} color="#38BDF8" />
                <pointLight position={[0, 4, 0]} intensity={0.8} color="#F59E0B" />

                <ExplodedRoofScene
                  explosionProgress={explosionProgress}
                  selectedLayerId={selectedLayer.id}
                  onSelectLayer={handleSelectLayer}
                />

                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  minPolarAngle={Math.PI / 4.5}
                  maxPolarAngle={Math.PI / 2.1}
                  minDistance={4.0}
                  maxDistance={8.5}
                />
              </Canvas>

              {/* Top Controls Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-auto">
                <button
                  onClick={toggleAnimate}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition shadow-md"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  {isPlaying ? 'Pause Cycle' : 'Cinematic Assembly'}
                </button>

                <div className="flex items-center gap-2 bg-slate-900/85 backdrop-blur-md border border-slate-700 px-3 py-1.5 rounded-xl text-xs text-slate-300">
                  <span className="text-amber-400 font-bold">{Math.round(explosionProgress * 100)}%</span>
                  <span>Exploded</span>
                </div>
              </div>

              {/* Bottom Interactive Slider */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-3 rounded-xl z-10">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    Layer Separation Slider
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setExplosionProgress(0); if (isPlaying) toggleAnimate(); }}
                      className="text-[11px] text-slate-400 hover:text-white underline"
                    >
                      Fully Assemble
                    </button>
                    <button
                      onClick={() => { setExplosionProgress(1); if (isPlaying) toggleAnimate(); }}
                      className="text-[11px] text-amber-400 hover:text-amber-300 underline"
                    >
                      Fully Explode
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explosionProgress}
                  onChange={(e) => {
                    if (isPlaying) toggleAnimate();
                    setExplosionProgress(parseFloat(e.target.value));
                  }}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            {/* Quick Layer Pill Scroller */}
            <div className="p-3 bg-[#0D1726] border-t border-slate-800 flex overflow-x-auto gap-2 no-scrollbar">
              {EXPLODED_ROOF_LAYERS.map((layer) => {
                const isActive = selectedLayer.id === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => handleSelectLayer(layer)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-slate-950' : 'bg-amber-400'}`} />
                    {layer.number}. {layer.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Selected Layer Detail Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#101D30] rounded-2xl p-6 border border-slate-700/80 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                  #{selectedLayer.number}
                </span>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">{selectedLayer.name}</h3>
                  <p className="text-xs text-amber-400 font-medium">{selectedLayer.subtitle}</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700 font-mono">
                {selectedLayer.specs}
              </span>
            </div>

            {/* Purpose */}
            <div className="mt-5">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1.5">Primary Purpose</h4>
              <p className="text-sm text-slate-200 leading-relaxed bg-[#16253D] p-3.5 rounded-xl border border-slate-700/60">
                {selectedLayer.purpose}
              </p>
            </div>

            {/* Key Benefits */}
            <div className="mt-5">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-2">Engineered Benefits</h4>
              <div className="space-y-2">
                {selectedLayer.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Installation Considerations */}
            <div className="mt-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5 mb-1">
                <Info className="w-3.5 h-3.5" />
                Installation Considerations
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedLayer.installationConsiderations}
              </p>
            </div>

            {/* CTA in Detail Card */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Guaranteed Appy 7-Layer Integrity
              </div>
              <a
                href="#estimate-booking"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition shadow"
              >
                Request Layer Inspection
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
