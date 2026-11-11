import React, { useState } from 'react';
import { Header } from './components/Header';
import { PlayerSetup } from './components/PlayerSetup';
import { QuizScreen } from './components/QuizScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { SchoolSettingsModal } from './components/SchoolSettingsModal';
import { GamePhase, GameSettings, PlayerConfig, PlayerState, Question, SubjectId, SchoolProfile, GradeLevel } from './types';
import { FALLBACK_QUESTIONS, getFallbackQuestionsForSubject, prepareShuffledQuestions, shuffleQuestionOptions } from './data/fallbackQuestions';
import { loadSchoolProfile, saveSchoolProfile } from './utils/schoolStorage';
import { soundFx } from './utils/sound';

export default function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // School & Class Profile (customizable for any school)
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile>(loadSchoolProfile);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState<boolean>(false);

  // Detect initial grade from schoolProfile className if present (e.g. "Kelas 4", "1", etc.)
  const detectInitialGrade = (name: string): GradeLevel => {
    const match = name.match(/kelas\s*([1-6])/i) || name.match(/\b([1-6])\b/);
    if (match && match[1]) {
      const g = parseInt(match[1], 10);
      if (g >= 1 && g <= 6) return g as GradeLevel;
    }
    return 4;
  };

  // Players configuration
  const [player1, setPlayer1] = useState<PlayerConfig>({
    id: 'p1',
    name: 'Pemain 1',
    avatar: '🦁',
    color: 'blue',
    keys: ['A', 'S', 'D', 'F'],
  });

  const [player2, setPlayer2] = useState<PlayerConfig>({
    id: 'p2',
    name: 'Pemain 2',
    avatar: '🚀',
    color: 'orange',
    keys: ['J', 'K', 'L', ';'],
  });

  const [settings, setSettings] = useState<GameSettings>(() => ({
    grade: schoolProfile.defaultGrade || detectInitialGrade(schoolProfile.className),
    subject: 'campuran',
    questionCount: 10,
    timePerQuestion: 20,
  }));

  const [questions, setQuestions] = useState<Question[]>([]);
  const [p1FinalState, setP1FinalState] = useState<PlayerState | null>(null);
  const [p2FinalState, setP2FinalState] = useState<PlayerState | null>(null);

  const handleSaveSchoolProfile = (updatedProfile: SchoolProfile) => {
    saveSchoolProfile(updatedProfile);
    setSchoolProfile(updatedProfile);
    if (updatedProfile.defaultGrade) {
      setSettings((prev) => ({ ...prev, grade: updatedProfile.defaultGrade! }));
    }
  };

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundFx.enabled = nextState;
  };

  const handleStartGame = async (
    p1: PlayerConfig,
    p2: PlayerConfig,
    gameSettings: GameSettings,
    useAi: boolean
  ) => {
    setPlayer1(p1);
    setPlayer2(p2);
    setSettings(gameSettings);
    setIsLoading(true);

    let loadedQuestions: Question[] = [];

    if (useAi) {
      try {
        const res = await fetch('/api/generate-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            grade: gameSettings.grade,
            subject: gameSettings.subject,
            count: gameSettings.questionCount,
          }),
        });

        const data = await res.json();
        if (data.success && data.questions && data.questions.length > 0) {
          loadedQuestions = data.questions.map(shuffleQuestionOptions);
        }
      } catch (err) {
        console.error('Failed to fetch AI questions, using fallback:', err);
      }
    }

    // Fallback if AI is disabled or fails
    if (loadedQuestions.length === 0) {
      loadedQuestions = getFallbackQuestionsForSubject(
        gameSettings.subject,
        gameSettings.questionCount,
        gameSettings.grade
      );
    }

    setQuestions(loadedQuestions);
    setIsLoading(false);
    setGamePhase('quiz');
  };

  const handleFinishQuiz = (p1Final: PlayerState, p2Final: PlayerState) => {
    setP1FinalState(p1Final);
    setP2FinalState(p2Final);
    setGamePhase('leaderboard');
  };

  const handlePlayAgainAi = async () => {
    setIsLoading(true);
    let loadedQuestions: Question[] = [];

    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: settings.grade,
          subject: settings.subject,
          count: settings.questionCount,
        }),
      });

      const data = await res.json();
      if (data.success && data.questions && data.questions.length > 0) {
        loadedQuestions = data.questions.map(shuffleQuestionOptions);
      }
    } catch (err) {
      console.error('Failed to fetch AI questions, using fallback:', err);
    }

    if (loadedQuestions.length === 0) {
      loadedQuestions = getFallbackQuestionsForSubject(
        settings.subject,
        settings.questionCount,
        settings.grade
      );
    }

    setQuestions(loadedQuestions);
    setIsLoading(false);
    setGamePhase('quiz');
  };


  const handleResetSetup = () => {
    setGamePhase('setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/40 text-slate-800 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onResetGame={handleResetSetup}
        gamePhase={gamePhase}
        schoolProfile={schoolProfile}
        onOpenSchoolSettings={() => setIsSchoolModalOpen(true)}
      />

      <main className="pb-12">
        {gamePhase === 'setup' && (
          <PlayerSetup
            onStartGame={handleStartGame}
            isLoading={isLoading}
            schoolProfile={schoolProfile}
            onOpenSchoolSettings={() => setIsSchoolModalOpen(true)}
          />
        )}

        {gamePhase === 'quiz' && (
          <QuizScreen
            questions={questions}
            player1={player1}
            player2={player2}
            settings={settings}
            onFinishQuiz={handleFinishQuiz}
          />
        )}

        {gamePhase === 'leaderboard' && p1FinalState && p2FinalState && (
          <LeaderboardScreen
            questions={questions}
            player1={player1}
            player2={player2}
            p1Final={p1FinalState}
            p2Final={p2FinalState}
            settings={settings}
            schoolProfile={schoolProfile}
            onPlayAgainAi={handlePlayAgainAi}
            onResetSetup={handleResetSetup}
            isAiLoading={isLoading}
          />
        )}
      </main>

      <SchoolSettingsModal
        isOpen={isSchoolModalOpen}
        onClose={() => setIsSchoolModalOpen(false)}
        currentProfile={schoolProfile}
        onSave={handleSaveSchoolProfile}
      />
    </div>
  );
}
