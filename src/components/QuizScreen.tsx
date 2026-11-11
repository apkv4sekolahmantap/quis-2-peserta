import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GameSettings, PlayerConfig, PlayerState, Question } from '../types';
import { soundFx } from '../utils/sound';
import { Flame, Trophy, Clock, CheckCircle2, XCircle, ArrowRight, Lightbulb } from 'lucide-react';

interface QuizScreenProps {
  questions: Question[];
  player1: PlayerConfig;
  player2: PlayerConfig;
  settings: GameSettings;
  onFinishQuiz: (p1Final: PlayerState, p2Final: PlayerState) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  player1,
  player2,
  settings,
  onFinishQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = questions[currentIndex];

  const [p1State, setP1State] = useState<PlayerState>({
    score: 0,
    streak: 0,
    maxStreak: 0,
    correctCount: 0,
    wrongCount: 0,
    answers: [],
    currentSelectedIndex: null,
    hasAnsweredCurrent: false,
  });

  const [p2State, setP2State] = useState<PlayerState>({
    score: 0,
    streak: 0,
    maxStreak: 0,
    correctCount: 0,
    wrongCount: 0,
    answers: [],
    currentSelectedIndex: null,
    hasAnsweredCurrent: false,
  });

  const [timeLeft, setTimeLeft] = useState(settings.timePerQuestion);
  const [isRevealed, setIsRevealed] = useState(false);
  const [p1ScoreDelta, setP1ScoreDelta] = useState<number | null>(null);
  const [p2ScoreDelta, setP2ScoreDelta] = useState<number | null>(null);

  const questionStartTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const p1AnswerTimeRef = useRef<number | null>(null);
  const p2AnswerTimeRef = useRef<number | null>(null);

  const [autoAdvanceCount, setAutoAdvanceCount] = useState<number>(3);

  // Initialize/reset question timer
  useEffect(() => {
    setTimeLeft(settings.timePerQuestion);
    setIsRevealed(false);
    setP1ScoreDelta(null);
    setP2ScoreDelta(null);
    setAutoAdvanceCount(3);
    questionStartTimeRef.current = Date.now();
    p1AnswerTimeRef.current = null;
    p2AnswerTimeRef.current = null;

    if (autoAdvanceIntervalRef.current) clearInterval(autoAdvanceIntervalRef.current);

    setP1State((prev) => ({
      ...prev,
      currentSelectedIndex: null,
      hasAnsweredCurrent: false,
    }));

    setP2State((prev) => ({
      ...prev,
      currentSelectedIndex: null,
      hasAnsweredCurrent: false,
    }));

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        if (prev <= 4) {
          soundFx.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (autoAdvanceIntervalRef.current) clearInterval(autoAdvanceIntervalRef.current);
    };
  }, [currentIndex, settings.timePerQuestion]);

  // Handle when timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && !isRevealed) {
      evaluateRound();
    }
  }, [timeLeft, isRevealed]);

  // Handle answer click/keypress for P1
  const handleP1Answer = (optionIdx: number) => {
    if (p1State.hasAnsweredCurrent || isRevealed) return;
    soundFx.playClick();
    const timeTaken = Date.now() - questionStartTimeRef.current;
    p1AnswerTimeRef.current = timeTaken;

    setP1State((prev) => ({
      ...prev,
      currentSelectedIndex: optionIdx,
      hasAnsweredCurrent: true,
    }));

    // Check if both answered now
    if (p2State.hasAnsweredCurrent) {
      evaluateRound(optionIdx, p2State.currentSelectedIndex, timeTaken, p2AnswerTimeRef.current);
    }
  };

  // Handle answer click/keypress for P2
  const handleP2Answer = (optionIdx: number) => {
    if (p2State.hasAnsweredCurrent || isRevealed) return;
    soundFx.playClick();
    const timeTaken = Date.now() - questionStartTimeRef.current;
    p2AnswerTimeRef.current = timeTaken;

    setP2State((prev) => ({
      ...prev,
      currentSelectedIndex: optionIdx,
      hasAnsweredCurrent: true,
    }));

    // Check if both answered now
    if (p1State.hasAnsweredCurrent) {
      evaluateRound(p1State.currentSelectedIndex, optionIdx, p1AnswerTimeRef.current, timeTaken);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isRevealed) return;

      const key = e.key.toLowerCase();

      // P1 Keys: A (0), S (1), D (2), F (3)
      if (key === 'a') handleP1Answer(0);
      else if (key === 's') handleP1Answer(1);
      else if (key === 'd') handleP1Answer(2);
      else if (key === 'f') handleP1Answer(3);

      // P2 Keys: J (0), K (1), L (2), ; or M (3) OR numbers 1, 2, 3, 4
      else if (key === 'j' || key === '1') handleP2Answer(0);
      else if (key === 'k' || key === '2') handleP2Answer(1);
      else if (key === 'l' || key === '3') handleP2Answer(2);
      else if (key === ';' || key === 'm' || key === '4') handleP2Answer(3);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRevealed, p1State.hasAnsweredCurrent, p2State.hasAnsweredCurrent]);

  // Calculate scores & evaluate round
  const evaluateRound = (
    overrideP1Idx?: number | null,
    overrideP2Idx?: number | null,
    overrideP1TimeMs?: number | null,
    overrideP2TimeMs?: number | null
  ) => {
    if (isRevealed) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setIsRevealed(true);

    const actualP1Idx = overrideP1Idx !== undefined ? overrideP1Idx : p1State.currentSelectedIndex;
    const actualP2Idx = overrideP2Idx !== undefined ? overrideP2Idx : p2State.currentSelectedIndex;

    const p1TimeMs = overrideP1TimeMs !== undefined ? overrideP1TimeMs : p1AnswerTimeRef.current;
    const p2TimeMs = overrideP2TimeMs !== undefined ? overrideP2TimeMs : p2AnswerTimeRef.current;

    const correctIdx = currentQuestion.correctIndex;

    const p1SelectedCorrect = actualP1Idx === correctIdx;
    const p2SelectedCorrect = actualP2Idx === correctIdx;

    const t1 = p1TimeMs !== null ? p1TimeMs : Infinity;
    const t2 = p2TimeMs !== null ? p2TimeMs : Infinity;

    // Rule: Whichever player gives the fastest CORRECT answer gets points.
    let p1GetsPoints = false;
    let p2GetsPoints = false;

    if (p1SelectedCorrect && p2SelectedCorrect) {
      if (t1 < t2) {
        p1GetsPoints = true;
      } else if (t2 < t1) {
        p2GetsPoints = true;
      } else {
        // Tie in time
        p1GetsPoints = true;
        p2GetsPoints = true;
      }
    } else if (p1SelectedCorrect) {
      p1GetsPoints = true;
    } else if (p2SelectedCorrect) {
      p2GetsPoints = true;
    }

    if (p1GetsPoints || p2GetsPoints) {
      soundFx.playCorrect();
    } else {
      soundFx.playWrong();
    }

    // P1 Score calculation
    let p1Delta = 0;
    let newP1Streak = p1GetsPoints ? p1State.streak + 1 : 0;
    let newP1MaxStreak = Math.max(p1State.maxStreak, newP1Streak);

    if (p1GetsPoints) {
      p1Delta += 100; // Base score
      // Speed bonus
      const maxTimeMs = settings.timePerQuestion * 1000;
      const speedRatio = Math.max(0, (maxTimeMs - t1) / maxTimeMs);
      const speedBonus = Math.round(speedRatio * 50);
      p1Delta += speedBonus;

      // Streak bonus
      if (newP1Streak >= 2) p1Delta += 25;
      if (newP1Streak >= 3) p1Delta += 25;
      if (newP1Streak >= 4) p1Delta += 50;
    }

    // P2 Score calculation
    let p2Delta = 0;
    let newP2Streak = p2GetsPoints ? p2State.streak + 1 : 0;
    let newP2MaxStreak = Math.max(p2State.maxStreak, newP2Streak);

    if (p2GetsPoints) {
      p2Delta += 100;
      const maxTimeMs = settings.timePerQuestion * 1000;
      const speedRatio = Math.max(0, (maxTimeMs - t2) / maxTimeMs);
      const speedBonus = Math.round(speedRatio * 50);
      p2Delta += speedBonus;

      if (newP2Streak >= 2) p2Delta += 25;
      if (newP2Streak >= 3) p2Delta += 25;
      if (newP2Streak >= 4) p2Delta += 50;
    }

    setP1ScoreDelta(p1Delta);
    setP2ScoreDelta(p2Delta);

    setP1State((prev) => ({
      ...prev,
      score: prev.score + p1Delta,
      streak: newP1Streak,
      maxStreak: newP1MaxStreak,
      correctCount: prev.correctCount + (p1GetsPoints ? 1 : 0),
      wrongCount: prev.wrongCount + (p1GetsPoints ? 0 : 1),
      answers: [
        ...prev.answers,
        {
          questionId: currentQuestion.id,
          selectedIndex: actualP1Idx,
          isCorrect: p1GetsPoints,
          scoreGained: p1Delta,
          timeTakenMs: t1 === Infinity ? settings.timePerQuestion * 1000 : t1,
        },
      ],
    }));

    setP2State((prev) => ({
      ...prev,
      score: prev.score + p2Delta,
      streak: newP2Streak,
      maxStreak: newP2MaxStreak,
      correctCount: prev.correctCount + (p2GetsPoints ? 1 : 0),
      wrongCount: prev.wrongCount + (p2GetsPoints ? 0 : 1),
      answers: [
        ...prev.answers,
        {
          questionId: currentQuestion.id,
          selectedIndex: actualP2Idx,
          isCorrect: p2GetsPoints,
          scoreGained: p2Delta,
          timeTakenMs: t2 === Infinity ? settings.timePerQuestion * 1000 : t2,
        },
      ],
    }));

    // Start auto-advance countdown (3 seconds)
    if (autoAdvanceIntervalRef.current) clearInterval(autoAdvanceIntervalRef.current);
    setAutoAdvanceCount(3);
    let secondsLeft = 3;
    autoAdvanceIntervalRef.current = setInterval(() => {
      secondsLeft -= 1;
      if (secondsLeft <= 0) {
        if (autoAdvanceIntervalRef.current) clearInterval(autoAdvanceIntervalRef.current);
        handleNextQuestion();
      } else {
        setAutoAdvanceCount(secondsLeft);
      }
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (autoAdvanceIntervalRef.current) clearInterval(autoAdvanceIntervalRef.current);
    soundFx.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Quiz finished!
      onFinishQuiz(p1State, p2State);
    }
  };

  const timerPercent = (timeLeft / settings.timePerQuestion) * 100;

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Top Question Header Bar */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-4 sm:p-6 shadow-md mb-4 relative overflow-hidden">
        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4 border border-slate-200">
          <motion.div
            className={`h-full transition-all duration-300 ${
              timeLeft <= 4
                ? 'bg-red-500 animate-pulse'
                : timeLeft <= 7
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="bg-indigo-100 text-indigo-800 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              Soal {currentIndex + 1} / {questions.length}
            </span>
            <span className="bg-purple-100 text-purple-800 font-black text-xs px-2.5 py-1 rounded-full border border-purple-200">
              SD Kelas {settings.grade || currentQuestion.grade || 4}
            </span>
            <span className="bg-blue-50 text-blue-800 font-bold text-xs px-2.5 py-1 rounded-full border border-blue-200">
              {currentQuestion.subjectName}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-black text-sm sm:text-base text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            <Clock className={`w-4 h-4 ${timeLeft <= 4 ? 'text-red-600 animate-spin' : 'text-slate-600'}`} />
            <span>{timeLeft}s</span>
          </div>
        </div>


        {/* Question Text */}
        <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-relaxed text-center my-2">
          {currentQuestion.question}
        </h3>
      </div>

      {/* Split Screen 2 Players Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 my-2">
        {/* PLAYER 1 SIDE (LEFT - BLUE) */}
        <div className="bg-gradient-to-b from-blue-50/90 to-cyan-50/70 border-3 border-blue-300 rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-sm relative">
          <div>
            {/* Header Player 1 */}
            <div className="flex items-center justify-between border-b border-blue-200/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl bg-white p-1.5 rounded-2xl shadow-xs border border-blue-200">
                  {player1.avatar}
                </span>
                <div>
                  <h4 className="font-extrabold text-blue-950 text-base sm:text-lg leading-tight">
                    {player1.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
                    <span>Skor: <strong className="text-blue-900 text-sm font-black">{p1State.score}</strong></span>
                    {p1State.streak >= 2 && (
                      <span className="flex items-center text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full text-[11px]">
                        <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600 mr-0.5" />
                        {p1State.streak}x Streak!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {isRevealed && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`font-black text-xs px-2.5 py-1 rounded-full shadow-md text-white ${
                    p1ScoreDelta !== null && p1ScoreDelta > 0
                      ? 'bg-emerald-500'
                      : p1State.currentSelectedIndex === currentQuestion.correctIndex
                      ? 'bg-amber-500'
                      : p1State.currentSelectedIndex !== null
                      ? 'bg-rose-500'
                      : 'bg-slate-400'
                  }`}
                >
                  {p1ScoreDelta !== null && p1ScoreDelta > 0
                    ? `⚡ TERCEPAT & BENAR! (+${p1ScoreDelta} Poin)`
                    : p1State.currentSelectedIndex === currentQuestion.correctIndex
                    ? '🐢 Benar Tapi Kalah Cepat! (0 Poin)'
                    : p1State.currentSelectedIndex !== null
                    ? '❌ Jawaban Salah (0 Poin)'
                    : '⏳ Waktu Habis (0 Poin)'}
                </motion.div>
              )}
            </div>

            {/* Answer Buttons P1 */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((option, idx) => {
                const keyLabel = player1.keys[idx];
                const isSelected = p1State.currentSelectedIndex === idx;
                const isCorrect = isRevealed && idx === currentQuestion.correctIndex;
                const isWrong = isRevealed && isSelected && !isCorrect;

                let btnStyle = 'bg-white border-blue-200 text-slate-800 hover:border-blue-400 hover:bg-blue-50';

                if (isRevealed) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500 border-emerald-600 text-white font-extrabold shadow-md ring-2 ring-emerald-300';
                  } else if (isWrong) {
                    btnStyle = 'bg-rose-500 border-rose-600 text-white font-extrabold opacity-90';
                  } else {
                    btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-blue-600 border-blue-700 text-white font-extrabold shadow-md ring-2 ring-blue-300';
                }

                return (
                  <button
                    key={`p1-opt-${idx}`}
                    onClick={() => handleP1Answer(idx)}
                    disabled={p1State.hasAnsweredCurrent || isRevealed}
                    className={`w-full p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between text-sm sm:text-base font-bold ${btnStyle}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs ${
                        isRevealed && isCorrect
                          ? 'bg-white text-emerald-700'
                          : isRevealed && isWrong
                          ? 'bg-white text-rose-700'
                          : isSelected
                          ? 'bg-white text-blue-700'
                          : 'bg-blue-100 text-blue-900'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                      isSelected || (isRevealed && isCorrect)
                        ? 'bg-white/20 border-white/40 text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-500'
                    }`}>
                      [{keyLabel}]
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {p1State.hasAnsweredCurrent && !isRevealed && (
            <div className="mt-3 text-center py-2 bg-blue-100/70 border border-blue-300 rounded-xl text-xs font-bold text-blue-900 animate-pulse">
              🔒 Jawaban P1 Terkunci! Menunggu lawan / waktu habis...
            </div>
          )}
        </div>

        {/* PLAYER 2 SIDE (RIGHT - ORANGE) */}
        <div className="bg-gradient-to-b from-orange-50/90 to-amber-50/70 border-3 border-orange-300 rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-sm relative">
          <div>
            {/* Header Player 2 */}
            <div className="flex items-center justify-between border-b border-orange-200/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-3xl bg-white p-1.5 rounded-2xl shadow-xs border border-orange-200">
                  {player2.avatar}
                </span>
                <div>
                  <h4 className="font-extrabold text-orange-950 text-base sm:text-lg leading-tight">
                    {player2.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-700">
                    <span>Skor: <strong className="text-orange-900 text-sm font-black">{p2State.score}</strong></span>
                    {p2State.streak >= 2 && (
                      <span className="flex items-center text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full text-[11px]">
                        <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-600 mr-0.5" />
                        {p2State.streak}x Streak!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {isRevealed && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`font-black text-xs px-2.5 py-1 rounded-full shadow-md text-white ${
                    p2ScoreDelta !== null && p2ScoreDelta > 0
                      ? 'bg-emerald-500'
                      : p2State.currentSelectedIndex === currentQuestion.correctIndex
                      ? 'bg-amber-500'
                      : p2State.currentSelectedIndex !== null
                      ? 'bg-rose-500'
                      : 'bg-slate-400'
                  }`}
                >
                  {p2ScoreDelta !== null && p2ScoreDelta > 0
                    ? `⚡ TERCEPAT & BENAR! (+${p2ScoreDelta} Poin)`
                    : p2State.currentSelectedIndex === currentQuestion.correctIndex
                    ? '🐢 Benar Tapi Kalah Cepat! (0 Poin)'
                    : p2State.currentSelectedIndex !== null
                    ? '❌ Jawaban Salah (0 Poin)'
                    : '⏳ Waktu Habis (0 Poin)'}
                </motion.div>
              )}
            </div>

            {/* Answer Buttons P2 */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((option, idx) => {
                const keyLabel = player2.keys[idx];
                const isSelected = p2State.currentSelectedIndex === idx;
                const isCorrect = isRevealed && idx === currentQuestion.correctIndex;
                const isWrong = isRevealed && isSelected && !isCorrect;

                let btnStyle = 'bg-white border-orange-200 text-slate-800 hover:border-orange-400 hover:bg-orange-50';

                if (isRevealed) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500 border-emerald-600 text-white font-extrabold shadow-md ring-2 ring-emerald-300';
                  } else if (isWrong) {
                    btnStyle = 'bg-rose-500 border-rose-600 text-white font-extrabold opacity-90';
                  } else {
                    btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-orange-600 border-orange-700 text-white font-extrabold shadow-md ring-2 ring-orange-300';
                }

                return (
                  <button
                    key={`p2-opt-${idx}`}
                    onClick={() => handleP2Answer(idx)}
                    disabled={p2State.hasAnsweredCurrent || isRevealed}
                    className={`w-full p-3 sm:p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between text-sm sm:text-base font-bold ${btnStyle}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs ${
                        isRevealed && isCorrect
                          ? 'bg-white text-emerald-700'
                          : isRevealed && isWrong
                          ? 'bg-white text-rose-700'
                          : isSelected
                          ? 'bg-white text-orange-700'
                          : 'bg-orange-100 text-orange-900'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                      isSelected || (isRevealed && isCorrect)
                        ? 'bg-white/20 border-white/40 text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-500'
                    }`}>
                      [{keyLabel}]
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {p2State.hasAnsweredCurrent && !isRevealed && (
            <div className="mt-3 text-center py-2 bg-orange-100/70 border border-orange-300 rounded-xl text-xs font-bold text-orange-900 animate-pulse">
              🔒 Jawaban P2 Terkunci! Menunggu lawan / waktu habis...
            </div>
          )}
        </div>
      </div>

      {/* Pembahasan & Bottom Action Bar when Revealed */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-4 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-3xl p-4 sm:p-5 shadow-lg border border-indigo-700"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-9 h-9 bg-amber-400 text-indigo-950 rounded-2xl flex items-center justify-center shrink-0 font-bold mt-0.5">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-extrabold text-amber-300 text-sm uppercase tracking-wide">
                    Pembahasan Edukatif SD Kelas {settings.grade || currentQuestion.grade || 4}:
                  </h5>
                  <p className="text-xs sm:text-sm text-indigo-100 font-medium mt-0.5 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>

              <button
                onClick={handleNextQuestion}
                className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-indigo-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <span>
                  {currentIndex + 1 < questions.length
                    ? `Soal Berikutnya (${autoAdvanceCount}s)`
                    : `Lihat Hasil Akhir (${autoAdvanceCount}s)`}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
