# hair-saloon

Static website for the salon. Plain HTML, CSS and JavaScript, no build step.
Open `index.html` in a browser to view it.

## Files

- `index.html` – all page content (text, sections, links)
- `css/style.css` – design; colours and fonts are at the top in `:root`
- `js/main.js` – booking link, typing headline, reviews slider, mobile menu
- `images/` – placeholder images; replace with your own photos (keep the same file names, or update the `src` in `index.html`)

## Quick edits

- **Salon name, address, email:** search `index.html` for `Salon Name`, `Your City`, `hello@yoursalon.com`
- **Typing headline:** change `data-text="..."` on the `<h1>` in `index.html`
- **Booking link (Calendly):** set `bookingUrl` at the top of `js/main.js`; every "book" button uses it
- **Colours:** `--yellow`, `--cream`, `--teal`, `--stripe`, `--pink` in `css/style.css`
