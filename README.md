# HackStark Official Website

A lightweight, responsive website for HackStark—a cybersecurity education and open-source security community focused on practical, ethical and responsible learning.

## Technology

- HTML5
- CSS3 with custom properties
- Vanilla JavaScript
- No frameworks, build-time UI libraries, trackers or frontend secrets

## Sections

- Hero and community learning pillars
- About, mission and vision
- Six cybersecurity focus areas
- Filterable open-source project showcase
- HackStark Academy video library
- Concise founder profile
- Verified community channels
- Responsible-security notice
- Direct contact options
- Privacy and responsible-use pages

## Features

- Responsive navigation with keyboard and Escape-key support
- Sticky navigation and active-section highlighting
- Dark and light themes saved as a device-local preference
- Accessible project filters and video expansion
- Optional current GitHub metadata with static fallbacks
- Copy-email action with an accessible status message
- Reduced-motion, higher-contrast and print accommodations
- Semantic metadata, JSON-LD, sitemap, robots file and social-card support
- A branded 1200 × 630 social preview card in `og.png`
- A transparent PNG logo and matching PNG favicon derived from the supplied `HackStark.JPG` identity

## Local development

The site works when `index.html` is opened directly. For behavior that requires a secure web origin or network requests, run a small local server from the project folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Production build

No build step or nested public folder is required. Every publishable site file lives in the project root and can be served directly.

## Deployment

### GitHub Pages

1. Push the project to a GitHub repository.
2. In repository settings, open **Pages**.
3. Publish directly from the branch root.
4. If the public origin changes, replace the current `https://hackstark.ahmedtalha470.chatgpt.site/` base URL in the HTML metadata, JSON-LD, `robots.txt` and `sitemap.xml` with the final HTTPS origin. Keep the trailing slash on the site root.

### Other static hosts

Upload the root-level website files. No server runtime, database or build step is required.

## Customization

- Design tokens and theme colors are at the top of `style.css`.
- The production palette follows `HackStark.JPG`: warm charcoal, sepia and parchment foundations with HackStark blue and security-green accents.
- Brand files are `hackstark-logo.png`, `hackstark-icon.png` and `favicon.png` in the project root.
- Organization, social and repository configuration is grouped at the top of `script.js`.
- Critical links and copy remain in HTML so the website still works without JavaScript.
- Only use community URLs that have been manually verified. The current production set intentionally omits unverified or unavailable historical profiles.

## GitHub API behavior

The site requests only public repository metadata, without a token, after the primary page has loaded. If GitHub is unavailable, rate-limited or blocked, static repository descriptions and links remain fully usable. No raw API error is shown to visitors.

## Accessibility

The site uses semantic landmarks, a skip link, visible focus styles, keyboard-operable controls, descriptive image text, practical touch targets and reduced-motion support. Content is not communicated by color alone.

## Responsible security

HackStark resources are for education, defensive research and authorized testing. Practice only on systems you own or have explicit permission to assess, preferably in isolated laboratory environments.
