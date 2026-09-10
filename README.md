# HackStark Official Website

A lightweight, responsive website for HackStark—a cybersecurity education and open-source organization that grew from a learning community founded in 2015.

## Technology

- HTML5
- CSS3 with custom properties
- Vanilla JavaScript
- No frameworks, build-time UI libraries, trackers or frontend secrets

## Sections

- Hero and community learning pillars
- About, mission and vision
- HackStark at-a-glance facts and a four-stage defensive learning roadmap based on the supplied historical profile
- Six cybersecurity focus areas
- Filterable open-source project showcase
- Eight evidence-based founder security project groups with VAPT, OSINT, network, forensics and development filters
- HackStark Academy video library and complete beginner ethical-hacking course integrated into the homepage
- Concise founder profile
- Official community channels
- Responsible-security notice
- Direct contact options
- Privacy and responsible-use pages

## Features

- Responsive navigation with keyboard and Escape-key support
- Interactive organization-evolution timeline, scroll progress, animated facts and pointer-responsive content cards
- Focus-area actions that open JARVIS with the selected cybersecurity topic
- Sticky navigation and active-section highlighting
- Dark and light themes saved as a device-local preference
- Accessible project filters and video expansion
- Searchable, filterable 46-lesson course curriculum with accessible module accordions
- Three-state course progress stored only in the learner's browser
- Clear legacy-content, controlled-lab and unpublished-resource labels
- Optional current GitHub metadata with static fallbacks
- Accessible loading skeletons, progress indicators and visible fallback messaging for JARVIS and GitHub metadata
- Copy-email action with an accessible status message
- Direct Google contact-form action for professional inquiries and collaboration
- Ask JARVIS assistant with structured local knowledge covering HackStark's organization identity, community roots, history, mission, founder, learning pillars, focus areas, five public repositories, 10 featured videos, the broader course map, official channels and responsible-use guidance
- Reduced-motion, higher-contrast and print accommodations
- Semantic metadata, JSON-LD, sitemap, robots file and social-card support
- Consistent SVG/PNG favicon and Open Graph social-card metadata across every HTML page
- Privacy-minded system font stacks with no third-party font request
- Linked web app manifest with 192 × 192, 512 × 512 and maskable install icons
- RFC 9116 security contact at `/.well-known/security.txt`
- A branded 1200 × 630 social preview card in `og.png`
- Legacy PNG logo assets retained for compatibility with earlier references
- A simplified flat SVG security mark for current UI branding, with the original `HS.JPG` retained only as a small archival origins element
- Evidence-led project case studies covering problem, approach, technology, outcome, defensive use and source links

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
4. Set the verified permanent HTTPS origin in every canonical signal at once:

   ```bash
   node set-production-origin.mjs https://www.example.com
   ```

   The command updates the HTML canonical, Open Graph, Twitter and JSON-LD URLs; `robots.txt`; `sitemap.xml`; and the canonical and policy fields in `/.well-known/security.txt`. It rejects temporary `chatgpt.site` targets. Keep the trailing slash on the site root.

### Other static hosts

Upload the root-level website files. No server runtime, database or build step is required.

## Customization

- Design tokens and theme colors are at the top of `style.css`.
- The production style follows the supplied portfolio reference: near-black navy surfaces, emerald actions, cyan highlights, glass navigation and compact rounded cards.
- Typography uses privacy-minded system font stacks for headings, body copy and technical labels; no external font service is contacted.
- Current branding uses `hackstark-logo.svg`, `hackstark-mark.svg`, `hackstark-mark-mono.svg` and `favicon.svg`; legacy PNG variants remain in the project root for compatibility.
- Organization, founder, social, HackStark repository, founder project, video, course, statistics and history records live in the shared `hackstark-data.js` source consumed by both the page and JARVIS.
- The complete beginner course is integrated into `index.html`; its presentation and interaction live in `course.css` and `course.js`.
- JARVIS behavior and presentation live in `jarvis-aichatbot.js` and `jarvis-aichatbot.css`.
- JARVIS keeps dated public-profile metadata clearly labeled as a snapshot, distinguishes current verified links from historical references and answers dual-use security topics only at a defensive, authorized-lab level.
- Critical links and copy remain in HTML so the website still works without JavaScript.
- Only use community URLs that have been manually verified. The current production set intentionally omits unverified or unavailable historical profiles.

## GitHub API behavior

The site makes one request for the profile's public repositories, without a token, after the primary page has loaded and filters the five featured records locally. If GitHub is unavailable, rate-limited or blocked, static repository descriptions and links remain fully usable. No raw API error is shown to visitors.

## Accessibility

The site uses semantic landmarks, a skip link, visible focus styles, keyboard-operable controls, descriptive image text, practical touch targets and reduced-motion support. Content is not communicated by color alone.

## Production verification

After the permanent domain and redirects are live, run Lighthouse against the deployed origin and confirm that canonical URLs, redirect destinations and sitemap entries agree. Target LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1 at the 75th percentile.

## Responsible security

HackStark resources are for education, defensive research and authorized testing. Practice only on systems you own or have explicit permission to assess, preferably in isolated laboratory environments.
