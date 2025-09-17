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

/* ================================
   Investment Plans Script
================================ */

// Plan data from HTML data attributes
const plans = Array.from(document.querySelectorAll(".plan-card")).map(card => ({
  name: card.dataset.plan,
  min: parseFloat(card.dataset.min),
  max: parseFloat(card.dataset.max),
  rate: parseFloat(card.dataset.rate),
  duration: parseInt(card.dataset.duration),
  referral: parseFloat(card.dataset.referral),
  bonus: card.dataset.bonus ? parseFloat(card.dataset.bonus) : 0
}));

/* ================================
   Calculator Modal
================================ */
const modal = document.createElement("div");
modal.classList.add("calc-modal");
modal.innerHTML = `
  <div class="calc-content">
    <span class="calc-close">&times;</span>
    <h3 id="calc-title">Plan Calculator</h3>
    <p id="calc-range"></p>
    <label for="calc-amount">Enter Deposit ($):</label>
    <input type="number" id="calc-amount" min="0" />
    <button id="calc-btn">Calculate</button>
    <div id="calc-result"></div>
  </div>
`;
document.body.appendChild(modal);

const modalClose = modal.querySelector(".calc-close");
const modalTitle = modal.querySelector("#calc-title");
const modalRange = modal.querySelector("#calc-range");
const modalAmount = modal.querySelector("#calc-amount");
const modalBtn = modal.querySelector("#calc-btn");
const modalResult = modal.querySelector("#calc-result");

let activePlan = null;

// Open modal when "View calculator" clicked
document.querySelectorAll(".plan-cta").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    activePlan = plans[index];
    modal.style.display = "flex";
    modalTitle.textContent = `${activePlan.name} Plan Calculator`;
    modalRange.textContent = `Range: $${activePlan.min.toLocaleString()} - $${activePlan.max.toLocaleString()}`;
    modalAmount.value = "";
    modalResult.innerHTML = "";
  });
});

// Close modal
modalClose.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// Handle calculation
modalBtn.addEventListener("click", () => {
  const deposit = parseFloat(modalAmount.value);
  if (isNaN(deposit) || deposit < activePlan.min || deposit > activePlan.max) {
    modalResult.innerHTML = `<p style="color:red">Please enter between $${activePlan.min.toLocaleString()} and $${activePlan.max.toLocaleString()}.</p>`;
    return;
  }

  // Compound calculation
  let finalAmount = deposit;
  for (let i = 0; i < activePlan.duration; i++) {
    finalAmount *= 1 + activePlan.rate;
  }
  finalAmount += activePlan.bonus;

  modalResult.innerHTML = `
    <p><strong>Projected ROI:</strong></p>
    <p>Initial: $${deposit.toLocaleString()}</p>
    <p>Final: $${finalAmount.toFixed(2).toLocaleString()}</p>
    <p>Referral Bonus: ${activePlan.referral}%</p>
    ${activePlan.bonus ? `<p>Signup Bonus: $${activePlan.bonus}</p>` : ""}
  `;
});

/* ================================
   Comparison Table
================================ */
const sampleDeposits = [500, 5000, 50000, 200000];
const comparisonBody = document.getElementById("comparisonBody");

function calculateROI(deposit, plan) {
  if (deposit < plan.min) return "-";
  let finalAmount = deposit;
  for (let i = 0; i < plan.duration; i++) {
    finalAmount *= 1 + plan.rate;
  }
  finalAmount += plan.bonus;
  return `$${finalAmount.toFixed(2).toLocaleString()}`;
}

function populateComparisonTable() {
  comparisonBody.innerHTML = "";
  sampleDeposits.forEach(deposit => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>$${deposit.toLocaleString()}</td>
      ${plans.map(plan => `<td>${calculateROI(deposit, plan)}</td>`).join("")}
    `;
    comparisonBody.appendChild(row);
  });
}

populateComparisonTable();

/* ================================
   Modal Styling (inline injection)
   - keeps your CSS clean
================================ */
const modalStyle = document.createElement("style");
modalStyle.textContent = `
.calc-modal {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.calc-content {
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.calc-close {
  position: absolute;
  right: 20px; top: 20px;
  font-size: 1.5rem;
  cursor: pointer;
}
#calc-amount {
  width: 100%;
  padding: 0.6rem;
  margin: 1rem 0;
  border-radius: 8px;
  border: 1px solid #ddd;
}
#calc-btn {
  background: linear-gradient(135deg, #0b2c7d, #1a4dbe);
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}
#calc-btn:hover {
  background: linear-gradient(135deg, #091f5c, #133c9b);
}
#calc-result p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
}
`;
document.head.appendChild(modalStyle);x.setAttribute("aria-hidden", "true");
    }
  });
});


/* ================================
   Investment Plans Script
================================ */

// Plan data from HTML data attributes
const plans = Array.from(document.querySelectorAll(".plan-card")).map(card => ({
  name: card.dataset.plan,
  min: parseFloat(card.dataset.min),
  max: parseFloat(card.dataset.max),
  rate: parseFloat(card.dataset.rate),
  duration: parseInt(card.dataset.duration),
  referral: parseFloat(card.dataset.referral),
  bonus: card.dataset.bonus ? parseFloat(card.dataset.bonus) : 0
}));

/* ================================
   Calculator Modal
================================ */
const modal = document.createElement("div");
modal.classList.add("calc-modal");
modal.innerHTML = `
  <div class="calc-content">
    <span class="calc-close">&times;</span>
    <h3 id="calc-title">Plan Calculator</h3>
    <p id="calc-range"></p>
    <label for="calc-amount">Enter Deposit ($):</label>
    <input type="number" id="calc-amount" min="0" />
    <button id="calc-btn">Calculate</button>
    <div id="calc-result"></div>
  </div>
`;
document.body.appendChild(modal);

const modalClose = modal.querySelector(".calc-close");
const modalTitle = modal.querySelector("#calc-title");
const modalRange = modal.querySelector("#calc-range");
const modalAmount = modal.querySelector("#calc-amount");
const modalBtn = modal.querySelector("#calc-btn");
const modalResult = modal.querySelector("#calc-result");

let activePlan = null;

// Open modal when "View calculator" clicked
document.querySelectorAll(".plan-cta").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    activePlan = plans[index];
    modal.style.display = "flex";
    modalTitle.textContent = `${activePlan.name} Plan Calculator`;
    modalRange.textContent = `Range: $${activePlan.min.toLocaleString()} - $${activePlan.max.toLocaleString()}`;
    modalAmount.value = "";
    modalResult.innerHTML = "";
  });
});

// Close modal
modalClose.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// Handle calculation
modalBtn.addEventListener("click", () => {
  const deposit = parseFloat(modalAmount.value);
  if (isNaN(deposit) || deposit < activePlan.min || deposit > activePlan.max) {
    modalResult.innerHTML = `<p style="color:red">Please enter between $${activePlan.min.toLocaleString()} and $${activePlan.max.toLocaleString()}.</p>`;
    return;
  }

  // Compound calculation
  let finalAmount = deposit;
  for (let i = 0; i < activePlan.duration; i++) {
    finalAmount *= 1 + activePlan.rate;
  }
  finalAmount += activePlan.bonus;

  modalResult.innerHTML = `
    <p><strong>Projected ROI:</strong></p>
    <p>Initial: $${deposit.toLocaleString()}</p>
    <p>Final: $${finalAmount.toFixed(2).toLocaleString()}</p>
    <p>Referral Bonus: ${activePlan.referral}%</p>
    ${activePlan.bonus ? `<p>Signup Bonus: $${activePlan.bonus}</p>` : ""}
  `;
});

/* ================================
   Comparison Table
================================ */
const sampleDeposits = [500, 5000, 50000, 200000];
const comparisonBody = document.getElementById("comparisonBody");

function calculateROI(deposit, plan) {
  if (deposit < plan.min) return "-";
  let finalAmount = deposit;
  for (let i = 0; i < plan.duration; i++) {
    finalAmount *= 1 + plan.rate;
  }
  finalAmount += plan.bonus;
  return `$${finalAmount.toFixed(2).toLocaleString()}`;
}

function populateComparisonTable() {
  comparisonBody.innerHTML = "";
  sampleDeposits.forEach(deposit => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>$${deposit.toLocaleString()}</td>
      ${plans.map(plan => `<td>${calculateROI(deposit, plan)}</td>`).join("")}
    `;
    comparisonBody.appendChild(row);
  });
}

populateComparisonTable();

/* ================================
   Modal Styling (inline injection)
   - keeps your CSS clean
================================ */
const modalStyle = document.createElement("style");
modalStyle.textContent = `
.calc-modal {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.calc-content {
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.calc-close {
  position: absolute;
  right: 20px; top: 20px;
  font-size: 1.5rem;
  cursor: pointer;
}
#calc-amount {
  width: 100%;
  padding: 0.6rem;
  margin: 1rem 0;
  border-radius: 8px;
  border: 1px solid #ddd;
}
#calc-btn {
  background: linear-gradient(135deg, #0b2c7d, #1a4dbe);
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
}
#calc-btn:hover {
  background: linear-gradient(135deg, #091f5c, #133c9b);
}
#calc-result p {
  margin: 0.5rem 0;
  font-size: 0.95rem;
}
`;
document.head.appendChild(modalStyle);
