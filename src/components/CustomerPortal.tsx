import React, { useState, useEffect } from 'react';
import { CustomerProject } from '../../server/db';
import { User, Search, FileText, CheckCircle2, Clock, Phone, Download, X, AlertCircle, Calendar } from 'lucide-react';

export const CustomerPortal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [projectIdInput, setProjectIdInput] = useState('APX-7821');
  const [project, setProject] = useState<CustomerProject | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchProject = async (id: string) => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(`/api/portal/project/${id}`);
      const data = await res.json();
      if (res.ok) {
        setProject(data);
      } else {
        setErrorMsg(data.error || 'Project not found.');
        setProject(null);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to connect to Customer Project Portal.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchProject('APX-7821');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const milestoneSteps = [
    'Inspection & Drone Scan',
    'Estimate Approved',
    'Materials Staging',
    'Installation In Progress',
    'Final Quality Inspection',
    'Completed & Warranted'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="bg-[#101D30] border border-slate-700 rounded-2xl max-w-4xl w-full p-5 sm:p-6 shadow-2xl relative my-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Portal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 type-badge text-amber-400 mb-1">
              <User className="w-3.5 h-3.5" />
              Homeowner Project Portal
            </div>
            <h2 className="type-h3 text-white">
              Customer Real-Time Project Dashboard
            </h2>
          </div>

          {/* Project Lookup Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); fetchProject(projectIdInput); }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={projectIdInput}
              onChange={(e) => setProjectIdInput(e.target.value)}
              placeholder="e.g. APX-7821"
              className="px-3.5 py-2 rounded-xl bg-[#16253D] border border-slate-700 text-white font-mono text-xs uppercase focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {errorMsg && (
          <div className="my-6 p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {project && (
          <div className="mt-6 space-y-6 animate-in fade-in">
            {/* Project Overview Card */}
            <div className="p-5 rounded-2xl bg-[#16253D] border border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Homeowner & Property</span>
                <div className="text-sm font-bold text-white mt-0.5">{project.customerName}</div>
                <div className="text-xs text-slate-300">{project.address}</div>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Material & Color</span>
                <div className="text-sm font-bold text-amber-400 mt-0.5">{project.material}</div>
                <div className="text-xs text-slate-300">{project.color}</div>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Project Foreman</span>
                <div className="text-sm font-bold text-white mt-0.5">{project.crewLeader}</div>
                <div className="text-xs text-amber-400 font-mono flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3" />
                  {project.crewLeaderPhone}
                </div>
              </div>
            </div>

            {/* 6-Stage Milestone Timeline */}
            <div className="p-5 rounded-2xl bg-[#091321] border border-slate-800">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-4">
                Installation Progression Timeline ({project.currentStep} of 6 Completed)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                {milestoneSteps.map((step, idx) => {
                  const stepNum = idx + 1;
                  const isDone = stepNum < project.currentStep;
                  const isCurrent = stepNum === project.currentStep;
                  return (
                    <div
                      key={step}
                      className={`p-3 rounded-xl border text-center transition ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                          : isCurrent
                          ? 'bg-amber-500/15 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-1">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                        ) : (
                          <span className="text-xs font-mono">{stepNum}</span>
                        )}
                      </div>
                      <div className="text-[11px] font-bold leading-tight">{step}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Project Photos & Documents Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Daily Photos */}
              <div className="p-5 rounded-2xl bg-[#16253D] border border-slate-700/80">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-3">
                  Daily Drone & Installation Photos
                </span>
                <div className="space-y-3">
                  {project.photos.map((ph, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                      <img src={ph.url} alt={ph.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{ph.title}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{ph.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Warranty & Contract Documents */}
              <div className="p-5 rounded-2xl bg-[#16253D] border border-slate-700/80">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-3">
                  Verified Project Documents & Warranties
                </span>
                <div className="space-y-2.5">
                  {project.documents.map((doc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <FileText className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <span className="text-slate-200 truncate">{doc.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 flex-shrink-0">
                        <Download className="w-3 h-3 text-amber-400" />
                        {doc.size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 rounded-xl bg-[#0A1424] border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div>
                Contract Value: <strong className="text-white">${project.contractAmount.toLocaleString()}</strong> •
                Paid to Date: <strong className="text-emerald-400">${project.paidAmount.toLocaleString()}</strong>
              </div>
              <span className="text-amber-400 font-semibold">
                Balance Remaining: ${(project.contractAmount - project.paidAmount).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
