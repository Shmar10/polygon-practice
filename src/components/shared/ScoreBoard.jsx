import { CheckCircle2, XCircle } from 'lucide-react';

/**
 * ScoreBoard Component - Glassmorphism Design
 * Displays correct and incorrect counts with glass effect
 */
export function ScoreBoard({ correct, incorrect }) {
  return (
    <div className="glass rounded-2xl px-6 py-3 border border-white/30 inline-flex items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <span className="text-gray-700 font-semibold">
          <span className="text-emerald-600 font-bold text-lg">{correct}</span>
        </span>
      </div>
      <div className="w-px h-8 bg-white/30"></div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-red-500 flex items-center justify-center">
          <XCircle className="w-5 h-5 text-white" />
        </div>
        <span className="text-gray-700 font-semibold">
          <span className="text-rose-600 font-bold text-lg">{incorrect}</span>
        </span>
      </div>
    </div>
  );
}
