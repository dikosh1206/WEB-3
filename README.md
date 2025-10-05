# Morning Crust — Responsive Website

**Team:** Bald Baldies  
**Members:** Amanzhol Aldiyar, Kalzhanov Zhansultan

Кратко: это адаптивный сайт кафе/пекарни, реализованный с использованием Bootstrap 5 и кастомных CSS media-queries. Дизайн — тёплая «кофейная» палитра в стиле Pinterest board, с каруселью, меню в виде карточек, формой контактов и отдельной страницей карточек, реализованной без Bootstrap (только CSS media queries), как требует задание.

---

## Содержание README

- [Фичи](#фичи)  
- [Соответствие заданию (Task 1–10)](#соответствие-заданию-task-1–10)  
- [Структура проекта](#структура-проекта)  
- [Как запустить локально](#как-запустить-локально)  
- [Деплой (GitHub Pages)](#деплой-github-pages)  
- [Изображения (какие файлы положить в `img/`)](#изображения)  
- [Исправления/заметки перед сдачей](#исправлениязаметки-перед-сдачей)  
- [Чек-лист для сдачи](#чек-лист-для-сдачи)  
- [Контакты / Авторы](#контакты--авторы)

---

## Фичи

- Bootstrap 5: сетка, navbar (с логотипом), кнопки, карточки, carousel, формы.  
- Кастомный CSS: палитра, шрифты (Playfair Display + Inter), тени, медиазапросы.  
- Отдельная страница `cards.html` — карточки реализованы **без Bootstrap**, только CSS media queries (Task 2).  
- Все страницы содержат футер с именами команды.  
- Адаптивность: mobile / tablet / desktop — корректная верстка и типографика.

---

## Соответствие заданию (Task 1–10)

- **Task 1 (Responsive Typography):** реализовано в `css/style.css` — медиазапросы для `h1, h2, p` (mobile/tablet/desktop).  
- **Task 2 (Card group, no Bootstrap):** `cards.html` — три карточки с flex и media queries (3/2/1 layout).  
- **Task 3 (Bootstrap Grid Layout):** `index.html`, `menu.html` — секции с `col-lg-6` и `col-lg-4`.  
- **Task 4 (Bootstrap Spacing Utilities):** на страницах вместо многих кастомных отступов используются Bootstrap классы (`p-`, `m-`, `mt-`, `px-sm-2` и т.д.).  
- **Task 5 (Bootstrap Navbar):** адаптивный `navbar` с `navbar-toggler`, логотип слева от названия.  
- **Task 6 (Bootstrap Buttons):** `btn`, `btn-primary`, `btn-outline-*`, `btn-sm`, используются везде.  
- **Task 7 (Bootstrap Carousel):** `index.html` — carousel с индикаторами, контролами и 9 слайдами (подставь свои изображения).  
- **Task 8 (Bootstrap Cards):** `menu.html` — карточки `card` в гриде, унифицированные размеры и стиль.  
- **Task 9 (Responsive Form):** `contact.html` — Bootstrap форма с `form-control`, `row`/`col-*`.  
- **Task 10 (Accessibility):** семантические теги (`nav`, `main`, `section`, `footer`), `alt` для всех изображений, контраст текста/фона учтён.

---

## Структура проекта

