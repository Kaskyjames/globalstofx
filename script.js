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
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('planModal');
  const modalTitle = document.getElementById('planModalTitle');
  const modalDeposit = document.getElementById('modalDeposit');
  const modalPayout = document.getElementById('modalPayout');
  const modalReferral = document.getElementById('modalReferral');
  const modalBonus = document.getElementById('modalBonus');
  const modalTerms = document.getElementById('modalTerms');
  const modalClose = document.querySelector('.modal-close');
  const planButtons = document.querySelectorAll('.plan-cta');

  // Format numbers as currency
  function formatCurrency(n) {
    return Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  // Compounding formula: principal × (1 + r)^days
  function compoundAmount(principal, dailyRate, days) {
    return principal * Math.pow(1 + dailyRate, days);
  }

  // Open Modal and populate with data
  function openModal(planEl) {
    const name = planEl.getAttribute('data-plan');
    const min = Number(planEl.getAttribute('data-min'));
    const max = Number(planEl.getAttribute('data-max'));
    const rate = Number(planEl.getAttribute('data-rate'));
    const duration = Number(planEl.getAttribute('data-duration'));
    const referral = Number(planEl.getAttribute('data-referral')) || 0;
    const bonus = Number(planEl.getAttribute('data-bonus')) || 0;

    modal.setAttribute('aria-hidden', 'false');
    modalTitle.textContent = `${name} Plan — Details`;

    modalDeposit.value = min;
    modalReferral.textContent = `${referral}%`;
    modalBonus.textContent = formatCurrency(bonus);

    modalTerms.textContent = `${name} Plan — Minimum deposit ${formatCurrency(min)}. Duration: ${duration} days. Daily interest: ${(rate*100).toFixed(2)}% compounded. Referral: ${referral}%. See Risk Disclosure.`;

    // Initial payout
    const payout = compoundAmount(min, rate, duration);
    modalPayout.textContent = formatCurrency(payout);

    // Update payout when user changes deposit
    modalDeposit.oninput = () => {
      let val = Number(modalDeposit.value);
      if (isNaN(val) || val < min) val = min;
      if (val > max) val = max;

      const payoutCalc = compoundAmount(val, rate, duration);
      modalPayout.textContent = formatCurrency(payoutCalc);
    };
  }

  // Attach event to plan buttons
  planButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.plan-card');
      if (card) openModal(card);
    });
  });

  // Close modal
  modalClose.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  // Accessibility: open modal with Enter key
  document.querySelectorAll('.plan-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') openModal(card);
    });
  });

  // Desktop hover parallax effect
  if (window.innerWidth >= 992) {
    document.querySelectorAll('.plan-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) - rect.width/2;
        const y = (e.clientY - rect.top) - rect.height/2;
        card.style.transform = `translateY(-8px) rotateX(${(y/rect.height)*2}deg) rotateY(${(x/rect.width)*2}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
});

// =========================
  // Count-up Animation Helper
  // =========================
  function animateCountUp(el, start, end, duration = 1200) {
    const range = end - start;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = start + range * progress;
      el.textContent = formatCurrency(value.toFixed(2));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // =========================
  // Comparison Table Builder
  // =========================
  const comparisonBody = document.getElementById('comparisonBody');
  if (comparisonBody) {
    const deposits = [500, 1000, 5000, 10000]; // sample deposits
    const plans = Array.from(document.querySelectorAll('.plan-card')).map(card => ({
      name: card.getAttribute('data-plan'),
      rate: Number(card.getAttribute('data-rate')),
      duration: Number(card.getAttribute('data-duration'))
    }));

    deposits.forEach(dep => {
      const row = document.createElement('tr');
      const depCell = document.createElement('td');
      depCell.textContent = formatCurrency(dep);
      row.appendChild(depCell);

      plans.forEach(plan => {
        const payout = compoundAmount(dep, plan.rate, plan.duration);
        const cell = document.createElement('td');
        // animate count-up (start at dep, grow to payout)
        animateCountUp(cell, dep, payout, 1500);
        row.appendChild(cell);
      });

      comparisonBody.appendChild(row);
    });
  }
