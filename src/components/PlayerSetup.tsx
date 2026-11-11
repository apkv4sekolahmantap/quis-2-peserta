import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GameSettings, PlayerConfig, SubjectId, SchoolProfile, GradeLevel } from '../types';
import { GRADE_LIST, getSubjectsForGrade } from '../data/fallbackQuestions';
import { Sparkles, Play, Users, Clock, HelpCircle, Bot, Shuffle, School, Edit3, Plus, GraduationCap, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface PlayerSetupProps {
  onStartGame: (
    player1: PlayerConfig,
    player2: PlayerConfig,
    settings: GameSettings,
    useAi: boolean
  ) => void;
  isLoading: boolean;
  schoolProfile: SchoolProfile;
  onOpenSchoolSettings: () => void;
}

const AVATAR_LIST = ['🦁', '🐯', '🚀', '🦄', '🐱', '🐼', '🦸‍♂️', '⚡', '🦊', '🎨', '🦖', '🤖'];

export const PlayerSetup: React.FC<PlayerSetupProps> = ({
  onStartGame,
  isLoading,
  schoolProfile,
  onOpenSchoolSettings,
}) => {
  const studentList = schoolProfile.students && schoolProfile.students.length > 0
    ? schoolProfile.students
    : ['Pemain 1', 'Pemain 2'];

  const detectGradeFromClass = (name: string): GradeLevel => {
    const match = name.match(/kelas\s*([1-6])/i) || name.match(/\b([1-6])\b/);
    if (match && match[1]) {
      const val = parseInt(match[1], 10);
      if (val >= 1 && val <= 6) return val as GradeLevel;
    }
    return 4;
  };

  const [grade, setGrade] = useState<GradeLevel>(() =>
    schoolProfile.defaultGrade || detectGradeFromClass(schoolProfile.className)
  );

  const [p1Name, setP1Name] = useState(() => studentList[0] || 'Pemain 1');
  const [p1Avatar, setP1Avatar] = useState('🦁');

  const [p2Name, setP2Name] = useState(() => studentList[1] || studentList[0] || 'Pemain 2');
  const [p2Avatar, setP2Avatar] = useState('🚀');

  // If student list changes (e.g. from modal), adjust names if current are missing
  useEffect(() => {
    if (studentList.length > 0) {
      if (!studentList.includes(p1Name)) {
        setP1Name(studentList[0] || 'Pemain 1');
      }
      if (!studentList.includes(p2Name)) {
        setP2Name(studentList[1] || studentList[0] || 'Pemain 2');
      }
    }
  }, [studentList]);

  // Sync grade if schoolProfile has explicit defaultGrade
  useEffect(() => {
    if (schoolProfile.defaultGrade) {
      setGrade(schoolProfile.defaultGrade);
    }
  }, [schoolProfile.defaultGrade]);

  const randomizeP1Name = () => {
    soundFx.playClick();
    const available = studentList.filter((n) => n !== p2Name);
    const pool = available.length > 0 ? available : studentList;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick) setP1Name(pick);
  };

  const randomizeP2Name = () => {
    soundFx.playClick();
    const available = studentList.filter((n) => n !== p1Name);
    const pool = available.length > 0 ? available : studentList;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    if (pick) setP2Name(pick);
  };

  const [subject, setSubject] = useState<SubjectId>('campuran');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timePerQuestion, setTimePerQuestion] = useState<number>(20);
  const [useAi, setUseAi] = useState<boolean>(true);

  // Dynamically obtain subject descriptions for currently selected grade
  const currentSubjects = getSubjectsForGrade(grade);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();

    const p1: PlayerConfig = {
      id: 'p1',
      name: p1Name.trim() || 'Pemain 1',
      avatar: p1Avatar,
      color: 'blue',
      keys: ['A', 'S', 'D', 'F']
    };

    const p2: PlayerConfig = {
      id: 'p2',
      name: p2Name.trim() || 'Pemain 2',
      avatar: p2Avatar,
      color: 'orange',
      keys: ['J', 'K', 'L', ';']
    };

    const settings: GameSettings = {
      grade,
      subject,
      questionCount,
      timePerQuestion
    };

    onStartGame(p1, p2, settings, useAi);
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Intro Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Users className="w-3.5 h-3.5 text-blue-600" /> Mode 1 VS 1 (Satu Perangkat)
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          {schoolProfile.schoolName} 🏆
        </h2>
        <p className="text-indigo-600 font-black text-lg sm:text-2xl mt-1 tracking-wide">
          {schoolProfile.className} • Pengampu: {schoolProfile.teacherName}
        </p>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-2 font-medium">
          Adu cepat dan tepat menjawab soal Kurikulum Merdeka! Dapatkan bonus streak dan kalahkan lawanmu di layar bersama.
        </p>

        {/* Quick Edit School & Student Roster Button */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onOpenSchoolSettings();
            }}
            id="edit-school-setup-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-indigo-50 border-2 border-indigo-200 hover:border-indigo-400 text-indigo-700 text-xs sm:text-sm font-extrabold shadow-xs transition-all transform active:scale-95"
          >
            <School className="w-4 h-4 text-indigo-600" />
            <span>Ganti Sekolah & Input Siswa ({studentList.length} Siswa)</span>
            <Edit3 className="w-3.5 h-3.5 text-indigo-500 ml-0.5" />
          </button>
        </div>

        <div className="mt-3 inline-block bg-amber-100/90 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-2xl shadow-xs">
          ⚡ <strong>Aturan Poin:</strong> Pemain yang <u>menjawab benar duluan</u> yang mendapat poin. Pemain yang lambat (meski benar atau salah) tidak mendapat poin!
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Profil Pemain */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Player 1 Card */}
          <div className="bg-gradient-to-b from-blue-50 to-cyan-50/50 border-2 border-blue-200 rounded-3xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white font-black text-[10px] tracking-wider uppercase px-3 py-1 rounded-bl-xl shadow-xs">
              PEMAIN 1 (KIRI)
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl bg-white p-2.5 rounded-2xl shadow-xs border border-blue-100">
                {p1Avatar}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="p1-name-input" className="block text-xs font-bold text-blue-900 uppercase">Nama Pemain 1</label>
                  <button
                    type="button"
                    onClick={randomizeP1Name}
                    title="Acak nama dari daftar siswa"
                    className="text-[11px] font-extrabold text-blue-700 hover:text-blue-900 bg-blue-100 hover:bg-blue-200 px-2 py-0.5 rounded-md flex items-center gap-1 transition-all"
                  >
                    <Shuffle className="w-3 h-3" /> Acak Nama
                  </button>
                </div>
                <input
                  id="p1-name-input"
                  type="text"
                  maxLength={20}
                  value={p1Name}
                  onChange={(e) => setP1Name(e.target.value)}
                  className="font-bold text-slate-800 bg-white border border-blue-300 rounded-xl px-3 py-1.5 text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Nama Pemain 1"
                />
              </div>
            </div>

            {/* Quick Name Chips for P1 */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] font-extrabold text-blue-900">Pilih dari siswa {schoolProfile.className}:</p>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onOpenSchoolSettings();
                  }}
                  className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" /> Input Siswa
                </button>
              </div>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 bg-white/60 border border-blue-200/60 rounded-xl">
                {studentList.map((name) => (
                  <button
                    key={`p1-chip-${name}`}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setP1Name(name);
                    }}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border transition-all ${
                      p1Name === name
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white hover:bg-blue-100 text-slate-700 border-blue-200'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-blue-900 mb-2">Pilih Avatar:</p>
              <div className="flex flex-wrap gap-2">
                {AVATAR_LIST.map((emoji) => (
                  <button
                    key={`p1-${emoji}`}
                    type="button"
                    onClick={() => setP1Avatar(emoji)}
                    className={`w-9 h-9 text-lg rounded-xl flex items-center justify-center transition-transform ${
                      p1Avatar === emoji
                        ? 'bg-blue-600 text-white scale-110 shadow-md ring-2 ring-blue-400 ring-offset-1'
                        : 'bg-white hover:bg-blue-100 text-slate-700 border border-blue-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-200/60 flex items-center justify-between text-xs text-blue-800 font-semibold">
              <span>Kontrol Keyboard:</span>
              <span className="bg-blue-200/80 px-2.5 py-1 rounded-lg font-mono font-extrabold text-blue-900">
                Tombol [ A ] [ S ] [ D ] [ F ]
              </span>
            </div>
          </div>

          {/* Player 2 Card */}
          <div className="bg-gradient-to-b from-orange-50 to-amber-50/50 border-2 border-orange-200 rounded-3xl p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-600 text-white font-black text-[10px] tracking-wider uppercase px-3 py-1 rounded-bl-xl shadow-xs">
              PEMAIN 2 (KANAN)
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl bg-white p-2.5 rounded-2xl shadow-xs border border-orange-100">
                {p2Avatar}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="p2-name-input" className="block text-xs font-bold text-orange-900 uppercase">Nama Pemain 2</label>
                  <button
                    type="button"
                    onClick={randomizeP2Name}
                    title="Acak nama dari daftar siswa"
                    className="text-[11px] font-extrabold text-orange-700 hover:text-orange-900 bg-orange-100 hover:bg-orange-200 px-2 py-0.5 rounded-md flex items-center gap-1 transition-all"
                  >
                    <Shuffle className="w-3 h-3" /> Acak Nama
                  </button>
                </div>
                <input
                  id="p2-name-input"
                  type="text"
                  maxLength={20}
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  className="font-bold text-slate-800 bg-white border border-orange-300 rounded-xl px-3 py-1.5 text-sm w-full focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Nama Pemain 2"
                />
              </div>
            </div>

            {/* Quick Name Chips for P2 */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[11px] font-extrabold text-orange-900">Pilih dari siswa {schoolProfile.className}:</p>
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    onOpenSchoolSettings();
                  }}
                  className="text-[10px] text-orange-600 font-bold hover:underline flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" /> Input Siswa
                </button>
              </div>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 bg-white/60 border border-orange-200/60 rounded-xl">
                {studentList.map((name) => (
                  <button
                    key={`p2-chip-${name}`}
                    type="button"
                    onClick={() => {
                      soundFx.playClick();
                      setP2Name(name);
                    }}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border transition-all ${
                      p2Name === name
                        ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                        : 'bg-white hover:bg-orange-100 text-slate-700 border-orange-200'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-orange-900 mb-2">Pilih Avatar:</p>
              <div className="flex flex-wrap gap-2">
                {AVATAR_LIST.map((emoji) => (
                  <button
                    key={`p2-${emoji}`}
                    type="button"
                    onClick={() => setP2Avatar(emoji)}
                    className={`w-9 h-9 text-lg rounded-xl flex items-center justify-center transition-transform ${
                      p2Avatar === emoji
                        ? 'bg-orange-600 text-white scale-110 shadow-md ring-2 ring-orange-400 ring-offset-1'
                        : 'bg-white hover:bg-orange-100 text-slate-700 border border-orange-100'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-orange-200/60 flex items-center justify-between text-xs text-orange-800 font-semibold">
              <span>Kontrol Keyboard:</span>
              <span className="bg-orange-200/80 px-2.5 py-1 rounded-lg font-mono font-extrabold text-orange-900">
                Tombol [ J ] [ K ] [ L ] [ ; ]
              </span>
            </div>
          </div>
        </div>

        {/* Step 2: Pilih Kelas SD (Kurikulum Merdeka) */}
        <div className="bg-white border-2 border-indigo-200/80 rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
              <span className="w-7 h-7 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-xs">🎒</span>
              Pilih Kelas SD (Kurikulum Merdeka)
            </h3>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full self-start sm:self-auto">
              Soal Otomatis Sesuai Kurikulum Kelas {grade}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {GRADE_LIST.map((g) => {
              const isSelected = grade === g.grade;
              return (
                <button
                  key={`grade-btn-${g.grade}`}
                  type="button"
                  id={`select-grade-${g.grade}`}
                  onClick={() => {
                    soundFx.playClick();
                    setGrade(g.grade);
                  }}
                  className={`p-3 rounded-2xl text-center transition-all border-2 relative flex flex-col items-center justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-gradient-to-b from-indigo-50 to-purple-50/60 shadow-md ring-2 ring-indigo-500/20 scale-[1.02]'
                      : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {g.phase}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      )}
                    </div>
                    <div className="text-2xl my-1">{g.icon}</div>
                    <div className={`font-black text-sm sm:text-base ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                      {g.label}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                      {g.age}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Grade Highlights description */}
          <div className="mt-3.5 bg-indigo-50/80 border border-indigo-200/80 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-indigo-950 font-medium">
            <span className="text-base shrink-0">💡</span>
            <div>
              <p>
                <strong>Tingkat Materi Kelas {grade} SD:</strong>{' '}
                {GRADE_LIST.find((g) => g.grade === grade)?.description}
              </p>
              <p className="text-[11px] text-indigo-700 mt-0.5">
                Gemini AI dan bank soal bawaan akan menyesuaikan kosakata, kompleksitas angka, dan topik pelajaran agar pas untuk siswa usia {GRADE_LIST.find((g) => g.grade === grade)?.age}.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Pilih Mata Pelajaran */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
              <span className="w-7 h-7 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center text-xs">📚</span>
              Pilih Mata Pelajaran (SD Kelas {grade})
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              Materi disesuaikan untuk siswa Kelas {grade} SD
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentSubjects.map((sub) => {
              const isSelected = subject === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  id={`subject-btn-${sub.id}`}
                  onClick={() => {
                    soundFx.playClick();
                    setSubject(sub.id);
                  }}
                  className={`p-4 rounded-2xl text-left transition-all border-2 relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{sub.icon}</span>
                      {isSelected && (
                        <span className="text-xs bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full">
                          Terpilih
                        </span>
                      )}
                    </div>
                    <div className="font-extrabold text-slate-800 text-sm sm:text-base">
                      {sub.name}
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>


        {/* Step 4: Pengaturan Kuis & Mode AI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Jumlah Soal */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-4">
            <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 mb-2">
              <HelpCircle className="w-4 h-4 text-slate-500" /> Jumlah Soal Ronde
            </label>
            <div className="flex gap-2">
              {[5, 10, 15].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  className={`flex-1 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                    questionCount === count
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {count} Soal
                </button>
              ))}
            </div>
          </div>

          {/* Timer Per Soal */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-4">
            <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5 mb-2">
              <Clock className="w-4 h-4 text-slate-500" /> Waktu Per Soal
            </label>
            <div className="flex gap-2">
              {[20, 30, 40].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimePerQuestion(t)}
                  className={`flex-1 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                    timePerQuestion === t
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {t} Detik
                </button>
              ))}
            </div>
          </div>

          {/* Toggle AI Auto Generator */}
          <div className="bg-gradient-to-tr from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-900 uppercase flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-amber-600" /> AI Auto-Generate
              </label>
              <input
                type="checkbox"
                id="use-ai-toggle"
                checked={useAi}
                onChange={(e) => setUseAi(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-amber-800 font-medium mt-1">
              {useAi
                ? '✨ Menggunakan Gemini AI untuk membuat soal baru yang selalu terupdate!'
                : '⚡ Menggunakan bank soal offline bawaan secara cepat.'}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={isLoading}
            id="start-quiz-submit-btn"
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-extrabold text-lg sm:text-xl rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all transform active:scale-98 flex items-center justify-center gap-3 mx-auto disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                <span>Menyiapkan Soal AI...</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 fill-white" />
                <span>MULAI KUIS 2 PEMAIN</span>
                <Sparkles className="w-5 h-5 text-amber-300" />
              </>
            )}
          </button>
          <p className="text-xs text-slate-500 mt-2 font-semibold">
            Tips: Gunakan keyboard atau sentuh tombol jawaban di masing-masing sisi layar!
          </p>
        </div>
      </form>
    </div>
  );
};
