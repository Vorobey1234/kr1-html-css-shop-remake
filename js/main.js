'use strict';

// ===================== Данные =====================

const CATEGORIES = {
  cpu: 'Процессоры',
  gpu: 'Видеокарты',
  ram: 'Оперативная память',
  storage: 'Накопители',
  motherboard: 'Материнские платы',
  psu: 'Блоки питания',
  case: 'Корпуса',
  build: 'Готовые сборки'
};

const BADGES = {
  popular: { label: 'Хит', mod: 'badge-tag--popular' },
  discount: { label: 'Скидка', mod: 'badge-tag--discount' },
  fast: { label: 'В наличии', mod: 'badge-tag--fast' }
};

// Инлайн-SVG: цвет штрихов наследует color карточки
const IMAGES = {
  cpu: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 20v2" /> <path d="M12 2v2" /> <path d="M17 20v2" /> <path d="M17 2v2" /> <path d="M2 12h2" /> <path d="M2 17h2" /> <path d="M2 7h2" /> <path d="M20 12h2" /> <path d="M20 17h2" /> <path d="M20 7h2" /> <path d="M7 20v2" /> <path d="M7 2v2" /> <rect x="4" y="4" width="16" height="16" rx="2" /> <rect x="8" y="8" width="8" height="8" rx="1" /> </svg>',
  gpu: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <rect x="2" y="7" width="19" height="10" rx="2"/> <circle cx="8.2" cy="12" r="2.5"/> <path d="M8.2 10.2v3.6M6.4 12h3.6"/> <circle cx="15" cy="12" r="2.5"/> <path d="M15 10.2v3.6M13.2 12h3.6"/> <path d="M5 17v2M8.5 17v2M12 17v2M15.5 17v2M19 17v2"/></svg>',
  ram: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 12v-2" /> <path d="M12 18v-2" /> <path d="M16 12v-2" /> <path d="M16 18v-2" /> <path d="M2 11h1.5" /> <path d="M20 18v-2" /> <path d="M20.5 11H22" /> <path d="M4 18v-2" /> <path d="M8 12v-2" /> <path d="M8 18v-2" /> <rect x="2" y="6" width="20" height="10" rx="2" /> </svg>',
  storage: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M10 16h.01" /> <path d="M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /> <path d="M21.946 12.013H2.054" /> <path d="M6 16h.01" /> </svg>',
  motherboard: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="18" height="18" x="3" y="3" rx="2" /> <path d="M11 9h4a2 2 0 0 0 2-2V3" /> <circle cx="9" cy="9" r="2" /> <path d="M7 21v-4a2 2 0 0 1 2-2h4" /> <circle cx="15" cy="15" r="2" /> </svg>',
  psu: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" /> <path d="m2 22 3-3" /> <path d="M7.5 13.5 10 11" /> <path d="M10.5 16.5 13 14" /> <path d="m18 3-4 4h6l-4 4" /> </svg>',
  case: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <rect width="14" height="20" x="5" y="2" rx="2" /> <path d="M15 14h.01" /> <path d="M9 6h6" /> <path d="M9 10h6" /> </svg>',
  build: '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M12 18h6" /> <path d="M6 18h.01" /> <path d="M8 6h1" /> <rect x="2" y="14" width="20" height="8" rx="2" /> <rect x="4" y="2" width="16" height="12" rx="2" /> </svg>'
};

const PRODUCTS = [
  {
    id: 1,
    category: 'cpu',
    name: 'Процессор AMD Ryzen 5 9600X',
    price: 17990,
    badge: 'popular',
    specs: { 'Сокет': 'AM5', 'Ядра / потоки': '6 / 12', 'Частота': 'до 5.4 ГГц', 'TDP': '65 Вт' },
    short: 'Народный процессор Zen 5: 6 ядер, высокие частоты и холодный характер для любой стартовой сборки.'
  },
  {
    id: 2,
    category: 'cpu',
    name: 'Процессор Intel Core Ultra 5 245K',
    price: 19990,
    badge: 'fast',
    specs: { 'Сокет': 'LGA 1851', 'Ядра / потоки': '14 / 14 (6P + 8E)', 'Частота': 'до 5.2 ГГц', 'TDP': '125 Вт' },
    short: 'Arrow Lake для игр и работы: 14 ядер, поддержка DDR5-6400 и быстрой памяти без разгона.'
  },
  {
    id: 3,
    category: 'cpu',
    name: 'Процессор AMD Ryzen 7 9800X3D',
    price: 44990,
    badge: 'popular',
    specs: { 'Сокет': 'AM5', 'Ядра / потоки': '8 / 16', 'Частота': 'до 5.2 ГГц', 'TDP': '120 Вт', 'Кэш 3D V-Cache': '96 МБ' },
    short: 'Лучший игровой процессор поколения: 3D V-Cache под кристаллом — максимум FPS в любом сценарии.'
  },
  {
    id: 4,
    category: 'gpu',
    name: 'Видеокарта NVIDIA RTX 5060 8 ГБ GDDR7',
    price: 34990,
    badge: 'popular',
    specs: { 'Архитектура': 'Blackwell', 'Видеопамять': '8 ГБ GDDR7', 'DLSS': '4, генерация кадров', 'Рекомендуемый БП': '550 Вт' },
    short: 'Базовая карта поколения Blackwell: DLSS 4 и трассировка лучей в Full HD без компромиссов.'
  },
  {
    id: 5,
    category: 'gpu',
    name: 'Видеокарта NVIDIA RTX 5070 12 ГБ GDDR7',
    price: 104990,
    badge: null,
    specs: { 'Архитектура': 'Blackwell', 'Видеопамять': '12 ГБ GDDR7', 'Шина': '192 бит', 'Рекомендуемый БП': '650 Вт' },
    short: 'Уверенный QHD-гейминг с запасом: DLSS 4 с генерацией кадров в тяжёлых новинках.'
  },
  {
    id: 6,
    category: 'gpu',
    name: 'Видеокарта NVIDIA RTX 5080 16 ГБ GDDR7',
    price: 139990,
    badge: 'fast',
    specs: { 'Архитектура': 'Blackwell', 'Видеопамять': '16 ГБ GDDR7', 'Шина': '256 бит', 'Рекомендуемый БП': '850 Вт' },
    short: 'Сильнейшая карта под QHD и 4K: 16 ГБ GDDR7 и запас производительности на годы вперёд.'
  },
  {
    id: 7,
    category: 'gpu',
    name: 'Видеокарта AMD Radeon RX 9070 XT 16 ГБ',
    price: 99990,
    badge: 'fast',
    specs: { 'Архитектура': 'RDNA 4', 'Видеопамять': '16 ГБ GDDR6', 'FSR': '4, с апскейлом ML', 'Рекомендуемый БП': '750 Вт' },
    short: 'Главный конкурент в QHD: 16 ГБ памяти, аппаратная трассировка и честная цена за кадр.'
  },
  {
    id: 8,
    category: 'ram',
    name: 'Память Kingston FURY Beast 32 ГБ DDR5-6000',
    price: 12990,
    badge: 'popular',
    specs: { 'Объём': '32 ГБ (2 x 16 ГБ)', 'Тип': 'DDR5', 'Частота': '6000 МГц', 'Профили': 'AMD EXPO / Intel XMP 3.0' },
    short: 'Золотой стандарт для AM5: 6000 МГц с низкими таймингами для Ryzen 9000.'
  },
  {
    id: 9,
    category: 'ram',
    name: 'Память ADATA XPG Lancer 16 ГБ DDR5-6000',
    price: 6490,
    badge: null,
    specs: { 'Объём': '16 ГБ (2 x 8 ГБ)', 'Тип': 'DDR5', 'Частота': '6000 МГц', 'Профили': 'AMD EXPO' },
    short: 'Компактный комплект DDR5-6000 для стартовой сборки — быстрый запуск игр и программ.'
  },
  {
    id: 10,
    category: 'storage',
    name: 'SSD Samsung 9100 PRO 1 ТБ PCIe 5.0',
    price: 27990,
    badge: 'fast',
    specs: { 'Интерфейс': 'PCIe 5.0 x4', 'Объём': '1 ТБ', 'Чтение / запись': '14 800 / 13 400 МБ/с', 'Ресурс': '600 ТБ' },
    short: 'Флагманский Gen5-накопитель: 14,8 ГБ/с на чтение — мгновенная загрузка системы и игр.'
  },
  {
    id: 11,
    category: 'storage',
    name: 'SSD Kingston NV3 2 ТБ PCIe 4.0',
    price: 9290,
    oldPrice: 10990,
    badge: 'discount',
    specs: { 'Интерфейс': 'PCIe 4.0 x4', 'Объём': '2 ТБ', 'Чтение / запись': '6000 / 5000 МБ/с', 'Ресурс': '640 ТБ' },
    short: 'Гигабайты под библиотеку игр и рабочих проектов по цене медиа-диапазона.'
  },
  {
    id: 12,
    category: 'motherboard',
    name: 'Материнская плата MSI B850 Gaming Plus WiFi',
    price: 22690,
    badge: null,
    specs: { 'Сокет': 'AM5', 'Память': '4 x DDR5', 'M.2': '3 слота, Gen5 для видеокарты', 'Сеть': 'Wi-Fi 7 + 2.5 Гбит/с' },
    short: 'Основа AM5: PCIe 5.0, быстрая сеть и радиаторы на все M.2 без переплаты за топ-чипсет.'
  },
  {
    id: 13,
    category: 'motherboard',
    name: 'Материнская плата MSI PRO B860M-A WiFi',
    price: 16990,
    badge: null,
    specs: { 'Сокет': 'LGA 1851', 'Память': '4 x DDR5', 'M.2': '3 слота PCIe 4.0', 'Сеть': 'Wi-Fi + 2.5 Гбит/с' },
    short: 'Рабочая лошадка для Core Ultra: запас слотов и стабильность для 14-ядерных процессоров.'
  },
  {
    id: 14,
    category: 'psu',
    name: 'Блок питания be quiet! Pure Power 12 M 850 Вт ATX 3.1',
    price: 11990,
    badge: 'popular',
    specs: { 'Мощность': '850 Вт', 'Сертификат': '80 PLUS Gold', 'Кабели': 'полностью модульные', 'Гарантия': '5 лет' },
    short: 'Немецкая тишина, ATX 3.1 и честные 850 Вт для любой сборки на RTX 50.'
  },
  {
    id: 15,
    category: 'psu',
    name: 'Блок питания DeepCool PQ850M 850 Вт ATX 3.1',
    price: 10990,
    badge: null,
    specs: { 'Мощность': '850 Вт', 'Сертификат': '80 PLUS Gold', 'Кабели': 'модульные', 'Гарантия': '10 лет' },
    short: 'Десять лет гарантии и коннектор 12V-2x6 для видеокарт поколения RTX 50.'
  },
  {
    id: 16,
    category: 'case',
    name: 'Корпус DeepCool CH510 Mesh',
    price: 7490,
    badge: 'fast',
    specs: { 'Форм-фактор': 'Mid-Tower, E-ATX', 'Вентиляторы': 'в комплекте 1 x 140 мм', 'Панель': 'сетчатая передняя', 'Охлаждение СЖО': 'до 360 мм' },
    short: 'Отличный продув: сетчатая лицевая панель и место под СЖО на 360 мм.'
  },
  {
    id: 17,
    category: 'case',
    name: 'Корпус Lian Li Lancool 216',
    price: 10990,
    badge: 'popular',
    specs: { 'Форм-фактор': 'Mid-Tower, E-ATX', 'Вентиляторы': '2 x 160 мм в комплекте', 'Панель': 'сетчатая + стекло', 'Охлаждение СЖО': 'до 360 мм' },
    short: 'Эталонный воздушный продув и премиальные материалы за адекватные деньги.'
  },
  {
    id: 18,
    category: 'build',
    name: 'Сборка «Старт»',
    price: 114990,
    badge: 'popular',
    specs: { 'Процессор': 'Ryzen 5 9600X', 'Видеокарта': 'RTX 5060 8 ГБ', 'Память': '32 ГБ DDR5-6000', 'Накопитель': 'SSD 1 ТБ NVMe' },
    short: 'Стартовая сборка поколения Blackwell: высокие настройки в Full HD в любых сетевых играх.'
  },
  {
    id: 19,
    category: 'build',
    name: 'Сборка «Оптима»',
    price: 319990,
    badge: null,
    specs: { 'Процессор': 'Ryzen 7 9800X3D', 'Видеокарта': 'RTX 5070 12 ГБ', 'Память': '32 ГБ DDR5-6000', 'Накопитель': 'Samsung 9100 Pro 1 ТБ' },
    short: 'Игровой оптимум: 9800X3D плюс RTX 5070 — максимум FPS в QHD и запас на несколько лет.'
  },
  {
    id: 20,
    category: 'build',
    name: 'Сборка «Экстрим»',
    price: 389990,
    oldPrice: 409990,
    badge: 'discount',
    specs: { 'Процессор': 'Ryzen 7 9800X3D', 'Видеокарта': 'RTX 5080 16 ГБ', 'Память': '64 ГБ DDR5-6000', 'Накопитель': 'SSD 2 ТБ PCIe 5.0' },
    short: 'Флагманская сборка для 4K-гейминга, стримов и монтажа без компромиссов.'
  }
];

const getCategoryName = (key) => CATEGORIES[key] || '';
const getProduct = (id) => PRODUCTS.find((product) => product.id === Number(id)) || PRODUCTS[0];
const formatPrice = (value) => value.toLocaleString('ru-RU');

// ===================== Рендер карточек =====================

function renderBadge(product) {
  if (!product.badge) return '';
  const badge = BADGES[product.badge];
  return '<span class="badge-tag ' + badge.mod + '">' + badge.label + '</span>';
}

function renderSpec(product) {
  return '<span class="product-card__spec">' + product + '</span>';
}

function renderCard(product) {
  const specs = Object.values(product.specs).slice(0, 2).map(renderSpec).join('');
  const oldPrice = product.oldPrice
    ? '<s class="product-card__old-price">' + formatPrice(product.oldPrice) + ' ₽</s>'
    : '';
  return (
    '<article class="product-card" data-category="' + product.category + '" data-price="' + product.price + '">' +
    '<div class="product-card__image">' +
    '<div class="product-card__badges">' + renderBadge(product) + '</div>' +
    IMAGES[product.category] +
    '</div>' +
    '<div class="product-card__body">' +
    '<p class="product-card__category">' + getCategoryName(product.category) + '</p>' +
    '<h3 class="product-card__title"><a class="product-card__link" href="product.html?id=' + product.id + '">' + product.name + '</a></h3>' +
    '<div class="product-card__specs">' + specs + '</div>' +
    '<div class="product-card__meta">' +
    '<span class="product-card__price">' + formatPrice(product.price) + ' ₽</span>' + oldPrice +
    '</div>' +
    '<div class="product-card__actions">' +
    '<a class="button button--sm" href="product.html?id=' + product.id + '">Подробнее</a>' +
    '<button class="button button--sm button--primary" type="button" data-product="' + product.id + '">Заказать</button>' +
    '</div>' +
    '</div>' +
    '</article>'
  );
}

function renderCards(grid, list) {
  if (!grid) return;
  grid.innerHTML = list.map(renderCard).join('');
}

// Каталог
const catalogGrid = document.getElementById('products-grid');
if (catalogGrid) renderCards(catalogGrid, PRODUCTS);

// Похожие товары на странице товара
const similarGrid = document.getElementById('similar-grid');
if (similarGrid) {
  const currentId = Number(new URLSearchParams(window.location.search).get('id'));
  const current = getProduct(currentId);
  const similar = PRODUCTS.filter((product) => product.category === current.category && product.id !== current.id);
  renderCards(similarGrid, (similar.length ? similar : PRODUCTS.filter((product) => product.badge === 'popular')).slice(0, 3));
}

// ===================== Фильтры каталога =====================

const filtersForm = document.getElementById('filters-form');
const filtersResult = document.getElementById('filters-result');
const catalogEmpty = document.getElementById('catalog-empty');
const PRICE_FILTERS = {
  any: () => true,
  p1: (price) => price < 20000,
  p2: (price) => price >= 20000 && price <= 100000,
  p3: (price) => price > 100000
};

if (filtersForm && catalogGrid) {
  // Предвыбор категории из адреса: catalog.html?category=gpu
  const requested = new URLSearchParams(window.location.search).get('category');
  if (requested) {
    const input = filtersForm.querySelector('input[value="' + requested + '"]');
    if (input) input.checked = true;
  }

  const applyFilters = () => {
    const categories = Array.from(filtersForm.querySelectorAll('input[name="category"]:checked'))
      .map((input) => input.value);
    const priceInput = filtersForm.querySelector('input[name="price"]:checked');
    const priceFn = PRICE_FILTERS[priceInput ? priceInput.value : 'any'];
    let visibleCount = 0;

    Array.from(catalogGrid.children).forEach((card) => {
      const categoryOk = categories.length === 0 || categories.includes(card.dataset.category);
      const priceOk = priceFn(Number(card.dataset.price));
      const visible = categoryOk && priceOk;
      card.classList.toggle('product-card--hidden', !visible);
      if (visible) visibleCount += 1;
    });

    if (filtersResult) {
      filtersResult.innerHTML = 'Показано: <strong>' + visibleCount + '</strong> из ' + PRODUCTS.length;
    }
    if (catalogEmpty) {
      catalogEmpty.classList.toggle('catalog-empty--visible', visibleCount === 0);
    }
    if (catalogGrid && visibleCount === 0) {
      catalogGrid.style.display = 'none';
    } else if (catalogGrid) {
      catalogGrid.style.display = '';
    }
  };

  filtersForm.addEventListener('change', applyFilters);
  const resetButton = filtersForm.querySelector('[type="reset"]');
  if (resetButton) {
    resetButton.addEventListener('click', () => window.setTimeout(applyFilters, 0));
  }
  applyFilters();
}

// ===================== Страница товара =====================

const productPage = document.getElementById('product-page');

function renderProductPage(product, fallback) {
  const current = fallback || product;
  document.title = current.name + ' - ЖЕЛЕЗО.МАРКЕТ';

  document.getElementById('product-breadcrumb').textContent = current.name;
  document.getElementById('product-category-link').textContent = getCategoryName(current.category);
  document.getElementById('product-category-link').setAttribute('href', 'catalog.html?category=' + current.category);

  const categoryTextLink = document.getElementById('product-category-link-text');
  if (categoryTextLink) {
    categoryTextLink.textContent = 'Категория: ' + getCategoryName(current.category);
    categoryTextLink.setAttribute('href', 'catalog.html?category=' + current.category);
  }
  document.getElementById('product-image').innerHTML = IMAGES[current.category];
  document.getElementById('product-badges').innerHTML = renderBadge(current);
  document.getElementById('product-title').textContent = current.name;
  document.getElementById('product-price').textContent = formatPrice(current.price) + ' ₽';

  const oldPriceElement = document.getElementById('product-old-price');
  oldPriceElement.textContent = current.oldPrice ? formatPrice(current.oldPrice) + ' ₽' : '';
  oldPriceElement.hidden = !current.oldPrice;

  document.getElementById('product-short').textContent = current.short;

  const specs = document.getElementById('product-specs');
  specs.innerHTML = Object.entries(current.specs)
    .map((entry) => '<div class="spec-card__item"><dt>' + entry[0] + '</dt><dd>' + entry[1] + '</dd></div>')
    .join('');

  const orderButton = document.getElementById('product-order-button');
  if (orderButton) orderButton.dataset.product = String(current.id);

  const similarSection = document.getElementById('similar-section');
  if (similarSection && current.category === 'build') {
    const similarTitle = similarSection.querySelector('.section__title');
    if (similarTitle) similarTitle.textContent = 'Другие сборки';
  }
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

if (orderProductInput && !orderProductInput.options.length) {
  orderProductInput.innerHTML = PRODUCTS
    .map((product) => '<option value="' + product.name + '">' + product.name + ' - ' + formatPrice(product.price) + ' ₽</option>')
    .join('');
}

function openOrderDialog(productName) {
  if (!orderDialog) return;
  if (productName && orderProductInput) {
    const option = Array.from(orderProductInput.options)
      .find((option) => option.value === productName || option.textContent.startsWith(productName));
    if (option) orderProductInput.value = option.value;
  } else if (orderProductInput) {
    orderProductInput.selectedIndex = 0;
  }
  orderDialog.showModal();
  const indicator = document.getElementById('data-success');
  if (indicator) indicator.hidden = true;
}

function closeOrderDialog() {
  if (orderDialog) orderDialog.close();
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-product]');
  if (button) {
    const id = button.dataset.product;
    const product = id ? getProduct(id) : null;
    openOrderDialog(product ? product.name : null);
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
    form.reset();
    if (successMessage) {
      successMessage.hidden = false;
      successMessage.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  });
});

// ===================== Тема =====================

const themeToggleButton = document.getElementById('theme-toggle');
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

if (themeToggleButton && !document.documentElement.hasAttribute('data-theme')) {
  document.documentElement.setAttribute('data-theme', 'light');
}

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.clearTimeout(window.__themeTimer);
    window.__themeTimer = window.setTimeout(() => root.classList.remove('theme-transition'), 500);
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

// ===================== Кнопка «наверх» =====================

const scrollTopButton = document.getElementById('scroll-top');

if (scrollTopButton) {
  window.addEventListener('scroll', () => {
    scrollTopButton.classList.toggle('scroll-top--visible', window.scrollY > 500);
  });
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===================== Год в подвале =====================

const yearElement = document.getElementById('footer-year');
if (yearElement) yearElement.textContent = String(new Date().getFullYear());

// ===================== Появление секций при прокрутке =====================

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

const revealCards = document.querySelectorAll('.product-card, .advantage-card, .info-card, .review-card, .cat-tile');
if (revealCards.length && 'IntersectionObserver' in window) {
  revealCards.forEach((card) => card.classList.add('reveal-card'));
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = Array.prototype.indexOf.call(entry.target.parentNode.children, entry.target) % 4 * 70;
        entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.add('reveal-card--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealCards.forEach((card) => cardObserver.observe(card));
}

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
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
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
