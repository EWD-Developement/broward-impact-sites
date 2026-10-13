/* ==========================================================================
   BROWARD IMPACT — ARCHITECTURAL LUXURY INTERACTIONS
   Faithfully inspired by Vira Door & Window (virawd.com)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initGlassCursor();
  initHeroBlueprintSpotlight();
  initHeaderScroll();
  initCatalogSimulators();
  initMobileNav();
});

/* --------------------------------------------------------------------------
   1. Interactive Glass Cursor (Focal Point Magnifier)
   -------------------------------------------------------------------------- */
function initGlassCursor() {
  const cursor = document.getElementById('glassCursor');
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let rafId = null;

  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        rafId = null;
      });
    }
  };

  const onMouseOver = (e) => {
    if (e.target.closest('[data-magnify]') || e.target.closest('.portfolio-card') || e.target.closest('.btn-primary-amber')) {
      cursor.classList.add('is-magnify');
    }
  };

  const onMouseOut = (e) => {
    if (e.target.closest('[data-magnify]') || e.target.closest('.portfolio-card') || e.target.closest('.btn-primary-amber')) {
      cursor.classList.remove('is-magnify');
    }
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseover', onMouseOver, { passive: true });
  document.addEventListener('mouseout', onMouseOut, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Showstopping Hero Blueprint Spotlight Mask
   -------------------------------------------------------------------------- */
function initHeroBlueprintSpotlight() {
  const hero = document.getElementById('heroSection');
  const mask = document.getElementById('heroBlueprintMask');
  if (!hero || !mask) return;

  const updateCoordinates = (clientX, clientY) => {
    const rect = hero.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--spotlight-x', `${x.toFixed(2)}%`);
    hero.style.setProperty('--spotlight-y', `${y.toFixed(2)}%`);
    mask.classList.add('active');
  };

  hero.addEventListener('mousemove', (e) => {
    updateCoordinates(e.clientX, e.clientY);
  }, { passive: true });

  hero.addEventListener('mouseleave', () => {
    mask.classList.remove('active');
  });

  hero.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  hero.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  hero.addEventListener('touchend', () => {
    mask.classList.remove('active');
  });
}

/* --------------------------------------------------------------------------
   3. Sticky Header Scroll Transition
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
      header.classList.remove('transparent-mode');
    } else {
      header.classList.remove('scrolled');
      header.classList.add('transparent-mode');
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   4. Daylight & Category 5 Storm Simulator
   -------------------------------------------------------------------------- */
const WINDOW_LIGHT_STATES = [
  {
    time: "8:00 AM",
    phase: "Sunrise Rake",
    tint: "linear-gradient(to bottom, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.08) 100%)",
    desc: "Low-angle Atlantic morning sun passes through the Low-E solar shield. Thermal break frames prevent exterior condensation while reflecting 78% of infrared heat.",
    filter: "contrast(1.02) brightness(1.04)"
  },
  {
    time: "12:00 PM",
    phase: "High Noon Florida Sun",
    tint: "linear-gradient(to bottom, rgba(244,247,245,0.18) 0%, rgba(244,247,245,0.05) 100%)",
    desc: "Intense subtropical UV radiation meets Florida Solar Heat Gain Coefficient (SHGC 0.22) laminated impact glass. Crystal-clear optical neutrality with zero green tint.",
    filter: "contrast(1.05) brightness(1)"
  },
  {
    time: "CAT 5 STORM",
    phase: "175 MPH Wind Resistance",
    tint: "linear-gradient(to bottom, rgba(14,15,17,0.65) 0%, rgba(14,15,17,0.3) 100%)",
    desc: "High Velocity Hurricane Zone (HVHZ) conditions: +95 / -120 PSF cyclic pressure. 7/16\" SGP interlayer deflects repeated 9-lb projectile strikes while the interior stays warm, dry, and silent.",
    filter: "contrast(1.2) brightness(0.85)"
  }
];

const DOOR_LIGHT_STATES = [
  {
    time: "8:00 AM",
    phase: "Morning Threshold",
    tint: "linear-gradient(to bottom, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.08) 100%)",
    desc: "Morning daylight crosses the 15mm flush architectural sill. Clean indoor-outdoor continuity with zero threshold stumble hazard.",
    filter: "contrast(1.02) brightness(1.04)"
  },
  {
    time: "12:00 PM",
    phase: "Zenith Ocean Light",
    tint: "linear-gradient(to bottom, rgba(244,247,245,0.18) 0%, rgba(244,247,245,0.05) 100%)",
    desc: "Full midday brilliance floods the coastal interior. Massive 12-foot spans glide effortlessly on precision stainless steel tandem rollers.",
    filter: "contrast(1.05) brightness(1)"
  },
  {
    time: "CAT 5 STORM",
    phase: "15 PSF Water Defense",
    tint: "linear-gradient(to bottom, rgba(14,15,17,0.65) 0%, rgba(14,15,17,0.3) 100%)",
    desc: "Driving tropical rain and wind load at 15 PSF water resistance. Concealed multi-point deadbolts compress dual EPDM weatherseals for absolute weather hermeticity.",
    filter: "contrast(1.2) brightness(0.85)"
  }
];

const DOOR_OPERATIONS = {
  pivot: "Massive single sweeping leaf on concealed hydraulic pivot hardware. Capable of supporting panels up to 12 feet tall and 800 lbs with effortless fingertip movement.",
  liftslide: "Active leaf lifts entirely onto its track before gliding silently across expansive multi-panel openings. Engineered for wide coastal patios.",
  folding: "Accordion-style folding stacking panels that fold completely flush against exterior or interior walls, opening up to 90% of the entire structural opening.",
  french: "Twin active impact doors with 5-point stainless deadbolt hardware, combining timeless European proportions with Florida HVHZ structural certification."
};

function initCatalogSimulators() {
  // Windows Simulator
  const winBtns = document.querySelectorAll('.win-sim-btn');
  const winTint = document.getElementById('winLightTint');
  const winImg = document.getElementById('winCatalogImg');
  const winDesc = document.getElementById('winSimDesc');
  const winBadge = document.getElementById('winSimBadge');

  winBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      winBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const state = WINDOW_LIGHT_STATES[idx];
      if (winTint) winTint.style.background = state.tint;
      if (winImg) winImg.style.filter = state.filter;
      if (winDesc) winDesc.textContent = state.desc;
      if (winBadge) winBadge.textContent = `${state.time} — ${state.phase}`;
    });
  });

  // Doors Simulator
  const doorBtns = document.querySelectorAll('.door-sim-btn');
  const doorTint = document.getElementById('doorLightTint');
  const doorImg = document.getElementById('doorCatalogImg');
  const doorDesc = document.getElementById('doorSimDesc');
  const doorBadge = document.getElementById('doorSimBadge');

  doorBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      doorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const state = DOOR_LIGHT_STATES[idx];
      if (doorTint) doorTint.style.background = state.tint;
      if (doorImg) doorImg.style.filter = state.filter;
      if (doorDesc) doorDesc.textContent = state.desc;
      if (doorBadge) doorBadge.textContent = `${state.time} — ${state.phase}`;
    });
  });

  // Door Operation Switcher
  const opBtns = document.querySelectorAll('.door-op-btn');
  const opNote = document.getElementById('doorOpNote');

  opBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      opBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const opKey = btn.getAttribute('data-op');
      if (opNote && DOOR_OPERATIONS[opKey]) {
        opNote.textContent = DOOR_OPERATIONS[opKey];
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Mobile Menu Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileNav = document.getElementById('mobileNavDrawer');
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileNav.style.display === 'flex';
    mobileNav.style.display = isOpen ? 'none' : 'flex';
    toggleBtn.textContent = isOpen ? 'MENU' : 'CLOSE';
  });

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.style.display = 'none';
      toggleBtn.textContent = 'MENU';
    });
  });
}
