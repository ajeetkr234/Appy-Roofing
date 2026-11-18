import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/roofingData';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  actions?: string[];
}

export const AIChatbot: React.FC<{
  onOpenBooking: () => void;
}> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello! I'm your Appy AI Roofing Assistant. I can help calculate estimated roof replacement costs, diagnose storm damage, check ZIP code service coverage, or book your free on-site drone inspection.",
      time: 'Just now',
      actions: [
        'How much does a new roof cost?',
        'Do you provide free inspections?',
        'I have storm/hail damage',
        'Compare Metal vs Asphalt Shingles'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "Thank you for contacting Appy Roofing Co. Let me connect you with our scheduling team for a free on-site inspection.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: data.suggestedActions || ['Book Free Inspection', 'Call (800) 555-APPY']
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: "I'd be glad to help! Our team provides free drone-assisted inspections and itemized estimates throughout our service network. Would you like to schedule an inspection?",
        time: 'Just now',
        actions: ['Book Free Inspection', 'Call (800) 555-APPY']
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (action: string) => {
    if (action.includes('Book') || action.includes('Schedule') || action.includes('Estimate')) {
      onOpenBooking();
      setIsOpen(false);
    } else if (action.includes('Call')) {
      window.location.href = `tel:${BUSINESS_INFO.phoneRaw}`;
    } else {
      handleSendMessage(action);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Button - Sleek Modern Circular Widget */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 sm:bottom-6 right-5 z-40 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#101D30] hover:bg-[#16253D] text-amber-400 border border-slate-700/80 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group"
        aria-label="Toggle Roof Advisory Chat"
        title="Appy 24/7 Roofing Assistant"
      >
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#101D30] animate-pulse" />
        <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
      </button>

      {/* Chat Window Flyout */}
      {isOpen && (
        <div className="fixed bottom-24 sm:bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[520px] max-h-[82vh] bg-[#101D30] border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Top Bar */}
          <div className="p-4 bg-[#091321] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Appy AI Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h4>
                <div className="text-[10px] text-slate-400">24/7 Roofing & Storm Advisory</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar text-sm">
            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div key={m.id} className={`flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      isAi
                        ? 'bg-[#16253D] text-slate-200 border border-slate-700/60'
                        : 'bg-amber-500 text-slate-950 font-semibold shadow-md'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 px-1">{m.time}</span>

                  {/* Quick Action Chips */}
                  {isAi && m.actions && m.actions.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {m.actions.map((act) => (
                        <button
                          key={act}
                          onClick={() => handleActionClick(act)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-slate-700 text-[11px] font-semibold transition"
                        >
                          {act}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 text-xs italic p-2 bg-[#16253D] rounded-xl w-32 border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#091321] border-t border-slate-800">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about costs, leaks, materials..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#16253D] border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-[9px] text-slate-500 text-center mt-1.5">
              Conversational assistant. Does not constitute a structural engineering diagnosis or insurance coverage decision.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
