document.addEventListener("DOMContentLoaded", function () {
  initializeScrollAnimations();
  initializeSmoothScrolling();
  initializeTypingEffect();
  initializeHeaderScrollEffect();
});

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
  });

  document
    .querySelectorAll(
      ".project-card, .team-member, .tech-category, .mission-item"
    )
    .forEach((item) => {
      item.classList.add("fade-in");
      observer.observe(item);
    });
}

function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

function initializeTypingEffect() {
  const typingText = document.querySelector(".typing-text");
  if (!typingText) return;

  const messages = [
    "🐉 Building the future with passion and precision 🐉",
    "⚡ Scalable, modular, and sustainable solutions ⚡",
    "🚀 Zeal for Engineering, Knowledge, Research & Advancement 🚀",
    "💻 Java • Angular • Node.js • Docker 💻",
  ];

  let messageIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 100;

  function typeMessage() {
    const currentMessage = messages[messageIndex];

    if (isDeleting) {
      typingText.textContent = currentMessage.substring(0, charIndex - 1);
      charIndex--;
      delay = 50;
    } else {
      typingText.textContent = currentMessage.substring(0, charIndex + 1);
      charIndex++;
      delay = 100;
    }

    if (!isDeleting && charIndex === currentMessage.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      messageIndex = (messageIndex + 1) % messages.length;
      delay = 500;
    }

    setTimeout(typeMessage, delay);
  }

  typeMessage();
}

function initializeHeaderScrollEffect() {
  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.background = "rgba(10, 10, 10, 0.98)";
      header.style.backdropFilter = "blur(15px)";
    } else {
      header.style.background = "rgba(10, 10, 10, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    }

    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  });
}

function createParticles() {
  const hero = document.querySelector(".hero");
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles";
  particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #007BFF;
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
    particlesContainer.appendChild(particle);
  }

  hero.appendChild(particlesContainer);
}

document.addEventListener("DOMContentLoaded", createParticles);

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

document.querySelectorAll(".team-member").forEach((member) => {
  member.addEventListener("mouseenter", function () {
    const avatar = this.querySelector(".member-avatar");
    avatar.style.transform = "scale(1.1) rotate(5deg)";
  });

  member.addEventListener("mouseleave", function () {
    const avatar = this.querySelector(".member-avatar");
    avatar.style.transform = "scale(1) rotate(0deg)";
  });
});

window.addEventListener("load", function () {
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--background-dark);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;

  const spinnerSVG = `
        <svg width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#007BFF" stroke-width="4" stroke-linecap="round" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
            </circle>
        </svg>
    `;

  loader.innerHTML = spinnerSVG;
  document.body.appendChild(loader);

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.remove();
    }, 500);
  }, 1000);
});
