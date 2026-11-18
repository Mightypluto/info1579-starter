("use strict");

document.addEventListener("DOMContentLoaded", initializeCodex);

function initializeCodex() {
  const DATA = window.ENDLESS_WARS_DATA;
  const content = document.getElementById("content");
  const factionNavigation = document.getElementById("factionNavigation");
  const sidebar = document.getElementById("sidebar");

  if (!content || !factionNavigation) return;

  if (!DATA || !Array.isArray(DATA.rules) || !Array.isArray(DATA.factions)) {
    content.innerHTML = "<h1>Codex data error</h1><p>Check that data.js is loaded before script.js.</p>";
    console.error("ENDLESS_WARS_DATA missing or invalid.");
    return;
  }

  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[ch]);

  const headingNames = new Set([
    "victory cards", "secondary objectives", "base building & resources",
    "stats", "attacking", "turns & rounds", "map & terrain system",
    "set up.", "rolling.", "obstacles, command points, and resources points",
    "base builds.", "upgrades", "upgrades.", "ranged weapon stats",
    "melee weapon stats", "melee weapon stats.", "void abilities:",
    "lore description:", "lore description"
  ]);

  function isHeading(text, style) {
    const clean = String(text || "").trim();
    if (!clean) return false;
    if (/^Heading [1-6]$/i.test(style || "")) return true;
    if (headingNames.has(clean.toLowerCase())) return true;
    return clean.length < 48 && !/[.!?].+\s/.test(clean) &&
      (/^(vonian|commonwealth|diaft|infection|virus|corrupted|amisar|grog|cultists|void|the collector|sol.s pinnacle|command center|barracks|factory|storage|armory|garage|radio post|orbital post)/i.test(clean));
  }

  function renderBlock(block) {
    if (!block) return "";
    if (block.kind === "table" && Array.isArray(block.rows)) {
      return `<div class="table-container"><table><tbody>${block.rows.map((row, ri) =>
        `<tr>${row.map(cell => ri === 0
          ? `<th>${escapeHTML(cell)}</th>`
          : `<td>${escapeHTML(cell)}</td>`).join("")}</tr>`
      ).join("")}</tbody></table></div>`;
    }
    const text = escapeHTML(block.text || "");
    if (!text) return "";
    if (isHeading(block.text, block.style)) return `<h2>${text}</h2>`;
    if (/^\s*[-•]\s+/.test(block.text)) return `<ul><li>${text.replace(/^\s*[-•]\s+/, "")}</li></ul>`;
    return `<p class="content-block">${text}</p>`;
  }

  function renderBlocks(blocks) {
    return (blocks || []).map(renderBlock).join("");
  }

  function displayPage(title, description, html) {
    content.innerHTML = `<div class="article"><h1>${escapeHTML(title)}</h1>
      ${description ? `<p class="article-description">${escapeHTML(description)}</p>` : ""}
      ${html || '<div class="empty-state">No entries are available in this section.</div>'}</div>`;
    const crumb = document.getElementById("breadcrumbCurrent");
    if (crumb) crumb.textContent = title;
    if (sidebar) sidebar.classList.remove("open");
    const toggle = document.getElementById("menuToggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.querySelectorAll(".nav-link").forEach(button => button.classList.remove("active"));
  }

  function showHome() {
    displayPage("Endless Wars", "The rulebook, factions, and history of the Endless Wars tabletop strategy game.", `
      <div class="welcome-panel">
        <p class="eyebrow">STRATEGIC WARFARE DATABASE</p>
        <h2>Welcome to the Codex</h2>
        <p>Browse the rules, map and terrain system, units, weapons, buildings, factions, and lore.</p>
      </div>
      <div class="card-grid">
        ${[
          ["Core Rules","Learn the turn sequence, victory conditions, resources, and combat.","rules"],
          ["Factions","Explore each faction, its traits, units, and background.","factions"],
          ["Units & Squads","Browse the units recorded in the rulebook.","units"],
          ["Map & Terrain","Review map setup and terrain effects.","terrain"],
          ["Buildings","Review construction and base structures.","buildings"],
          ["History & Lore","Explore faction descriptions and story entries.","lore"]
        ].map(([title,desc,page]) => `<div class="codex-card"><h3>${title}</h3><p>${desc}</p><button data-page="${page}">Open Section</button></div>`).join("")}
      </div>
      <h2>Factions in this Codex</h2>
      <div class="card-grid">${DATA.factions.map((f,i) => `<div class="codex-card"><h3>${escapeHTML(f.name)}</h3><p>${escapeHTML(f.description || "")}</p><button data-faction-index="${i}">Open Faction</button></div>`).join("")}</div>
    `);
  }

  function showRules() {
    displayPage("Core Rules", "How to play, victory conditions, resources, statistics, combat, and turns.", renderBlocks(DATA.rules));
  }

  function buildFactionNavigation() {
    factionNavigation.innerHTML = "";
    DATA.factions.forEach((faction, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "nav-link faction-link";
      button.textContent = faction.name;
      button.dataset.factionIndex = index;
      factionNavigation.appendChild(button);
    });
  }

  function showFaction(index) {
    const faction = DATA.factions[index];
    if (!faction) return;
    displayPage(faction.name, faction.description || "", `
      <div class="faction-header">
        <h2>${escapeHTML(faction.name)}</h2>
        <p>${escapeHTML(faction.description || "")}</p>
      </div>
      ${renderBlocks(faction.blocks)}
    `);
  }

  function showAllFactions() {
    displayPage("Factions", "Select a faction to view its rules and lore.", `<div class="card-grid">
      ${DATA.factions.map((f,i) => `<div class="codex-card"><h3>${escapeHTML(f.name)}</h3><p>${escapeHTML(f.description || "")}</p><button data-faction-index="${i}">Open Faction</button></div>`).join("")}
    </div>`);
  }

  function allEntries() {
    const entries = [];
    DATA.rules.forEach(block => entries.push({ faction: "Core Rules", block, factionIndex: null }));
    DATA.factions.forEach((faction, index) => (faction.blocks || []).forEach(block =>
      entries.push({ faction: faction.name, block, factionIndex: index })));
    return entries;
  }

  const categories = {
    terrain: { title: "Map & Terrain", terms: ["terrain", "ruins", "forest", "water", "mountains", "craters", "trenches", "map", "zone", "tiles", "obstacle"] },
    units: { title: "Units & Squads", terms: ["squad", "infantry", "scout", "soldier", "hero", "vehicle", "recon", "fighter", "droid", "cultist", "form", "assassin", "warshal", "delamen", "berserker"] },
    weapons: { title: "Weapons", terms: ["weapon", "rifle", "pistol", "sword", "cannon", "spear", "musket", "blade", "damage", "launcher", "bomb", "bolt"] },
    buildings: { title: "Buildings", terms: ["building", "barracks", "factory", "storage", "armory", "garage", "command center", "radio post", "orbital post", "build"] },
    lore: { title: "History & Lore", terms: ["lore", "history", "immortal empire", "void", "galaxy", "emperor", "ruin", "war", "civilization", "born", "empire"] }
  };

  function blockText(block) {
    if (block.kind === "table") return block.rows.flat().join(" ");
    return block.text || "";
  }

  function showCategory(key) {
    const category = categories[key];
    if (!category) return;
    const groups = new Map();
    allEntries().forEach(entry => {
      const text = blockText(entry.block).toLowerCase();
      if (category.terms.some(term => text.includes(term))) {
        if (!groups.has(entry.faction)) groups.set(entry.faction, []);
        groups.get(entry.faction).push(entry.block);
      }
    });
    let html = "";
    groups.forEach((blocks, faction) => {
      html += `<section class="category-section"><h2>${escapeHTML(faction)}</h2>${renderBlocks(blocks)}</section>`;
    });
    displayPage(category.title, `Browse ${category.title.toLowerCase()} entries from the rulebook.`, html);
  }

  function searchCodex(query) {
    const term = query.trim().toLowerCase();
    if (!term) return;
    const results = allEntries().filter(entry => blockText(entry.block).toLowerCase().includes(term));
    const html = results.slice(0, 100).map(entry => `<div class="search-result">
      <h3>${escapeHTML(entry.faction)}</h3>${renderBlock(entry.block)}
      ${entry.factionIndex !== null ? `<button data-faction-index="${entry.factionIndex}">Open Faction</button>` : `<button data-page="rules">Open Core Rules</button>`}
    </div>`).join("");
    displayPage("Search Results", `${results.length} matching entries for "${query}".`, html || `<div class="empty-state">No matching entries found. Try another search term.</div>`);
  }

  document.addEventListener("click", event => {
    const factionButton = event.target.closest("[data-faction-index]");
    if (factionButton) {
      showFaction(Number(factionButton.dataset.factionIndex));
      return;
    }
    const pageButton = event.target.closest("[data-page]");
    if (!pageButton) return;
    const page = pageButton.dataset.page;
    if (page === "home") showHome();
    else if (page === "rules") showRules();
    else if (page === "factions") showAllFactions();
    else if (categories[page]) showCategory(page);
    else console.warn("Unknown page:", page);
  });

  const searchForm = document.getElementById("searchForm");
  if (searchForm) searchForm.addEventListener("submit", event => {
    event.preventDefault();
    searchCodex(document.getElementById("searchInput")?.value || "");
  });

  const menuToggle = document.getElementById("menuToggle");
  if (menuToggle) menuToggle.addEventListener("click", () => {
    if (!sidebar) return;
    const open = sidebar.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  buildFactionNavigation();
  showHome();
  console.log(`Endless Wars Codex loaded: ${DATA.rules.length} rulebook blocks; ${DATA.factions.length} factions.`);
}
