# hair-saloon

Static website for the salon. Plain HTML, CSS and JavaScript, no build step.
Open `index.html` in a browser to view it.

## Files

- `index.html` – all page content (text, sections, links)
- `css/style.css` – design; colours and fonts are at the top in `:root`
- `js/main.js` – booking link, typing headline, reviews slider, mobile menu
- `videos/salon.webm` + `videos/salon.mp4` – intro video of the salon (cropped from the uploaded clip, no sound); keep both formats when replacing it, plus `images/video-poster.jpg` as its still frame
- `images/` – temporary stock photos from [Pexels](https://www.pexels.com/license/) (free for commercial use, no credit required); replace with your own salon photos, keeping the same file names

## Quick edits

- **Salon name, address, phone:** the Kannada name (ಫ್ಯಾಷನ್ ಟಿವಿ ಸಲೋನ್), address and phone are in the header and footer of each `.html` file
- **Typing headline:** change `data-text="..."` on the `<h1>` in `index.html`
- **Booking link (Calendly):** set `bookingUrl` at the top of `js/main.js`; every "book" button uses it
- **Colours:** `--yellow`, `--cream`, `--teal`, `--stripe`, `--pink` in `css/style.css`
