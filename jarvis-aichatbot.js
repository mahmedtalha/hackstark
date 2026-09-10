(() => {
  "use strict";

  const DATA = window.hackstarkData;
  if (!DATA) {
    console.error("JARVIS could not load the shared HackStark data source.");
    return;
  }

  const onCoursePage = document.body.classList.contains("course-page");
  const homeSection = (hash) => onCoursePage ? `../index.html${hash}` : hash;
  const URLS = Object.freeze({
    about: homeSection("#about"),
    focus: homeSection("#focus"),
    projects: homeSection("#projects"),
    learn: onCoursePage ? "#course-top" : "#learn",
    course: "#course-top",
    curriculum: "#curriculum",
    founder: homeSection("#founder"),
    community: homeSection("#community"),
    responsible: onCoursePage ? "#learn-responsibly" : "#responsible-security",
    contact: homeSection("#contact"),
    github: DATA.socials.github,
    youtube: DATA.socials.youtube,
    facebook: DATA.socials.facebook,
    telegram: DATA.socials.telegramChannel,
    telegramGroup: DATA.socials.telegramContact,
    instagram: DATA.socials.instagram,
    founderGithub: DATA.socials.founderGithub,
    contactForm: DATA.socials.contactForm,
    linkedin: DATA.founder.linkedin,
    email: `mailto:${DATA.organization.email}`
  });

  const PROJECTS = DATA.projects;
  const PORTFOLIO_PROJECTS = DATA.portfolioProjects || [];
  const VIDEOS = DATA.videos;
  const COURSE_AREAS = DATA.courseAreas;
  const BEGINNER_COURSE = DATA.courses?.find((item) => item.id === "ethical-hacking-beginners");
  const HISTORICAL_PROFILE = DATA.history;

  const topicAnswer = (title, detail, actions = []) => response(`${title}: ${detail}\nHackStark discusses this only for education, defense and authorized testing.`, actions.length ? actions : [action("Responsible use", URLS.responsible), action("Academy", URLS.learn)]);

  const response = (answer, actions = []) => ({ answer, actions });
  const action = (label, url) => ({ label, url });
  const normalize = (value) => value.toLowerCase().normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, "")
    .replace(/[^a-z0-9+#.\-/\s]/g, " ").replace(/\s+/g, " ").trim();
  const includesAny = (text, phrases) => phrases.some((phrase) => text.includes(normalize(phrase)));
  const formatDate = (value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
  };
  const projectMetrics = (project) => {
    const live = DATA.runtime.repositories?.find((item) => item.name === project.repository);
    return {
      language: live?.language || project.language,
      updated: live?.updated_at ? formatDate(live.updated_at.slice(0, 10)) : formatDate(project.updated),
      stars: Number.isFinite(live?.stargazers_count) ? live.stargazers_count : project.stars,
      forks: Number.isFinite(live?.forks_count) ? live.forks_count : project.forks,
      branch: live?.default_branch || project.branch,
      license: live?.license?.spdx_id || project.license || "not declared",
      source: live ? "current GitHub data loaded by this page" : `reference snapshot ${formatDate(DATA.statistics.snapshotDate)}`
    };
  };

  class HackStarkKnowledge {
    async respond(question) {
      const q = normalize(question);
      if (!q) return response("Please enter a question about HackStark.");

      if (/^(hello|hi|hey|salam|assalam|good morning|good evening)(\s|$)/.test(q)) {
        return response("Hello. I’m JARVIS, the HackStark assistant. What would you like to explore?", [
          action("About HackStark", URLS.about), action("View projects", URLS.projects)
        ]);
      }

      if (includesAny(q, ["how to hack", "hack an account", "hack a website", "hack wifi", "bypass password", "bypass login", "steal password", "steal data", "ddos a", "dos a", "take down", "deploy malware", "make malware", "evade antivirus", "attack a real", "unauthorized access", "exploit a target"])) {
        return response("I can help with defensive cybersecurity education and authorized lab practice, but I can’t provide instructions for attacking real systems, bypassing access controls or disrupting services.", [
          action("Responsible security", URLS.responsible), action("Learning resources", URLS.learn)
        ]);
      }

      const portfolioProject = PORTFOLIO_PROJECTS.find((item) => item.aliases.some((alias) => q.includes(normalize(alias))));
      const project = PROJECTS.find((item) => item.aliases.some((alias) => q.includes(alias)));
      if (project && !portfolioProject) {
        const metrics = projectMetrics(project);
        return response(`${project.name}: ${project.description}\nRepository details from ${metrics.source}: language ${metrics.language}; created ${formatDate(project.created)}; last repository update ${metrics.updated}; ${metrics.stars} stars; ${metrics.forks} forks; default branch ${metrics.branch}; license ${metrics.license}.`, [
        action("Open repository", project.url), action("All projects", URLS.projects)
        ]);
      }

      if (portfolioProject) {
        const technologies = portfolioProject.technologies.join(", ");
        const sourceActions = portfolioProject.sources.map((source) => action(source.label, source.url));
        return response(`${portfolioProject.name} — ${portfolioProject.category}: ${portfolioProject.description}\nTechnologies: ${technologies}. This project is presented for defensive, authorized or controlled-lab use as applicable.`, [
          ...sourceActions, action("All projects", URLS.projects)
        ]);
      }

      const video = VIDEOS.find((item) => item.id.toLowerCase() === q || item.aliases.some((alias) => q.includes(alias)));
      if (video && (video.id.toLowerCase() === q || includesAny(q, ["video", "watch", "lesson", "tutorial", "youtube", "demo"]))) return response(`${video.title}\n${video.topic}\nThis is one of ${VIDEOS.length} official HackStark lessons currently featured on this website.`, [
        action("Watch on YouTube", video.url), action("Browse Academy", URLS.learn)
      ]);

      if (includesAny(q, ["who are you", "what can you answer", "what do you know", "your data", "knowledge base", "help me explore"])) {
        return response(`I’m JARVIS, HackStark’s local website assistant. My shared knowledge source includes the organization’s community roots, mission and learning philosophy; founder profile; ${DATA.focusAreas.length} focus areas; four learning pillars; ${PORTFOLIO_PROJECTS.length} founder security project groups; ${PROJECTS.length} HackStark public repositories; ${VIDEOS.length} official YouTube lessons; the broader course map; current community channels; legacy-link cautions; and responsible-security guidance. Live repository metadata is shared with the HackStark repository cards when available. I work without sending your question to an external AI service.`, [action("About HackStark", URLS.about), action("Course map", URLS.learn), action("Projects", URLS.projects)]);
      }

      if (includesAny(q, ["mission", "vision", "goal", "goals", "objective", "objectives", "purpose", "why hackstark", "gadget skills", "internet skills"])) {
        return response(`HackStark’s original goal in ${HISTORICAL_PROFILE.source} is to teach people what they can do with their gadgets, help them improve their internet skills and make hacking and internet concepts clearer. Today the organization expresses that purpose through practical cybersecurity education, authorized experimentation, ethical conduct, defensive thinking and open knowledge. Its vision is to build a skilled community that helps create safer digital environments.`, [
          action("Read the mission", URLS.about), action("Responsible security", URLS.responsible)
        ]);
      }

      if (includesAny(q, ["learn build secure share", "four pillars", "pillars", "learning philosophy"])) {
        return response("HackStark organizes its learning philosophy around four connected pillars:\n• Learn — build clear foundations and understand how technology behaves\n• Build — turn knowledge into tools, labs and open-source practice\n• Secure — think defensively and reduce real-world risk\n• Share — strengthen the community through accessible knowledge", [action("About HackStark", URLS.about), action("Focus areas", URLS.focus)]);
      }

      if (includesAny(q, ["logo", "brand", "colors", "colour", "visual identity", "hs.jpg", "hackstark image"])) {
        return response("HackStark’s current visual identity preserves the blue-and-green recognition of the supplied historical artwork in a simplified flat vector mark: a computer frame containing a defensive shield and verification check. The website uses near-black navy surfaces, emerald-green actions, cyan-blue highlights and privacy-minded system typography. HS.JPG remains only as a small, desaturated 2015 archival artifact.", [action("See HackStark", URLS.about)]);
      }

      if (includesAny(q, ["history", "started", "start year", "when did", "founded", "since 2015", "how old", "visual roots", "identity"])) {
        return response(`According to ${HISTORICAL_PROFILE.source}, HackStark has been active since ${HISTORICAL_PROFILE.communitySince}. It began as a penetration-testing learning community centered on IoT knowledge, gadgets and clearer internet skills. HackStark has since evolved into a cybersecurity education and open-source organization while retaining its community-first roots. The public GitHub account was created on 19 May 2020.`, [
          action("See visual roots", URLS.about), action("Meet the founder", URLS.founder)
        ]);
      }

      if (includesAny(q, ["founder", "ceo", "muhammad", "ahmed talha", "talha"])) {
        return response(`${DATA.founder.name} is ${DATA.founder.title}. He is a ${DATA.founder.role.toLowerCase()} focused on practical education, security research, open-source tools and community programs.`, [
          action("Founder profile", URLS.founder), action("Founder website", DATA.founder.website), action("LinkedIn", URLS.linkedin)
        ]);
      }

      if (includesAny(q, ["focus", "focus area", "focus areas", "focous", "focous area", "focous areas", "foucs", "foucs area", "foucs areas", "skills", "topics", "expertise", "specializations", "specialisations", "what do you teach", "what does hackstark teach", "what does hack stark teach", "what does the hackstark teach", "what can i learn", "what will i learn", "subjects taught", "learn about", "cybersecurity areas"])) {
        return response(`HackStark focuses on:\n${DATA.focusAreas.map((area) => `• ${area}`).join("\n")}`, [
          action("Explore focus areas", URLS.focus), action("Watch tutorials", URLS.learn)
        ]);
      }

      if (includesAny(q, ["who can learn", "target audience", "prerequisite", "programming experience", "coding experience", "absolute beginner"])) {
        return response(`${HISTORICAL_PROFILE.learningPromise} HackStark is designed for curious beginners as well as learners developing practical security skills. The recommended path starts with virtualization, Kali Linux lab setup, networking basics and ethical-hacking foundations before advancing to specialized topics. Programming becomes useful later for automation, tooling and understanding code, but it is not treated as an entry barrier.`, [action("Start with Academy", URLS.learn), action("Responsible use", URLS.responsible)]);
      }

      if (includesAny(q, ["raw data", "hackstark.txt", "original profile", "old profile", "original description", "describe original hackstark"])) {
        return response(`${HISTORICAL_PROFILE.source} describes HackStark as “${HISTORICAL_PROFILE.originalDescription}” It says the original community has been active since ${HISTORICAL_PROFILE.communitySince}, spent time learning and practicing penetration testing, and aimed to help people understand their gadgets, strengthen internet skills and clarify hacking concepts. It also says beginners do not need previous programming experience. These are historical self-descriptions; HackStark is now a cybersecurity education and open-source organization with a broader defensive-security and authorization-first position.`, [action("Current About page", URLS.about), action("Responsible use", URLS.responsible)]);
      }

      if (includesAny(q, ["who is hackstark", "what is hackstark", "about hackstark", "community", "organization", "organisation"])) {
        return response(`HackStark is an independent cybersecurity education and open-source organization that began as a learning community in ${HISTORICAL_PROFILE.communitySince}. Its original profile emphasized IoT in penetration testing, gadgets and better internet skills. Today the organization covers ethical hacking, network defense, IoT and wireless security, OSINT, Linux labs, security automation, tutorials, public projects and community programs—all framed around education and authorized use.`, [
          action("About HackStark", URLS.about), action("Join the community", URLS.community)
        ]);
      }

      if (includesAny(q, ["most starred", "popular repo", "most popular project", "github stats", "repository stats", "followers"])) {
        const ranked = PROJECTS.map((project) => ({ project, metrics: projectMetrics(project) })).sort((a, b) => b.metrics.stars - a.metrics.stars);
        const source = ranked[0].metrics.source;
        return response(`Using ${source}, HackStark has ${PROJECTS.length} featured public repositories. ${ranked[0].project.name} has the highest displayed star count at ${ranked[0].metrics.stars}; ${ranked.slice(1, 3).map(({ project: item, metrics }) => `${item.name} has ${metrics.stars}`).join(" and ")}. The profile follower count is ${DATA.statistics.githubFollowers} from the reference snapshot and is not refreshed by the repository request.`, [action("Open GitHub", URLS.github), action("View projects", URLS.projects)]);
      }

      if (includesAny(q, ["projects", "repositories", "repos", "open source", "github", "what have you built"])) {
        const metrics = PROJECTS.map((item) => ({ item, values: projectMetrics(item) }));
        const list = metrics.map(({ item, values }) => `• ${item.name} — ${values.language}; ${values.stars} stars; ${values.forks} forks`).join("\n");
        const portfolioList = PORTFOLIO_PROJECTS.map((item) => `• ${item.name} — ${item.category}`).join("\n");
        return response(`The website presents ${PORTFOLIO_PROJECTS.length} founder security project groups:\n${portfolioList}\n\nIt also preserves HackStark’s ${PROJECTS.length} featured public repositories (${metrics[0].values.source}):\n${list}`, [
          action("View projects", URLS.projects), action("Founder GitHub", URLS.founderGithub), action("HackStark GitHub", URLS.github)
        ]);
      }

      if (includesAny(q, ["curriculum", "course outline", "course map", "all topics", "syllabus", "modules"])) {
        return response(`HackStark Academy's ${BEGINNER_COURSE?.name || "beginner course"} contains ${BEGINNER_COURSE?.videoLessonCount || 46} video lessons, ${BEGINNER_COURSE?.numberedModuleCount || 21} numbered modules and ${BEGINNER_COURSE?.labLessonCount || 4} lab-setup lessons. It covers:\n${COURSE_AREAS.map((area) => `• ${area}`).join("\n")}\nLegacy and dual-use topics are clearly labeled and framed for defense, education and explicitly authorized labs.`, [action("Open curriculum", URLS.curriculum), action("Responsible use", URLS.responsible)]);
      }

      if (includesAny(q, ["official ceh", "ceh certification", "ec council", "certification course"])) {
        return response("The HackStark beginner course is independent education covering topics historically aligned with CEH v11-era domains. It is not official or authorized EC-Council certification training, and completion does not award CEH certification.", [action("Read course context", URLS.course), action("Official CEH information", BEGINNER_COURSE?.officialReferences?.ceh || "https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/")]);
      }

      if (includesAny(q, ["academy", "tutorial", "tutorials", "video", "videos", "youtube", "course", "beginner", "no programming", "kali lab", "learning path"])) {
        return response(`HackStark Academy offers a structured ${BEGINNER_COURSE?.level?.toLowerCase() || "beginner"}, self-paced Ethical Hacking Course for Beginners with ${BEGINNER_COURSE?.videoLessonCount || 46} lessons, ${BEGINNER_COURSE?.numberedModuleCount || 21} core modules and ${BEGINNER_COURSE?.labLessonCount || 4} lab-setup lessons. It begins with virtualization and Kali Linux, then progresses through reconnaissance, network and system security, vulnerability assessment, web security, wireless, mobile, IoT, cloud and cryptography. No previous penetration-testing experience is required.`, [
          action("Explore the course", URLS.course), action("Open curriculum", URLS.curriculum), action("YouTube channel", URLS.youtube)
        ]);
      }

      if (includesAny(q, ["iot", "internet of things", "wireless", "wifi", "wi-fi"])) {
        return topicAnswer("IoT and wireless security", "These are core HackStark learning areas. They cover connected-device risk, wireless networking, secure configuration and controlled assessment of networks and devices you own.", [action("View focus areas", URLS.focus), action("Responsible use", URLS.responsible)]);
      }

      if (includesAny(q, ["osint", "open source intelligence", "reconnaissance", "footprinting"])) {
        return response("OSINT is the lawful collection and analysis of publicly available information. HackStark teaches it as part of responsible reconnaissance, footprinting and defensive security assessment.", [action("OSINT resources", URLS.learn)]);
      }

      if (includesAny(q, ["nmap", "network scanning", "network security"])) {
        return response("HackStark covers network discovery, protocol analysis, infrastructure security and defensive monitoring. Its Nmap demonstration introduces host discovery, ping scanning and open-port identification on authorized systems.", [action("Watch network lessons", URLS.learn)]);
      }

      if (includesAny(q, ["security automation", "automation", "python scripting", "repeatable workflow"])) {
        return topicAnswer("Security automation", "HackStark uses Python and scripting to make authorized reconnaissance, network analysis, evidence collection and repeatable defensive workflows clearer and more consistent.", [action("Explore projects", URLS.projects), action("Academy", URLS.learn)]);
      }

      if (includesAny(q, ["vulnerability", "nikto", "nexpose", "insightvm"])) {
        return topicAnswer("Vulnerability analysis", "It is the process of identifying, validating and prioritizing weaknesses so owners can remediate them. HackStark’s historical course map mentions Nikto and Nexpose/InsightVM; scanners must be used only within an approved scope.");
      }

      if (includesAny(q, ["xss", "cross site scripting", "web application", "web security", "dvwa", "webgoat"])) {
        return topicAnswer("Web-application security", "HackStark covers reflected XSS concepts and intentionally vulnerable labs such as DVWA/WebGoat. Defenses include contextual output encoding, safe templating, input validation and Content Security Policy.", [action("Watch XSS lesson", VIDEOS[1].url), action("Responsible use", URLS.responsible)]);
      }

      if (includesAny(q, ["sql injection", "sqli"])) {
        return topicAnswer("SQL injection", "It occurs when untrusted input changes a database query. Key defenses are parameterized queries, least-privilege database accounts, validation and careful error handling. Practice only in an intentionally vulnerable lab.");
      }

      if (includesAny(q, ["sniffing", "wireshark", "ettercap", "packet capture", "traffic analysis", "netflow"])) {
        return topicAnswer("Traffic analysis", "Packet and flow analysis help defenders troubleshoot networks, detect anomalies and understand protocols. Capture only traffic you own or are explicitly authorized to inspect.");
      }

      if (includesAny(q, ["social engineering", "phishing", "human security"])) {
        return topicAnswer("Social-engineering awareness", "This area studies how attackers manipulate people. Defensive practice includes identity verification, phishing-resistant MFA, reporting processes and awareness training—never impersonating or deceiving real people without a sanctioned exercise.");
      }

      if (includesAny(q, ["denial of service", "ddos", "dos", "slow http", "slowloris"])) {
        return topicAnswer("Denial-of-service resilience", "HackStark’s slowlorisdos repository is framed as controlled-lab research. Defensive study focuses on rate limits, timeouts, reverse proxies, monitoring and incident response; no real service should be targeted.", [action("View lab repository", PROJECTS[3].url), action("Responsible use", URLS.responsible)]);
      }

      if (includesAny(q, ["malware", "virus", "trojan", "ransomware"])) {
        return topicAnswer("Malware threats", "HackStark’s broader learning map includes understanding malware categories and their defensive indicators. Safe learning uses isolated samples, reputable sandboxes and incident-response practices—not creation or deployment.");
      }

      if (includesAny(q, ["firewall", "ids", "ips", "honeypot", "session hijacking"])) {
        return topicAnswer("Network and session defense", "The historical course map covers IDS, firewalls, honeypots and session security. Defensive priorities include layered filtering, alert review, secure cookies, TLS, session rotation and rapid revocation.");
      }

      if (includesAny(q, ["cloud", "vps", "mobile security", "android security"])) {
        return topicAnswer("Platform security", "HackStark’s broader course map includes cloud/VPS and mobile-platform security. Core practices include least privilege, secure configuration, patching, encryption, logging and testing only assets within an approved scope.");

      }

      if (includesAny(q, ["cryptography", "cipher", "encryption"])) {
        return topicAnswer("Cryptography", "HackStark introduces classical ciphers through its Python SubstitutionCipher project. Classical substitution is educational, not suitable for protecting modern data; production systems should use reviewed modern cryptographic libraries.", [action("View cipher project", PROJECTS[4].url), action("All projects", URLS.projects)]);
      }

      if (includesAny(q, ["linux", "kali", "vmware", "lab", "labs"])) {
        return response("HackStark’s Linux learning path covers Kali Linux, package repositories, virtualization, security tooling and isolated practice labs. Labs should use systems you own or have explicit permission to assess.", [
          action("Linux projects", URLS.projects), action("Lab tutorials", URLS.learn)
        ]);
      }

      if (includesAny(q, ["ethical hacking", "penetration testing", "pentest", "responsible", "permission", "legal", "safe"])) {
        return response("HackStark supports ethical hacking only for education, defensive research and authorized testing. Practice on systems you own or have explicit permission to assess, preferably in isolated laboratories. Unauthorized access, disruption and data theft are not supported.", [action("Responsible-use principles", URLS.responsible)]);
      }

      if (includesAny(q, ["old link", "historical link", "instagram", "twitter", "x account", "whatsapp"])) {
        return response(`${HISTORICAL_PROFILE.source} historically listed Facebook ${HISTORICAL_PROFILE.historicalHandles.facebook}, Telegram group ${HISTORICAL_PROFILE.historicalHandles.telegramGroup}, Telegram channel ${HISTORICAL_PROFILE.historicalHandles.telegramChannel}, Instagram ${HISTORICAL_PROFILE.historicalHandles.instagram}, GitHub ${HISTORICAL_PROFILE.historicalHandles.github} and X/Twitter ${HISTORICAL_PROFILE.historicalHandles.twitter}. It also named three WhatsApp communities: ${HISTORICAL_PROFILE.historicalWhatsAppCommunities.join(", ")}. Because ownership and invite validity can change, JARVIS does not expose the old personal phone number or invite URLs as current. Use the website’s verified links first.`, [
          action("Official community links", URLS.community), action("Instagram reference", URLS.instagram)
        ]);
      }

      if (includesAny(q, ["join", "social", "telegram", "facebook", "connect", "follow"])) {
        return response("Current website channels are GitHub @hackstarkofficial, YouTube @hackstark8829, Telegram channel @hackstarkofficial, Telegram contact/community @hackstarkk, Facebook /hackstarkk and hackstarkofficial@gmail.com.", [
          action("Community links", URLS.community), action("Telegram channel", URLS.telegram), action("Telegram community", URLS.telegramGroup), action("YouTube", URLS.youtube)
        ]);
      }

      if (includesAny(q, ["contact", "email", "collaborate", "collaboration", "question"])) {
        return response("For professional inquiries or collaboration, use the Google contact form. You can also email HackStark at hackstarkofficial@gmail.com or use the official community channels.", [
          action("Google contact form", URLS.contactForm), action("Email HackStark", URLS.email), action("Contact options", URLS.contact)
        ]);
      }

      return response(`I couldn’t match that to the HackStark knowledge currently available to me. I can answer about the organization, its community roots, history, mission, founder, ${DATA.focusAreas.length} focus areas, ${PROJECTS.length} featured GitHub repositories, ${VIDEOS.length} YouTube lessons, broader course map, cybersecurity concepts, community channels and responsible-use policy.`, [
        action("About HackStark", URLS.about), action("Explore the website", URLS.focus)
      ]);
    }
  }

  const safeUrl = (url) => {
    if (url.startsWith("#")) return url;
    try {
      const parsed = new URL(url, window.location.href);
      return ["http:", "https:", "mailto:"].includes(parsed.protocol) ? url : "#";
    } catch { return "#"; }
  };

  class JarvisController {
    constructor(root) {
      this.root = root;
      this.provider = new HackStarkKnowledge();
      this.history = [];
      this.processing = false;
      this.welcomed = false;
      this.el = {
        launcher: root.querySelector("#jarvis-launcher"),
        window: root.querySelector("#jarvis-chat-window"),
        minimize: root.querySelector("#jarvis-minimize-btn"),
        close: root.querySelector("#jarvis-close-btn"),
        messages: root.querySelector("#jarvis-messages"),
        form: root.querySelector("#jarvis-form"),
        input: root.querySelector("#jarvis-text-input"),
        send: root.querySelector("#jarvis-send-btn"),
        clear: root.querySelector("#jarvis-clear-btn"),
        footerStatus: root.querySelector(".jarvis-footer-text")
      };
      this.bind();
      this.trackViewport();
    }

    bind() {
      this.el.launcher.addEventListener("click", () => this.toggle());
      this.el.close.addEventListener("click", () => this.close());
      this.el.minimize.addEventListener("click", () => this.toggleMinimize());
      this.el.clear.addEventListener("click", () => this.clear());
      this.el.form.addEventListener("submit", (event) => { event.preventDefault(); this.ask(this.el.input.value); });
      this.el.input.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); this.el.form.requestSubmit(); }
      });
      this.el.input.addEventListener("input", () => this.resizeInput());
      document.addEventListener("keydown", (event) => { if (event.key === "Escape" && this.isOpen()) this.close(); });
    }

    isOpen() { return this.el.window.classList.contains("jarvis-open"); }
    toggle() { this.isOpen() ? this.close() : this.open(); }

    open() {
      this.el.window.hidden = false;
      this.el.window.inert = false;
      requestAnimationFrame(() => this.el.window.classList.add("jarvis-open"));
      this.el.window.setAttribute("aria-hidden", "false");
      document.body.classList.add("jarvis-chat-visible");
      this.el.launcher.setAttribute("aria-expanded", "true");
      this.el.launcher.setAttribute("aria-label", "Close JARVIS — HackStark Assistant");
      if (this.el.window.classList.contains("jarvis-minimized")) this.toggleMinimize(false);
      if (!this.welcomed) this.showWelcome();
      this.resizeInput();
      window.setTimeout(() => this.el.input.focus(), 260);
    }

    close() {
      this.el.window.classList.remove("jarvis-open");
      this.el.window.setAttribute("aria-hidden", "true");
      document.body.classList.remove("jarvis-chat-visible");
      this.el.window.inert = true;
      this.el.launcher.setAttribute("aria-expanded", "false");
      this.el.launcher.setAttribute("aria-label", "Open JARVIS — HackStark Assistant");
      window.setTimeout(() => { if (!this.isOpen()) this.el.window.hidden = true; }, 260);
      this.el.launcher.focus();
    }

    toggleMinimize(force) {
      const minimized = typeof force === "boolean" ? force : !this.el.window.classList.contains("jarvis-minimized");
      this.el.window.classList.toggle("jarvis-minimized", minimized);
      this.el.minimize.textContent = minimized ? "□" : "−";
      this.el.minimize.setAttribute("aria-label", minimized ? "Restore JARVIS" : "Minimize JARVIS");
      this.el.minimize.setAttribute("aria-expanded", String(!minimized));
      this.el.minimize.title = minimized ? "Restore" : "Minimize";
    }

    showWelcome() {
      this.welcomed = true;
      this.addMessage("bot", response("Hello! I’m JARVIS, the HackStark organization assistant. I can help you explore cybersecurity learning topics, open-source projects, Academy tutorials, community channels and responsible-use guidance."), [
        ["About", "What is HackStark?"],
        ["Focus areas", "What does HackStark teach?"],
        ["Projects", "Show me HackStark projects"],
        ["Beginner course", "Tell me about the beginner course"],
        ["Curriculum", "Show the full course curriculum"],
        ["GitHub facts", "Show GitHub stats"],
        ["Founder", "Who founded HackStark?"],
        ["Join", "How can I join the community?"],
        ["Contact", "How can I contact HackStark?"]
      ]);
    }

    clear() {
      this.history = [];
      this.welcomed = false;
      this.el.messages.replaceChildren();
      this.showWelcome();
    }

    async ask(raw) {
      const question = raw.trim();
      if (!question || this.processing) return;
      this.processing = true;
      this.el.input.value = "";
      this.resizeInput();
      this.setProcessing(true);
      this.addMessage("user", response(question));
      this.history.push({ role: "user", content: question });
      const typing = this.showTyping();
      const started = performance.now();
      try {
        const answer = await this.provider.respond(question);
        const delay = Math.max(0, 360 - (performance.now() - started));
        if (delay) await new Promise((resolve) => window.setTimeout(resolve, delay));
        typing.remove();
        this.addMessage("bot", answer);
        this.history.push({ role: "assistant", content: answer.answer });
      } catch (error) {
        typing.remove();
        console.error("JARVIS could not answer.", error);
        this.addMessage("bot", response("I couldn’t generate that response. Your question was not lost—please try again, or use the HackStark links below.", [action("Explore HackStark", URLS.about)]), [
          ["Try again", question], ["Assistant help", "What can you answer?"]
        ], "error");
      } finally {
        this.processing = false;
        this.setProcessing(false);
      }
    }

    setProcessing(value) {
      this.el.send.disabled = value;
      this.el.input.disabled = value;
      this.el.send.setAttribute("aria-busy", String(value));
      this.root.classList.toggle("jarvis-processing", value);
      if (this.el.footerStatus) this.el.footerStatus.textContent = value ? "Generating a HackStark response…" : "HackStark knowledge • No API key exposed";
    }

    addMessage(role, payload, quickActions = [], tone = "") {
      const wrapper = document.createElement("article");
      wrapper.className = `jarvis-msg jarvis-msg-${role}`;
      if (tone) wrapper.classList.add(`jarvis-msg-${tone}`);
      if (role === "bot") {
        const avatar = document.createElement("span");
        avatar.className = "jarvis-msg-avatar";
        avatar.setAttribute("aria-hidden", "true");
        avatar.innerHTML = '<svg viewBox="0 0 24 24"><path d="M7 7h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3Z"/><path d="M8 12h.01M16 12h.01M8.5 16h7"/></svg>';
        wrapper.append(avatar);
      }
      const bubble = document.createElement("div");
      bubble.className = "jarvis-msg-bubble";
      const meta = document.createElement("div");
      meta.className = "jarvis-msg-meta";
      meta.textContent = `${role === "bot" ? "JARVIS" : "YOU"} • ${new Intl.DateTimeFormat([], { hour: "2-digit", minute: "2-digit" }).format(new Date())}`;
      bubble.append(meta, this.renderText(payload.answer));
      if (payload.actions?.length) bubble.append(this.renderActions(payload.actions));
      if (quickActions.length) bubble.append(this.renderQuickActions(quickActions));
      wrapper.append(bubble);
      this.el.messages.append(wrapper);
      this.scrollLatest();
    }

    renderText(text) {
      const box = document.createElement("div");
      box.className = "jarvis-msg-text";
      let list;
      text.split("\n").forEach((line) => {
        if (line.startsWith("• ")) {
          if (!list) { list = document.createElement("ul"); box.append(list); }
          const item = document.createElement("li");
          item.textContent = line.slice(2);
          list.append(item);
        } else if (line.trim()) {
          const paragraph = document.createElement("p");
          paragraph.textContent = line;
          box.append(paragraph);
        }
      });
      return box;
    }

    renderActions(actions) {
      const container = document.createElement("div");
      container.className = "jarvis-actions";
      actions.forEach((item) => {
        const link = document.createElement("a");
        link.className = "jarvis-action-btn";
        link.href = safeUrl(item.url);
        link.textContent = item.label;
        if (!item.url.startsWith("#") && !item.url.startsWith("mailto:")) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
        if (item.url.startsWith("#")) link.addEventListener("click", () => this.close());
        container.append(link);
      });
      return container;
    }

    renderQuickActions(actions) {
      const container = document.createElement("div");
      container.className = "jarvis-quick-actions";
      actions.forEach(([label, question]) => {
        const button = document.createElement("button");
        button.className = "jarvis-chip";
        button.type = "button";
        button.textContent = label;
        button.addEventListener("click", () => this.ask(question));
        container.append(button);
      });
      return container;
    }

    showTyping() {
      const row = document.createElement("div");
      row.className = "jarvis-typing-row";
      row.setAttribute("role", "status");
      row.setAttribute("aria-label", "JARVIS is generating a response");
      row.innerHTML = '<div class="jarvis-typing"><span class="jarvis-loading-spinner" aria-hidden="true"></span><span>Generating response</span><span class="jarvis-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="jarvis-response-skeleton" aria-hidden="true"><i></i><i></i><i></i></span></div>';
      this.el.messages.append(row);
      this.scrollLatest();
      return row;
    }

    scrollLatest() { requestAnimationFrame(() => { this.el.messages.scrollTop = this.el.messages.scrollHeight; }); }
    resizeInput() {
      this.el.input.style.overflowY = "hidden";
      this.el.input.style.height = "auto";
      this.el.input.style.height = `${Math.min(this.el.input.scrollHeight, 96)}px`;
      if (this.el.input.scrollHeight > 96) this.el.input.style.overflowY = "auto";
    }

    trackViewport() {
      let queued = false;
      const update = () => {
        queued = false;
        const viewport = window.visualViewport;
        const width = viewport?.width || window.innerWidth;
        const height = viewport?.height || window.innerHeight;
        const left = viewport?.offsetLeft || 0;
        const top = viewport?.offsetTop || 0;
        const layoutWidth = document.documentElement.clientWidth || window.innerWidth;
        const layoutHeight = document.documentElement.clientHeight || window.innerHeight;
        document.documentElement.style.setProperty("--jarvis-viewport-width", `${width}px`);
        document.documentElement.style.setProperty("--jarvis-viewport-height", `${height}px`);
        document.documentElement.style.setProperty("--jarvis-viewport-right", `${Math.max(0, layoutWidth - left - width)}px`);
        document.documentElement.style.setProperty("--jarvis-viewport-bottom", `${Math.max(0, layoutHeight - top - height)}px`);
      };
      const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
      update();
      window.addEventListener("resize", schedule, { passive: true });
      window.addEventListener("orientationchange", schedule, { passive: true });
      window.visualViewport?.addEventListener("resize", schedule, { passive: true });
      window.visualViewport?.addEventListener("scroll", schedule, { passive: true });
    }
  }

  const root = document.querySelector("#jarvis-assistant");
  if (!root) return;
  const controller = new JarvisController(root);
  window.JarvisHackStarkAssistant = Object.freeze({
    open: () => controller.open(),
    close: () => controller.close(),
    ask: (question) => controller.ask(String(question || ""))
  });
})();
