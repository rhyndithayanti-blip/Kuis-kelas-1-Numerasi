import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CONFIG } from '../config';
import { ExamResult, Question } from '../types';
import { downloadStudentResultPDF } from '../utils/pdfGenerator';
import {
  Award,
  CheckCircle2,
  XCircle,
  Download,
  RotateCcw,
  School,
  FileCheck,
  AlertTriangle,
  HelpCircle,
  Eye,
  Check,
} from 'lucide-react';

interface Stage3ResultProps {
  result: ExamResult;
  questions: Question[];
  allowReview: boolean;
  onRestart: () => void;
}

export const Stage3Result: React.FC<Stage3ResultProps> = ({
  result,
  questions,
  allowReview,
  onRestart,
}) => {
  const isPassed = result.status === 'Lulus' || result.nilai >= CONFIG.KKTP;

  useEffect(() => {
    if (isPassed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Fallback jika confetti gagal
      }
    }
  }, [isPassed]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Kartu Utama Hasil Tes */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 text-center relative overflow-hidden">
        {/* Latar Aksen Atas */}
        <div
          className={`absolute top-0 left-0 right-0 h-3 ${
            isPassed ? 'bg-emerald-500' : 'bg-amber-500'
          }`}
        />

        {/* Badge Kelulusan */}
        <div className="inline-flex items-center justify-center mb-4">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-md ${
              isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
            }`}
          >
            {isPassed ? <Award className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 mb-2 border border-blue-200">
          <School className="w-3.5 h-3.5" />
          {CONFIG.SEKOLAH}
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Laporan Hasil Tes Sumatif
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {CONFIG.MATA_PELAJARAN} (Lingkup Materi: {CONFIG.MATERI}) • Kelas {CONFIG.KELAS} (Fase A)
        </p>

        {/* Kotak Nilai Utama */}
        <div className="my-8 max-w-sm mx-auto p-6 rounded-3xl bg-slate-50 border border-slate-200">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Nilai Akhir Tes
          </p>
          <div
            className={`text-5xl sm:text-6xl font-black my-2 ${
              isPassed ? 'text-emerald-600' : 'text-amber-600'
            }`}
          >
            {result.nilai}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wide mt-1">
            {isPassed ? (
              <span className="bg-emerald-100 text-emerald-800 px-3.5 py-1 rounded-full flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                TUNTAS (Mencapai Standar KKTP)
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-800 px-3.5 py-1 rounded-full flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                REMEDIAL (Perlu Bimbingan Tambahan)
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            Standar Kriteria Ketercapaian Tujuan Pembelajaran (KKTP): <span className="font-bold text-slate-800">{CONFIG.KKTP}</span>
          </p>
        </div>

        {/* Rincian Identitas Siswa & Statistik Jawaban */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8 text-left">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-slate-500 block">Nama Siswa</span>
            <span className="font-bold text-slate-800 text-xs sm:text-sm truncate block">
              {result.nama}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-slate-500 block">Nomor Absen</span>
            <span className="font-bold text-slate-800 text-xs sm:text-sm block">
              {result.noAbsen}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] text-emerald-700 block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Jawaban Benar
            </span>
            <span className="font-black text-emerald-800 text-base sm:text-lg block">
              {result.benar} Soal
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
            <span className="text-[11px] text-rose-700 block flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" />
              Jawaban Salah
            </span>
            <span className="font-black text-rose-800 text-base sm:text-lg block">
              {result.salah} Soal
            </span>
          </div>
        </div>

        {/* Informasi Penyimpanan & Tanda Tangan */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-900 text-xs max-w-2xl mx-auto mb-8 text-left flex items-start gap-3">
          <FileCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-blue-950">
              Hasil tes Ananda telah tersimpan ke Google Spreadsheet sekolah.
            </p>
            <p className="mt-0.5 text-blue-800 leading-relaxed">
              Ananda dapat mengunduh lembar laporan hasil tes resmi dalam bentuk PDF di bawah ini. Lembar ini memuat kolom tanda tangan resmi Guru Kelas {CONFIG.KELAS} ({CONFIG.GURU}) dan Orang Tua/Wali Murid.
            </p>
          </div>
        </div>

        {/* Tombol Aksi: Download PDF & Tes Baru */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="btn-download-result-pdf"
            type="button"
            onClick={() => downloadStudentResultPDF(result)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Lembar Hasil (PDF)</span>
          </button>

          <button
            id="btn-restart-exam"
            type="button"
            onClick={onRestart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-300 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Tes Siswa Baru</span>
          </button>
        </div>

        {/* Fitur Kunci Jawaban / Pembahasan (Hanya tampil jika diaktifkan guru) */}
        {allowReview && (
          <div className="mt-10 pt-8 border-t border-slate-200 text-left max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <span>Kunci Jawaban &amp; Pembahasan Soal</span>
              </h4>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Fitur Pembahasan Aktif
              </span>
            </div>

            <div className="space-y-4">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-slate-50 text-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between font-bold text-slate-700">
                    <span>
                      Soal #{idx + 1} ({q.topic}) • {q.element}
                    </span>
                    <span className="text-blue-700">
                      {q.type === 'pg'
                        ? `Kunci: ${q.correctAnswer}`
                        : 'Kategori Benar/Salah'}
                    </span>
                  </div>

                  {q.imageSvg && (
                    <div
                      className="p-3 bg-white rounded-xl border border-slate-200 flex justify-center"
                      dangerouslySetInnerHTML={{ __html: q.imageSvg }}
                    />
                  )}

                  <p className="text-slate-800 font-medium">{q.text}</p>

                  {/* Kunci Jawaban PGK Kategori */}
                  {q.statements && (
                    <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200">
                      {q.statements.map((st, sI) => (
                        <div key={st.id} className="flex justify-between items-center text-[11px]">
                          <span>
                            {sI + 1}. {st.text}
                          </span>
                          <span
                            className={`font-black px-2 py-0.5 rounded text-[10px] ${
                              st.correctAnswer
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {st.correctAnswer ? 'BENAR' : 'SALAH'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-slate-700">
                    <span className="font-bold text-blue-900 block mb-0.5">Pembahasan:</span>
                    <p className="whitespace-pre-line">{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
