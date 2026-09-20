/* =========================================================
   DEADS — VISUAL IDENTITY SYSTEM
   JAVASCRIPT
========================================================= */

/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");

  setTimeout(() => {
    loader.classList.add("loaded");
  }, 700);
});

/* =========================================================
   THEME TOGGLE
========================================================= */

const themeToggle = document.getElementById("themeToggle");

const themeLabel = document.getElementById("themeLabel");

const body = document.body;

function setTheme(theme) {
  if (theme === "light") {
    body.classList.add("light-mode");

    themeLabel.textContent = "DARK";

    localStorage.setItem("deads-theme", "light");
  } else {
    body.classList.remove("light-mode");

    themeLabel.textContent = "LIGHT";

    localStorage.setItem("deads-theme", "dark");
  }
}

const savedTheme = localStorage.getItem("deads-theme");

if (savedTheme === "light") {
  setTheme("light");
} else {
  setTheme("dark");
}

themeToggle.addEventListener("click", () => {
  const isLight = body.classList.contains("light-mode");

  if (isLight) {
    setTheme("dark");
  } else {
    setTheme("light");
  }
});

/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenu = document.getElementById("mobileMenu");

const mobileNav = document.getElementById("mobileNav");

mobileMenu.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

/* CLOSE MOBILE MENU WHEN LINK IS CLICKED */

const mobileLinks = mobileNav.querySelectorAll("a");

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
  });
});

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");

const navLinks = document.querySelectorAll(".main-nav a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const id = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    });
  },
  {
    threshold: 0.25,
  },
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

/* =========================================================
   SMOOTH ANCHOR OFFSET
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (targetId === "#" || !targetId) {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const headerOffset = 80;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

/* =========================================================
   MOUSE PARALLAX ON HERO LOGO
========================================================= */

const heroVisual = document.querySelector(".hero-visual");

const heroLogo = document.querySelector(".hero-logo-image");

if (heroVisual && heroLogo && window.matchMedia("(pointer: fine)").matches) {
  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    heroLogo.style.transform = `
                translate(
                    ${x * 10}px,
                    ${y * 10}px
                )
                scale(1.025)
                `;
  });

  heroVisual.addEventListener("mouseleave", () => {
    heroLogo.style.transform = "translate(0, 0) scale(1)";
  });
}

/* =========================================================
   MOCKUP IMAGE CURSOR EFFECT
========================================================= */

const mockupCards = document.querySelectorAll(".mockup-card");

mockupCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const rect = card.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const image = card.querySelector(".mockup-image img");

    if (!image) {
      return;
    }

    image.style.transform = `
                translate(
                    ${x * 5}px,
                    ${y * 5}px
                )
                scale(1.01)
                `;
  });

  card.addEventListener("mouseleave", () => {
    const image = card.querySelector(".mockup-image img");

    if (image) {
      image.style.transform = "translate(0, 0) scale(1)";
    }
  });
});

/* =========================================================
   PHONE BUTTON
========================================================= */

const phoneButton = document.querySelector(".phone-content button");

if (phoneButton) {
  phoneButton.addEventListener("click", () => {
    phoneButton.textContent = "SYSTEM LOADED";

    phoneButton.style.background = "#111";

    phoneButton.style.border = "1px solid #A00000";

    setTimeout(() => {
      phoneButton.textContent = "EXPLORE SYSTEM";

      phoneButton.style.background = "#A00000";

      phoneButton.style.border = "0";
    }, 1600);
  });
}

/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElements = document.querySelectorAll("[data-current-year]");

yearElements.forEach((element) => {
  element.textContent = new Date().getFullYear();
});
