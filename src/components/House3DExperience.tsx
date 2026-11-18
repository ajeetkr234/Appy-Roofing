import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { RealisticHouseModel } from './Hero3DScene';
import { RotateCw, ZoomIn, Eye, Sparkles, Layers, ShieldCheck, Zap, RefreshCw, Check } from 'lucide-react';

const MATERIAL_OPTIONS = [
  {
    id: 'metal',
    name: 'Standing Seam Metal',
    type: 'metal',
    badge: '50-70+ Year Lifespan',
    tagline: 'Modern Architectural & Storm-Proof',
    colors: [
      { name: 'Matte Charcoal', hex: '#1E293B' },
      { name: 'Burnished Copper', hex: '#B45309' },
      { name: 'Pacific Slate Blue', hex: '#334E68' },
      { name: 'Forest Evergreen', hex: '#1C3D2B' },
    ],
    windRating: '140+ MPH',
    energyStar: 'Up to 30% Cooling Savings',
    fireRating: 'Class A Non-Combustible'
  },
  {
    id: 'asphalt',
    name: 'Architectural Asphalt',
    type: 'asphalt',
    badge: 'Class 4 Impact Rated',
    tagline: 'Classic American Dimensional Shingle',
    colors: [
      { name: 'Weathered Wood', hex: '#4A3E36' },
      { name: 'Pewter Gray', hex: '#475569' },
      { name: 'Colonial Brown', hex: '#583626' },
      { name: 'Onyx Black', hex: '#0F172A' },
    ],
    windRating: '130 MPH High-Wind',
    energyStar: 'Cool Roof Granules',
    fireRating: 'Class A Fire Resistant'
  },
  {
    id: 'tile',
    name: 'Spanish Clay Tile',
    type: 'tile',
    badge: 'Historic 75-100 Year',
    tagline: 'Mediterranean & Southwestern Luxury',
    colors: [
      { name: 'Terracotta Classic', hex: '#C25E34' },
      { name: 'Antique Sandstone', hex: '#A3684B' },
      { name: 'Desert Rust', hex: '#873B1B' },
    ],
    windRating: '125 MPH Locked Barrel',
    energyStar: 'High Thermal Mass Barrier',
    fireRating: 'Class A Non-Combustible'
  },
  {
    id: 'slate',
    name: 'Natural Stone Slate',
    type: 'slate',
    badge: '100+ Year Century Roof',
    tagline: 'The Ultimate Legacy Investment',
    colors: [
      { name: 'Vermont Charcoal Slate', hex: '#262E3B' },
      { name: 'Welsh Heather Purple', hex: '#3B3246' },
      { name: 'Unfading Green', hex: '#2F4840' },
    ],
    windRating: '150 MPH Heavy Stone',
    energyStar: 'Natural Stone Insulation',
    fireRating: 'Class A Natural Stone'
  }
];

export const House3DExperience: React.FC<{
  onSelectEstimate?: (materialName: string) => void;
}> = ({ onSelectEstimate }) => {
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_OPTIONS[0]);
  const [selectedColor, setSelectedColor] = useState(MATERIAL_OPTIONS[0].colors[0]);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [controlsKey, setControlsKey] = useState(0);

  const handleMaterialChange = (mat: typeof MATERIAL_OPTIONS[0]) => {
    setSelectedMaterial(mat);
    setSelectedColor(mat.colors[0]);
  };

  const handleResetView = () => {
    setControlsKey(prev => prev + 1);
  };

  return (
    <section id="interactive-3d" className="py-8 sm:py-10 bg-[#091321] text-white relative overflow-hidden border-t border-slate-800">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive 3D Visualizer
          </div>
          <h2 className="type-h2 text-white">
            Explore Your New Roof in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">Real-Time 3D</span>
          </h2>
          <p className="mt-2.5 type-body-lead text-slate-300">
            Rotate 360°, inspect architectural shingle profiles, test standing seam metal vs clay tile, and visualize your home’s transformation under cinematic sunlight.
          </p>
        </div>

        {/* Main 3D Stage Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center 3D Viewport (8 Cols) */}
          <div className="lg:col-span-8 bg-gradient-to-b from-[#101D30] to-[#0A1424] rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden relative group">
            {/* 3D Canvas Box */}
            <div className="h-[460px] sm:h-[580px] w-full relative">
              <Canvas
                key={controlsKey}
                shadows
                camera={{ position: [5.2, 3.0, 5.2], fov: 42 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              >
                <color attach="background" args={['#0A1424']} />
                <fog attach="fog" args={['#0A1424', 9, 20]} />

                <ambientLight intensity={0.7} />
                <directionalLight
                  position={[8, 12, 7]}
                  intensity={1.9}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                  color="#FFF7ED"
                />
                <directionalLight position={[-7, 5, -5]} intensity={0.6} color="#38BDF8" />
                <pointLight position={[0, 4, 3]} intensity={0.9} color="#F59E0B" />

                <RealisticHouseModel
                  materialType={selectedMaterial.type}
                  roofColor={selectedColor.hex}
                  wireframe={wireframeMode}
                  explodedOffset={0}
                />

                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  minPolarAngle={Math.PI / 4.8}
                  maxPolarAngle={Math.PI / 2.05}
                  minDistance={3.8}
                  maxDistance={8.0}
                />
              </Canvas>

              {/* Viewport Floating Controls */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-auto">
                <button
                  onClick={handleResetView}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition"
                  title="Reset Camera Angle"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset View
                </button>
                <button
                  onClick={() => setWireframeMode(!wireframeMode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg backdrop-blur-md border text-xs transition ${
                    wireframeMode
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-semibold'
                      : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white hover:bg-slate-800'
                  }`}
                  title="Toggle Roof Structure Wireframe"
                >
                  <Layers className="w-3.5 h-3.5" />
                  {wireframeMode ? 'Structure Mode: ON' : 'Structure Wireframe'}
                </button>
              </div>

              {/* Interactive Help Pill */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto flex items-center justify-between sm:justify-start gap-3 px-3 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-xs text-slate-300 pointer-events-none">
                <div className="flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Click & drag to rotate 360°</span>
                </div>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <div className="flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-sky-400" />
                  <span>Pinch / Scroll to zoom</span>
                </div>
              </div>

              {/* Active Material Watermark */}
              <div className="absolute top-4 right-4 bg-slate-900/85 backdrop-blur-md border border-amber-500/30 px-3 py-1.5 rounded-lg text-right pointer-events-none">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">Selected Material</span>
                <span className="text-xs font-semibold text-white">{selectedMaterial.name} ({selectedColor.name})</span>
              </div>
            </div>

            {/* Live Material Performance Bar Below Canvas */}
            <div className="p-4 sm:p-5 bg-[#0D1828] border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wide">Wind Resistance</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">{selectedMaterial.windRating}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wide">Energy Efficiency</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">{selectedMaterial.energyStar}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wide">Fire Rating</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">{selectedMaterial.fireRating}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Customizer Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Step 1: Select Material Type */}
            <div className="bg-[#101D30] rounded-2xl p-5 border border-slate-700/70 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400">Step 1 • Choose Material</span>
                <span className="text-xs text-slate-400">4 Premium Grades</span>
              </div>
              <div className="space-y-2.5">
                {MATERIAL_OPTIONS.map((mat) => {
                  const isSelected = selectedMaterial.id === mat.id;
                  return (
                    <button
                      key={mat.id}
                      onClick={() => handleMaterialChange(mat)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 shadow-md shadow-amber-500/10'
                          : 'bg-[#16253D] border-slate-700/60 hover:bg-[#1E3250] hover:border-slate-600'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${isSelected ? 'text-amber-400' : 'text-white'}`}>
                            {mat.name}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{mat.tagline}</div>
                      </div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {mat.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Architectural Color */}
            <div className="bg-[#101D30] rounded-2xl p-5 border border-slate-700/70 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400">Step 2 • Architectural Color</span>
                <span className="text-xs text-white font-medium">{selectedColor.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {selectedMaterial.colors.map((c) => {
                  const isColorActive = selectedColor.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition text-left ${
                        isColorActive
                          ? 'bg-amber-500/20 border-amber-400 ring-1 ring-amber-400'
                          : 'bg-[#16253D] border-slate-700/60 hover:bg-[#1E3250]'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-white/30 shadow-inner flex-shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-xs font-medium text-slate-200 truncate">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action CTA Box */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30">
              <p className="text-xs text-slate-300 mb-3">
                Love this <strong className="text-amber-400">{selectedMaterial.name} ({selectedColor.name})</strong> combination? Request physical shingle samples or an itemized roof quote.
              </p>
              <a
                href="#estimate-booking"
                onClick={() => onSelectEstimate && onSelectEstimate(selectedMaterial.name)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wide uppercase transition shadow-lg shadow-amber-500/20"
              >
                Get Estimate for this Roof
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
