import React, { useState, useEffect } from 'react';
import { Lead } from '../../server/db';
import { ShieldAlert, Users, Phone, Mail, Calendar, CheckCircle, Download, Search, X, Edit, Filter, TrendingUp, DollarSign } from 'lucide-react';

export const AdminDashboard: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Edit fields
  const [editStatus, setEditStatus] = useState<Lead['status']>('New');
  const [editAssigned, setEditAssigned] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
      fetchStats();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUpdateLead = async () => {
    if (!selectedLead) return;
    try {
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          assignedTo: editAssigned,
          internalNotes: editNotes
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsEditing(false);
        setSelectedLead(data.lead);
        fetchLeads();
        fetchStats();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID,FullName,Phone,Email,Service,Status,ZIP,Created'];
    const rows = leads.map(l =>
      `"${l.id}","${l.fullName}","${l.phone}","${l.email}","${l.serviceRequired}","${l.status}","${l.zipCode}","${l.createdAt}"`
    );
    const blob = new Blob([[...headers, ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Appy_Roofing_Leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(leads, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Appy_Roofing_CRM_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === 'all' || l.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch =
      l.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      l.phone.includes(searchFilter) ||
      l.serviceRequired.toLowerCase().includes(searchFilter.toLowerCase()) ||
      l.zipCode.includes(searchFilter);
    return matchesStatus && matchesSearch;
  });

  const leadStatuses: Lead['status'][] = [
    'New',
    'Contacted',
    'Qualified',
    'Inspection Scheduled',
    'Estimate Sent',
    'Approved',
    'Completed',
    'Lost'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/95 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="bg-[#101D30] border border-slate-700 rounded-2xl max-w-6xl w-full p-4 sm:p-6 shadow-2xl relative my-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 type-badge text-amber-400 mb-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              Contractor CRM Pipeline
            </div>
            <h2 className="type-h3 text-white">
              Contractor Admin Pipeline
            </h2>
          </div>

          {/* Export Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              Export CSV
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              Export JSON
            </button>
          </div>
        </div>

        {/* CRM Metric Tiles Bar */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 my-6">
            <div className="p-3.5 rounded-2xl bg-[#16253D] border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Inquiries</span>
              <div className="text-xl font-bold text-white mt-0.5">{stats.totalLeads}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#16253D] border border-slate-700">
              <span className="text-[10px] text-amber-400 uppercase font-semibold">New Pending</span>
              <div className="text-xl font-bold text-amber-400 mt-0.5">{stats.newInquiries}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#16253D] border border-slate-700">
              <span className="text-[10px] text-sky-400 uppercase font-semibold">Inspections Set</span>
              <div className="text-xl font-bold text-sky-400 mt-0.5">{stats.scheduledInspections}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#16253D] border border-slate-700">
              <span className="text-[10px] text-emerald-400 uppercase font-semibold">Approved Deals</span>
              <div className="text-xl font-bold text-emerald-400 mt-0.5">{stats.approvedEstimates}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#16253D] border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Active Crews</span>
              <div className="text-xl font-bold text-white mt-0.5">{stats.activeCrews}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#16253D] border border-slate-700">
              <span className="text-[10px] text-emerald-400 uppercase font-semibold">Avg Response</span>
              <div className="text-xl font-bold text-emerald-400 mt-0.5">{stats.avgResponseMinutes} min</div>
            </div>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="flex flex-wrap gap-2">
            {['all', 'New', 'Inspection Scheduled', 'Estimate Sent', 'Approved'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  statusFilter === status
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-[#16253D] text-slate-300 hover:bg-[#1E3250] border border-slate-700'
                }`}
              >
                {status === 'all' ? 'All Leads' : status}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter leads..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#16253D] border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-[#091321] rounded-2xl border border-slate-800 overflow-hidden overflow-x-auto max-h-[380px]">
          <table className="w-full text-left text-xs border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-[#16253D] border-b border-slate-700 text-slate-300 text-[11px] uppercase tracking-wider">
                <th className="p-3.5 font-bold text-white">Customer</th>
                <th className="p-3.5 font-bold">Contact</th>
                <th className="p-3.5 font-bold">Service Required</th>
                <th className="p-3.5 font-bold">Status</th>
                <th className="p-3.5 font-bold">Assigned</th>
                <th className="p-3.5 font-bold">Value</th>
                <th className="p-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-850/50 transition">
                  <td className="p-3.5">
                    <div className="font-bold text-white">{lead.fullName}</div>
                    <div className="text-[10px] text-slate-400">{lead.propertyAddress || `ZIP ${lead.zipCode}`}</div>
                  </td>
                  <td className="p-3.5 text-slate-300">
                    <div>{lead.phone}</div>
                    <div className="text-[10px] text-slate-400">{lead.email}</div>
                  </td>
                  <td className="p-3.5 text-slate-200">
                    <span className="font-semibold">{lead.serviceRequired}</span>
                    <div className="text-[10px] text-slate-400">Via {lead.source}</div>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      lead.status === 'New'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : lead.status === 'Approved'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-300 text-[11px]">
                    {lead.assignedTo || 'Unassigned'}
                  </td>
                  <td className="p-3.5 font-mono text-amber-400 font-bold">
                    ${(lead.estimatedValue || 12000).toLocaleString()}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => {
                        setSelectedLead(lead);
                        setEditStatus(lead.status);
                        setEditAssigned(lead.assignedTo || '');
                        setEditNotes(lead.internalNotes || '');
                        setIsEditing(true);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold text-[11px] transition"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Lead Management Modal Drawer */}
        {isEditing && selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-[#101D30] border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setIsEditing(false)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold font-heading text-white mb-1">
                Manage Lead: {selectedLead.fullName}
              </h3>
              <p className="text-xs text-slate-400 mb-4">{selectedLead.propertyAddress || selectedLead.zipCode}</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">CRM Pipeline Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as Lead['status'])}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                  >
                    {leadStatuses.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Assigned Field Estimator / Crew</label>
                  <input
                    type="text"
                    value={editAssigned}
                    onChange={(e) => setEditAssigned(e.target.value)}
                    placeholder="e.g. Marcus Vance (Senior Estimator)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Internal Technical Notes</label>
                  <textarea
                    rows={3}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="Add inspection notes, adjuster meetings, or shingle selections..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={handleUpdateLead}
                    className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
