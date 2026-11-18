import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, AlertTriangle, AlertOctagon, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "How old is your current roofing system?",
    options: [
      { text: "Under 5 years old", score: 0 },
      { text: "6 to 14 years old", score: 1 },
      { text: "15 to 22 years old", score: 3 },
      { text: "Over 22 years / Unknown age", score: 5 }
    ]
  },
  {
    id: 2,
    question: "Have you noticed active water leaks or dripping indoors during rain?",
    options: [
      { text: "No leaks whatsoever", score: 0 },
      { text: "Minor drip once during a high-wind hurricane/tropical storm", score: 3 },
      { text: "Active leaks occurring during normal heavy rainfall", score: 6 }
    ]
  },
  {
    id: 3,
    question: "Are any shingles lifted, cracked, or missing entirely from your roof?",
    options: [
      { text: "All shingles appear flat, aligned, and intact", score: 0 },
      { text: "A few edges appear curled or lifted", score: 2 },
      { text: "Noticeable missing shingle tabs with black felt visible", score: 5 }
    ]
  },
  {
    id: 4,
    question: "Has your immediate neighborhood experienced a severe hail or wind storm recently?",
    options: [
      { text: "No recent severe storms", score: 0 },
      { text: "High winds (40-60 MPH) within the past 6 months", score: 2 },
      { text: "Significant hail storm with quarter-sized stones or larger", score: 5 }
    ]
  },
  {
    id: 5,
    question: "Are there brownish discoloration rings or peeling paint on ceilings or upper walls?",
    options: [
      { text: "Ceilings are pristine and dry", score: 0 },
      { text: "Slight faint discoloration in one corner or closet", score: 3 },
      { text: "Prominent yellow-brown stain circles or bubbling drywall", score: 6 }
    ]
  },
  {
    id: 6,
    question: "When was your roof last physically or drone inspected by a licensed professional?",
    options: [
      { text: "Within the past 12 months", score: 0 },
      { text: "1 to 3 years ago", score: 1 },
      { text: "Over 3 years ago or never", score: 3 }
    ]
  },
  {
    id: 7,
    question: "Have you observed damaged, sagging gutters or mineral granules washing out downspouts?",
    options: [
      { text: "Gutters drain freely with no shingle sand/granules", score: 0 },
      { text: "Moderate amount of granules visible in downspout splash blocks", score: 2 },
      { text: "Heavy granule accumulation or sagging gutters pulling away from fascia", score: 4 }
    ]
  }
];

export const RoofHealthQuiz: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleSelectOption = (score: number) => {
    const updated = [...selectedAnswers, score];
    setSelectedAnswers(updated);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
  };

  const totalScore = selectedAnswers.reduce((a, b) => a + b, 0);

  // Determine diagnosis
  let tier: 'Good' | 'Needs Attention' | 'Urgent' = 'Good';
  let badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  let title = 'Roof Appears in Good Condition';
  let desc = 'Your responses indicate low immediate risk factors. Continue routine bi-annual maintenance and clear debris from valleys.';

  if (totalScore >= 14) {
    tier = 'Urgent';
    badgeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    title = 'Urgent Professional Assessment Recommended';
    desc = 'Your roof exhibits high-risk indicators of active water penetration or structural compromise. Schedule an emergency inspection to prevent ceiling collapse or mold.';
  } else if (totalScore >= 6) {
    tier = 'Needs Attention';
    badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    title = 'Preventative Attention Advised';
    desc = 'Your roof has moderate risk factors such as age or weather wear. A 21-point drone and attic inspection will identify localized repairs before leaks develop.';
  }

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <section id="health-quiz" className="py-10 sm:py-14 bg-[#091321] text-white relative border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 type-badge mb-2.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Roof Health Self-Assessment
          </div>
          <h2 className="type-h2 text-white">
            Take the 2-Minute Roof Health Assessment
          </h2>
          <p className="mt-2.5 type-body text-slate-300">
            Answer 7 guided questions to evaluate your roof’s risk profile, vulnerability score, and recommended maintenance action plan.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-[#101D30] rounded-2xl p-5 sm:p-7 border border-slate-700/80 shadow-xl relative">
          {!quizCompleted ? (
            <div>
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <span>Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                <span className="text-amber-400 font-bold font-mono">
                  {Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Heading */}
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-6">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.score)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl bg-[#16253D] hover:bg-[#1E3250] border border-slate-700/70 hover:border-amber-400 text-slate-200 hover:text-white font-medium text-sm transition flex items-center justify-between group"
                  >
                    <span>{opt.text}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Outcome */
            <div className="text-center py-6 animate-in zoom-in-95">
              <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border mb-4 ${badgeColor}`}>
                DIAGNOSIS: {tier.toUpperCase()}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mb-3">
                {title}
              </h3>
              <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
                {desc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={onOpenBooking}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition shadow-xl shadow-amber-500/20"
                >
                  Schedule Free 21-Point Inspection
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-sm border border-slate-700 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Assessment
                </button>
              </div>
            </div>
          )}

          {/* Questionnaire Disclaimer */}
          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center">
            Notice: This questionnaire is an informational self-assessment tool and does not constitute a certified professional on-site roof inspection or engineering safety certification.
          </div>
        </div>
      </div>
    </section>
  );
};
