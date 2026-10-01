# hair-saloon

Static website for the salon. Plain HTML, CSS and JavaScript, no build step.
Open `index.html` in a browser to view it.

## Files

- `index.html` – all page content (text, sections, links)
- `css/style.css` – design; colours and fonts are at the top in `:root`
- `js/main.js` – booking link, typing headline, reviews slider, mobile menu
- `videos/salon.*` (wide, computers) + `videos/salon-portrait.*` (9:16, phones) – full-screen intro video, made from the original salon video (rotated upright, no sound); `images/video-poster.jpg` / `video-poster-portrait.jpg` are their still frames
- The six service cards use the site's original photos alongside concise descriptions
- `images/gallery-1.jpg` through `gallery-4.jpg` – frames from the salon video, showing the actual Keshwapur location

## Quick edits

- **Salon name, address, phone:** "Fashion TV Salon", the address and phone are in the header and footer of each `.html` file
- **Typing headline:** change `data-text="..."` on the `<h1>` in `index.html`
- **Booking link (Calendly):** set `bookingUrl` at the top of `js/main.js`; every "book" button uses it
- **Colours:** `--ivory`, `--ink`, `--gold`, `--champagne` at the top of `css/style.css` (taken from the salon: black signage, ivory walls, gold ceilings)

## Service and photo sources

The service grid was checked against the [FTV Salon and Academy listing](https://www.justdial.com/Hubli/FTV-Salon-and-Academy-Opposite-Convent-High-School-Keshawapur/0836PX836-X836-240227182106-F5K5_BZDET) and the salon's [Instagram](https://www.instagram.com/fsalonbyftv.hubli/). Hair spa and body polishing were removed because the available sources did not confirm them as specific offerings. Men's haircuts are covered by the haircut card. Generic stylist names, schedules and portraits were removed because they were placeholders, not verified staff.

The six service cards use the site's original service photos (`images/svc-*.jpg`).
