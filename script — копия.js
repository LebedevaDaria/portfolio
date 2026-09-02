const PORTFOLIO_LINKS = {
  linkedin: "https://www.linkedin.com/in/daria-lebedeva-19111733b/",
  behance: "https://www.behance.net/daria-lebedeva",
  telegram: "https://t.me/darya_vladimirovna1006",
  email: "mailto:lebedeva.dv.5@gmail.com",
  github: "https://github.com/lebedevadaria",
};

const linkNodes = document.querySelectorAll("[data-link]");

linkNodes.forEach((node) => {
  const key = node.dataset.link;

  if (PORTFOLIO_LINKS[key]) {
    node.href = PORTFOLIO_LINKS[key];
  }
});

const yearNode = document.querySelector("[data-year]");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

/* Project flip cards */
const projectCards = document.querySelectorAll("[data-project-card]");

projectCards.forEach((card) => {
  const buttons = card.querySelectorAll(".project-flip-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const isFlipped = card.classList.toggle("is-flipped");

      buttons.forEach((cardButton) => {
        cardButton.setAttribute("aria-pressed", String(isFlipped));
      });
    });
  });
});

/* Navigation */
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = [...document.querySelectorAll("[data-nav-link]")];

const sections = ["home", "projects", "about", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

let lockedNavId = null;
let scrollEndTimer;

function closeNav() {
  if (!nav || !navToggle) return;

  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
}

function setActiveNav(id) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isActive);
  });
}

function finishLockedNavigation() {
  if (!lockedNavId) return;

  lockedNavId = null;
  updateActiveNav();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");

    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation"
    );
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();

      const targetId = link.getAttribute("href")?.replace("#", "");

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

function updateActiveNav() {
  if (!sections.length) return;

  if (lockedNavId) {
    setActiveNav(lockedNavId);
    return;
  }

  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.offsetHeight : 0;

  const activationLine = window.scrollY + headerHeight + 120;

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
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      activeSection = contactSection;
    }
  }

  if (activeSection) {
    setActiveNav(activeSection.id);
  }
}

window.addEventListener("scroll", () => {
  updateActiveNav();

  if (lockedNavId && !("onscrollend" in window)) {
    clearTimeout(scrollEndTimer);

    scrollEndTimer = setTimeout(() => {
      finishLockedNavigation();
    }, 150);
  }
});

if ("onscrollend" in window) {
  window.addEventListener("scrollend", () => {
    finishLockedNavigation();
  });
}

window.addEventListener("resize", updateActiveNav);

window.addEventListener(
  "wheel",
  () => {
    if (lockedNavId) {
      lockedNavId = null;
    }
  },
  { passive: true }
);

window.addEventListener(
  "touchmove",
  () => {
    if (lockedNavId) {
      lockedNavId = null;
    }
  },
  { passive: true }
);

updateActiveNav();
