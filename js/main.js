'use strict';

// ===================== Данные =====================

const CATEGORIES = {
  cpu: { ru: 'Процессоры', en: 'CPUs' },
  gpu: { ru: 'Видеокарты', en: 'Graphics cards' },
  ram: { ru: 'Оперативная память', en: 'Memory' },
  storage: { ru: 'Накопители', en: 'Storage' },
  motherboard: { ru: 'Материнские платы', en: 'Motherboards' },
  psu: { ru: 'Блоки питания', en: 'Power supplies' },
  case: { ru: 'Корпуса', en: 'Cases' },
  build: { ru: 'Готовые сборки', en: 'Pre-built PCs' }
};

const BADGES = {
  popular: { label: { ru: 'Хит', en: 'Hit' }, mod: 'badge-tag--popular' },
  discount: { label: { ru: 'Скидка', en: 'Sale' }, mod: 'badge-tag--discount' },
  fast: { label: { ru: 'В наличии', en: 'In stock' }, mod: 'badge-tag--fast' }
};

// Инлайн-SVG: цвет штрихов наследует color карточки
const IMAGES = {
  cpu: '<svg class="product-illustration" viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="30" y="10" width="60" height="66" rx="7" stroke-width="2.6"/>' +
    '<rect x="38" y="18" width="44" height="50" rx="5" stroke-width="2.6" fill="currentColor" fill-opacity="0.13"/>' +
    '<path d="M46 28h20M46 36h13M46 44h16" stroke-width="2" stroke="var(--ink-soft)"/>' +
    '<path d="M72 24l7 7v-7z" fill="currentColor" stroke="none"/>' +
    '<path d="M30 24v40M90 24v40" stroke-width="2.2" stroke-dasharray="1.5 4.5" stroke="var(--ink-soft)"/>' +
    '<path d="M38 76h44" stroke-width="4.4" stroke-dasharray="0.5 5.2" stroke="var(--ink-soft)"/>' +
    '</svg>',
  gpu: '<svg class="product-illustration" viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="8" y="30" width="102" height="32" rx="6" stroke-width="2.6"/>' +
    '<rect x="8" y="30" width="102" height="9" rx="4" stroke="none" fill="currentColor" fill-opacity="0.14"/>' +
    '<rect x="50" y="20" width="20" height="10" rx="2" stroke-width="2.2"/>' +
    '<circle cx="32" cy="50" r="10.5" stroke-width="2.2"/>' +
    '<circle cx="32" cy="50" r="3.4" fill="currentColor" stroke="none"/>' +
    '<path d="M32 50V41M37 47l8 4.5M36.5 55l-8 4.5" stroke-width="2"/>' +
    '<circle cx="86" cy="50" r="10.5" stroke-width="2.2"/>' +
    '<circle cx="86" cy="50" r="3.4" fill="currentColor" stroke="none"/>' +
    '<path d="M86 50V41M91 47l8 4.5M90.5 55l-8 4.5" stroke-width="2"/>' +
    '<path d="M20 62h78" stroke-width="4.6" stroke-dasharray="3 4" stroke="var(--ink-soft)"/>' +
    '<path d="M113 32v26" stroke-width="2.6"/><circle cx="113" cy="60" r="1.6" fill="currentColor" stroke="none"/>' +
    '</svg>',
  ram: '<svg class="product-illustration" viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="44" y="12" width="66" height="24" rx="4" stroke-width="2.4" stroke="var(--ink-soft)"/>' +
    '<rect x="52" y="17" width="46" height="14" rx="2" stroke-width="1.8" stroke="var(--ink-soft)"/>' +
    '<rect x="8" y="36" width="72" height="28" rx="5" stroke-width="2.6"/>' +
    '<rect x="16" y="42" width="56" height="16" rx="3" stroke-width="2.2" fill="currentColor" fill-opacity="0.13"/>' +
    '<path d="M16 50h56" stroke-width="2" stroke-dasharray="3 5" stroke="var(--ink-soft)"/>' +
    '<path d="M13 64h62" stroke-width="4.6" stroke-dasharray="2.6 3.4" stroke="var(--ink-soft)"/>' +
    '</svg>',
  storage: '<svg class="product-illustration" viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="16" y="32" width="88" height="28" rx="4" stroke-width="2.6"/>' +
    '<rect x="26" y="22" width="50" height="48" rx="6" stroke-width="2.4" fill="currentColor" fill-opacity="0.13"/>' +
    '<rect x="34" y="40" width="12" height="12" rx="2" stroke-width="1.8" stroke="var(--ink-soft)"/>' +
    '<rect x="50" y="40" width="12" height="12" rx="2" stroke-width="1.8"/>' +
    '<rect x="66" y="40" width="12" height="12" rx="2" stroke-width="1.8"/>' +
    '<path d="M16 24h18" stroke-width="4.6" stroke="var(--ink-soft)"/>' +
    '<circle cx="102" cy="46" r="2.6" stroke-width="2"/>' +
    '</svg>',
  motherboard: '<svg class="product-illustration" viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="14" y="8" width="92" height="74" rx="7" stroke-width="2.6"/>' +
    '<rect x="20" y="14" width="10" height="24" rx="2" stroke-width="2" fill="currentColor" fill-opacity="0.14"/>' +
    '<rect x="20" y="44" width="10" height="18" rx="2" stroke-width="2"/>' +
    '<rect x="44" y="14" width="28" height="28" rx="4" stroke-width="2.2"/>' +
    '<rect x="51" y="21" width="14" height="14" rx="2" stroke-width="1.8" fill="currentColor" fill-opacity="0.13"/>' +
    '<rect x="80" y="12" width="8" height="34" rx="2" stroke-width="2.2"/>' +
    '<rect x="90" y="12" width="8" height="34" rx="2" stroke-width="2.2" fill="currentColor" fill-opacity="0.13"/>' +
    '<path d="M40 58h52" stroke-width="5" stroke-dasharray="6 3" stroke="var(--ink-soft)"/>' +
    '<path d="M40 70h34" stroke-width="5" stroke-dasharray="6 3" stroke="var(--ink-soft)"/>' +
    '<rect x="84" y="58" width="15" height="15" rx="4" stroke-width="2.2" fill="currentColor" fill-opacity="0.13"/>' +
    '</svg>',
  psu: '<svg class="product-illustration" viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="14" y="12" width="92" height="66" rx="7" stroke-width="2.6"/>' +
    '<path d="M14 22h92" stroke-width="2" stroke="var(--ink-soft)"/>' +
    '<circle cx="60" cy="52" r="19" stroke-width="2.6"/>' +
    '<path d="M60 52V35.5M75.5 49.5 60 45M69 64.3l-8.5-6.7M51 66.5l9-14.5M44.5 49 60 45" stroke-width="2"/>' +
    '<circle cx="60" cy="52" r="3.6" fill="currentColor" stroke="none"/>' +
    '<rect x="22" y="15.5" width="7" height="5" rx="1" stroke-width="1.7"/>' +
    '<rect x="32" y="15.5" width="7" height="5" rx="1" stroke-width="1.7"/>' +
    '<rect x="42" y="15.5" width="7" height="5" rx="1" stroke-width="1.7"/>' +
    '<rect x="52" y="15.5" width="7" height="5" rx="1" stroke-width="1.7"/>' +
    '<rect x="79" y="15.5" width="9" height="5" rx="1" stroke-width="1.7" stroke="var(--ink-soft)"/>' +
    '<path d="M95 15.5h6" stroke-width="1.7" stroke="var(--ink-soft)"/>' +
    '</svg>',
  case: '<svg class="product-illustration" viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="30" y="8" width="56" height="70" rx="6" stroke-width="2.6"/>' +
    '<path d="M37 14v58M43 14v58" stroke-width="2" stroke-dasharray="2 4.4" stroke="var(--ink-soft)"/>' +
    '<rect x="52" y="16" width="28" height="54" rx="4" stroke-width="2.2"/>' +
    '<circle cx="66" cy="28" r="7" stroke-width="2"/>' +
    '<circle cx="66" cy="46" r="7" stroke-width="2" fill="currentColor" fill-opacity="0.13"/>' +
    '<circle cx="66" cy="62" r="5.5" stroke-width="2" stroke="var(--ink-soft)"/>' +
    '<circle cx="66" cy="14" r="1.6" fill="currentColor" stroke="none"/>' +
    '<path d="M24 78h68" stroke-width="2.6"/>' +
    '</svg>',
  build: '<svg class="product-illustration" viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="6" y="12" width="52" height="36" rx="5" stroke-width="2.6"/>' +
    '<path d="M13 22h26M13 30h14M13 38h20" stroke-width="2.2" stroke="var(--ink-soft)"/>' +
    '<path d="M32 48v12M20 60h24" stroke-width="2.6"/>' +
    '<rect x="66" y="8" width="46" height="72" rx="6" stroke-width="2.6"/>' +
    '<rect x="72" y="16" width="34" height="56" rx="4" stroke-width="2.2" fill="currentColor" fill-opacity="0.13"/>' +
    '<circle cx="89" cy="30" r="8" stroke-width="2.2"/>' +
    '<circle cx="89" cy="30" r="2.4" fill="currentColor" stroke="none"/>' +
    '<circle cx="89" cy="50" r="8" stroke-width="2.2"/>' +
    '<circle cx="89" cy="50" r="2.4" fill="currentColor" stroke="none"/>' +
    '<path d="M76 64h26" stroke-width="2" stroke="var(--ink-soft)"/>' +
    '</svg>'
};


const PRODUCTS = [
  {
    id: 1, category: 'cpu', brand: 'AMD', rating: 4.9, votes: 163,
    image: 'images/products/p1_9600x.jpg',
    name: 'Процессор AMD Ryzen 5 9600X', nameEn: 'AMD Ryzen 5 9600X Processor',
    price: 17990, badge: 'popular',
    specs: { 'Сокет': 'AM5', 'Ядра / потоки': '6 / 12', 'Частота': 'до 5.4 ГГц', 'TDP': '65 Вт' },
    short: 'Народный процессор Zen 5: 6 ядер, высокие частоты и холодный характер для любой стартовой сборки.',
    shortEn: 'The people\'s Zen 5 CPU: 6 cores, high clocks and a cool temperament for any starter build.'
  },
  {
    id: 2, category: 'cpu', brand: 'Intel', rating: 4.7, votes: 95,
    image: 'images/products/p2_245k.jpg',
    name: 'Процессор Intel Core Ultra 5 245K', nameEn: 'Intel Core Ultra 5 245K Processor',
    price: 19990, badge: 'fast',
    specs: { 'Сокет': 'LGA 1851', 'Ядра / потоки': '14 / 14 (6P + 8E)', 'Частота': 'до 5.2 ГГц', 'TDP': '125 Вт' },
    short: 'Arrow Lake для игр и работы: 14 ядер, поддержка DDR5-6400 и быстрой памяти без разгона.',
    shortEn: 'Arrow Lake for work and play: 14 cores, DDR5-6400 and fast memory out of the box.'
  },
  {
    id: 3, category: 'cpu', brand: 'AMD', rating: 5.0, votes: 212,
    image: 'images/products/p3_9800x3d.jpg',
    name: 'Процессор AMD Ryzen 7 9800X3D', nameEn: 'AMD Ryzen 7 9800X3D Processor',
    price: 44990, badge: 'popular',
    specs: { 'Сокет': 'AM5', 'Ядра / потоки': '8 / 16', 'Частота': 'до 5.2 ГГц', 'TDP': '120 Вт', 'Кэш 3D V-Cache': '96 МБ' },
    short: 'Лучший игровой процессор поколения: 3D V-Cache под кристаллом — максимум FPS в любом сценарии.',
    shortEn: 'The best gaming CPU of the generation: stacked 3D V-Cache means maximum FPS in every scenario.'
  },
  {
    id: 4, category: 'gpu', brand: 'NVIDIA', rating: 4.9, votes: 183,
    image: 'images/products/p4_5060.jpg',
    name: 'Видеокарта NVIDIA RTX 5060 8 ГБ GDDR7', nameEn: 'NVIDIA RTX 5060 8 GB GDDR7 Graphics Card',
    price: 34990, badge: 'popular',
    specs: { 'Архитектура': 'Blackwell', 'Видеопамять': '8 ГБ GDDR7', 'DLSS': '4, генерация кадров', 'Рекомендуемый БП': '550 Вт' },
    short: 'Базовая карта поколения Blackwell: DLSS 4 и трассировка лучей в Full HD без компромиссов.',
    shortEn: 'The base Blackwell card: DLSS 4 and ray tracing in Full HD with no compromises.'
  },
  {
    id: 5, category: 'gpu', brand: 'NVIDIA', rating: 4.9, votes: 129,
    image: 'images/products/p5_5070.png',
    name: 'Видеокарта NVIDIA RTX 5070 12 ГБ GDDR7', nameEn: 'NVIDIA RTX 5070 12 GB GDDR7 Graphics Card',
    price: 104990, badge: null,
    specs: { 'Архитектура': 'Blackwell', 'Видеопамять': '12 ГБ GDDR7', 'Шина': '192 бит', 'Рекомендуемый БП': '650 Вт' },
    short: 'Уверенный QHD-гейминг с запасом: DLSS 4 с генерацией кадров в тяжёлых новинках.',
    shortEn: 'Confident QHD gaming with headroom: DLSS 4 frame generation in the heaviest releases.'
  },
  {
    id: 6, category: 'gpu', brand: 'NVIDIA', rating: 4.9, votes: 76,
    image: 'images/products/p6_5080.png',
    name: 'Видеокарта NVIDIA RTX 5080 16 ГБ GDDR7', nameEn: 'NVIDIA RTX 5080 16 GB GDDR7 Graphics Card',
    price: 139990, badge: 'fast',
    specs: { 'Архитектура': 'Blackwell', 'Видеопамять': '16 ГБ GDDR7', 'Шина': '256 бит', 'Рекомендуемый БП': '850 Вт' },
    short: 'Сильнейшая карта под QHD и 4K: 16 ГБ GDDR7 и запас производительности на годы вперёд.',
    shortEn: 'A powerhouse for QHD and 4K: 16 GB GDDR7 and performance headroom for years.'
  },
  {
    id: 7, category: 'gpu', brand: 'AMD', rating: 4.8, votes: 141,
    image: 'images/products/p7_9070xt.jpg',
    name: 'Видеокарта AMD Radeon RX 9070 XT 16 ГБ', nameEn: 'AMD Radeon RX 9070 XT 16 GB Graphics Card',
    price: 99990, badge: 'fast',
    specs: { 'Архитектура': 'RDNA 4', 'Видеопамять': '16 ГБ GDDR6', 'FSR': '4, с апскейлом ML', 'Рекомендуемый БП': '750 Вт' },
    short: 'Главный конкурент в QHD: 16 ГБ памяти, аппаратная трассировка и честная цена за кадр.',
    shortEn: 'The main QHD contender: 16 GB of VRAM, hardware ray tracing and honest price per frame.'
  },
  {
    id: 8, category: 'ram', brand: 'Kingston', rating: 4.8, votes: 117,
    image: 'images/products/p8_fury.jpg',
    name: 'Память Kingston FURY Beast 32 ГБ DDR5-6000', nameEn: 'Kingston FURY Beast 32 GB DDR5-6000 Memory Kit',
    price: 12990, badge: 'popular',
    specs: { 'Объём': '32 ГБ (2 x 16 ГБ)', 'Тип': 'DDR5', 'Частота': '6000 МГц', 'Профили': 'AMD EXPO / Intel XMP 3.0' },
    short: 'Золотой стандарт для AM5: 6000 МГц с низкими таймингами для Ryzen 9000.',
    shortEn: 'The gold standard for AM5: 6000 MHz with tight timings for Ryzen 9000.'
  },
  {
    id: 9, category: 'ram', brand: 'ADATA', rating: 4.9, votes: 54,
    image: 'images/products/p9_lancer.jpg',
    name: 'Память ADATA XPG Lancer 16 ГБ DDR5-6000', nameEn: 'ADATA XPG Lancer 16 GB DDR5-6000 Memory Kit',
    price: 6490, badge: null,
    specs: { 'Объём': '16 ГБ (2 x 8 ГБ)', 'Тип': 'DDR5', 'Частота': '6000 МГц', 'Профили': 'AMD EXPO' },
    short: 'Компактный комплект DDR5-6000 для стартовой сборки — быстрый запуск игр и программ.',
    shortEn: 'A compact DDR5-6000 kit for a starter build — fast loading of games and apps.'
  },
  {
    id: 10, category: 'storage', brand: 'Samsung', rating: 4.9, votes: 205,
    image: 'images/products/p10_9100pro.jpg',
    name: 'SSD Samsung 9100 PRO 1 ТБ PCIe 5.0', nameEn: 'Samsung 9100 PRO 1 TB PCIe 5.0 SSD',
    price: 27990, badge: 'fast',
    specs: { 'Интерфейс': 'PCIe 5.0 x4', 'Объём': '1 ТБ', 'Чтение / запись': '14 800 / 13 400 МБ/с', 'Ресурс': '600 ТБ' },
    short: 'Флагманский Gen5-накопитель: 14,8 ГБ/с на чтение — мгновенная загрузка системы и игр.',
    shortEn: 'A flagship Gen5 drive: 14.8 GB/s reads — instant boot and game loading.'
  },
  {
    id: 11, category: 'storage', brand: 'Kingston', rating: 4.6, votes: 118,
    image: 'images/products/p11_nv3.jpg',
    name: 'SSD Kingston NV3 2 ТБ PCIe 4.0', nameEn: 'Kingston NV3 2 TB PCIe 4.0 SSD',
    price: 9290, oldPrice: 10990, badge: 'discount',
    specs: { 'Интерфейс': 'PCIe 4.0 x4', 'Объём': '2 ТБ', 'Чтение / запись': '6000 / 5000 МБ/с', 'Ресурс': '640 ТБ' },
    short: 'Гигабайты под библиотеку игр и рабочих проектов по цене медиа-диапазона.',
    shortEn: 'Gigabytes for a game library and work projects at a mid-range price.'
  },
  {
    id: 12, category: 'motherboard', brand: 'MSI', rating: 4.8, votes: 93,
    image: 'images/products/p12_b850.webp',
    name: 'Материнская плата MSI B850 Gaming Plus WiFi', nameEn: 'MSI B850 Gaming Plus WiFi Motherboard',
    price: 22690, badge: null,
    specs: { 'Сокет': 'AM5', 'Память': '4 x DDR5', 'M.2': '3 слота, Gen5 для видеокарты', 'Сеть': 'Wi-Fi 7 + 2.5 Гбит/с' },
    short: 'Основа AM5: PCIe 5.0, быстрая сеть и радиаторы на все M.2 без переплаты за топ-чипсет.',
    shortEn: 'The AM5 foundation: PCIe 5.0, fast networking and heatsinks on every M.2 slot.'
  },
  {
    id: 13, category: 'motherboard', brand: 'MSI', rating: 4.7, votes: 48,
    image: 'images/products/p13_b860m.webp',
    name: 'Материнская плата MSI PRO B860M-A WiFi', nameEn: 'MSI PRO B860M-A WiFi Motherboard',
    price: 16990, badge: null,
    specs: { 'Сокет': 'LGA 1851', 'Память': '4 x DDR5', 'M.2': '3 слота PCIe 4.0', 'Сеть': 'Wi-Fi + 2.5 Гбит/с' },
    short: 'Рабочая лошадка для Core Ultra: запас слотов и стабильность для 14-ядерных процессоров.',
    shortEn: 'A workhorse for Core Ultra: spare slots and stability for 14-core CPUs.'
  },
  {
    id: 14, category: 'psu', brand: 'be quiet!', rating: 4.9, votes: 145,
    image: 'images/products/p14_purepower.jpg',
    name: 'Блок питания be quiet! Pure Power 12 M 850 Вт ATX 3.1', nameEn: 'be quiet! Pure Power 12 M 850 W ATX 3.1 PSU',
    price: 11990, badge: 'popular',
    specs: { 'Мощность': '850 Вт', 'Сертификат': '80 PLUS Gold', 'Кабели': 'полностью модульные', 'Гарантия': '5 лет' },
    short: 'Немецкая тишина, ATX 3.1 и честные 850 Вт для любой сборки на RTX 50.',
    shortEn: 'German silence, ATX 3.1 and honest 850 watts for any RTX 50 build.'
  },
  {
    id: 15, category: 'psu', brand: 'DeepCool', rating: 4.8, votes: 69,
    image: 'images/products/p15_pq850m.webp',
    name: 'Блок питания DeepCool PQ850M 850 Вт ATX 3.1', nameEn: 'DeepCool PQ850M 850 W ATX 3.1 PSU',
    price: 10990, badge: null,
    specs: { 'Мощность': '850 Вт', 'Сертификат': '80 PLUS Gold', 'Кабели': 'модульные', 'Гарантия': '10 лет' },
    short: 'Десять лет гарантии и коннектор 12V-2x6 для видеокарт поколения RTX 50.',
    shortEn: 'Ten years of warranty and a 12V-2x6 connector for RTX 50 generation GPUs.'
  },
  {
    id: 16, category: 'case', brand: 'DeepCool', rating: 4.8, votes: 152,
    image: 'images/products/p16_ch510.jpg',
    name: 'Корпус DeepCool CH510 Mesh', nameEn: 'DeepCool CH510 Mesh Case',
    price: 7490, badge: 'fast',
    specs: { 'Форм-фактор': 'Mid-Tower, E-ATX', 'Вентиляторы': 'в комплекте 1 x 140 мм', 'Панель': 'сетчатая передняя', 'Охлаждение СЖО': 'до 360 мм' },
    short: 'Отличный продув: сетчатая лицевая панель и место под СЖО на 360 мм.',
    shortEn: 'Great airflow: a mesh front panel and room for a 360 mm AIO.'
  },
  {
    id: 17, category: 'case', brand: 'Lian Li', rating: 4.9, votes: 198,
    image: 'images/products/p17_lancool.jpg',
    name: 'Корпус Lian Li Lancool 216', nameEn: 'Lian Li Lancool 216 Case',
    price: 10990, badge: 'popular',
    specs: { 'Форм-фактор': 'Mid-Tower, E-ATX', 'Вентиляторы': '2 x 160 мм в комплекте', 'Панель': 'сетчатая + стекло', 'Охлаждение СЖО': 'до 360 мм' },
    short: 'Эталонный воздушный продув и премиальные материалы за адекватные деньги.',
    shortEn: 'Benchmark airflow and premium materials for reasonable money.'
  },
  {
    id: 18, category: 'build', brand: 'ЖЕЛЕЗО.МАРКЕТ', rating: 4.9, votes: 26,
    image: 'images/products/p18_start.jpg',
    name: 'Сборка «Старт»', nameEn: '"Starter" PC Build',
    price: 114990, badge: 'popular',
    specs: { 'Процессор': 'Ryzen 5 9600X', 'Видеокарта': 'RTX 5060 8 ГБ', 'Память': '32 ГБ DDR5-6000', 'Накопитель': 'SSD 1 ТБ NVMe' },
    short: 'Стартовая сборка поколения Blackwell: высокие настройки в Full HD в любых сетевых играх.',
    shortEn: 'A starter Blackwell build: high settings in Full HD in any online game.'
  },
  {
    id: 19, category: 'build', brand: 'ЖЕЛЕЗО.МАРКЕТ', rating: 4.8, votes: 12,
    image: 'images/products/p19_optima.jpg',
    name: 'Сборка «Оптима»', nameEn: '"Optima" PC Build',
    price: 229990, oldPrice: 319990, badge: 'discount',
    specs: { 'Процессор': 'Ryzen 7 9800X3D', 'Видеокарта': 'RTX 5070', 'Память': '32 ГБ DDR5-6000', 'Накопитель': 'Samsung 9100 Pro 1 ТБ' },
    short: 'Игровой оптимум: 9800X3D плюс RTX 5070 — максимум FPS в QHD и запас на несколько лет.',
    shortEn: 'The gaming sweet spot: 9800X3D plus RTX 5070 — maximum QHD FPS with years of headroom.'
  },
  {
    id: 20, category: 'build', brand: 'ЖЕЛЕЗО.МАРКЕТ', rating: 5.0, votes: 8,
    image: 'images/products/p20_extreme.jpg',
    name: 'Сборка «Экстрим»', nameEn: '"Extreme" PC Build',
    price: 389990, oldPrice: 409990, badge: 'discount',
    specs: { 'Процессор': 'Ryzen 7 9800X3D', 'Видеокарта': 'RTX 5080', 'Память': '64 ГБ DDR5-6000', 'Накопитель': 'SSD 2 ТБ PCIe 5.0' },
    short: 'Флагманская сборка для 4K-гейминга, стримов и монтажа без компромиссов.',
    shortEn: 'A flagship build for 4K gaming, streaming and editing without compromises.'
  }
];

// ===================== Язык =====================

const LANG = {
  value: localStorage.getItem('lang') || 'ru'
};

const I18N = {
  ru: {
    'topbar.city': 'Москва · доставка по всей России',
    'topbar.hours': 'Пн-Сб: 10:00-20:00 · Вс: 11:00-17:00',
    'nav.home': 'Главная', 'nav.catalog': 'Каталог', 'nav.reviews': 'Отзывы',
    'nav.about': 'О нас', 'nav.contacts': 'Контакты', 'nav.account': 'Кабинет',
    'header.cta': 'Собрать ПК', 'header.ctaShort': 'Заказать',
    'footer.slogan': 'Магазин комплектующих и готовых сборок ПК. Честные цены, тест каждой сборки под нагрузкой, гарантия до 3 лет.',
    'footer.nav': 'Разделы', 'footer.contacts': 'Контакты',
    'footer.hours': 'Пн-Сб: 10:00-20:00 · Вс: 11:00-17:00',
    'footer.copyright': '© 2026 ЖЕЛЕЗО.МАРКЕТ. Все права защищены.',
    'scrolltop': 'Наверх',
    'dialog.title': 'Оформление заказа',
    'dialog.note': 'Оставьте контакты — перезвоним в течение 15 минут в рабочее время и подтвердим заказ.',
    'dialog.product': 'Товар', 'dialog.name': 'Имя', 'dialog.phone': 'Телефон',
    'dialog.email': 'E-mail', 'dialog.delivery': 'Доставка',
    'dialog.comment': 'Комментарий', 'dialog.submit': 'Отправить заказ', 'dialog.cancel': 'Закрыть',
    'dialog.success': 'Заказ принят! Перезвоним в течение 15 минут в рабочее время.',
    'dialog.error': 'Проверьте правильность заполнения полей формы.',
    'dialog.agreement': 'Я согласен на обработку персональных данных',
    'tip.methodHint': 'Формат: +7 (900) 000-00-00',
    'catalog.title': 'Каталог товаров',
    'catalog.hint': 'Комплектующие и сборки в наличии. Нажмите «Заказать», чтобы оформить покупку.',
    'catalog.searchPlaceholder': 'Поиск по каталогу…',
    'filters.toggle': 'Фильтры', 'filters.category': 'Категория', 'filters.price': 'Стоимость',
    'filters.any': 'Любая', 'filters.reset': 'Сбросить фильтры',
    'filters.p1': 'До 20 000 ₽', 'filters.p2': '20 000 - 100 000 ₽', 'filters.p3': 'Больше 100 000 ₽',
    'filters.sortDefault': 'Сначала популярные', 'filters.sortPriceAsc': 'Сначала дешевле',
    'filters.sortPriceDesc': 'Сначала дороже', 'filters.sortRating': 'По рейтингу',
    'result.prefix': 'Показано: ', 'result.infix': ' из ',
    'product.order': 'Заказать', 'product.more': 'Подробнее',
    'product.back': 'Вернуться в каталог',
    'specs.title': '// Характеристики',
    'similar.title': 'Похожие товары', 'similar.titleBuild': 'Другие сборки',
    'similar.eyebrow': 'Смотрите также', 'similar.note': 'Подберём совместимые комплектующие — просто оставьте заявку.'
  },
  en: {
    'topbar.city': 'Moscow · delivery across Russia',
    'topbar.hours': 'Mo-Sa: 10:00-20:00 · Su: 11:00-17:00',
    'nav.home': 'Home', 'nav.catalog': 'Catalog', 'nav.reviews': 'Reviews',
    'nav.about': 'About', 'nav.contacts': 'Contacts', 'nav.account': 'Account',
    'header.cta': 'Build a PC', 'header.ctaShort': 'Order',
    'footer.slogan': 'A shop for PC parts and pre-built systems. Fair prices, stress-tested builds, up to 3 years of warranty.',
    'footer.nav': 'Sections', 'footer.contacts': 'Contacts',
    'footer.hours': 'Mo-Sa: 10:00-20:00 · Su: 11:00-17:00',
    'footer.copyright': '© 2026 ZHELEZO.MARKET. All rights reserved.',
    'scrolltop': 'Back to top',
    'dialog.title': 'Place an order',
    'dialog.note': 'Leave your contacts — we will call back within 15 minutes during business hours to confirm.',
    'dialog.product': 'Product', 'dialog.name': 'Name', 'dialog.phone': 'Phone',
    'dialog.email': 'E-mail', 'dialog.delivery': 'Delivery',
    'dialog.comment': 'Comment', 'dialog.submit': 'Send order', 'dialog.cancel': 'Close',
    'dialog.success': 'Order accepted! We will call back within 15 minutes during business hours.',
    'dialog.error': 'Please check the form fields.',
    'dialog.agreement': 'I agree to the processing of personal data',
    'tip.methodHint': 'Format: +7 (900) 000-00-00',
    'catalog.title': 'Product catalog',
    'catalog.hint': 'Parts and builds in stock. Click "Order" to place a purchase.',
    'catalog.searchPlaceholder': 'Search the catalog…',
    'filters.toggle': 'Filters', 'filters.category': 'Category', 'filters.price': 'Price',
    'filters.any': 'Any', 'filters.reset': 'Reset filters',
    'filters.p1': 'Under 20,000 ₽', 'filters.p2': '20,000 - 100,000 ₽', 'filters.p3': 'Over 100,000 ₽',
    'filters.sortDefault': 'Popular first', 'filters.sortPriceAsc': 'Cheapest first',
    'filters.sortPriceDesc': 'Most expensive first', 'filters.sortRating': 'By rating',
    'result.prefix': 'Showing: ', 'result.infix': ' of ',
    'product.order': 'Order', 'product.more': 'Details',
    'product.back': 'Back to catalog',
    'specs.title': '// Specifications',
    'similar.title': 'Similar products', 'similar.titleBuild': 'Other builds',
    'similar.eyebrow': 'See also', 'similar.note': 'We will pick compatible parts — just leave a request.'
  }
};


const I18N_EXTRA = {
  ru: {
    'hero.eyebrow': 'Магазин комплектующих и сборок ПК',
    'hero.title1': 'Мощное железо.', 'hero.title2': 'Честные ', 'hero.titleAccent': 'цены.',
    'hero.text': 'Процессоры, видеокарты, память и готовые сборки с тестированием перед выдачей. Подберём конфигурацию под ваш бюджет и задачи — от рабочих станций до 4K-гейминга.',
    'hero.buttonCatalog': 'Каталог комплектующих', 'hero.buttonBuilds': 'Готовые сборки',
    'hero.note': 'Доставка по Москве — завтра. Самовывоз — через 2 часа после заказа.',
    'hero.float1': 'RTX 50 СЕРИИ В НАЛИЧИИ', 'hero.float2': 'СБОРКА БЕСПЛАТНО', 'hero.float3': 'ГАРАНТИЯ ДО 3 ЛЕТ',
    'panel.tag': '// Товар недели', 'panel.title': 'Сборка «Оптима»',
    'panel.cpu': 'Процессор', 'panel.gpu': 'Видеокарта', 'panel.ram': 'Память',
    'panel.storage': 'Накопитель', 'panel.tests': 'Тесты', 'panel.testsValue': 'стресс-тест 2 часа',
    'panel.priceNote': 'сборка и тесты включены', 'panel.order': 'Заказать',
    'cats.eyebrow': 'Каталог', 'cats.title': 'Категории товаров',
    'cats.note': 'Весь товар в наличии на складе в Москве. Отгрузка в день заказа.',
    'count.cpu': '3 товара', 'count.gpu': '4 товара', 'count.ram': '2 товара', 'count.storage': '2 товара',
    'count.motherboard': '2 товара', 'count.psu': '2 товара', 'count.case': '2 товара', 'count.build': '3 конфигурации',
    'cta.title': 'Не нашли нужную деталь?',
    'cta.text': 'Оставьте заявку — подберём комплектующие под ваш бюджет, проверим совместимость и соберём конфигурацию мечты.',
    'cta.button': 'Оставить заявку',
    'product.stock': 'В наличии на складе в Москве',
    'product.tagWarranty': 'Гарантия 3 года', 'product.tagShip': 'Отгрузка сегодня', 'product.tagReturn': 'Возврат 14 дней',
    'dialog.deliveryCourier': 'Курьером по Москве', 'dialog.deliveryPickup': 'Самовывоз', 'dialog.deliveryCdek': 'СДЭК по России',
    'reviews.eyebrow': 'Обратная связь', 'reviews.title': 'Отзывы клиентов',
    'reviews.note': 'Покупатели рассказывают о комплектующих, сборках и доставке. Каждый отзыв проходит проверку модератора.',
    'reviews.rating': '4,9 средняя оценка клиентов', 'reviews.recommend': '98% рекомендуют нас', 'reviews.builds': '8 000+ сборок и апгрейдов',
    'reviews.formTitle': 'Оставить отзыв', 'reviews.formText': 'Расскажите, как прошла покупка — это поможет другим клиентам выбрать комплектующие и сборку.',
    'reviews.ratingLabel': 'Оценка', 'reviews.nameHint': 'Введите имя (минимум 2 символа)',
    'reviews.textLabel': 'Текст отзыва', 'reviews.textPlaceholder': 'Напишите отзыв (минимум 10 символов)',
    'reviews.clear': 'Очистить', 'reviews.submit': 'Отправить отзыв',
    'reviews.success': 'Спасибо! Ваш отзыв отправлен и появится на сайте после проверки.',
    'reviews.error': 'Проверьте правильность заполнения полей формы.',
    'reviews.r5': '5 - отлично', 'reviews.r4': '4 - хорошо', 'reviews.r3': '3 - нормально', 'reviews.r2': '2 - плохо', 'reviews.r1': '1 - ужасно',
    'about.eyebrow': 'О магазине', 'about.title': 'ЖЕЛЕЗО.МАРКЕТ',
    'about.p1': '«ЖЕЛЕЗО.МАРКЕТ» — магазин комплектующих и готовых сборок ПК. Мы работаем с 2014 года: начинали с небольшого склада и апгрейдов для друзей, сегодня собираем более тысячи компьютеров в год и отправляем детали по всей России.',
    'about.p2': 'Наша главная задача — чтобы клиент получил честную конфигурацию под свои задачи и бюджет. Перед сборкой мы проверяем совместимость компонентов, во время — тестируем систему под нагрузкой, после — отдаём ПК с гарантией до 3 лет и остаёмся на связи для любых вопросов.',
    'about.p3': 'Мы не продаём «серые» комплектующие: у всего товара официальная гарантия производителя, а тестовые прогоны каждой сборки мы показываем покупателю на выдаче.',
    'about.principlesEyebrow': 'Подход', 'about.principlesTitle': 'Наши принципы работы',
    'about.pr1': 'Надёжность', 'about.pr1Text': 'Гарантия до 3 лет на сборки и комплектующие. Условия фиксируются в товарном чеке и гарантийном талоне.',
    'about.pr2': 'Прозрачность', 'about.pr2Text': 'Цена на сайте равна цене на кассе. Никаких «доплат за сборку», если акция обещает её бесплатно.',
    'about.pr3': 'Профессионализм', 'about.pr3Text': 'Инженеры с опытом от 10 лет. Проверяем совместимость, тестируем сборку и объясняем выбор простыми словами.',
    'about.pr4': 'Оперативность', 'about.pr4Text': 'Склад в Москве: самовывоз через 2 часа, доставка по городу на следующий день, отгрузка в день заказа.',
    'about.banner1': 'Мы не собираем ПК в полиэтиленовом мешке.',
    'about.banner2': 'Каждая сборка тестируется 2 часа под нагрузкой.',
    'stats.label1': 'лет на рынке', 'stats.label2': 'сборок и апгрейдов',
    'stats.label3': 'средняя оценка клиентов', 'stats.label4': 'клиентов рекомендуют нас',
    'advantages.eyebrow': 'Почему мы', 'advantages.title': 'Наши преимущества',
    'adv1': 'Гарантия до 3 лет', 'adv1Text': 'На сборки и комплектующие. Условия фиксируются в товарном чеке и гарантийном талоне.',
    'adv2': 'Доставим завтра', 'adv2Text': 'По Москве — на следующий день, самовывоз через 2 часа. Отправляем СДЭК по всей России.',
    'adv3': 'Тест перед выдачей', 'adv3Text': 'Каждая сборка проходит двухчасовые стресс-тесты процессора, памяти и видеокарты.',
    'adv4': 'Поможем выбрать', 'adv4Text': 'Консультация бесплатна: подберём совместимые комплектующие под бюджет и задачи.',
    'steps.eyebrow': 'Как заказать', 'steps.title': 'Четыре шага до мощного ПК',
    'step1': 'Заявка', 'step1Text': 'Выбираете товар в каталоге или оставляете заявку — уточняем бюджет и задачи.',
    'step2': 'Сборка и тесты', 'step2Text': 'Собираем компьютер, устанавливаем систему и проводим стресс-тесты под нагрузкой.',
    'step3': 'Доставка', 'step3Text': 'Привозим в жёсткой упаковке, подключаем и показываем результат работы.',
    'step4': 'Гарантия', 'step4Text': 'Выдаём гарантийный талон и остаёмся на связи: поддержка и апгрейд в любой момент.',
    'about.ctaTitle': 'Соберём ПК под вашу задачу',
    'about.ctaText': 'Расскажите, какие игры или программы вы запускаете — предложим конфигурацию и честно скажем, где можно сэкономить.',
    'contacts.eyebrow': 'Связь', 'contacts.title': 'Контакты',
    'contacts.note': 'Приём заказов на сайте — круглосуточно. Ответим на заявку в течение рабочего дня.',
    'contacts.address': 'Адрес', 'contacts.addressValue': 'Россия, г. Москва, проспект Вернадского, д. 78',
    'contacts.addressNote': '(пункт выдачи и склад)',
    'contacts.hours': 'Режим работы', 'contacts.hours1': 'Пн-Сб: 10:00-20:00', 'contacts.hours2': 'Вс: 11:00-17:00',
    'contacts.hours3': 'Заказы с сайта — круглосуточно',
    'contacts.phone': 'Телефон', 'contacts.phoneNote': 'консультация, заказ, статус доставки',
    'contacts.tg': 'Telegram и почта',
    'map.eyebrow': 'Как нас найти', 'map.title': 'Мы на карте',
    'map.note': '5 минут пешком от метро «Проспект Вернадского». Вход со стороны проспекта, пункт выдачи — 1 этаж.',
    'map.open': 'Открыть в Яндекс Картах', 'map.route': 'Построить маршрут',
    'feedback.title': 'Обратная связь',
    'feedback.text': 'Есть вопрос по совместимости, доставке или гарантии? Напишите нам — ответим в течение рабочего дня.',
    'feedback.name': 'Имя', 'feedback.email': 'Электронная почта',
    'feedback.message': 'Сообщение', 'feedback.messagePlaceholder': 'Введите сообщение (минимум 10 символов)',
    'feedback.clear': 'Очистить', 'feedback.submit': 'Отправить сообщение',
    'feedback.success': 'Сообщение отправлено! Ответим вам на указанную почту в течение рабочего дня.',
    'feedback.error': 'Проверьте правильность заполнения полей формы.',
    'feedback.nameHint': 'Введите имя (минимум 2 символа)',
    'feedback.emailHint': 'Введите корректный адрес электронной почты',
    'feedback.namePlaceholder': 'Введите имя', 'feedback.emailPlaceholder': 'example@mail.ru',
    'faq.eyebrow': 'FAQ', 'faq.title': 'Часто задаваемые вопросы',
    'faq.q1': 'Сколько стоит сборка ПК?',
    'faq.a1': 'Сборка, установка системы и стресс-тесты включены в стоимость любой готовой сборки из каталога. Если вы покупаете комплектующие по отдельности и хотите, чтобы мы их собрали, — сборка стоит 2 500 ₽.',
    'faq.q2': 'Какая гарантия на товары?',
    'faq.a2': 'На комплектующие действует официальная гарантия производителя (от 1 года до 5 лет в зависимости от бренда). На готовые сборки мы даём собственную гарантию до 3 лет: обслуживаем компьютер полностью, а не отдельную деталь.',
    'faq.q3': 'Как работает доставка?',
    'faq.a3': 'По Москве — курьером на следующий день (при заказе до 18:00), самовывоз готов через 2 часа. По России — СДЭК и Почта России, отправляем в день оплаты до 16:00. Сборки перевозим в жёсткой упаковке с фиксацией видеокарты.',
    'faq.q4': 'Можно ли вернуть товар?',
    'faq.a4': 'Да, в течение 14 дней при сохранении упаковки и комплектации. Комплектующие, которые требуют установки (процессоры, память), возврату не подлежат после вскрытия гарантийной пломбы — по закону о защите прав потребителей.',
    'faq.q5': 'Поможете подобрать комплектующие под бюджет?',
    'faq.a5': 'Да, консультация бесплатна. Напишите в Telegram или оставьте заявку на сайте: укажите бюджет, разрешение монитора и список игр или программ — предложим 2-3 конфигурации и честно объясним разницу.',
    'account.title': 'Личный кабинет', 'account.eyebrow': 'Кабинет',
    'account.guestTitle': 'Войти в кабинет',
    'account.guestText': 'Введите имя и телефон, использованные при заказе — покажем статусы ваших заказов.',
    'account.logout': 'Выйти', 'account.myOrders': 'Мои заказы',
    'account.profile': 'Профиль', 'account.phone': 'Телефон', 'account.name': 'Имя',
    'account.ordersEmptyTitle': 'Заказов пока нет',
    'account.ordersEmptyText': 'Оставьте заявку в каталоге — заказ появится здесь со статусом отслеживания.',
    'account.namePlaceholder': 'Введите имя', 'account.phonePlaceholder': '+7 (900) 000-00-00',
    'account.login': 'Войти'
  },
  en: {
    'hero.eyebrow': 'PC parts and pre-built systems store',
    'hero.title1': 'Serious hardware.', 'hero.title2': 'Honest ', 'hero.titleAccent': 'prices.',
    'hero.text': 'CPUs, graphics cards, memory and pre-built systems tested before handover. We will match a configuration to your budget and tasks — from workstations to 4K gaming.',
    'hero.buttonCatalog': 'Parts catalog', 'hero.buttonBuilds': 'Pre-built PCs',
    'hero.note': 'Moscow delivery tomorrow. Pickup in 2 hours after ordering.',
    'hero.float1': 'RTX 50 SERIES IN STOCK', 'hero.float2': 'FREE ASSEMBLY', 'hero.float3': 'UP TO 3 YEARS WARRANTY',
    'panel.tag': '// Deal of the week', 'panel.title': '"Optima" PC Build',
    'panel.cpu': 'CPU', 'panel.gpu': 'GPU', 'panel.ram': 'Memory',
    'panel.storage': 'Storage', 'panel.tests': 'Testing', 'panel.testsValue': '2-hour stress test',
    'panel.priceNote': 'assembly and testing included', 'panel.order': 'Order',
    'cats.eyebrow': 'Catalog', 'cats.title': 'Categories',
    'cats.note': 'Everything is in stock at our Moscow warehouse. Same-day shipping.',
    'count.cpu': '3 items', 'count.gpu': '4 items', 'count.ram': '2 items', 'count.storage': '2 items',
    'count.motherboard': '2 items', 'count.psu': '2 items', 'count.case': '2 items', 'count.build': '3 configurations',
    'cta.title': "Can't find the part you need?",
    'cta.text': 'Leave a request — we will pick parts for your budget, check compatibility and build the configuration of your dreams.',
    'cta.button': 'Leave a request',
    'product.stock': 'In stock at our Moscow warehouse',
    'product.tagWarranty': '3-year warranty', 'product.tagShip': 'Ships today', 'product.tagReturn': '14-day returns',
    'dialog.deliveryCourier': 'Courier in Moscow', 'dialog.deliveryPickup': 'Pickup', 'dialog.deliveryCdek': 'CDEK across Russia',
    'reviews.eyebrow': 'Feedback', 'reviews.title': 'Customer reviews',
    'reviews.note': 'Customers talk about parts, builds and delivery. Every review is moderated.',
    'reviews.rating': '4.9 average customer rating', 'reviews.recommend': '98% recommend us', 'reviews.builds': '8,000+ builds and upgrades',
    'reviews.formTitle': 'Leave a review', 'reviews.formText': 'Tell us how your purchase went — it helps other customers choose parts and builds.',
    'reviews.ratingLabel': 'Rating', 'reviews.nameHint': 'Enter your name (at least 2 characters)',
    'reviews.textLabel': 'Review text', 'reviews.textPlaceholder': 'Write a review (at least 10 characters)',
    'reviews.clear': 'Clear', 'reviews.submit': 'Send review',
    'reviews.success': 'Thank you! Your review is sent and will appear after moderation.',
    'reviews.error': 'Please check the form fields.',
    'reviews.r5': '5 - excellent', 'reviews.r4': '4 - good', 'reviews.r3': '3 - okay', 'reviews.r2': '2 - bad', 'reviews.r1': '1 - terrible',
    'about.eyebrow': 'About the shop', 'about.title': 'ZHELEZO.MARKET',
    'about.p1': 'ZHELEZO.MARKET is a PC parts and pre-built systems shop. We have been around since 2014: we started as a small warehouse doing upgrades for friends, and today we build more than a thousand computers a year and ship parts across Russia.',
    'about.p2': 'Our main goal is for the customer to get an honest configuration for their tasks and budget. Before assembly we check component compatibility, during assembly we stress-test the system, and afterwards we hand over the PC with up to 3 years of warranty and stay in touch.',
    'about.p3': 'We do not sell grey imports: every product carries the official manufacturer warranty, and we show the test results of every build to the buyer at handover.',
    'about.principlesEyebrow': 'Approach', 'about.principlesTitle': 'How we work',
    'about.pr1': 'Reliability', 'about.pr1Text': 'Up to 3 years of warranty on builds and parts. The terms are fixed in the receipt and warranty card.',
    'about.pr2': 'Transparency', 'about.pr2Text': 'The price on the site equals the price at the till. No surprise assembly fees when a promo promises it free.',
    'about.pr3': 'Professionalism', 'about.pr3Text': 'Engineers with 10+ years of experience. We check compatibility, stress-test builds and explain choices in plain words.',
    'about.pr4': 'Speed', 'about.pr4Text': 'Moscow warehouse: pickup in 2 hours, next-day city delivery, same-day shipping.',
    'about.banner1': 'We do not build PCs in a plastic bag.',
    'about.banner2': 'Every build is stress-tested for 2 hours.',
    'stats.label1': 'years on the market', 'stats.label2': 'builds and upgrades',
    'stats.label3': 'average customer rating', 'stats.label4': 'of customers recommend us',
    'advantages.eyebrow': 'Why us', 'advantages.title': 'Our advantages',
    'adv1': 'Up to 3 years of warranty', 'adv1Text': 'On builds and parts. The terms are fixed in the receipt and warranty card.',
    'adv2': 'Delivered tomorrow', 'adv2Text': 'Moscow — next day, pickup in 2 hours. CDEK shipping across Russia.',
    'adv3': 'Pre-handover testing', 'adv3Text': 'Every build goes through two-hour stress tests of the CPU, memory and GPU.',
    'adv4': 'We help you choose', 'adv4Text': 'Consultation is free: we will pick compatible parts for your budget and tasks.',
    'steps.eyebrow': 'How to order', 'steps.title': 'Four steps to a powerful PC',
    'step1': 'Request', 'step1Text': 'Pick a product in the catalog or leave a request — we clarify budget and tasks.',
    'step2': 'Assembly and testing', 'step2Text': 'We build the PC, install the OS and run stress tests under load.',
    'step3': 'Delivery', 'step3Text': 'We ship it in rigid packaging, plug it in and show the result.',
    'step4': 'Warranty', 'step4Text': 'You get a warranty card and we stay in touch: support and upgrades anytime.',
    'about.ctaTitle': 'We will build a PC for your task',
    'about.ctaText': 'Tell us which games or programs you run — we will suggest a configuration and honestly say where you can save.',
    'contacts.eyebrow': 'Contact', 'contacts.title': 'Contacts',
    'contacts.note': 'Orders on the site are accepted around the clock. We respond within a business day.',
    'contacts.address': 'Address', 'contacts.addressValue': 'Russia, Moscow, Vernadsky Prospekt, 78',
    'contacts.addressNote': '(pickup point and warehouse)',
    'contacts.hours': 'Business hours', 'contacts.hours1': 'Mo-Sa: 10:00-20:00', 'contacts.hours2': 'Su: 11:00-17:00',
    'contacts.hours3': 'Online orders — around the clock',
    'contacts.phone': 'Phone', 'contacts.phoneNote': 'consultation, orders, delivery status',
    'contacts.tg': 'Telegram and e-mail',
    'map.eyebrow': 'How to find us', 'map.title': 'On the map',
    'map.note': '5 minutes on foot from Prospekt Vernadskogo metro. Entrance from the avenue, pickup point on the 1st floor.',
    'map.open': 'Open in Yandex Maps', 'map.route': 'Build a route',
    'feedback.title': 'Contact us',
    'feedback.text': 'A question about compatibility, delivery or warranty? Write to us — we reply within a business day.',
    'feedback.name': 'Name', 'feedback.email': 'E-mail',
    'feedback.message': 'Message', 'feedback.messagePlaceholder': 'Enter your message (at least 10 characters)',
    'feedback.clear': 'Clear', 'feedback.submit': 'Send message',
    'feedback.success': 'Message sent! We will reply to your e-mail within a business day.',
    'feedback.error': 'Please check the form fields.',
    'feedback.nameHint': 'Enter your name (at least 2 characters)',
    'feedback.emailHint': 'Enter a valid e-mail address',
    'feedback.namePlaceholder': 'Enter your name', 'feedback.emailPlaceholder': 'example@mail.ru',
    'faq.eyebrow': 'FAQ', 'faq.title': 'Frequently asked questions',
    'faq.q1': 'How much does PC assembly cost?',
    'faq.a1': 'Assembly, OS installation and stress tests are included in the price of any pre-built system in the catalog. If you buy parts separately and want us to assemble them, it costs 2,500 ₽.',
    'faq.q2': 'What warranty do products carry?',
    'faq.a2': 'Parts carry the official manufacturer warranty (1 to 5 years depending on brand). Pre-built systems carry our own warranty of up to 3 years: we service the whole computer, not a single part.',
    'faq.q3': 'How does delivery work?',
    'faq.a3': 'Moscow — by courier the next day (for orders before 18:00), pickup ready in 2 hours. Across Russia — CDEK and Russian Post, shipped same day if paid before 16:00. Builds travel in rigid packaging with the GPU secured.',
    'faq.q4': 'Can I return a product?',
    'faq.a4': 'Yes, within 14 days if packaging and contents are intact. Parts that require installation (CPUs, memory) cannot be returned once the warranty seal is broken — per consumer protection law.',
    'faq.q5': 'Will you help me pick parts for a budget?',
    'faq.a5': 'Yes, consultation is free. Write to us on Telegram or leave a request: give your budget, monitor resolution and the games or programs you run — we will offer 2-3 configurations and honestly explain the difference.',
    'account.title': 'Account', 'account.eyebrow': 'Account',
    'account.guestTitle': 'Sign in to your account',
    'account.guestText': 'Enter the name and phone number used for the order — we will show your order status.',
    'account.logout': 'Sign out', 'account.myOrders': 'My orders',
    'account.profile': 'Profile', 'account.phone': 'Phone', 'account.name': 'Name',
    'account.ordersEmptyTitle': 'No orders yet',
    'account.ordersEmptyText': 'Leave a request in the catalog — the order will appear here with tracking status.',
    'account.namePlaceholder': 'Enter your name', 'account.phonePlaceholder': '+7 (900) 000-00-00',
    'account.login': 'Sign in'
  }
};

Object.assign(I18N.ru, I18N_EXTRA.ru);
Object.assign(I18N.en, I18N_EXTRA.en);

// ---- строки, которых не было в базовом словаре ----
Object.assign(I18N.ru, {
  'dialog.namePlaceholder': 'Введите ваше имя',
  'dialog.phoneHint': 'Формат: +7 (900) 000-00-00',
  'dialog.commentPlaceholder': 'Укажите дополнительную информацию',
  'catalog.emptyTitle': 'Ничего не найдено',
  'catalog.emptyText': 'Под выбранные фильтры не попал ни один товар. Сбросьте фильтры или оставьте заявку — найдём нужную деталь под заказ.',
  'catalog.emptyButton': 'Оставить заявку',
  'product.votesLabel': 'оценок',
  'reviews.selectRating': 'Выберите оценку'
});
Object.assign(I18N.en, {
  'dialog.namePlaceholder': 'Enter your name',
  'dialog.phoneHint': 'Format: +7 (900) 000-00-00',
  'dialog.commentPlaceholder': 'Add any extra details',
  'catalog.emptyTitle': 'Nothing found',
  'catalog.emptyText': 'No products match the selected filters. Reset the filters or leave a request — we will find the part you need.',
  'catalog.emptyButton': 'Leave a request',
  'product.votesLabel': 'ratings',
  'reviews.selectRating': 'Choose a rating'
});

Object.assign(I18N.ru, {
  'hits.eyebrow': 'Популярное',
  'hits.title': 'Хиты недели',
  'hits.note': 'Комплектующие, которые заказывают чаще всего.',
  'hits.button': 'Весь каталог',
  'builds.eyebrow': 'Сборки',
  'builds.title': 'Готовые сборки ПК',
  'builds.note': 'Собраны, протестированы и готовы к отгрузке в день заказа.',
  'builds.button': 'Все сборки в каталоге',
  'home.reviews.eyebrow': 'Отзывы',
  'home.reviews.title': 'Что говорят клиенты',
  'home.reviews.button': 'Все отзывы'
});
Object.assign(I18N.en, {
  'hits.eyebrow': 'Popular',
  'hits.title': 'Weekly highlights',
  'hits.note': 'The parts our customers order most often.',
  'hits.button': 'Open the catalog',
  'builds.eyebrow': 'Builds',
  'builds.title': 'Pre-built PCs',
  'builds.note': 'Assembled, stress-tested and ready to ship the same day.',
  'builds.button': 'See all builds in the catalog',
  'home.reviews.eyebrow': 'Reviews',
  'home.reviews.title': 'What our customers say',
  'home.reviews.button': 'All reviews'
});

const SPEC_KEYS_EN = {
  'Сокет': 'Socket', 'Ядра / потоки': 'Cores / threads', 'Частота': 'Clock', 'TDP': 'TDP',
  'Кэш 3D V-Cache': '3D V-Cache', 'Архитектура': 'Architecture', 'Видеопамять': 'VRAM',
  'DLSS': 'DLSS', 'FSR': 'FSR', 'Шина': 'Bus', 'Рекомендуемый БП': 'Recommended PSU',
  'Объём': 'Capacity', 'Тип': 'Type', 'Профили': 'Profiles', 'Интерфейс': 'Interface',
  'Чтение / запись': 'Read / write', 'Ресурс': 'Endurance', 'Память': 'Memory', 'M.2': 'M.2',
  'Сеть': 'Network', 'Мощность': 'Power', 'Сертификат': 'Certificate', 'Кабели': 'Cables',
  'Гарантия': 'Warranty', 'Форм-фактор': 'Form factor', 'Вентиляторы': 'Fans',
  'Панель': 'Panel', 'Охлаждение СЖО': 'AIO support', 'Процессор': 'CPU',
  'Видеокарта': 'GPU', 'Накопитель': 'Storage'
};

const VALUE_EN_RULES = [
  [/^до /, 'up to '], [/ГГц/, 'GHz'], [/МГц/, 'MHz'], [/\sВт\b/, ' W'],
  [/ГБ/, 'GB'], [/ТБ/, 'TB'], [/МБ\/с/, 'MB/s'], [/\sбит\b/, ' bit'],
  [/^в комплекте /, ''], [/в комплекте$/, 'included'],
  [/сетчатая передняя/, 'mesh front'], [/сетчатая \+ стекло/, 'mesh + glass'],
  [/полностью модульные/, 'fully modular'], [/^модульные$/, 'modular'],
  [/4, генерация кадров/, '4, frame generation'], [/4, с апскейлом ML/, '4, ML upscaling'],
  [/^(\d+)\s*лет$/, '$1 years'], [/Gen5 для видеокарты/, 'Gen5 for the GPU'],
  [/2 x 160 мм included/, '2 x 160 mm included']
];

const isEn = () => LANG.value === 'en';
const t = (key) => (I18N[LANG.value] && I18N[LANG.value][key]) || I18N.ru[key] || key;
const productName = (p) => isEn() && p.nameEn ? p.nameEn : p.name;
const productShort = (p) => isEn() && p.shortEn ? p.shortEn : p.short;
const categoryName = (key) => CATEGORIES[key][LANG.value];

function translateValue(value) {
  if (!isEn()) return value;
  return VALUE_EN_RULES.reduce((acc, rule) => acc.replace(rule[0], rule[1]), value);
}

const specLabel = (key) => isEn() ? (SPEC_KEYS_EN[key] || key) : key;

const TITLES = {
  ru: {
    index: 'ЖЕЛЕЗО.МАРКЕТ — комплектующие и сборки ПК',
    catalog: 'Каталог — ЖЕЛЕЗО.МАРКЕТ',
    product: 'Товар — ЖЕЛЕЗО.МАРКЕТ',
    reviews: 'Отзывы — ЖЕЛЕЗО.МАРКЕТ',
    about: 'О нас — ЖЕЛЕЗО.МАРКЕТ',
    contacts: 'Контакты — ЖЕЛЕЗО.МАРКЕТ',
    account: 'Кабинет — ЖЕЛЕЗО.МАРКЕТ'
  },
  en: {
    index: 'ZHELEZO.MARKET — PC parts and builds',
    catalog: 'Catalog — ZHELEZO.MARKET',
    product: 'Product — ZHELEZO.MARKET',
    reviews: 'Reviews — ZHELEZO.MARKET',
    about: 'About — ZHELEZO.MARKET',
    contacts: 'Contacts — ZHELEZO.MARKET',
    account: 'Account — ZHELEZO.MARKET'
  }
};

function applyI18n() {
  document.documentElement.lang = LANG.value;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    if (element.dataset.i18n) element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  // Навигация по href
  const navKeys = { 'index.html': 'nav.home', 'catalog.html': 'nav.catalog', 'reviews.html': 'nav.reviews',
    'about.html': 'nav.about', 'contacts.html': 'nav.contacts', 'account.html': 'nav.account' };
  document.querySelectorAll('.site-nav__link, .site-footer__list a[href]').forEach((link) => {
    Object.keys(navKeys).forEach((page) => {
      if (link.getAttribute('href') === page) link.textContent = t(navKeys[page]);
    });
  });
  const topItems = document.querySelectorAll('.topbar__item');
  if (topItems.length > 0) topItems[0].textContent = t('topbar.city');
  const schedule = document.querySelector('.topbar__item--schedule');
  if (schedule) schedule.textContent = t('topbar.hours');
  document.querySelectorAll('.site-header__cta').forEach((b) => {
    b.textContent = document.body.dataset.cta === 'short' ? t('header.ctaShort') : t('header.cta');
  });
  const slogan = document.querySelector('.site-footer__slogan');
  if (slogan) slogan.textContent = t('footer.slogan');
  const footContactsTitle = document.querySelector('.site-footer__contacts .site-footer__title');
  if (footContactsTitle) footContactsTitle.textContent = t('footer.contacts');
  const footNavTitle = document.querySelector('.site-footer__nav .site-footer__title');
  if (footNavTitle) footNavTitle.textContent = t('footer.nav');
  document.querySelectorAll('[data-i18n-cat]').forEach((element) => {
    element.textContent = categoryName(element.dataset.i18nCat);
  });
  const copyright = document.querySelector('.site-footer__bottom p');
  if (copyright) copyright.textContent = t('footer.copyright');
  const scrollTopButton2 = document.getElementById('scroll-top');
  if (scrollTopButton2) scrollTopButton2.setAttribute('aria-label', t('scrolltop'));
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) langToggle.textContent = LANG.value === 'ru' ? 'EN' : 'RU';
  const currencyToggle = document.getElementById('currency-toggle');
  if (currencyToggle) currencyToggle.textContent = (CURRENCIES[currencyState.value] || CURRENCIES.rub).symbol;
  const pageKey = (location.pathname.split('/').pop() || 'index.html').replace('.html', '');
  if (TITLES[LANG.value] && TITLES[LANG.value][pageKey]) document.title = TITLES[LANG.value][pageKey];
}

const LANG_STORAGE_KEY = 'lang';

function setLang(next) {
  LANG.value = next;
  localStorage.setItem(LANG_STORAGE_KEY, next);
  applyI18n();
  rerenderDynamic();
}

const langToggleButton = document.getElementById('lang-toggle');
if (langToggleButton) {
  langToggleButton.addEventListener('click', () => {
    setLang(LANG.value === 'ru' ? 'en' : 'ru');
  });
}

const currencyToggleButton = document.getElementById('currency-toggle');
if (currencyToggleButton) {
  currencyToggleButton.addEventListener('click', () => {
    const keys = Object.keys(CURRENCIES);
    const next = keys[(keys.indexOf(currencyState.value) + 1) % keys.length];
    setCurrency(next);
  });
}

LANG.value = localStorage.getItem(LANG_STORAGE_KEY) || 'ru';

// ===================== Рендер карточек =====================

const getProduct = (id) => PRODUCTS.find((product) => product.id === Number(id)) || PRODUCTS[0];
// ===================== Валюты =====================

const CURRENCIES = {
  rub: { symbol: '₽', rate: 1 },
  usd: { symbol: '$', rate: 1 / 82 },
  eur: { symbol: '€', rate: 1 / 95 }
};
const CURRENCY_KEY = 'currency';
const currencyState = { value: CURRENCIES[localStorage.getItem(CURRENCY_KEY)] ? localStorage.getItem(CURRENCY_KEY) : 'rub' };

const formatPrice = (value, currency) => {
  const key = currency || currencyState.value;
  const conf = CURRENCIES[key] || CURRENCIES.rub;
  const converted = key === 'rub' ? value : Math.round(value * conf.rate);
  return converted.toLocaleString(isEn() ? 'en-US' : 'ru-RU') + ' ' + conf.symbol;
};

function setCurrency(next) {
  if (!CURRENCIES[next]) return;
  currencyState.value = next;
  localStorage.setItem(CURRENCY_KEY, next);
  applyI18n();
  rerenderDynamic();
}

function renderHeroPrice() {
  const el = document.getElementById('hero-panel-price');
  if (!el) return;
  const product = PRODUCTS.find((p) => p.id === 19);
  if (!product) return;
  el.innerHTML = (product.oldPrice
    ? '<s class="hero__panel-old-price">' + formatPrice(product.oldPrice) + '</s> '
    : '') + formatPrice(product.price) +
    '<small data-i18n="panel.priceNote">' + t('panel.priceNote') + '</small>';
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return '★'.repeat(full) + (half ? '☆' : '') + '<span class="product-card__votes"></span>';
}

function renderBadge(product) {
  if (!product.badge) return '';
  const badge = BADGES[product.badge];
  return '<span class="badge-tag ' + badge.mod + '">' + badge.label[LANG.value] + '</span>';
}

function renderCard(product) {
  const specs = Object.values(product.specs).slice(0, 2)
    .map((value) => '<span class="product-card__spec">' + translateValue(value) + '</span>').join('');
  const discount = product.oldPrice
    ? Math.round((product.oldPrice - product.price) / product.oldPrice * 100)
    : 0;
  const discountTag = discount >= 1
    ? '<span class="product-card__discount">-' + discount + '%</span>'
    : '';
  return (
    '<article class="product-card" data-category="' + product.category + '" data-price="' + product.price + '" data-rating="' + product.rating + '" data-votes="' + product.votes + '">' +
    '<div class="product-card__image">' +
    '<div class="product-card__badges">' + renderBadge(product) + '</div>' +
    (product.image
      ? '<img class="product-card__photo" src="' + product.image + '" alt="' + productName(product) + '" loading="lazy">'
      : IMAGES[product.category]) +
    '</div>' +
    '<div class="product-card__body">' +
    '<div class="product-card__topline"><span class="product-card__brand">' + product.brand + '</span>' +
    '<span class="product-card__rating" title="' + product.rating + ' / 5">' +
    '<span class="product-card__stars" aria-hidden="true">' + renderStars(product.rating) + '</span>' +
    '<span class="product-card__rating-value">' + product.rating.toFixed(1) + '</span></span></div>' +
    '<h3 class="product-card__title"><a class="product-card__link" href="product.html?id=' + product.id + '">' + productName(product) + '</a></h3>' +
    '<div class="product-card__specs">' + specs + '</div>' +
    '<div class="product-card__meta">' +
    '<span class="product-card__price">' + formatPrice(product.price) + '</span>' + discountTag +
    '</div>' +
    '<div class="product-card__actions">' +
    '<a class="button button--sm" href="product.html?id=' + product.id + '">' + t('product.more') + '</a>' +
    '<button class="button button--sm button--primary" type="button" data-product="' + product.id + '">' + t('product.order') + '</button>' +
    '</div>' +
    '</div>' +
    '</article>'
  );
}

function renderCards(grid, list) {
  if (!grid) return;
  grid.innerHTML = list.map(renderCard).join('');
}

// ===================== Каталог: сортировка и поиск =====================

const catalogState = { search: '', sort: 'default' };

function visibleCatalogProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return [];
  return Array.from(grid.children)
    .filter((card) => !card.classList.contains('product-card--hidden'))
    .map((card) => Number(card.dataset.productId || 0))
    .map(getProduct)
    .filter(Boolean);
}

// ===================== Фильтры каталога =====================

const filtersForm = document.getElementById('filters-form');
const filtersResult = document.getElementById('filters-result');
const catalogEmpty = document.getElementById('catalog-empty');
const catalogSearch = document.getElementById('catalog-search');
const catalogSort = document.getElementById('catalog-sort');
const catalogGrid = document.getElementById('products-grid');
const PRICE_FILTERS = {
  any: () => true,
  p1: (price) => price < 20000,
  p2: (price) => price >= 20000 && price <= 100000,
  p3: (price) => price > 100000
};

function applyCatalogView() {
  if (!catalogGrid) return;

  let list = catalogGrid.querySelectorAll('.product-card');
  const prices = { };
  PRODUCTS.forEach((p) => { prices[p.id] = p; });

  const cards = Array.from(list);
  cards.forEach((card) => {
    card.classList.remove('product-card--hidden');
    card.style.display = '';
  });

  // фильтрация
  const categories = filtersForm
    ? Array.from(filtersForm.querySelectorAll('input[name="category"]:checked')).map((i) => i.value)
    : [];
  const priceInput = filtersForm ? filtersForm.querySelector('input[name="price"]:checked') : null;
  const priceFn = PRICE_FILTERS[priceInput ? priceInput.value : 'any'];
  const query = catalogState.search.trim().toLowerCase();

  let visible = 0;
  cards.forEach((card) => {
    const product = prices[Number(card.dataset.productId)];
    const categoryOk = categories.length === 0 || categories.includes(card.dataset.category);
    const priceOk = priceFn(Number(card.dataset.price));
    let searchOk = true;
    if (query && product) {
      const haystack = (product.name + ' ' + product.nameEn + ' ' + product.brand + ' ' +
        Object.entries(product.specs).map((e) => e[0] + ' ' + e[1]).join(' ')).toLowerCase();
      searchOk = haystack.includes(query);
    }
    const visibleNow = categoryOk && priceOk && searchOk;
    card.classList.toggle('product-card--hidden', !visibleNow);
    if (!visibleNow) card.style.display = 'none';
    if (visibleNow) visible += 1;
  });

  // сортировка видимых
  const visibleCards = cards.filter((c) => !c.classList.contains('product-card--hidden'));
  visibleCards.sort((a, b) => {
    const pa = prices[Number(a.dataset.productId)];
    const pb = prices[Number(b.dataset.productId)];
    const rank = (p) => (p.badge === 'popular' ? 0 : p.badge === 'fast' ? 1 : 2);
    switch (catalogState.sort) {
      case 'priceAsc': return pa.price - pb.price;
      case 'priceDesc': return pb.price - pa.price;
      case 'rating': return pb.rating - pa.rating;
      default: return rank(pa) - rank(pb);
    }
  });
  visibleCards.forEach((card) => catalogGrid.appendChild(card));

  if (filtersResult) {
    filtersResult.innerHTML = t('result.prefix') + '<strong>' + visible + '</strong>' +
      t('result.infix') + PRODUCTS.length;
  }
  if (catalogEmpty) {
    catalogEmpty.classList.toggle('catalog-empty--visible', visible === 0);
  }
}

// каталог передаёт id товара карточкам для поиска/сортировки
function decorateGrid() {
  if (!catalogGrid) return;
  Array.from(catalogGrid.children).forEach((card, index) => {
    const product = PRODUCTS[index];
    if (product) {
      card.dataset.productId = product.id;
      card.dataset.rating = product.rating;
    }
  });
}

if (catalogGrid) {
  renderCards(catalogGrid, PRODUCTS);
  decorateGrid();
}

// Популярные на главной
const popularGrid = document.getElementById('popular-grid');
if (popularGrid) {
  renderCards(popularGrid, PRODUCTS.filter((p) => p.badge === 'popular' && p.category !== 'case').slice(0, 6));
}

// Готовые сборки на главной
const buildsGrid = document.getElementById('builds-grid');
if (buildsGrid) {
  renderCards(buildsGrid, PRODUCTS.filter((p) => p.category === 'build'));
}

// Похожие товары на странице товара
const similarGrid = document.getElementById('similar-grid');
if (similarGrid) {
  const currentId = Number(new URLSearchParams(window.location.search).get('id'));
  const current = getProduct(currentId);
  const similar = PRODUCTS.filter((p) => p.category === current.category && p.id !== current.id);
  renderCards(similarGrid, (similar.length ? similar : PRODUCTS.filter((p) => p.badge === 'popular')).slice(0, 3));
  similarGrid.querySelectorAll('.product-card').forEach((card, index) => {
    const p = (similar.length ? similar : PRODUCTS.filter((x) => x.badge === 'popular'))[index];
    if (p) card.dataset.productId = p.id;
  });
}

if (filtersForm && catalogGrid) {
  const requested = new URLSearchParams(window.location.search).get('category');
  if (requested) {
    const input = filtersForm.querySelector('input[value="' + requested + '"]');
    if (input) input.checked = true;
  }
  filtersForm.addEventListener('change', applyCatalogView);
  const resetButton = filtersForm.querySelector('[type="reset"]');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      catalogState.search = '';
      if (catalogSearch) catalogSearch.value = '';
      window.setTimeout(applyCatalogView, 0);
    });
  }
}

if (catalogSearch) {
  catalogSearch.addEventListener('input', () => {
    catalogState.search = catalogSearch.value;
    applyCatalogView();
  });
}
if (catalogSort) {
  catalogSort.addEventListener('change', () => {
    catalogState.sort = catalogSort.value;
    applyCatalogView();
  });
}

applyCatalogView();

// ===================== Страница товара =====================

const productPage = document.getElementById('product-page');

function renderProductPage(product) {
  document.title = productName(product) + (isEn() ? ' - ZHELEZO.MARKET' : ' - ЖЕЛЕЗО.МАРКЕТ');

  document.getElementById('product-breadcrumb').textContent = productName(product);
  const catName = categoryName(product.category);
  document.getElementById('product-category-link').textContent = catName;
  document.getElementById('product-category-link').setAttribute('href', 'catalog.html?category=' + product.category);
  document.getElementById('product-category-link-text').textContent =
    (isEn() ? 'Category: ' : 'Категория: ') + catName;
  document.getElementById('product-image').innerHTML = product.image
    ? '<img class="product-page__photo" src="' + product.image + '" alt="' + productName(product) + '">'
    : IMAGES[product.category];
  document.getElementById('product-badges').innerHTML = renderBadge(product);
  document.getElementById('product-title').textContent = productName(product);
  document.getElementById('product-price').textContent = formatPrice(product.price);

  const oldPriceElement = document.getElementById('product-old-price');
  oldPriceElement.textContent = product.oldPrice ? formatPrice(product.oldPrice) : '';
  oldPriceElement.hidden = !product.oldPrice;

  document.getElementById('product-short').textContent = productShort(product);
  document.getElementById('product-brand').textContent = product.brand;
  document.getElementById('product-rating-value').textContent = product.rating.toFixed(1);
  document.getElementById('product-votes').textContent = product.votes;

  const specs = document.getElementById('product-specs');
  specs.innerHTML = Object.entries(product.specs)
    .map((entry) =>
      '<div class="spec-card__item"><dt>' + specLabel(entry[0]) +
      '</dt><dd>' + translateValue(entry[1]) + '</dd></div>')
    .join('');

  const specsTitle = document.getElementById('specs-title');
  if (specsTitle) specsTitle.textContent = t('specs.title');

  const similarTitle = document.querySelector('#similar-section .section__title');
  if (similarTitle) similarTitle.textContent = t(product.category === 'build' ? 'similar.titleBuild' : 'similar.title');

  const orderButton = document.getElementById('product-order-button');
  if (orderButton) orderButton.dataset.product = String(product.id);
}

if (productPage) {
  const requestedId = new URLSearchParams(window.location.search).get('id');
  const product = getProduct(requestedId);
  productPage.dataset.category = product.category;
  renderProductPage(product);
}

// ===================== Диалог заказа =====================

const orderDialog = document.getElementById('order-dialog');
const orderForm = document.getElementById('order-form');
const orderProductInput = document.getElementById('order-product');

function fillOrderSelect() {
  if (!orderProductInput || !orderProductInput.options.length) {
    if (orderProductInput) {
      orderProductInput.innerHTML = PRODUCTS
        .map((product) => '<option value="' + product.id + '">' + productName(product) + ' - ' + formatPrice(product.price) + '</option>')
        .join('');
    }
  }
}
fillOrderSelect();

function openOrderDialog(productId) {
  if (!orderDialog) return;
  if (productId && orderProductInput) {
    orderProductInput.value = String(productId);
  } else if (orderProductInput) {
    orderProductInput.selectedIndex = 0;
  }
  orderDialog.showModal();
}

function closeOrderDialog() {
  if (orderDialog) orderDialog.close();
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-product]');
  if (button) {
    openOrderDialog(button.dataset.product || null);
  }
});

document.querySelectorAll('#order-close, #order-cancel').forEach((button) => {
  button.addEventListener('click', closeOrderDialog);
});

if (orderDialog) {
  orderDialog.addEventListener('click', (event) => {
    if (event.target === orderDialog) closeOrderDialog();
  });
}

// ===================== Профиль и заказы (localStorage) =====================

const PROFILE_KEY = 'zm_profile';
const ORDERS_KEY = 'zm_orders';

function readProfile() {
  try { return JSON.parse(localStorage.getItem(PROFILE_KEY)); } catch (e) { return null; }
}

function readOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; } catch (e) { return []; }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

const ORDER_STAGES = {
  ru: ['Заказ принят', 'Комплектация', 'В пути', 'Готов к выдаче'],
  en: ['Order received', 'Packing', 'In transit', 'Ready for pickup']
};

// Демо-отслеживание: статус растет со временем (минуты)
function orderStage(order) {
  const minutes = (Date.now() - order.created) / 60000;
  if (minutes < 1) return 0;
  if (minutes < 5) return 1;
  if (minutes < 15) return 2;
  return 3;
}

function renderAccount() {
  const guestCard = document.getElementById('account-guest');
  const userCard = document.getElementById('account-user');
  if (!guestCard || !userCard) return;

  const profile = readProfile();
  guestCard.hidden = Boolean(profile);
  userCard.hidden = !profile;

  if (!profile) return;

  document.getElementById('account-name').textContent = profile.name;
  document.getElementById('account-phone').textContent = profile.phone;

  const orders = readOrders().filter((order) => order.phone === profile.phone)
    .sort((a, b) => b.created - a.created);
  const ordersList = document.getElementById('orders-list');
  const ordersEmpty = document.getElementById('orders-empty');

  if (ordersList) {
    ordersList.innerHTML = orders.map((order) => {
      const product = getProduct(order.productId);
      const stage = orderStage(order);
      const stages = ORDER_STAGES[LANG.value];
      const steps = stages.map((label, index) =>
        '<li class="order-step' + (index <= stage ? ' order-step--done' : '') + '">' +
        (index < stage ? '<span class="order-step__check">✓</span>' : '<span class="order-step__dot"></span>') +
        '<span class="order-step__label">' + label + '</span></li>'
      ).join('');
      return (
        '<article class="order-card">' +
        '<div class="order-card__head">' +
        '<p class="order-card__num">' + order.num + '</p>' +
        '<p class="order-card__date">' + new Date(order.created).toLocaleString(isEn() ? 'en-GB' : 'ru-RU') + '</p>' +
        '</div>' +
        '<h3 class="order-card__title">' + (product ? productName(product) : order.productName) + '</h3>' +
        '<ol class="order-steps">' + steps + '</ol>' +
        '<p class="order-card__status">' + stages[stage] + (stage < 3 ? ' <span class="order-card__demo">' +
        (isEn() ? '(demo statuses update over time)' : '(демо: статусы обновляются со временем)') + '</span>' : '') + '</p>' +
        '</article>'
      );
    }).join('');
  }
  if (ordersEmpty) ordersEmpty.classList.toggle('orders-empty--visible', orders.length === 0);
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('login-name').value.trim();
    const phone = document.getElementById('login-phone').value.trim();
    if (!name || !phone) return;
    localStorage.setItem(PROFILE_KEY, JSON.stringify({ name, phone }));
    renderAccount();
  });
}

const logoutButton = document.getElementById('account-logout');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem(PROFILE_KEY);
    renderAccount();
  });
}

renderAccount();

// ===================== Маска телефона =====================

function maskPhoneInput(input) {
  if (!input) return;
  input.addEventListener('input', () => {
    let digits = input.value.replace(/\D/g, '');
    if (digits.startsWith('8')) digits = '7' + digits.slice(1);
    if (digits && digits[0] !== '7') digits = '7' + digits;
    digits = digits.slice(0, 11);
    let value = '+7';
    if (digits.length > 1) value += ' (' + digits.slice(1, 4);
    if (digits.length >= 5) value += ') ' + digits.slice(4, 7);
    if (digits.length >= 8) value += '-' + digits.slice(7, 9);
    if (digits.length >= 10) value += '-' + digits.slice(9, 11);
    input.value = digits.length <= 1 ? (digits.length === 1 ? '+7' : '') : value;
    input.setCustomValidity('');
  });
}

maskPhoneInput(document.getElementById('order-phone'));
maskPhoneInput(document.getElementById('login-phone'));

// ===================== Проверка форм =====================

document.querySelectorAll('form[data-validate]').forEach((form) => {
  const successMessage = form.querySelector('.form-message--success');
  const errorMessage = form.querySelector('.form-message--error');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const elements = Array.from(form.elements);

    elements.forEach((element) => {
      if (element.willValidate) element.removeAttribute('aria-invalid');
    });

    const phoneField = form.querySelector('input[name="phone"]');
    if (phoneField) {
      const digits = phoneField.value.replace(/\D/g, '');
      phoneField.setCustomValidity(
        digits.length === 11
          ? ''
          : (isEn() ? 'Enter a valid phone number: +7 (900) 000-00-00' : 'Введите корректный телефон: +7 (900) 000-00-00')
      );
    }

    if (!form.checkValidity()) {
      elements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      form.reportValidity();
      if (errorMessage) errorMessage.hidden = false;
      if (successMessage) successMessage.hidden = true;
      return;
    }

    if (errorMessage) errorMessage.hidden = true;

    // Сохранение заказа из диалога
    if (form.id === 'order-form') {
      const orders = readOrders();
      const name = document.getElementById('order-name').value.trim();
      const phone = document.getElementById('order-phone').value.trim();
      orders.push({
        num: 'ZM-' + Date.now().toString(36).toUpperCase(),
        productId: Number(orderProductInput.value),
        productName: orderProductInput.options[orderProductInput.selectedIndex].text,
        name,
        phone,
        email: document.getElementById('order-email').value.trim(),
        delivery: document.getElementById('order-delivery').value,
        comment: document.getElementById('order-comment').value,
        created: Date.now()
      });
      saveOrders(orders);
      localStorage.setItem(PROFILE_KEY, JSON.stringify({ name, phone }));
    }

    form.reset();
    if (successMessage) {
      successMessage.hidden = false;
      successMessage.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    renderAccount();
  });
});

// ===================== Динамический контент при смене языка =====================

let lastRenderedProductId = null;

function rerenderDynamic() {
  // заполняем select заново (имена на новом языке)
  if (orderProductInput) {
    const selected = orderProductInput.value;
    orderProductInput.innerHTML = PRODUCTS
      .map((product) => '<option value="' + product.id + '">' + productName(product) + ' - ' + formatPrice(product.price) + '</option>')
      .join('');
    orderProductInput.value = selected || String(PRODUCTS[0].id);
  }
  if (catalogGrid) {
    renderCards(catalogGrid, PRODUCTS);
    decorateGrid();
    applyCatalogView();
  }
  if (popularGrid) {
    renderCards(popularGrid, PRODUCTS.filter((p) => p.badge === 'popular' && p.category !== 'case').slice(0, 6));
  }
  if (buildsGrid) {
    renderCards(buildsGrid, PRODUCTS.filter((p) => p.category === 'build'));
  }
  if (similarGrid) {
    const currentId = Number(new URLSearchParams(window.location.search).get('id'));
    const current = getProduct(currentId);
    const similar = PRODUCTS.filter((p) => p.category === current.category && p.id !== current.id);
    const source = similar.length ? similar : PRODUCTS.filter((p) => p.badge === 'popular');
    renderCards(similarGrid, source.slice(0, 3));
    similarGrid.querySelectorAll('.product-card').forEach((card, index) => { if (source[index]) card.dataset.productId = source[index].id; });
    const similarTitle = document.querySelector('#similar-section .section__title');
    if (similarTitle) similarTitle.textContent = t(current.category === 'build' ? 'similar.titleBuild' : 'similar.title');
  }
  observeRevealCards();
  if (productPage) {
    const requestedId = new URLSearchParams(window.location.search).get('id');
    renderProductPage(getProduct(requestedId));
  }
  observeRevealCards();
  const filtersTitle = document.querySelector('#filters-form .filters__title');
  renderAccount();
  renderHeroPrice();
}

// ===================== Тема =====================

const themeToggleButton = document.getElementById('theme-toggle');
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', () => {
    const root = document.documentElement;
    const nextTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    const applyTheme = () => {
      root.classList.add('theme-transition');
      window.clearTimeout(window.__themeTimer);
      window.__themeTimer = window.setTimeout(() => root.classList.remove('theme-transition'), 500);
      root.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
    };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !reducedMotion) {
      document.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
  });
}

// ===================== Фильтры каталога (мобильные) =====================

const filtersToggleButton = document.getElementById('filters-toggle');

if (filtersToggleButton) {
  filtersToggleButton.addEventListener('click', () => {
    const isOpen = document.documentElement.classList.toggle('filters-open');
    filtersToggleButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// ===================== Кнопка «наверх» и год =====================

const scrollTopButton = document.getElementById('scroll-top');

const scrollProgressBar = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  if (scrollProgressBar) scrollProgressBar.style.transform = 'scaleX(' + ratio + ')';
  if (scrollTopButton) {
    scrollTopButton.classList.toggle('scroll-top--visible', window.scrollY > 500);
  }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

if (scrollTopButton) {
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const yearElement = document.getElementById('footer-year');
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

// ===================== Появление секций =====================

const revealSections = document.querySelectorAll('main section');
if (revealSections.length && 'IntersectionObserver' in window) {
  revealSections.forEach((section) => section.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealSections.forEach((section) => revealObserver.observe(section));
}

const revealCardSelector = '.product-card, .advantage-card, .info-card, .review-card, .cat-tile';
const cardObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = Array.prototype.indexOf.call(entry.target.parentNode.children, entry.target) % 4 * 70;
      entry.target.style.transitionDelay = delay + 'ms';
      entry.target.classList.add('reveal-card--visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 }) : null;

function observeRevealCards() {
  if (!cardObserver) return;
  document.querySelectorAll(revealCardSelector).forEach((card) => {
    if (!card.classList.contains('reveal-card')) {
      card.classList.add('reveal-card');
      cardObserver.observe(card);
    }
  });
}
observeRevealCards();

// ===================== Счётчик статистики =====================

const statValues = document.querySelectorAll('.stats-item__value');
if (statValues.length && 'IntersectionObserver' in window
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const parseStat = (text) => {
    const match = text.match(/^(\D*)([\d\s\u00a0]+(?:[.,]\d+)?)(.*)$/);
    if (!match) return null;
    const numberText = match[2].replace(/[\s\u00a0]/g, '');
    const separator = numberText.includes(',') ? ',' : '.';
    const decimals = (numberText.split(/[.,]/)[1] || '').length;
    return {
      prefix: match[1],
      suffix: match[3],
      target: parseFloat(numberText.replace(',', '.')),
      decimals,
      separator,
      grouped: /[\s\u00a0]/.test(match[2].trim()),
      original: text
    };
  };
  const formatStat = (stat, value) => {
    const parts = value.toFixed(stat.decimals).split('.');
    let whole = parts[0];
    if (stat.grouped) whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');
    return stat.prefix + whole + (parts[1] ? stat.separator + parts[1] : '') + stat.suffix;
  };
  const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
  const runCount = (element, stat, delay) => {
    const duration = 2000;
    let start = null;
    const step = (now) => {
      if (start === null) start = now + delay;
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      element.textContent = formatStat(stat, stat.target * easeOutExpo(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = stat.original;
      }
    };
    requestAnimationFrame(step);
  };

  const stats = new Map();
  statValues.forEach((element) => {
    const stat = parseStat(element.textContent.trim());
    if (!stat || !isFinite(stat.target)) return;
    stats.set(element, stat);
    element.setAttribute('aria-label', stat.original);
    element.textContent = formatStat(stat, 0);
  });

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const items = Array.from(entry.target.querySelectorAll('.stats-item__value'));
      items.forEach((element, index) => {
        const stat = stats.get(element);
        if (stat) runCount(element, stat, index * 150);
      });
    });
  }, { threshold: 0.35 });
  const statGroups = new Set();
  stats.forEach((_, element) => statGroups.add(element.closest('.stats__grid') || element));
  statGroups.forEach((group) => statsObserver.observe(group));
}

// ===================== Запуск i18n =====================

applyI18n();
renderHeroPrice();
