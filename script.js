// Aggiungi l'anno corrente al footer
// Prendiamo lo <span id="year"> dal footer
const yearEl = document.getElementById("year");
// Se esiste, scrive l'anno corrente
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Toggle del menu mobile (apri/chiudi)
const menuBtn = document.getElementById("menu-button");      // bottone hamburger
const primaryNav = document.getElementById("primary-nav");   // nav principale

// Se entrambi sono nel DOM, abilitiamo il comportamento
if (menuBtn && primaryNav) {
  // Quando l'utente clicca sul bottone...
  menuBtn.addEventListener("click", () => {
    // aria-expanded è una stringa "true" o "false"
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    const next = !isOpen;  // inverte lo stato

    // Aggiorniamo aria-expanded (accessibilità)
    menuBtn.setAttribute("aria-expanded", String(next));
    // Aggiorniamo anche data-open sulla nav (per il CSS)
    primaryNav.setAttribute("data-open", String(next));
  });

  // Accessibilità: chiudere menu con tasto ESC
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menuBtn.setAttribute("aria-expanded", "false");
      primaryNav.setAttribute("data-open", "false");
    }
  });
}

// Evidenziazione del link attivo durante lo scroll della pagina
const nav = document.getElementById("primary-nav");
const navLinks = nav ? nav.querySelectorAll('a[href^="#"]') : []; // tutti i link interni

// Mappa che associa ogni sezione al suo link <a>
const sectionsMap = new Map();

navLinks.forEach((link) => {
  const id = link.getAttribute("href");
  const section = id ? document.querySelector(id) : null;
  if (section) sectionsMap.set(section, link);
});

// Funzione helper: rimuove aria-current da tutti i link e lo mette solo a quello attivo
function setActiveLink(activeSection) {
  navLinks.forEach((a) => a.removeAttribute("aria-current"));
  const link = sectionsMap.get(activeSection);
  if (link) link.setAttribute("aria-current", "page");
}

// Se il browser supporta IntersectionObserver e abbiamo sezioni mappate, osserviamo
if ("IntersectionObserver" in window && sectionsMap.size) {
  const observer = new IntersectionObserver(
    (entries) => {
      let best = null;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
      }
      if (best) setActiveLink(best.target);
    },
    {
      root: null,
      rootMargin: "-35% 0px -35% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  // Mettiamo sotto osservazione tutte le sezioni note
  sectionsMap.forEach((_link, section) => observer.observe(section));
} // <-- chiude l'if (IntersectionObserver)

// Fallback: se cambia l'hash (click a un'ancora), attiva subito il link
window.addEventListener("hashchange", () => {
  const current = document.querySelector(location.hash);
  if (current && sectionsMap.has(current)) setActiveLink(current);
});

// All’avvio: se c’è già un hash nell’URL, evidenzia subito
document.addEventListener("DOMContentLoaded", () => {
  const current = document.querySelector(location.hash);
  if (current && sectionsMap.has(current)) setActiveLink(current);
});

// UX mobile: quando clicchi una voce del menu, chiudi il pannello se era aperto
if (menuBtn && nav) {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuBtn.getAttribute("aria-expanded") === "true") {
        menuBtn.setAttribute("aria-expanded", "false");
        primaryNav.setAttribute("data-open", "false");
      }
    });
  });
}

/* Form contatti (demo) */
//Prendiamo il form
const form = document.querySelector(".form");

//Se esiste nella pagina
if (form) {
    form.addEventListener("submit", (e) => {
        //Evitiamo che la paginia si ricarichi
        e.preventDefault();

        // Recuperiamo i valori di Nome e Email
        const nome = document.getElementById("nome")?.value.trim();
        const email = document.getElementById("email")?.value.trim();

        //Se Nome ed Email sono vuoti, mostriamo un avviso e blocchiamo l'invio
        if (!nome || !email) {
            alert("Per favore compila i campi Nome ed Email.");
            return;
        }

        //Se tutto ok, mostriamo un messaggio di successo
        alert ("Grazie! Il tuo messaggio è stato inviato (demo).");

        //Ripulire i campi del form
        form.reset();
    });
}
