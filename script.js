document.addEventListener("DOMContentLoaded", () => {
  // ================= SCROLL REVEAL ANIMATION =================
  const scrollElements = document.querySelectorAll(".js-scroll");

  const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= window.innerHeight - offset;
  };

  const displayScrollElement = (element) => {
    element.classList.add("is-visible");
  };

  const hideScrollElement = (element) => {
    element.classList.remove("is-visible");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        setTimeout(() => {
          displayScrollElement(el);
        }, el.dataset.delay ? parseInt(el.dataset.delay) : 0);
      } else {
        hideScrollElement(el);
      }
    });
  };

  window.addEventListener("scroll", handleScrollAnimation);
  window.addEventListener("load", handleScrollAnimation);


  // ================= ANIMATED COUNTER =================
  const statNumbers = document.querySelectorAll(".stat-number");

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target"));
    if (isNaN(target) || target <= 0) return;

    const duration = 2000; // ms
    const increment = target / (duration / 16); // ~60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      el.textContent = Math.floor(current);

      if (current < target) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target;
      }
    };

    updateCounter();
  };

  const counterInView = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  };

  const handleCounterScroll = () => {
    statNumbers.forEach((el) => {
      if (!el.dataset.inited && counterInView(el)) {
        animateCounter(el);
        el.dataset.inited = true;
      }
    });
  };

  window.addEventListener("scroll", handleCounterScroll);
  window.addEventListener("load", handleCounterScroll);


// ================= NAVIGATION – JANGAN NGACAUIN PINDAH HALAMAN =================
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // JIKA HANYA LINK SECTION DI HALAMAN YANG SAMA (misalnya #top)
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    // JIKA href file lain (rekber.html, testi.html, sosial.html) → biarkan browser default
    // Jangan preventDefault
  });
});


  // ================= OPTIONAL: SOFT CURSOR GLOW (LIGHT) =================
  const app = document.body;
  const cursor = document.createElement("div");
  cursor.classList.add("cursor-glow");
  cursor.innerHTML = '<div class="cursor-inner"></div>';
  app.appendChild(cursor);

  const cursorInner = cursor.querySelector(".cursor-inner");

  const initCursor = () => {
    app.style.cursor = "none";

    const updateCursor = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorInner.style.transform = `scale(${e.target.closest("button, .nav-link, .link-btn") ? 1.4 : 1})`;
    };

    window.addEventListener("mousemove", updateCursor);

    const handleHover = () => {
      cursorInner.style.opacity = "0.8";
    };
    const handleLeave = () => {
      cursorInner.style.opacity = "0.4";
    };

    document.querySelectorAll("button, .nav-link, .link-btn").forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
    });
  };

  initCursor();


  // ================= OPTIONAL: BUTTON RIPPLE EFFECT =================
  const createRipple = (e) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  document
    .querySelectorAll(".btn-primary, .btn-secondary, .link-btn")
    .forEach((btn) => {
      btn.addEventListener("click", createRipple);
    });


  // ================= HEADER STICKY + GLASS EFFECT =================
  const header = document.querySelector(".glass-navbar");
  if (!header.style.zIndex) {
    header.style.zIndex = 999;
  }

  const handleHeaderScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop < 10) {
      header.style.background = "var(--glass-bg)";
      header.style.boxShadow = "none";
    } else {
      header.style.background = "rgba(15, 15, 15, 0.65)";
      header.style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.3)";
    }
  };

  window.addEventListener("scroll", handleHeaderScroll);
  window.addEventListener("load", handleHeaderScroll);
});
