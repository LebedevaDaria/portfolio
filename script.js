/* =========================================
   PORTFOLIO LINKS
========================================= */

const PORTFOLIO_LINKS = {
  linkedin: "https://www.linkedin.com/in/daria-lebedeva-19111733b/",
  behance: "https://www.behance.net/daria-lebedeva",
  telegram: "https://t.me/darya_vladimirovna1006",
  email: "mailto:lebedeva.dv.5@gmail.com",
  github: "https://github.com/lebedevadaria",
};

document.querySelectorAll("[data-link]").forEach((node) => {
  const key = node.dataset.link;

  if (PORTFOLIO_LINKS[key]) {
    node.href = PORTFOLIO_LINKS[key];
  }
});


/* =========================================
   CURRENT YEAR
========================================= */

const yearNode = document.querySelector("[data-year]");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}


/* =========================================
   PROJECT FLIP CARDS
========================================= */

document.querySelectorAll("[data-project-card]").forEach((card) => {
  const buttons = card.querySelectorAll(".project-flip-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const isFlipped = card.classList.toggle("is-flipped");

      buttons.forEach((cardButton) => {
        cardButton.setAttribute(
          "aria-pressed",
          String(isFlipped)
        );
      });
    });
  });
});


/* =========================================
   NAVIGATION
========================================= */

const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll("[data-nav-link]")];

const sections = ["home", "projects", "about", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

let lockedNavId = null;
let scrollEndTimer = null;


function closeNav() {
  if (!nav || !navToggle) return;

  nav.classList.remove("is-open");

  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
}


function setActiveNav(id) {
  navLinks.forEach((link) => {
    const isActive =
      link.getAttribute("href") === `#${id}`;

    link.classList.toggle("is-active", isActive);
  });
}


function updateActiveNav() {
  if (!sections.length) return;

  if (lockedNavId) {
    setActiveNav(lockedNavId);
    return;
  }

  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.offsetHeight : 0;

  const activationLine =
    window.scrollY + headerHeight + 120;

  let activeSection = sections[0];

  sections.forEach((section) => {
    if (section.offsetTop <= activationLine) {
      activeSection = section;
    }
  });

  const isBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;

  if (isBottom) {
    const contactSection =
      document.getElementById("contact");

    if (contactSection) {
      activeSection = contactSection;
    }
  }

  if (activeSection) {
    setActiveNav(activeSection.id);
  }
}


function finishLockedNavigation() {
  if (!lockedNavId) return;

  lockedNavId = null;
  updateActiveNav();
}


if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");

    navToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    navToggle.setAttribute(
      "aria-label",
      isOpen
        ? "Close navigation"
        : "Open navigation"
    );
  });


  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();

      const targetId =
        link.getAttribute("href")?.replace("#", "");

      if (targetId) {
        lockedNavId = targetId;
        setActiveNav(targetId);
      }
    });
  });


  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}


window.addEventListener("scroll", () => {
  updateActiveNav();

  if (
    lockedNavId &&
    !("onscrollend" in window)
  ) {
    clearTimeout(scrollEndTimer);

    scrollEndTimer = setTimeout(() => {
      finishLockedNavigation();
    }, 150);
  }
});


if ("onscrollend" in window) {
  window.addEventListener(
    "scrollend",
    finishLockedNavigation
  );
}


window.addEventListener(
  "resize",
  updateActiveNav
);


window.addEventListener(
  "wheel",
  () => {
    lockedNavId = null;
  },
  { passive: true }
);


window.addEventListener(
  "touchmove",
  () => {
    lockedNavId = null;
  },
  { passive: true }
);


updateActiveNav();


/* =========================================
   THEME
========================================= */

const themeButtons =
  document.querySelectorAll("[data-theme-value]");

const DEFAULT_THEME = "dark";
const THEME_TRANSITION_TIME = 350;


function setTheme(theme, animate = false) {
  const selectedTheme =
    theme === "light" ? "light" : "dark";

  if (animate) {
    document.documentElement.classList.add(
      "theme-transition"
    );
  }

  document.documentElement.dataset.theme =
    selectedTheme;

  themeButtons.forEach((button) => {
    const isActive =
      button.dataset.themeValue === selectedTheme;

    button.classList.toggle(
      "is-active",
      isActive
    );

    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });

  localStorage.setItem(
    "theme",
    selectedTheme
  );

  if (animate) {
    window.setTimeout(() => {
      document.documentElement.classList.remove(
        "theme-transition"
      );
    }, THEME_TRANSITION_TIME);
  }
}


themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(
      button.dataset.themeValue,
      true
    );
  });
});


const savedTheme =
  localStorage.getItem("theme") ||
  DEFAULT_THEME;

setTheme(savedTheme);


/* =========================================
   TRANSLATIONS
========================================= */

const translations = {
  en: {
    role: "UX/UI Designer",

    heroName: "Daria Lebedeva",

    heroText:
      'UX/UI designer with an engineering background, focused on complex <strong>B2B products</strong>, <strong>data-heavy interfaces</strong>, and clear structured user experiences.',

    location:
      "Based in Belgrade, Serbia",

    appearance:
      "Theme",

    language:
      "Language",
    
    learningTitle:
     "Learning & Certifications",

   statusCompleted:
     "2026 · completed",

   statusInprogress:
    "in progress",

    expertiseTitle:
     "Expertise",

    uxuiDesign:
    "UX/UI Design",

    productDesign:
    "Product Design",

    responsive:
    "Responsive Web Design",

    mobile:
    "Mobile App",

    designSystems:
    "Design Systems",

    dataVisualization:
    "Data Visualization",

    english:
    "English · B2",

    italian:
    "Italian · A2",

    serbian:
    "Serbian · Beginner",

    aboutTitle:
      "About",

   aboutText:
   "I design clear, reliable interfaces for complex products and technical workflows, combining UX thinking, systems thinking, and an engineering mindset.",

    stackTitle:
      "Stack & Tools",

    contactTitle:
      "Let's Connect",

      contactText:
      "I’m open to product design opportunities, collaborations, and interesting technical challenges.",

      view:
      "View details",
      
      back:
      "Back",

      analyticsTitle:
      "Analytics Dashboard",

      analyticsText1:
      "An internal analytics platform for monitoring customer activity, license usage, and product consumption.",

      analyticsText2:
      "I designed the dashboard system from scratch together with a data analyst, translating business requirements into clear data views, multi-level filtering and sorting, and export-ready tables.",

      analyticsText3:
      "The interface supports flexible data exploration and efficient reporting while working within the existing component library and technical constraints.",

      selfServiceTitle:
      "Self-Service Monitoring App",

      selfServiceText1:
      "A B2B mobile app for owners and operators of self-service devices connected to a payment and monitoring platform.",

      selfServiceText2:
      "I designed the end-to-end mobile journey around revenue analytics, payment breakdowns, cash collection, and technical device states.",

      selfServiceText3:
      "The interface helps users quickly understand what is happening at each location and which devices require attention.",

      autogradingTitle:
      "Autograding System",

      autogradingText1:
      "A product education page for an ML-powered mobile-device grading platform, created to reduce the need for manual client training.",

      autogradingText2:
      "A product education page for an ML-powered mobile-device grading platform, created to reduce the need for manual client training.",

      autogradingText3:
      "A product education page for an ML-powered mobile-device grading platform, created to reduce the need for manual client training.",

      trackerTitle:
      "Team Tracker",

      trackerText1:
      "A web service for creating, running, editing, and monitoring reusable timer-trackers.",

      trackerText2:
      "I designed the interaction logic and interface states, focusing on making timer status, remaining time, actions, and editing behavior easy to understand at a glance.",

      trackerText3:
      "I also supported the front-end implementation to keep the built product aligned with the intended UX.",

      robotTitle:
      "Device Grading Robot Interface",

      robotText1:
      "A touchscreen interface for an automated system that evaluates the cosmetic and technical condition of mobile devices.",

      robotText2:
      "The machine combines multi-angle photography, machine-learning-based cosmetic grading, and technical tests for the display, speakers, battery, and other components.",

      robotText3:
      "I designed a clear operator workflow with step-by-step guidance, touch-friendly controls, test progress, and detailed results for each completed check.",

      scadaTitle:
      "SCADA System Interface",

      scadaText1:
      "A technical web-interface concept for a SCADA system, designed around the workflow of connecting an external data source and loading variables.",

      scadaText2:
      "I translated a dense technical scenario into a structured configuration flow with clear hierarchy, states, and controls.",

      scadaText3:
      "The project helped me explore interaction patterns for complex engineering software and data-heavy industrial interfaces.",
  },

  ru: {
    role: "UX/UI Дизайнер",

    heroname: "Дарья Лебедева",

    heroText:
      'UX/UI-дизайнер с инженерным опытом, специализируюсь на сложных <strong>B2B-продуктах</strong> и <strong>data-heavy</strong> интерфейсах.',

    location:
      "Белград, Сербия",

    appearance:
      "Тема",

    language:
      "Язык",

    learningTitle:
     "Обучение и сертификаты",

   statusCompleted:
    "2026 · завершено",

    statusInprogress:
    "в процессе",

    expertiseTitle:
    "Экспертиза",

    uxuiDesign:
    "UX/UI-дизайн",

    productDesign:
    "Продуктовый дизайн",

    responsive:
    "Адаптивный веб-дизайн",

    mobile:
    "Дизайн мобильных приложений",

    designSystems:
    "Дизайн-системы",

    dataVisualization:
    "Визуализация данных",

    english:
    "Английский · B2",

    italian:
    "Итальянский · A2",

    serbian:
    "Сербский · начальный уровень",

    aboutTitle:
      "Обо мне",

    aboutText:
    "Я создаю понятные и надёжные интерфейсы для сложных продуктов и технических процессов, сочетая UX-мышление, системный подход и инженерный взгляд.",

    stackTitle:
      "Инструменты",

    contactTitle:
      "Связаться",

      contactText:
      "Открыта к новым проектам и интересным техническим задачам.",

      view:
      "Подробнее",

      back:
      "Назад",

      analyticsTitle:
      "Аналитический дашборд",

      analyticsText1:
      "Внутренняя аналитическая платформа для мониторинга активности клиентов, использования лицензий и продуктов.",

      analyticsText2:
      "Я спроектировала систему дашбордов с нуля совместно с аналитиком данных, преобразовав бизнес-требования в понятные представления данных, многоуровневую фильтрацию и сортировку, а также таблицы с возможностью экспорта.",

      analyticsText3:
      "Интерфейс позволяет гибко исследовать данные и эффективно формировать отчётность с учётом существующей библиотеки компонентов и технических ограничений.",

      selfServiceTitle:
      "Приложение для мониторинга устройств самообслуживания",

      selfServiceText1:
      "B2B-мобильное приложение для владельцев и операторов устройств самообслуживания, подключённых к платёжной и мониторинговой платформе.",

      selfServiceText2:
      "Я спроектировала полный пользовательский сценарий вокруг аналитики выручки, структуры платежей, инкассации и технических состояний устройств.",

      selfServiceText3:
      "Интерфейс помогает быстро понять, что происходит на каждой точке и какие устройства требуют внимания.",

      autogradingTitle:
      "Система автоматической оценки",

      autogradingText1:
      "Обучающая страница для ML-платформы автоматической оценки мобильных устройств, созданная, чтобы сократить потребность в ручном обучении клиентов.",

      autogradingText2:
      "Я использовала обратную связь от поддержки, чтобы выявить вопросы и проблемные места пользователей, а затем вместе с продуктовой и аналитической командами прошла путь от низкодетальной структуры до финального интерфейса.",

      autogradingText3:
      "В результате страница объясняет процесс оценки, проводит пользователя по основным шагам и помогает быстро найти нужную информацию по поддержке.",

      trackerTitle:
      "Командный трекер",

      trackerText1:
      "Веб-сервис для создания, запуска, редактирования и мониторинга многоразовых таймеров-трекеров.",

      trackerText2:
      "Я спроектировала логику взаимодействия и состояния интерфейса так, чтобы статус таймера, оставшееся время, доступные действия и редактирование были понятны с первого взгляда.",

      trackerText3:
      "Также я участвовала во фронтенд-реализации, чтобы готовый продукт соответствовал задуманному UX.",

      robotTitle:
      "Интерфейс touchscreen экрана",

      robotText1:
      "Интерфейс для сенсорного экрана автоматизированной системы, которая оценивает косметическое и техническое состояние мобильных устройств.",

      robotText2:
      "Система сочетает съёмку устройства с разных ракурсов, ML-оценку внешнего состояния и технические тесты экрана, динамиков, батареи и других компонентов.",

      robotText3:
      "Я спроектировала понятный сценарий работы оператора с пошаговыми инструкциями, удобными для сенсорного экрана элементами управления, отображением прогресса тестирования и подробными результатами каждой проверки.",

      scadaTitle:
      "Интерфейс SCADA-системы",

      scadaText1:
      "Концепт технического веб-интерфейса для SCADA-системы, построенный вокруг сценария подключения внешнего источника данных и загрузки переменных.",

      scadaText2:
      "Я преобразовала сложный технический сценарий в структурированный процесс настройки с понятной иерархией, состояниями и элементами управления.",

      scadaText3:
      "Проект позволил мне проработать паттерны взаимодействия для сложного инженерного ПО и промышленных интерфейсов с большим объёмом данных.",
  },
};


/* =========================================
   LANGUAGE
========================================= */

const languageButtons =
  document.querySelectorAll(
    "[data-language-value]"
  );

const DEFAULT_LANGUAGE = "en";
const LANGUAGE_FADE_TIME = 150;


function updateLanguageButtons(language) {
  languageButtons.forEach((button) => {
    const isActive =
      button.dataset.languageValue === language;

    button.classList.toggle(
      "is-active",
      isActive
    );

    button.setAttribute(
      "aria-pressed",
      String(isActive)
    );
  });
}


function replaceTranslations(language) {
  const dictionary = translations[language];

  if (!dictionary) return;


  /* Plain text translations */
  document
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {
      const key = element.dataset.i18n;

      if (dictionary[key] !== undefined) {
        element.textContent = dictionary[key];
      }
    });


  /* Translations containing <strong>, etc. */
  document
    .querySelectorAll("[data-i18n-html]")
    .forEach((element) => {
      const key = element.dataset.i18nHtml;

      if (dictionary[key] !== undefined) {
        element.innerHTML = dictionary[key];
      }
    });
}


function setLanguage(
  language,
  animate = false
) {
  const selectedLanguage =
    translations[language]
      ? language
      : DEFAULT_LANGUAGE;

  const translatedElements =
    document.querySelectorAll(
      "[data-i18n], [data-i18n-html]"
    );

  const applyLanguage = () => {
    document.documentElement.lang =
      selectedLanguage;

    replaceTranslations(
      selectedLanguage
    );

    updateLanguageButtons(
      selectedLanguage
    );

    localStorage.setItem(
      "language",
      selectedLanguage
    );
  };


  if (!animate) {
    applyLanguage();
    return;
  }


  translatedElements.forEach((element) => {
    element.classList.add(
      "is-changing-language"
    );
  });


  window.setTimeout(() => {
    applyLanguage();

    translatedElements.forEach((element) => {
      element.classList.remove(
        "is-changing-language"
      );
    });
  }, LANGUAGE_FADE_TIME);
}


languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(
      button.dataset.languageValue,
      true
    );
  });
});


const savedLanguage =
  localStorage.getItem("language") ||
  DEFAULT_LANGUAGE;

setLanguage(savedLanguage);