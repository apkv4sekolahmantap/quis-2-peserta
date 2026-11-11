import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for generating dynamic questions via Google Gemini API
app.post('/api/generate-questions', async (req, res) => {
  try {
    const { subject = 'campuran', count = 10, grade = 4 } = req.body;
    const targetGrade = Math.min(Math.max(Number(grade) || 4, 1), 6);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      console.warn('GEMINI_API_KEY is not configured. Falling back to internal offline questions.');
      return res.json({
        success: true,
        fallback: true,
        message: 'Menggunakan bank soal bawaan (API Key belum diatur).'
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    // Grade and Phase Curriculum Metadata (Kurikulum Merdeka SD)
    interface GradeCurriculum {
      phase: string;
      ageRange: string;
      guidelines: string;
      subjects: Record<string, string>;
    }

    const gradeCurriculums: Record<number, GradeCurriculum> = {
      1: {
        phase: 'Fase A',
        ageRange: '6-7',
        guidelines: 'Gunakan kalimat yang sangat singkat, kosakata sederhana, konkret, dan mudah dipahami anak baru belajar membaca. Hindari angka besar atau kalimat majemuk.',
        subjects: {
          matematika: 'Matematika SD Kelas 1: Mengenal bilangan 1 sampai 20, penjumlahan dan pengurangan benda konkret sederhana (misal 5 + 3), membandingkan banyak benda (lebih banyak/sedikit), bentuk bangun datar sederhana (lingkaran, segitiga, segiempat).',
          ipas: 'IPAS / Lingkungan Sekitar SD Kelas 1: Bagian tubuh manusia dan panca indera (mata untuk melihat, telinga mendengar), menjaga kebersihan diri (mandi, cuci tangan, sikat gigi), lingkungan rumah dan sekolah, makhluk hidup vs benda tak hidup.',
          bahasa_indonesia: 'Bahasa Indonesia SD Kelas 1: Mengenal huruf vokal dan konsonan, mengeja suku kata terbuka sederhana (ba, ca, da), membaca kata-kata pendek benda di sekitar, tanda titik di akhir kalimat.',
          pkn: 'Pendidikan Pancasila SD Kelas 1: Lambang burung Garuda Pancasila, aturan di rumah dan di sekolah (merapikan mainan, tertib), menghormati orang tua dan menyayangi teman, hidup rukun.',
          pai: 'Pendidikan Agama Islam SD Kelas 1: Huruf hijaiyah dasar, Rukun Iman pertama (Iman kepada Allah SWT pencipta alam), doa sebelum makan dan tidur, perilaku ramah, jujur, dan suka membantu orang tua.',
          campuran: 'Campuran seimbang antara Matematika (bilangan 1-20), IPAS (tubuhku & kebersihan), Bahasa Indonesia (huruf & kata sederhana), Pendidikan Pancasila (aturan rumah & Garuda), dan PAI SD Kelas 1.'
        }
      },
      2: {
        phase: 'Fase A',
        ageRange: '7-8',
        guidelines: 'Bahasa Indonesia santai, ceria, dan mudah dipahami siswa kelas 2. Mulai mengenal konsep hitungan sampai 100, pengukuran waktu dan panjang sederhana.',
        subjects: {
          matematika: 'Matematika SD Kelas 2: Bilangan cacah sampai 100, nilai tempat puluhan dan satuan, penjumlahan dan pengurangan bersusun tanpa/dengan meminjam, membaca jam dinding (jam tepat dan setengah), pecahan sederhana 1/2.',
          ipas: 'IPAS SD Kelas 2: Bagian-bagian tumbuhan (akar, batang, daun, bunga), bagian tubuh hewan dan fungsinya, siang dan malam, cuaca sehari-hari (cerah, hujan, berawan), cara merawat hewan dan tumbuhan.',
          bahasa_indonesia: 'Bahasa Indonesia SD Kelas 2: Kosakata baru tentang lingkungan, kalimat tanya (apa, siapa, di mana), tanda titik (.) dan tanda tanya (?), puisi anak sederhana, menyimpulkan pesan cerita dongeng pendek.',
          pkn: 'Pendidikan Pancasila SD Kelas 2: Simbol 5 sila dalam perisai Garuda Pancasila (Bintang, Rantai, Pohon Beringin, Kepala Banteng, Padi dan Kapas), gotong royong di kelas, menghargai keberagaman suku dan agama teman.',
          pai: 'Pendidikan Agama Islam SD Kelas 2: Rukun Islam (5 perkara), nama 5 waktu shalat fardhu dan jumlah rakaatnya, Asmaul Husna (Ar-Rahman dan Ar-Rahim), perilaku hemat dan menjaga kebersihan.',
          campuran: 'Campuran seimbang Matematika (bilangan sampai 100 & jam), IPAS (hewan & tumbuhan), Bahasa Indonesia (kalimat tanya & tanda baca), Pendidikan Pancasila (simbol sila & gotong royong), dan PAI SD Kelas 2.'
        }
      },
      3: {
        phase: 'Fase B',
        ageRange: '8-9',
        guidelines: 'Gunakan bahasa yang menarik dan memancing rasa ingin tahu. Siswa sudah mampu membaca lancar dan melakukan operasi perkalian/pembagian dasar.',
        subjects: {
          matematika: 'Matematika SD Kelas 3: Bilangan cacah sampai 1.000, operasi perkalian dan pembagian dasar, pecahan sederhana (1/2, 1/3, 1/4), keliling persegi dan persegi panjang, membaca data sederhana dalam tabel.',
          ipas: 'IPAS SD Kelas 3: Ciri-ciri makhluk hidup (bernapas, bergerak, tumbuh, berkembang biak), daur hidup hewan (metamorfosis katak & kupu-kupu), perubahan wujud benda (mencair, membeku, menguap), sumber energi di bumi (matahari, angin, air).',
          bahasa_indonesia: 'Bahasa Indonesia SD Kelas 3: Ide pokok paragraf pendek, fabel dan dongeng nusantara, kata hubung (dan, tetapi, karena), kalimat efektif sederhana, antonim dan sinonim kata.',
          pkn: 'Pendidikan Pancasila SD Kelas 3: Pengamalan sila Pancasila dalam keluarga dan sekolah, hak dan kewajiban anak di rumah dan sekolah, keberagaman adat istiadat dan suku bangsa di Indonesia, lambang semboyan Bhinneka Tunggal Ika.',
          pai: 'Pendidikan Agama Islam SD Kelas 3: Mengenal Kitab-kitab suci Allah (Taurat, Zabur, Injil, Al-Qur\'an), kisah Nabi Ibrahim a.s. dan Nabi Ismail a.s., tata cara shalat berjamaah, sifat amanah dan jujur.',
          campuran: 'Campuran seimbang Matematika (perkalian/pembagian & pecahan), IPAS (daur hidup & wujud zat), Bahasa Indonesia (ide pokok & sinonim), Pendidikan Pancasila (hak/kewajiban & Bhinneka Tunggal Ika), dan PAI SD Kelas 3.'
        }
      },
      4: {
        phase: 'Fase B',
        ageRange: '9-10',
        guidelines: 'Materi Kurikulum Merdeka SD Kelas 4 yang seru, menantang logika, dan memperkaya wawasan.',
        subjects: {
          matematika: 'Matematika SD Kelas 4: Bilangan cacah besar (hingga ratusan juta dan miliar, nilai tempat angka, membandingkan), faktor dan kelipatan (KPK & FPB sederhana), pecahan senilai, luas dan keliling bangun datar.',
          ipas: 'IPAS SD Kelas 4: Perubahan wujud benda (menguap, mengembun, menyublim), gaya dan gerak (gaya gravitasi, gaya gesek, gaya magnet), fotosintesis pada tumbuhan hijau, panca indera, keanekaragaman hayati dan lingkungan.',
          bahasa_indonesia: 'Bahasa Indonesia SD Kelas 4: Gagasan pokok dan gagasan pendukung paragraf, kata baku vs tidak baku sesuai KBBI, sinonim/antonim, pantun 4 baris bersajak a-b-a-b, kalimat perintah/tanya/berita.',
          pkn: 'Pendidikan Pancasila SD Kelas 4: Simbol dan nilai 5 sila Pancasila, pengamalan sila ke-4 (musyawarah) dan ke-5 (keadilan), norma hukum dan aturan di masyarakat, hak dan kewajiban anak, gotong royong.',
          pai: 'Pendidikan Agama Islam SD Kelas 4: Rukun Iman lengkap (Iman kepada Allah, Malaikat, Kitab, Rasul, Hari Kiamat, Qada & Qadar), kisah Nabi Muhammad SAW bergelar Al-Amin, tugas malaikat (Jibril, Mikail, dll), akhlak mahmudah.',
          campuran: 'Campuran seimbang Matematika (bilangan cacah besar & KPK/FPB), IPAS (wujud zat & gaya gravitasi), Bahasa Indonesia (gagasan pokok & kata baku), Pendidikan Pancasila, dan PAI SD Kelas 4.'
        }
      },
      5: {
        phase: 'Fase C',
        ageRange: '10-11',
        guidelines: 'Konsep analitis dan terstruktur. Meliputi pemahaman sistem tubuh, pecahan desimal/persen, teks eksplanasi, dan norma kenegaraan.',
        subjects: {
          matematika: 'Matematika SD Kelas 5: Operasi hitung pecahan (pecahan biasa, campuran, desimal, dan persen), perbandingan dan skala pada denah/peta, volume kubus dan balok (rumus s³ dan p×l×t), jaring-jaring bangun ruang.',
          ipas: 'IPAS SD Kelas 5: Sistem organ pernapasan, pencernaan, dan peredaran darah manusia, rantai makanan dan jaring-jaring makanan dalam ekosistem, sifat cahaya dan bunyi, magnet dan listrik sederhana, siklus air.',
          bahasa_indonesia: 'Bahasa Indonesia SD Kelas 5: Teks eksplanasi ilmiah anak, imbuhan (pe-an, me-kan), surat dinas dan surat pribadi, pidato persuasif, majas personifikasi dan hiperbola, menemukan fakta dan opini.',
          pkn: 'Pendidikan Pancasila SD Kelas 5: Nilai-nilai luhur Pancasila dalam kehidupan berbangsa dan bernegara, menjaga keutuhan Negara Kesatuan Republik Indonesia (NKRI), keragaman budaya nusantara, norma hukum dan sanksi.',
          pai: 'Pendidikan Agama Islam SD Kelas 5: Beriman kepada Hari Akhir (Hari Kiamat), zakat fitrah dan zakat mal, kisah keteladanan Khulafaur Rasyidin (Abu Bakar, Umar, Utsman, Ali), sikap toleran dan adil.',
          campuran: 'Campuran seimbang Matematika (pecahan & volume bangun ruang), IPAS (sistem organ tubuh & ekosistem), Bahasa Indonesia (teks eksplanasi & imbuhan), Pendidikan Pancasila, dan PAI SD Kelas 5.'
        }
      },
      6: {
        phase: 'Fase C',
        ageRange: '11-12',
        guidelines: 'Tingkat kesiapan akhir SD. Soal mengasah penalaran tingkat tinggi (HOTS) yang sesuai usia 11-12 tahun, logika bilangan bulat, tata surya, dan teks laporan.',
        subjects: {
          matematika: 'Matematika SD Kelas 6: Bilangan bulat negatif dan positif pada garis bilangan, operasi hitung campuran (+, -, ×, :), unsur dan keliling/luas lingkaran (π × r²), bangun ruang prisma, tabung, kerucut, bola, pengolahan data statistik (modus, median, rata-rata mean).',
          ipas: 'IPAS SD Kelas 6: Perkembangbiakan tumbuhan dan hewan (generatif dan vegetatif alami/buatan), sistem tata surya (planet, revolusi dan rotasi bumi, gerhana matahari dan bulan), pubertas pada remaja, adaptasi makhluk hidup dengan lingkungannya.',
          bahasa_indonesia: 'Bahasa Indonesia SD Kelas 6: Teks laporan hasil pengamatan (LHO), teks pidato perpisahan sekolah, formulir pendaftaran, peribahasa nusantara, menyimpulkan pesan tersirat dalam karya sastra.',
          pkn: 'Pendidikan Pancasila SD Kelas 6: Penerapan nilai Pancasila dalam sejarah perjuangan bangsa (BPUPKI, PPKI, Proklamasi 17 Agustus 1945), persatuan bangsa, cinta produk dalam negeri, kerja sama antarnegara ASEAN.',
          pai: 'Pendidikan Agama Islam SD Kelas 6: Memahami Qada dan Qadar Allah SWT, puasa wajib Ramadhan dan puasa sunnah, kisah dakwah Walisongo di Nusantara, adab menghormati guru dan orang tua, berbuat ihsan.',
          campuran: 'Campuran seimbang Matematika (bilangan bulat negatif, lingkaran, mean/median), IPAS (tata surya & perkembangbiakan), Bahasa Indonesia (teks LHO & pidato), Pendidikan Pancasila (sejarah kemerdekaan & ASEAN), dan PAI SD Kelas 6.'
        }
      }
    };

    const currentCurriculum = gradeCurriculums[targetGrade] || gradeCurriculums[4];
    const targetSubjectDesc = currentCurriculum.subjects[subject] || currentCurriculum.subjects['campuran'];

    const prompt = `Buatkan ${count} soal kuis pilihan ganda yang baru, seru, dan edukatif khusus untuk anak Sekolah Dasar (SD) KELAS ${targetGrade} (${currentCurriculum.phase}, usia ${currentCurriculum.ageRange} tahun) Kurikulum Merdeka Indonesia.
Mata pelajaran target: ${targetSubjectDesc}.

Pedoman Tingkat Kesulitan untuk SD Kelas ${targetGrade}:
${currentCurriculum.guidelines}

Persyaratan Penting:
1. Soal dan pilihan jawaban WAJIB sangat sesuai dengan pemahaman dan kurikulum SD Kelas ${targetGrade}.
   ${targetGrade <= 2 ? '- Gunakan kalimat pendek, sederhana, konkret, dan mudah dibaca anak usia kelas awal.' : ''}
2. Setiap soal memiliki tepat 4 opsi jawaban (pilihan A, B, C, D).
3. Hanya 1 jawaban yang benar (correctIndex dari 0 sampai 3).
4. Sediakan pembahasan ringkas ("explanation") yang mendidik, ramah, dan memotivasi anak SD Kelas ${targetGrade}.
5. Pastikan soal bervariasi, mendidik, dan tidak membosankan.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: `Anda adalah seorang Ahli Kurikulum Pendidikan Dasar SD Kelas ${targetGrade} Indonesia Kurikulum Merdeka yang ramah, ceria, dan teliti dalam membuat soal-soal kuis berkualitas tinggi sesuai usia anak.`,
        temperature: 0.8,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              subjectName: { type: Type.STRING, description: 'Nama pelajaran (Matematika, IPAS, Bahasa Indonesia, Pendidikan Pancasila, atau PAI)' },
              question: { type: Type.STRING, description: `Teks soal kuis untuk SD Kelas ${targetGrade}` },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '4 pilihan jawaban ganda'
              },
              correctIndex: { type: Type.INTEGER, description: 'Indeks jawaban benar (0=A, 1=B, 2=C, 3=D)' },
              explanation: { type: Type.STRING, description: `Pembahasan ringkas & jelas untuk anak SD Kelas ${targetGrade}` }
            },
            required: ['question', 'options', 'correctIndex', 'explanation']
          }
        }
      }
    });

    const jsonText = response.text || '[]';
    const rawQuestions = JSON.parse(jsonText);

    if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) {
      throw new Error('Format JSON dari AI tidak sesuai');
    }

    const questions = rawQuestions.map((q: any, idx: number) => {
      const rawOptions = (q.options && q.options.length === 4)
        ? q.options.map((opt: any) => String(opt).trim())
        : ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'];
      const rawCorrectIndex = typeof q.correctIndex === 'number' && q.correctIndex >= 0 && q.correctIndex <= 3
        ? q.correctIndex
        : 0;

      // Shuffle options and calculate new correctIndex
      const optionsWithMeta = rawOptions.map((text: string, oIdx: number) => ({
        text,
        isCorrect: oIdx === rawCorrectIndex,
      }));

      for (let i = optionsWithMeta.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsWithMeta[i], optionsWithMeta[j]] = [optionsWithMeta[j], optionsWithMeta[i]];
      }

      const shuffledOptions = optionsWithMeta.map((o: any) => o.text);
      const newCorrectIndex = optionsWithMeta.findIndex((o: any) => o.isCorrect);

      return {
        id: `ai_g${targetGrade}_${Date.now()}_${idx}`,
        subject: subject,
        grade: targetGrade,
        subjectName: q.subjectName || getSubjectDisplayName(subject),
        question: q.question,
        options: shuffledOptions,
        correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
        explanation: q.explanation || 'Pembahasan tidak tersedia.'
      };
    });

    return res.json({
      success: true,
      grade: targetGrade,
      questions,
      fallback: false
    });

  } catch (err: any) {
    console.error('Error in /api/generate-questions:', err);
    return res.json({
      success: true,
      fallback: true,
      message: 'Terjadi kendala saat menghubungi AI. Menggunakan bank soal bawaan.',
      error: err?.message
    });
  }
});


function getSubjectDisplayName(subject: string): string {
  switch (subject) {
    case 'matematika': return 'Matematika';
    case 'ipas': return 'IPAS';
    case 'bahasa_indonesia': return 'Bahasa Indonesia';
    case 'pkn': return 'Pendidikan Pancasila';
    case 'pai': return 'Pendidikan Agama Islam';
    default: return 'Campuran';
  }
}

async function startServer() {
  // Vite middleware for dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Kuis 2 Pemain Server running on http://localhost:${PORT}`);
  });
}

startServer();
