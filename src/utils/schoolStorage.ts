import { SchoolProfile } from '../types';

export const DEFAULT_STUDENT_NAMES: string[] = [
  'Aqila', 'Rasty', 'Pahmi', 'Adit', 'Marsyah', 'Kesya', 'Abang', 'Maulana',
  'April', 'Siti', 'Haikal', 'Yufi', 'Lia', 'Sora', 'febi', 'Irham',
  'Lila', 'Dian', 'Faijar', 'Tasya', 'Puput', 'Mario', 'Risky', 'Hijrah'
];

export const DEFAULT_SCHOOL_PROFILE: SchoolProfile = {
  schoolName: 'SD Negeri 047 Tarakan',
  className: 'Kelas 4. A Bais',
  teacherName: 'ujangil',
  students: DEFAULT_STUDENT_NAMES,
  defaultGrade: 4,
};

const STORAGE_KEY = 'kuis_bais_school_profile_v2';

export function loadSchoolProfile(): SchoolProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('kuis_bais_school_profile_v1');
    if (!raw) return DEFAULT_SCHOOL_PROFILE;
    const parsed = JSON.parse(raw);
    const teacher = (parsed.teacherName?.trim() && parsed.teacherName !== 'Pk Ilham')
      ? parsed.teacherName.trim()
      : 'ujangil';

    const defaultGrade = (typeof parsed.defaultGrade === 'number' && parsed.defaultGrade >= 1 && parsed.defaultGrade <= 6)
      ? parsed.defaultGrade
      : 4;

    return {
      schoolName: parsed.schoolName?.trim() || DEFAULT_SCHOOL_PROFILE.schoolName,
      className: parsed.className?.trim() || DEFAULT_SCHOOL_PROFILE.className,
      teacherName: teacher,
      students: Array.isArray(parsed.students) && parsed.students.length > 0
        ? parsed.students.map((s: any) => String(s).trim()).filter(Boolean)
        : DEFAULT_STUDENT_NAMES,
      defaultGrade,
    };
  } catch (err) {

    console.error('Failed to load school profile from localStorage:', err);
    return DEFAULT_SCHOOL_PROFILE;
  }
}

export function saveSchoolProfile(profile: SchoolProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save school profile to localStorage:', err);
  }
}

export function resetSchoolProfile(): SchoolProfile {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset school profile:', err);
  }
  return { ...DEFAULT_SCHOOL_PROFILE };
}

/**
 * Clean student names from string (e.g. pasted from Excel / Word / WhatsApp)
 * Supports comma-separated, newline-separated, numbered lists (e.g. "1. Budi", "2) Siti", "- Andi")
 */
export function parseAndCleanStudentList(rawText: string): string[] {
  if (!rawText || !rawText.trim()) return [];

  const lines = rawText
    .split(/[\r\n,]+/)
    .map((line) => {
      // Remove leading numbers, periods, dashes, bullets, tabs
      return line
        .replace(/^[\s\d.\-–—)\]•*]+/, '')
        .trim();
    })
    .filter((name) => name.length >= 2 && name.length <= 40);

  // Deduplicate case-insensitively while preserving original casing
  const seen = new Set<string>();
  const cleaned: string[] = [];

  for (const name of lines) {
    const lower = name.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      cleaned.push(name);
    }
  }

  return cleaned;
}
