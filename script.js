/**
 * RACE — Opportunities Board | script.js
 * Author : Senior Frontend Developer (Antigravity)
 * Purpose: Renders opportunity cards dynamically, powers the
 *          search + filter UI, and generates WhatsApp deep-links.
 */

/* ══════════════════════════════════════════════════════════════
   1. OPPORTUNITIES DATA
   Each object represents one project / workshop listing.
   Add, remove, or edit entries here to update the board.
══════════════════════════════════════════════════════════════ */
const opportunities = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    college: "Delhi Technical University",
    location: "Delhi",
    startDate: "12 April 2026",
    payout: "₹3,500",
    payoutValue: 3500, // numeric — used for payout range filter
    category: "Workshop",
    description:
      "Conduct an engaging one-day AI awareness workshop for final-year engineering students. Topics include ML basics, real-world use cases, and hands-on demos.",
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    college: "Pune Institute of Computer Technology",
    location: "Pune",
    startDate: "18 April 2026",
    payout: "₹4,000",
    payoutValue: 4000,
    category: "Bootcamp",
    description:
      "A two-day intensive HTML/CSS/JavaScript bootcamp for second-year students. You'll mentor 50+ participants and build 3 mini-projects together.",
  },
  {
    id: 3,
    title: "Cybersecurity Awareness Session",
    college: "Manipal Institute of Technology",
    location: "Manipal",
    startDate: "25 April 2026",
    payout: "₹2,500",
    payoutValue: 2500,
    category: "Session",
    description:
      "Deliver a 3-hour interactive session on ethical hacking, phishing attacks, and digital safety. Perfect for CS students exploring security as a career path.",
  },
  {
    id: 4,
    title: "Data Science Project Internship",
    college: "IIT Hyderabad",
    location: "Hyderabad",
    startDate: "1 May 2026",
    payout: "₹8,000",
    payoutValue: 8000,
    category: "Internship",
    description:
      "Join a live data science project on predictive analytics for smart cities. Work remotely with the research team over 4 weeks and publish a research paper.",
  },
  {
    id: 5,
    title: "UI/UX Design Sprint",
    college: "NID Ahmedabad",
    location: "Ahmedabad",
    startDate: "5 May 2026",
    payout: "₹5,000",
    payoutValue: 5000,
    category: "Sprint",
    description:
      "Lead a 2-day design thinking sprint for product design students. Participants will prototype apps using Figma. Requires strong portfolio in UX design.",
  },
  {
    id: 6,
    title: "Cloud Computing Workshop (AWS)",
    college: "VIT University",
    location: "Vellore",
    startDate: "10 May 2026",
    payout: "₹6,000",
    payoutValue: 6000,
    category: "Workshop",
    description:
      "Conduct an AWS cloud fundamentals workshop covering EC2, S3, Lambda, and serverless architecture. Participants receive a certificate on completion.",
  },
  {
    id: 7,
    title: "App Development Hackathon Mentor",
    college: "SRM Institute of Science",
    location: "Chennai",
    startDate: "15 May 2026",
    payout: "₹7,500",
    payoutValue: 7500,
    category: "Hackathon",
    description:
      "Mentor 20 student teams during a 24-hour hackathon focused on social-impact mobile apps. Provide technical guidance, code reviews, and judging support.",
  },
  {
    id: 8,
    title: "Blockchain & Web3 Seminar",
    college: "Amity University",
    location: "Noida",
    startDate: "20 May 2026",
    payout: "₹3,200",
    payoutValue: 3200,
    category: "Seminar",
    description:
      "Host a 4-hour seminar on blockchain fundamentals, smart contracts, and DeFi for MBA and CS students. Includes live MetaMask wallet demo.",
  },
];

/* ══════════════════════════════════════════════════════════════
   2. DOM ELEMENT REFERENCES
   Cache all elements we will interact with repeatedly.
══════════════════════════════════════════════════════════════ */
const cardsGrid = document.getElementById("cards-grid");
const noResults = document.getElementById("no-results");
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const locationFilter = document.getElementById("location-filter");
const payoutFilter = document.getElementById("payout-filter");
const resultsNumber = document.getElementById("results-number");
const statTotal = document.getElementById("stat-total");
const btnResetFilters = document.getElementById("btn-reset-filters");

/* ══════════════════════════════════════════════════════════════
   3. INITIALISE PAGE
══════════════════════════════════════════════════════════════ */

/**
 * Initialises the page on load:
 *  - Updates the hero stat with the live total count
 *  - Populates the location dropdown from the data
 *  - Renders all cards
 */
function init() {
  // Update hero stat dynamically
  if (statTotal) statTotal.textContent = opportunities.length;

  // Build location dropdown from unique locations in data
  populateLocationDropdown();

  // Render initial full list
  renderCards(opportunities);
}

/* ══════════════════════════════════════════════════════════════
   4. POPULATE LOCATION DROPDOWN
══════════════════════════════════════════════════════════════ */

/**
 * Reads unique city names from the data and injects them as
 * <option> elements into the location filter dropdown.
 */
function populateLocationDropdown() {
  // Collect unique, sorted locations
  const uniqueLocations = [
    ...new Set(opportunities.map((opp) => opp.location)),
  ].sort();

  // Inject each location as an <option>
  uniqueLocations.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = `📍 ${city}`;
    locationFilter.appendChild(option);
  });
}

/* ══════════════════════════════════════════════════════════════
   5. BUILD WHATSAPP LINK
══════════════════════════════════════════════════════════════ */

/**
 * Generates a WhatsApp deep-link for the given opportunity.
 * The message is pre-filled dynamically using the project data.
 *
 * @param {Object} opp - A single opportunity object from the data array
 * @returns {string} - Full WhatsApp URL with URL-encoded message
 */
function buildWhatsAppLink(opp) {
  const phoneNumber = "917988199822"; // International format: +91 (India) + number

  // Pre-filled message — uses real data from the opportunity object
  const message = `Hello, I am interested in the project: ${opp.title} at ${opp.college} starting on ${opp.startDate}. Please share more details.`;

  // URL-encode the message so special characters travel safely
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/* ══════════════════════════════════════════════════════════════
   6. CREATE CARD HTML
══════════════════════════════════════════════════════════════ */

/**
 * Builds and returns a single opportunity card DOM element.
 *
 * @param {Object} opp   - The opportunity data object
 * @param {number} index - Card index (used for staggered animation delay)
 * @returns {HTMLElement} - The constructed card <article> element
 */
function createCard(opp, index) {
  // Build the WhatsApp URL for this specific opportunity
  const waLink = buildWhatsAppLink(opp);

  // Create the card wrapper
  const card = document.createElement("article");
  card.className = "opp-card";
  card.setAttribute("role", "listitem");
  card.setAttribute("aria-label", `Opportunity: ${opp.title}`);

  // Stagger each card's animation by a small delay
  card.style.animationDelay = `${index * 0.08}s`;

  // Compose the card's inner HTML using a template literal
  card.innerHTML = `
    <!-- ── TOP: Title + Organization ── -->
    <div class="card-top">
      <span class="card-category-tag">${escapeHtml(opp.category)}</span>
      <h2 class="card-title">${escapeHtml(opp.title)}</h2>
      <p class="card-org">
        <span class="card-org-icon" aria-hidden="true">🏛️</span>
        ${escapeHtml(opp.college)}
      </p>
    </div>

    <!-- ── MIDDLE: Location, Date, Payout ── -->
    <div class="card-mid">
      <div class="card-meta-item">
        <span class="meta-label">Location</span>
        <span class="meta-value">
          <span class="meta-icon" aria-hidden="true">📍</span>
          ${escapeHtml(opp.location)}
        </span>
      </div>
      <div class="card-meta-item">
        <span class="meta-label">Start Date</span>
        <span class="meta-value">
          <span class="meta-icon" aria-hidden="true">📅</span>
          ${escapeHtml(opp.startDate)}
        </span>
      </div>
      <div class="card-meta-item" style="grid-column: 1 / -1;">
        <span class="meta-label">Payout / Stipend</span>
        <span class="meta-value payout">
          <span class="meta-icon" aria-hidden="true">💰</span>
          ${escapeHtml(opp.payout)}
        </span>
      </div>
    </div>

    <!-- ── BOTTOM: Description + Apply Button ── -->
    <div class="card-bottom">
      <p class="card-description">${escapeHtml(opp.description)}</p>
      <a
        href="${waLink}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-apply"
        id="apply-btn-${opp.id}"
        aria-label="Apply for ${escapeHtml(opp.title)} via WhatsApp"
      >
        <span class="btn-apply-icon" aria-hidden="true">
          <!-- WhatsApp icon (inline SVG for no CDN dependency) -->
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </span>
        Apply via WhatsApp
      </a>
    </div>
  `;

  return card;
}

/* ══════════════════════════════════════════════════════════════
   7. RENDER CARDS
══════════════════════════════════════════════════════════════ */

/**
 * Clears the grid and renders a new list of opportunity cards.
 * Shows the "no results" message if the list is empty.
 *
 * @param {Array} list - Filtered array of opportunity objects to display
 */
function renderCards(list) {
  // Clear the current grid
  cardsGrid.innerHTML = "";

  // Update the results count badge
  resultsNumber.textContent = list.length;

  if (list.length === 0) {
    // Show no-results message, hide grid
    cardsGrid.style.display = "none";
    noResults.style.display = "flex";
  } else {
    // Hide no-results, show grid with fresh cards
    noResults.style.display = "none";
    cardsGrid.style.display = "grid";

    // Create and append each card
    list.forEach((opp, index) => {
      const card = createCard(opp, index);
      cardsGrid.appendChild(card);
    });
  }
}

/* ══════════════════════════════════════════════════════════════
   8. FILTERING LOGIC
══════════════════════════════════════════════════════════════ */

/**
 * Reads the current values of all filters (search text, location,
 * payout range) and returns the filtered array of opportunities.
 *
 * @returns {Array} - Filtered opportunities matching all criteria
 */
function getFilteredOpportunities() {
  const query = searchInput.value.trim().toLowerCase();
  const location = locationFilter.value;
  const payout = payoutFilter.value;

  return opportunities.filter((opp) => {
    // ── Search filter (title + college + location) ──
    const matchesSearch =
      !query ||
      opp.title.toLowerCase().includes(query) ||
      opp.college.toLowerCase().includes(query) ||
      opp.location.toLowerCase().includes(query);

    // ── Location filter ──
    const matchesLocation = !location || opp.location === location;

    // ── Payout range filter ──
    let matchesPayout = true;
    if (payout === "low") matchesPayout = opp.payoutValue < 3000;
    if (payout === "mid")
      matchesPayout = opp.payoutValue >= 3000 && opp.payoutValue <= 6000;
    if (payout === "high") matchesPayout = opp.payoutValue > 6000;

    // All three conditions must pass
    return matchesSearch && matchesLocation && matchesPayout;
  });
}

/**
 * Applies all active filters and re-renders the cards.
 * Called whenever any filter input changes.
 */
function applyFilters() {
  const filtered = getFilteredOpportunities();
  renderCards(filtered);
}

/* ══════════════════════════════════════════════════════════════
   9. EVENT LISTENERS
══════════════════════════════════════════════════════════════ */

// ── Search: filter on every keystroke ──
searchInput.addEventListener("input", () => {
  // Show / hide the clear (✕) button
  searchClear.style.display = searchInput.value ? "block" : "none";
  applyFilters();
});

// ── Clear search button ──
searchClear.addEventListener("click", () => {
  searchInput.value = "";
  searchClear.style.display = "none";
  searchInput.focus();
  applyFilters();
});

// ── Location dropdown: filter on change ──
locationFilter.addEventListener("change", applyFilters);

// ── Payout dropdown: filter on change ──
payoutFilter.addEventListener("change", applyFilters);

// ── Reset all filters button (inside no-results message) ──
btnResetFilters.addEventListener("click", () => {
  searchInput.value = "";
  searchClear.style.display = "none";
  locationFilter.value = "";
  payoutFilter.value = "";
  applyFilters();
});

/* ══════════════════════════════════════════════════════════════
   10. UTILITY: HTML Escape (XSS prevention)
   Ensures user-facing data can't inject HTML into the DOM.
══════════════════════════════════════════════════════════════ */

/**
 * Escapes special HTML characters in a string to prevent XSS.
 *
 * @param {string} str - Raw string (e.g. from data object)
 * @returns {string}   - HTML-safe string
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ══════════════════════════════════════════════════════════════
   11. STICKY HEADER SHADOW
   Adds a subtle shadow to the header when user scrolls down.
══════════════════════════════════════════════════════════════ */
const siteHeader = document.getElementById("site-header");

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 20) {
      siteHeader.style.boxShadow = "0 4px 24px rgba(0,0,0,0.5)";
    } else {
      siteHeader.style.boxShadow = "none";
    }
  },
  { passive: true },
);

/* ══════════════════════════════════════════════════════════════
   12. BOOTSTRAP
   Run init() once the DOM is fully loaded.
══════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", init);
