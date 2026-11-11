import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SchoolProfile } from '../types';
import {
  School,
  GraduationCap,
  Users,
  Plus,
  Trash2,
  RotateCcw,
  Check,
  X,
  Search,
  ArrowUpDown,
  ClipboardList,
  Sparkles,
  User,
  Info
} from 'lucide-react';
import { soundFx } from '../utils/sound';
import { DEFAULT_SCHOOL_PROFILE, parseAndCleanStudentList } from '../utils/schoolStorage';

interface SchoolSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: SchoolProfile;
  onSave: (updatedProfile: SchoolProfile) => void;
}

export const SchoolSettingsModal: React.FC<SchoolSettingsModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'students'>('identity');

  // Form State
  const [schoolName, setSchoolName] = useState(currentProfile.schoolName);
  const [className, setClassName] = useState(currentProfile.className);
  const [defaultGrade, setDefaultGrade] = useState<number>(currentProfile.defaultGrade || 4);
  const [teacherName, setTeacherName] = useState(currentProfile.teacherName);
  const [students, setStudents] = useState<string[]>([...currentProfile.students]);

  // Student management helper states
  const [newStudentName, setNewStudentName] = useState('');
  const [bulkInputText, setBulkInputText] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync on modal open
  React.useEffect(() => {
    if (isOpen) {
      setSchoolName(currentProfile.schoolName);
      setClassName(currentProfile.className);
      setDefaultGrade(currentProfile.defaultGrade || 4);
      setTeacherName(currentProfile.teacherName);
      setStudents([...currentProfile.students]);
      setNewStudentName('');
      setBulkInputText('');
      setShowBulkInput(false);
      setSearchQuery('');
    }
  }, [isOpen, currentProfile]);


  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddSingleStudent = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = newStudentName.trim();
    if (!trimmed) return;

    if (students.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      showToast(`Nama "${trimmed}" sudah ada di dalam daftar!`);
      return;
    }

    soundFx.playClick();
    setStudents((prev) => [...prev, trimmed]);
    setNewStudentName('');
    showToast(`"${trimmed}" berhasil ditambahkan!`);
  };

  const handleRemoveStudent = (nameToRemove: string) => {
    soundFx.playClick();
    setStudents((prev) => prev.filter((s) => s !== nameToRemove));
  };

  const handleApplyBulkInput = (mode: 'append' | 'replace') => {
    const cleaned = parseAndCleanStudentList(bulkInputText);
    if (cleaned.length === 0) {
      showToast('Tidak ada nama valid yang ditemukan. Tempel nama siswa terlebih dahulu.');
      return;
    }

    soundFx.playClick();
    if (mode === 'replace') {
      setStudents(cleaned);
      showToast(`Berhasil mengganti seluruh daftar dengan ${cleaned.length} siswa baru!`);
    } else {
      // Append mode: merge without duplicates
      const seen = new Set(students.map((s) => s.toLowerCase()));
      const toAdd = cleaned.filter((name) => !seen.has(name.toLowerCase()));
      setStudents((prev) => [...prev, ...toAdd]);
      showToast(`Berhasil menambahkan ${toAdd.length} siswa baru!`);
    }

    setBulkInputText('');
    setShowBulkInput(false);
  };

  const handleSortAZ = () => {
    soundFx.playClick();
    setStudents((prev) => [...prev].sort((a, b) => a.localeCompare(b, 'id')));
    showToast('Daftar siswa diurutkan A-Z.');
  };

  const handleClearAllStudents = () => {
    if (confirm('Yakin ingin mengosongkan seluruh daftar siswa?')) {
      soundFx.playClick();
      setStudents([]);
      showToast('Seluruh daftar siswa telah dikosongkan.');
    }
  };

  const handleResetToDefault = () => {
    if (confirm('Kembalikan ke pengaturan bawaan (SD Negeri 047 Tarakan & Kelas 4. A Bais)?')) {
      soundFx.playClick();
      setSchoolName(DEFAULT_SCHOOL_PROFILE.schoolName);
      setClassName(DEFAULT_SCHOOL_PROFILE.className);
      setDefaultGrade(DEFAULT_SCHOOL_PROFILE.defaultGrade || 4);
      setTeacherName(DEFAULT_SCHOOL_PROFILE.teacherName);
      setStudents([...DEFAULT_SCHOOL_PROFILE.students]);
      showToast('Pengaturan dikembalikan ke SDN 047 Tarakan.');
    }
  };

  const handleSaveAll = () => {
    const finalSchool = schoolName.trim() || 'SD Negeri Saya';
    const finalClass = className.trim() || `Kelas ${defaultGrade}`;
    const finalTeacher = teacherName.trim() || 'Guru';
    const finalStudents = students.length > 0 ? students : ['Pemain 1', 'Pemain 2'];

    soundFx.playVictory();
    onSave({
      schoolName: finalSchool,
      className: finalClass,
      teacherName: finalTeacher,
      students: finalStudents,
      defaultGrade: (defaultGrade as any),
    });
    onClose();
  };


  const filteredStudents = students.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  const previewDetectedBulkCount = parseAndCleanStudentList(bulkInputText).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center font-bold text-xl border border-white/20">
              🏫
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                Kustomisasi Sekolah & Siswa
              </h3>
              <p className="text-blue-100 text-xs font-medium">
                Sesuaikan untuk sekolah, rombel kelas, dan daftar peserta didik Anda
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            title="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 pt-2">
          <button
            onClick={() => setActiveTab('identity')}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-extrabold border-b-2 transition-all ${
              activeTab === 'identity'
                ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <School className="w-4 h-4" />
            <span>Identitas Sekolah & Guru</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-2 py-3 px-4 text-xs sm:text-sm font-extrabold border-b-2 transition-all ${
              activeTab === 'students'
                ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-xl shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Daftar Siswa ({students.length})</span>
          </button>
        </div>

        {/* Toast feedback notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-indigo-600 text-white text-xs font-bold px-6 py-2 flex items-center justify-between"
            >
              <span>{toastMessage}</span>
              <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'identity' && (
            <div className="space-y-5">
              {/* Info banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Bisa digunakan oleh sekolah mana saja!</strong>
                  <p className="mt-0.5 text-blue-700">
                    Ubah nama sekolah, nama kelas, dan nama guru pengampu agar otomatis tercetak di header aplikasi, banner permainan, dan sertifikat pemenang kuis.
                  </p>
                </div>
              </div>

              {/* Input Nama Sekolah */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <School className="w-4 h-4 text-indigo-600" /> Nama Sekolah
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="Contoh: SD Negeri 047 Tarakan atau SD Harapan 1"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 font-bold text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
                  maxLength={60}
                />
              </div>

              {/* Tingkat Kelas Bawaan */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-indigo-600" /> Tingkat Kelas SD (1 - 6)
                  </label>
                  <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                    Kelas {defaultGrade} SD
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5, 6].map((g) => (
                    <button
                      key={`modal-grade-btn-${g}`}
                      type="button"
                      onClick={() => {
                        soundFx.playClick();
                        setDefaultGrade(g);
                        if (!className || className.startsWith('Kelas ')) {
                          setClassName(`Kelas ${g}`);
                        }
                      }}
                      className={`py-2 px-1 text-center rounded-xl font-black text-xs transition-all border-2 ${
                        defaultGrade === g
                          ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs scale-102'
                          : 'border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      Kelas {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Nama Kelas & Guru */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-indigo-600" /> Nama Rombel / Label Kelas
                  </label>
                  <input
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder="Contoh: Kelas 4. A Bais"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 font-bold text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
                    maxLength={35}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-indigo-600" /> Nama Guru / Pengampu
                  </label>
                  <input
                    type="text"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="Contoh: ujangil atau Ibu Guru Ratna"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 font-bold text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all"
                    maxLength={35}
                  />
                </div>
              </div>


              {/* Live Preview Card */}
              <div className="border-2 border-indigo-100 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-blue-50/40 rounded-2xl p-4">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-800 block mb-2">
                  Pratinjau Banner Utama Kuis:
                </span>
                <div className="bg-white rounded-xl p-4 border border-indigo-200/60 shadow-xs text-center">
                  <h4 className="text-xl sm:text-2xl font-black text-slate-800">
                    {schoolName.trim() || 'Nama Sekolah'} 🏆
                  </h4>
                  <p className="text-indigo-600 font-extrabold text-sm sm:text-base mt-1">
                    {className.trim() || 'Kelas'} • Pengampu: {teacherName.trim() || 'Guru'}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Adu cepat dan tepat menjawab soal Kurikulum Merdeka!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-5">
              {/* Form Tambah Siswa Tunggal */}
              <form onSubmit={handleAddSingleStudent} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Ketik nama siswa lalu tekan Enter..."
                    className="w-full pl-4 pr-3 py-2.5 rounded-xl border-2 border-slate-200 font-bold text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none text-sm"
                    maxLength={30}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!newStudentName.trim()}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-1.5 shadow-xs shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Siswa</span>
                </button>
              </form>

              {/* Toggle Input Banyak Nama Sekaligus (Excel/Word/WA) */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/60">
                <button
                  type="button"
                  onClick={() => setShowBulkInput(!showBulkInput)}
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-100/70 transition-all font-bold text-xs sm:text-sm text-slate-800"
                >
                  <div className="flex items-center gap-2 text-indigo-700">
                    <ClipboardList className="w-4 h-4" />
                    <span>Tempel Banyak Nama Sekaligus (dari Excel / Word / WhatsApp)</span>
                  </div>
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                    {showBulkInput ? 'Tutup Panel' : 'Buka Panel Impor'}
                  </span>
                </button>

                {showBulkInput && (
                  <div className="p-4 bg-white border-t border-slate-200 space-y-3">
                    <p className="text-xs text-slate-500 font-medium">
                      Salin 1 kolom nama siswa dari spreadsheet Excel atau daftar bernomor (misal: <em>1. Ahmad, 2. Budi, 3. Siti</em>), lalu tempelkan di kotak bawah ini:
                    </p>
                    <textarea
                      rows={5}
                      value={bulkInputText}
                      onChange={(e) => setBulkInputText(e.target.value)}
                      placeholder={"Contoh:\n1. Budi Santoso\n2. Siti Aminah\n3. Ahmad Fauzan\n4. Rasty"}
                      className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                    />

                    {previewDetectedBulkCount > 0 && (
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                        <span>✨ Terdeteksi {previewDetectedBulkCount} nama siswa valid!</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleApplyBulkInput('append')}
                        disabled={previewDetectedBulkCount === 0}
                        className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Gabungkan ke Daftar yang Ada</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleApplyBulkInput('replace')}
                        disabled={previewDetectedBulkCount === 0}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Ganti Seluruh Daftar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Roster Controls: Search & Sort */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari siswa..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleSortAZ}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-extrabold flex items-center gap-1 border border-slate-200"
                    title="Urutkan alfabetis A ke Z"
                  >
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                    <span>Urutkan A-Z</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearAllStudents}
                    className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-extrabold flex items-center gap-1 border border-rose-200"
                    title="Kosongkan seluruh daftar"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Kosongkan</span>
                  </button>
                </div>
              </div>

              {/* Student Chips Container */}
              <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50/50 min-h-[160px] max-h-[260px] overflow-y-auto">
                {filteredStudents.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-xs font-bold">
                      {students.length === 0
                        ? 'Belum ada siswa yang ditambahkan. Tambahkan siswa di atas!'
                        : 'Tidak ada siswa yang cocok dengan pencarian.'}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {filteredStudents.map((student, idx) => (
                      <div
                        key={`std-${student}-${idx}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-extrabold shadow-2xs hover:border-indigo-300 group transition-all"
                      >
                        <span className="text-[10px] text-slate-400 font-mono">
                          {idx + 1}.
                        </span>
                        <span>{student}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveStudent(student)}
                          title={`Hapus ${student}`}
                          className="w-4 h-4 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-all ml-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-500 font-medium">
                💡 Nama-nama siswa di atas akan otomatis muncul sebagai pilihan cepat dan tombol "Acak Nama" saat memilih Pemain 1 dan Pemain 2.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-slate-200 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Kembalikan ke Bawaan (SDN 047)</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              id="save-school-profile-btn"
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-extrabold shadow-md shadow-indigo-500/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Simpan & Terapkan</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
