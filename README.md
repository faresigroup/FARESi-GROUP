# FARESI GROUP — Website

Static site (HTML + CSS + vanilla JS). GSAP, ScrollTrigger, Lenis and Three.js are loaded from CDNs.

## Run it
Open the folder in VS Code and use the **Live Server** extension (right-click `index.html` → *Open with Live Server*), or just open `index.html` in a browser.

## Structure
```
index.html              page markup (sections: home, about, services, process, work, why, contact)
css/styles.css          all styles; colour themes via [data-theme="blue|white|dark"] + CSS variables
js/content.js           EDIT HERE: CONFIG (WhatsApp, email, social links), SERVICES, STEPS, PROJECTS, WHY
js/render.js            DOM helpers + renders the data-driven sections from content.js
js/contact.js           contact buttons + inquiry form (FormSubmit, with mailto fallback)
js/services.js          services accordion
js/menu.js              mobile menu + smooth anchor navigation
js/scene.js             Three.js scene (services section)
js/motion.js            text splitting, Lenis, GSAP / ScrollTrigger animations
js/intro.js             hero entrance + intro sequence
js/main.js              entry point (runs motion -> scene -> intro)
assets/images/          logos, hero still, project images, favicons
assets/video/           hero video
```
Scripts are plain (non-module) files sharing one global scope, so keep the `<script>` order in `index.html`.

## Common edits
- **Contact details / socials**: `CONFIG` in `js/content.js`.
- **Add a project**: add an object to `PROJECTS` in `js/content.js` (`tag`, `name`, `d`, `img`, `alt`, `url`).
- **Inquiry form**: sends to `CONFIG.email` through FormSubmit. After deploying, submit one test message and click the activation link FormSubmit emails you (check Spam). If sending fails, the form falls back to opening the visitor's email app.
- **Hero video**: replace `assets/video/hero-video.mp4` and `assets/images/hero-still.webp`. The still replaces the video at ~4.3 s, before the video's own outro (see `js/intro.js` and `js/motion.js`).

`index.html` references `site.webmanifest`, which is not included; add one or remove that line.
