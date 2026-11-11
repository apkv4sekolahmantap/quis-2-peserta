export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type SubjectId = 'matematika' | 'ipas' | 'bahasa_indonesia' | 'pkn' | 'pai' | 'campuran';

export interface GradeInfo {
  grade: GradeLevel;
  label: string;
  phase: string;
  age: string;
  icon: string;
  badgeColor: string;
  description: string;
}

export interface SchoolProfile {
  schoolName: string;
  className: string;
  teacherName: string;
  students: string[];
  defaultGrade?: GradeLevel;
}

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Question {
  id: string;
  subject: SubjectId;
  subjectName: string;
  grade?: GradeLevel;
  question: string;
  options: [string, string, string, string];
  correctIndex: number; // 0, 1, 2, or 3
  explanation: string;
}

export interface PlayerConfig {
  id: 'p1' | 'p2';
  name: string;
  avatar: string; // Emoji or icon name
  color: 'blue' | 'orange';
  keys: [string, string, string, string];
}

export interface PlayerAnswer {
  questionId: string;
  selectedIndex: number | null; // null if timed out
  isCorrect: boolean;
  scoreGained: number;
  timeTakenMs: number;
}

export interface PlayerState {
  score: number;
  streak: number;
  maxStreak: number;
  correctCount: number;
  wrongCount: number;
  answers: PlayerAnswer[];
  currentSelectedIndex: number | null;
  hasAnsweredCurrent: boolean;
}

export interface GameSettings {
  grade: GradeLevel; // SD Kelas 1, 2, 3, 4, 5, 6
  subject: SubjectId;
  questionCount: number; // 5, 10, 15
  timePerQuestion: number; // in seconds (10, 15, 20)
}

export type GamePhase = 'setup' | 'loading' | 'quiz' | 'round_result' | 'leaderboard';

