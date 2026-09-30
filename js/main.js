// ==========================================================
// Site settings — edit these
// ==========================================================
const CONFIG = {
  // Calendly booking page; every "book" button opens it in a new tab
  bookingUrl: "https://calendly.com/vivpm99/30min",
  typingSpeedMs: 90,
};

// Point every "book" button at the booking link
document.querySelectorAll(".js-book").forEach((link) => {
  link.href = CONFIG.bookingUrl;
  if (CONFIG.bookingUrl.startsWith("http")) {
    link.target = "_blank";
    link.rel = "noopener";
  }
});

// Typing headline
const typing = document.querySelector(".typing");
if (typing) {
  const text = typing.dataset.text;
  const out = typing.querySelector(".typing-text");
  typing.setAttribute("aria-label", text);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    out.textContent = text;
  } else {
    let i = 0;
    const tick = () => {
      out.textContent = text.slice(0, ++i);
      if (i < text.length) setTimeout(tick, CONFIG.typingSpeedMs);
    };
    setTimeout(tick, 400);
  }
}

// Reviews: duplicate the list so the marquee loops seamlessly
document.querySelectorAll(".reviews-track").forEach((track) => {
  [...track.children].forEach((item) => {
    const copy = item.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    track.appendChild(copy);
  });
});

// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
if (toggle && mobileNav) {
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileNav.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setOpen(mobileNav.hidden));
  mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
}

// Footer year
document.querySelectorAll(".js-year").forEach((el) => (el.textContent = new Date().getFullYear()));
