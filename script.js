// ==================================================
// MENU MOBILE
// ==================================================
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ==================================================
// LINK ATIVO NO MENU
// ==================================================
const sections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => link.classList.remove("active"));

      const activeLink = document.querySelector(
        `.main-nav a[href="#${entry.target.id}"]`
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
    });
  },
  {
    threshold: 0,
    rootMargin: "-35% 0px -55% 0px",
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// ==================================================
// CARROSSEL DAS TELAS
// ==================================================
const track = document.querySelector(".carousel-track");
const slides = [...document.querySelectorAll(".screen-slide")];
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");
const dotsContainer = document.querySelector(".carousel-dots");

let currentSlide = 0;

slides.forEach((_, index) => {
  const dot = document.createElement("button");

  dot.type = "button";
  dot.className = "carousel-dot";
  dot.setAttribute("aria-label", `Ir para a tela ${index + 1}`);

  dot.addEventListener("click", () => {
    currentSlide = index;
    updateCarousel();
  });

  dotsContainer.appendChild(dot);
});

const dots = [...document.querySelectorAll(".carousel-dot")];

function updateCarousel() {
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });

  prevButton.disabled = currentSlide === 0;
  nextButton.disabled = currentSlide === slides.length - 1;
}

prevButton.addEventListener("click", () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
});

nextButton.addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
    updateCarousel();
  }
});

// Navegação pelo teclado
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }

  if (event.key === "ArrowRight" && currentSlide < slides.length - 1) {
    currentSlide++;
    updateCarousel();
  }
});

updateCarousel();


// ==================================================
// ABRIR DIAGRAMAS EM TAMANHO COMPLETO
// ==================================================
// document.querySelectorAll(".diagram-image-box img, .mini-diagram img").forEach((image) => {
//   image.addEventListener("click", () => {
//     window.open(image.src, "_blank", "noopener,noreferrer");
//   });

//   image.setAttribute("title", "Clique para abrir o diagrama em tamanho completo");
// });
