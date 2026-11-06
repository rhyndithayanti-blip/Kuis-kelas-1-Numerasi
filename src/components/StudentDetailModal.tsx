import React from 'react';
import { CONFIG } from '../config';
import { ExamResult, Question } from '../types';
import { downloadStudentResultPDF } from '../utils/pdfGenerator';
import {
  X,
  Download,
  User,
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface StudentDetailModalProps {
  result: ExamResult | null;
  questions: Question[];
  isOpen: boolean;
  onClose: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  result,
  questions,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !result) return null;

  const isPass = result.status === 'Lulus' || result.nilai >= CONFIG.KKTP;
  const scores = result.itemScores || {};

  // Analisis kelemahan butir soal
  const wrongQuestions = questions.filter((q) => {
    const sc = scores[q.id];
    return sc === undefined || sc === 0;
  });

  const partialQuestions = questions.filter((q) => {
    const sc = scores[q.id];
    return sc !== undefined && sc > 0 && sc < 5;
  });

  const correctQuestions = questions.filter((q) => {
    const sc = scores[q.id];
    return sc === 5;
  });

  // Kumpulan topik materi yang belum dikuasai
  const weakTopics = Array.from(
    new Set([...wrongQuestions, ...partialQuestions].map((q) => q.topic))
  );

  // Kumpulan indikator yang belum tuntas
  const weakIndicators = Array.from(
    new Set([...wrongQuestions, ...partialQuestions].map((q) => q.indicator || q.topic))
  );

  // Rekomendasi remedial spesifik
  const generateRecommendations = () => {
    const recs: string[] = [];

    if (wrongQuestions.length === 0 && partialQuestions.length === 0) {
      recs.push(
        'Penguasaan materi sangat sempurna. Peserta didik siap diberikan materi pengayaan (level L3) dan tantangan pemecahan masalah numerasi tingkat lanjut.'
      );
      return recs;
    }

    const hasBilangan = [...wrongQuestions, ...partialQuestions].some(
      (q) => q.element === 'Bilangan'
    );
    const hasAljabar = [...wrongQuestions, ...partialQuestions].some(
      (q) => q.element === 'Aljabar'
    );
    const hasGeometri = [...wrongQuestions, ...partialQuestions].some(
      (q) => q.element === 'Geometri'
    );
    const hasPengukuran = [...wrongQuestions, ...partialQuestions].some(
      (q) => q.element === 'Pengukuran'
    );

    if (hasBilangan) {
      recs.push(
        'Latihan terbimbing menggunakan benda konkret (kartu angka, stik hitung, atau kelereng) untuk memperkuat pemahaman operasi penjumlahan dan pengurangan sampai 20.'
      );
    }
    if (hasAljabar) {
      recs.push(
        'Latihan pengenalan pola bilangan loncat dengan media lompat garis bilangan interaktif dan pasangan bilangan menuju 10/20 (number bonds).'
      );
    }
    if (hasGeometri) {
      recs.push(
        'Pengenalan kembali ciri bangun datar (lingkaran, segitiga, persegi) melalui benda nyata di lingkungan ruang kelas dan rumah.'
      );
    }
    if (hasPengukuran) {
      recs.push(
        'Praktik langsung membandingkan berat benda menggunakan timbangan sederhana serta estimasi panjang menggunakan satuan tidak baku (jengkal/langkah).'
      );
    }

    recs.push(
      'Pendampingan belajar individual bersama guru kelas dan latihan soal bergradasi (mudah ke sedang) selama 15-20 menit per hari.'
    );

    return recs;
  };

  const recommendations = generateRecommendations();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">{result.nama}</h3>
                <span
                  className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    isPass
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isPass ? 'TUNTAS' : 'REMEDIAL'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Nomor Absen: <strong className="text-slate-700">{result.noAbsen}</strong> • Kelas{' '}
                <strong className="text-slate-700">{result.kelas || CONFIG.KELAS}</strong> • Durasi:{' '}
                <strong className="text-slate-700">{result.durasiPengerjaan || '15 Menit'}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="py-4 space-y-5 overflow-y-auto pr-1 text-xs sm:text-sm">
          {/* Ringkasan Skor Utama */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200">
              <span className="text-[11px] font-bold text-blue-800 block">Nilai Akhir</span>
              <span className="text-2xl font-black text-blue-900">{result.nilai}</span>
              <span className="text-[10px] text-blue-600 block mt-0.5">KKTP: {CONFIG.KKTP}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-800 block">Benar Penuh</span>
              <span className="text-2xl font-black text-emerald-900">{correctQuestions.length}</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">Skor 5 Poin</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-800 block">Benar Sebagian</span>
              <span className="text-2xl font-black text-amber-900">{partialQuestions.length}</span>
              <span className="text-[10px] text-amber-600 block mt-0.5">Skor 2.5 Poin</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
              <span className="text-[11px] font-bold text-rose-800 block">Salah</span>
              <span className="text-2xl font-black text-rose-900">{wrongQuestions.length}</span>
              <span className="text-[10px] text-rose-600 block mt-0.5">Skor 0 Poin</span>
            </div>
          </div>

          {/* Matriks Jawaban Butir Soal 1 s.d. 20 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Rincian Status Jawaban Per Butir Soal (1 - 20)</span>
              </h4>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Benar (5)
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Sebagian (2.5)
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Salah (0)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 gap-2">
              {questions.map((q) => {
                const sc = scores[q.id] !== undefined ? scores[q.id] : 0;
                let bgClass = 'bg-rose-50 border-rose-300 text-rose-800';
                let badgeText = '0';
                if (sc === 5) {
                  bgClass = 'bg-emerald-50 border-emerald-300 text-emerald-800';
                  badgeText = '5';
                } else if (sc > 0) {
                  bgClass = 'bg-amber-50 border-amber-300 text-amber-800';
                  badgeText = '2.5';
                }

                return (
                  <div
                    key={q.id}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${bgClass}`}
                    title={`Soal ${q.id}: ${q.topic} (${q.element}) - Skor: ${sc}`}
                  >
                    <span className="text-[10px] font-bold text-slate-500">No {q.id}</span>
                    <span className="text-xs font-black">{badgeText}</span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold opacity-75">
                      {q.type === 'pg' ? 'PG' : 'PGK'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Analisis Kelemahan Indikator/Topik */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Analisis Kelemahan Indikator &amp; Topik Materi Siswa</span>
            </div>

            {weakTopics.length === 0 ? (
              <p className="text-xs text-emerald-800 font-medium bg-emerald-100/60 p-2.5 rounded-xl">
                Luar biasa! Siswa telah menguasai seluruh indikator dan topik materi numerasi dengan sangat baik.
              </p>
            ) : (
              <div className="space-y-1.5 text-xs text-amber-950">
                <p className="text-slate-600 font-medium">
                  Siswa mengalami kendala pada <strong>{wrongQuestions.length + partialQuestions.length} butir soal</strong>, khususnya pada indikator materi:
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {weakTopics.map((top, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white rounded-lg border border-amber-300 text-amber-900 font-bold text-[11px]"
                    >
                      • {top}
                    </span>
                  ))}
                </div>
                <div className="mt-2 space-y-1 pt-1 border-t border-amber-200">
                  {weakIndicators.slice(0, 3).map((ind, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                      <ArrowRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rekomendasi Tindak Lanjut & Remedial */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs sm:text-sm">
              <Lightbulb className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Rekomendasi Tindak Lanjut &amp; Program Remedial Terarah</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-blue-100">
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0">
          <button
            onClick={() => downloadStudentResultPDF(result)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Lembar Hasil Resmi (PDF)</span>
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
