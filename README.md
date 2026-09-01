# Portfolio V2

Новая версия одностраничного портфолио по bento-макету.

## Файлы

- `index.html` — разметка страницы
- `styles.css` — весь дизайн и адаптив
- `script.js` — ссылки, sticky-nav и переворот карточек проектов
- `assets/profile/portrait-placeholder.jpg` — временный портрет из макета
- `assets/projects/` — временные изображения проектов, вырезанные из макета

## Как открыть локально

Открой папку `portfolio-v2` в VS Code и запусти `index.html` через Live Server.

## Как разместить рядом с текущим сайтом

Если текущая версия лежит в корне репозитория GitHub Pages, можно переименовать эту папку в `v2` и положить ее в корень репозитория:

```text
index.html
styles.css
script.js
assets/
v2/
  index.html
  styles.css
  script.js
  assets/
```

Тогда новая версия будет открываться по адресу `/v2/`.

## Что заменить своими файлами

В `assets/projects/` можно просто заменить изображения, сохранив имена:

- `analytics-dashboard.jpg`
- `self-service-monitoring.jpg`
- `autograding-system.jpg`
- `team-tracker.jpg`
- `device-grading-robot.jpg`
- `scada-system.jpg`

Для Self-Service Monitoring App и Device Grading Robot Interface уже используется режим `contain` и темная подложка, поэтому прозрачные PNG/WebP тоже подойдут. Если заменишь JPG на PNG/WebP, не забудь поменять расширение в `index.html`.

Портрет: `assets/profile/portrait-placeholder.jpg`.

## Flip-карточки

Стрелка в правом нижнем углу переворачивает карточку. На лицевой стороне — изображение, название и теги; на обратной — название, теги и описание.

Тексты обратных сторон находятся прямо в `index.html`, чтобы их было легко редактировать.

## Контактные ссылки

Все ссылки собраны в начале `script.js` в объекте `PORTFOLIO_LINKS`.

## Цвета

Основные акценты сохранены из предыдущего сайта:

- lime: `#CCFF00`
- cyan: `#00F0FF`
