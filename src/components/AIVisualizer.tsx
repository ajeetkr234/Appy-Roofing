import React, { useState } from 'react';
import { Sparkles, Upload, Sliders, CheckCircle2, ArrowRight, RefreshCw, AlertCircle, Eye } from 'lucide-react';

const PRESET_HOMES = [
  {
    id: 'home-1',
    name: 'Modern Suburban Residence',
    originalImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    type: '2-Story Suburban'
  },
  {
    id: 'home-2',
    name: 'Modern Farmhouse',
    originalImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    type: 'Modern Farmhouse'
  },
  {
    id: 'home-3',
    name: 'Southwestern Villa',
    originalImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    type: 'Mediterranean Villa'
  }
];

const MATERIAL_CHOICES = [
  'Standing Seam Metal Roofing',
  'Architectural Asphalt Shingles',
  'Spanish Clay Tile',
  'Natural Slate'
];

const COLOR_CHOICES: Record<string, string[]> = {
  'Standing Seam Metal Roofing': ['Charcoal', 'Matte Black', 'Pacific Blue', 'Burnished Copper'],
  'Architectural Asphalt Shingles': ['Weathered Wood', 'Charcoal', 'Slate Grey', 'Colonial Red'],
  'Spanish Clay Tile': ['Terra Cotta', 'Antiqued Mission'],
  'Natural Slate': ['Charcoal', 'Vermont Green']
};

export const AIVisualizer: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  const [selectedHome, setSelectedHome] = useState(PRESET_HOMES[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_CHOICES[0]);
  const [selectedColor, setSelectedColor] = useState('Charcoal');
  const [userUploadedImage, setUserUploadedImage] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
  );
  const [specs, setSpecs] = useState<any>({
    curbAppealIndex: '98/100',
    windResistance: 'Up to 140 MPH',
    energyStarRated: true
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('Please choose an image under 8MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setUserUploadedImage(reader.result as string);
        setSelectedHome({
          id: 'custom-upload',
          name: 'Your Uploaded Property',
          originalImage: reader.result as string,
          type: 'Uploaded Residence'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/visualize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          material: selectedMaterial,
          color: selectedColor,
          homeStyle: selectedHome.type,
          userImage: userUploadedImage
        })
      });
      const data = await res.json();
      if (data && data.previewUrl) {
        setGeneratedPreview(data.previewUrl);
        setSpecs(data.specs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentOriginalImage = userUploadedImage || selectedHome.originalImage;

  return (
    <section id="ai-visualizer" className="py-8 sm:py-10 bg-[#091321] text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Architectural Visualizer Studio
          </div>
          <h2 className="type-h2 text-white">
            Imagine a New Roof{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Before You Install It
            </span>
          </h2>
          <p className="mt-2.5 type-body-lead text-slate-300">
            Upload a photo of your home or test preset architectural designs. Select premium standing seam metal, designer shingles, or clay tile to visualize instant photorealistic curb appeal.
          </p>
        </div>

        {/* Visualizer Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Step 1: House Photo Source */}
            <div className="bg-[#101D30] rounded-2xl p-5 border border-slate-700/80 shadow-lg">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-3">
                Step 1 • Select or Upload Property
              </span>

              {/* Upload Button */}
              <label className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-dashed border-slate-600 hover:border-amber-400 cursor-pointer text-xs font-semibold text-slate-200 transition mb-3">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Upload House Photograph</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {/* Presets */}
              <div className="grid grid-cols-3 gap-2">
                {PRESET_HOMES.map((home) => {
                  const isActive = selectedHome.id === home.id && !userUploadedImage;
                  return (
                    <button
                      key={home.id}
                      onClick={() => {
                        setUserUploadedImage(null);
                        setSelectedHome(home);
                      }}
                      className={`relative rounded-xl overflow-hidden border p-1 text-left transition ${
                        isActive
                          ? 'border-amber-400 ring-1 ring-amber-400 bg-amber-500/10'
                          : 'border-slate-700/70 hover:border-slate-500 bg-[#16253D]'
                      }`}
                    >
                      <img src={home.originalImage} alt={home.name} className="w-full h-14 object-cover rounded-lg" />
                      <div className="text-[10px] text-slate-300 font-medium truncate mt-1">{home.name.split(' ')[0]}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Material */}
            <div className="bg-[#101D30] rounded-2xl p-5 border border-slate-700/80 shadow-lg">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-3">
                Step 2 • Select Roofing Material
              </span>
              <div className="space-y-2">
                {MATERIAL_CHOICES.map((mat) => {
                  const isSelected = selectedMaterial === mat;
                  return (
                    <button
                      key={mat}
                      onClick={() => {
                        setSelectedMaterial(mat);
                        setSelectedColor(COLOR_CHOICES[mat][0]);
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                          : 'bg-[#16253D] border-slate-700/60 text-slate-300 hover:bg-[#1E3250]'
                      }`}
                    >
                      <span>{mat}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Choose Color */}
            <div className="bg-[#101D30] rounded-2xl p-5 border border-slate-700/80 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                  Step 3 • Architectural Color
                </span>
                <span className="text-xs text-white font-medium">{selectedColor}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(COLOR_CHOICES[selectedMaterial] || []).map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition text-center truncate ${
                      selectedColor === col
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                        : 'bg-[#16253D] border-slate-700/70 text-slate-200 hover:bg-[#1E3250]'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Trigger Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Rendering Neural Concept...' : 'Generate New Roof Preview'}</span>
            </button>
          </div>

          {/* Right Visualizer Stage (8 Cols) */}
          <div className="lg:col-span-8 bg-[#101D30] rounded-3xl p-6 border border-slate-700/80 shadow-2xl">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-2">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                  Visual Concept Result
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                  {selectedMaterial} in {selectedColor}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md font-semibold">
                  Curb Appeal: {specs.curbAppealIndex || '98/100'}
                </span>
                <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2.5 py-1 rounded-md font-semibold">
                  {specs.windResistance || 'Up to 140 MPH'}
                </span>
              </div>
            </div>

            {/* Interactive Split Comparison Viewport */}
            <div className="relative h-[380px] sm:h-[480px] w-full rounded-2xl overflow-hidden border border-slate-800 select-none cursor-ew-resize">
              {/* Redesigned AI Concept (Background) */}
              <img
                src={generatedPreview || currentOriginalImage}
                alt="AI Redesigned Roof Concept"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-emerald-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Concept: {selectedMaterial.split(' ')[0]} ({selectedColor})
              </span>

              {/* Original House Image (Clipped Foreground) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={currentOriginalImage}
                  alt="Original Roof Condition"
                  className="absolute inset-y-0 left-0 max-w-none h-full object-cover"
                  style={{ width: '100%', minWidth: '700px' }}
                />
                <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider">
                  Current Property
                </span>
              </div>

              {/* Slider Divider */}
              <div
                className="absolute inset-y-0 z-20 flex flex-col items-center justify-center pointer-events-none"
                style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
              >
                <div className="w-1 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                <div className="absolute w-10 h-10 rounded-full bg-amber-500 text-slate-950 border-2 border-white shadow-2xl flex items-center justify-center pointer-events-auto">
                  <Sliders className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Slider Range Input */}
            <div className="mt-4 flex items-center justify-between gap-4 text-xs text-slate-400">
              <span>Original Home</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span>New Concept</span>
            </div>

            {/* Specification Disclaimer Box */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Visualizer Disclaimer: All rendered previews are architectural conceptual simulations and do not guarantee structural compatibility, roof slope allowances, or local HOA guidelines. Professional on-site verification is required before installation.
              </span>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-300 font-medium">
                Love this design? Our estimator can measure your exact roof pitch.
              </span>
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
              >
                <span>Request Free On-Site Inspection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
