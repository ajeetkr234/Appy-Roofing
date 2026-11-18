import React, { useState } from 'react';
import { Upload, Scan, AlertTriangle, ShieldCheck, CheckCircle2, ArrowRight, Camera, HelpCircle } from 'lucide-react';

const SAMPLE_DAMAGE_PHOTOS = [
  {
    id: 'dmg-1',
    name: 'Wind Lift & Shingle Tear',
    url: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1000&q=80',
    type: 'High Wind Damage'
  },
  {
    id: 'dmg-2',
    name: 'Hail Strike Bruising & Granule Loss',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    type: 'Severe Hail Damage'
  },
  {
    id: 'dmg-3',
    name: 'Chimney Flashing & Valley Separation',
    url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80',
    type: 'Flashing Deterioration'
  }
];

export const AIDamageScanner: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  const [activePhoto, setActivePhoto] = useState(SAMPLE_DAMAGE_PHOTOS[0]);
  const [userUploaded, setUserUploaded] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserUploaded(reader.result as string);
        setActivePhoto({
          id: 'custom-dmg',
          name: 'Your Uploaded Roof Photo',
          url: reader.result as string,
          type: 'Uploaded Property'
        });
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/damage-assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: userUploaded || activePhoto.url,
          filename: activePhoto.name
        })
      });
      const data = await res.json();
      setScanResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const currentDisplayPhoto = userUploaded || activePhoto.url;

  return (
    <section id="ai-damage-scanner" className="py-10 sm:py-14 bg-[#060D17] text-white relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 type-badge mb-2.5">
            <Scan className="w-3.5 h-3.5" />
            Damage Detection Technology
          </div>
          <h2 className="type-h2 text-white">
            Preliminary Roof Damage{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">
              AI Analysis
            </span>
          </h2>
          <p className="mt-4 type-body-lead text-slate-300">
            Upload a close-up photograph of your roof or test sample storm images. Our computer vision model scans for granule depletion, missing shingle tabs, impact bruising, and compromised flashings.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Photo Selector & Controls (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-[#101D30] rounded-2xl p-5 border border-slate-700/80 shadow-lg">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-3">
                Step 1 • Provide Roof Photograph
              </span>

              {/* Upload Input */}
              <label className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[#16253D] hover:bg-[#1E3250] border border-dashed border-slate-600 hover:border-amber-400 cursor-pointer text-xs font-semibold text-slate-200 transition mb-4">
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Upload From Phone or Camera</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <span className="text-[11px] text-slate-400 block mb-2 font-medium">Or Test Sample Damage Photos:</span>
              <div className="space-y-2">
                {SAMPLE_DAMAGE_PHOTOS.map((photo) => {
                  const isCurrent = activePhoto.id === photo.id && !userUploaded;
                  return (
                    <button
                      key={photo.id}
                      onClick={() => {
                        setUserUploaded(null);
                        setActivePhoto(photo);
                        setScanResult(null);
                      }}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition ${
                        isCurrent
                          ? 'bg-amber-500/15 border-amber-400 text-amber-300'
                          : 'bg-[#16253D] border-slate-700/60 hover:bg-[#1E3250] text-slate-200'
                      }`}
                    >
                      <img src={photo.url} alt={photo.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold leading-tight">{photo.name}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{photo.type}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Run Diagnostic CTA */}
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Scan className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning Neural Network...' : 'Analyze Roof Damage Now'}</span>
            </button>
          </div>

          {/* Right Image Canvas with Bounding Boxes & Report (8 Cols) */}
          <div className="lg:col-span-8 bg-[#101D30] rounded-3xl p-6 border border-slate-700/80 shadow-2xl">
            {/* Image Canvas with Bounding Boxes */}
            <div className="relative h-[360px] sm:h-[460px] w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              <img
                src={currentDisplayPhoto}
                alt="Roof inspection target"
                className="w-full h-full object-cover"
              />

              {/* Scanning Laser Animation */}
              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#F59E0B] animate-bounce top-1/2" />
              )}

              {/* Overlaid AI Bounding Boxes */}
              {scanResult &&
                scanResult.detections.map((det: any, idx: number) => (
                  <div
                    key={det.id}
                    className="absolute border-2 border-rose-500 bg-rose-500/20 rounded-md transition-all hover:bg-rose-500/35 cursor-pointer group"
                    style={{
                      left: `${det.boundingBox.x}%`,
                      top: `${det.boundingBox.y}%`,
                      width: `${det.boundingBox.width}%`,
                      height: `${det.boundingBox.height}%`
                    }}
                  >
                    <span className="absolute -top-6 left-0 bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                      {det.defectType} ({Math.round(det.confidence * 100)}%)
                    </span>
                  </div>
                ))}

              {/* Watermark Banner */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 bg-slate-900/85 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/60">
                <span>Subject: {activePhoto.name}</span>
                <span className="text-amber-400 font-bold font-mono">
                  {scanResult ? `${scanResult.findingsCount} Defects Highlighted` : 'Ready for Diagnostic Scan'}
                </span>
              </div>
            </div>

            {/* Diagnostics Report (Shown after scan) */}
            {scanResult ? (
              <div className="mt-6 space-y-5 animate-in fade-in">
                {/* Score & Tier Banner */}
                <div className="p-4 rounded-2xl bg-[#16253D] border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">
                      Calculated Roof Health Index
                    </span>
                    <div className="text-2xl font-extrabold text-white mt-0.5 flex items-center gap-2">
                      <span className="text-rose-400">{scanResult.overallHealthScore}/100</span>
                      <span className="text-sm font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                        {scanResult.conditionGrade}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md"
                  >
                    Schedule Field Inspection
                  </button>
                </div>

                {/* Specific Detected Issues List */}
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">
                    Observed Visual Indicators
                  </h4>
                  {scanResult.detections.map((det: any) => (
                    <div
                      key={det.id}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/70 text-xs text-slate-300"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-white text-sm flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                          {det.defectType}
                        </strong>
                        <span className="text-amber-400 font-semibold font-mono">
                          Confidence: {Math.round(det.confidence * 100)}%
                        </span>
                      </div>
                      <p className="text-slate-300 mt-1 leading-relaxed">{det.explanation}</p>
                    </div>
                  ))}
                </div>

                {/* Actionable Recommendations */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-2">
                    Actionable Next Steps
                  </h4>
                  <div className="space-y-1.5">
                    {scanResult.recommendations.map((rec: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400">
                Click "Analyze Roof Damage Now" above to initiate neural defect segmentation.
              </div>
            )}

            {/* Mandatory Medical / Structural Disclaimer */}
            <div className="mt-6 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Important Disclosure: This AI analysis is an exploratory visual screening tool. It does not provide a definitive structural diagnosis, certify decking moisture levels, or replace an OSHA-compliant on-site physical inspection by a licensed roofing contractor.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
