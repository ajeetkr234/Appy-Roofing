import React, { useState } from 'react';
import { PROJECT_GALLERY } from '../data/roofingData';
import { ProjectItem } from '../types';
import { Image, X, MapPin, Calendar, Layers, Eye, Check } from 'lucide-react';

export const ProjectGallery: React.FC<{ hideHeader?: boolean }> = ({ hideHeader = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);

  const categories = [
    'All',
    'Roof Replacement',
    'Roof Repair',
    'Storm Restoration',
    'Metal Roofing',
    'Commercial Roofing',
    'New Installation'
  ];

  const filtered = activeCategory === 'All'
    ? PROJECT_GALLERY
    : PROJECT_GALLERY.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className={`${hideHeader ? 'pt-4 pb-10 sm:pt-6 sm:pb-12' : 'py-8 sm:py-12 border-t border-slate-800'} bg-[#091321] text-white relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideHeader ? (
          /* Section Header */
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
              <Image className="w-3.5 h-3.5" />
              Recent Project Gallery
            </div>
            <h2 className="type-h2 text-white">
              Proven Craftsmanship Across the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                United States
              </span>
            </h2>
            <p className="mt-3 type-body-lead text-slate-300">
              Browse our completed installations. Click any project to inspect high-resolution photographs, material specifications, and before-and-after notes.
            </p>

            {/* Filter Chips */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-[#16253D] text-slate-300 hover:bg-[#1E3250] border border-slate-700/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Subpage Filter Chips Toolbar */
          <div className="mb-6 pb-4 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 mr-1">Filter:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                    activeCategory === cat
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-[#16253D] text-slate-300 hover:bg-[#1E3250] border border-slate-700/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="text-xs text-slate-400">
              Showing <span className="font-semibold text-amber-400">{filtered.length}</span> Verified Installations
            </div>
          </div>
        )}

        {/* Gallery Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setLightboxProject(proj)}
              className="bg-[#101D30] rounded-3xl overflow-hidden border border-slate-700/70 hover:border-amber-500/50 shadow-xl cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101D30] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md text-amber-400 text-[11px] font-bold uppercase tracking-wider border border-slate-700">
                    {proj.category}
                  </span>
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-4 h-4" />
                      View Project Specs
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold font-heading text-white group-hover:text-amber-400 transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{proj.location}</span>
                  </div>
                  <div className="text-xs text-amber-400/90 font-medium mt-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{proj.material}</span>
                  </div>
                  <p className="mt-3 text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {proj.details}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="text-[11px] text-slate-400 font-medium block">
                  Completed & inspected installation
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in overflow-y-auto">
            <div className="bg-[#101D30] border border-slate-700 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8">
              <button
                onClick={() => setLightboxProject(null)}
                className="absolute top-4 right-4 z-20 p-2 text-slate-300 hover:text-white rounded-full bg-slate-950/70 backdrop-blur-md hover:bg-slate-900 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-72 sm:h-96 w-full">
                <img
                  src={lightboxProject.image}
                  alt={lightboxProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101D30] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="px-3 py-1 rounded bg-amber-500 text-slate-950 font-bold text-xs uppercase mb-2 inline-block">
                    {lightboxProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                    {lightboxProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Location: {lightboxProject.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>Material: {lightboxProject.material}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Completed: {lightboxProject.year}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed">
                  {lightboxProject.details}
                </p>

                <div className="p-4 rounded-xl bg-[#16253D] border border-slate-700/80 text-xs text-slate-300">
                  <strong className="text-white block mb-1">Appy Quality Benchmark:</strong>
                  This project passed all 21 post-installation manufacturer inspection checkpoints, including attic rafter moisture scans and complete magnetic yard sweeps.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
