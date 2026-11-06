import React, { useState, useEffect, useMemo } from 'react';
import { CONFIG } from '../config';
import { ExamResult, Question, ElementType, CognitiveLevel, Difficulty } from '../types';
import { gasService } from '../services/gasService';
import {
  downloadStudentResultPDF,
  downloadExamQuestionsPDF,
  downloadResultsRecapPDF,
  downloadKisiKisiPDF,
  downloadItemAnalysisPDF,
  exportResultsToCSV,
  exportItemAnalysisToCSV,
} from '../utils/pdfGenerator';
import { QuestionEditorModal } from './QuestionEditorModal';
import { GasGuideModal } from './GasGuideModal';
import { GasSettingsModal } from './GasSettingsModal';
import { StudentDetailModal } from './StudentDetailModal';
import {
  Users,
  CheckCircle2,
  XCircle,
  TrendingUp,
  RefreshCw,
  Search,
  Filter,
  Download,
  FileDown,
  Trash2,
  Eye,
  FileSpreadsheet,
  Edit3,
  BookOpen,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Code2,
  ToggleLeft,
  ToggleRight,
  Check,
  Award,
  Settings,
  RotateCcw,
  Grid,
  Layers,
  Brain,
  Gauge,
  FileText,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface Stage4TeacherPanelProps {
  questions: Question[];
  onUpdateQuestion: (updated: Question) => void;
  allowReview: boolean;
  onToggleAllowReview: (val: boolean) => void;
  onResetDefaultQuestions?: () => void;
}

export const Stage4TeacherPanel: React.FC<Stage4TeacherPanelProps> = ({
  questions,
  onUpdateQuestion,
  allowReview,
  onToggleAllowReview,
  onResetDefaultQuestions,
}) => {
  // State data hasil siswa
  const [results, setResults] = useState<ExamResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Tab aktif di panel guru: 'matriks' (Matriks Respon Siswa), 'rekap' (Rekapitulasi Nilai), 'soal' (Bank Soal & Kisi-kisi)
  const [activeTab, setActiveTab] = useState<'matriks' | 'rekap' | 'soal'>('matriks');

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  // Sorting
  const [sortField, setSortField] = useState<'timestamp' | 'nama' | 'nilai' | 'noAbsen'>('noAbsen');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Modal states
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<ExamResult | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showGasGuide, setShowGasGuide] = useState(false);
  const [showGasSettings, setShowGasSettings] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<ExamResult | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Ambil data dari Google Apps Script / Lokal saat komponen dimuat
  const loadData = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await gasService.fetchExamResults();
      setResults(data);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      const localData = gasService.getLocalExamResults();
      setResults(localData);
      setApiError(
        'Sinkronisasi Google Spreadsheet belum aktif. Data hasil tes dimuat dari memori lokal perangkat ini.'
      );
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handler Hapus Data Siswa
  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;
    setIsDeleting(true);
    try {
      await gasService.deleteExamResult(studentToDelete.timestamp, studentToDelete.nama);
      setResults((prev) =>
        prev.filter(
          (r) =>
            r.id !== studentToDelete.id &&
            !(r.timestamp === studentToDelete.timestamp && r.nama === studentToDelete.nama)
        )
      );
      setIsDeleting(false);
      setStudentToDelete(null);
    } catch {
      setResults((prev) => prev.filter((r) => r.id !== studentToDelete.id));
      setIsDeleting(false);
      setStudentToDelete(null);
    }
  };

  // =========================================================================
  // KARTU RINGKASAN DISTRIBUSI SOAL (DIHITUNG OTOMATIS)
  // =========================================================================
  const questionDistribution = useMemo(() => {
    const total = questions.length;

    // 1. Distribusi Elemen / Kompetensi
    const elementCounts: Record<ElementType, number> = {
      Bilangan: 0,
      Aljabar: 0,
      Geometri: 0,
      Pengukuran: 0,
    };

    // 2. Distribusi Level Kognitif
    const cognitiveCounts: Record<CognitiveLevel, number> = {
      L1: 0,
      L2: 0,
      L3: 0,
    };

    // 3. Distribusi Tingkat Kesukaran
    const difficultyCounts: Record<Difficulty, number> = {
      Mudah: 0,
      Sedang: 0,
      Sukar: 0,
    };

    // 4. Distribusi Bentuk Soal
    let pgCount = 0;
    let pgkKategoriCount = 0;

    questions.forEach((q) => {
      if (q.element && elementCounts[q.element] !== undefined) {
        elementCounts[q.element]++;
      }
      if (q.cognitiveLevel && cognitiveCounts[q.cognitiveLevel] !== undefined) {
        cognitiveCounts[q.cognitiveLevel]++;
      }
      if (q.difficulty && difficultyCounts[q.difficulty] !== undefined) {
        difficultyCounts[q.difficulty]++;
      }
      if (q.type === 'pg') pgCount++;
      if (q.type === 'pgk_kategori') pgkKategoriCount++;
    });

    return {
      total,
      elementCounts,
      cognitiveCounts,
      difficultyCounts,
      pgCount,
      pgkKategoriCount,
    };
  }, [questions]);

  // Statistik Ringkasan Siswa
  const stats = useMemo(() => {
    const total = results.length;
    if (total === 0) {
      return { total: 0, lulus: 0, belumLulus: 0, rataRata: 0, persenLulus: 0 };
    }
    const lulus = results.filter((r) => r.status === 'Lulus' || r.nilai >= CONFIG.KKTP).length;
    const belumLulus = total - lulus;
    const sumNilai = results.reduce((acc, curr) => acc + (Number(curr.nilai) || 0), 0);
    const rataRata = Math.round((sumNilai / total) * 10) / 10;
    const persenLulus = Math.round((lulus / total) * 100);
    return { total, lulus, belumLulus, rataRata, persenLulus };
  }, [results]);

  // Filter & Sort Data Siswa
  const filteredAndSortedResults = useMemo(() => {
    let filtered = [...results];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((r) => r.nama.toLowerCase().includes(q));
    }

    if (filterStatus !== 'Semua') {
      filtered = filtered.filter((r) => {
        const isPass = r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;
        return filterStatus === 'Tuntas' ? isPass : !isPass;
      });
    }

    filtered.sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (sortField === 'nilai' || sortField === 'noAbsen') {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
      } else {
        valA = String(valA || '').toLowerCase();
        valB = String(valB || '').toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [results, searchQuery, filterStatus, sortField, sortDirection]);

  // =========================================================================
  // STATISTIK EMPIRIS PER BUTIR SOAL (UNTUK BARIS BAWAH MATRIKS)
  // =========================================================================
  const itemStatistics = useMemo(() => {
    const totalStudents = Math.max(1, results.length);

    return questions.map((q) => {
      let fullScoreCount = 0;
      let partialScoreCount = 0;
      let zeroScoreCount = 0;

      results.forEach((r) => {
        const score = (r.itemScores || {})[q.id];
        if (score === 5) {
          fullScoreCount++;
        } else if (score && score > 0 && score < 5) {
          partialScoreCount++;
        } else {
          zeroScoreCount++;
        }
      });

      // Daya serap / ketercapaian butir soal
      const effectiveCorrect = fullScoreCount + partialScoreCount * 0.5;
      const percentage = Math.round((effectiveCorrect / totalStudents) * 100);

      // Klasifikasi empiris tingkat kesukaran soal:
      // Mudah: >70%, Sedang: 30-70%, Sukar: <30%
      let empiricalDifficulty: 'Mudah' | 'Sedang' | 'Sukar' = 'Sedang';
      if (percentage > 70) empiricalDifficulty = 'Mudah';
      else if (percentage < 30) empiricalDifficulty = 'Sukar';

      return {
        questionId: q.id,
        type: q.type,
        fullScoreCount,
        partialScoreCount,
        zeroScoreCount,
        percentage,
        empiricalDifficulty,
      };
    });
  }, [questions, results]);

  const toggleSort = (field: 'timestamp' | 'nama' | 'nilai' | 'noAbsen') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                Panel Guru &amp; Pengelolaan Evaluasi
              </span>
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                Kelas {CONFIG.KELAS} (Fase A) • {CONFIG.MATA_PELAJARAN} ({CONFIG.MATERI})
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                KKTP: {CONFIG.KKTP}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {CONFIG.SEKOLAH}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Kepala Sekolah: <strong className="text-slate-700">{CONFIG.KEPALA_SEKOLAH}</strong> (NIP. {CONFIG.NIP_KEPALA_SEKOLAH}) • Guru:{' '}
              <strong className="text-slate-700">{CONFIG.GURU}</strong> ({CONFIG.NIP_LABEL_GURU} {CONFIG.NIP_GURU})
            </p>
          </div>

          {/* Tombol Aksi Cepat */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowGasSettings(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200 cursor-pointer"
              title="Pengaturan URL Google Apps Script"
            >
              <Settings className="w-3.5 h-3.5 text-blue-600" />
              <span>URL Spreadsheet</span>
            </button>

            <button
              onClick={() => setShowGasGuide(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
              title="Panduan Skrip GAS"
            >
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Panduan GAS</span>
            </button>

            <button
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>REFRESH DATA</span>
            </button>
          </div>
        </div>

        {/* Toggle Otorisasi Pembahasan Siswa */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Akses Pembahasan Siswa:</span>
            <span className="text-slate-500">
              {allowReview
                ? 'Siswa diperbolehkan melihat pembahasan dan kunci jawaban setelah selesai mengerjakan.'
                : 'Kunci jawaban dan pembahasan terkunci / disembunyikan dari siswa.'}
            </span>
          </div>
          <button
            onClick={() => onToggleAllowReview(!allowReview)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              allowReview
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200'
            }`}
          >
            {allowReview ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4" />}
            <span>{allowReview ? 'Pembahasan Aktif' : 'Pembahasan Nonaktif'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 KARTU RINGKASAN DISTRIBUSI SOAL (MENGHITUNG OTOMATIS SESUAI SPESIFIKASI) */}
      {/* ========================================================================= */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Ringkasan Distribusi &amp; Karakteristik Soal ({questionDistribution.total} Butir)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Otomatis menghitung distribusi elemen, level kognitif, kesukaran, dan bentuk soal Kurikulum Merdeka.
            </p>
          </div>

          {/* Tombol Unduh PDF Kisi-Kisi Soal */}
          <button
            onClick={() => downloadKisiKisiPDF(questions)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-300 shadow-2xs cursor-pointer"
            title="Unduh Dokumen Kedinasan Kisi-Kisi Penulisan Soal Tes Sumatif (PDF)"
          >
            <FileDown className="w-4 h-4 text-blue-700" />
            <span>Unduh PDF Kisi-Kisi Soal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Distribusi Elemen / Kompetensi */}
          <div className="bg-white rounded-2xl p-4.5 shadow-xs border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Elemen / Kompetensi</span>
                </span>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  4 Elemen
                </span>
              </div>
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Bilangan:</span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {questionDistribution.elementCounts.Bilangan} Soal
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Aljabar:</span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {questionDistribution.elementCounts.Aljabar} Soal
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Geometri:</span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {questionDistribution.elementCounts.Geometri} Soal
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Pengukuran:</span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {questionDistribution.elementCounts.Pengukuran} Soal
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
              Materi Pokok: Numerasi Dasar Kelas 1
            </div>
          </div>

          {/* Card 2: Distribusi Level Kognitif */}
          <div className="bg-white rounded-2xl p-4.5 shadow-xs border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span>Level Kognitif</span>
                </span>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  L1 - L3
                </span>
              </div>
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">L1 (Pengetahuan/Pemahaman):</span>
                  <span className="font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">
                    {questionDistribution.cognitiveCounts.L1} Soal
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">L2 (Aplikasi / Penerapan):</span>
                  <span className="font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">
                    {questionDistribution.cognitiveCounts.L2} Soal
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">L3 (Penalaran / HOTS):</span>
                  <span className="font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">
                    {questionDistribution.cognitiveCounts.L3} Soal
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
              Proporsi dominan: Aplikasi kontekstual (L2)
            </div>
          </div>

          {/* Card 3: Distribusi Tingkat Kesukaran */}
          <div className="bg-white rounded-2xl p-4.5 shadow-xs border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-emerald-600" />
                  <span>Tingkat Kesukaran</span>
                </span>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  3 Tingkat
                </span>
              </div>
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Mudah:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {questionDistribution.difficultyCounts.Mudah} Soal
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Sedang:</span>
                  <span className="font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                    {questionDistribution.difficultyCounts.Sedang} Soal
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Sukar:</span>
                  <span className="font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                    {questionDistribution.difficultyCounts.Sukar} Soal
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
              Sesuai kaidah kurikulum sekolah dasar
            </div>
          </div>

          {/* Card 4: Distribusi Bentuk Soal */}
          <div className="bg-white rounded-2xl p-4.5 shadow-xs border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Bentuk Soal</span>
                </span>
                <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                  2 Tipe
                </span>
              </div>
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Pilihan Ganda:</span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    {questionDistribution.pgCount} Butir
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">PGK Kategori (B / S):</span>
                  <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                    {questionDistribution.pgkKategoriCount} Butir
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                  <span className="text-slate-700 font-bold">Total Bobot Skor:</span>
                  <span className="font-black text-blue-700">100 Poin</span>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
              Masing-masing bernilai 5 poin (maks. 100)
            </div>
          </div>
        </div>
      </div>

      {/* Navigasi Tab */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-3xl px-6 pt-3 gap-6 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('matriks')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'matriks'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Matriks Respon Siswa (Analisis Butir)</span>
          <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
            {results.length} Siswa
          </span>
        </button>

        <button
          onClick={() => setActiveTab('rekap')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'rekap'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Rekapitulasi Nilai Siswa</span>
        </button>

        <button
          onClick={() => setActiveTab('soal')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'soal'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Bank Soal &amp; Kisi-Kisi ({questions.length} Butir)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: MATRIKS RESPON SISWA (ANALISIS BUTIR SOAL PER SISWA) */}
      {/* ========================================================================= */}
      {activeTab === 'matriks' && (
        <div className="bg-white rounded-b-3xl p-6 shadow-xs border border-t-0 border-slate-200 space-y-5">
          {/* Baris Filter & Tombol Ekspor Matriks */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Cari Nama */}
              <div className="relative flex-1 sm:flex-initial sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama siswa..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Filter Status */}
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                >
                  <option value="Semua">Semua Ketercapaian</option>
                  <option value="Tuntas">Tuntas (≥ {CONFIG.KKTP})</option>
                  <option value="Remedial">Remedial (&lt; {CONFIG.KKTP})</option>
                </select>
              </div>
            </div>

            {/* Tombol Ekspor Khusus Matriks */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <button
                onClick={() => exportItemAnalysisToCSV(filteredAndSortedResults, questions)}
                disabled={results.length === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-300 disabled:opacity-50 cursor-pointer shadow-2xs"
                title="Ekspor Matriks Respon Siswa ke format Excel / CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ekspor Matriks ke Excel / CSV</span>
              </button>

              <button
                onClick={() => downloadItemAnalysisPDF(filteredAndSortedResults, questions)}
                disabled={results.length === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors border border-rose-300 disabled:opacity-50 cursor-pointer shadow-2xs"
                title="Unduh Laporan Analisis Butir Soal & Matriks Jawaban (PDF Resmi Landscape)"
              >
                <FileDown className="w-3.5 h-3.5 text-rose-600" />
                <span>Cetak / Unduh PDF Analisis Butir</span>
              </button>
            </div>
          </div>

          {/* Legenda Visual Warna Matriks */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-bold text-slate-700">Keterangan Visual Status Jawaban:</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500 text-white font-bold flex items-center justify-center text-[9px]">
                  ✓
                </span>
                <strong className="text-emerald-800">Hijau:</strong> Benar (Skor Penuh / 5 Poin)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-amber-500 text-white font-bold flex items-center justify-center text-[9px]">
                  ½
                </span>
                <strong className="text-amber-800">Kuning/Oranye:</strong> Benar Sebagian (PGK Kategori / 2.5 Poin)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-rose-500 text-white font-bold flex items-center justify-center text-[9px]">
                  ✗
                </span>
                <strong className="text-rose-800">Merah:</strong> Salah (Skor 0 Poin)
              </span>
            </div>
            <div className="text-slate-500 text-[11px] font-semibold">
              *Klik baris nama siswa untuk melihat modal <strong>Detail Analisis Siswa</strong>
            </div>
          </div>

          {/* TABEL MATRIKS INTERAKTIF */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-2 w-10 text-center">No</th>
                  <th
                    className="py-3 px-2.5 cursor-pointer hover:bg-slate-100 transition-colors text-center w-14"
                    onClick={() => toggleSort('noAbsen')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Abs</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors min-w-[160px]"
                    onClick={() => toggleSort('nama')}
                  >
                    <div className="flex items-center gap-1">
                      <span>Nama Siswa</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>

                  {/* Kolom Soal 1 s.d. 20 */}
                  {questions.map((q) => (
                    <th
                      key={q.id}
                      className="py-3 px-1 text-center w-9 border-l border-slate-200 bg-slate-50 hover:bg-blue-50 transition-colors"
                      title={`Soal #${q.id}: ${q.topic} (${q.element} - ${q.type === 'pg' ? 'Pilihan Ganda' : 'PGK Kategori'})`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-extrabold text-blue-900">Q{q.id}</span>
                        <span className="text-[9px] font-semibold text-slate-400">
                          {q.type === 'pg' ? 'PG' : 'PGK'}
                        </span>
                      </div>
                    </th>
                  ))}

                  {/* Kolom Rekapitulasi Sisi Kanan */}
                  <th
                    className="py-3 px-2.5 text-center cursor-pointer hover:bg-slate-100 transition-colors border-l border-slate-200"
                    onClick={() => toggleSort('nilai')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Skor</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th
                    className="py-3 px-2.5 text-center cursor-pointer hover:bg-slate-100 transition-colors"
                    onClick={() => toggleSort('nilai')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Nilai</span>
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-2.5 text-center">Durasi</th>
                  <th className="py-3 px-2 text-center w-16">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredAndSortedResults.length === 0 ? (
                  <tr>
                    <td colSpan={28} className="py-12 text-center text-slate-500">
                      Belum ada data respons siswa. Siswa dapat mengerjakan tes di halaman depan.
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedResults.map((r, idx) => {
                    const scores = r.itemScores || {};
                    const totalScore =
                      Object.values(scores).reduce<number>((a, b) => a + (Number(b) || 0), 0) || r.nilai;
                    const isPass = r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;

                    return (
                      <tr
                        key={r.id || idx}
                        onClick={() => setSelectedStudentForDetail(r)}
                        className="hover:bg-blue-50/60 cursor-pointer transition-colors group"
                      >
                        <td className="py-2.5 px-2 text-center font-mono text-slate-400 text-xs">
                          {idx + 1}
                        </td>
                        <td className="py-2.5 px-2.5 text-center font-mono font-bold text-slate-700">
                          {r.noAbsen}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          <div className="flex items-center justify-between">
                            <span>{r.nama}</span>
                            <Eye className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </td>

                        {/* Sel Jawaban Butir Soal 1 s.d. 20 */}
                        {questions.map((q) => {
                          const sc = scores[q.id];
                          const score = sc !== undefined ? sc : 0;

                          if (score === 5) {
                            return (
                              <td
                                key={q.id}
                                className="py-2 px-1 text-center border-l border-slate-200 bg-emerald-50/50"
                                title={`Soal #${q.id}: Benar Penuh (Skor 5)`}
                              >
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[11px] border border-emerald-300">
                                  5
                                </span>
                              </td>
                            );
                          } else if (score > 0 && score < 5) {
                            return (
                              <td
                                key={q.id}
                                className="py-2 px-1 text-center border-l border-slate-200 bg-amber-50/50"
                                title={`Soal #${q.id}: Benar Sebagian (Skor 2.5)`}
                              >
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-amber-100 text-amber-800 font-extrabold text-[10px] border border-amber-300">
                                  2.5
                                </span>
                              </td>
                            );
                          } else {
                            return (
                              <td
                                key={q.id}
                                className="py-2 px-1 text-center border-l border-slate-200 bg-rose-50/50"
                                title={`Soal #${q.id}: Salah (Skor 0)`}
                              >
                                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-rose-100 text-rose-800 font-extrabold text-[11px] border border-rose-300">
                                  0
                                </span>
                              </td>
                            );
                          }
                        })}

                        {/* Kolom Skor, Nilai, Status, Durasi */}
                        <td className="py-2.5 px-2.5 text-center font-mono font-bold text-slate-700 border-l border-slate-200">
                          {totalScore}
                        </td>
                        <td className="py-2.5 px-2.5 text-center">
                          <span
                            className={`font-black text-sm px-2 py-0.5 rounded ${
                              isPass ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                            }`}
                          >
                            {r.nilai}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide ${
                              isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isPass ? 'Tuntas' : 'Remedial'}
                          </span>
                        </td>
                        <td className="py-2.5 px-2.5 text-center text-slate-600 font-medium text-[11px] whitespace-nowrap">
                          {r.durasiPengerjaan || '15 Menit'}
                        </td>
                        <td
                          className="py-2.5 px-2 text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => downloadStudentResultPDF(r)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                              title="Download Lembar Hasil Siswa (PDF)"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setStudentToDelete(r)}
                              className="p-1.5 text-rose-600 hover:text-rose-800 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                              title="Hapus Data"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>

              {/* ========================================================================= */}
              {/* BARIS STATISTIK EMPIRIS DI BAGIAN BAWAH PER BUTIR SOAL */}
              {/* ========================================================================= */}
              <tfoot className="bg-slate-100/90 text-slate-800 font-bold border-t-2 border-slate-300">
                {/* 1. Baris Jumlah Siswa Menjawab Benar */}
                <tr className="border-b border-slate-200">
                  <td colSpan={3} className="py-2 px-3 text-slate-700 font-bold text-xs">
                    Jumlah Siswa Menjawab Benar (Penuh)
                  </td>
                  {itemStatistics.map((stat) => (
                    <td
                      key={stat.questionId}
                      className="py-2 px-1 text-center font-mono font-black text-emerald-800 border-l border-slate-200"
                    >
                      {stat.fullScoreCount}
                    </td>
                  ))}
                  <td colSpan={5} className="py-2 px-3 text-slate-500 font-normal text-[11px]">
                    Dari total {results.length} siswa
                  </td>
                </tr>

                {/* 2. Baris Persentase Ketercapaian Butir (%) */}
                <tr className="border-b border-slate-200 bg-white">
                  <td colSpan={3} className="py-2 px-3 text-slate-700 font-bold text-xs">
                    Persentase Ketercapaian Butir (%)
                  </td>
                  {itemStatistics.map((stat) => (
                    <td
                      key={stat.questionId}
                      className="py-2 px-1 text-center font-mono font-black text-blue-900 border-l border-slate-200 text-[11px]"
                    >
                      {stat.percentage}%
                    </td>
                  ))}
                  <td colSpan={5} className="py-2 px-3 text-slate-500 font-normal text-[11px]">
                    Daya serap butir soal
                  </td>
                </tr>

                {/* 3. Baris Klasifikasi Empiris Tingkat Kesukaran */}
                <tr className="bg-slate-50">
                  <td colSpan={3} className="py-2 px-3 text-slate-700 font-bold text-xs">
                    Klasifikasi Empiris Tingkat Kesukaran
                  </td>
                  {itemStatistics.map((stat) => (
                    <td
                      key={stat.questionId}
                      className="py-2 px-1 text-center border-l border-slate-200"
                    >
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                          stat.empiricalDifficulty === 'Mudah'
                            ? 'bg-emerald-100 text-emerald-800'
                            : stat.empiricalDifficulty === 'Sedang'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                        title={`Ketercapaian: ${stat.percentage}%`}
                      >
                        {stat.empiricalDifficulty}
                      </span>
                    </td>
                  ))}
                  <td colSpan={5} className="py-2 px-3 text-slate-500 font-normal text-[10px]">
                    Mudah (&gt;70%), Sedang (30-70%), Sukar (&lt;30%)
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: REKAPITULASI DATA NILAI SISWA (TABEL UMUM & SYNC SPREADSHEET) */}
      {/* ========================================================================= */}
      {activeTab === 'rekap' && (
        <div className="bg-white rounded-b-3xl p-6 shadow-xs border border-t-0 border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Data Nilai Siswa Google Spreadsheet ({results.length} Data)
              </h3>
              <p className="text-xs text-slate-500">
                Tersinkronisasi otomatis dengan Google Apps Script Web App
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => downloadResultsRecapPDF(filteredAndSortedResults)}
                disabled={results.length === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5 text-white" />
                <span>Download Rekap (PDF)</span>
              </button>
              <button
                onClick={() => exportResultsToCSV(results)}
                disabled={results.length === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-300 disabled:opacity-50 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                <span>Download CSV</span>
              </button>
            </div>
          </div>

          {/* Tabel Nilai Standar */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3 w-12 text-center">No</th>
                  <th className="py-3 px-3">Waktu Submit</th>
                  <th className="py-3 px-3">Nama Siswa</th>
                  <th className="py-3 px-3 text-center">Absen</th>
                  <th className="py-3 px-3 text-center text-emerald-700">Benar</th>
                  <th className="py-3 px-3 text-center text-rose-700">Salah</th>
                  <th className="py-3 px-3 text-center">Nilai</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-3 text-center">Durasi</th>
                  <th className="py-3 px-3 text-center w-28">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredAndSortedResults.map((r, idx) => {
                  const isPass = r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;
                  return (
                    <tr key={r.id || idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 text-center font-mono text-slate-500">{idx + 1}</td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-600">{r.timestamp}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{r.nama}</td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">{r.noAbsen}</td>
                      <td className="py-3 px-3 text-center font-bold text-emerald-700">{r.benar}</td>
                      <td className="py-3 px-3 text-center font-bold text-rose-700">{r.salah}</td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`font-black text-sm px-2 py-0.5 rounded ${
                            isPass ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'
                          }`}
                        >
                          {r.nilai}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {isPass ? 'Tuntas' : 'Remedial'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center text-slate-600 font-medium text-[11px]">
                        {r.durasiPengerjaan || '15 Menit'}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setSelectedStudentForDetail(r)}
                            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Lihat Detail Analisis"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => downloadStudentResultPDF(r)}
                            className="p-1.5 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                            title="Unduh PDF Lembar Hasil"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: BANK SOAL & KISI-KISI ({questions.length} BUTIR) */}
      {/* ========================================================================= */}
      {activeTab === 'soal' && (
        <div className="bg-white rounded-b-3xl p-6 shadow-xs border border-t-0 border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Bank Soal Matematika Numerasi Kelas {CONFIG.KELAS} ({questions.length} Butir)
              </h3>
              <p className="text-xs text-slate-500">
                15 Butir Pilihan Ganda, 5 Butir Pilihan Ganda Kompleks Kategori (Tepat 2 Pernyataan B/S)
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {onResetDefaultQuestions && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Kembalikan bank soal ke 20 butir standar Kelas 1 SD Negeri 3 Loloan Timur?')) {
                      onResetDefaultQuestions();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
                  <span>Reset ke Standar</span>
                </button>
              )}
              <button
                onClick={() => downloadKisiKisiPDF(questions)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-300 cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5 text-blue-700" />
                <span>Unduh Kisi-Kisi (PDF)</span>
              </button>
              <button
                onClick={() => downloadExamQuestionsPDF(questions)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Naskah Soal (PDF)</span>
              </button>
            </div>
          </div>

          {/* List Soal */}
          <div className="space-y-3">
            {questions.map((q) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 transition-colors space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-black text-xs px-2.5 py-1 rounded-md bg-blue-700 text-white">
                      #{q.id}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                      {q.type === 'pg' ? 'Pilihan Ganda' : 'PGK Kategori (B / S)'}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200">
                      {q.element}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                      {q.cognitiveLevel}
                    </span>
                    <span className="text-xs font-medium text-slate-600">{q.topic}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        q.difficulty === 'Mudah'
                          ? 'bg-emerald-100 text-emerald-800'
                          : q.difficulty === 'Sedang'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    <button
                      onClick={() => setEditingQuestion(q)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>

                {/* Indikator Soal */}
                {q.indicator && (
                  <div className="text-[11px] text-slate-500 font-medium bg-white p-2 rounded-lg border border-slate-200">
                    <strong className="text-slate-700">Indikator:</strong> {q.indicator}
                  </div>
                )}

                {/* Ilustrasi Gambar Soal (Jika Ada) */}
                {q.imageSvg && (
                  <div
                    className="p-3 bg-white rounded-xl border border-slate-200 flex justify-center"
                    dangerouslySetInnerHTML={{ __html: q.imageSvg }}
                  />
                )}

                {/* Teks Soal */}
                <p className="text-xs sm:text-sm text-slate-900 font-medium whitespace-pre-line">
                  {q.text}
                </p>

                {/* Opsi Jawaban PG */}
                {q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt) => {
                      const isCorrect = q.correctAnswer === opt.id;
                      return (
                        <div
                          key={opt.id}
                          className={`p-2.5 rounded-xl border flex items-start gap-2 ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="w-5 font-bold">{opt.id}.</span>
                          <span className="flex-1">{opt.text}</span>
                          {isCorrect && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Pernyataan Kategori (2 Pernyataan Benar/Salah) */}
                {q.statements && (
                  <div className="space-y-1.5 text-xs">
                    {q.statements.map((st, sIdx) => (
                      <div
                        key={st.id}
                        className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between"
                      >
                        <span className="pr-3">
                          <strong className="mr-1.5 text-blue-700">Pernyataan {sIdx + 1}:</strong>
                          {st.text}
                        </span>
                        <span
                          className={`font-black px-2.5 py-1 rounded text-[10px] shrink-0 ${
                            st.correctAnswer
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          {st.correctAnswer ? 'BENAR' : 'SALAH'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pembahasan */}
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700">
                  <span className="font-bold text-blue-900 block mb-0.5">Kunci Jawaban &amp; Pembahasan:</span>
                  <p className="whitespace-pre-line">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Detail Analisis Siswa */}
      <StudentDetailModal
        result={selectedStudentForDetail}
        questions={questions}
        isOpen={Boolean(selectedStudentForDetail)}
        onClose={() => setSelectedStudentForDetail(null)}
      />

      {/* Modal Edit Soal */}
      <QuestionEditorModal
        question={editingQuestion}
        isOpen={Boolean(editingQuestion)}
        onClose={() => setEditingQuestion(null)}
        onSave={(updated) => {
          onUpdateQuestion(updated);
          setEditingQuestion(null);
        }}
      />

      {/* Modal Panduan GAS */}
      <GasGuideModal isOpen={showGasGuide} onClose={() => setShowGasGuide(false)} />

      {/* Modal Pengaturan URL GAS */}
      <GasSettingsModal
        isOpen={showGasSettings}
        onClose={() => setShowGasSettings(false)}
        onOpenGasGuide={() => setShowGasGuide(true)}
        onDataSynced={loadData}
      />

      {/* Modal Konfirmasi Hapus Data Siswa */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Hapus Data Siswa</h3>
                <p className="text-xs text-slate-500">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 mb-5">
              Apakah Anda yakin ingin menghapus data ujian atas nama{' '}
              <strong className="text-slate-900 font-bold">{studentToDelete.nama}</strong> (Nomor
              Absen {studentToDelete.noAbsen})?
            </p>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setStudentToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
