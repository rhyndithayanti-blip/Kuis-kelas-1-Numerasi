import { jsPDF } from 'jspdf';
import { CONFIG } from '../config';
import { ExamResult, Question } from '../types';

/**
 * Format tanggal dalam bahasa Indonesia
 */
export function formatIndonesianDate(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(d.getTime())) {
    return new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * 1. Download Lembar Hasil Tes Siswa (Tanda Tangan Guru & Orang Tua/Wali)
 */
export function downloadStudentResultPDF(result: ExamResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  // --- KOP SURAT SEKOLAH ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5.5;
  doc.setFontSize(13);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 2.5;

  // Garis Pembatas Kop Ganda
  doc.setLineWidth(0.8);
  doc.line(15, y, pageWidth - 15, y);
  doc.setLineWidth(0.2);
  doc.line(15, y + 0.8, pageWidth - 15, y + 0.8);
  y += 7;

  // --- JUDUL DOKUMEN ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('LEMBAR LAPORAN HASIL TES SUMATIF', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tahun Ajaran 2025/2026`, pageWidth / 2, y, { align: 'center' });
  y += 8;

  // --- DATA IDENTITAS SISWA ---
  doc.setDrawColor(200, 200, 200);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, pageWidth - 30, 36, 2, 2, 'FD');

  doc.setFontSize(9.5);
  const leftX = 20;
  const col2X = 58;
  const rightX = 115;
  const col4X = 150;

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Nama Peserta', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.nama}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Mata Pelajaran', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.MATA_PELAJARAN}`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Nomor Absen', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.noAbsen}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Lingkup Materi', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.MATERI}`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Kelas / Fase', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: Kelas ${result.kelas || CONFIG.KELAS} (Fase A)`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Standar KKTP', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${CONFIG.KKTP} (Skala 100)`, col4X, y);

  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.text('Waktu Submit', leftX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.timestamp}`, col2X, y);

  doc.setFont('helvetica', 'bold');
  doc.text('Durasi Kerja', rightX, y);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${result.durasiPengerjaan || '15 Menit'}`, col4X, y);

  y += 11;

  // --- TABEL PEROLEHAN HASIL ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('A. Hasil Perolehan Nilai Tes', 15, y);
  y += 4.5;

  // Header Tabel
  doc.setFillColor(30, 58, 138); // Dark Navy Blue
  doc.rect(15, y, pageWidth - 30, 7.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('Komponen Penilaian', 20, y + 5);
  doc.text('Jumlah / Keterangan', pageWidth - 45, y + 5, { align: 'right' });
  doc.setTextColor(0, 0, 0);
  y += 7.5;

  // Baris-baris tabel
  const tableRows = [
    { label: 'Jumlah Soal Keseluruhan', value: `${CONFIG.TOTAL_SOAL} Butir (15 PG, 5 PGK Kategori)` },
    { label: 'Jumlah Jawaban Benar (Penuh)', value: `${result.benar} Soal` },
    { label: 'Jumlah Jawaban Salah / Belum Tepat', value: `${result.salah} Soal` },
    { label: 'Kriteria Ketercapaian Tujuan Pembelajaran (KKTP)', value: `${CONFIG.KKTP}` },
  ];

  doc.setFont('helvetica', 'normal');
  tableRows.forEach((row, i) => {
    doc.setFillColor(i % 2 === 0 ? 255 : 248, i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 252);
    doc.rect(15, y, pageWidth - 30, 7, 'F');
    doc.rect(15, y, pageWidth - 30, 7, 'S');
    doc.text(row.label, 20, y + 4.8);
    doc.text(row.value, pageWidth - 45, y + 4.8, { align: 'right' });
    y += 7;
  });

  // Baris Nilai Akhir & Status
  const isPass = result.status === 'Lulus' || result.nilai >= CONFIG.KKTP;
  doc.setFillColor(isPass ? 240 : 254, isPass ? 253 : 242, isPass ? 244 : 242);
  doc.rect(15, y, pageWidth - 30, 9.5, 'F');
  doc.rect(15, y, pageWidth - 30, 9.5, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('NILAI AKHIR TES SUMATIF (Skala 0 - 100)', 20, y + 6);
  doc.setFontSize(12.5);
  doc.setTextColor(isPass ? 22 : 185, isPass ? 101 : 28, isPass ? 52 : 28);
  doc.text(String(result.nilai), pageWidth - 45, y + 6.5, { align: 'right' });
  doc.setTextColor(0, 0, 0);
  y += 9.5;

  // Status Baris
  doc.setFillColor(241, 245, 249);
  doc.rect(15, y, pageWidth - 30, 8.5, 'F');
  doc.rect(15, y, pageWidth - 30, 8.5, 'S');
  doc.setFontSize(9.5);
  doc.text('Status Ketercapaian Pembelajaran', 20, y + 5.5);
  doc.setFontSize(9.5);
  doc.setTextColor(isPass ? 22 : 185, isPass ? 101 : 28, isPass ? 52 : 28);
  doc.text(isPass ? 'TUNTAS (Mencapai Standar KKTP)' : 'REMEDIAL (Belum Mencapai KKTP)', pageWidth - 45, y + 5.5, {
    align: 'right',
  });
  doc.setTextColor(0, 0, 0);
  y += 12;

  // --- CATATAN GURU ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('B. Catatan Pembelajaran Guru Kelas:', 15, y);
  y += 4;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  const note = isPass
    ? 'Ananda telah menunjukkan penguasaan kemampuan numerasi dasar yang sangat baik pada materi membilang, pola bilangan, dan geometri sederhana. Pertahankan dan terus tingkatkan ketelitian belajar matematika.'
    : 'Ananda perlu penguatan kembali pada konsep penjumlahan/pengurangan dasar serta pembacaan lambang bilangan. Disarankan mengikuti program bimbingan remedial terbimbing.';
  doc.text(note, 15, y, { maxWidth: pageWidth - 30 });
  y += 14;

  // --- TANDA TANGAN (HANYA GURU DAN ORANG TUA/WALI) ---
  const ttdY = Math.max(y, 222);
  const colLeft = 20;
  const colRight = pageWidth - 65;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  // Kolom Kiri: Orang Tua / Wali
  doc.text('Mengetahui,', colLeft, ttdY);
  doc.text('Orang Tua / Wali Siswa,', colLeft, ttdY + 4.5);

  // Kolom Kanan: Guru Kelas 1
  const tglFormatted = formatIndonesianDate();
  doc.text(`Jembrana, ${tglFormatted}`, colRight, ttdY);
  doc.text(`Guru Mata Pelajaran / Kelas ${CONFIG.KELAS},`, colRight, ttdY + 4.5);

  // Spasi tanda tangan
  const lineY = ttdY + 24;

  // Garis nama Orang Tua
  doc.line(colLeft, lineY, colLeft + 45, lineY);
  doc.text('( ......................................... )', colLeft, lineY + 4);

  // Garis nama Guru
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.GURU, colRight, lineY - 1);
  doc.line(colRight, lineY, colRight + 52, lineY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`${CONFIG.NIP_LABEL_GURU} ${CONFIG.NIP_GURU}`, colRight, lineY + 4);

  // Simpan PDF
  const safeName = (result.nama || 'siswa').replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Hasil_Tes_Sumatif_${safeName}_Absen_${result.noAbsen}.pdf`);
}

/**
 * 2. Download Naskah Soal Ujian (PDF)
 */
export function downloadExamQuestionsPDF(questions: Question[]): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 16;

  const addPageHeader = () => {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `${CONFIG.SEKOLAH} | Naskah Soal Tes Sumatif Matematika Kelas ${CONFIG.KELAS}`,
      pageWidth / 2,
      9,
      { align: 'center' }
    );
    doc.setTextColor(0, 0, 0);
  };

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = 16;
      addPageHeader();
    }
  };

  // --- KOP SOAL ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(12.5);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFontSize(11);
  doc.text('NASKAH SOAL TES SUMATIF KURIKULUM MERDEKA', pageWidth / 2, y, { align: 'center' });
  y += 2.5;

  doc.setLineWidth(0.6);
  doc.line(15, y, pageWidth - 15, y);
  y += 5.5;

  // Metadata Soal
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Mata Pelajaran : ${CONFIG.MATA_PELAJARAN}`, 16, y);
  doc.text(`Kelas / Fase     : Kelas ${CONFIG.KELAS} (Fase A)`, 120, y);
  y += 4;
  doc.text(`Lingkup Materi  : ${CONFIG.MATERI}`, 16, y);
  doc.text(`Alokasi Waktu   : 60 Menit`, 120, y);
  y += 4;
  doc.text(`Kriteria KKTP   : ${CONFIG.KKTP}`, 16, y);
  doc.text(`Jumlah Soal     : ${questions.length} Butir (15 PG, 5 PGK Kategori)`, 120, y);
  y += 5.5;

  doc.setDrawColor(180, 180, 180);
  doc.setFillColor(245, 247, 250);
  doc.rect(15, y, pageWidth - 30, 10, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('PETUNJUK UMUM:', 18, y + 3.8);
  doc.setFont('helvetica', 'normal');
  doc.text(
    '1. Berdoalah sebelum mengerjakan. 2. Tulislah nama dan nomor absen. 3. Pilih jawaban yang paling tepat.',
    18,
    y + 7.5,
    { maxWidth: pageWidth - 36 }
  );
  y += 14;

  // Iterasi Soal
  questions.forEach((q, idx) => {
    checkPageBreak(25);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);

    let typeLabel = 'Pilihan Ganda';
    if (q.type === 'pgk_kategori') typeLabel = 'Pilihan Ganda Kompleks Kategori (Benar / Salah)';

    doc.setTextColor(30, 58, 138);
    doc.text(`Soal No. ${idx + 1} [${typeLabel}] • ${q.element} (${q.cognitiveLevel} / ${q.difficulty})`, 15, y);
    doc.setTextColor(0, 0, 0);
    y += 4.5;

    // Teks Soal
    doc.setFont('helvetica', 'normal');
    const textLines = doc.splitTextToSize(q.text, pageWidth - 32);
    checkPageBreak(textLines.length * 4.2 + 10);
    doc.text(textLines, 16, y);
    y += textLines.length * 4.2 + 2;

    // Opsi Jawaban PG
    if (q.options && q.options.length > 0) {
      q.options.forEach((opt) => {
        checkPageBreak(6.5);
        const optLines = doc.splitTextToSize(`${opt.id}. ${opt.text}`, pageWidth - 36);
        doc.text(optLines, 20, y);
        y += optLines.length * 4 + 1;
      });
      y += 2.5;
    }

    // Pernyataan Kategori (Benar / Salah)
    if (q.statements && q.statements.length > 0) {
      q.statements.forEach((st, sIdx) => {
        checkPageBreak(8);
        const stLines = doc.splitTextToSize(
          `Pernyataan ${sIdx + 1}: ${st.text}   [  ] Benar    [  ] Salah`,
          pageWidth - 36
        );
        doc.text(stLines, 20, y);
        y += stLines.length * 4.2 + 1.2;
      });
      y += 2.5;
    }
  });

  doc.save(`Naskah_Soal_Matematika_Kelas_${CONFIG.KELAS}_SDN_3_Loloan_Timur.pdf`);
}

/**
 * 3. Export Rekap Nilai ke Format CSV
 */
export function exportResultsToCSV(results: ExamResult[]): void {
  const headers = ['Timestamp', 'Nama Siswa', 'Kelas', 'Nomor Absen', 'Tanggal Lahir', 'Benar', 'Salah', 'Nilai', 'Status', 'Durasi'];

  const rows = results.map((r) => [
    `"${r.timestamp || ''}"`,
    `"${r.nama || ''}"`,
    `"${r.kelas || CONFIG.KELAS}"`,
    `"${r.noAbsen || ''}"`,
    `"${r.tglLahir || ''}"`,
    r.benar,
    r.salah,
    r.nilai,
    `"${r.status}"`,
    `"${r.durasiPengerjaan || '15 Menit'}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Rekap_Nilai_Tes_Sumatif_Kelas_${CONFIG.KELAS}_SDN_3_Loloan_Timur.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 4. Download Rekapitulasi Data Nilai Siswa (PDF Resmi Berkop dan Bertanda Tangan)
 */
export function downloadResultsRecapPDF(results: ExamResult[]): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 12;
  const marginRight = 12;
  const contentWidth = pageWidth - marginLeft - marginRight;

  const total = results.length;
  const lulus = results.filter((r) => r.status === 'Lulus' || r.nilai >= CONFIG.KKTP).length;
  const belumLulus = total - lulus;
  const persenLulus = total > 0 ? Math.round((lulus / total) * 100) : 0;
  const rataRata = total > 0 ? (results.reduce((acc, r) => acc + (r.nilai || 0), 0) / total).toFixed(1) : '0';
  const nilaiTertinggi = total > 0 ? Math.max(...results.map((r) => r.nilai || 0)) : 0;
  const nilaiTerendah = total > 0 ? Math.min(...results.map((r) => r.nilai || 0)) : 0;

  let y = 14;

  // --- KOP SEKOLAH ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(12.5);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 2.5;

  doc.setLineWidth(0.8);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  doc.setLineWidth(0.2);
  doc.line(marginLeft, y + 0.8, pageWidth - marginRight, y + 0.8);
  y += 6;

  // --- JUDUL DOKUMEN ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('DAFTAR REKAPITULASI NILAI HASIL TES SUMATIF', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(
    `Mata Pelajaran: ${CONFIG.MATA_PELAJARAN} • Lingkup Materi: ${CONFIG.MATERI} • Kelas ${CONFIG.KELAS} • KKTP: ${CONFIG.KKTP}`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 6;

  // --- KOTAK RINGKASAN STATISTIK ---
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(marginLeft, y, contentWidth, 14, 1.5, 1.5, 'FD');

  const statCols = [
    { label: 'Total Peserta', val: `${total} Siswa` },
    { label: 'Tuntas', val: `${lulus} Siswa (${persenLulus}%)` },
    { label: 'Remedial', val: `${belumLulus} Siswa` },
    { label: 'Rata-rata Nilai', val: `${rataRata}` },
    { label: 'Tertinggi / Terendah', val: `${nilaiTertinggi} / ${nilaiTerendah}` },
  ];
  const colW = contentWidth / statCols.length;
  statCols.forEach((col, idx) => {
    const cx = marginLeft + idx * colW + colW / 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(col.label, cx, y + 5, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text(col.val, cx, y + 10.5, { align: 'center' });
  });

  doc.setTextColor(0, 0, 0);
  y += 18;

  // Definisi Kolom Tabel
  const cols = [
    { key: 'no', title: 'No', width: 9, align: 'center' as const },
    { key: 'noAbsen', title: 'Absen', width: 13, align: 'center' as const },
    { key: 'nama', title: 'Nama Siswa', width: 56, align: 'left' as const },
    { key: 'kelas', title: 'Kelas', width: 12, align: 'center' as const },
    { key: 'benar', title: 'Benar', width: 13, align: 'center' as const },
    { key: 'salah', title: 'Salah', width: 13, align: 'center' as const },
    { key: 'nilai', title: 'Nilai', width: 14, align: 'center' as const },
    { key: 'status', title: 'Keterangan', width: 24, align: 'center' as const },
    { key: 'durasi', title: 'Durasi', width: 32, align: 'center' as const },
  ];

  const drawTableHeader = (curY: number) => {
    doc.setFillColor(30, 58, 138);
    doc.rect(marginLeft, curY, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);

    let curX = marginLeft;
    cols.forEach((col) => {
      const textX = col.align === 'center' ? curX + col.width / 2 : curX + 2;
      doc.text(col.title, textX, curY + 4.8, { align: col.align });
      curX += col.width;
    });
    doc.setTextColor(0, 0, 0);
  };

  drawTableHeader(y);
  y += 7;

  if (results.length === 0) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 100, 100);
    doc.text('Belum ada data nilai siswa yang tersimpan.', pageWidth / 2, y + 8, { align: 'center' });
    y += 16;
  } else {
    results.forEach((r, idx) => {
      if (y + 6.5 > pageHeight - 38) {
        doc.addPage();
        y = 15;
        drawTableHeader(y);
        y += 7;
      }

      const isEven = idx % 2 === 0;
      doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
      doc.rect(marginLeft, y, contentWidth, 6.5, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.rect(marginLeft, y, contentWidth, 6.5, 'S');

      let curX = marginLeft;
      const isLulus = r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;

      cols.forEach((col) => {
        let val = '';
        if (col.key === 'no') val = String(idx + 1);
        else if (col.key === 'noAbsen') val = String(r.noAbsen || '-');
        else if (col.key === 'nama') val = r.nama || '-';
        else if (col.key === 'kelas') val = r.kelas || CONFIG.KELAS;
        else if (col.key === 'benar') val = String(r.benar ?? 0);
        else if (col.key === 'salah') val = String(r.salah ?? 0);
        else if (col.key === 'nilai') val = String(r.nilai ?? 0);
        else if (col.key === 'status') val = isLulus ? 'Tuntas' : 'Remedial';
        else if (col.key === 'durasi') val = r.durasiPengerjaan || '15 Menit';

        doc.setFont('helvetica', col.key === 'nilai' ? 'bold' : 'normal');
        doc.setFontSize(7.8);

        if (col.key === 'status') {
          doc.setTextColor(isLulus ? 22 : 185, isLulus ? 101 : 28, isLulus ? 52 : 28);
        } else if (col.key === 'nilai') {
          doc.setTextColor(isLulus ? 15 : 185, isLulus ? 23 : 28, isLulus ? 42 : 28);
        } else {
          doc.setTextColor(30, 41, 59);
        }

        const textX = col.align === 'center' ? curX + col.width / 2 : curX + 2;

        if (col.key === 'nama') {
          const truncated = doc.splitTextToSize(val, col.width - 3)[0] || val;
          doc.text(truncated, textX, y + 4.5);
        } else {
          doc.text(val, textX, y + 4.5, { align: col.align });
        }

        curX += col.width;
      });

      doc.setTextColor(0, 0, 0);
      y += 6.5;
    });
  }

  // Tanda Tangan
  if (y + 38 > pageHeight - 16) {
    doc.addPage();
    y = 18;
  } else {
    y += 8;
  }

  const tglStr = formatIndonesianDate();
  const colLeftX = marginLeft + 8;
  const colRightX = pageWidth - marginRight - 55;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  // Kiri: Kepala Sekolah
  doc.text('Mengetahui,', colLeftX, y);
  doc.text('Kepala Sekolah,', colLeftX, y + 4.5);

  // Kanan: Guru Pengampu
  doc.text(`Jembrana, ${tglStr}`, colRightX, y);
  doc.text(`Guru Mata Pelajaran / Kelas ${CONFIG.KELAS},`, colRightX, y + 4.5);

  const sigLineY = y + 23;
  // Nama & NIP Kepala Sekolah
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.KEPALA_SEKOLAH, colLeftX, sigLineY);
  doc.line(colLeftX, sigLineY + 1, colLeftX + 52, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`NIP. ${CONFIG.NIP_KEPALA_SEKOLAH}`, colLeftX, sigLineY + 5);

  // Nama & NIPPPK Guru
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(CONFIG.GURU, colRightX, sigLineY);
  doc.line(colRightX, sigLineY + 1, colRightX + 52, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`${CONFIG.NIP_LABEL_GURU} ${CONFIG.NIP_GURU}`, colRightX, sigLineY + 5);

  // Footer di setiap halaman
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Dokumen Rekapitulasi Nilai Resmi • ${CONFIG.SEKOLAH} • Dicetak otomatis sistem`,
      marginLeft,
      pageHeight - 6
    );
    doc.text(`Halaman ${i} dari ${totalPages}`, pageWidth - marginRight, pageHeight - 6, {
      align: 'right',
    });
  }

  doc.save(`Rekap_Nilai_Tes_Sumatif_Matematika_Kelas_${CONFIG.KELAS}.pdf`);
}

/**
 * 5. Download Dokumen Kisi-Kisi Soal (PDF Kedinasan Resmi Berkop & Bertanda Tangan)
 */
export function downloadKisiKisiPDF(questions: Question[]): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 12;
  const marginRight = 12;
  const contentWidth = pageWidth - marginLeft - marginRight;

  let y = 14;

  const addHeader = () => {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `${CONFIG.SEKOLAH} | Kisi-Kisi Penulisan Soal Tes Sumatif Matematika Kelas ${CONFIG.KELAS}`,
      pageWidth / 2,
      8,
      { align: 'center' }
    );
    doc.setTextColor(0, 0, 0);
  };

  // --- KOP SURAT ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 5;
  doc.setFontSize(12.5);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 2.5;

  doc.setLineWidth(0.8);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  doc.setLineWidth(0.2);
  doc.line(marginLeft, y + 0.8, pageWidth - marginRight, y + 0.8);
  y += 5.5;

  // --- JUDUL KISI-KISI ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.text('KISI-KISI PENULISAN SOAL TES SUMATIF KURIKULUM MERDEKA', pageWidth / 2, y, { align: 'center' });
  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(
    `Satuan Pendidikan: ${CONFIG.SEKOLAH} | Mata Pelajaran: ${CONFIG.MATA_PELAJARAN} (${CONFIG.MATERI}) | Kelas / Fase: ${CONFIG.KELAS} / A | KKTP: ${CONFIG.KKTP}`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 6;

  // Kolom Tabel Kisi-Kisi
  const kCols = [
    { key: 'no', title: 'No', width: 10, align: 'center' as const },
    { key: 'element', title: 'Elemen', width: 26, align: 'center' as const },
    { key: 'topic', title: 'Lingkup Materi / Topik', width: 48, align: 'left' as const },
    { key: 'indicator', title: 'Indikator Ketercapaian Soal', width: 105, align: 'left' as const },
    { key: 'cognitive', title: 'Level', width: 16, align: 'center' as const },
    { key: 'difficulty', title: 'Kesukaran', width: 22, align: 'center' as const },
    { key: 'type', title: 'Bentuk', width: 25, align: 'center' as const },
    { key: 'noSoal', title: 'No Soal', width: 18, align: 'center' as const },
    { key: 'weight', title: 'Bobot', width: 13, align: 'center' as const },
  ];

  const drawKTableHeader = (curY: number) => {
    doc.setFillColor(30, 58, 138);
    doc.rect(marginLeft, curY, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);

    let curX = marginLeft;
    kCols.forEach((col) => {
      const textX = col.align === 'center' ? curX + col.width / 2 : curX + 2;
      doc.text(col.title, textX, curY + 4.8, { align: col.align });
      curX += col.width;
    });
    doc.setTextColor(0, 0, 0);
  };

  drawKTableHeader(y);
  y += 7;

  questions.forEach((q, idx) => {
    // Estimasi tinggi teks indikator
    const indLines = doc.splitTextToSize(q.indicator || q.topic, 101);
    const rowHeight = Math.max(7, indLines.length * 3.8 + 2.5);

    if (y + rowHeight > pageHeight - 34) {
      doc.addPage();
      y = 14;
      addHeader();
      drawKTableHeader(y);
      y += 7;
    }

    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(marginLeft, y, contentWidth, rowHeight, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(marginLeft, y, contentWidth, rowHeight, 'S');

    let curX = marginLeft;
    kCols.forEach((col) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(30, 41, 59);

      let val = '';
      if (col.key === 'no') val = String(idx + 1);
      else if (col.key === 'element') val = q.element;
      else if (col.key === 'topic') val = q.topic;
      else if (col.key === 'indicator') val = q.indicator || q.topic;
      else if (col.key === 'cognitive') val = q.cognitiveLevel;
      else if (col.key === 'difficulty') val = q.difficulty;
      else if (col.key === 'type') val = q.type === 'pg' ? 'Pilihan Ganda' : 'PGK Kategori';
      else if (col.key === 'noSoal') val = String(q.id);
      else if (col.key === 'weight') val = String(q.scoreWeight || 5);

      const textX = col.align === 'center' ? curX + col.width / 2 : curX + 2;

      if (col.key === 'indicator') {
        doc.text(indLines, textX, y + 4);
      } else if (col.key === 'topic') {
        const topLines = doc.splitTextToSize(val, col.width - 3);
        doc.text(topLines, textX, y + 4);
      } else {
        doc.text(val, textX, y + 4.5, { align: col.align });
      }

      curX += col.width;
    });

    y += rowHeight;
  });

  // Tanda Tangan
  if (y + 34 > pageHeight - 14) {
    doc.addPage();
    y = 16;
    addHeader();
  } else {
    y += 6;
  }

  const tglStr = formatIndonesianDate();
  const colLeftX = marginLeft + 15;
  const colRightX = pageWidth - marginRight - 70;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  // Kiri: Kepala Sekolah
  doc.text('Mengetahui,', colLeftX, y);
  doc.text('Kepala Sekolah,', colLeftX, y + 4.5);

  // Kanan: Guru Mata Pelajaran
  doc.text(`Jembrana, ${tglStr}`, colRightX, y);
  doc.text(`Guru Mata Pelajaran / Kelas ${CONFIG.KELAS},`, colRightX, y + 4.5);

  const sigLineY = y + 21;
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.KEPALA_SEKOLAH, colLeftX, sigLineY);
  doc.line(colLeftX, sigLineY + 1, colLeftX + 55, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`NIP. ${CONFIG.NIP_KEPALA_SEKOLAH}`, colLeftX, sigLineY + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text(CONFIG.GURU, colRightX, sigLineY);
  doc.line(colRightX, sigLineY + 1, colRightX + 55, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`${CONFIG.NIP_LABEL_GURU} ${CONFIG.NIP_GURU}`, colRightX, sigLineY + 4.5);

  // Page Numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Dokumen Kisi-Kisi Soal Kedinasan • ${CONFIG.SEKOLAH} • Tahun Ajaran 2025/2026`,
      marginLeft,
      pageHeight - 5
    );
    doc.text(`Halaman ${i} dari ${totalPages}`, pageWidth - marginRight, pageHeight - 5, {
      align: 'right',
    });
  }

  doc.save(`Kisi_Kisi_Soal_Matematika_Kelas_${CONFIG.KELAS}_SDN_3_Loloan_Timur.pdf`);
}

/**
 * 6. Download Laporan Analisis Butir Soal & Matriks Respon Siswa (Landscape PDF Berkop Resmi)
 */
export function downloadItemAnalysisPDF(results: ExamResult[], questions: Question[]): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 10;
  const marginRight = 10;
  const contentWidth = pageWidth - marginLeft - marginRight;

  let y = 12;

  // --- KOP SURAT RESMI ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('PEMERINTAH KABUPATEN JEMBRANA', pageWidth / 2, y, { align: 'center' });
  y += 4.2;
  doc.text('DINAS PENDIDIKAN KEPEMUDAAN DAN OLAHRAGA', pageWidth / 2, y, { align: 'center' });
  y += 4.8;
  doc.setFontSize(12);
  doc.text(CONFIG.SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 4.2;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(CONFIG.ALAMAT_SEKOLAH, pageWidth / 2, y, { align: 'center' });
  y += 2.2;

  doc.setLineWidth(0.8);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  doc.setLineWidth(0.2);
  doc.line(marginLeft, y + 0.8, pageWidth - marginRight, y + 0.8);
  y += 5;

  // --- JUDUL LAPORAN ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('LAPORAN ANALISIS BUTIR SOAL & MATRIKS RESPON SISWA', pageWidth / 2, y, { align: 'center' });
  y += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    `Mata Pelajaran: ${CONFIG.MATA_PELAJARAN} • Lingkup Materi: ${CONFIG.MATERI} • Kelas: ${CONFIG.KELAS} • Standar KKTP: ${CONFIG.KKTP}`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 5;

  // Setup Kolom Matriks:
  // No (7), Absen (9), Nama Siswa (45), Soal 1..20 (7 x 20 = 140), Skor (12), Nilai (12), Status (18), Durasi (14)
  // Total: 7 + 9 + 45 + 140 + 12 + 12 + 18 + 14 = 257 mm (Content width is 297 - 20 = 277 mm)
  const qWidth = 6.8;
  const colNo = 7;
  const colAbsen = 9;
  const colNama = 46;
  const colSkor = 12;
  const colNilai = 12;
  const colStatus = 17;
  const colDurasi = 14;

  const drawMatrixHeader = (curY: number) => {
    doc.setFillColor(30, 58, 138);
    doc.rect(marginLeft, curY, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);

    let curX = marginLeft;
    doc.text('No', curX + colNo / 2, curY + 4.8, { align: 'center' });
    curX += colNo;

    doc.text('Abs', curX + colAbsen / 2, curY + 4.8, { align: 'center' });
    curX += colAbsen;

    doc.text('Nama Siswa', curX + 2, curY + 4.8);
    curX += colNama;

    // Nomor Soal 1 s.d. 20
    questions.forEach((q) => {
      doc.text(String(q.id), curX + qWidth / 2, curY + 4.8, { align: 'center' });
      curX += qWidth;
    });

    doc.text('Total', curX + colSkor / 2, curY + 4.8, { align: 'center' });
    curX += colSkor;

    doc.text('Nilai', curX + colNilai / 2, curY + 4.8, { align: 'center' });
    curX += colNilai;

    doc.text('Status', curX + colStatus / 2, curY + 4.8, { align: 'center' });
    curX += colStatus;

    doc.text('Durasi', curX + colDurasi / 2, curY + 4.8, { align: 'center' });

    doc.setTextColor(0, 0, 0);
  };

  drawMatrixHeader(y);
  y += 7;

  // Hitung agregasi per butir untuk statistik empiris
  const itemCorrectCount: Record<number, number> = {};
  const itemPartialCount: Record<number, number> = {};
  questions.forEach((q) => {
    itemCorrectCount[q.id] = 0;
    itemPartialCount[q.id] = 0;
  });

  results.forEach((r, idx) => {
    if (y + 6 > pageHeight - 34) {
      doc.addPage();
      y = 12;
      drawMatrixHeader(y);
      y += 7;
    }

    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(marginLeft, y, contentWidth, 5.8, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(marginLeft, y, contentWidth, 5.8, 'S');

    let curX = marginLeft;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(30, 41, 59);

    // No
    doc.text(String(idx + 1), curX + colNo / 2, y + 4, { align: 'center' });
    curX += colNo;

    // Absen
    doc.text(String(r.noAbsen || '-'), curX + colAbsen / 2, y + 4, { align: 'center' });
    curX += colAbsen;

    // Nama
    const truncatedNama = doc.splitTextToSize(r.nama || 'Siswa', colNama - 3)[0] || r.nama;
    doc.text(truncatedNama, curX + 2, y + 4);
    curX += colNama;

    // Nilai Respon Butir 1 s.d. 20
    const scores = r.itemScores || {};
    questions.forEach((q) => {
      const score = scores[q.id] !== undefined ? scores[q.id] : 0;
      doc.setFont('helvetica', 'bold');
      if (score === 5) {
        doc.setTextColor(16, 120, 50); // Hijau
        doc.text('5', curX + qWidth / 2, y + 4, { align: 'center' });
        itemCorrectCount[q.id] = (itemCorrectCount[q.id] || 0) + 1;
      } else if (score > 0 && score < 5) {
        doc.setTextColor(190, 110, 10); // Kuning/Oranye
        doc.text('2.5', curX + qWidth / 2, y + 4, { align: 'center' });
        itemPartialCount[q.id] = (itemPartialCount[q.id] || 0) + 1;
      } else {
        doc.setTextColor(200, 30, 30); // Merah
        doc.text('0', curX + qWidth / 2, y + 4, { align: 'center' });
      }
      curX += qWidth;
    });

    // Total Skor & Nilai Akhir
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) || r.nilai;
    const isPass = r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(String(totalScore), curX + colSkor / 2, y + 4, { align: 'center' });
    curX += colSkor;

    doc.setTextColor(isPass ? 16 : 185, isPass ? 120 : 28, isPass ? 50 : 28);
    doc.text(String(r.nilai), curX + colNilai / 2, y + 4, { align: 'center' });
    curX += colNilai;

    doc.setFontSize(6.5);
    doc.text(isPass ? 'TUNTAS' : 'REMEDIAL', curX + colStatus / 2, y + 4, { align: 'center' });
    curX += colStatus;

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(r.durasiPengerjaan || '15 Mnt', curX + colDurasi / 2, y + 4, { align: 'center' });

    y += 5.8;
  });

  // --- BARIS STATISTIK EMPIRIS DI BAWAH MATRIKS ---
  // Baris 1: Jumlah Siswa Menjawab Benar
  doc.setFillColor(241, 245, 249);
  doc.rect(marginLeft, y, contentWidth, 5.5, 'F');
  doc.rect(marginLeft, y, contentWidth, 5.5, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(30, 41, 59);
  doc.text('Jumlah Siswa Menjawab Benar', marginLeft + 2, y + 3.8);

  let curStatX = marginLeft + colNo + colAbsen + colNama;
  questions.forEach((q) => {
    const c = itemCorrectCount[q.id] || 0;
    doc.text(String(c), curStatX + qWidth / 2, y + 3.8, { align: 'center' });
    curStatX += qWidth;
  });
  y += 5.5;

  // Baris 2: Persentase Ketercapaian Butir (%)
  doc.setFillColor(255, 255, 255);
  doc.rect(marginLeft, y, contentWidth, 5.5, 'F');
  doc.rect(marginLeft, y, contentWidth, 5.5, 'S');
  doc.text('Persentase Ketercapaian (%)', marginLeft + 2, y + 3.8);

  curStatX = marginLeft + colNo + colAbsen + colNama;
  const totalStudents = Math.max(1, results.length);
  questions.forEach((q) => {
    const fullScoreCount = itemCorrectCount[q.id] || 0;
    const partialScoreCount = itemPartialCount[q.id] || 0;
    const effectiveCorrect = fullScoreCount + partialScoreCount * 0.5;
    const pct = Math.round((effectiveCorrect / totalStudents) * 100);
    doc.text(`${pct}%`, curStatX + qWidth / 2, y + 3.8, { align: 'center' });
    curStatX += qWidth;
  });
  y += 5.5;

  // Baris 3: Klasifikasi Empiris Kesukaran
  doc.setFillColor(248, 250, 252);
  doc.rect(marginLeft, y, contentWidth, 5.5, 'F');
  doc.rect(marginLeft, y, contentWidth, 5.5, 'S');
  doc.text('Klasifikasi Empiris (M/S/Sk)', marginLeft + 2, y + 3.8);

  curStatX = marginLeft + colNo + colAbsen + colNama;
  questions.forEach((q) => {
    const fullScoreCount = itemCorrectCount[q.id] || 0;
    const partialScoreCount = itemPartialCount[q.id] || 0;
    const effectiveCorrect = fullScoreCount + partialScoreCount * 0.5;
    const pct = Math.round((effectiveCorrect / totalStudents) * 100);
    let klasifikasi = 'Sedang';
    if (pct > 70) klasifikasi = 'Mudah';
    else if (pct < 30) klasifikasi = 'Sukar';

    doc.setFontSize(6.2);
    if (klasifikasi === 'Mudah') doc.setTextColor(16, 120, 50);
    else if (klasifikasi === 'Sedang') doc.setTextColor(20, 70, 180);
    else doc.setTextColor(180, 25, 25);

    doc.text(klasifikasi.substring(0, 3), curStatX + qWidth / 2, y + 3.8, { align: 'center' });
    curStatX += qWidth;
  });
  doc.setTextColor(0, 0, 0);
  y += 8;

  // Tanda Tangan
  if (y + 30 > pageHeight - 12) {
    doc.addPage();
    y = 14;
  }

  const tglStr = formatIndonesianDate();
  const colLeftX = marginLeft + 15;
  const colRightX = pageWidth - marginRight - 70;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);

  // Kiri: Kepala Sekolah
  doc.text('Mengetahui,', colLeftX, y);
  doc.text('Kepala Sekolah,', colLeftX, y + 4);

  // Kanan: Guru Pengampu
  doc.text(`Jembrana, ${tglStr}`, colRightX, y);
  doc.text(`Guru Mata Pelajaran / Kelas ${CONFIG.KELAS},`, colRightX, y + 4);

  const sigLineY = y + 18;
  doc.setFont('helvetica', 'bold');
  doc.text(CONFIG.KEPALA_SEKOLAH, colLeftX, sigLineY);
  doc.line(colLeftX, sigLineY + 1, colLeftX + 55, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(`NIP. ${CONFIG.NIP_KEPALA_SEKOLAH}`, colLeftX, sigLineY + 4.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(CONFIG.GURU, colRightX, sigLineY);
  doc.line(colRightX, sigLineY + 1, colRightX + 55, sigLineY + 1);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(`${CONFIG.NIP_LABEL_GURU} ${CONFIG.NIP_GURU}`, colRightX, sigLineY + 4.5);

  // Footer di setiap halaman
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.8);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Laporan Analisis Butir Soal Resmi • ${CONFIG.SEKOLAH} • Kurikulum Merdeka (Keterangan: M=Mudah >70%, Sed=Sedang 30-70%, Skr=Sukar <30%)`,
      marginLeft,
      pageHeight - 5
    );
    doc.text(`Halaman ${i} dari ${totalPages}`, pageWidth - marginRight, pageHeight - 5, {
      align: 'right',
    });
  }

  doc.save(`Analisis_Butir_Soal_Matematika_Kelas_${CONFIG.KELAS}_SDN_3_Loloan_Timur.pdf`);
}

/**
 * 7. Export Analisis Butir Soal & Matriks Jawaban ke Format CSV / Excel
 */
export function exportItemAnalysisToCSV(results: ExamResult[], questions: Question[]): void {
  const headers = [
    'No',
    'Nomor Absen',
    'Nama Siswa',
    'Kelas',
    ...questions.map((q) => `Q${q.id} (${q.element} - ${q.type.toUpperCase()})`),
    'Total Skor',
    'Nilai Akhir',
    'Status Ketercapaian',
    'Durasi Pengerjaan',
    'Waktu Submit',
  ];

  const rows = results.map((r, idx) => {
    const scores = r.itemScores || {};
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) || r.nilai;
    const isPass = r.status === 'Lulus' || r.nilai >= CONFIG.KKTP;

    const itemValues = questions.map((q) => {
      const val = scores[q.id];
      return val !== undefined ? val : 0;
    });

    return [
      idx + 1,
      `"${r.noAbsen || ''}"`,
      `"${r.nama || ''}"`,
      `"${r.kelas || CONFIG.KELAS}"`,
      ...itemValues,
      totalScore,
      r.nilai,
      `"${isPass ? 'Tuntas' : 'Remedial'}"`,
      `"${r.durasiPengerjaan || '15 Menit'}"`,
      `"${r.timestamp || ''}"`,
    ];
  });

  // Tambahkan baris statistik empiris di bagian bawah CSV
  const totalStudents = Math.max(1, results.length);
  const correctCountRow: (string | number)[] = ['STATISTIK', '-', 'Jumlah Siswa Benar', '-'];
  const percentageRow: (string | number)[] = ['STATISTIK', '-', 'Persentase Ketercapaian (%)', '-'];
  const difficultyRow: (string | number)[] = ['STATISTIK', '-', 'Klasifikasi Empiris Kesukaran', '-'];

  questions.forEach((q) => {
    let full = 0;
    let part = 0;
    results.forEach((r) => {
      const sc = (r.itemScores || {})[q.id];
      if (sc === 5) full++;
      else if (sc && sc > 0) part++;
    });
    const effective = full + part * 0.5;
    const pct = Math.round((effective / totalStudents) * 100);
    let diff = 'Sedang (30-70%)';
    if (pct > 70) diff = 'Mudah (>70%)';
    else if (pct < 30) diff = 'Sukar (<30%)';

    correctCountRow.push(full);
    percentageRow.push(`${pct}%`);
    difficultyRow.push(`"${diff}"`);
  });

  // Kosongkan kolom total skor & keterangan untuk baris statistik
  for (let i = 0; i < 5; i++) {
    correctCountRow.push('-');
    percentageRow.push('-');
    difficultyRow.push('-');
  }

  const csvContent =
    '\uFEFF' +
    [
      `"LAPORAN ANALISIS BUTIR SOAL & MATRIKS RESPON SISWA - ${CONFIG.SEKOLAH}"`,
      `"Mata Pelajaran: ${CONFIG.MATA_PELAJARAN} | Lingkup Materi: ${CONFIG.MATERI} | Kelas: ${CONFIG.KELAS} | KKTP: ${CONFIG.KKTP}"`,
      '',
      headers.join(','),
      ...rows.map((e) => e.join(',')),
      '',
      correctCountRow.join(','),
      percentageRow.join(','),
      difficultyRow.join(','),
    ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Analisis_Butir_Soal_Matematika_Kelas_${CONFIG.KELAS}_SDN_3_Loloan_Timur.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
