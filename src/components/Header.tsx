import React from 'react';
import { Volume2, VolumeX, RotateCcw, Sparkles, School } from 'lucide-react';
import { soundFx } from '../utils/sound';
import { SchoolProfile } from '../types';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetGame: () => void;
  gamePhase: string;
  schoolProfile: SchoolProfile;
  onOpenSchoolSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onResetGame,
  gamePhase,
  schoolProfile,
  onOpenSchoolSettings,
}) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 px-3 sm:px-4 py-2.5 sm:py-3 shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-bold text-lg sm:text-xl shrink-0">
            ⚡
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-slate-800 text-base sm:text-lg tracking-tight leading-none truncate">
                quis bais by {schoolProfile.teacherName}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300/60 px-2 py-0.5 rounded-full shrink-0">
                <Sparkles className="w-3 h-3 text-amber-600" /> AI Dinamis
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
              <span className="font-semibold text-indigo-700">{schoolProfile.schoolName}</span> ({schoolProfile.className})
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => {
              soundFx.playClick();
              onOpenSchoolSettings();
            }}
            id="open-school-settings-btn"
            title="Kustomisasi Nama Sekolah & Siswa"
            className="px-2.5 sm:px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <School className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline">Sekolah & Siswa</span>
          </button>
          <button
            onClick={onToggleSound}
            id="toggle-sound-btn"
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
              soundEnabled
                ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span className="hidden md:inline">Suara: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden md:inline">Suara: OFF</span>
              </>
            )}
          </button>

          {gamePhase !== 'setup' && (
            <button
              onClick={() => {
                soundFx.playClick();
                onResetGame();
              }}
              id="reset-game-btn"
              title="Kembali ke Pengaturan Utama"
              className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Ulangi Setup</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
