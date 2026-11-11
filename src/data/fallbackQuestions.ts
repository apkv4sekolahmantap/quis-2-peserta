import { Question, SubjectId, SubjectInfo, GradeLevel, GradeInfo } from '../types';

export const GRADE_LIST: GradeInfo[] = [
  {
    grade: 1,
    label: 'Kelas 1',
    phase: 'Fase A',
    age: '6-7 Thn',
    icon: '🌱',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Bilangan 1-20, Panca Indera, Huruf & Kata, Aturan Rumah, Doa Harian'
  },
  {
    grade: 2,
    label: 'Kelas 2',
    phase: 'Fase A',
    age: '7-8 Thn',
    icon: '🌿',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Bilangan s/d 100, Membaca Jam, Bagian Tanaman & Hewan, Simbol Sila'
  },
  {
    grade: 3,
    label: 'Kelas 3',
    phase: 'Fase B',
    age: '8-9 Thn',
    icon: '🍀',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    description: 'Perkalian/Pembagian, Pecahan, Daur Hidup Hewan, Hak & Kewajiban'
  },
  {
    grade: 4,
    label: 'Kelas 4',
    phase: 'Fase B',
    age: '9-10 Thn',
    icon: '⭐',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Bilangan Cacah Besar, FPB/KPK, Gaya & Gerak, Gagasan Pokok, Pantun'
  },
  {
    grade: 5,
    label: 'Kelas 5',
    phase: 'Fase C',
    age: '10-11 Thn',
    icon: '🚀',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Pecahan Desimal/Persen, Volume Kubus, Organ Tubuh, Rantai Makanan'
  },
  {
    grade: 6,
    label: 'Kelas 6',
    phase: 'Fase C',
    age: '11-12 Thn',
    icon: '🏆',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Bilangan Bulat, Lingkaran, Tata Surya, Teks LHO, Sejarah & ASEAN'
  }
];

export function getSubjectsForGrade(grade: GradeLevel): SubjectInfo[] {
  const gradeDescriptions: Record<GradeLevel, Record<SubjectId, string>> = {
    1: {
      campuran: 'Semua Mapel SD Kelas 1 (Fase A: Matematika, IPAS, B. Indonesia, PKn, PAI)',
      matematika: 'Mengenal Angka 1-20, Penjumlahan & Pengurangan Sederhana, Bentuk Bangun',
      ipas: 'Tubuh Kita & Panca Indera, Menjaga Kebersihan Diri, Benda Hidup di Sekitar',
      bahasa_indonesia: 'Mengenal Huruf Vokal/Konsonan, Mengeja Suku Kata, Kata Pendek',
      pkn: 'Lambang Garuda Pancasila, Aturan di Rumah & Sekolah, Hidup Rukun',
      pai: 'Huruf Hijaiyah Dasar, Rukun Iman Pertama, Doa Sehari-hari, Berkata Jujur'
    },
    2: {
      campuran: 'Semua Mapel SD Kelas 2 (Fase A: Hitungan 100, Waktu, Bagian Tumbuhan & Sila)',
      matematika: 'Bilangan Cacah s/d 100, Penjumlahan Bersusun, Membaca Jam Analog',
      ipas: 'Bagian Tubuh Hewan & Tumbuhan, Siklus Siang-Malam, Cuaca Harian',
      bahasa_indonesia: 'Kalimat Tanya (Apa, Siapa, Di mana), Tanda Baca, Dongeng Pendek',
      pkn: '5 Simbol Sila Pancasila pada Perisai Garuda, Gotong Royong Kelas',
      pai: 'Rukun Islam (5 Perkara), Shalat Fardhu 5 Waktu, Asmaul Husna Dasar'
    },
    3: {
      campuran: 'Semua Mapel SD Kelas 3 (Fase B: Perkalian, Pecahan, Daur Hidup & Hak/Kewajiban)',
      matematika: 'Bilangan s/d 1.000, Perkalian & Pembagian Dasar, Pecahan 1/2, 1/3, 1/4',
      ipas: 'Ciri Makhluk Hidup, Metamorfosis Katak/Kupu-kupu, Wujud Zat & Energi',
      bahasa_indonesia: 'Ide Pokok Paragraf, Dongeng Fabel Nusantara, Kata Hubung & Antonim',
      pkn: 'Pengamalan Sila 1-3, Hak & Kewajiban Anak, Bhinneka Tunggal Ika',
      pai: 'Mengenal Kitab Suci Allah, Kisah Nabi Ibrahim & Ismail, Shalat Berjamaah'
    },
    4: {
      campuran: 'Semua Mapel SD Kelas 4 (Fase B: Bilangan Besar, Gaya, Gagasan Pokok, Norma)',
      matematika: 'Bilangan Cacah Besar (Jutaan/Miliaran), Nilai Tempat, FPB & KPK, Luas Bangun',
      ipas: 'Wujud Benda & Perubahannya, Gaya Gravitasi/Gesek, Fotosintesis, Panca Indera',
      bahasa_indonesia: 'Gagasan Pokok & Pendukung, Kata Baku KBBI, Sinonim/Antonim, Pantun',
      pkn: 'Makna 5 Sila Pancasila, Musyawarah Mufakat, Norma & Aturan Masyarakat',
      pai: 'Rukun Iman Lengkap, Kisah Nabi Muhammad Al-Amin, Tugas Malaikat'
    },
    5: {
      campuran: 'Semua Mapel SD Kelas 5 (Fase C: Pecahan Desimal/Persen, Organ Tubuh & NKRI)',
      matematika: 'Operasi Pecahan & Persen, Skala Denah, Volume Kubus & Balok (s³ / p×l×t)',
      ipas: 'Sistem Pernapasan & Pencernaan Manusia, Rantai Makanan, Listrik & Kalor',
      bahasa_indonesia: 'Teks Eksplanasi Ilmiah, Imbuhan (me-, pe-an), Pidato, Surat Resmi',
      pkn: 'Nilai Luhur Pancasila Berbangsa, Menjaga Keutuhan NKRI, Keragaman Budaya',
      pai: 'Hari Akhir (Kiamat), Zakat Fitrah & Mal, Kisah Khulafaur Rasyidin'
    },
    6: {
      campuran: 'Semua Mapel SD Kelas 6 (Fase C: Bilangan Bulat, Lingkaran, Tata Surya, ASEAN)',
      matematika: 'Bilangan Bulat Negatif/Positif, Rumus Lingkaran (πr²), Rata-rata (Mean/Modus)',
      ipas: 'Perkembangbiakan Generatif/Vegetatif, Tata Surya & Planet, Rotasi/Revolusi',
      bahasa_indonesia: 'Teks Laporan Hasil Pengamatan (LHO), Formulir, Pidato Perpisahan',
      pkn: 'Sejarah Perjuangan Kemerdekaan (BPUPKI/PPKI), Cinta Produk Lokal, ASEAN',
      pai: 'Qada dan Qadar Allah SWT, Puasa Ramadhan & Sunnah, Dakwah Walisongo'
    }
  };

  const curr = gradeDescriptions[grade] || gradeDescriptions[4];

  return [
    {
      id: 'campuran',
      name: 'Campuran (Semua Mapel)',
      icon: '🎲',
      color: 'from-purple-500 to-indigo-600',
      description: curr.campuran
    },
    {
      id: 'matematika',
      name: 'Matematika',
      icon: '🧮',
      color: 'from-blue-500 to-cyan-600',
      description: curr.matematika
    },
    {
      id: 'ipas',
      name: 'IPAS (Sains & Sosial)',
      icon: '🌿',
      color: 'from-emerald-500 to-teal-600',
      description: curr.ipas
    },
    {
      id: 'bahasa_indonesia',
      name: 'Bahasa Indonesia',
      icon: '📚',
      color: 'from-amber-500 to-orange-600',
      description: curr.bahasa_indonesia
    },
    {
      id: 'pkn',
      name: 'Pendidikan Pancasila (PKn)',
      icon: '🇲🇨',
      color: 'from-red-500 to-rose-600',
      description: curr.pkn
    },
    {
      id: 'pai',
      name: 'Pendidikan Agama Islam (PAI)',
      icon: '🕌',
      color: 'from-teal-500 to-emerald-600',
      description: curr.pai
    }
  ];
}

export const SUBJECTS: SubjectInfo[] = getSubjectsForGrade(4);

export const FALLBACK_QUESTIONS: Question[] = [
  // ==========================================
  // KELAS 1 SD (FASE A - USIA 6-7 TAHUN)
  // ==========================================
  // --- Matematika Kelas 1 ---
  {
    id: 'g1_m1',
    grade: 1,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Berapakah hasil dari penjumlahan 7 + 5?',
    options: ['12', '11', '13', '10'],
    correctIndex: 0,
    explanation: '7 ditambah 5 menghasilkan 12.'
  },
  {
    id: 'g1_m2',
    grade: 1,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Benda di bawah ini yang permukaannya berbentuk lingkaran adalah...',
    options: ['Uang koin', 'Buku tulis', 'Penggaris lurus', 'Pintu kamar'],
    correctIndex: 0,
    explanation: 'Uang koin berbentuk bulat lingkaran.'
  },
  {
    id: 'g1_m3',
    grade: 1,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Ibu memiliki 10 buah pisang. Diberikan kepada adik 4 buah. Sisa pisang ibu adalah...',
    options: ['6 buah', '5 buah', '7 buah', '4 buah'],
    correctIndex: 0,
    explanation: '10 dikurangi 4 adalah 6.'
  },
  {
    id: 'g1_m4',
    grade: 1,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Bilangan yang terletak tepat di antara angka 14 dan 16 adalah...',
    options: ['15', '13', '17', '18'],
    correctIndex: 0,
    explanation: 'Urutan bilangan: 14, 15, 16. Jadi di antaranya adalah 15.'
  },
  {
    id: 'g1_m5',
    grade: 1,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Doni mempunyai 8 kelereng. Ayah memberi Doni 6 kelereng lagi. Jumlah kelereng Doni sekarang adalah...',
    options: ['14 kelereng', '12 kelereng', '15 kelereng', '13 kelereng'],
    correctIndex: 0,
    explanation: '8 + 6 = 14 kelereng.'
  },
  {
    id: 'g1_m6',
    grade: 1,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Perbandingan yang benar antara 15 buku dan 11 buku adalah...',
    options: ['15 buku lebih banyak dari 11 buku', '15 buku lebih sedikit dari 11 buku', '15 buku sama banyak dengan 11 buku', '11 buku lebih banyak dari 15 buku'],
    correctIndex: 0,
    explanation: 'Angka 15 lebih besar nilainya daripada angka 11.'
  },
  // --- IPAS Kelas 1 ---
  {
    id: 'g1_i1',
    grade: 1,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Bagian tubuh yang kita gunakan untuk melihat keindahan pemandangan alam adalah...',
    options: ['Mata', 'Telinga', 'Hidung', 'Lidah'],
    correctIndex: 0,
    explanation: 'Mata adalah panca indera penglihatan.'
  },
  {
    id: 'g1_i2',
    grade: 1,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Agar kuman penyakit di tangan hilang sebelum makan, kita wajib mencuci tangan menggunakan...',
    options: ['Air bersih dan sabun', 'Minyak goreng', 'Kain kotor', 'Air kopi'],
    correctIndex: 0,
    explanation: 'Sabun dan air mengalir efektif membunuh kuman pada tangan.'
  },
  {
    id: 'g1_i3',
    grade: 1,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Contoh benda hidup (makhluk hidup) di halaman rumah adalah...',
    options: ['Kucing dan pohon mangga', 'Batu dan pasir', 'Sepeda dan mobil', 'Pagar besi'],
    correctIndex: 0,
    explanation: 'Kucing dan tanaman bernapas dan tumbuh, sehingga termasuk makhluk hidup.'
  },
  {
    id: 'g1_i4',
    grade: 1,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Bagian tubuh kita yang berguna untuk mendengarkan suara nasihat guru adalah...',
    options: ['Telinga', 'Hidung', 'Mata', 'Pipi'],
    correctIndex: 0,
    explanation: 'Telinga adalah indera pendengar.'
  },
  {
    id: 'g1_i5',
    grade: 1,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Gigi kita harus digosok secara teratur yaitu saat...',
    options: ['Pagi hari setelah sarapan dan malam sebelum tidur', 'Hanya seminggu sekali', 'Saat sedang bermain bola', 'Hanya saat sakit gigi'],
    correctIndex: 0,
    explanation: 'Menggosok gigi 2 kali sehari mencegah gigi berlubang.'
  },
  // --- Bahasa Indonesia Kelas 1 ---
  {
    id: 'g1_b1',
    grade: 1,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Huruf vokal pada kata "S E P A T U" adalah...',
    options: ['E, A, dan U', 'S, P, dan T', 'Semua huruf vokal', 'Hanya huruf U'],
    correctIndex: 0,
    explanation: 'Huruf vokal terdiri dari A, I, U, E, O.'
  },
  {
    id: 'g1_b2',
    grade: 1,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Suku kata awal dari kata "B O L A" adalah...',
    options: ['Bo-', 'La-', 'Ba-', 'Lo-'],
    correctIndex: 0,
    explanation: 'Kata BOLA dieja Bo - la.'
  },
  {
    id: 'g1_b3',
    grade: 1,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Tanda baca yang diletakkan pada akhir kalimat berita adalah tanda...',
    options: ['Titik (.)', 'Tanya (?)', 'Seru (!)', 'Koma (,)'],
    correctIndex: 0,
    explanation: 'Kalimat berita diakhiri dengan tanda titik (.).'
  },
  {
    id: 'g1_b4',
    grade: 1,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Kalimat sapaan yang ramah saat bertemu teman di pagi hari adalah...',
    options: ['"Selamat pagi, teman-teman!"', '"Jangan dekati aku!"', '"Cepat pergi!"', '"Aku mau tidur!"'],
    correctIndex: 0,
    explanation: 'Menyapa "Selamat pagi" adalah bentuk keramahan.'
  },
  {
    id: 'g1_b5',
    grade: 1,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Hewan berkaki empat yang bersuara "meong-meong" adalah...',
    options: ['Kucing', 'Ayam', 'Kambing', 'Bebek'],
    correctIndex: 0,
    explanation: 'Kucing bersuara meong.'
  },
  // --- PKn Kelas 1 ---
  {
    id: 'g1_p1',
    grade: 1,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Warna bendera kebangsaan negara Indonesia adalah...',
    options: ['Merah dan Putih', 'Merah dan Kuning', 'Putih dan Biru', 'Hijau dan Putih'],
    correctIndex: 0,
    explanation: 'Bendera Republik Indonesia adalah Sang Saka Merah Putih.'
  },
  {
    id: 'g1_p2',
    grade: 1,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Burung gagah yang menjadi lambang negara Indonesia adalah...',
    options: ['Burung Garuda Pancasila', 'Burung Merpati', 'Burung Elang Jawa', 'Burung Cenderawasih'],
    correctIndex: 0,
    explanation: 'Lambang negara kita adalah Garuda Pancasila.'
  },
  {
    id: 'g1_p3',
    grade: 1,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Saat teman memberikan bantuan meminjamkan pensil, ucapan yang tepat adalah...',
    options: ['"Terima kasih, teman"', '"Tidak mau"', '"Ini kurang bagus"', '"Biar saja"'],
    correctIndex: 0,
    explanation: 'Mengucapkan terima kasih adalah tanda menghargai kebaikan teman.'
  },
  {
    id: 'g1_p4',
    grade: 1,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Setelah selesai bermain di rumah, mainan sebaiknya...',
    options: ['Dirapikan kembali ke tempatnya', 'Dibiarkan di lantai', 'Dilempar ke halaman', 'Disembunyikan'],
    correctIndex: 0,
    explanation: 'Merapikan mainan adalah contoh tertib dan disiplin di rumah.'
  },
  {
    id: 'g1_p5',
    grade: 1,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Sikap yang baik terhadap teman di kelas adalah...',
    options: ['Saling menyayangi dan berbagi', 'Mengejek teman', 'Memusuhi teman', 'Berebut mainan'],
    correctIndex: 0,
    explanation: 'Hidup rukun dengan teman membuat suasana belajar nyaman dan gembira.'
  },
  // --- PAI Kelas 1 ---
  {
    id: 'g1_pai1',
    grade: 1,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Sebelum memulai makan dan minum, kita dianjurkan membaca...',
    options: ['Doa sebelum makan / Basmalah', 'Lagu tidur', 'Dongeng fabel', 'Puisi'],
    correctIndex: 0,
    explanation: 'Membaca basmalah atau doa makan mendatangkan keberkahan rezeki.'
  },
  {
    id: 'g1_pai2',
    grade: 1,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Huruf hijaiyah yang paling pertama adalah huruf...',
    options: ['Alif (ا)', 'Ba (ب)', 'Ta (ت)', 'Jim (ج)'],
    correctIndex: 0,
    explanation: 'Huruf pertama dalam abjad hijaiyah adalah Alif.'
  },
  {
    id: 'g1_pai3',
    grade: 1,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Rukun Iman yang pertama adalah beriman kepada...',
    options: ['Allah SWT', 'Malaikat', 'Kitab Suci', 'Hari Kiamat'],
    correctIndex: 0,
    explanation: 'Rukun Iman pertama adalah meyakini bahwa Allah SWT adalah Tuhan Yang Maha Esa.'
  },
  {
    id: 'g1_pai4',
    grade: 1,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Setelah selesai makan atau mendapatkan nikmat, ucapan rasa syukur kita adalah...',
    options: ['"Alhamdulillah"', '"Astaghfirullah"', '"Innalillahi"', '"Subhanallah"'],
    correctIndex: 0,
    explanation: 'Kalimat Alhamdulillah artinya Segala puji bagi Allah.'
  },
  {
    id: 'g1_pai5',
    grade: 1,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Perilaku selalu berkata yang sebenarnya dan tidak suka berbohong dinamakan...',
    options: ['Jujur', 'Sombong', 'Kikir', 'Pemalas'],
    correctIndex: 0,
    explanation: 'Jujur adalah akhlak mulia yang dicintai Allah dan sesama manusia.'
  },

  // ==========================================
  // KELAS 2 SD (FASE A - USIA 7-8 TAHUN)
  // ==========================================
  // --- Matematika Kelas 2 ---
  {
    id: 'g2_m1',
    grade: 2,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Berapakah hasil dari 48 + 27?',
    options: ['75', '65', '74', '85'],
    correctIndex: 0,
    explanation: '48 + 27 = 75.'
  },
  {
    id: 'g2_m2',
    grade: 2,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Jarum panjang menunjuk angka 12, jarum pendek menunjuk angka 8. Pukul berapakah jam tersebut?',
    options: ['Pukul 08.00 tepat', 'Pukul 12.08', 'Pukul 08.30', 'Pukul 12.00'],
    correctIndex: 0,
    explanation: 'Jika jarum panjang di 12 dan pendek di 8, maka jam menunjukkan pukul 08.00 tepat.'
  },
  {
    id: 'g2_m3',
    grade: 2,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Nilai angka 9 pada bilangan 94 adalah...',
    options: ['90 (Puluhan)', '9 (Satuan)', '900 (Ratusan)', '4 (Satuan)'],
    correctIndex: 0,
    explanation: 'Pada bilangan 94, angka 9 berada di nilai tempat puluhan bernilai 90.'
  },
  {
    id: 'g2_m4',
    grade: 2,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Satu buah apel dipotong menjadi dua bagian yang sama besar. Setiap potong bernilai pecahan...',
    options: ['1/2 (Setengah)', '1/4 (Seperempat)', '1/3 (Sepertiga)', '2/1 (Dua)'],
    correctIndex: 0,
    explanation: '1 benda utuh dibagi 2 bagian sama rata bernilai pecahan 1/2.'
  },
  {
    id: 'g2_m5',
    grade: 2,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Hasil pengurangan bersusun dari 85 - 39 adalah...',
    options: ['46', '56', '44', '54'],
    correctIndex: 0,
    explanation: '85 dikurangi 39 adalah 46.'
  },
  {
    id: 'g2_m6',
    grade: 2,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Alat ukur yang tepat untuk mengukur panjang pensil dan buku tulis adalah...',
    options: ['Penggaris sentimeter (cm)', 'Timbangan badan', 'Termometer suhu', 'Gelas ukur'],
    correctIndex: 0,
    explanation: 'Penggaris bersatuan cm digunakan untuk mengukur benda-benda kecil di kelas.'
  },
  // --- IPAS Kelas 2 ---
  {
    id: 'g2_i1',
    grade: 2,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Bagian tumbuhan yang bertugas menyerap air dan mineral dari dalam tanah adalah...',
    options: ['Akar', 'Daun', 'Bunga', 'Batang'],
    correctIndex: 0,
    explanation: 'Akar menancap ke tanah dan menyerap air serta unsur hara.'
  },
  {
    id: 'g2_i2',
    grade: 2,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Bagian tumbuhan yang berfungsi sebagai tempat berlangsungnya proses pembuatan makanan (fotosintesis) adalah...',
    options: ['Daun', 'Akar', 'Batang', 'Biji'],
    correctIndex: 0,
    explanation: 'Daun memiliki zat hijau daun untuk memasak makanan dengan bantuan sinar matahari.'
  },
  {
    id: 'g2_i3',
    grade: 2,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Hewan di bawah ini yang tergolong pemakan rumput atau tumbuhan adalah...',
    options: ['Kambing dan Sapi', 'Singa dan Harimau', 'Buaya dan Komodo', 'Elang dan Serigala'],
    correctIndex: 0,
    explanation: 'Kambing dan sapi adalah hewan pemakan rumput (herbivora).'
  },
  {
    id: 'g2_i4',
    grade: 2,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Benda langit yang menerangi bumi dan memberikan kehangatan pada waktu siang hari adalah...',
    options: ['Matahari', 'Bulan', 'Bintang kejora', 'Komet'],
    correctIndex: 0,
    explanation: 'Matahari adalah sumber cahaya dan panas alami terbesar bumi di siang hari.'
  },
  {
    id: 'g2_i5',
    grade: 2,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Ketika langit dipenuhi awan kelabu tebal dan angin bertiup kencang, tanda bahwa cuaca akan...',
    options: ['Hujan', 'Cerah terik', 'Sangat panas', 'Kemarau panjang'],
    correctIndex: 0,
    explanation: 'Awan mendung kelabu adalah tanda akan turunnya air hujan.'
  },
  // --- Bahasa Indonesia Kelas 2 ---
  {
    id: 'g2_b1',
    grade: 2,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Kata tanya yang tepat untuk menanyakan waktu terjadinya peristiwa adalah...',
    options: ['Kapan', 'Di mana', 'Siapa', 'Berapa'],
    correctIndex: 0,
    explanation: 'Kata "Kapan" digunakan untuk menanyakan waktu.'
  },
  {
    id: 'g2_b2',
    grade: 2,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Tanda baca yang wajib diletakkan di akhir kalimat pertanyaan adalah...',
    options: ['Tanda tanya (?)', 'Tanda seru (!)', 'Tanda titik (.)', 'Tanda koma (,)'],
    correctIndex: 0,
    explanation: 'Kalimat tanya diakhiri dengan tanda tanya (?).'
  },
  {
    id: 'g2_b3',
    grade: 2,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Lawan kata (antonim) dari kata "Terang" adalah...',
    options: ['Gelap', 'Benderang', 'Cerah', 'Silau'],
    correctIndex: 0,
    explanation: 'Lawan kata dari terang adalah gelap.'
  },
  {
    id: 'g2_b4',
    grade: 2,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Kalimat yang menyatakan rasa kagum atau perintah tegas biasanya diakhiri tanda...',
    options: ['Tanda seru (!)', 'Tanda tanya (?)', 'Tanda titik (.)', 'Tanda kurung ()'],
    correctIndex: 0,
    explanation: 'Tanda seru (!) digunakan untuk kalimat seruan, perintah, atau kekaguman.'
  },
  {
    id: 'g2_b5',
    grade: 2,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Cerita dongeng anak yang berisi pesan kebaikan dan menasihati kita agar tidak sombong adalah fabel...',
    options: ['Kancil dan Kura-kura', 'Batu Menangis', 'Danau Toba', 'Sangkuriang'],
    correctIndex: 0,
    explanation: 'Kancil dan Kura-kura mengajarkan bahwa kesombongan akan membawa kekalahan.'
  },
  // --- PKn Kelas 2 ---
  {
    id: 'g2_p1',
    grade: 2,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Simbol sila pertama Pancasila "Ketuhanan Yang Maha Esa" adalah...',
    options: ['Bintang Emas', 'Pohon Beringin', 'Rantai Emas', 'Kepala Banteng'],
    correctIndex: 0,
    explanation: 'Sila ke-1 dilambangkan dengan Bintang Emas.'
  },
  {
    id: 'g2_p2',
    grade: 2,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Simbol sila kedua Pancasila "Kemanusiaan yang Adil dan Beradab" adalah...',
    options: ['Rantai Emas', 'Pohon Beringin', 'Kepala Banteng', 'Padi dan Kapas'],
    correctIndex: 0,
    explanation: 'Sila ke-2 dilambangkan dengan mata rantai gelang emas yang kokoh menyatu.'
  },
  {
    id: 'g2_p3',
    grade: 2,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Kegiatan membersihkan ruang kelas bersama seluruh regu piket adalah wujud dari...',
    options: ['Gotong royong', 'Tawuran', 'Persaingan', 'Perpecahan'],
    correctIndex: 0,
    explanation: 'Gotong royong membersihkan kelas membuat pekerjaan cepat selesai dan kelas jadi bersih.'
  },
  {
    id: 'g2_p4',
    grade: 2,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Sikap kita ketika melihat teman sekelas sedang tertimpa musibah terjatuh adalah...',
    options: ['Segera menolong dan membantunya berdiri', 'Menertawakannya', 'Membiarkannya kesakitan', 'Merekam videonya'],
    correctIndex: 0,
    explanation: 'Menolong teman yang kesusahan adalah cermin nilai kemanusiaan.'
  },
  {
    id: 'g2_p5',
    grade: 2,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Meskipun teman-teman di kelas memiliki suku dan kegemaran yang berbeda, kita harus tetap...',
    options: ['Saling menghormati dan rukun', 'Membeda-bedakan teman', 'Hanya mau berteman dengan yang kaya', 'Membuat kelompok sendiri'],
    correctIndex: 0,
    explanation: 'Menghargai keragaman adalah kunci persatuan bangsa.'
  },
  // --- PAI Kelas 2 ---
  {
    id: 'g2_pai1',
    grade: 2,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Jumlah Rukun Islam yang wajib dilaksanakan oleh setiap muslim ada...',
    options: ['5 Perkara', '6 Perkara', '4 Perkara', '7 Perkara'],
    correctIndex: 0,
    explanation: 'Rukun Islam ada 5: Syahadat, Shalat, Zakat, Puasa, dan Haji.'
  },
  {
    id: 'g2_pai2',
    grade: 2,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Shalat fardhu yang dikerjakan pada waktu fajar sebelum terbit matahari sebanyak 2 rakaat adalah shalat...',
    options: ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib'],
    correctIndex: 0,
    explanation: 'Shalat Subuh berjumlah 2 rakaat dan dikerjakan saat terbit fajar.'
  },
  {
    id: 'g2_pai3',
    grade: 2,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Nama Asmaul Husna "Ar-Rahman" artinya Allah Maha...',
    options: ['Pengasih', 'Penyayang', 'Mendengar', 'Melihat'],
    correctIndex: 0,
    explanation: 'Ar-Rahman berarti Maha Pengasih kepada seluruh makhluk.'
  },
  {
    id: 'g2_pai4',
    grade: 2,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Perilaku menjaga kebersihan badan, pakaian, dan tempat ibadah adalah cerminan dari...',
    options: ['Sebagian dari iman', 'Perilaku pemboros', 'Kesombongan', 'Perilaku sia-sia'],
    correctIndex: 0,
    explanation: 'Kebersihan adalah sebagian dari iman (An-Nazhafatu minal iman).'
  },
  {
    id: 'g2_pai5',
    grade: 2,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Saat berwudhu, kita tidak boleh berlebih-lebihan membuang air karena perilaku boros adalah perbuatan...',
    options: ['Tercela yang dibenci Allah', 'Mulia yang dipuji', 'Wajib hukumnya', 'Sunnah Rasul'],
    correctIndex: 0,
    explanation: 'Islam melarang mubazir (pemborosan) termasuk dalam menggunakan air wudhu.'
  },

  // ==========================================
  // KELAS 3 SD (FASE B - USIA 8-9 TAHUN)
  // ==========================================
  // --- Matematika Kelas 3 ---
  {
    id: 'g3_m1',
    grade: 3,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Berapakah hasil dari perkalian 8 × 9?',
    options: ['72', '64', '81', '76'],
    correctIndex: 0,
    explanation: '8 × 9 = 72.'
  },
  {
    id: 'g3_m2',
    grade: 3,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Berapakah hasil pembagian dari 56 ÷ 7?',
    options: ['8', '7', '9', '6'],
    correctIndex: 0,
    explanation: '56 dibagi 7 adalah 8, karena 8 × 7 = 56.'
  },
  {
    id: 'g3_m3',
    grade: 3,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Sebuah persegi memiliki panjang sisi 8 cm. Berapakah keliling persegi tersebut?',
    options: ['32 cm', '64 cm', '16 cm', '24 cm'],
    correctIndex: 0,
    explanation: 'Keliling persegi = 4 × sisi = 4 × 8 = 32 cm.'
  },
  {
    id: 'g3_m4',
    grade: 3,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Sebuah persegi panjang memiliki panjang 10 cm dan lebar 4 cm. Berapakah luasnya?',
    options: ['40 cm²', '28 cm²', '14 cm²', '44 cm²'],
    correctIndex: 0,
    explanation: 'Luas persegi panjang = panjang × lebar = 10 × 4 = 40 cm².'
  },
  {
    id: 'g3_m5',
    grade: 3,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Pecahan 1/4 dibaca...',
    options: ['Satu per empat / seperempat', 'Empat per satu', 'Satu per dua', 'Tiga per empat'],
    correctIndex: 0,
    explanation: '1/4 dibaca satu per empat atau seperempat.'
  },
  {
    id: 'g3_m6',
    grade: 3,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Nilai angka 7 pada bilangan 753 adalah...',
    options: ['700 (Ratusan)', '70 (Puluhan)', '7 (Satuan)', '7.000 (Ribuan)'],
    correctIndex: 0,
    explanation: 'Pada bilangan 753, angka 7 menempati tempat ratusan dan bernilai 700.'
  },
  // --- IPAS Kelas 3 ---
  {
    id: 'g3_i1',
    grade: 3,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Ciri-ciri makhluk hidup yang menunjukkan adanya pertambahan tinggi dan berat badan dinamakan...',
    options: ['Tumbuh', 'Bernapas', 'Bergerak', 'Berkembang biak'],
    correctIndex: 0,
    explanation: 'Tumbuh adalah proses bertambahnya ukuran, berat, dan tinggi makhluk hidup.'
  },
  {
    id: 'g3_i2',
    grade: 3,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Urutan metamorfosis sempurna pada kupu-kupu yang benar adalah...',
    options: ['Telur -> Ulat (Larva) -> Kepompong (Pupa) -> Kupu-kupu', 'Telur -> Kupu-kupu -> Ulat -> Kepompong', 'Ulat -> Telur -> Kepompong -> Kupu-kupu', 'Kepompong -> Telur -> Ulat -> Kupu-kupu'],
    correctIndex: 0,
    explanation: 'Kupu-kupu mengalami metamorfosis: telur menetas jadi ulat, menjadi kepompong, lalu kupu-kupu dewasa.'
  },
  {
    id: 'g3_i3',
    grade: 3,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Peristiwa es batu yang diletakkan di bawah terik matahari lalu berubah wujud menjadi air dinamakan...',
    options: ['Mencair', 'Membeku', 'Menguap', 'Mengembun'],
    correctIndex: 0,
    explanation: 'Mencair adalah perubahan wujud zat dari padat menjadi cair.'
  },
  {
    id: 'g3_i4',
    grade: 3,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Air laut yang terkena panas matahari menguap ke angkasa lalu membentuk awan. Peristiwa penguapan air dinamakan...',
    options: ['Evaporasi / Menguap', 'Membeku', 'Mencair', 'Menyublim'],
    correctIndex: 0,
    explanation: 'Menguap (evaporasi) adalah perubahan zat cair menjadi gas karena panas.'
  },
  {
    id: 'g3_i5',
    grade: 3,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Sumber energi alami terbesar di bumi yang tidak pernah habis dan ramah lingkungan adalah...',
    options: ['Matahari', 'Batu bara', 'Minyak bumi', 'Bensin'],
    correctIndex: 0,
    explanation: 'Energi surya (matahari) adalah energi terbarukan terbesar di bumi.'
  },
  // --- Bahasa Indonesia Kelas 3 ---
  {
    id: 'g3_b1',
    grade: 3,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Ide pokok atau inti dari pokok bahasan yang terdapat dalam sebuah paragraf disebut...',
    options: ['Gagasan pokok / Pikiran utama', 'Kata sambung', 'Kalimat penutup', 'Huruf kapital'],
    correctIndex: 0,
    explanation: 'Gagasan pokok merupakan inti masalah yang dibahas dalam paragraf.'
  },
  {
    id: 'g3_b2',
    grade: 3,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Lawan kata (antonim) dari kata "Rajin" adalah...',
    options: ['Malas', 'Giat', 'Tekun', 'Pintar'],
    correctIndex: 0,
    explanation: 'Antonim rajin adalah malas.'
  },
  {
    id: 'g3_b3',
    grade: 3,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Sinonim (persamaan kata) dari kata "Elok" adalah...',
    options: ['Indah / Cantik', 'Buruk', 'Kusam', 'Gelap'],
    correctIndex: 0,
    explanation: 'Elok bermakna indah, rupawan, atau permai.'
  },
  {
    id: 'g3_b4',
    grade: 3,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Kata hubung yang menyatakan sebab-akibat yang tepat adalah...',
    options: ['Karena', 'Dan', 'Atau', 'Tetapi'],
    correctIndex: 0,
    explanation: 'Kata "karena" digunakan untuk menyatakan alasan atau sebab.'
  },
  {
    id: 'g3_b5',
    grade: 3,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Ungkapan "Rendah Hati" memiliki makna...',
    options: ['Tidak sombong / ramah', 'Penakut', 'Pendiam', 'Suka pamer'],
    correctIndex: 0,
    explanation: 'Rendah hati artinya tawaduk dan tidak menyombongkan diri.'
  },
  // --- PKn Kelas 3 ---
  {
    id: 'g3_p1',
    grade: 3,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Sesuatu yang mutlak berhak kita terima setelah melaksanakan kewajiban dinamakan...',
    options: ['Hak', 'Kewajiban', 'Hukuman', 'Tugas'],
    correctIndex: 0,
    explanation: 'Hak adalah segala sesuatu yang berhak diterima setelah menjalankan kewajiban.'
  },
  {
    id: 'g3_p2',
    grade: 3,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Contoh kewajiban utama seorang anak saat berada di sekolah adalah...',
    options: ['Belajar dengan tekun dan mematuhi tata tertib', 'Bermain game di kelas saat jam pelajaran', 'Mencoret-coret meja sekolah', 'Meninggalkan kelas tanpa izin'],
    correctIndex: 0,
    explanation: 'Belajar dan mematuhi aturan adalah kewajiban siswa di sekolah.'
  },
  {
    id: 'g3_p3',
    grade: 3,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Tulisan semboyan pada pita yang dicengkeram oleh burung Garuda Pancasila adalah...',
    options: ['Bhinneka Tunggal Ika', 'Tut Wuri Handayani', 'Pancasila Sakti', 'Garuda Jaya'],
    correctIndex: 0,
    explanation: 'Bhinneka Tunggal Ika artinya berbeda-beda tetapi tetap satu jua.'
  },
  {
    id: 'g3_p4',
    grade: 3,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Rumah adat Tongkonan dengan atap melengkung menyerupai perahu berasal dari suku Toraja di provinsi...',
    options: ['Sulawesi Selatan', 'Jawa Barat', 'Sumatera Barat', 'Papua'],
    correctIndex: 0,
    explanation: 'Rumah Tongkonan adalah rumah adat kebanggaan suku Toraja Sulawesi Selatan.'
  },
  {
    id: 'g3_p5',
    grade: 3,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Pengambilan keputusan bersama dalam kelas sebaiknya dilakukan melalui cara...',
    options: ['Musyawarah untuk mufakat', 'Memaksakan kehendak sendiri', 'Menentukan sepihak oleh yang terkuat', 'Bertengkar'],
    correctIndex: 0,
    explanation: 'Musyawarah mufakat adalah cermin sila ke-4 Pancasila.'
  },
  // --- PAI Kelas 3 ---
  {
    id: 'g3_pai1',
    grade: 3,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Kitab suci Taurat diturunkan oleh Allah SWT kepada Nabi...',
    options: ['Nabi Musa a.s.', 'Nabi Isa a.s.', 'Nabi Daud a.s.', 'Nabi Muhammad s.a.w.'],
    correctIndex: 0,
    explanation: 'Kitab Taurat diturunkan kepada Nabi Musa a.s.'
  },
  {
    id: 'g3_pai2',
    grade: 3,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Shalat fardhu yang dikerjakan bersama-sama dipimpin oleh seorang imam dinamakan shalat...',
    options: ['Berjamaah', 'Munfarid (Sendirian)', 'Sunnah rawatib', 'Tahajud'],
    correctIndex: 0,
    explanation: 'Shalat berjamaah pahalanya 27 derajat lebih tinggi dibanding shalat sendirian.'
  },
  {
    id: 'g3_pai3',
    grade: 3,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Sifat wajib bagi para Nabi dan Rasul yang artinya "dapat dipercaya" adalah...',
    options: ['Amanah', 'Siddiq', 'Tabligh', 'Fathanah'],
    correctIndex: 0,
    explanation: 'Amanah artinya dapat dipercaya menjalankan perintah Allah.'
  },
  {
    id: 'g3_pai4',
    grade: 3,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Nabi yang diuji keikhlasannya saat diperintahkan Allah untuk menyembelih putranya Nabi Ismail adalah Nabi...',
    options: ['Nabi Ibrahim a.s.', 'Nabi Adam a.s.', 'Nabi Nuh a.s.', 'Nabi Yunus a.s.'],
    correctIndex: 0,
    explanation: 'Ketaatan Nabi Ibrahim dan Nabi Ismail menjadi asal mula ibadah kurban pada Hari Raya Idul Adha.'
  },
  {
    id: 'g3_pai5',
    grade: 3,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Doa untuk kedua orang tua diucapkan agar orang tua kita...',
    options: ['Diampuni dosanya dan disayangi oleh Allah', 'Menjadi orang paling kaya di dunia', 'Tidak pernah marah', 'Bisa membeli mobil mewah'],
    correctIndex: 0,
    explanation: 'Mendoakan orang tua adalah kewajiban anak yang berbakti (Rabbighfirli waliwalidayya).'
  },

  // =========================================================================
  // KELAS 4 SD (FASE B - USIA 9-10 TAHUN) - REVISI LENGKAP & DISEREMPAKNYA!
  // =========================================================================
  // --- Matematika Kelas 4 ---
  {
    id: 'g4_m1',
    grade: 4,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Bagaimana cara membaca lambang bilangan cacah besar 25.400.000?',
    options: [
      'Dua puluh lima juta empat ratus ribu',
      'Dua puluh lima ribu empat ratus',
      'Dua ratus lima puluh empat juta',
      'Dua puluh lima juta empat puluh ribu'
    ],
    correctIndex: 0,
    explanation: '25.400.000 dibaca "Dua puluh lima juta empat ratus ribu".'
  },
  {
    id: 'g4_m2',
    grade: 4,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Nilai tempat angka 7 pada bilangan 37.850.000 adalah...',
    options: ['Jutaan', 'Puluh jutaan', 'Ratus ribuan', 'Puluh ribuan'],
    correctIndex: 0,
    explanation: 'Pada 37.850.000, angka 3 menempati puluh jutaan dan angka 7 menempati jutaan.'
  },
  {
    id: 'g4_m3',
    grade: 4,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Lambang bilangan dari "Empat puluh delapan juta lima ratus ribu" adalah...',
    options: ['48.500.000', '4.850.000', '48.050.000', '485.000.000'],
    correctIndex: 0,
    explanation: 'Empat puluh delapan juta (48.000.000) ditambah lima ratus ribu (500.000) adalah 48.500.000.'
  },
  {
    id: 'g4_m4',
    grade: 4,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Hasil penjumlahan dari bilangan besar 23.000.000 + 15.500.000 adalah...',
    options: ['38.500.000', '37.500.000', '48.500.000', '39.000.000'],
    correctIndex: 0,
    explanation: '23.000.000 + 15.500.000 = 38.500.000.'
  },
  {
    id: 'g4_m5',
    grade: 4,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Berapakah hasil dari 50.000.000 dikurangi 18.000.000?',
    options: ['32.000.000', '38.000.000', '42.000.000', '28.000.000'],
    correctIndex: 0,
    explanation: '50 juta - 18 juta = 32 juta (32.000.000).'
  },
  {
    id: 'g4_m6',
    grade: 4,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Kelipatan Persekutuan Terkecil (KPK) dari bilangan 6 dan 8 adalah...',
    options: ['24', '48', '18', '12'],
    correctIndex: 0,
    explanation: 'Kelipatan 6: 6, 12, 18, 24... Kelipatan 8: 8, 16, 24... KPK-nya adalah 24.'
  },
  {
    id: 'g4_m7',
    grade: 4,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Faktor Persekutuan Terbesar (FPB) dari bilangan 12 dan 18 adalah...',
    options: ['6', '3', '4', '2'],
    correctIndex: 0,
    explanation: 'Faktor 12: 1, 2, 3, 4, 6, 12. Faktor 18: 1, 2, 3, 6, 9, 18. FPB terbesarnya adalah 6.'
  },
  {
    id: 'g4_m8',
    grade: 4,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Pecahan yang senilai dengan 3/5 adalah...',
    options: ['6/10', '5/3', '4/10', '9/20'],
    correctIndex: 0,
    explanation: '3/5 pembilang dan penyebut dikalikan 2 menghasilkan 6/10.'
  },
  {
    id: 'g4_m9',
    grade: 4,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Sebuah persegi panjang memiliki panjang 14 cm dan lebar 6 cm. Berapakah luasnya?',
    options: ['84 cm²', '40 cm²', '48 cm²', '72 cm²'],
    correctIndex: 0,
    explanation: 'Luas = panjang × lebar = 14 × 6 = 84 cm².'
  },
  // --- IPAS Kelas 4 ---
  {
    id: 'g4_i1',
    grade: 4,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Perubahan wujud zat dari padat langsung menjadi gas tanpa mencair terlebih dahulu dinamakan...',
    options: ['Menyublim', 'Mengembun', 'Mencair', 'Mengkristal'],
    correctIndex: 0,
    explanation: 'Menyublim adalah perubahan wujud dari padat menjadi gas, contohnya kapur barus.'
  },
  {
    id: 'g4_i2',
    grade: 4,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Gaya tarik bumi yang menyebabkan benda selalu jatuh ke bawah menuju tanah adalah gaya...',
    options: ['Gaya Gravitasi', 'Gaya Gesek', 'Gaya Pegas', 'Gaya Magnet'],
    correctIndex: 0,
    explanation: 'Gaya gravitasi menarik segala benda menuju pusat bumi.'
  },
  {
    id: 'g4_i3',
    grade: 4,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Gaya yang timbul saat dua permukaan benda saling bersentuhan dan menghambat gerak benda dinamakan...',
    options: ['Gaya Gesek', 'Gaya Gravitasi', 'Gaya Magnet', 'Gaya Otot'],
    correctIndex: 0,
    explanation: 'Gaya gesek bekerja berlawanan arah dengan arah gerak benda, misalnya rem sepeda.'
  },
  {
    id: 'g4_i4',
    grade: 4,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Proses fotosintesis pada tumbuhan hijau menghasilkan makanan dan melepaskan gas yang kita hirup, yaitu...',
    options: ['Oksigen (O₂)', 'Karbondioksida (CO₂)', 'Nitrogen', 'Karbon monoksida'],
    correctIndex: 0,
    explanation: 'Fotosintesis menghasilkan glukosa (makanan tumbuhan) dan melepaskan oksigen segar.'
  },
  {
    id: 'g4_i5',
    grade: 4,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Zat hijau daun yang bertugas menangkap energi cahaya matahari untuk fotosintesis adalah...',
    options: ['Klorofil', 'Kloroplas', 'Stomata', 'Kambium'],
    correctIndex: 0,
    explanation: 'Klorofil adalah pigmen zat hijau daun penyerap cahaya matahari.'
  },
  {
    id: 'g4_i6',
    grade: 4,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Bagian alat indera lidah manusia berfungsi mengecap berbagai macam rasa. Papila pengecap dapat membedakan 4 rasa utama, yaitu...',
    options: ['Manis, asin, asam, dan pahit', 'Pedas, panas, asin, dan manis', 'Pahit, asam, gurih, dan pedas', 'Tawar, asin, panas, dan dingin'],
    correctIndex: 0,
    explanation: 'Lidah mendeteksi rasa manis, asin, asam, dan pahit (pedas adalah sensasi panas/nyeri).'
  },
  {
    id: 'g4_i7',
    grade: 4,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Bagian bunga yang berperan sebagai alat kelamin jantan adalah...',
    options: ['Benang sari', 'Putik', 'Mahkota bunga', 'Kelopak bunga'],
    correctIndex: 0,
    explanation: 'Benang sari menghasilkan serbuk sari (kelamin jantan), sedangkan putik adalah kelamin betina.'
  },
  {
    id: 'g4_i8',
    grade: 4,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Benda yang dapat ditarik dengan kuat oleh gaya magnet dinamakan benda feromagnetik, contohnya adalah...',
    options: ['Paku besi dan peniti baja', 'Kayu dan kertas', 'Plastik dan karet', 'Kaca dan kain'],
    correctIndex: 0,
    explanation: 'Besi dan baja memiliki sifat magnetik yang kuat.'
  },
  // --- Bahasa Indonesia Kelas 4 ---
  {
    id: 'g4_b1',
    grade: 4,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Inti bahasan atau pokok persoalan yang mendasari sebuah paragraf dinamakan...',
    options: ['Gagasan pokok (Ide pokok)', 'Kalimat pengembang', 'Judul karangan', 'Kata pengantar'],
    correctIndex: 0,
    explanation: 'Gagasan pokok adalah ide utama yang dikembangkan oleh kalimat-kalimat pendukung.'
  },
  {
    id: 'g4_b2',
    grade: 4,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Penulisan kata baku yang tepat menurut Kamus Besar Bahasa Indonesia (KBBI) adalah...',
    options: ['Apotek', 'Apotik', 'Apoteek', 'Apotika'],
    correctIndex: 0,
    explanation: 'Bentuk baku menurut KBBI adalah "Apotek" (bukan Apotik).'
  },
  {
    id: 'g4_b3',
    grade: 4,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Manakah penulisan kata baku yang benar di bawah ini?',
    options: ['Praktik', 'Praktek', 'Praktiek', 'Praktikum'],
    correctIndex: 0,
    explanation: 'Bentuk baku adalah "Praktik" (bukan Praktek).'
  },
  {
    id: 'g4_b4',
    grade: 4,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Puisi lama nusantara yang memiliki ciri 4 baris, rima bersajak a-b-a-b, baris 1-2 sampiran dan 3-4 isi dinamakan...',
    options: ['Pantun', 'Gurindam', 'Syair', 'Seloka'],
    correctIndex: 0,
    explanation: 'Pantun adalah puisi lama Indonesia berima a-b-a-b.'
  },
  {
    id: 'g4_b5',
    grade: 4,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Kalimat yang isinya meminta, mengajak, atau melarang seseorang melakukan sesuatu dinamakan kalimat...',
    options: ['Kalimat Perintah (Imperatif)', 'Kalimat Berita (Deklaratif)', 'Kalimat Tanya (Interogatif)', 'Kalimat Pujian'],
    correctIndex: 0,
    explanation: 'Kalimat imperatif digunakan untuk memberi komando, perintah, atau larangan.'
  },
  {
    id: 'g4_b6',
    grade: 4,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Lawan kata (antonim) dari kata "Hemat" adalah...',
    options: ['Boros', 'Kikir', 'Pelit', 'Cermat'],
    correctIndex: 0,
    explanation: 'Lawan kata dari hemat adalah boros.'
  },
  {
    id: 'g4_b7',
    grade: 4,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Orang yang dimintai keterangan, informasi, atau pendapat dalam suatu kegiatan wawancara dinamakan...',
    options: ['Narasumber', 'Pewawancara', 'Wartawan', 'Moderator'],
    correctIndex: 0,
    explanation: 'Narasumber adalah orang yang memberikan informasi dalam wawancara.'
  },
  // --- PKn Kelas 4 ---
  {
    id: 'g4_p1',
    grade: 4,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Sila ke-3 Pancasila "Persatuan Indonesia" dilambangkan dengan simbol...',
    options: ['Pohon Beringin', 'Bintang Emas', 'Kepala Banteng', 'Padi dan Kapas'],
    correctIndex: 0,
    explanation: 'Pohon Beringin melambangkan persatuan dan tempat berteduh seluruh rakyat Indonesia.'
  },
  {
    id: 'g4_p2',
    grade: 4,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Musyawarah untuk mufakat dalam menyelesaikan permasalahan merupakan pengamalan Pancasila sila ke-...',
    options: ['Sila ke-4', 'Sila ke-3', 'Sila ke-2', 'Sila ke-5'],
    correctIndex: 0,
    explanation: 'Sila ke-4 menegaskan asas musyawarah/perwakilan.'
  },
  {
    id: 'g4_p3',
    grade: 4,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Sila ke-5 Pancasila "Keadilan Sosial bagi Seluruh Rakyat Indonesia" dilambangkan dengan simbol...',
    options: ['Padi dan Kapas', 'Kepala Banteng', 'Rantai Emas', 'Bintang'],
    correctIndex: 0,
    explanation: 'Padi melambangkan pangan dan kapas melambangkan sandang (kesejahteraan merata).'
  },
  {
    id: 'g4_p4',
    grade: 4,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Norma yang bersumber dari hati nurani manusia yang membedakan perbuatan baik dan buruk dinamakan...',
    options: ['Norma Kesusilaan', 'Norma Hukum', 'Norma Kesopanan', 'Norma Kebiasaan'],
    correctIndex: 0,
    explanation: 'Norma kesusilaan bersumber dari suara hati nurani manusia.'
  },
  {
    id: 'g4_p5',
    grade: 4,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Aturan tertulis yang dibuat oleh lembaga berwenang dan memiliki sanksi tegas serta mengikat dinamakan norma...',
    options: ['Norma Hukum', 'Norma Kesopanan', 'Norma Adat', 'Norma Kesusilaan'],
    correctIndex: 0,
    explanation: 'Norma hukum dibuat oleh negara dengan sanksi tegas dari aparat penegak hukum.'
  },
  {
    id: 'g4_p6',
    grade: 4,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Tradisi bekerja sama secara gotong royong di masyarakat tanpa mengharapkan upah mencerminkan nilai luhur bangsa yaitu...',
    options: ['Kekeluargaan dan solidaritas', 'Individualisme', 'Konsumerisme', 'Kapitalisme'],
    correctIndex: 0,
    explanation: 'Gotong royong adalah warisan luhur gotong royong bangsa Indonesia.'
  },
  {
    id: 'g4_p7',
    grade: 4,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Hak setiap anak di rumah yang wajib dipenuhi oleh orang tua adalah...',
    options: ['Mendapatkan kasih sayang, makanan bergizi, dan perlindungan', 'Bekerja mencari nafkah', 'Membayar tagihan listrik', 'Menentukan aturan rumah sendiri'],
    correctIndex: 0,
    explanation: 'Anak berhak mendapatkan cinta kasih, nafkah lahir-batin, dan perlindungan orang tua.'
  },
  // --- PAI Kelas 4 ---
  {
    id: 'g4_pai1',
    grade: 4,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Rukun Iman yang ketiga adalah meyakini adanya...',
    options: ['Kitab-kitab Suci Allah', 'Hari Kiamat', 'Malaikat Allah', 'Qada dan Qadar'],
    correctIndex: 0,
    explanation: 'Urutan Rukun Iman: 1) Allah, 2) Malaikat, 3) Kitab, 4) Rasul, 5) Hari Kiamat, 6) Qada dan Qadar.'
  },
  {
    id: 'g4_pai2',
    grade: 4,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Malaikat yang bertugas membagikan rezeki serta mengatur hujan dan tanaman dengan izin Allah adalah Malaikat...',
    options: ['Mikail', 'Jibril', 'Izrail', 'Israfil'],
    correctIndex: 0,
    explanation: 'Malaikat Mikail bertugas membagikan rezeki dan menurunkan air hujan.'
  },
  {
    id: 'g4_pai3',
    grade: 4,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Malaikat yang bertugas mencabut nyawa seluruh makhluk bernyawa adalah Malaikat...',
    options: ['Izrail', 'Israfil', 'Munkar', 'Nakir'],
    correctIndex: 0,
    explanation: 'Malaikat Izrail adalah malaikat maut pencabut nyawa.'
  },
  {
    id: 'g4_pai4',
    grade: 4,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Nabi Muhammad SAW diberi gelar "Al-Amin" oleh masyarakat Quraisy karena...',
    options: ['Selalu jujur, amanah, dan dapat dipercaya', 'Sangat pandai berperang', 'Berasal dari suku bangsawan', 'Memiliki harta melimpah'],
    correctIndex: 0,
    explanation: 'Al-Amin artinya orang yang sangat amanah dan dapat dipercaya.'
  },
  {
    id: 'g4_pai5',
    grade: 4,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Perilaku terpuji seperti gemar bersedekah, rendah hati, dan bersyukur dinamakan akhlak...',
    options: ['Mahmudah (Terpuji)', 'Mazmumah (Tercela)', 'Riya (Pamer)', 'Takabur (Sombong)'],
    correctIndex: 0,
    explanation: 'Akhlak Mahmudah adalah akhlak baik yang disenangi Allah SWT.'
  },
  {
    id: 'g4_pai6',
    grade: 4,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Bacaan doa yang diucapkan ketika posisi ruku\' dalam shalat adalah...',
    options: ['Subhana Rabbiyal \'Azimi wa bihamdih', 'Subhana Rabbiyal A\'la wa bihamdih', 'Rabbighfirli warhamni', 'Attahiyyatul mubaarakatush-shalawatut-thayyibatu lillah'],
    correctIndex: 0,
    explanation: 'Saat ruku\' kita membaca Subhana Rabbiyal \'Azimi wa bihamdih 3 kali.'
  },

  // ==========================================
  // KELAS 5 SD (FASE C - USIA 10-11 TAHUN)
  // ==========================================
  // --- Matematika Kelas 5 ---
  {
    id: 'g5_m1',
    grade: 5,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Berapakah hasil dari penjumlahan pecahan: 1/2 + 1/4?',
    options: ['3/4', '2/6', '2/4', '1/6'],
    correctIndex: 0,
    explanation: '1/2 disamakan penyebutnya menjadi 2/4. Maka 2/4 + 1/4 = 3/4.'
  },
  {
    id: 'g5_m2',
    grade: 5,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Bentuk persen dari pecahan biasa 3/5 adalah...',
    options: ['60%', '35%', '50%', '75%'],
    correctIndex: 0,
    explanation: '3/5 × 100% = 60%.'
  },
  {
    id: 'g5_m3',
    grade: 5,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Sebuah kubus memiliki panjang rusuk 6 cm. Berapakah volume kubus tersebut?',
    options: ['216 cm³', '36 cm³', '144 cm³', '180 cm³'],
    correctIndex: 0,
    explanation: 'Volume kubus = s³ = 6 × 6 × 6 = 216 cm³.'
  },
  {
    id: 'g5_m4',
    grade: 5,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Sebuah balok memiliki panjang 10 cm, lebar 5 cm, dan tinggi 4 cm. Berapakah volume balok tersebut?',
    options: ['200 cm³', '190 cm³', '100 cm³', '150 cm³'],
    correctIndex: 0,
    explanation: 'Volume balok = p × l × t = 10 × 5 × 4 = 200 cm³.'
  },
  {
    id: 'g5_m5',
    grade: 5,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Jarak antara dua kota pada peta berskala 1 : 2.000.000 adalah 4 cm. Berapakah jarak sebenarnya?',
    options: ['80 km', '8 km', '800 km', '20 km'],
    correctIndex: 0,
    explanation: 'Jarak sebenarnya = 4 cm × 2.000.000 = 8.000.000 cm = 80 km.'
  },
  // --- IPAS Kelas 5 ---
  {
    id: 'g5_i1',
    grade: 5,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Organ pernapasan manusia tempat terjadinya pertukaran gas oksigen (O₂) dan karbondioksida (CO₂) adalah...',
    options: ['Alveolus di dalam paru-paru', 'Trakea (Tenggorokan)', 'Laring', 'Bronkus'],
    correctIndex: 0,
    explanation: 'Alveolus berupa kantung udara kecil tempat difusi gas O₂ dan CO₂.'
  },
  {
    id: 'g5_i2',
    grade: 5,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Organ peredaran darah manusia yang berfungsi utama memompa darah ke seluruh tubuh adalah...',
    options: ['Jantung', 'Hati', 'Ginjal', 'Paru-paru'],
    correctIndex: 0,
    explanation: 'Jantung berdenyut memompa darah yang kaya oksigen ke seluruh bagian tubuh.'
  },
  {
    id: 'g5_i3',
    grade: 5,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Peristiwa perpindahan panas (kalor) yang disertai dengan perpindahan partikel zatnya, contohnya air mendidih berputar, dinamakan...',
    options: ['Konveksi', 'Konduksi', 'Radiasi', 'Evaporasi'],
    correctIndex: 0,
    explanation: 'Konveksi adalah perpindahan kalor melalui aliran zat perantaranya (pada zat cair dan gas).'
  },
  {
    id: 'g5_i4',
    grade: 5,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Perpindahan panas matahari sampai ke bumi melalui ruang hampa udara dinamakan perpindahan kalor secara...',
    options: ['Radiasi (Pancaran)', 'Konduksi', 'Konveksi', 'Kondensasi'],
    correctIndex: 0,
    explanation: 'Radiasi adalah perpindahan panas tanpa memerlukan zat perantara.'
  },
  {
    id: 'g5_i5',
    grade: 5,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Dalam rantai makanan ekosistem sawah: Padi -> Belalang -> Katak -> Ular -> Elang. Makhluk hidup yang bertindak sebagai produsen adalah...',
    options: ['Padi', 'Belalang', 'Katak', 'Elang'],
    correctIndex: 0,
    explanation: 'Padi menghasilkan makanan sendiri melalui fotosintesis, sehingga disebut produsen.'
  },
  // --- Bahasa Indonesia Kelas 5 ---
  {
    id: 'g5_b1',
    grade: 5,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Teks yang berisi penjelasan ilmiah tentang mengapa dan bagaimana terjadinya suatu fenomena alam atau fenomena sosial dinamakan...',
    options: ['Teks Eksplanasi', 'Teks Narasi', 'Teks Prosedur', 'Teks Negosiasi'],
    correctIndex: 0,
    explanation: 'Teks eksplanasi menjelaskan proses sebab-akibat suatu peristiwa alam atau sosial.'
  },
  {
    id: 'g5_b2',
    grade: 5,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Gaya bahasa yang melekatkan sifat atau perilaku manusia pada benda mati dinamakan majas...',
    options: ['Personifikasi', 'Hiperbola', 'Metafora', 'Litotes'],
    correctIndex: 0,
    explanation: 'Contoh: "Nyiur melambai-lambai di tepi pantai". Ini adalah majas personifikasi.'
  },
  {
    id: 'g5_b3',
    grade: 5,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Gaya bahasa yang menyatakan sesuatu dengan melebih-lebihkan kenyataan secara ekstrem dinamakan majas...',
    options: ['Hiperbola', 'Personifikasi', 'Asosiasi', 'Eufemisme'],
    correctIndex: 0,
    explanation: 'Contoh: "Suaranya menggelegar membelah angkasa" merupakan majas hiperbola.'
  },
  {
    id: 'g5_b4',
    grade: 5,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Pernyataan yang dapat dibuktikan kebenarannya dengan data dan kenyataan nyata dinamakan...',
    options: ['Fakta', 'Opini', 'Mitos', 'Gosip'],
    correctIndex: 0,
    explanation: 'Fakta adalah hal nyata yang dapat diuji kebenarannya dengan bukti objektif.'
  },
  {
    id: 'g5_b5',
    grade: 5,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Bagian teratas dari surat resmi dinas sekolah yang memuat nama lembaga, logo, dan alamat dinamakan...',
    options: ['Kepala surat (Kop surat)', 'Nomor surat', 'Perihal surat', 'Salam pembuka'],
    correctIndex: 0,
    explanation: 'Kop surat berisi identitas resmi instansi pengirim surat.'
  },
  // --- PKn Kelas 5 ---
  {
    id: 'g5_p1',
    grade: 5,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Peristiwa sejarah pemuda pada 28 Oktober 1928 yang mengikrarkan satu tanah air, satu bangsa, dan satu bahasa adalah...',
    options: ['Sumpah Pemuda', 'Proklamasi Kemerdekaan', 'Deklarasi Djuanda', 'Kongres Pemuda Pertama'],
    correctIndex: 0,
    explanation: 'Sumpah Pemuda 28 Oktober 1928 menjadi tonggak persatuan bangsa Indonesia.'
  },
  {
    id: 'g5_p2',
    grade: 5,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Sikap saling menghormati dan memberi kebebasan beribadah kepada umat agama lain dinamakan sikap...',
    options: ['Toleransi beragama', 'Diskriminasi', 'Etnosentrisme', 'Fanatisme sempit'],
    correctIndex: 0,
    explanation: 'Toleransi menjamin kerukunan antarumat beragama di Indonesia.'
  },
  {
    id: 'g5_p3',
    grade: 5,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Bentuk negara Indonesia sebagaimana tertulis dalam Pasal 1 Ayat 1 UUD 1945 adalah...',
    options: ['Negara Kesatuan berbentuk Republik (NKRI)', 'Negara Serikat / Federasi', 'Negara Monarki Kerajaan', 'Negara Persemakmuran'],
    correctIndex: 0,
    explanation: 'Indonesia adalah negara kesatuan dengan bentuk pemerintahan republik.'
  },
  {
    id: 'g5_p4',
    grade: 5,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Tarian Saman yang ditarikan secara berkelompok dengan gerakan tepuk tangan yang sangat kompak berasal dari daerah...',
    options: ['Aceh', 'Sumatera Barat', 'Bali', 'Sulawesi Selatan'],
    correctIndex: 0,
    explanation: 'Tari Saman adalah warisan budaya dunia asal suku Gayo Aceh.'
  },
  {
    id: 'g5_p5',
    grade: 5,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Sanksi bagi orang yang melanggar norma hukum bersifat...',
    options: ['Tegas, nyata, dan mengikat secara hukum', 'Hanya rasa malu dalam hati', 'Tergantung suasana hati', 'Hanya berupa cemoohan teman'],
    correctIndex: 0,
    explanation: 'Norma hukum memiliki sanksi resmi yang ditegakkan oleh lembaga hukum negara.'
  },
  // --- PAI Kelas 5 ---
  {
    id: 'g5_pai1',
    grade: 5,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Malaikat yang ditugaskan Allah untuk meniup sangkakala pada saat hari kiamat tiba adalah Malaikat...',
    options: ['Israfil', 'Mikail', 'Izrail', 'Jibril'],
    correctIndex: 0,
    explanation: 'Malaikat Israfil meniup sangkakala saat kiamat dan saat hari kebangkitan.'
  },
  {
    id: 'g5_pai2',
    grade: 5,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Zakat berupa bahan makanan pokok (seperti beras) yang wajib dikeluarkan menjelang shalat Idul Fitri dinamakan...',
    options: ['Zakat Fitrah', 'Zakat Mal', 'Infaq', 'Wakaf'],
    correctIndex: 0,
    explanation: 'Zakat fitrah berfungsi menyucikan jiwa orang yang berpuasa di bulan Ramadhan.'
  },
  {
    id: 'g5_pai3',
    grade: 5,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Sahabat Nabi yang pertama kali menjadi khalifah (Khulafaur Rasyidin) dan bergelar Ash-Shiddiq adalah...',
    options: ['Abu Bakar Ash-Shiddiq r.a.', 'Umar bin Khattab r.a.', 'Utsman bin Affan r.a.', 'Ali bin Abi Thalib r.a.'],
    correctIndex: 0,
    explanation: 'Abu Bakar adalah khalifah pertama penyambung perjuangan Rasulullah SAW.'
  },
  {
    id: 'g5_pai4',
    grade: 5,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Surah pendek dalam Al-Qur\'an yang mengecam orang yang mendustakan agama karena menghardik anak yatim adalah...',
    options: ['Surah Al-Ma\'un', 'Surah Al-Kautsar', 'Surah Al-Ikhlas', 'Surah Al-Falaq'],
    correctIndex: 0,
    explanation: 'Surah Al-Ma\'un memperingatkan bahaya menghardik anak yatim dan enggan menolong.'
  },
  {
    id: 'g5_pai5',
    grade: 5,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Sikap toleran dan lapang dada terhadap perbedaan keyakinan dalam ajaran Islam dinamakan...',
    options: ['Tasamuh', 'Tawaduk', 'Tawakal', 'Qana\'ah'],
    correctIndex: 0,
    explanation: 'Tasamuh artinya bersikap toleran dan menghargai perbedaan.'
  },

  // ==========================================
  // KELAS 6 SD (FASE C - USIA 11-12 TAHUN)
  // ==========================================
  // --- Matematika Kelas 6 ---
  {
    id: 'g6_m1',
    grade: 6,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Berapakah hasil dari operasi bilangan bulat: (-14) + 25 - (-9)?',
    options: ['20', '2', '22', '-2'],
    correctIndex: 0,
    explanation: '(-14) + 25 = 11. Lalu 11 - (-9) = 11 + 9 = 20.'
  },
  {
    id: 'g6_m2',
    grade: 6,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Berapakah hasil dari perkalian bilangan bulat: (-8) × (-7)?',
    options: ['56', '-56', '54', '-54'],
    correctIndex: 0,
    explanation: 'Bilangan negatif dikalikan bilangan negatif menghasilkan bilangan positif: (-8) × (-7) = 56.'
  },
  {
    id: 'g6_m3',
    grade: 6,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Sebuah lingkaran memiliki panjang jari-jari 14 cm. Berapakah luas lingkaran tersebut? (Gunakan π = 22/7)',
    options: ['616 cm²', '88 cm²', '308 cm²', '154 cm²'],
    correctIndex: 0,
    explanation: 'Luas = π × r² = (22/7) × 14 × 14 = 22 × 2 × 14 = 616 cm².'
  },
  {
    id: 'g6_m4',
    grade: 6,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Sebuah lingkaran memiliki diameter 28 cm. Berapakah keliling lingkaran tersebut? (Gunakan π = 22/7)',
    options: ['88 cm', '44 cm', '176 cm', '616 cm'],
    correctIndex: 0,
    explanation: 'Keliling = π × d = (22/7) × 28 = 22 × 4 = 88 cm.'
  },
  {
    id: 'g6_m5',
    grade: 6,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Data nilai ulangan matematika 5 siswa: 75, 80, 85, 90, 70. Berapakah nilai rata-rata (mean) mereka?',
    options: ['80', '78', '82', '75'],
    correctIndex: 0,
    explanation: 'Jumlah total = 75 + 80 + 85 + 90 + 70 = 400. Rata-rata = 400 ÷ 5 = 80.'
  },
  {
    id: 'g6_m6',
    grade: 6,
    subject: 'matematika',
    subjectName: 'Matematika',
    question: 'Nilai data yang paling sering muncul dalam suatu kumpulan data statistik dinamakan...',
    options: ['Modus', 'Median', 'Mean', 'Jangkauan'],
    correctIndex: 0,
    explanation: 'Modus adalah nilai dengan frekuensi pemunculan terbanyak.'
  },
  // --- IPAS Kelas 6 ---
  {
    id: 'g6_i1',
    grade: 6,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Perkembangbiakan tumbuhan secara generatif (kawin) diawali dengan peristiwa penyerbukan, yaitu...',
    options: ['Jatuhnya serbuk sari ke atas kepala putik', 'Mekarnya kuncup bunga', 'Penyiraman air pada tanah', 'Tumbuhnya tunas pada batang'],
    correctIndex: 0,
    explanation: 'Penyerbukan adalah proses jatuhnya serbuk sari ke kepala putik.'
  },
  {
    id: 'g6_i2',
    grade: 6,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Contoh tumbuhan yang berkembang biak secara vegetatif alami dengan umbi lapis adalah...',
    options: ['Bawang merah dan bawang putih', 'Singkong dan ubi jalar', 'Wortel dan lobak', 'Jahe dan lengkuas'],
    correctIndex: 0,
    explanation: 'Bawang memiliki pelepah daun berlapis-lapis tebal yang disebut umbi lapis.'
  },
  {
    id: 'g6_i3',
    grade: 6,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Planet terdekat dari matahari yang memiliki perbedaan suhu ekstrem antara siang dan malam adalah...',
    options: ['Merkurius', 'Venus', 'Bumi', 'Mars'],
    correctIndex: 0,
    explanation: 'Merkurius adalah planet terdekat pertama dari matahari.'
  },
  {
    id: 'g6_i4',
    grade: 6,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Planet dalam tata surya kita yang dijuluki "Planet Merah" karena kandungan besi oksida di permukaannya adalah...',
    options: ['Mars', 'Yupiter', 'Venus', 'Saturnus'],
    correctIndex: 0,
    explanation: 'Mars tampak kemerahan dari bumi dan disebut Planet Merah.'
  },
  {
    id: 'g6_i5',
    grade: 6,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Perputaran bumi pada porosnya (rotasi bumi) menyebabkan terjadinya peristiwa alam yaitu...',
    options: ['Pergantian siang dan malam', 'Pergantian musim kemarau dan hujan', 'Gerhana matahari total', 'Perubahan fase bulan'],
    correctIndex: 0,
    explanation: 'Rotasi bumi selama 24 jam mengakibatkan terjadinya siang dan malam.'
  },
  {
    id: 'g6_i6',
    grade: 6,
    subject: 'ipas',
    subjectName: 'IPAS',
    question: 'Peristiwa alam di mana posisi bulan berada tepat di antara bumi dan matahari sehingga cahaya matahari terhalang dinamakan...',
    options: ['Gerhana Matahari', 'Gerhana Bulan', 'Bintang Jatuh', 'Aurora'],
    correctIndex: 0,
    explanation: 'Gerhana matahari terjadi saat bayangan bulan jatuh ke permukaan bumi.'
  },
  // --- Bahasa Indonesia Kelas 6 ---
  {
    id: 'g6_b1',
    grade: 6,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Teks yang menyajikan fakta-fakta objektif hasil dari kegiatan peninjauan atau observasi langsung dinamakan...',
    options: ['Teks Laporan Hasil Pengamatan (LHO)', 'Teks Cerita Fantasi', 'Teks Narasi Fiktif', 'Teks Dongeng'],
    correctIndex: 0,
    explanation: 'Teks LHO disusun berdasarkan fakta yang diperoleh dari proses observasi langsung.'
  },
  {
    id: 'g6_b2',
    grade: 6,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Peribahasa "Besar pasak daripada tiang" memiliki makna...',
    options: ['Pengeluaran lebih besar daripada pemasukan / penghasilan', 'Bekerja keras membangun rumah', 'Tiang rumah yang kokoh', 'Mendapat keuntungan ganda'],
    correctIndex: 0,
    explanation: 'Maknanya belanja atau pengeluaran melebihi uang yang didapatkan.'
  },
  {
    id: 'g6_b3',
    grade: 6,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Penulisan kata baku yang tepat menurut KBBI di bawah ini adalah...',
    options: ['Antre', 'Antri', 'Antrian', 'Ngantri'],
    correctIndex: 0,
    explanation: 'Bentuk baku menurut KBBI adalah "Antre".'
  },
  {
    id: 'g6_b4',
    grade: 6,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Kalimat yang bertujuan membujuk, mempengaruhi, atau mengajak pembaca melakukan tindakan positif dinamakan kalimat...',
    options: ['Persuasif', 'Deklaratif', 'Interogatif', 'Pasif'],
    correctIndex: 0,
    explanation: 'Kalimat persuasif bersifat membujuk atau mengajak pembaca.'
  },
  {
    id: 'g6_b5',
    grade: 6,
    subject: 'bahasa_indonesia',
    subjectName: 'Bahasa Indonesia',
    question: 'Lembaran kertas atau media digital yang memuat data diri untuk pendaftaran anggota perpustakaan atau ujian dinamakan...',
    options: ['Formulir', 'Brosur', 'Kuitansi', 'Katalog'],
    correctIndex: 0,
    explanation: 'Formulir berisi kolom-kolom isian data pribadi untuk keperluan tertentu.'
  },
  // --- PKn Kelas 6 ---
  {
    id: 'g6_p1',
    grade: 6,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Badan yang dibentuk pada 1 Maret 1945 untuk menyelidiki persiapan kemerdekaan Indonesia adalah...',
    options: ['BPUPKI', 'PPKI', 'KNIP', 'PETA'],
    correctIndex: 0,
    explanation: 'BPUPKI dibentuk untuk merumuskan dasar negara dan rancangan UUD.'
  },
  {
    id: 'g6_p2',
    grade: 6,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Tokoh proklamator yang membacakan naskah Proklamasi Kemerdekaan Indonesia pada 17 Agustus 1945 adalah...',
    options: ['Ir. Soekarno didampingi Drs. Mohammad Hatta', 'Jenderal Soedirman', 'Ki Hajar Dewantara', 'Mr. Soepomo'],
    correctIndex: 0,
    explanation: 'Bung Karno dan Bung Hatta adalah bapak Proklamator kemerdekaan RI.'
  },
  {
    id: 'g6_p3',
    grade: 6,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Sikap mengutamakan produk-produk buatan dalam negeri (UMKM Indonesia) merupakan wujud nyata dari...',
    options: ['Cinta tanah air dan nasionalisme', 'Sikap kedaerahan', 'Sikap pamer', 'Individualisme'],
    correctIndex: 0,
    explanation: 'Membeli dan memakai produk lokal memperkuat ekonomi bangsa Indonesia.'
  },
  {
    id: 'g6_p4',
    grade: 6,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Indonesia adalah negara anggota pendiri organisasi bangsa-bangsa di kawasan Asia Tenggara yaitu...',
    options: ['ASEAN', 'PBB', 'UNESCO', 'OPEC'],
    correctIndex: 0,
    explanation: 'Indonesia menandatangani Deklarasi Bangkok 1967 sebagai pendiri ASEAN.'
  },
  {
    id: 'g6_p5',
    grade: 6,
    subject: 'pkn',
    subjectName: 'Pendidikan Pancasila',
    question: 'Gedung Sekretariat organisasi negara-negara ASEAN terletak di ibu kota negara...',
    options: ['Jakarta, Indonesia', 'Kuala Lumpur, Malaysia', 'Bangkok, Thailand', 'Singapura'],
    correctIndex: 0,
    explanation: 'Sekretariat ASEAN berpusat di Jakarta, Indonesia.'
  },
  // --- PAI Kelas 6 ---
  {
    id: 'g6_pai1',
    grade: 6,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Rukun Iman keenam adalah meyakini dengan sepenuh hati ketetapan dan ketentuan Allah SWT, yaitu...',
    options: ['Qada dan Qadar', 'Hari Kiamat', 'Malaikat', 'Kitab-kitab Suci'],
    correctIndex: 0,
    explanation: 'Rukun Iman ke-6 adalah beriman kepada Qada dan Qadar Allah.'
  },
  {
    id: 'g6_pai2',
    grade: 6,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Takdir Allah yang masih dapat diikhtiarkan dan diubah dengan doa serta kerja keras manusia dinamakan takdir...',
    options: ['Muallaq', 'Mubram', 'Qadarullah', 'Azali'],
    correctIndex: 0,
    explanation: 'Takdir muallaq dapat dipengaruhi usaha dan doa (misal kepandaian dan kesehatan).'
  },
  {
    id: 'g6_pai3',
    grade: 6,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Ibadah menahan diri dari lapar, dahaga, dan hawa nafsu dari terbit fajar hingga terbenam matahari di bulan suci dinamakan...',
    options: ['Puasa Ramadhan', 'Shalat Tarawih', 'Zakat Mal', 'I\'tikaf'],
    correctIndex: 0,
    explanation: 'Puasa Ramadhan adalah kewajiban bagi setiap muslim yang beriman.'
  },
  {
    id: 'g6_pai4',
    grade: 6,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Tokoh sembilan wali penyebar agama Islam yang sangat berjasa di tanah Jawa dikenal dengan sebutan...',
    options: ['Walisongo', 'Khulafaur Rasyidin', 'Ulama Salaf', 'Mujaddid'],
    correctIndex: 0,
    explanation: 'Walisongo berdakwah dengan santun, bijaksana, dan memadukan budaya lokal nusantara.'
  },
  {
    id: 'g6_pai5',
    grade: 6,
    subject: 'pai',
    subjectName: 'Pendidikan Agama Islam',
    question: 'Anggota Walisongo yang terkenal berdakwah menggunakan media kesenian gamelan dan wayang kulit adalah...',
    options: ['Sunan Kalijaga', 'Sunan Ampel', 'Sunan Gresik', 'Sunan Giri'],
    correctIndex: 0,
    explanation: 'Sunan Kalijaga berdakwah melalui pendekatan seni budaya wayang kulit dan tembang.'
  }
];

/**
 * Shuffles the 4 options of a single question and updates correctIndex accordingly.
 * Uses metadata mapping to handle identical option text safely.
 */
export function shuffleQuestionOptions(question: Question): Question {
  const optionsWithMeta = question.options.map((text, idx) => ({
    text,
    isCorrect: idx === question.correctIndex,
  }));

  // Fisher-Yates shuffle
  for (let i = optionsWithMeta.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithMeta[i], optionsWithMeta[j]] = [optionsWithMeta[j], optionsWithMeta[i]];
  }

  const newOptions = optionsWithMeta.map((o) => o.text) as [string, string, string, string];
  const newCorrectIndex = optionsWithMeta.findIndex((o) => o.isCorrect);

  return {
    ...question,
    options: newOptions,
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
  };
}

/**
 * Randomizes both the list of questions and the 4 options of each question.
 */
export function prepareShuffledQuestions(questions: Question[], count: number): Question[] {
  // First shuffle the questions array with Fisher-Yates
  const shuffledList = [...questions];
  for (let i = shuffledList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
  }

  // Slice to requested count
  const picked = shuffledList.slice(0, count);

  // Now shuffle options for every question
  return picked.map(shuffleQuestionOptions);
}

/**
 * Filters fallback questions according to selected subject and grade.
 * If questions for that exact grade & subject are less than count,
 * it supplements intelligently from other subjects of that grade or the overall bank.
 */
export function getFallbackQuestionsForSubject(
  subject: SubjectId,
  count: number,
  grade: GradeLevel = 4
): Question[] {
  // 1. Try questions matching both grade and subject
  let filtered = FALLBACK_QUESTIONS.filter((q) => {
    const gradeMatches = q.grade === grade;
    const subjectMatches = subject === 'campuran' ? true : q.subject === subject;
    return gradeMatches && subjectMatches;
  });

  // 2. If not enough questions in this specific subject for this grade, expand to all subjects of this grade
  if (filtered.length < count) {
    const gradeAll = FALLBACK_QUESTIONS.filter((q) => q.grade === grade);
    const existingIds = new Set(filtered.map((q) => q.id));
    for (const q of gradeAll) {
      if (!existingIds.has(q.id)) {
        filtered.push(q);
        existingIds.add(q.id);
      }
      if (filtered.length >= count) break;
    }
  }

  // 3. If still not enough, supplement from matching subject across all grades
  if (filtered.length < count) {
    const subjectAll = subject === 'campuran'
      ? FALLBACK_QUESTIONS
      : FALLBACK_QUESTIONS.filter((q) => q.subject === subject);
    const existingIds = new Set(filtered.map((q) => q.id));
    for (const q of subjectAll) {
      if (!existingIds.has(q.id)) {
        filtered.push(q);
        existingIds.add(q.id);
      }
      if (filtered.length >= count) break;
    }
  }

  // 4. Fallback to any questions
  if (filtered.length === 0) {
    filtered = [...FALLBACK_QUESTIONS];
  }

  return prepareShuffledQuestions(filtered, count);
}
