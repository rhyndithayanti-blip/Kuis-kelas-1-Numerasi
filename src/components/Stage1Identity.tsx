import React, { useState } from 'react';
import { CONFIG } from '../config';
import { StudentIdentity } from '../types';
import {
  User,
  Hash,
  Calendar,
  ArrowRight,
  School,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Award,
  Sparkles,
} from 'lucide-react';

interface Stage1IdentityProps {
  onStartExam: (identity: StudentIdentity) => void;
  initialIdentity?: StudentIdentity;
}

const BULAN_LIST = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

export const Stage1Identity: React.FC<Stage1IdentityProps> = ({
  onStartExam,
  initialIdentity,
}) => {
  const [nama, setNama] = useState(initialIdentity?.nama || '');
  const [noAbsen, setNoAbsen] = useState(initialIdentity?.noAbsen || '');
  const [hari, setHari] = useState(initialIdentity?.tglLahir?.hari || '');
  const [bulan, setBulan] = useState(initialIdentity?.tglLahir?.bulan || '');
  const [tahun, setTahun] = useState(initialIdentity?.tglLahir?.tahun || '');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim()) {
      setErrorMessage('Silakan isi Nama Lengkap terlebih dahulu.');
      return;
    }
    if (!noAbsen.trim()) {
      setErrorMessage('Silakan isi Nomor Absen.');
      return;
    }
    if (!hari || !bulan || !tahun) {
      setErrorMessage('Silakan lengkapi data Tanggal Lahir (Hari, Bulan, dan Tahun).');
      return;
    }

    setErrorMessage('');
    onStartExam({
      nama: nama.trim(),
      noAbsen: noAbsen.trim(),
      tglLahir: { hari, bulan, tahun },
    });
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  // Tahun lahir siswa kelas 1 SD (sekitar 2017 - 2021)
  const years = Array.from({ length: 8 }, (_, i) => String(2016 + i));

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Header Pengumuman Tes */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 mb-2">
          <School className="w-3.5 h-3.5" />
          <span>{CONFIG.SEKOLAH}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Tes Sumatif Matematika Kelas {CONFIG.KELAS}
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
          Lingkup Materi: <span className="font-bold text-slate-800">{CONFIG.MATERI}</span> • Standar KKTP:{' '}
          <span className="font-bold text-emerald-700">{CONFIG.KKTP}</span>.
          Silakan lengkapi identitas Ananda sebelum memulai pengerjaan tes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Form Identitas Siswa */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Tahap 1: Formulir Identitas Siswa
              </h3>
              <p className="text-xs text-slate-500">
                Seluruh kolom bertanda (<span className="text-rose-500">*</span>) wajib diisi
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              Kelas {CONFIG.KELAS} (Fase A)
            </span>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span className="font-semibold">{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama Lengkap */}
            <div>
              <label
                htmlFor="input-nama-siswa"
                className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
              >
                Nama Lengkap Siswa <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="input-nama-siswa"
                  type="text"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Contoh: I Putu Raditya Pratama"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                  required
                />
              </div>
            </div>

            {/* Nomor Absen */}
            <div>
              <label
                htmlFor="input-no-absen"
                className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
              >
                Nomor Absen Siswa <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="input-no-absen"
                  type="text"
                  value={noAbsen}
                  onChange={(e) => setNoAbsen(e.target.value)}
                  placeholder="Contoh: 01"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                  required
                />
              </div>
            </div>

            {/* Tanggal Lahir (Hari, Bulan, Tahun) */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                Tanggal Lahir Siswa <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {/* Hari */}
                <div>
                  <select
                    id="select-tgl-hari"
                    value={hari}
                    onChange={(e) => setHari(e.target.value)}
                    className="w-full px-2.5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                    required
                  >
                    <option value="">Hari</option>
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bulan */}
                <div>
                  <select
                    id="select-tgl-bulan"
                    value={bulan}
                    onChange={(e) => setBulan(e.target.value)}
                    className="w-full px-2.5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                    required
                  >
                    <option value="">Bulan</option>
                    {BULAN_LIST.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tahun */}
                <div>
                  <select
                    id="select-tgl-tahun"
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                    className="w-full px-2.5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 font-medium"
                    required
                  >
                    <option value="">Tahun</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Pilih tanggal, bulan, dan tahun kelahiran Ananda.
              </p>
            </div>

            {/* Tombol Mulai Tes */}
            <div className="pt-2">
              <button
                id="btn-mulai-tes"
                type="submit"
                className="w-full py-3.5 px-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <span>Mulai Mengerjakan Tes</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Kolom Kanan: Rincian Info Tes & Ketentuan */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card Komposisi Soal & Aturan */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Struktur Soal &amp; Penilaian</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <span>1. Pilihan Ganda (PG)</span>
                <span className="font-bold text-blue-300">15 Butir</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                <span>2. PGK Kategori (Benar / Salah)</span>
                <span className="font-bold text-amber-300">5 Butir</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-slate-300 font-semibold">
                <span>Total Butir Soal:</span>
                <span className="font-black text-white text-sm">20 Soal</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span>Standar Kelulusan (KKTP):</span>
                <span className="font-black text-emerald-400 text-sm">{CONFIG.KKTP}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-2">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Setiap soal bernilai 5 poin, total skor maksimal 100 poin.</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Soal bergambar menarik untuk memudahkan pemahaman siswa kelas 1.</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Hasil tes langsung tercatat ke Google Spreadsheet sekolah.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
