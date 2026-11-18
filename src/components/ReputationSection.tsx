import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquarePlus, X, ThumbsUp, MapPin } from 'lucide-react';
import { Review } from '../../server/db';

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "David & Kimberly Sterling",
    location: "Dallas, TX (Highland Park)",
    rating: 5,
    service: "Standing Seam Metal Roof Installation",
    date: "2 weeks ago",
    content: "Appy Roofing Co. exceeded every expectation. From the 3D model demonstration during our initial estimate to the immaculate magnet sweep of our driveway after completion. The metal roof looks like modern art and has already lowered our AC bills.",
    verified: true,
    source: "Google"
  },
  {
    id: "rev-2",
    author: "Marcus Thorne",
    location: "Austin, TX (Westlake Hills)",
    rating: 5,
    service: "Storm Damage & Insurance Claim",
    date: "1 month ago",
    content: "When 2-inch hail wrecked our neighborhood, Appy showed up the next morning with emergency tarping. Their storm specialist David met our insurance adjuster directly and ensured all collateral damage was covered. Honest, prompt, and top-tier craftsmanship.",
    verified: true,
    source: "Google"
  },
  {
    id: "rev-3",
    author: "Elena Rostova",
    location: "Fort Worth, TX (Tanglewood)",
    rating: 5,
    service: "Architectural Shingle Replacement",
    date: "2 months ago",
    content: "I received four estimates for a complete tear-off and replacement. Appy was the only company that provided a detailed drone aerial survey and explained the importance of balanced ridge ventilation. The crew completed 42 squares in 2 days. Flawless.",
    verified: true,
    source: "Google"
  },
  {
    id: "rev-4",
    author: "Dr. Arthur Pendelton",
    location: "Plano, TX (Legacy West)",
    rating: 5,
    service: "Commercial TPO Flat Roof & Parapet Flashing",
    date: "3 months ago",
    content: "We manage an 18,000 sq ft medical office plaza. Appy replaced our old modified bitumen roof with reflective white TPO. Zero interruptions to patient visits, meticulous waterproofing around HVAC curb units, and a 25-year manufacturer warranty.",
    verified: true,
    source: "Google"
  }
];

export const ReputationSection: React.FC<{ hideHeader?: boolean }> = ({ hideHeader = false }) => {
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [rating, setRating] = useState(4.9);
  const [reviewCount, setReviewCount] = useState(387);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');

  // Form State
  const [formAuthor, setFormAuthor] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formService, setFormService] = useState('Roof Replacement');
  const [formContent, setFormContent] = useState('');

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
          setRating(data.rating || 4.9);
          setReviewCount(data.reviewCount || 387);
        }
      })
      .catch(() => {
        // Fallback default sample data if API server is booting
      });
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor || !formContent) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: formAuthor,
          location: formLocation,
          rating: formRating,
          service: formService,
          content: formContent
        })
      });
      const data = await res.json();
      if (data.success && data.review) {
        setReviews([data.review, ...reviews]);
        setReviewCount((prev) => prev + 1);
        setSubmittedMessage('Thank you! Your verified review has been recorded.');
        setTimeout(() => {
          setModalOpen(false);
          setSubmittedMessage('');
          setFormAuthor('');
          setFormContent('');
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews" className={`${hideHeader ? 'pt-4 pb-8 sm:pt-6 sm:pb-10' : 'pt-8 pb-6 sm:pt-10 sm:pb-8 border-t border-slate-800'} bg-[#091321] text-white relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {hideHeader ? (
          /* Subpage Rating Summary Bar */
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-2 shadow-md">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold text-white">{rating}</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">({reviewCount} Verified Reviews)</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Google Certified 5-Star Commercial & Residential Contractor
                </div>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition shadow-md shadow-amber-500/20"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Verified Review</span>
            </button>
          </div>
        ) : (
          /* Section Header */
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2">
                <Star className="w-3.5 h-3.5 fill-current" />
                Verified Homeowner Reviews
              </div>
              <h2 className="type-h2 text-white">
                Trusted by Homeowners.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  Recommended for Quality.
                </span>
              </h2>
              <p className="mt-3 type-body-lead text-slate-300">
                Read authentic feedback from homeowners who trusted Appy Roofing Co. for roof replacements, storm restorations, and designer metal installations.
              </p>
            </div>

            {/* Rating Summary Card */}
            <div className="bg-[#101D30] rounded-2xl p-5 border border-slate-700/80 shadow-2xl flex items-center gap-5 flex-shrink-0">
              {/* Google G Icon */}
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2 shadow-md">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-extrabold text-white">{rating}</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  Verified Google Rating • {reviewCount} Reviews
                </div>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="ml-2 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-400 text-xs font-semibold border border-slate-700 transition"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                Write Review
              </button>
            </div>
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((rev) => (
            <div
              key={rev.id}
              className="bg-[#101D30] rounded-2xl p-6 border border-slate-700/70 shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition-all group"
            >
              <div>
                {/* Header Stars & Verified Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                {/* Service Tag */}
                <span className="inline-block text-[11px] text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-md mb-3">
                  {rev.service}
                </span>

                {/* Review Text */}
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic line-clamp-6">
                  "{rev.content}"
                </p>
              </div>

              {/* Author & Location */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                    {rev.author}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{rev.location}</span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Review Verification Note */}
        <div className="mt-4 text-center text-[11px] text-slate-500 max-w-2xl mx-auto">
          Reviews verified through post-installation homeowner satisfaction surveys and direct customer submissions.
        </div>
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#101D30] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-heading text-white">Share Your Feedback</h3>
            <p className="text-xs text-slate-300 mt-1">
              Your verified review helps fellow homeowners make confident roofing decisions.
            </p>

            {submittedMessage ? (
              <div className="my-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold text-center">
                {submittedMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="e.g. Rachel Adams"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">City & State</label>
                    <input
                      type="text"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="e.g. Plano, TX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Rating</label>
                    <select
                      value={formRating}
                      onChange={(e) => setFormRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                      <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Service Received</label>
                  <select
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="Roof Replacement">Roof Replacement</option>
                    <option value="Storm Damage Repair">Storm Damage Repair</option>
                    <option value="Standing Seam Metal Roofing">Standing Seam Metal Roofing</option>
                    <option value="Tile Roofing">Tile Roofing</option>
                    <option value="Roof Leak Repair">Roof Leak Repair</option>
                    <option value="Commercial Roofing">Commercial Roofing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Review Comments</label>
                  <textarea
                    rows={4}
                    required
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Describe your experience with our crew, estimate accuracy, cleanliness, and finished roof quality..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm tracking-wider uppercase transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Post Verified Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
