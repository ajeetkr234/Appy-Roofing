// Conversion Tracking Utility for Appy Roofing Co.
// Prepares standard event dispatches for Google Analytics (gtag), Meta Pixel, Google Tag Manager, or Custom CRM

export type ConversionEvent =
  | 'estimate_button_click'
  | 'call_button_click'
  | 'form_submission'
  | 'zip_code_check'
  | 'inspection_booking'
  | 'ai_assistant_interaction'
  | 'financing_inquiry';

export function trackConversion(event: ConversionEvent, payload?: Record<string, any>) {
  // Console logging for verification in demo mode
  if (process.env.NODE_ENV !== 'production' || true) {
    console.log(`[Appy Analytics Event] -> ${event}`, payload || {});
  }

  // Safe window.gtag dispatch if Google Analytics tag is present
  if (typeof window !== 'undefined' && (window as any).gtag) {
    try {
      (window as any).gtag('event', event, payload);
    } catch (e) {
      // ignore
    }
  }

  // Safe window.dataLayer dispatch if GTM is present
  if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
    try {
      (window as any).dataLayer.push({ event, ...payload });
    } catch (e) {
      // ignore
    }
  }
}
