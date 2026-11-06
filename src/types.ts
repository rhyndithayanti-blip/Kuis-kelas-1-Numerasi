/**
 * Definisi Type & Interface Aplikasi Tes Sumatif
 * SD NEGERI 3 LOLOAN TIMUR - KELAS 1 MATEMATIKA (NUMERASI)
 */

export type QuestionType = 'pg' | 'pgk_kategori';
export type Difficulty = 'Mudah' | 'Sedang' | 'Sukar';
export type CognitiveLevel = 'L1' | 'L2' | 'L3';
export type ElementType = 'Bilangan' | 'Aljabar' | 'Geometri' | 'Pengukuran';

export interface StudentBirthDate {
  hari: string;
  bulan: string;
  tahun: string;
}

export interface StudentIdentity {
  nama: string;
  noAbsen: string;
  tglLahir: StudentBirthDate;
}

export interface OptionItem {
  id: string; // e.g. 'A', 'B', 'C', 'D'
  text: string;
}

export interface StatementItem {
  id: string; // e.g. 's1', 's2'
  text: string;
  correctAnswer: boolean; // true = Benar, false = Salah
}

export interface Question {
  id: number;
  type: QuestionType;
  element: ElementType;
  cognitiveLevel: CognitiveLevel;
  difficulty: Difficulty;
  topic: string;
  indicator: string;
  scoreWeight: number; // e.g. 5
  text: string;
  imageSvg?: string; // Inline SVG markup for visual questions
  options?: OptionItem[]; // Untuk 'pg' (3 atau 4 opsi)
  statements?: StatementItem[]; // Untuk 'pgk_kategori' (tepat 2 pernyataan)
  correctAnswer?: string; // string untuk 'pg' (e.g. 'A', 'B', 'C', 'D')
  explanation: string;
}

export interface ShuffledQuestion extends Question {
  originalQuestionId: number;
  shuffledOptions?: OptionItem[];
}

export type AnswerValue = string | Record<string, boolean>;

export interface ExamResult {
  id?: string;
  timestamp: string;
  nama: string;
  noAbsen: string;
  kelas: string;
  tglLahir?: string;
  benar: number;
  salah: number;
  nilai: number;
  status: 'Lulus' | 'Belum Lulus'; // Sesuai KKTP
  durasiPengerjaan?: string; // e.g. "14 Menit"
  detailJawaban?: Record<number, AnswerValue>; // key = originalQuestionId (1..20)
  itemScores?: Record<number, number>; // key = originalQuestionId (1..20), value = score (5, 2.5, 0)
}

export type AppStage = 1 | 2 | 3 | 4;
