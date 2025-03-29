
document.addEventListener("DOMContentLoaded", function () {

  AOS.init({
    duration: 800,
    easing: "ease",
    once: true,
    offset: 100,
  });

  const header = document.querySelector(".header");
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav__link");
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
      backToTopBtn.classList.add("show");
    } else {
      header.classList.remove("scrolled");
      backToTopBtn.classList.remove("show");
    }

    updateActiveNavLink();
  });

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    });
  });

  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  backToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ------------ Portfolio Filtering ------------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        if (filterValue === "all") {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 200);
        } else if (item.getAttribute("data-category") === filterValue) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 200);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 500);
        }
      });
    });
  });

  // ------------ Stats Counter ------------
  const statItems = document.querySelectorAll(".stat-item");
  let counted = false;

  function countUp(element, target) {
    const counter = element.querySelector("h3");
    const updateCount = () => {
      const count = +counter.innerText.replace("+", "");
      const increment = target / 200;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment) + "+";
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCount();
  }

  window.addEventListener("scroll", function () {
    if (
      !counted &&
      window.scrollY > document.querySelector(".stats").offsetTop - 500
    ) {
      statItems.forEach((item) => {
        const target = parseInt(item.getAttribute("data-counter"));
        countUp(item, target);
      });
      counted = true;
    }
  });

  // ------------ Contact Form ------------
  const contactForm = document.querySelector(".contact__form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      if (name && email && subject && message) {
        console.log("Form submitted:", { name, email, subject, message });

        const formGroups = contactForm.querySelectorAll(".form-group");
        formGroups.forEach((group) => (group.style.display = "none"));
        contactForm.querySelector("button").style.display = "none";

        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.innerHTML = `
                    <i class="fas fa-check-circle" style="color: var(--success-color); font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us, ${name}. We will get back to you shortly.</p>
                `;

        successMessage.style.textAlign = "center";
        successMessage.style.padding = "2rem";
        contactForm.appendChild(successMessage);

        setTimeout(() => {
          contactForm.reset();
          formGroups.forEach((group) => (group.style.display = "block"));
          contactForm.querySelector("button").style.display = "block";
          successMessage.remove();
        }, 5000);
      }
    });
  }

  // ------------ Smooth scroll for anchor links ------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // ------------ Preloader ------------
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.innerHTML = `
        <div class="preloader__content">
            <div class="preloader__spinner"></div>
            <h2>Loading<span>.</span><span>.</span><span>.</span></h2>
        </div>
    `;
  document.body.appendChild(preloader);

  window.addEventListener("load", function () {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 500);
  });

  // ------------ Add preloader styles ------------
  const preloaderStyles = document.createElement("style");
  preloaderStyles.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease;
        }
        
        .preloader__content {
            text-align: center;
        }
        
        .preloader__spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(78, 115, 223, 0.1);
            border-radius: 50%;
            border-top-color: var(--primary-color);
            margin: 0 auto 1rem;
            animation: spin 1s linear infinite;
        }
        
        .preloader h2 {
            color: var(--dark-color);
            font-size: 1.5rem;
        }
        
        .preloader h2 span {
            display: inline-block;
            color: var(--primary-color);
            animation: dots 1.5s infinite;
        }
        
        .preloader h2 span:nth-child(2) {
            animation-delay: 0.5s;
        }
        
        .preloader h2 span:nth-child(3) {
            animation-delay: 1s;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
        
        @keyframes dots {
            0%, 20% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-5px);
            }
            80%, 100% {
                transform: translateY(0);
            }
        }
    `;
  document.head.appendChild(preloaderStyles);

  // ------------ Image lazy loading ------------
  if ("IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ------------ Detect dark mode preference ------------
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  if (prefersDarkScheme.matches) {
  }

  // ------------ Add parallax effect to hero section ------------
  const heroSection = document.querySelector(".hero");
  window.addEventListener("scroll", function () {
    const scrollPosition = window.pageYOffset;
    if (heroSection) {
      heroSection.style.backgroundPositionY = scrollPosition * 0.5 + "px";
    }
  });
});
