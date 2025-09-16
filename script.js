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

// Animate "Why Choose Us" cards on scroll with stagger
document.addEventListener("DOMContentLoaded", () => {
  const reasonCards = document.querySelectorAll(".reason-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("animate-in");
        }, index * 200); // staggered delay
      }
    });
  }, { threshold: 0.2 });

  reasonCards.forEach(card => observer.observe(card));
});

// WhatsApp Floating Chat Script
document.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.getElementById("chat-toggle");
  const chatBox = document.getElementById("chat-box");
  const chatClose = document.getElementById("chat-close");

  // Open chat
  chatToggle.addEventListener("click", () => {
    chatBox.classList.add("open");
    chatBox.setAttribute("aria-hidden", "false");
  });

  // Close chat
  chatClose.addEventListener("click", () => {
    chatBox.classList.remove("open");
    chatBox.setAttribute("aria-hidden", "true");
  });

  // Close chat if clicking outside box
  document.addEventListener("click", (e) => {
    if (!chatBox.contains(e.target) && !chatToggle.contains(e.target)) {
      chatBox.classList.remove("open");
      chatBox.setAttribute("aria-hidden", "true");
    }
  });
});

// =========================
// Investment Plans Script
// =========================

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // Modal Elements
  // =========================
  const modal = document.getElementById("calculator-modal");
  const modalClose = document.getElementById("modal-close");
  const calcForm = document.getElementById("calc-form");
  const depositInput = document.getElementById("deposit");
  const calcResults = document.getElementById("calc-results");
  const planNameEl = document.getElementById("calc-plan-name");

  const resultDeposit = document.getElementById("result-deposit");
  const resultRate = document.getElementById("result-rate");
  const resultDuration = document.getElementById("result-duration");
  const resultReferral = document.getElementById("result-referral");
  const resultBonus = document.getElementById("result-bonus");
  const resultTotal = document.getElementById("result-total");

  let currentPlan = null;

  // =========================
  // Open Modal per Plan
  // =========================
  const planButtons = document.querySelectorAll(".plan-cta");
  planButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".plan-card");
      currentPlan = card.dataset;
      planNameEl.textContent = `${currentPlan.plan} Plan Calculator`;
      depositInput.value = "";
      calcResults.classList.add("hidden");
      modal.setAttribute("aria-hidden", "false");
      modal.style.opacity = 0;
      modal.style.display = "flex";
      setTimeout(() => modal.style.opacity = 1, 20); // fade-in animation
    });
  });

  // =========================
  // Close Modal
  // =========================
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.style.opacity = 0;
    setTimeout(() => {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }, 300);
  }

  // =========================
  // Calculator Logic
  // =========================
  calcForm.addEventListener("submit", e => {
    e.preventDefault();
    const deposit = parseFloat(depositInput.value);
    const min = parseFloat(currentPlan.min);
    const max = parseFloat(currentPlan.max);

    if (isNaN(deposit) || deposit < min || deposit > max) {
      alert(`Please enter a deposit between $${min.toLocaleString()} and $${max.toLocaleString()}`);
      return;
    }

    const rate = parseFloat(currentPlan.rate) * 100;
    const duration = parseInt(currentPlan.duration);
    const referral = parseFloat(currentPlan.referral) || 0;
    const bonus = parseFloat(currentPlan.bonus) || 0;

    // Compound interest calculation (daily)
    let total = deposit;
    for (let i = 0; i < duration; i++) {
      total += total * parseFloat(currentPlan.rate);
    }
    total += bonus;

    // Populate results
    resultDeposit.textContent = deposit.toLocaleString(undefined, {minimumFractionDigits:2});
    resultRate.textContent = rate.toFixed(2);
    resultDuration.textContent = duration;
    resultReferral.textContent = referral;
    resultBonus.textContent = bonus.toLocaleString(undefined, {minimumFractionDigits:2});
    resultTotal.textContent = total.toLocaleString(undefined, {minimumFractionDigits:2});

    calcResults.classList.remove("hidden");
  });

  // =========================
  // Comparison Table Population
  // =========================
  const plans = document.querySelectorAll(".plan-card");
  const comparisonBody = document.getElementById("comparisonBody");

  function populateComparison() {
    const sampleDeposits = [500, 8000, 20000, 60000, 250000, 750000]; // Sample deposits
    comparisonBody.innerHTML = "";

    sampleDeposits.forEach(deposit => {
      const row = document.createElement("tr");
      const depositCell = document.createElement("td");
      depositCell.textContent = `$${deposit.toLocaleString()}`;
      row.appendChild(depositCell);

      plans.forEach(plan => {
        const planData = plan.dataset;
        let total = parseFloat(deposit);
        const min = parseFloat(planData.min);
        const max = parseFloat(planData.max);

        // Only calculate if deposit is within plan range
        if (deposit >= min && deposit <= max) {
          const duration = parseInt(planData.duration);
          const rate = parseFloat(planData.rate);
          const bonus = parseFloat(planData.bonus) || 0;
          for (let i = 0; i < duration; i++) total += total * rate;
          total += bonus;
        } else {
          total = "-";
        }

        const cell = document.createElement("td");
        cell.textContent = typeof total === "number" ? `$${total.toLocaleString(undefined,{minimumFractionDigits:2})}` : "-";
        row.appendChild(cell);
      });

      comparisonBody.appendChild(row);
    });
  }

  populateComparison();

  // =========================
  // Smooth Modal Animation (optional: ESC key)
  // =========================
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.style.display === "flex") closeModal();
  });

});
