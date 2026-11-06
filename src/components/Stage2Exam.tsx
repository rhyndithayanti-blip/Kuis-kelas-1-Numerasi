import React, { useState, useMemo, useRef } from 'react';
import { CONFIG } from '../config';
import {
  Question,
  ShuffledQuestion,
  StudentIdentity,
  AnswerValue,
  ExamResult,
  OptionItem,
} from '../types';
import { gasService } from '../services/gasService';
import { downloadExamQuestionsPDF } from '../utils/pdfGenerator';
import {
  ChevronLeft,
  ChevronRight,
  Send,
  Download,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Loader2,
  Clock,
  User,
  Check,
  RefreshCw,
} from 'lucide-react';

interface Stage2ExamProps {
  student: StudentIdentity;
  questions: Question[];
  onFinishExam: (result: ExamResult) => void;
}

// Fisher-Yates shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const Stage2Exam: React.FC<Stage2ExamProps> = ({
  student,
  questions,
  onFinishExam,
}) => {
  // Catat waktu mulai pengerjaan
  const startTimeRef = useRef<number>(Date.now());

  // 1. Acak urutan soal dan opsi jawaban saat tes dimulai
  const shuffledQuestions = useMemo<ShuffledQuestion[]>(() => {
    const shuffledQ: Question[] = shuffleArray<Question>(questions);

    return shuffledQ.map((q: Question) => {
      if (q.type === 'pg' && q.options && q.options.length > 0) {
        const shuffledOpts: OptionItem[] = shuffleArray<OptionItem>(q.options);
        const standardLabels = ['A', 'B', 'C', 'D'];
        const remappedOptions: OptionItem[] = shuffledOpts.map((opt, idx) => ({
          id: standardLabels[idx] || opt.id,
          text: opt.text,
        }));

        return {
          ...q,
          originalQuestionId: q.id,
          shuffledOptions: remappedOptions,
        };
      }
      return {
        ...q,
        originalQuestionId: q.id,
      };
    });
  }, [questions]);

  // State pengerjaan
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentQ = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;

  // Cek apakah soal nomor tertentu sudah dijawab
  const isQuestionAnswered = (idx: number): boolean => {
    const ans = answers[idx];
    if (!ans) return false;

    const q = shuffledQuestions[idx];
    if (q.type === 'pg') {
      return typeof ans === 'string' && ans.length > 0;
    }
    if (q.type === 'pgk_kategori') {
      if (typeof ans === 'object' && !Array.isArray(ans)) {
        const statements = q.statements || [];
        return statements.length > 0 && statements.every((st) => ans[st.id] !== undefined);
      }
      return false;
    }
    return false;
  };

  // Hitung jumlah soal yang telah dijawab
  const answeredCount = useMemo(() => {
    let count = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (isQuestionAnswered(i)) count++;
    }
    return count;
  }, [answers, totalQuestions, shuffledQuestions]);

  const allAnswered = answeredCount === totalQuestions;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Handler jawaban Pilihan Ganda (PG)
  const handleSelectPG = (optionText: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionText,
    }));
  };

  // Handler jawaban PGK Kategori (Benar / Salah)
  const handleSetCategoryStatement = (statementId: string, value: boolean) => {
    setAnswers((prev) => {
      const currentMap =
        typeof prev[currentIndex] === 'object' && !Array.isArray(prev[currentIndex])
          ? { ...(prev[currentIndex] as Record<string, boolean>) }
          : {};
      currentMap[statementId] = value;
      return {
        ...prev,
        [currentIndex]: currentMap,
      };
    });
  };

  // Navigasi soal
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
  };

  // Hitung Nilai & Validasi Respon Butir
  const calculateResult = (): ExamResult => {
    const itemScores: Record<number, number> = {};
    const detailJawabanByQId: Record<number, AnswerValue> = {};
    let benarCount = 0;

    shuffledQuestions.forEach((sq, idx) => {
      const userAns = answers[idx];
      const origQ = questions.find((q) => q.id === sq.originalQuestionId) || sq;
      const qId = origQ.id;

      if (userAns !== undefined) {
        detailJawabanByQId[qId] = userAns;
      }

      if (sq.type === 'pg') {
        const correctOpt = origQ.options?.find((o) => o.id === origQ.correctAnswer);
        if (correctOpt && userAns === correctOpt.text) {
          itemScores[qId] = 5;
          benarCount += 1;
        } else {
          itemScores[qId] = 0;
        }
      } else if (sq.type === 'pgk_kategori') {
        const statements = origQ.statements || [];
        const userMap = (typeof userAns === 'object' && !Array.isArray(userAns)
          ? userAns
          : {}) as Record<string, boolean>;

        let correctStatements = 0;
        statements.forEach((st) => {
          if (userMap[st.id] === st.correctAnswer) {
            correctStatements += 1;
          }
        });

        // 2 pernyataan, masing-masing 2.5 poin (total 5 poin)
        const qScore = correctStatements * 2.5;
        itemScores[qId] = qScore;
        if (qScore === 5) {
          benarCount += 1;
        }
      }
    });

    // Total Skor (0 - 100)
    const totalScore = Object.values(itemScores).reduce((acc, curr) => acc + curr, 0);
    const finalScore = Math.round(totalScore);
    const salahCount = totalQuestions - benarCount;
    const status: 'Lulus' | 'Belum Lulus' = finalScore >= CONFIG.KKTP ? 'Lulus' : 'Belum Lulus';

    // Hitung durasi pengerjaan
    const elapsedMinutes = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000));
    const durasiPengerjaan = `${elapsedMinutes} Menit`;

    const tglLahirStr = student.tglLahir
      ? `${student.tglLahir.hari} ${student.tglLahir.bulan} ${student.tglLahir.tahun}`
      : '-';

    return {
      id: `res-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      nama: student.nama,
      noAbsen: student.noAbsen,
      kelas: CONFIG.KELAS,
      tglLahir: tglLahirStr,
      benar: benarCount,
      salah: salahCount,
      nilai: finalScore,
      status,
      durasiPengerjaan,
      itemScores,
      detailJawaban: detailJawabanByQId,
    };
  };

  // Proses Kirim Jawaban ke Google Apps Script
  const handleConfirmSubmit = async () => {
    if (!allAnswered) {
      alert('Masih ada butir soal yang belum dijawab. Harap jawab seluruh soal terlebih dahulu!');
      setShowConfirmModal(false);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const calculatedResult = calculateResult();

    try {
      await gasService.submitExamResult(calculatedResult);
      setIsSubmitting(false);
      setShowConfirmModal(false);
      onFinishExam(calculatedResult);
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitError(
        err.message ||
          'Gagal mengirim data ke server. Periksa koneksi internet atau konfigurasi Google Apps Script.'
      );
    }
  };

  const currentOptions = currentQ.shuffledOptions || currentQ.options || [];

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
      {/* Header Info Siswa & Progres */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-200 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-bold text-slate-900">{student.nama}</span>
                <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-0.5 rounded-lg">
                  Absen: {student.noAbsen}
                </span>
                <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-lg border border-blue-200">
                  Kelas {CONFIG.KELAS}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {CONFIG.SEKOLAH} • {CONFIG.MATA_PELAJARAN} ({CONFIG.MATERI})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => downloadExamQuestionsPDF(questions)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-300 cursor-pointer"
              title="Unduh Naskah Soal dalam bentuk PDF"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Unduh Soal (PDF)</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
            <span className="text-slate-600">
              Progres Pengerjaan: <span className="text-blue-700 font-bold">{answeredCount}</span> dari {totalQuestions} Soal Terjawab
            </span>
            <span className="text-blue-700 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Layout: Konten Soal + Navigasi Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kolom Kiri: Lembar Soal Aktif */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200 min-h-[460px] flex flex-col justify-between">
            <div>
              {/* Header Nomor & Tipe Soal */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="text-sm sm:text-base font-extrabold px-3 py-1 bg-blue-700 text-white rounded-xl shadow-2xs">
                    Soal No. {currentIndex + 1}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                    {currentQ.type === 'pg' ? 'Pilihan Ganda' : 'PGK Kategori (Benar / Salah)'}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {currentQ.element}
                </span>
              </div>

              {/* Petunjuk Pengisian */}
              <div className="mb-4 text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-100 inline-block">
                {currentQ.type === 'pg'
                  ? 'Pilihlah salah satu jawaban yang paling tepat.'
                  : 'Tentukan pilihan Benar atau Salah untuk setiap pernyataan di bawah ini.'}
              </div>

              {/* Ilustrasi Gambar Soal (Jika Ada) */}
              {currentQ.imageSvg && (
                <div
                  className="mb-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-center overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: currentQ.imageSvg }}
                />
              )}

              {/* Teks Soal */}
              <div className="text-base sm:text-lg text-slate-900 leading-relaxed font-semibold whitespace-pre-line mb-6">
                {currentQ.text}
              </div>

              {/* Opsi Jawaban: Pilihan Ganda (PG) */}
              {currentQ.type === 'pg' && (
                <div className="space-y-3">
                  {currentOptions.map((opt) => {
                    const isSelected = answers[currentIndex] === opt.text;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectPG(opt.text)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-3.5 cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 text-blue-950 font-bold ring-2 ring-blue-500 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {opt.id}
                        </div>
                        <span className="text-sm sm:text-base leading-normal flex-1">
                          {opt.text}
                        </span>
                        {isSelected && <Check className="w-5 h-5 text-blue-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Opsi Jawaban: PGK Kategori (Tepat 2 Pernyataan Benar/Salah) */}
              {currentQ.type === 'pgk_kategori' && (
                <div className="space-y-3.5">
                  {(currentQ.statements || []).map((st, sIdx) => {
                    const ansMap =
                      typeof answers[currentIndex] === 'object' && !Array.isArray(answers[currentIndex])
                        ? (answers[currentIndex] as Record<string, boolean>)
                        : {};
                    const currentVal = ansMap[st.id];

                    return (
                      <div
                        key={st.id}
                        className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3"
                      >
                        <p className="text-sm sm:text-base text-slate-900 font-semibold leading-snug">
                          <span className="font-extrabold text-blue-700 mr-2">
                            Pernyataan {sIdx + 1}:
                          </span>
                          {st.text}
                        </p>
                        <div className="flex items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => handleSetCategoryStatement(st.id, true)}
                            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                              currentVal === true
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm ring-2 ring-emerald-400'
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>BENAR</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetCategoryStatement(st.id, false)}
                            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                              currentVal === false
                                ? 'bg-rose-600 border-rose-600 text-white shadow-sm ring-2 ring-rose-400'
                                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <XCircle className="w-4 h-4" />
                            <span>SALAH</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Tombol Aksi Bawah */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100 gap-3">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Jawaban Tes</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Grid Nomor Soal */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
              <span>Nomor Soal Ujian</span>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                {totalQuestions} Butir Soal
              </span>
            </h4>

            {/* Grid 20 Soal */}
            <div className="grid grid-cols-5 gap-2">
              {shuffledQuestions.map((q, idx) => {
                const isAnswered = isQuestionAnswered(idx);
                const isCurrent = idx === currentIndex;

                let btnClass = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                if (isCurrent) {
                  btnClass = 'bg-blue-600 border-blue-600 text-white font-black shadow-xs ring-2 ring-blue-300';
                } else if (isAnswered) {
                  btnClass = 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-10 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${btnClass}`}
                  >
                    <span className="text-xs">{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            {/* Keterangan Warna Grid */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-blue-600"></span>
                <span>Sedang Dikerjakan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-100 border border-emerald-300"></span>
                <span>Sudah Dijawab</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200"></span>
                <span>Belum Dijawab</span>
              </div>
            </div>

            {/* Tombol Kirim Cepat */}
            <div className="mt-5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                disabled={!allAnswered}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-black text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Jawaban Sekarang</span>
              </button>
              {!allAnswered && (
                <p className="text-[11px] text-amber-600 mt-2 text-center font-medium">
                  Harap jawab seluruh {totalQuestions} soal sebelum mengirim jawaban.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi Kirim Jawaban */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Konfirmasi Penyelesaian Tes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Ananda <strong className="text-slate-900 font-bold">{student.nama}</strong> telah menjawab seluruh{' '}
                <strong className="text-blue-700 font-bold">{totalQuestions} butir soal</strong> matematika numerasi.
              </p>
              <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                Apakah Ananda sudah yakin dengan seluruh jawaban yang telah dipilih? Jawaban akan langsung dikirim dan dinilai.
              </p>
            </div>

            {submitError && (
              <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Periksa Kembali
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirmSubmit}
                className="px-5 py-2.5 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Mengirim Jawaban...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Ya, Kirim Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
