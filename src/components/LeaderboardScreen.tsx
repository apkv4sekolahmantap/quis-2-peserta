import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PlayerConfig, PlayerState, Question, GameSettings, SchoolProfile } from '../types';
import { fireWinnerConfetti } from '../utils/confetti';
import { soundFx } from '../utils/sound';
import { Trophy, Sparkles, RefreshCw, Flame, CheckCircle, XCircle, ChevronDown, ChevronUp, BookOpen, Layers, School } from 'lucide-react';

interface LeaderboardScreenProps {
  questions: Question[];
  player1: PlayerConfig;
  player2: PlayerConfig;
  p1Final: PlayerState;
  p2Final: PlayerState;
  settings: GameSettings;
  schoolProfile: SchoolProfile;
  onPlayAgainAi: () => void;
  onResetSetup: () => void;
  isAiLoading: boolean;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  questions,
  player1,
  player2,
  p1Final,
  p2Final,
  settings,
  schoolProfile,
  onPlayAgainAi,
  onResetSetup,
  isAiLoading
}) => {
  const [openReviewIndex, setOpenReviewIndex] = useState<number | null>(null);

  const isTie = p1Final.score === p2Final.score;
  const p1Won = p1Final.score > p2Final.score;
  const p2Won = p2Final.score > p1Final.score;

  const winner = p1Won ? player1 : p2Won ? player2 : null;

  useEffect(() => {
    soundFx.playVictory();
    fireWinnerConfetti();
  }, []);

  const getAccuracy = (correct: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((correct / total) * 100);
  };

  const p1Acc = getAccuracy(p1Final.correctCount, questions.length);
  const p2Acc = getAccuracy(p2Final.correctCount, questions.length);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Winner Celebration Banner */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 text-white rounded-3xl p-6 sm:p-10 text-center shadow-xl border-2 border-indigo-700/50 relative overflow-hidden mb-8"
      >
        <div className="relative z-10">
          <div className="w-20 h-20 bg-amber-400 text-amber-950 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg ring-4 ring-amber-300/40 mb-4 animate-bounce">
            🏆
          </div>

          <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider border border-amber-300/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Hasil Akhir Kuis
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-400/25 text-purple-200 text-xs font-black border border-purple-300/30">
              🎒 SD Kelas {settings.grade}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold border border-white/20">
              <School className="w-3.5 h-3.5 text-indigo-300" /> {schoolProfile.schoolName} ({schoolProfile.className})
            </span>
          </div>


          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-amber-300 mt-1">
            {isTie ? 'HASIL SERI! 🤝' : `PEMENANG: ${winner?.name.toUpperCase()}!`}
          </h2>

          <p className="text-indigo-200 text-sm sm:text-base font-semibold max-w-lg mx-auto mt-2">
            {isTie
              ? 'Kedua pemain menunjukkan kecerdasan yang luar biasa!'
              : `Selamat untuk ${winner?.name} atas ketangkasan dan kecerdasannya! 🎉`}
          </p>
        </div>
      </motion.div>

      {/* Player Score Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Player 1 Card */}
        <div className={`rounded-3xl p-6 border-3 transition-all ${
          p1Won
            ? 'bg-gradient-to-b from-blue-50 to-indigo-50/60 border-blue-500 shadow-md ring-2 ring-blue-400/30'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl bg-blue-100 p-2 rounded-2xl border border-blue-200">
                {player1.avatar}
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-xl">{player1.name}</h3>
                <span className="text-xs font-bold text-blue-700 uppercase bg-blue-100 px-2 py-0.5 rounded-md">
                  Pemain 1 (Kiri)
                </span>
              </div>
            </div>
            {p1Won && (
              <span className="bg-amber-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full shadow-xs">
                JUARA 1 🥇
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs">
              <span className="text-xs font-extrabold text-slate-500 uppercase">Total Skor</span>
              <span className="text-2xl font-black text-blue-600">{p1Final.score} Poin</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Akurasi</span>
                <p className="font-extrabold text-slate-800 text-base">{p1Acc}%</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Streak Maksimal</span>
                <p className="font-extrabold text-amber-600 text-base flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
                  {p1Final.maxStreak}x
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Player 2 Card */}
        <div className={`rounded-3xl p-6 border-3 transition-all ${
          p2Won
            ? 'bg-gradient-to-b from-orange-50 to-amber-50/60 border-orange-500 shadow-md ring-2 ring-orange-400/30'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl bg-orange-100 p-2 rounded-2xl border border-orange-200">
                {player2.avatar}
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-xl">{player2.name}</h3>
                <span className="text-xs font-bold text-orange-700 uppercase bg-orange-100 px-2 py-0.5 rounded-md">
                  Pemain 2 (Kanan)
                </span>
              </div>
            </div>
            {p2Won && (
              <span className="bg-amber-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full shadow-xs">
                JUARA 1 🥇
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-100 shadow-2xs">
              <span className="text-xs font-extrabold text-slate-500 uppercase">Total Skor</span>
              <span className="text-2xl font-black text-orange-600">{p2Final.score} Poin</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Akurasi</span>
                <p className="font-extrabold text-slate-800 text-base">{p2Acc}%</p>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-100 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Streak Maksimal</span>
                <p className="font-extrabold text-amber-600 text-base flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
                  {p2Final.maxStreak}x
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <button
          onClick={onPlayAgainAi}
          disabled={isAiLoading}
          id="play-again-ai-btn"
          className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-lg shadow-indigo-500/25 transition-all transform active:scale-98 flex items-center justify-center gap-2.5 disabled:opacity-60"
        >
          {isAiLoading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Membuat Soal AI Baru...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Main Lagi (Soal AI Baru ✨)</span>
            </>
          )}
        </button>

        <button
          onClick={onResetSetup}
          id="change-subject-btn"
          className="px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 font-extrabold text-base rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2"
        >
          <Layers className="w-5 h-5 text-slate-600" />
          <span>Ubah Mapel / Pemain</span>
        </button>
      </div>

      {/* Detailed Question Review Accordion */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xs">
        <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Rangkuman & Pembahasan Soal SD Kelas {settings.grade}
        </h3>

        <div className="space-y-3">
          {questions.map((q, idx) => {
            const p1Ans = p1Final.answers[idx];
            const p2Ans = p2Final.answers[idx];
            const isOpen = openReviewIndex === idx;

            return (
              <div
                key={`review-${q.id}`}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenReviewIndex(isOpen ? null : idx)}
                  className="w-full p-4 bg-slate-50/70 hover:bg-slate-100/70 text-left flex items-center justify-between gap-3 font-semibold text-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 bg-indigo-100 text-indigo-800 font-extrabold text-xs rounded-lg flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-extrabold line-clamp-1">{q.question}</span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        P1: {p1Ans?.isCorrect ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                        P2: {p2Ans?.isCorrect ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5 text-rose-500" />}
                      </span>
                    </div>

                    {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="p-4 bg-white border-t border-slate-200 text-xs sm:text-sm space-y-3">
                    <p className="font-extrabold text-slate-900 text-base">{q.question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isCorrectOpt = optIdx === q.correctIndex;
                        const isP1Selected = p1Ans?.selectedIndex === optIdx;
                        const isP2Selected = p2Ans?.selectedIndex === optIdx;

                        return (
                          <div
                            key={`opt-rev-${optIdx}`}
                            className={`p-2.5 rounded-xl border flex items-center justify-between ${
                              isCorrectOpt
                                ? 'bg-emerald-50 border-emerald-300 font-extrabold text-emerald-900'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span>
                              {String.fromCharCode(65 + optIdx)}. {opt}
                              {isCorrectOpt && ' (Jawaban Benar)'}
                            </span>
                            <div className="flex gap-1 text-[10px]">
                              {isP1Selected && (
                                <span className="bg-blue-600 text-white font-black px-1.5 py-0.5 rounded">
                                  P1
                                </span>
                              )}
                              {isP2Selected && (
                                <span className="bg-orange-600 text-white font-black px-1.5 py-0.5 rounded">
                                  P2
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900 font-medium leading-relaxed">
                      <strong className="text-amber-950 font-bold block mb-0.5">💡 Pembahasan:</strong>
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
