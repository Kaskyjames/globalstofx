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

/* =========================
   Investment Plans Logic
========================= */
/* =========================
   MODAL CALCULATOR LOGIC
========================= */

const modal = document.getElementById("calculator-modal");
const modalClose = document.getElementById("modal-close");
const calcPlanName = document.getElementById("calc-plan-name");

const depositInput = document.getElementById("deposit");
const calcForm = document.getElementById("calc-form");
const calcResults = document.getElementById("calc-results");

const resultDeposit = document.getElementById("result-deposit");
const resultRate = document.getElementById("result-rate");
const resultDuration = document.getElementById("result-duration");
const resultReferral = document.getElementById("result-referral");
const resultBonus = document.getElementById("result-bonus");
const resultTotal = document.getElementById("result-total");

let currentPlan = null;

/* =========================
   PLANS → MODAL TRIGGER
========================= */
document.querySelectorAll(".plan-cta").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".plan-card");

    currentPlan = {
      name: card.dataset.plan,
      min: parseFloat(card.dataset.min),
      max: parseFloat(card.dataset.max),
      rate: parseFloat(card.dataset.rate),
      duration: parseInt(card.dataset.duration, 10),
      referral: parseFloat(card.dataset.referral),
      bonus: card.dataset.bonus ? parseFloat(card.dataset.bonus) : 0,
    };

    calcPlanName.textContent = `${currentPlan.name} Plan Calculator`;
    depositInput.value = "";
    calcResults.classList.add("hidden");

    modal.setAttribute("aria-hidden", "false");
  });
});

/* =========================
   CLOSE MODAL
========================= */
modalClose.addEventListener("click", () => {
  modal.setAttribute("aria-hidden", "true");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.setAttribute("aria-hidden", "true");
  }
});

/* =========================
   ROI CALCULATION
========================= */
function calculateROI(deposit, rate, duration, bonus = 0) {
  let amount = deposit + bonus;
  for (let i = 0; i < duration; i++) {
    amount += amount * rate;
  }
  return amount.toFixed(2);
}

/* =========================
   HANDLE FORM SUBMIT
========================= */
calcForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const deposit = parseFloat(depositInput.value);

  if (!deposit || deposit < currentPlan.min || deposit > currentPlan.max) {
    alert(`Deposit must be between $${currentPlan.min} and $${currentPlan.max}`);
    return;
  }

  const total = calculateROI(deposit, currentPlan.rate, currentPlan.duration, currentPlan.bonus);

  resultDeposit.textContent = deposit.toLocaleString();
  resultRate.textContent = (currentPlan.rate * 100).toFixed(1);
  resultDuration.textContent = currentPlan.duration;
  resultReferral.textContent = currentPlan.referral;
  resultBonus.textContent = currentPlan.bonus;
  resultTotal.textContent = parseFloat(total).toLocaleString();

  calcResults.classList.remove("hidden");
});

/* =========================
   AUTO POPULATE COMPARISON TABLE
========================= */
const comparisonBody = document.getElementById("comparisonBody");
if (comparisonBody) {
  const sampleDeposits = [500, 10000, 25000, 60000, 250000];

  const plans = Array.from(document.querySelectorAll(".plan-card")).map(card => ({
    name: card.dataset.plan,
    min: parseFloat(card.dataset.min),
    max: parseFloat(card.dataset.max),
    rate: parseFloat(card.dataset.rate),
    duration: parseInt(card.dataset.duration, 10),
    referral: parseFloat(card.dataset.referral),
    bonus: card.dataset.bonus ? parseFloat(card.dataset.bonus) : 0,
  }));

  sampleDeposits.forEach(deposit => {
    const row = document.createElement("tr");

    // First column: Deposit value
    const depositCell = document.createElement("td");
    depositCell.textContent = `$${deposit.toLocaleString()}`;
    row.appendChild(depositCell);

    // Plan columns
    plans.forEach(plan => {
      const cell = document.createElement("td");
      if (deposit >= plan.min && deposit <= plan.max) {
        const roi = calculateROI(deposit, plan.rate, plan.duration, plan.bonus);
        cell.textContent = `$${parseFloat(roi).toLocaleString()}`;
        cell.style.fontWeight = "600";
        cell.style.color = "var(--primary)";
      } else {
        cell.textContent = "—";
        cell.style.color = "var(--muted)";
      }
      row.appendChild(cell);
    });

    comparisonBody.appendChild(row);
  });
    }

/* =========================
   TOOLTIP DYNAMIC SETUP
========================= */
function addTooltip(element, text) {
  const wrapper = document.createElement("span");
  wrapper.classList.add("tooltip");
  wrapper.style.display = "inline-block";

  const tooltipText = document.createElement("span");
  tooltipText.classList.add("tooltip-text");
  tooltipText.textContent = text;

  // Move element inside wrapper
  element.parentNode.insertBefore(wrapper, element);
  wrapper.appendChild(element);
  wrapper.appendChild(tooltipText);
}

// Attach tooltips to results in modal
if (resultReferral && resultBonus) {
  addTooltip(resultReferral.parentNode, "Percentage reward for referring new investors.");
  addTooltip(resultBonus.parentNode, "One-time signup bonus added to your deposit.");
}

// Attach tooltips to plan ribbons
document.querySelectorAll(".plan-ribbon").forEach(ribbon => {
  addTooltip(ribbon, "Plan tier indicating features and benefits.");
});
