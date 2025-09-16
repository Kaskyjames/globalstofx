// ============================
// Navbar Scroll Effect
// ============================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

// ============================
// Navbar Mobile Menu Toggle
// ============================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu on link click (better UX on mobile)
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// ============================
// Hero Section Fade-in on Load
// ============================
window.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    setTimeout(() => {
      heroContent.style.opacity = "1";
      heroContent.style.transform = "translateY(0)";
    }, 400);
  }
});

// ============================
// Smooth Scroll for Anchor Links
// ============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.startsWith("#") && targetId.length > 1) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});

// ============================
// Initialize AOS (Animate on Scroll)
// ============================
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1200,
    once: true,
  });
}

// ============================
// About Section Animations
// ============================
window.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector("#about");
  const tagline = document.querySelector(".about-tagline");

  if (aboutSection && tagline) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tagline.classList.add("show");
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(aboutSection);
  }
});

// ============================
// Stats Section Counter Animation (5s, repeat on scroll)
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const counters = [
    { id: "users", target: 15230 },
    { id: "power", target: 4870 },
    { id: "withdrawals", target: 2340000 },
  ];
  const duration = 5000; // 5 seconds for all counters
  const statsSection = document.querySelector("#stats");
  const statsHeader = document.querySelector(".stats-header");
  let hasAnimated = false;

  function animateCounters() {
    counters.forEach(counter => {
      const el = document.getElementById(counter.id);
      let startTime = null;

      function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        el.textContent = Math.floor(progress * counter.target).toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }
      requestAnimationFrame(updateCounter);
    });

    // Animate the title + subtitle
    statsHeader.classList.add("show");
  }

  // Observer to trigger animation on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        hasAnimated = true;
      } else {
        // Reset when scrolling out so it repeats
        hasAnimated = false;
        statsHeader.classList.remove("show");
        counters.forEach(c => {
          document.getElementById(c.id).textContent = "0";
        });
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
});

// ============================
// Crypto ticker-list
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const tickerList = document.getElementById("ticker-list");
  const tickerWrapper = document.querySelector(".ticker-wrapper");

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=15";

  async function fetchCrypto() {
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Clear old
      tickerList.innerHTML = "";

      // Populate
      data.forEach((coin) => {
        const li = document.createElement("li");
        const price = coin.current_price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        });
        const change = coin.price_change_percentage_24h?.toFixed(2) || 0;
        const changeClass = change >= 0 ? "up" : "down";

        li.innerHTML = `
          <img src="${coin.image}" alt="${coin.name}" width="18" height="18" style="border-radius:50%; margin-right:6px;">
          <span class="coin">${coin.symbol.toUpperCase()}</span>
          <span class="price">${price}</span>
          <span class="change ${changeClass}">${change}%</span>
        `;
        tickerList.appendChild(li);
      });

      // Clone for infinite scroll
      const clone = tickerList.cloneNode(true);
      tickerWrapper.innerHTML = "";
      tickerWrapper.appendChild(tickerList);
      tickerWrapper.appendChild(clone);
    } catch (err) {
      console.error("Error:", err);
      tickerList.innerHTML = "<li>Unable to load live prices...</li>";
    }
  }

  fetchCrypto();
  setInterval(fetchCrypto, 20000); // update every 20 seconds 
});

// =========================
// What We Do Section Toggle
// =========================
document.querySelectorAll(".toggle-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const longText = btn.previousElementSibling;
    longText.classList.toggle("open");

    if (longText.classList.contains("open")) {
      btn.textContent = "Read Less";
    } else {
      btn.textContent = "Read More";
    }
  });
});

// Why Choose Us Section Scroll Animation
document.addEventListener("DOMContentLoaded", () => {
  const reasonCards = document.querySelectorAll(".reason-card");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        obs.unobserve(entry.target); // Animate once
      }
    });
  }, { threshold: 0.2 });

  reasonCards.forEach(card => {
    observer.observe(card);
  });
});
