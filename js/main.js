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

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Intro video: tall 9:16 version on portrait screens (phones), wide version everywhere else
const introVideo = document.querySelector(".intro-bg");
if (introVideo && introVideo.dataset.portraitSrc) {
  const wide = { base: "videos/salon", poster: "images/video-poster.jpg" };
  const tall = { base: introVideo.dataset.portraitSrc, poster: "images/video-poster-portrait.jpg" };
  const portrait = window.matchMedia("(max-aspect-ratio: 4/5)");
  let current = wide; // the HTML already loads the wide version
  const pick = () => {
    const want = portrait.matches ? tall : wide;
    if (want === current) return;
    current = want;
    const [webm, mp4] = introVideo.querySelectorAll("source");
    webm.src = `${want.base}.webm`;
    mp4.src = `${want.base}.mp4`;
    introVideo.poster = want.poster;
    introVideo.load();
    introVideo.play().catch(() => {});
  };
  pick();
  portrait.addEventListener("change", pick);
}

// Smooth scrolling: Lenis glides the page instead of jumping
let lenis = null;
if (window.Lenis && !reducedMotion) {
  document.documentElement.style.scrollBehavior = "auto";
  lenis = new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 });
}

// Scroll reveal: sections fade and slide up as they come into view
const revealTargets = [
  ".split-media", ".split-content", ".about > *", ".reviews", ".photo-strip img",
  ".promise > *", ".stylists > .eyebrow", ".stylists > .section-heading", ".stylists > .page-lead",
  ".stylist", ".page-intro > *", ".service", ".page-cta > *", ".visit-info", ".visit-map",
].join(",");
if ("IntersectionObserver" in window && !reducedMotion) {
  document.documentElement.classList.add("reveal-on");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(revealTargets).forEach((el) => {
    // items in the same row (stylists, services, strip photos) come in one after another
    const siblings = [...el.parentElement.children].filter((c) => c.matches(revealTargets));
    el.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(el) % 3, 2) * 0.12}s`);
    el.classList.add("reveal");
    observer.observe(el);
  });
}

// Typing headline
const typing = document.querySelector(".typing");
if (typing) {
  const text = typing.dataset.text;
  const out = typing.querySelector(".typing-text");
  typing.setAttribute("aria-label", text);
  if (reducedMotion) {
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

// Reviews: duplicate the list so the marquee loops seamlessly (no marquee, so no copies, when motion is reduced)
if (!reducedMotion) document.querySelectorAll(".reviews-track").forEach((track) => {
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
    if (lenis) open ? lenis.stop() : lenis.start();
  };
  toggle.addEventListener("click", () => setOpen(mobileNav.hidden));
  mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
}

// Custom cursor: only on devices with a real mouse or trackpad (phones keep normal touch)
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  const root = document.documentElement;
  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  dot.setAttribute("aria-hidden", "true");
  ring.setAttribute("aria-hidden", "true");
  document.body.append(dot, ring);
  root.classList.add("has-cursor");

  let x = -100, y = -100, rx = -100, ry = -100;
  const follow = reducedMotion ? 1 : 0.18; // how quickly the ring catches up with the dot
  window.addEventListener("mousemove", (e) => {
    x = e.clientX;
    y = e.clientY;
    dot.style.transform = `translate(${x}px, ${y}px)`;
    root.classList.add("cursor-visible");
    root.classList.toggle("cursor-hover", !!e.target.closest("a, button, video, [role='button']"));
  });
  document.addEventListener("mouseleave", () => root.classList.remove("cursor-visible"));
  window.addEventListener("mousedown", () => root.classList.add("cursor-down"));
  window.addEventListener("mouseup", () => root.classList.remove("cursor-down"));
  const loop = () => {
    rx += (x - rx) * follow;
    ry += (y - ry) * follow;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    requestAnimationFrame(loop);
  };
  loop();
}

// Footer year
document.querySelectorAll(".js-year").forEach((el) => (el.textContent = new Date().getFullYear()));
