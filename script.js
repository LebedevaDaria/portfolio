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
     "Learning &amp; Certifications",

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
  },

  ru: {
    role: "UX/UI Дизайнер",

    heroname: "Дарья Лебедева",

    heroText:
      'UX/UI-дизайнер с инженерным опытом, специализируюсь на сложных<strong>B2B-продуктах</strong> и <strong>data-heavy</strong> интерфейсах.',

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