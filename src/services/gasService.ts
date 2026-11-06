import { CONFIG } from '../config';
import { ExamResult } from '../types';

/**
 * Service untuk komunikasi dengan Google Apps Script Web App & Penyimpanan Lokal
 */

const STORAGE_LOCAL_RESULTS_KEY = 'sd3_loloan_timur_results_v3';
const STORAGE_CUSTOM_GAS_URL_KEY = 'sd3_custom_gas_url_v3';

// Data Sampel Awal Siswa Kelas 1 SD Negeri 3 Loloan Timur untuk Matriks Respon & Analisis Butir Soal
export const SAMPLE_GRADE1_RESULTS: ExamResult[] = [
  {
    id: 'res-k1-01',
    timestamp: '2026-11-05 08:30:15',
    nama: 'I Putu Raditya Pratama',
    noAbsen: '01',
    kelas: CONFIG.KELAS,
    tglLahir: '12 Mei 2019',
    benar: 19,
    salah: 1,
    nilai: 95,
    status: 'Lulus',
    durasiPengerjaan: '14 Menit',
    itemScores: {
      1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5, 9: 5, 10: 5,
      11: 5, 12: 5, 13: 5, 14: 5, 15: 0, 16: 5, 17: 5, 18: 5, 19: 5, 20: 5
    },
    detailJawaban: {
      1: '8 buah', 2: '19', 3: '12 pensil', 4: 'lebih sedikit', 5: '6, 8, 12, 15',
      6: 'Lingkaran', 7: '13 buah', 8: '10 potong', 9: 'lebih berat', 10: '3 sudut',
      11: '11 balon', 12: '3', 13: 'panjang', 14: '10', 15: '10 butir',
      16: { s1: true, s2: false }, 17: { s1: true, s2: false },
      18: { s1: true, s2: false }, 19: { s1: true, s2: false }, 20: { s1: true, s2: false }
    }
  },
  {
    id: 'res-k1-02',
    timestamp: '2026-11-05 08:32:40',
    nama: 'Ni Kadek Ayu Lestari',
    noAbsen: '02',
    kelas: CONFIG.KELAS,
    tglLahir: '24 Agustus 2019',
    benar: 20,
    salah: 0,
    nilai: 100,
    status: 'Lulus',
    durasiPengerjaan: '16 Menit',
    itemScores: {
      1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5, 9: 5, 10: 5,
      11: 5, 12: 5, 13: 5, 14: 5, 15: 5, 16: 5, 17: 5, 18: 5, 19: 5, 20: 5
    },
    detailJawaban: {
      1: '8 buah', 2: '19', 3: '12 pensil', 4: 'lebih sedikit', 5: '6, 8, 12, 15',
      6: 'Lingkaran', 7: '13 buah', 8: '10 potong', 9: 'lebih berat', 10: '3 sudut',
      11: '11 balon', 12: '3', 13: 'panjang', 14: '10', 15: '13 butir',
      16: { s1: true, s2: false }, 17: { s1: true, s2: false },
      18: { s1: true, s2: false }, 19: { s1: true, s2: false }, 20: { s1: true, s2: false }
    }
  },
  {
    id: 'res-k1-03',
    timestamp: '2026-11-05 08:34:10',
    nama: 'I Komang Bagus Wirawan',
    noAbsen: '03',
    kelas: CONFIG.KELAS,
    tglLahir: '05 Januari 2019',
    benar: 17,
    salah: 3,
    nilai: 85,
    status: 'Lulus',
    durasiPengerjaan: '18 Menit',
    itemScores: {
      1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5, 9: 5, 10: 5,
      11: 5, 12: 5, 13: 5, 14: 0, 15: 0, 16: 5, 17: 5, 18: 5, 19: 2.5, 20: 2.5
    },
    detailJawaban: {
      1: '8 buah', 2: '19', 3: '12 pensil', 4: 'lebih sedikit', 5: '6, 8, 12, 15',
      6: 'Lingkaran', 7: '13 buah', 8: '10 potong', 9: 'lebih berat', 10: '3 sudut',
      11: '11 balon', 12: '3', 13: 'panjang', 14: '9', 15: '12 butir',
      16: { s1: true, s2: false }, 17: { s1: true, s2: false },
      18: { s1: true, s2: false }, 19: { s1: true, s2: true }, 20: { s1: false, s2: false }
    }
  },
  {
    id: 'res-k1-04',
    timestamp: '2026-11-05 08:35:55',
    nama: 'Ni Ketut Dewi Anggreni',
    noAbsen: '04',
    kelas: CONFIG.KELAS,
    tglLahir: '18 Oktober 2019',
    benar: 18,
    salah: 2,
    nilai: 90,
    status: 'Lulus',
    durasiPengerjaan: '15 Menit',
    itemScores: {
      1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5, 9: 5, 10: 5,
      11: 5, 12: 5, 13: 5, 14: 5, 15: 5, 16: 5, 17: 5, 18: 5, 19: 2.5, 20: 2.5
    },
    detailJawaban: {
      1: '8 buah', 2: '19', 3: '12 pensil', 4: 'lebih sedikit', 5: '6, 8, 12, 15',
      6: 'Lingkaran', 7: '13 buah', 8: '10 potong', 9: 'lebih berat', 10: '3 sudut',
      11: '11 balon', 12: '3', 13: 'panjang', 14: '10', 15: '13 butir',
      16: { s1: true, s2: false }, 17: { s1: true, s2: false },
      18: { s1: true, s2: false }, 19: { s1: true, s2: true }, 20: { s1: true, s2: true }
    }
  },
  {
    id: 'res-k1-05',
    timestamp: '2026-11-05 08:38:22',
    nama: 'I Made Arya Kusuma',
    noAbsen: '05',
    kelas: CONFIG.KELAS,
    tglLahir: '09 Juli 2019',
    benar: 15,
    salah: 5,
    nilai: 75,
    status: 'Lulus',
    durasiPengerjaan: '20 Menit',
    itemScores: {
      1: 5, 2: 5, 3: 5, 4: 5, 5: 0, 6: 5, 7: 5, 8: 0, 9: 5, 10: 5,
      11: 5, 12: 0, 13: 5, 14: 5, 15: 0, 16: 5, 17: 5, 18: 5, 19: 2.5, 20: 2.5
    },
    detailJawaban: {
      1: '8 buah', 2: '19', 3: '12 pensil', 4: 'lebih sedikit', 5: '15, 12, 8, 6',
      6: 'Lingkaran', 7: '13 buah', 8: '11 potong', 9: 'lebih berat', 10: '3 sudut',
      11: '11 balon', 12: '2', 13: 'panjang', 14: '10', 15: '10 butir',
      16: { s1: true, s2: false }, 17: { s1: true, s2: false },
      18: { s1: true, s2: false }, 19: { s1: true, s2: true }, 20: { s1: false, s2: false }
    }
  },
  {
    id: 'res-k1-06',
    timestamp: '2026-11-05 08:41:05',
    nama: 'Ni Luh Putu Sintia Dewi',
    noAbsen: '06',
    kelas: CONFIG.KELAS,
    tglLahir: '03 Maret 2019',
    benar: 16,
    salah: 4,
    nilai: 80,
    status: 'Lulus',
    durasiPengerjaan: '17 Menit',
    itemScores: {
      1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5, 9: 5, 10: 5,
      11: 5, 12: 5, 13: 5, 14: 0, 15: 0, 16: 5, 17: 2.5, 18: 5, 19: 2.5, 20: 0
    },
    detailJawaban: {
      1: '8 buah', 2: '19', 3: '12 pensil', 4: 'lebih sedikit', 5: '6, 8, 12, 15',
      6: 'Lingkaran', 7: '13 buah', 8: '10 potong', 9: 'lebih berat', 10: '3 sudut',
      11: '11 balon', 12: '3', 13: 'panjang', 14: '12', 15: '12 butir',
      16: { s1: true, s2: false }, 17: { s1: false, s2: false },
      18: { s1: true, s2: false }, 19: { s1: true, s2: true }, 20: { s1: false, s2: true }
    }
  },
  {
    id: 'res-k1-07',
    timestamp: '2026-11-05 08:43:50',
    nama: 'I Gede Wahyu Pratama',
    noAbsen: '07',
    kelas: CONFIG.KELAS,
    tglLahir: '15 September 2019',
    benar: 13,
    salah: 7,
    nilai: 65,
    status: 'Lulus',
    durasiPengerjaan: '22 Menit',
    itemScores: {
      1: 5, 2: 5, 3: 5, 4: 0, 5: 0, 6: 5, 7: 5, 8: 0, 9: 5, 10: 5,
      11: 5, 12: 5, 13: 5, 14: 0, 15: 0, 16: 5, 17: 2.5, 18: 5, 19: 0, 20: 2.5
    },
    detailJawaban: {
      1: '8 buah', 2: '19', 3: '12 pensil', 4: 'lebih banyak', 5: '8, 6, 12, 15',
      6: 'Lingkaran', 7: '13 buah', 8: '9 potong', 9: 'lebih berat', 10: '3 sudut',
      11: '11 balon', 12: '3', 13: 'panjang', 14: '9', 15: '15 butir',
      16: { s1: true, s2: false }, 17: { s1: true, s2: true },
      18: { s1: true, s2: false }, 19: { s1: false, s2: true }, 20: { s1: true, s2: true }
    }
  },
  {
    id: 'res-k1-08',
    timestamp: '2026-11-05 08:46:18',
    nama: 'Ni Made Rai Anjani',
    noAbsen: '08',
    kelas: CONFIG.KELAS,
    tglLahir: '29 November 2019',
    benar: 10,
    salah: 10,
    nilai: 50,
    status: 'Belum Lulus',
    durasiPengerjaan: '24 Menit',
    itemScores: {
      1: 5, 2: 5, 3: 5, 4: 0, 5: 0, 6: 5, 7: 0, 8: 0, 9: 5, 10: 5,
      11: 0, 12: 0, 13: 5, 14: 0, 15: 0, 16: 5, 17: 2.5, 18: 5, 19: 0, 20: 2.5
    },
    detailJawaban: {
      1: '8 buah', 2: '19', 3: '12 pensil', 4: 'lebih banyak', 5: '6, 12, 8, 15',
      6: 'Lingkaran', 7: '12 buah', 8: '11 potong', 9: 'lebih berat', 10: '3 sudut',
      11: '10 balon', 12: '4', 13: 'panjang', 14: '11', 15: '10 butir',
      16: { s1: true, s2: false }, 17: { s1: false, s2: false },
      18: { s1: true, s2: false }, 19: { s1: false, s2: true }, 20: { s1: true, s2: true }
    }
  },
  {
    id: 'res-k1-09',
    timestamp: '2026-11-05 08:48:45',
    nama: 'I Kadek Dwi Mahendra',
    noAbsen: '09',
    kelas: CONFIG.KELAS,
    tglLahir: '11 Februari 2019',
    benar: 11,
    salah: 9,
    nilai: 55,
    status: 'Belum Lulus',
    durasiPengerjaan: '25 Menit',
    itemScores: {
      1: 5, 2: 5, 3: 5, 4: 5, 5: 0, 6: 5, 7: 5, 8: 0, 9: 0, 10: 5,
      11: 0, 12: 0, 13: 5, 14: 0, 15: 0, 16: 5, 17: 2.5, 18: 5, 19: 2.5, 20: 0
    },
    detailJawaban: {
      1: '8 buah', 2: '19', 3: '12 pensil', 4: 'lebih sedikit', 5: '15, 12, 8, 6',
      6: 'Lingkaran', 7: '13 buah', 8: '20 potong', 9: 'lebih ringan', 10: '3 sudut',
      11: '12 balon', 12: '2', 13: 'panjang', 14: '8', 15: '15 butir',
      16: { s1: true, s2: false }, 17: { s1: true, s2: true },
      18: { s1: true, s2: false }, 19: { s1: true, s2: true }, 20: { s1: false, s2: true }
    }
  },
  {
    id: 'res-k1-10',
    timestamp: '2026-11-05 08:51:12',
    nama: 'Ni Komang Sri Wahyuni',
    noAbsen: '10',
    kelas: CONFIG.KELAS,
    tglLahir: '17 Desember 2019',
    benar: 14,
    salah: 6,
    nilai: 70,
    status: 'Lulus',
    durasiPengerjaan: '19 Menit',
    itemScores: {
      1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5, 9: 5, 10: 5,
      11: 5, 12: 0, 13: 5, 14: 0, 15: 0, 16: 5, 17: 5, 18: 5, 19: 2.5, 20: 2.5
    },
    detailJawaban: {
      1: '8 buah', 2: '19', 3: '12 pensil', 4: 'lebih sedikit', 5: '6, 8, 12, 15',
      6: 'Lingkaran', 7: '13 buah', 8: '10 potong', 9: 'lebih berat', 10: '3 sudut',
      11: '11 balon', 12: '4', 13: 'panjang', 14: '9', 15: '10 butir',
      16: { s1: true, s2: false }, 17: { s1: true, s2: false },
      18: { s1: true, s2: false }, 19: { s1: true, s2: true }, 20: { s1: true, s2: true }
    }
  },
  {
    id: 'res-k1-11',
    timestamp: '2026-11-05 08:53:30',
    nama: 'I Ketut Bayu Danendra',
    noAbsen: '11',
    kelas: CONFIG.KELAS,
    tglLahir: '06 April 2019',
    benar: 18,
    salah: 2,
    nilai: 90,
    status: 'Lulus',
    durasiPengerjaan: '16 Menit',
    itemScores: {
      1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5, 9: 5, 10: 5,
      11: 5, 12: 5, 13: 5, 14: 5, 15: 0, 16: 5, 17: 5, 18: 5, 19: 2.5, 20: 2.5
    },
    detailJawaban: {
      1: '8 buah', 2: '19', 3: '12 pensil', 4: 'lebih sedikit', 5: '6, 8, 12, 15',
      6: 'Lingkaran', 7: '13 buah', 8: '10 potong', 9: 'lebih berat', 10: '3 sudut',
      11: '11 balon', 12: '3', 13: 'panjang', 14: '10', 15: '12 butir',
      16: { s1: true, s2: false }, 17: { s1: true, s2: false },
      18: { s1: true, s2: false }, 19: { s1: true, s2: true }, 20: { s1: true, s2: true }
    }
  },
  {
    id: 'res-k1-12',
    timestamp: '2026-11-05 08:56:00',
    nama: 'Ni Putu Cahyani Putri',
    noAbsen: '12',
    kelas: CONFIG.KELAS,
    tglLahir: '21 Juni 2019',
    benar: 17,
    salah: 3,
    nilai: 85,
    status: 'Lulus',
    durasiPengerjaan: '15 Menit',
    itemScores: {
      1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5, 9: 5, 10: 5,
      11: 5, 12: 5, 13: 5, 14: 5, 15: 0, 16: 5, 17: 5, 18: 5, 19: 0, 20: 0
    },
    detailJawaban: {
      1: '8 buah', 2: '19', 3: '12 pensil', 4: 'lebih sedikit', 5: '6, 8, 12, 15',
      6: 'Lingkaran', 7: '13 buah', 8: '10 potong', 9: 'lebih berat', 10: '3 sudut',
      11: '11 balon', 12: '3', 13: 'panjang', 14: '10', 15: '10 butir',
      16: { s1: true, s2: false }, 17: { s1: true, s2: false },
      18: { s1: true, s2: false }, 19: { s1: false, s2: true }, 20: { s1: false, s2: true }
    }
  }
];

export const gasService = {
  /**
   * Mendapatkan URL Google Apps Script yang aktif
   */
  getGasUrl(): string {
    try {
      const custom = localStorage.getItem(STORAGE_CUSTOM_GAS_URL_KEY);
      if (custom && custom.trim().startsWith('http')) {
        return custom.trim();
      }
    } catch {
      // ignore
    }
    return CONFIG.GOOGLE_APPS_SCRIPT_URL;
  },

  /**
   * Menyimpan URL Google Apps Script kustom
   */
  setGasUrl(url: string): void {
    try {
      if (!url || !url.trim()) {
        localStorage.removeItem(STORAGE_CUSTOM_GAS_URL_KEY);
      } else {
        localStorage.setItem(STORAGE_CUSTOM_GAS_URL_KEY, url.trim());
      }
    } catch (e) {
      console.warn('Gagal menyimpan URL GAS kustom ke localStorage:', e);
    }
  },

  /**
   * Mengembalikan URL ke default
   */
  resetGasUrl(): void {
    try {
      localStorage.removeItem(STORAGE_CUSTOM_GAS_URL_KEY);
    } catch {
      // ignore
    }
  },

  /**
   * Mengambil hasil tes yang tersimpan di perangkat lokal
   */
  getLocalExamResults(): ExamResult[] {
    try {
      const saved = localStorage.getItem(STORAGE_LOCAL_RESULTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Gagal membaca data hasil tes lokal:', e);
    }
    // Jika belum ada data lokal, kembalikan data sampel Kelas 1 dan simpan
    try {
      localStorage.setItem(STORAGE_LOCAL_RESULTS_KEY, JSON.stringify(SAMPLE_GRADE1_RESULTS));
    } catch {
      // silent
    }
    return SAMPLE_GRADE1_RESULTS;
  },

  /**
   * Menyimpan hasil tes ke penyimpanan lokal (Zero Data Loss)
   */
  saveLocalExamResult(result: ExamResult): void {
    try {
      const current = this.getLocalExamResults();
      // Periksa apakah sudah ada (hindari duplikasi berdasarkan nama & noAbsen)
      const existingIdx = current.findIndex(
        (item) =>
          item.id === result.id ||
          (item.nama.toLowerCase() === result.nama.toLowerCase() &&
            item.noAbsen === result.noAbsen &&
            item.timestamp === result.timestamp)
      );

      if (existingIdx >= 0) {
        current[existingIdx] = result;
      } else {
        current.unshift(result);
      }

      localStorage.setItem(STORAGE_LOCAL_RESULTS_KEY, JSON.stringify(current));
    } catch (e) {
      console.warn('Gagal menyimpan hasil tes ke localStorage:', e);
    }
  },

  /**
   * Menghapus hasil tes dari penyimpanan lokal
   */
  deleteLocalExamResult(idOrTimestamp: string, nama?: string): void {
    try {
      const current = this.getLocalExamResults();
      const filtered = current.filter(
        (r) =>
          r.id !== idOrTimestamp &&
          r.timestamp !== idOrTimestamp &&
          !(nama && r.nama.toLowerCase() === nama.toLowerCase())
      );
      localStorage.setItem(STORAGE_LOCAL_RESULTS_KEY, JSON.stringify(filtered));
    } catch (e) {
      console.warn('Gagal menghapus data hasil tes lokal:', e);
    }
  },

  /**
   * Menguji koneksi ke URL Google Apps Script
   */
  async testGasConnection(
    customUrl?: string
  ): Promise<{ success: boolean; message: string; rowCount?: number }> {
    const url = (customUrl || this.getGasUrl()).trim();
    if (!url || !url.startsWith('http')) {
      return { success: false, message: 'URL Google Apps Script tidak valid.' };
    }

    try {
      const testUrl = `${url}${url.includes('?') ? '&' : '?'}action=read&t=${Date.now()}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(testUrl, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          return {
            success: false,
            message:
              'Server merespons HTTP 404 (Not Found). Pastikan Web App sudah di-Deploy dengan jenis "Web App" dan akses "Anyone" (Siapa saja).',
          };
        }
        return {
          success: false,
          message: `Server merespons status HTTP ${response.status}`,
        };
      }

      const text = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        return {
          success: true,
          message: 'Terhubung ke server Google Apps Script (Respons non-JSON).',
          rowCount: 0,
        };
      }

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.rows)
        ? data.rows
        : [];

      return {
        success: true,
        message: `Koneksi berhasil! Terhubung ke Google Spreadsheet (${list.length} baris data ditemukan).`,
        rowCount: list.length,
      };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return {
          success: false,
          message: 'Koneksi waktu habis (Timeout 8 detik). Server Google Apps Script lambat merespons.',
        };
      }
      return {
        success: false,
        message:
          err.message ||
          'Gagal terhubung ke Google Apps Script. Periksa koneksi internet atau hak akses Web App.',
      };
    }
  },

  /**
   * Mengirim hasil tes siswa ke Google Apps Script Web App & Penyimpanan Lokal
   */
  async submitExamResult(
    result: ExamResult
  ): Promise<{ success: boolean; message: string; savedLocally: boolean }> {
    // 1. Selalu amankan penyimpanan ke perangkat lokal terlebih dahulu (Zero Data Loss)
    this.saveLocalExamResult(result);

    const url = this.getGasUrl();
    if (!url || !url.startsWith('http')) {
      return {
        success: true,
        savedLocally: true,
        message: 'Hasil tes berhasil disimpan di perangkat ini.',
      };
    }

    const payload = {
      action: 'submit',
      id: result.id || `res-${Date.now()}`,
      timestamp: result.timestamp || new Date().toLocaleString('id-ID'),
      nama: result.nama,
      kelas: result.kelas || CONFIG.KELAS,
      noAbsen: result.noAbsen,
      tglLahir: result.tglLahir || '',
      benar: result.benar,
      salah: result.salah,
      nilai: result.nilai,
      status: result.status,
      durasi: result.durasiPengerjaan || '15 Menit',
      mataPelajaran: CONFIG.MATA_PELAJARAN,
      sekolah: CONFIG.SEKOLAH,
      studentName: result.nama,
      className: result.kelas || CONFIG.KELAS,
      absenNumber: result.noAbsen,
      birthDate: result.tglLahir || '',
      correctCount: result.benar,
      incorrectCount: result.salah,
      totalQuestions: CONFIG.TOTAL_SOAL,
      finalScore: result.nilai,
      answers: result.detailJawaban || {},
      itemScores: result.itemScores || {},
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.warn(`GAS POST merespons HTTP ${response.status}`);
        return {
          success: true,
          savedLocally: true,
          message: `Hasil tes tersimpan di perangkat ini. (Cloud respons HTTP ${response.status})`,
        };
      }

      const text = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { success: true };
      }

      return {
        success: true,
        savedLocally: true,
        message: data.message || 'Jawaban dan hasil tes berhasil disimpan ke Google Spreadsheet.',
      };
    } catch (err: any) {
      console.warn('Gagal sinkronisasi langsung ke Google Apps Script (tersimpan lokal):', err);
      return {
        success: true,
        savedLocally: true,
        message: 'Hasil tes tersimpan di perangkat ini. (Sinkronisasi cloud tertunda)',
      };
    }
  },

  /**
   * Mengambil rekap hasil ujian dari Google Apps Script Web App dan/atau Penyimpanan Lokal
   */
  async fetchExamResults(): Promise<ExamResult[]> {
    const localResults = this.getLocalExamResults();
    const url = this.getGasUrl();

    if (!url || !url.startsWith('http')) {
      return localResults;
    }

    try {
      const readUrl = `${url}${url.includes('?') ? '&' : '?'}action=read&t=${Date.now()}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const response = await fetch(readUrl, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn(`Google Apps Script merespons HTTP ${response.status}, menggunakan data lokal.`);
        return localResults;
      }

      const raw = await response.json();
      let list: any[] = [];

      if (Array.isArray(raw)) {
        list = raw;
      } else if (raw && Array.isArray(raw.data)) {
        list = raw.data;
      } else if (raw && raw.status === 'success' && Array.isArray(raw.rows)) {
        list = raw.rows;
      }

      const remoteResults: ExamResult[] = list
        .filter((item: any) => {
          const name = item.Nama || item.nama || item.studentName || item['Nama Siswa'];
          return name && String(name).trim().length > 0;
        })
        .map((item: any, idx: number) => {
          const timestamp =
            item.Timestamp || item.timestamp || item.waktu || new Date().toLocaleString('id-ID');
          const nama =
            item.studentName || item.Nama || item.nama || item['Nama Siswa'] || 'Siswa';
          const kelas = item.className || item.Kelas || item.kelas || CONFIG.KELAS;
          const noAbsen = String(
            item.absenNumber || item['Nomor Absen'] || item.noAbsen || item.NoAbsen || '-'
          );
          const benar = Number(item.correctCount ?? item.Benar ?? item.benar ?? 0);
          const salah = Number(item.incorrectCount ?? item.Salah ?? item.salah ?? 0);
          const nilai = Number(item.finalScore ?? item.Nilai ?? item.nilai ?? 0);
          const status = item.status || (nilai >= CONFIG.KKTP ? 'Lulus' : 'Belum Lulus');
          const tglLahir = item.birthDate || item['Tanggal Lahir'] || item.tglLahir || '';
          const durasiPengerjaan = item.durasi || item.durasiPengerjaan || '15 Menit';

          // Ambil itemScores jika tersedia di sheet
          let itemScores = item.itemScores;
          if (typeof itemScores === 'string') {
            try {
              itemScores = JSON.parse(itemScores);
            } catch {
              itemScores = undefined;
            }
          }

          return {
            id: item.id || `gas-${idx}-${timestamp}`,
            timestamp,
            nama,
            kelas,
            noAbsen,
            tglLahir,
            benar,
            salah,
            nilai,
            status: status === 'Lulus' ? 'Lulus' : 'Belum Lulus',
            durasiPengerjaan,
            itemScores,
          };
        });

      // Gabungkan data remote dengan data lokal
      const combined = [...remoteResults];
      localResults.forEach((loc) => {
        const alreadyInRemote = combined.some(
          (rem) =>
            rem.nama.trim().toLowerCase() === loc.nama.trim().toLowerCase() &&
            rem.noAbsen === loc.noAbsen
        );
        if (!alreadyInRemote) {
          combined.push(loc);
        }
      });

      return combined.length > 0 ? combined : SAMPLE_GRADE1_RESULTS;
    } catch (err: any) {
      console.warn('Error saat fetch dari Google Apps Script, menampilkan data lokal:', err);
      return localResults.length > 0 ? localResults : SAMPLE_GRADE1_RESULTS;
    }
  },

  /**
   * Menghapus data dari Google Spreadsheet via GAS dan Penyimpanan Lokal
   */
  async deleteExamResult(timestamp: string, nama: string): Promise<boolean> {
    this.deleteLocalExamResult(timestamp, nama);

    const url = this.getGasUrl();
    if (!url || !url.startsWith('http')) return true;

    const payload = {
      action: 'delete',
      timestamp,
      nama,
      studentName: nama,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      return response.ok;
    } catch (err: any) {
      console.warn('Gagal menghapus di remote GAS (namun sudah terhapus di lokal):', err);
      return true;
    }
  },

  /**
   * Sinkronisasi seluruh data lokal yang belum masuk ke Google Apps Script
   */
  async syncAllLocalToCloud(): Promise<{ total: number; success: number }> {
    const local = this.getLocalExamResults();
    if (local.length === 0) return { total: 0, success: 0 };

    let successCount = 0;
    for (const item of local) {
      try {
        const res = await this.submitExamResult(item);
        if (res.success) successCount++;
      } catch {
        // ignore
      }
    }
    return { total: local.length, success: successCount };
  },
};

/**
 * Template Skrip Google Apps Script untuk Google Spreadsheet
 */
export const GAS_SCRIPT_TEMPLATE = `/**
 * SKRIP GOOGLE APPS SCRIPT UNTUK REKAP TES SUMATIF
 * SD NEGERI 3 LOLOAN TIMUR - JEMBRANA - KELAS 1
 * Mata Pelajaran: MATEMATIKA (Numerasi)
 *
 * PANDUAN PEMASANGAN (HANYA 2 MENIT):
 * 1. Buat Spreadsheet baru di https://sheets.new
 * 2. Beri nama: "Rekap Nilai Tes Sumatif Matematika SD Negeri 3 Loloan Timur"
 * 3. Buka menu "Ekstensi" -> "Apps Script"
 * 4. Hapus semua kode default, lalu salin dan tempel SELURUH KODE di bawah ini
 * 5. Klik "Simpan" (ikon disket)
 * 6. Klik tombol biru "Terapkan" (Deploy) -> "Penerapan Baru" (New Deployment)
 * 7. Pilih jenis: "Aplikasi Web" (Web App)
 * 8. PENGATURAN WAJIB:
 *    - Jalankan sebagai (Execute as): "Saya" (Me)
 *    - Siapa yang memiliki akses (Who has access): "Siapa saja" (Anyone) -> SANGAT PENTING!
 * 9. Klik "Terapkan", berikan Otorisasi Akun Google Anda
 * 10. Salin URL Aplikasi Web (berakhiran /exec) dan tempelkan ke menu "Pengaturan URL Spreadsheet" di Panel Guru.
 */

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({ success: true, data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var headers = data[0];
    var results = [];
    
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var item = {};
      for (var j = 0; j < headers.length; j++) {
        var headerKey = String(headers[j]).trim();
        item[headerKey] = row[j];
      }
      results.push(item);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: true, data: results }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var raw = e.postData ? e.postData.contents : "{}";
    var contents = JSON.parse(raw);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Inisialisasi Header jika sheet masih kosong
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Nama",
        "Kelas",
        "Nomor Absen",
        "Tanggal Lahir",
        "Benar",
        "Salah",
        "Nilai",
        "Status",
        "Durasi",
        "Mata Pelajaran"
      ]);
    }
    
    // Fitur Delete jika diminta
    if (contents.action === "delete") {
      var data = sheet.getDataRange().getValues();
      var targetTimestamp = String(contents.timestamp || "").trim();
      var targetNama = String(contents.nama || contents.studentName || "").trim().toLowerCase();
      
      for (var i = data.length - 1; i >= 1; i--) {
        var rowTime = String(data[i][0]).trim();
        var rowName = String(data[i][1]).trim().toLowerCase();
        if ((targetTimestamp && rowTime === targetTimestamp) || (targetNama && rowName === targetNama)) {
          sheet.deleteRow(i + 1);
          return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Data berhasil dihapus" }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ success: false, message: "Data tidak ditemukan" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Fitur Tambah / Simpan Hasil Tes Siswa
    var timestamp = contents.timestamp || Utilities.formatDate(new Date(), "GMT+8", "dd/MM/yyyy HH:mm:ss");
    var nama = contents.studentName || contents.nama || "";
    var kelas = contents.className || contents.kelas || "1";
    var noAbsen = contents.absenNumber || contents.noAbsen || "";
    var tglLahir = contents.birthDate || contents.tglLahir || "";
    var benar = contents.correctCount !== undefined ? contents.correctCount : (contents.benar || 0);
    var salah = contents.incorrectCount !== undefined ? contents.incorrectCount : (contents.salah || 0);
    var nilai = contents.finalScore !== undefined ? contents.finalScore : (contents.nilai || 0);
    var status = contents.status || (nilai >= 60 ? "Lulus" : "Belum Lulus");
    var durasi = contents.durasi || "15 Menit";
    var mataPelajaran = contents.mataPelajaran || "MATEMATIKA";
    
    sheet.appendRow([
      timestamp,
      nama,
      kelas,
      noAbsen,
      tglLahir,
      benar,
      salah,
      nilai,
      status,
      durasi,
      mataPelajaran
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Hasil tes siswa berhasil disimpan ke spreadsheet"
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
`;
