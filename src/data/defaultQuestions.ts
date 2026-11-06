import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // =========================================================================
  // PILIHAN GANDA (15 BUTIR SOAL: NO 1 s.d. 15)
  // =========================================================================
  {
    id: 1,
    type: 'pg',
    element: 'Bilangan',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    topic: 'Membilang Banyak Benda (1-10)',
    indicator: 'Disajikan gambar kumpulan buah apel, peserta didik dapat menghitung banyak benda dengan tepat.',
    scoreWeight: 5,
    text: 'Perhatikan gambar buah apel merah di bawah ini!\nBerapakah banyak buah apel pada gambar?',
    imageSvg: `<svg viewBox="0 0 320 90" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-sm mx-auto">
      <rect width="320" height="90" rx="12" fill="#FEF2F2" stroke="#FECACA" stroke-width="1.5"/>
      <!-- 8 Buah Apel Merah Berjejer -->
      <!-- Apel 1 -->
      <g transform="translate(18, 16)">
        <ellipse cx="14" cy="28" rx="12" ry="14" fill="#EF4444"/>
        <ellipse cx="20" cy="28" rx="12" ry="14" fill="#DC2626"/>
        <path d="M17 14 C17 8 20 6 23 4" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 10 C24 7 26 12 24 14 C20 14 18 10 18 10 Z" fill="#22C55E"/>
        <circle cx="12" cy="22" r="2.5" fill="#FCA5A5"/>
      </g>
      <!-- Apel 2 -->
      <g transform="translate(54, 16)">
        <ellipse cx="14" cy="28" rx="12" ry="14" fill="#EF4444"/>
        <ellipse cx="20" cy="28" rx="12" ry="14" fill="#DC2626"/>
        <path d="M17 14 C17 8 20 6 23 4" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 10 C24 7 26 12 24 14 C20 14 18 10 18 10 Z" fill="#22C55E"/>
        <circle cx="12" cy="22" r="2.5" fill="#FCA5A5"/>
      </g>
      <!-- Apel 3 -->
      <g transform="translate(90, 16)">
        <ellipse cx="14" cy="28" rx="12" ry="14" fill="#EF4444"/>
        <ellipse cx="20" cy="28" rx="12" ry="14" fill="#DC2626"/>
        <path d="M17 14 C17 8 20 6 23 4" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 10 C24 7 26 12 24 14 C20 14 18 10 18 10 Z" fill="#22C55E"/>
        <circle cx="12" cy="22" r="2.5" fill="#FCA5A5"/>
      </g>
      <!-- Apel 4 -->
      <g transform="translate(126, 16)">
        <ellipse cx="14" cy="28" rx="12" ry="14" fill="#EF4444"/>
        <ellipse cx="20" cy="28" rx="12" ry="14" fill="#DC2626"/>
        <path d="M17 14 C17 8 20 6 23 4" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 10 C24 7 26 12 24 14 C20 14 18 10 18 10 Z" fill="#22C55E"/>
        <circle cx="12" cy="22" r="2.5" fill="#FCA5A5"/>
      </g>
      <!-- Apel 5 -->
      <g transform="translate(162, 16)">
        <ellipse cx="14" cy="28" rx="12" ry="14" fill="#EF4444"/>
        <ellipse cx="20" cy="28" rx="12" ry="14" fill="#DC2626"/>
        <path d="M17 14 C17 8 20 6 23 4" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 10 C24 7 26 12 24 14 C20 14 18 10 18 10 Z" fill="#22C55E"/>
        <circle cx="12" cy="22" r="2.5" fill="#FCA5A5"/>
      </g>
      <!-- Apel 6 -->
      <g transform="translate(198, 16)">
        <ellipse cx="14" cy="28" rx="12" ry="14" fill="#EF4444"/>
        <ellipse cx="20" cy="28" rx="12" ry="14" fill="#DC2626"/>
        <path d="M17 14 C17 8 20 6 23 4" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 10 C24 7 26 12 24 14 C20 14 18 10 18 10 Z" fill="#22C55E"/>
        <circle cx="12" cy="22" r="2.5" fill="#FCA5A5"/>
      </g>
      <!-- Apel 7 -->
      <g transform="translate(234, 16)">
        <ellipse cx="14" cy="28" rx="12" ry="14" fill="#EF4444"/>
        <ellipse cx="20" cy="28" rx="12" ry="14" fill="#DC2626"/>
        <path d="M17 14 C17 8 20 6 23 4" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 10 C24 7 26 12 24 14 C20 14 18 10 18 10 Z" fill="#22C55E"/>
        <circle cx="12" cy="22" r="2.5" fill="#FCA5A5"/>
      </g>
      <!-- Apel 8 -->
      <g transform="translate(270, 16)">
        <ellipse cx="14" cy="28" rx="12" ry="14" fill="#EF4444"/>
        <ellipse cx="20" cy="28" rx="12" ry="14" fill="#DC2626"/>
        <path d="M17 14 C17 8 20 6 23 4" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M18 10 C24 7 26 12 24 14 C20 14 18 10 18 10 Z" fill="#22C55E"/>
        <circle cx="12" cy="22" r="2.5" fill="#FCA5A5"/>
      </g>
    </svg>`,
    options: [
      { id: 'A', text: '6 buah' },
      { id: 'B', text: '7 buah' },
      { id: 'C', text: '8 buah' },
      { id: 'D', text: '9 buah' },
    ],
    correctAnswer: 'C',
    explanation:
      'Jika dihitung satu per satu dari kiri ke kanan: 1, 2, 3, 4, 5, 6, 7, 8.\nJadi, banyak buah apel pada gambar adalah 8 buah.',
  },
  {
    id: 2,
    type: 'pg',
    element: 'Bilangan',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    topic: 'Lambang & Nama Bilangan (1-20)',
    indicator: 'Peserta didik dapat menentukan lambang bilangan dari nama bilangan yang disebutkan.',
    scoreWeight: 5,
    text: 'Lambang bilangan dari "sembilan belas" adalah...',
    options: [
      { id: 'A', text: '9' },
      { id: 'B', text: '16' },
      { id: 'C', text: '19' },
      { id: 'D', text: '91' },
    ],
    correctAnswer: 'C',
    explanation:
      'Nama bilangan "sembilan belas" ditulis dengan angka atau lambang bilangan 19.',
  },
  {
    id: 3,
    type: 'pg',
    element: 'Bilangan',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    topic: 'Membilang Banyak Benda (11-20)',
    indicator: 'Disajikan gambar pensil warna, peserta didik dapat menghitung jumlah pensil dengan teliti.',
    scoreWeight: 5,
    text: 'Ayu memiliki beberapa pensil warna seperti pada gambar berikut.\nBerapakah jumlah pensil warna milik Ayu?',
    imageSvg: `<svg viewBox="0 0 320 85" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-sm mx-auto">
      <rect width="320" height="85" rx="12" fill="#F0FDF4" stroke="#BBF7D0" stroke-width="1.5"/>
      <!-- 12 Pensil Berwarna-warni -->
      <g transform="translate(16, 12)">
        <!-- P1-P12 -->
        <rect x="0" y="18" width="12" height="42" rx="2" fill="#3B82F6"/>
        <polygon points="0,18 6,2 12,18" fill="#FDE047"/>
        <polygon points="4,7 6,2 8,7" fill="#1E3A8A"/>
        
        <rect x="24" y="18" width="12" height="42" rx="2" fill="#EF4444"/>
        <polygon points="24,18 30,2 36,18" fill="#FDE047"/>
        <polygon points="28,7 30,2 32,7" fill="#991B1B"/>

        <rect x="48" y="18" width="12" height="42" rx="2" fill="#10B981"/>
        <polygon points="48,18 54,2 60,18" fill="#FDE047"/>
        <polygon points="52,7 54,2 56,7" fill="#065F46"/>

        <rect x="72" y="18" width="12" height="42" rx="2" fill="#F59E0B"/>
        <polygon points="72,18 78,2 84,18" fill="#FDE047"/>
        <polygon points="76,7 78,2 80,7" fill="#92400E"/>

        <rect x="96" y="18" width="12" height="42" rx="2" fill="#8B5CF6"/>
        <polygon points="96,18 102,2 108,18" fill="#FDE047"/>
        <polygon points="100,7 102,2 104,7" fill="#5B21B6"/>

        <rect x="120" y="18" width="12" height="42" rx="2" fill="#EC4899"/>
        <polygon points="120,18 126,2 132,18" fill="#FDE047"/>
        <polygon points="124,7 126,2 128,7" fill="#9D174D"/>

        <rect x="144" y="18" width="12" height="42" rx="2" fill="#06B6D4"/>
        <polygon points="144,18 150,2 156,18" fill="#FDE047"/>
        <polygon points="148,7 150,2 152,7" fill="#155E75"/>

        <rect x="168" y="18" width="12" height="42" rx="2" fill="#84CC16"/>
        <polygon points="168,18 174,2 180,18" fill="#FDE047"/>
        <polygon points="172,7 174,2 176,7" fill="#3F6212"/>

        <rect x="192" y="18" width="12" height="42" rx="2" fill="#F97316"/>
        <polygon points="192,18 198,2 204,18" fill="#FDE047"/>
        <polygon points="196,7 198,2 200,7" fill="#9A3412"/>

        <rect x="216" y="18" width="12" height="42" rx="2" fill="#6366F1"/>
        <polygon points="216,18 222,2 228,18" fill="#FDE047"/>
        <polygon points="220,7 222,2 224,7" fill="#3730A3"/>

        <rect x="240" y="18" width="12" height="42" rx="2" fill="#14B8A6"/>
        <polygon points="240,18 246,2 252,18" fill="#FDE047"/>
        <polygon points="244,7 246,2 248,7" fill="#115E59"/>

        <rect x="264" y="18" width="12" height="42" rx="2" fill="#E11D48"/>
        <polygon points="264,18 270,2 276,18" fill="#FDE047"/>
        <polygon points="268,7 270,2 272,7" fill="#881337"/>
      </g>
    </svg>`,
    options: [
      { id: 'A', text: '10 pensil' },
      { id: 'B', text: '12 pensil' },
      { id: 'C', text: '14 pensil' },
      { id: 'D', text: '15 pensil' },
    ],
    correctAnswer: 'B',
    explanation:
      'Pada gambar terdapat 12 batang pensil warna. Jadi banyak pensil warna Ayu adalah 12 batang.',
  },
  {
    id: 4,
    type: 'pg',
    element: 'Bilangan',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    topic: 'Membandingkan Banyak Benda',
    indicator: 'Peserta didik dapat membandingkan dua kumpulan bilangan menggunakan kata lebih banyak atau lebih sedikit.',
    scoreWeight: 5,
    text: 'Kumpulan 14 kelereng ... daripada kumpulan 18 kelereng.',
    options: [
      { id: 'A', text: 'lebih banyak' },
      { id: 'B', text: 'lebih sedikit' },
      { id: 'C', text: 'sama banyak' },
      { id: 'D', text: 'sama berat' },
    ],
    correctAnswer: 'B',
    explanation:
      'Bilangan 14 nilainya lebih kecil daripada bilangan 18, sehingga kumpulan 14 kelereng lebih sedikit daripada kumpulan 18 kelereng.',
  },
  {
    id: 5,
    type: 'pg',
    element: 'Bilangan',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    topic: 'Mengurutkan Bilangan',
    indicator: 'Peserta didik dapat mengurutkan sekumpulan bilangan acak dari yang terkecil.',
    scoreWeight: 5,
    text: 'Perhatikan bilangan-bilangan berikut:\n15,  8,  12,  6\nUrutan bilangan di atas mulai dari yang terkecil adalah...',
    options: [
      { id: 'A', text: '6, 8, 12, 15' },
      { id: 'B', text: '15, 12, 8, 6' },
      { id: 'C', text: '8, 6, 12, 15' },
      { id: 'D', text: '6, 12, 8, 15' },
    ],
    correctAnswer: 'A',
    explanation:
      'Bilangan terkecil adalah 6, lalu 8, 12, dan yang terbesar adalah 15.\nJadi urutan dari yang terkecil adalah: 6, 8, 12, 15.',
  },
  {
    id: 6,
    type: 'pg',
    element: 'Geometri',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    topic: 'Mengenal Bangun Datar',
    indicator: 'Disajikan gambar roda sepeda, peserta didik dapat mengidentifikasi bentuk bangun datar lingkaran.',
    scoreWeight: 5,
    text: 'Perhatikan gambar roda sepeda berikut ini!\nPermukaan roda sepeda tersebut berbentuk bangun datar...',
    imageSvg: `<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-xs mx-auto">
      <rect width="200" height="120" rx="12" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
      <!-- Roda Sepeda Lingkaran -->
      <g transform="translate(100, 60)">
        <circle cx="0" cy="0" r="44" stroke="#1E293B" stroke-width="8" fill="#F1F5F9"/>
        <circle cx="0" cy="0" r="38" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="3 3"/>
        <circle cx="0" cy="0" r="10" fill="#3B82F6"/>
        <circle cx="0" cy="0" r="4" fill="#FFFFFF"/>
        <!-- Jari-jari Roda -->
        <line x1="0" y1="-38" x2="0" y2="38" stroke="#64748B" stroke-width="2"/>
        <line x1="-38" y1="0" x2="38" y2="0" stroke="#64748B" stroke-width="2"/>
        <line x1="-27" y1="-27" x2="27" y2="27" stroke="#64748B" stroke-width="2"/>
        <line x1="-27" y1="27" x2="27" y2="-27" stroke="#64748B" stroke-width="2"/>
      </g>
    </svg>`,
    options: [
      { id: 'A', text: 'Segitiga' },
      { id: 'B', text: 'Persegi' },
      { id: 'C', text: 'Lingkaran' },
      { id: 'D', text: 'Persegi panjang' },
    ],
    correctAnswer: 'C',
    explanation:
      'Roda sepeda berbentuk bulat melingkar sempurna tanpa sudut, yaitu bangun datar lingkaran.',
  },
  {
    id: 7,
    type: 'pg',
    element: 'Bilangan',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    topic: 'Penjumlahan Bilangan 1-20',
    indicator: 'Peserta didik dapat menyelesaikan soal cerita penjumlahan bilangan sampai 20 dalam kehidupan sehari-hari.',
    scoreWeight: 5,
    text: 'Edo mempunyai 7 buah jeruk. Ibu memberi Edo 6 buah jeruk lagi. Berapakah jumlah jeruk Edo sekarang?',
    options: [
      { id: 'A', text: '11 buah' },
      { id: 'B', text: '12 buah' },
      { id: 'C', text: '13 buah' },
      { id: 'D', text: '14 buah' },
    ],
    correctAnswer: 'C',
    explanation:
      'Jeruk mula-mula 7 buah, ditambah 6 buah lagi.\n7 + 6 = 13 buah.\nJadi jumlah jeruk Edo sekarang adalah 13 buah.',
  },
  {
    id: 8,
    type: 'pg',
    element: 'Bilangan',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    topic: 'Pengurangan Bilangan 1-20',
    indicator: 'Peserta didik dapat menyelesaikan masalah pengurangan bilangan sampai 20 dalam kehidupan sehari-hari.',
    scoreWeight: 5,
    text: 'Di atas meja ada 15 potong semangka. Doni dan teman-temannya memakan 5 potong semangka. Berapakah sisa semangka di atas meja?',
    options: [
      { id: 'A', text: '9 potong' },
      { id: 'B', text: '10 potong' },
      { id: 'C', text: '11 potong' },
      { id: 'D', text: '20 potong' },
    ],
    correctAnswer: 'B',
    explanation:
      'Semangka awal 15 potong dikurangi yang sudah dimakan 5 potong:\n15 - 5 = 10 potong.\nJadi sisa semangka di atas meja adalah 10 potong.',
  },
  {
    id: 9,
    type: 'pg',
    element: 'Pengukuran',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    topic: 'Pengukuran Berat Benda Sederhana',
    indicator: 'Disajikan gambar timbangan jungkat-jungkit, peserta didik dapat membandingkan berat dua benda dengan benar.',
    scoreWeight: 5,
    text: 'Perhatikan gambar timbangan berikut ini!\nBerdasarkan posisi timbangan, buah semangka ... daripada buah apel.',
    imageSvg: `<svg viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-xs mx-auto">
      <rect width="280" height="120" rx="12" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1.5"/>
      <!-- Timbangan Jungkat-jungkit Miring (Kiri Semangka Turun, Kanan Apel Naik) -->
      <!-- Titik Tumpu Segitiga -->
      <polygon points="140,82 125,110 155,110" fill="#475569"/>
      <!-- Garis Papan Miring (Kiri Turun ke Y=90, Kanan Naik ke Y=60) -->
      <line x1="40" y1="88" x2="240" y2="58" stroke="#1E293B" stroke-width="6" stroke-linecap="round"/>
      <circle cx="140" cy="73" r="5" fill="#EF4444"/>
      
      <!-- Sisi Kiri (Bawah): Buah Semangka Besar -->
      <g transform="translate(60, 52)">
        <ellipse cx="20" cy="22" rx="22" ry="18" fill="#15803D"/>
        <!-- Pola Belang Semangka -->
        <path d="M5 22 Q20 30 35 22" stroke="#14532D" stroke-width="2.5" fill="none"/>
        <path d="M10 14 Q20 22 30 14" stroke="#14532D" stroke-width="2.5" fill="none"/>
        <text x="20" y="48" font-size="9" font-family="sans-serif" font-weight="bold" fill="#1E293B" text-anchor="middle">Semangka</text>
      </g>

      <!-- Sisi Kanan (Atas): Buah Apel Kecil -->
      <g transform="translate(195, 20)">
        <ellipse cx="14" cy="22" rx="11" ry="12" fill="#EF4444"/>
        <path d="M14 10 C14 5 17 4 19 2" stroke="#78350F" stroke-width="2" stroke-linecap="round"/>
        <path d="M15 6 C19 4 21 8 19 10 Z" fill="#22C55E"/>
        <text x="14" y="44" font-size="9" font-family="sans-serif" font-weight="bold" fill="#1E293B" text-anchor="middle">Apel</text>
      </g>
    </svg>`,
    options: [
      { id: 'A', text: 'lebih ringan' },
      { id: 'B', text: 'lebih berat' },
      { id: 'C', text: 'sama berat' },
      { id: 'D', text: 'lebih kecil' },
    ],
    correctAnswer: 'B',
    explanation:
      'Pada timbangan jungkat-jungkit, benda yang posisinya berada di bawah menandakan benda tersebut lebih berat.\nKarena semangka berada di bawah dan apel terangkat ke atas, maka buah semangka lebih berat daripada buah apel.',
  },
  {
    id: 10,
    type: 'pg',
    element: 'Geometri',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    topic: 'Ciri Bangun Segitiga',
    indicator: 'Peserta didik dapat menentukan banyak sudut atau titik sudut pada bangun datar segitiga.',
    scoreWeight: 5,
    text: 'Perhatikan bangun segitiga berikut!\nBanyaknya titik sudut pada bangun segitiga adalah...',
    imageSvg: `<svg viewBox="0 0 180 110" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-xs mx-auto">
      <rect width="180" height="110" rx="12" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5"/>
      <g transform="translate(90, 55)">
        <polygon points="0,-38 -55,38 55,38" fill="#FBBF24" stroke="#D97706" stroke-width="3"/>
        <!-- Titik Sudut 1, 2, 3 -->
        <circle cx="0" cy="-38" r="5" fill="#DC2626"/>
        <circle cx="-55" cy="38" r="5" fill="#DC2626"/>
        <circle cx="55" cy="38" r="5" fill="#DC2626"/>
        <text x="0" y="-45" font-size="10" font-family="sans-serif" font-weight="bold" fill="#DC2626" text-anchor="middle">1</text>
        <text x="-65" y="44" font-size="10" font-family="sans-serif" font-weight="bold" fill="#DC2626" text-anchor="middle">2</text>
        <text x="65" y="44" font-size="10" font-family="sans-serif" font-weight="bold" fill="#DC2626" text-anchor="middle">3</text>
      </g>
    </svg>`,
    options: [
      { id: 'A', text: '2 sudut' },
      { id: 'B', text: '3 sudut' },
      { id: 'C', text: '4 sudut' },
      { id: 'D', text: '5 sudut' },
    ],
    correctAnswer: 'B',
    explanation:
      'Bangun segitiga memiliki 3 sisi dan 3 titik sudut.',
  },
  {
    id: 11,
    type: 'pg',
    element: 'Bilangan',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    topic: 'Penjumlahan Dua Kumpulan Benda',
    indicator: 'Disajikan gambar balon berwarna merah dan biru, peserta didik dapat menjumlahkan seluruh balon dengan tepat.',
    scoreWeight: 5,
    text: 'Siti memiliki 5 balon merah dan 6 balon biru seperti pada gambar di bawah.\nBerapakah jumlah seluruh balon milik Siti?',
    imageSvg: `<svg viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-sm mx-auto">
      <rect width="320" height="100" rx="12" fill="#FAF5FF" stroke="#E9D5FF" stroke-width="1.5"/>
      <!-- Kelompok Kiri: 5 Balon Merah -->
      <g transform="translate(20, 10)">
        <text x="65" y="15" font-size="10" font-family="sans-serif" font-weight="bold" fill="#DC2626" text-anchor="middle">5 Balon Merah</text>
        <!-- Balon 1-5 -->
        <ellipse cx="20" cy="40" rx="10" ry="14" fill="#EF4444"/>
        <line x1="20" y1="54" x2="20" y2="76" stroke="#94A3B8" stroke-width="1.5"/>
        <ellipse cx="42" cy="35" rx="10" ry="14" fill="#EF4444"/>
        <line x1="42" y1="49" x2="35" y2="76" stroke="#94A3B8" stroke-width="1.5"/>
        <ellipse cx="65" cy="42" rx="10" ry="14" fill="#EF4444"/>
        <line x1="65" y1="56" x2="60" y2="76" stroke="#94A3B8" stroke-width="1.5"/>
        <ellipse cx="88" cy="36" rx="10" ry="14" fill="#EF4444"/>
        <line x1="88" y1="50" x2="75" y2="76" stroke="#94A3B8" stroke-width="1.5"/>
        <ellipse cx="110" cy="40" rx="10" ry="14" fill="#EF4444"/>
        <line x1="110" y1="54" x2="90" y2="76" stroke="#94A3B8" stroke-width="1.5"/>
      </g>
      <!-- Tanda Tambah -->
      <text x="160" y="55" font-size="22" font-family="sans-serif" font-weight="black" fill="#6B7280" text-anchor="middle">+</text>
      <!-- Kelompok Kanan: 6 Balon Biru -->
      <g transform="translate(175, 10)">
        <text x="65" y="15" font-size="10" font-family="sans-serif" font-weight="bold" fill="#2563EB" text-anchor="middle">6 Balon Biru</text>
        <!-- Balon 1-6 -->
        <ellipse cx="16" cy="38" rx="9" ry="13" fill="#3B82F6"/>
        <line x1="16" y1="51" x2="16" y2="76" stroke="#94A3B8" stroke-width="1.5"/>
        <ellipse cx="36" cy="34" rx="9" ry="13" fill="#3B82F6"/>
        <line x1="36" y1="47" x2="30" y2="76" stroke="#94A3B8" stroke-width="1.5"/>
        <ellipse cx="56" cy="42" rx="9" ry="13" fill="#3B82F6"/>
        <line x1="56" y1="55" x2="50" y2="76" stroke="#94A3B8" stroke-width="1.5"/>
        <ellipse cx="76" cy="35" rx="9" ry="13" fill="#3B82F6"/>
        <line x1="76" y1="48" x2="65" y2="76" stroke="#94A3B8" stroke-width="1.5"/>
        <ellipse cx="96" cy="40" rx="9" ry="13" fill="#3B82F6"/>
        <line x1="96" y1="53" x2="80" y2="76" stroke="#94A3B8" stroke-width="1.5"/>
        <ellipse cx="116" cy="36" rx="9" ry="13" fill="#3B82F6"/>
        <line x1="116" y1="49" x2="95" y2="76" stroke="#94A3B8" stroke-width="1.5"/>
      </g>
    </svg>`,
    options: [
      { id: 'A', text: '10 balon' },
      { id: 'B', text: '11 balon' },
      { id: 'C', text: '12 balon' },
      { id: 'D', text: '13 balon' },
    ],
    correctAnswer: 'B',
    explanation:
      'Jumlah seluruh balon = 5 balon merah + 6 balon biru = 11 balon.',
  },
  {
    id: 12,
    type: 'pg',
    element: 'Aljabar',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    topic: 'Pasangan Bilangan Menuju 10 (Number Bonds)',
    indicator: 'Peserta didik dapat menentukan bilangan pelengkap untuk menghasilkan jumlah 10.',
    scoreWeight: 5,
    text: 'Perhatikan kalimat matematika berikut:\n7  +  ...  =  10\nBilangan yang tepat untuk mengisi titik-titik adalah...',
    options: [
      { id: 'A', text: '2' },
      { id: 'B', text: '3' },
      { id: 'C', text: '4' },
      { id: 'D', text: '5' },
    ],
    correctAnswer: 'B',
    explanation:
      'Pasangan bilangan dari 7 untuk menghasilkan 10 adalah 3, karena 7 + 3 = 10 (atau 10 - 7 = 3).',
  },
  {
    id: 13,
    type: 'pg',
    element: 'Pengukuran',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    topic: 'Membandingkan Panjang Benda',
    indicator: 'Peserta didik dapat membandingkan panjang dua benda dengan satuan non-baku atau perbandingan visual.',
    scoreWeight: 5,
    text: 'Di atas meja terdapat sebuah pensil tulis dan sebuah karet penghapus.\nPensil lebih ... daripada karet penghapus.',
    options: [
      { id: 'A', text: 'pendek' },
      { id: 'B', text: 'panjang' },
      { id: 'C', text: 'ringan' },
      { id: 'D', text: 'bulat' },
    ],
    correctAnswer: 'B',
    explanation:
      'Batang pensil memiliki ukuran yang memanjang, sedangkan karet penghapus berukuran kecil dan pendek. Jadi pensil lebih panjang daripada penghapus.',
  },
  {
    id: 14,
    type: 'pg',
    element: 'Aljabar',
    cognitiveLevel: 'L3',
    difficulty: 'Sedang',
    topic: 'Pola Bilangan Loncat',
    indicator: 'Disajikan pola bilangan loncat dua, peserta didik dapat menentukan bilangan berikutnya dengan tepat.',
    scoreWeight: 5,
    text: 'Perhatikan pola bilangan loncat dua berikut ini:\n2,   4,   6,   8,   ...\nBilangan selanjutnya pada titik-titik di atas adalah...',
    imageSvg: `<svg viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-sm mx-auto">
      <rect width="300" height="80" rx="12" fill="#F0FDF4" stroke="#BBF7D0" stroke-width="1.5"/>
      <!-- Garis Bilangan dengan Lengkungan Lompat Katak -->
      <line x1="30" y1="52" x2="270" y2="52" stroke="#64748B" stroke-width="2.5" stroke-linecap="round"/>
      
      <!-- Angka 2 -->
      <circle cx="50" cy="52" r="4" fill="#047857"/>
      <text x="50" y="70" font-size="12" font-family="sans-serif" font-weight="bold" fill="#065F46" text-anchor="middle">2</text>
      
      <!-- Lompat 2 -> 4 (+2) -->
      <path d="M50 48 Q75 22 100 48" stroke="#10B981" stroke-width="2" stroke-dasharray="3 3" fill="none"/>
      <text x="75" y="24" font-size="9" font-family="sans-serif" font-weight="bold" fill="#059669" text-anchor="middle">+2</text>

      <!-- Angka 4 -->
      <circle cx="100" cy="52" r="4" fill="#047857"/>
      <text x="100" y="70" font-size="12" font-family="sans-serif" font-weight="bold" fill="#065F46" text-anchor="middle">4</text>

      <!-- Lompat 4 -> 6 (+2) -->
      <path d="M100 48 Q125 22 150 48" stroke="#10B981" stroke-width="2" stroke-dasharray="3 3" fill="none"/>
      <text x="125" y="24" font-size="9" font-family="sans-serif" font-weight="bold" fill="#059669" text-anchor="middle">+2</text>

      <!-- Angka 6 -->
      <circle cx="150" cy="52" r="4" fill="#047857"/>
      <text x="150" y="70" font-size="12" font-family="sans-serif" font-weight="bold" fill="#065F46" text-anchor="middle">6</text>

      <!-- Lompat 6 -> 8 (+2) -->
      <path d="M150 48 Q175 22 200 48" stroke="#10B981" stroke-width="2" stroke-dasharray="3 3" fill="none"/>
      <text x="175" y="24" font-size="9" font-family="sans-serif" font-weight="bold" fill="#059669" text-anchor="middle">+2</text>

      <!-- Angka 8 -->
      <circle cx="200" cy="52" r="4" fill="#047857"/>
      <text x="200" y="70" font-size="12" font-family="sans-serif" font-weight="bold" fill="#065F46" text-anchor="middle">8</text>

      <!-- Lompat 8 -> ? (+2) -->
      <path d="M200 48 Q225 22 250 48" stroke="#DC2626" stroke-width="2.5" fill="none"/>
      <text x="225" y="24" font-size="9" font-family="sans-serif" font-weight="bold" fill="#DC2626" text-anchor="middle">+2</text>

      <!-- Tanda Tanya Titik-titik -->
      <circle cx="250" cy="52" r="5" fill="#DC2626"/>
      <text x="250" y="70" font-size="13" font-family="sans-serif" font-weight="black" fill="#DC2626" text-anchor="middle">?</text>
    </svg>`,
    options: [
      { id: 'A', text: '9' },
      { id: 'B', text: '10' },
      { id: 'C', text: '11' },
      { id: 'D', text: '12' },
    ],
    correctAnswer: 'B',
    explanation:
      'Pola bilangan di atas selalu bertambah 2 (+2):\n2 + 2 = 4\n4 + 2 = 6\n6 + 2 = 8\n8 + 2 = 10.\nJadi bilangan selanjutnya adalah 10.',
  },
  {
    id: 15,
    type: 'pg',
    element: 'Bilangan',
    cognitiveLevel: 'L3',
    difficulty: 'Sukar',
    topic: 'Operasi Campuran Penjumlahan & Pengurangan',
    indicator: 'Peserta didik dapat menyelesaikan soal cerita dua langkah (pengurangan lalu penjumlahan) sederhana.',
    scoreWeight: 5,
    text: 'Budi memiliki 16 butir kelereng. Budi memberikan 6 butir kelereng kepada adiknya. Kemudian, Ayah membelikan Budi 3 butir kelereng lagi. Berapa banyak kelereng Budi sekarang?',
    options: [
      { id: 'A', text: '10 butir' },
      { id: 'B', text: '12 butir' },
      { id: 'C', text: '13 butir' },
      { id: 'D', text: '15 butir' },
    ],
    correctAnswer: 'C',
    explanation:
      'Langkah 1: Kelereng mula-mula 16, diberikan ke adik 6 butir -> 16 - 6 = 10 butir.\nLangkah 2: Diberi Ayah lagi 3 butir -> 10 + 3 = 13 butir.\nJadi banyak kelereng Budi sekarang adalah 13 butir.',
  },

  // =========================================================================
  // PILIHAN GANDA KOMPLEKS KATEGORI (5 BUTIR SOAL: NO 16 s.d. 20)
  // Setiap soal memiliki TEPAT 2 deskripsi pernyataan Benar / Salah
  // =========================================================================
  {
    id: 16,
    type: 'pgk_kategori',
    element: 'Bilangan',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    topic: 'Nilai Tempat Puluhan & Satuan (Bilangan 11-20)',
    indicator: 'Disajikan konsep nilai tempat bilangan belasan, peserta didik dapat menilai kebenaran pernyataan puluhan dan satuan.',
    scoreWeight: 5,
    text: 'Perhatikan bilangan 14 berikut ini.\nTentukan apakah setiap pernyataan di bawah ini BENAR atau SALAH!',
    imageSvg: `<svg viewBox="0 0 280 90" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-xs mx-auto">
      <rect width="280" height="90" rx="12" fill="#FEF3C7" stroke="#FDE68A" stroke-width="1.5"/>
      <g transform="translate(40, 15)">
        <!-- 1 Ikat Stik Isi 10 (Puluhan) -->
        <rect x="0" y="5" width="55" height="50" rx="6" fill="#F59E0B" stroke="#D97706" stroke-width="1.5"/>
        <line x1="10" y1="5" x2="10" y2="55" stroke="#78350F" stroke-width="2"/>
        <line x1="20" y1="5" x2="20" y2="55" stroke="#78350F" stroke-width="2"/>
        <line x1="30" y1="5" x2="30" y2="55" stroke="#78350F" stroke-width="2"/>
        <line x1="40" y1="5" x2="40" y2="55" stroke="#78350F" stroke-width="2"/>
        <line x1="0" y1="30" x2="55" y2="30" stroke="#DC2626" stroke-width="3"/>
        <text x="27" y="52" font-size="14" font-family="sans-serif" font-weight="black" fill="#FFFFFF" text-anchor="middle">10</text>
        <text x="27" y="68" font-size="9" font-family="sans-serif" font-weight="bold" fill="#92400E" text-anchor="middle">1 Puluhan</text>
      </g>
      <text x="125" y="45" font-size="20" font-family="sans-serif" font-weight="black" fill="#B45309" text-anchor="middle">+</text>
      <g transform="translate(150, 15)">
        <!-- 4 Stik Lepas (Satuan) -->
        <rect x="0" y="5" width="8" height="50" rx="2" fill="#F59E0B" stroke="#D97706" stroke-width="1"/>
        <rect x="16" y="5" width="8" height="50" rx="2" fill="#F59E0B" stroke="#D97706" stroke-width="1"/>
        <rect x="32" y="5" width="8" height="50" rx="2" fill="#F59E0B" stroke="#D97706" stroke-width="1"/>
        <rect x="48" y="5" width="8" height="50" rx="2" fill="#F59E0B" stroke="#D97706" stroke-width="1"/>
        <text x="28" y="68" font-size="9" font-family="sans-serif" font-weight="bold" fill="#92400E" text-anchor="middle">4 Satuan</text>
      </g>
    </svg>`,
    statements: [
      {
        id: 's1',
        text: 'Bilangan 14 terdiri dari 1 puluhan dan 4 satuan.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Bilangan 14 dibaca "empat puluh satu".',
        correctAnswer: false,
      },
    ],
    explanation:
      'Pernyataan 1 BENAR: 14 = 1 puluhan (10) + 4 satuan (4).\nPernyataan 2 SALAH: Angka 14 dibaca "empat belas", bukan "empat puluh satu" (41).',
  },
  {
    id: 17,
    type: 'pgk_kategori',
    element: 'Bilangan',
    cognitiveLevel: 'L2',
    difficulty: 'Sedang',
    topic: 'Membandingkan Banyak Objek & Penjumlahan',
    indicator: 'Disajikan gambar 9 bintang dan 7 bulan, peserta didik dapat menganalisis perbandingan dan hasil penggabungannya.',
    scoreWeight: 5,
    text: 'Amati gambar 9 bintang kuning dan 7 bulan sabit berikut!\nTentukan kebenaran dari masing-masing pernyataan berikut ini!',
    imageSvg: `<svg viewBox="0 0 320 95" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-sm mx-auto">
      <rect width="320" height="95" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
      <!-- 9 Bintang Kuning -->
      <g transform="translate(15, 12)">
        <text x="65" y="14" font-size="10" font-family="sans-serif" font-weight="bold" fill="#FDE047" text-anchor="middle">9 Bintang Kuning</text>
        <polygon points="12,28 15,35 22,35 17,40 19,47 12,43 5,47 7,40 2,35 9,35" fill="#FACC15"/>
        <polygon points="38,28 41,35 48,35 43,40 45,47 38,43 31,47 33,40 28,35 35,35" fill="#FACC15"/>
        <polygon points="64,28 67,35 74,35 69,40 71,47 64,43 57,47 59,40 54,35 61,35" fill="#FACC15"/>
        <polygon points="90,28 93,35 100,35 95,40 97,47 90,43 83,47 85,40 80,35 87,35" fill="#FACC15"/>
        <polygon points="116,28 119,35 126,35 121,40 123,47 116,43 109,47 111,40 106,35 113,35" fill="#FACC15"/>
        
        <polygon points="25,56 28,63 35,63 30,68 32,75 25,71 18,75 20,68 15,63 22,63" fill="#FACC15"/>
        <polygon points="51,56 54,63 61,63 56,68 58,75 51,71 44,75 46,68 41,63 48,63" fill="#FACC15"/>
        <polygon points="77,56 80,63 87,63 82,68 84,75 77,71 70,75 72,68 67,63 74,63" fill="#FACC15"/>
        <polygon points="103,56 106,63 113,63 108,68 110,75 103,71 96,75 98,68 93,63 100,63" fill="#FACC15"/>
      </g>
      <!-- Garis Pemisah -->
      <line x1="155" y1="15" x2="155" y2="80" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3"/>
      <!-- 7 Bulan Sabit -->
      <g transform="translate(170, 12)">
        <text x="65" y="14" font-size="10" font-family="sans-serif" font-weight="bold" fill="#67E8F9" text-anchor="middle">7 Bulan Sabit</text>
        <path d="M20 28 A10 10 0 1 0 32 46 A13 13 0 0 1 20 28 Z" fill="#38BDF8"/>
        <path d="M52 28 A10 10 0 1 0 64 46 A13 13 0 0 1 52 28 Z" fill="#38BDF8"/>
        <path d="M84 28 A10 10 0 1 0 96 46 A13 13 0 0 1 84 28 Z" fill="#38BDF8"/>
        <path d="M116 28 A10 10 0 1 0 128 46 A13 13 0 0 1 116 28 Z" fill="#38BDF8"/>
        
        <path d="M35 56 A10 10 0 1 0 47 74 A13 13 0 0 1 35 56 Z" fill="#38BDF8"/>
        <path d="M68 56 A10 10 0 1 0 80 74 A13 13 0 0 1 68 56 Z" fill="#38BDF8"/>
        <path d="M100 56 A10 10 0 1 0 112 74 A13 13 0 0 1 100 56 Z" fill="#38BDF8"/>
      </g>
    </svg>`,
    statements: [
      {
        id: 's1',
        text: 'Jumlah bintang kuning (9) lebih banyak daripada jumlah bulan sabit (7).',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Jika seluruh bintang dan bulan digabungkan, jumlah keseluruhannya adalah 15 buah.',
        correctAnswer: false,
      },
    ],
    explanation:
      'Pernyataan 1 BENAR: 9 bintang lebih banyak daripada 7 bulan sabit (9 > 7).\nPernyataan 2 SALAH: 9 + 7 = 16 buah, bukan 15 buah.',
  },
  {
    id: 18,
    type: 'pgk_kategori',
    element: 'Geometri',
    cognitiveLevel: 'L1',
    difficulty: 'Mudah',
    topic: 'Ciri-Ciri Bangun Datar',
    indicator: 'Peserta didik dapat menganalisis sifat bangun persegi dan lingkaran secara tepat.',
    scoreWeight: 5,
    text: 'Perhatikan pernyataan tentang ciri-ciri bangun datar di bawah ini.\nTentukan BENAR atau SALAH untuk setiap pernyataan!',
    statements: [
      {
        id: 's1',
        text: 'Bangun datar persegi memiliki 4 sisi yang sama panjang.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Bangun datar lingkaran memiliki 3 sudut lancip.',
        correctAnswer: false,
      },
    ],
    explanation:
      'Pernyataan 1 BENAR: Persegi memiliki 4 sisi lurus yang sama panjang.\nPernyataan 2 SALAH: Lingkaran merupakan bangun kurva melengkung tertutup dan sama sekali tidak memiliki sudut.',
  },
  {
    id: 19,
    type: 'pgk_kategori',
    element: 'Pengukuran',
    cognitiveLevel: 'L2',
    difficulty: 'Sukar',
    topic: 'Satuan Panjang Non-Baku & Waktu',
    indicator: 'Peserta didik dapat menentukan penggunaan satuan pengukuran tidak baku dan satuan waktu sehari-hari.',
    scoreWeight: 5,
    text: 'Perhatikan pernyataan tentang cara mengukur benda di sekitar kita berikut ini.\nTentukan BENAR atau SALAH untuk setiap pernyataan!',
    statements: [
      {
        id: 's1',
        text: 'Panjang lantai ruang kelas lebih mudah dan tepat diukur menggunakan langkah kaki daripada menggunakan batang pensil.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Jarum panjang pada jam dinding menunjukkan ukuran jam, sedangkan jarum pendek menunjukkan ukuran menit.',
        correctAnswer: false,
      },
    ],
    explanation:
      'Pernyataan 1 BENAR: Mengukur ruangan yang luas lebih praktis dan tepat menggunakan langkah kaki dibanding pensil kecil.\nPernyataan 2 SALAH: Jarum pendek pada jam dinding menunjukkan jam, sedangkan jarum panjang menunjukkan menit.',
  },
  {
    id: 20,
    type: 'pgk_kategori',
    element: 'Aljabar',
    cognitiveLevel: 'L3',
    difficulty: 'Sukar',
    topic: 'Penalaran Operasi Hitung dan Pasangan Bilangan',
    indicator: 'Peserta didik dapat menguji kebenaran operasi hitung campuran sederhana dan pasangan bilangan menuju 20.',
    scoreWeight: 5,
    text: 'Perhatikan dua pernyataan operasi hitung berikut ini.\nTentukan BENAR atau SALAH untuk setiap pernyataan!',
    statements: [
      {
        id: 's1',
        text: 'Hasil hitung dari 18 - 8 + 5 adalah 15.',
        correctAnswer: true,
      },
      {
        id: 's2',
        text: 'Sepasang bilangan yang apabila dijumlahkan menghasilkan 20 adalah 12 dan 7.',
        correctAnswer: false,
      },
    ],
    explanation:
      'Pernyataan 1 BENAR: 18 - 8 = 10, kemudian 10 + 5 = 15.\nPernyataan 2 SALAH: 12 + 7 = 19 (bukan 20). Pasangan yang tepat untuk 12 agar berjumlah 20 adalah 8 (12 + 8 = 20).',
  },
];
