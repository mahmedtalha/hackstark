(() => {
  "use strict";

  const DATA = window.hackstarkData;
  if (!DATA) {
    console.error("JARVIS could not load the shared HackStark data source.");
    return;
  }

  const BEGINNER_COURSE = DATA.courses?.find((item) => item.id === "ethical-hacking-beginners");
  const CYBERSTART = DATA.cyberStartCourse || DATA.courses?.find((item) => item.id === "cyberstart-level-1");
  const OXEGE = DATA.oxegeCybersecurityProgram || DATA.courses?.find((item) => item.id === "oxege-professional-cybersecurity");
  const onCoursePage = document.body.classList.contains("course-page")
    || /\/(?:ethical-hacking-course|cyberstart|oxege-training)\.html$/.test(window.location.pathname);
  const homeSection = (hash) => onCoursePage ? `index.html${hash}` : hash;
  const siteAsset = (path) => path;
  const URLS = Object.freeze({
    about: homeSection("#about"),
    focus: BEGINNER_COURSE.toolsUrl,
    projects: homeSection("#projects"),
    learn: "ethical-hacking-course.html#learn",
    course: BEGINNER_COURSE.pageUrl,
    curriculum: BEGINNER_COURSE.curriculumUrl,
    cyberstart: CYBERSTART.pageUrl,
    cyberstartCurriculum: CYBERSTART.curriculumUrl,
    oxege: OXEGE.pageUrl,
    oxegeCurriculum: OXEGE.curriculumUrl,
    founder: homeSection("#founder"),
    experience: homeSection("#experience"),
    credentials: homeSection("#credentials"),
    community: homeSection("#community"),
    responsible: homeSection("#responsible-security"),
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
    resume: siteAsset(DATA.founder.resume),
    privacy: siteAsset(DATA.website.privacyPolicy),
    terms: siteAsset(DATA.website.termsOfService),
    techflyPoster: siteAsset(DATA.cyberStartCourse?.poster || "techfly-cyber-security-engineer-poster.jpg"),
    oxegePoster: siteAsset(DATA.oxegeCybersecurityProgram?.poster || "oxege-cyber-security-workshop-poster.jpg"),
    email: `mailto:${DATA.organization.email}`,
    founderEmail: `mailto:${DATA.founder.email}`,
    founderPhone: `tel:${DATA.founder.phone.replace(/[^+\d]/g, "")}`
  });

  const PROJECTS = DATA.projects;
  const PORTFOLIO_PROJECTS = DATA.portfolioProjects || [];
  const VIDEOS = DATA.videos;
  const COURSE_AREAS = DATA.courseAreas;
  const TRAINING_PARTNERS = DATA.trainingPartners || [];
  const LINKED_COURSE_LESSONS = BEGINNER_COURSE?.sections
    .flatMap((section) => section.modules)
    .flatMap((module) => module.lessons)
    .filter((lesson) => lesson.videoUrl).length || 0;
  const HISTORICAL_PROFILE = DATA.history;

  const topicAnswer = (title, detail, actions = []) => response(`${title}: ${detail}\nHackStark discusses this only for education, defense and authorized testing.`, actions.length ? actions : [action("Responsible use", URLS.responsible), action("Academy", URLS.learn)]);

  const response = (answer, actions = []) => ({ answer, actions });
  const action = (label, url) => ({ label, url });
  const normalize = (value) => value.toLowerCase().normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, "")
    .replace(/[^a-z0-9+#.\-/\s]/g, " ").replace(/\s+/g, " ").trim();
  const tokens = (value) => normalize(value).split(" ").filter(Boolean);
  const editDistance = (left, right) => {
    if (left === right) return 0;
    const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
    for (let row = 1; row <= left.length; row += 1) {
      let diagonal = previous[0];
      previous[0] = row;
      for (let column = 1; column <= right.length; column += 1) {
        const above = previous[column];
        previous[column] = Math.min(
          previous[column] + 1,
          previous[column - 1] + 1,
          diagonal + (left[row - 1] === right[column - 1] ? 0 : 1)
        );
        diagonal = above;
      }
    }
    return previous[right.length];
  };
  const fuzzyTokenMatch = (input, expected) => {
    if (input === expected) return true;
    if (expected.length <= 3 || input.length <= 3) return false;
    const tolerance = Math.max(input.length, expected.length) <= 6 ? 1 : 2;
    return editDistance(input, expected) <= tolerance;
  };
  const phraseMatches = (text, phrase) => {
    const normalizedText = normalize(text);
    const normalizedPhrase = normalize(phrase);
    if (!normalizedPhrase) return false;
    if (` ${normalizedText} `.includes(` ${normalizedPhrase} `)) return true;
    const textTokens = tokens(normalizedText);
    const phraseTokens = tokens(normalizedPhrase);
    return phraseTokens.every((expected) => textTokens.some((input) => fuzzyTokenMatch(input, expected)));
  };
  const includesAny = (text, phrases) => phrases.some((phrase) => phraseMatches(text, phrase));
  const contactTalha = (lead = "I don’t have a reliable answer for that yet.") => response(`${lead} You can contact Talha (T-A-L-H-A), Muhammad Ahmed Talha, directly at ${DATA.founder.email}, by phone/WhatsApp at ${DATA.founder.phone}, or through LinkedIn.`, [
    action("Email Talha", URLS.founderEmail), action("Call or WhatsApp", URLS.founderPhone), action("LinkedIn", URLS.linkedin), action("Contact form", URLS.contactForm)
  ]);
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

  const COURSES = [BEGINNER_COURSE, CYBERSTART, OXEGE];
  const currentCourse = COURSES.find((course) => window.location.pathname.endsWith(`/${course.pageUrl}`));
  const courseAliases = [
    /\b(?:course 0?1|course one|first course|ethical hacking course|beginner course|beginners course|hackstark course|self[ -]paced|51 reviews)\b/,
    /\b(?:cyberstart|cyber start|cyberstert|cybrstart|techfly|tech fly|tekfly|course 0?2|course two|second course)\b/,
    /\b(?:oxege|oxage|oxegee|ogexe|oche|ceh v13|ceh ai|587 topics|course 0?3|course three|third course|professional cybersecurity program)\b/
  ];
  const requestedCourses = (question) => {
    const expanded = question.replace(/\bcourses? (0?[123]) (and|vs|versus|or) (0?[123])\b/g, "course $1 $2 course $3");
    return COURSES.filter((course, index) => expanded.includes(normalize(course.name)) || courseAliases[index].test(expanded));
  };
  const isCourseQuestion = (question) => /\b(?:this course|this program|courses?|programs?|curriculums?|curricula|syllabus|pdfs?|fees?|prices?|costs?|charges?|pay|payments?|paypal|binance|usdt|btc|crypto|enroll?|enrollment|admission|lectures?|lessons?|topics?|reviews?|feedback|schedule|timing|batch|languages?|certificates?|certifications?|instructors?|teachers?|trainers?|support|duration|access|refunds?|cancellation|tools?|platforms?|software|previews?|posters?|contact|whatsapp)\b/.test(question)
    && !/\b(?:founder|talha|muhammad|jarvis|privacy|projects?|github|experience|resume|cv)\b/.test(question);
  const courseLanguages = (course) => new Intl.ListFormat("en", { type: "conjunction" }).format(course.teachingLanguages);
  const courseFees = (course) => {
    const inrOriginal = course.approximateInrOriginalPrice;
    const inrPrice = course.inrPrice ?? course.approximateInrPrice;
    const usdOriginal = course.usdOriginalPrice ?? course.approximateUsdOriginalPrice;
    const usdPrice = course.usdPrice ?? course.approximateUsdPrice;
    return `PKR ${course.originalPrice.toLocaleString("en-US")} → PKR ${course.price.toLocaleString("en-US")} · ${inrOriginal ? `₹${inrOriginal.toLocaleString("en-US")} → ` : ""}₹${inrPrice.toLocaleString("en-US")} INR · USD $${usdOriginal} → $${usdPrice}`;
  };
  const courseWhatsApp = (course, enroll = false) => `https://wa.me/923023070227?text=${encodeURIComponent(enroll
    ? `Hello, I would like to enroll in ${course.name}. Please confirm the active batch, available seats, fees, schedule and registration details.`
    : `Hello, I would like more information about ${course.name}. Please share the curriculum, fees, schedule and enrollment details.`)}`;
  const courseActions = (course) => [
    action("View Course", course.pageUrl),
    action("View Curriculum", course.curriculumUrl),
    action("Enroll Now", course === BEGINNER_COURSE ? course.enrollmentUrl : courseWhatsApp(course, true)),
    action("Contact on WhatsApp", courseWhatsApp(course))
  ];
  const courseSummary = (course) => {
    const format = course === BEGINNER_COURSE ? `${course.videoLessonCount}+ self-paced lessons · 25+ tools and platforms`
      : course === CYBERSTART ? `${course.lectureCount} lectures · ${course.durationHours} hours · ${course.topicCount} topics · ${course.batchDuration} online weekend batch\nSchedule: ${course.schedule}`
      : `${course.moduleCount} modules · ${course.topicCount} topics · ${course.duration} · Online + physical classes in ${course.physicalLocation}`;
    return `Course ${course.sequence}: ${course.name}\n${format}\nCourse Languages: ${courseLanguages(course)}\nListed fees: ${courseFees(course)}`;
  };

  class HackStarkKnowledge {
    async respond(question) {
      const q = normalize(question);
      if (!q) return response("Please enter a question about HackStark.");
      const namedCourses = requestedCourses(q);
      const asksAllCourses = /\b(?:all|three|3) (?:courses?|programs?)\b/.test(q);
      const selectedCourse = asksAllCourses ? null : namedCourses.length === 1 ? namedCourses[0]
        : namedCourses.length === 0 && isCourseQuestion(q) ? currentCourse : null;

      if (/^(hello|hi|hey|salam|assalam|good morning|good evening)(?: there| jarvis)?\.*$/.test(q)) {
        return response("Hello. I’m JARVIS, the HackStark assistant. What would you like to explore?", [
          action("About HackStark", URLS.about), action("View projects", URLS.projects)
        ]);
      }

      if (includesAny(q, ["how to hack", "hack an account", "hack a website", "hack wifi", "bypass password", "bypass login", "steal password", "steal data", "ddos a", "dos a", "take down", "deploy malware", "make malware", "evade antivirus", "attack a real", "unauthorized access", "exploit a target"])) {
        return response("I can help with defensive cybersecurity education and authorized lab practice, but I can’t provide instructions for attacking real systems, bypassing access controls or disrupting services.", [
          action("Responsible security", URLS.responsible), action("Learning resources", URLS.learn)
        ]);
      }

      const asksComparison = /\b(?:compare|comparison|difference|versus|vs)\b/.test(q) && (namedCourses.length > 0 || /\b(?:courses?|programs?)\b/.test(q));
      const asksCatalog = /\b(?:courses|programs)\b/.test(q) && /\b(?:what|which|available|show|list|offer|options|all|three|3)\b/.test(q);
      const asksFees = /\b(?:prices?|fees?|costs?|charges?)\b/.test(q);
      if (!asksFees && (asksComparison || (asksCatalog && (asksAllCourses || !namedCourses.length) && !/\b(?:pdfs?|curricula|curriculums?|languages?|reviews?)\b/.test(q)))) {
        const courses = namedCourses.length > 1 && !/\ball\b/.test(q) ? namedCourses : COURSES;
        return response(`${courses.map(courseSummary).join("\n\n")}\nTechFly and Oxege Technologies are independent training partners. Open a course page for its full curriculum and enrollment details.`, [...courses.map((course) => action(`Course ${course.sequence}: View Course`, course.pageUrl)), action("Compare Programs", homeSection("#courses"))]);
      }

      const portfolioProject = PORTFOLIO_PROJECTS.find((item) => includesAny(q, item.aliases));
      const project = PROJECTS.find((item) => includesAny(q, item.aliases));
      if (project && !portfolioProject) {
        const metrics = projectMetrics(project);
        return response(`${project.name}: ${project.description}\nRepository details from ${metrics.source}: language ${metrics.language}; created ${formatDate(project.created)}; last repository update ${metrics.updated}; ${metrics.stars} stars; ${metrics.forks} forks; default branch ${metrics.branch}; license ${metrics.license}.`, [
        action("Open repository", project.url), action("All projects", URLS.projects)
        ]);
      }

      if (portfolioProject) {
        const technologies = portfolioProject.technologies.join(", ");
        const sourceActions = portfolioProject.sources.map((source) => action(source.label, source.url));
        return response(`${portfolioProject.name}. Category: ${portfolioProject.category}. ${portfolioProject.description}\nTechnologies: ${technologies}. This project is presented for defensive, authorized or controlled lab use as applicable.`, [
          ...sourceActions, action("All projects", URLS.projects)
        ]);
      }

      const video = VIDEOS.find((item) => item.id.toLowerCase() === q || includesAny(q, item.aliases));
      if (video && (video.id.toLowerCase() === q || includesAny(q, ["video", "watch", "lesson", "tutorial", "youtube", "demo"]))) return response(`${video.title}\n${video.topic}\nThis is one of ${VIDEOS.length} official HackStark lessons currently featured on this website.`, [
        action("Watch on YouTube", video.url), action("Browse Academy", URLS.learn)
      ]);

      if (/\b(?:reviews?|feedback|testimonials?)\b/.test(q)) {
        if (selectedCourse && selectedCourse !== BEGINNER_COURSE) return response(`No learner reviews are currently published for ${selectedCourse.name} on this website. Course 1 has ${BEGINNER_COURSE.reviewCount} published reviews.`, [action("View Course", selectedCourse.pageUrl), action("Course 1 Reviews", BEGINNER_COURSE.reviewsUrl)]);
        return response(`${BEGINNER_COURSE.name} has ${BEGINNER_COURSE.reviewCount} reviews on its course page, below the curriculum. Select View 51 Reviews in the overview to jump there. Six reviews appear first; Show More Reviews reveals 24 more, and Show Even More Reviews reveals the remaining 21, bringing the total to 51.`, [action("View 51 Reviews", BEGINNER_COURSE.reviewsUrl), action("View Course", BEGINNER_COURSE.pageUrl)]);
      }

      if (/\b(?:pdfs?|download curriculum|download outline)\b/.test(q) && (selectedCourse || /\b(?:courses?|curriculums?|curricula|programs?|outline|download)\b/.test(q))) {
        if (selectedCourse) return response(`Download the curriculum PDF for ${selectedCourse.name}, or browse the curriculum on its dedicated course page.`, [action("Download Curriculum PDF", selectedCourse.curriculumPdf), action("View Curriculum", selectedCourse.curriculumUrl)]);
        return response("Download the curriculum PDF for Course 1, Course 2 or Course 3.", COURSES.map((course) => action(`Course ${course.sequence}: Curriculum PDF`, course.curriculumPdf)));
      }

      if (selectedCourse && /\b(?:certificates?|certifications?|accredited|official|ec council)\b/.test(q)) {
        const detail = selectedCourse === CYBERSTART
          ? "The TechFly poster lists certificate or career support. Confirm the certificate issuer, requirements and current batch terms directly before enrolling. It is not presented as an official CEH certification course."
          : selectedCourse === OXEGE
            ? "This is independent training aligned with CEH v13 / CEH AI subject areas. It is not official EC-Council courseware and does not award CEH certification. Confirm any separate completion-certificate terms directly."
            : "This is independent HackStark education and does not award EC-Council or CEH certification. Confirm any separate completion-certificate terms with HackStark before enrolling.";
        return response(`${selectedCourse.name}: ${detail}`, courseActions(selectedCourse));
      }

      if (selectedCourse && /\b(?:support|access period|access duration|lifetime access)\b/.test(q)) {
        const detail = selectedCourse === CYBERSTART
          ? "The supplied poster lists live classes, study material, lab access, expert mentors, and certificate or career support. Confirm what is included for the active batch and how long resources and support remain available."
          : "Confirm the access period, support arrangements and response times directly before paying. The website does not promise lifetime access or a fixed support period.";
        return response(`${selectedCourse.name}: ${detail}`, courseActions(selectedCourse));
      }

      if (/\b(?:free previews?|free lessons?|practical demonstrations?)\b/.test(q)) {
        const detail = selectedCourse && selectedCourse !== BEGINNER_COURSE
          ? `The published free video lessons on this site belong to Course 1. For ${selectedCourse.name}, contact the training team about a demo or preview.`
          : `Course 1 includes ${VIDEOS.length} published practical demonstrations. Three are shown first; select Show 2 More Lessons to see the rest.`;
        return response(detail, [action("Watch Free Previews", URLS.learn), ...(selectedCourse && selectedCourse !== BEGINNER_COURSE ? [action("Contact on WhatsApp", courseWhatsApp(selectedCourse))] : [action("View Course", URLS.course)])]);
      }

      if (selectedCourse && /\b(?:contact|whatsapp|phone)\b/.test(q) && !/\b(?:enroll|enrol|payment|pay|refund)\b/.test(q)) return response(`Contact on WhatsApp at +92 302 3070227 for ${selectedCourse.name}. Ask about fees, the curriculum, schedule and enrollment details.`, courseActions(selectedCourse));
      if (/\bwhatsapp\b/.test(q) && /\b(?:contact|number|phone|help)\b/.test(q) && !/\b(?:history|historical|group|community|payment|pay)\b/.test(q)) return response("Contact HackStark on WhatsApp at +92 302 3070227 for course questions, fees and enrollment help.", [action("Contact on WhatsApp", courseWhatsApp(selectedCourse || BEGINNER_COURSE))]);

      const asksTeachingLanguage = /\b(?:urdu|hindi|english)\b/.test(q)
        || (/\blanguages?\b/.test(q) && (/\b(?:course|program|class|lesson|training|teaching)\b/.test(q)
          || /^(?:what|which|in which) languages?\b/.test(q)));
      if (asksTeachingLanguage) {
        const course = selectedCourse || (/\b(?:beginner|beginners)\b/.test(q) ? BEGINNER_COURSE : null);
        if (course) return response(`${course.name} · Course Languages: ${courseLanguages(course)}.`, courseActions(course));
        return response(`Teaching languages:\n${DATA.courses.map((item) => `• ${item.name}: ${new Intl.ListFormat("en", { type: "conjunction" }).format(item.teachingLanguages)}`).join("\n")}`, [action("HackStark course", URLS.course), action("TechFly CyberStart", URLS.cyberstart), action("Oxege program", URLS.oxege)]);
      }

      if (selectedCourse && /\b(?:instructors?|teachers?|trainers?|who teaches|who teach|taught by|delivered by)\b/.test(q)) return response(`${selectedCourse.name} is delivered by ${DATA.founder.name}${selectedCourse === BEGINNER_COURSE ? ", founder and instructor at HackStark" : ` with independent training partner ${selectedCourse.provider || selectedCourse.organization}`}.`, [action("View Course", selectedCourse.pageUrl), action("Instructor Experience", URLS.experience), action("Contact on WhatsApp", courseWhatsApp(selectedCourse))]);

      if (selectedCourse === BEGINNER_COURSE && /\b(?:tools?|platforms?|software)\b/.test(q)) return response(`Course 1 covers 25+ tools and platforms, with ${BEGINNER_COURSE.technologyCount} named technologies including Kali Linux, VMware, Wireshark, SpiderFoot, Nikto and WebGoat. The tools section groups them by learning area.`, [action("View Tools & Platforms", BEGINNER_COURSE.toolsUrl), action("View Curriculum", BEGINNER_COURSE.curriculumUrl)]);

      if (!selectedCourse && /\b(?:curriculums?|curricula|syllabus|syllabi|course outline)\b/.test(q)) return response("Choose a curriculum: Course 1 has 50+ self-paced lessons; Course 2 has 16 lectures and 51 topics; Course 3 has 32 modules and 587 topics.", COURSES.map((course) => action(`Course ${course.sequence}: View Curriculum`, course.curriculumUrl)));

      if (includesAny(q, ["who are you", "what can you answer", "what do you know", "your data", "knowledge base", "help me explore"])) {
        return response(`I’m JARVIS, HackStark’s local website assistant. I can help with all three courses, dedicated course pages, curricula and PDFs, fees in PKR/INR/USD, teaching languages, enrollment, international payments, schedules, posters and Course 1’s 51 reviews. I also cover HackStark’s history and mission, Muhammad Ahmed Talha’s experience and skills, projects, community channels and responsible security guidance. I work without sending your question to an external AI service.`, COURSES.map((course) => action(`Course ${course.sequence}`, course.pageUrl)));
      }

      if (includesAny(q, ["jarvis privacy", "chat privacy", "chatbot privacy", "conversation data", "question data", "does jarvis store", "does jarvis send", "local assistant"])) {
        return response(`${DATA.website.jarvisPrivacy} Clearing or reloading the page removes the visible conversation. JARVIS is a rule-based website assistant, so it can still misunderstand a question; use its source links or contact Talha when confirmation matters.`, [action("Privacy Policy", URLS.privacy), action("Contact Talha", URLS.contact)]);
      }

      if (/\b(?:privacy|privacy policy|personal data|data collection|cookies|local storage|tracking)\b/.test(q)) {
        return response(`HackStark’s Privacy Policy explains account information processed through ${DATA.website.accountProvider}, communications you choose to send, basic technical information handled by hosting or authentication providers, browser preferences, external services, retention, security and privacy choices. HackStark says it does not currently sell personal information or use third-party advertising trackers.`, [action("Read Privacy Policy", URLS.privacy), action("Privacy contact", URLS.email)]);
      }

      if (includesAny(q, ["terms", "terms of service", "terms and conditions", "rules", "agreement"])) {
        return response("HackStark’s Terms of Service cover account responsibility, education-only and authorized use, independent course and partner-program status, intellectual property, external services, manual enrollment and payment review, availability, disclaimers, liability and security reporting.", [action("Read Terms of Service", URLS.terms), action("Responsible use", URLS.responsible)]);
      }

      if (includesAny(q, ["resume", "cv", "download resume", "download cv"])) {
        return response(`${DATA.founder.name}’s current website resume summarizes his CyberSecurity, VAPT, Red Team, instruction and IT infrastructure experience.`, [action("Download Resume / CV", URLS.resume), action("View experience", URLS.experience), action("LinkedIn", URLS.linkedin)]);
      }

      if (includesAny(q, ["linkedin", "linked in", "professional profile"])) {
        return response(`${DATA.founder.name}’s LinkedIn profile is linkedin.com/in/ahmedtalha470.`, [action("View LinkedIn", URLS.linkedin), action("Download Resume / CV", URLS.resume)]);
      }

      if (includesAny(q, ["account", "accounts", "login", "log in", "signin", "sign in", "signup", "sign up", "clerk", "password"])) {
        return response(`HackStark uses ${DATA.website.accountProvider} for sign-up, sign-in and account session management. Most public website content can be browsed without an account, but an existing signed-in account is required for HackStark course access activation. Passwords and external sign-in credentials are handled by Clerk or the selected identity provider, not by JARVIS.`, [action("Privacy Policy", URLS.privacy), action("Terms of Service", URLS.terms)]);
      }

      if (includesAny(q, ["poster", "course poster", "program poster", "flyer", "brochure"])) {
        if (selectedCourse?.poster) return response(`View the program poster for ${selectedCourse.name}. Confirm the active batch and enrollment details on WhatsApp.`, [action("View Program Poster", selectedCourse.poster), ...courseActions(selectedCourse)]);
        return response("The website includes supplied posters for the two instructor-led partner programs: TechFly CyberStart Level 1 and the Oxege Professional Cybersecurity & Ethical Hacking Program.", [action("TechFly poster", URLS.techflyPoster), action("Oxege poster", URLS.oxegePoster), action("Compare programs", homeSection("#courses"))]);
      }

      if (includesAny(q, ["price", "prices", "fee", "fees", "cost", "costs", "charges"])) {
        const courses = /\ball\b/.test(q) ? COURSES : namedCourses.length > 1 ? namedCourses : selectedCourse && !asksComparison ? [selectedCourse] : COURSES;
        return response(`Current listed course fees:\n${courses.map((course) => `• Course ${course.sequence} — ${course.name}: ${courseFees(course)}`).join("\n")}\nConfirm the final currency, amount, active batch and available seats before paying. INR prices are reference prices.`, courses.length === 1 ? courseActions(courses[0]) : [...courses.map((course) => action(`Course ${course.sequence}: View Fees`, course.enrollmentUrl)), action("Contact on WhatsApp", courseWhatsApp(BEGINNER_COURSE))]);
      }

      if (includesAny(q, ["payment", "pay", "paypal", "binance", "usdt", "bitcoin", "btc", "crypto", "enroll", "enrol", "enrollment", "admission", "buy course", "purchase course", "refund", "cancellation"])) {
        if (selectedCourse && selectedCourse !== BEGINNER_COURSE) return response(`For ${selectedCourse.name}, select Enroll Now or Contact on WhatsApp on its course page. Confirm the active batch, seats, fees, schedule, certificate terms and payment details directly before paying. International payments can be arranged through PayPal, Binance Pay, USDT, Bitcoin (BTC) or other crypto; confirm the recipient, final amount and crypto network first.`, courseActions(selectedCourse));
        return response(`${DATA.website.enrollment} For the self-paced course, create an account or sign in, confirm the payment method, pay and send your receipt with your account email on WhatsApp. International payments are accepted through PayPal, Binance Pay, USDT, Bitcoin (BTC), or other crypto by arrangement. Request the recipient, exact amount, currency, any fees and the crypto network before paying. Local JazzCash and Easypaisa transfers are charged in PKR; displayed INR prices are reference prices. Confirm the expected verification time, access period, support and refund eligibility before paying. Partner-program batches and enrollment terms are confirmed directly.`, selectedCourse === BEGINNER_COURSE ? courseActions(BEGINNER_COURSE) : [action("Enrollment steps", homeSection("#enrollment-guide")), action("Compare programs", homeSection("#courses")), action("Contact on WhatsApp", courseWhatsApp(BEGINNER_COURSE))]);
      }

      if (includesAny(q, ["mission", "vision", "goal", "goals", "objective", "objectives", "purpose", "why hackstark", "gadget skills", "internet skills"])) {
        return response(`HackStark’s original goal in ${HISTORICAL_PROFILE.source} is to teach people what they can do with their gadgets, help them improve their internet skills and make hacking and internet concepts clearer. Today the organization expresses that purpose through practical cybersecurity education, authorized experimentation, ethical conduct, defensive thinking and open knowledge. Its vision is to build a skilled community that helps create safer digital environments.`, [
          action("Read the mission", URLS.about), action("Responsible security", URLS.responsible)
        ]);
      }

      if (includesAny(q, ["learn build secure share", "four pillars", "pillars", "learning philosophy"])) {
        return response("HackStark organizes its learning philosophy around four connected pillars:\n• Learn: build clear foundations and understand how technology behaves\n• Build: turn knowledge into tools, labs and open source practice\n• Secure: think defensively and reduce practical risk\n• Share: strengthen the community through accessible knowledge", [action("About HackStark", URLS.about), action("Focus areas", URLS.focus)]);
      }

      if (includesAny(q, ["logo", "brand", "colors", "colour", "visual identity", "hs.jpg", "hackstark image"])) {
        return response("HackStark’s current visual identity uses the circular HackStark artwork featuring two masked figures, a shield, circuit details and the blue-to-green HackStark wordmark. The same artwork is used for the site header, footer, sign-in experience, browser favicon, Apple touch icon, Android/PWA icons and social preview. The website pairs it with near-black navy surfaces, emerald-green actions and cyan-blue highlights.", [action("See HackStark", URLS.about)]);
      }

      if (includesAny(q, ["history", "started", "start year", "when did", "founded", "since 2018", "how old", "visual roots", "identity"])) {
        return response(`According to ${HISTORICAL_PROFILE.source}, HackStark has been active since ${HISTORICAL_PROFILE.communitySince}. It began as a penetration testing learning community centered on IoT knowledge, gadgets and clearer internet skills. HackStark has since evolved into a cybersecurity education and open source organization while retaining its community roots. The public GitHub account was created on 19 May 2020.`, [
          action("See visual roots", URLS.about), action("Meet the founder", URLS.founder)
        ]);
      }

      if (includesAny(q, ["partner", "partners", "partnership", "owned by", "own company", "own companies", "hackstark own", "relationship with techfly", "relationship with oxege"])) {
        return response(`Muhammad Ahmed Talha works with two independent training partners: ${TRAINING_PARTNERS.map((partner) => partner.name).join(" and ")}. TechFly partners on ${CYBERSTART.name}, while Oxege Technologies partners on ${OXEGE.name}. Neither company is owned by Muhammad Ahmed Talha or HackStark.`, [action("Compare partner programs", homeSection("#courses")), action("Training experience", URLS.experience)]);
      }

      if (selectedCourse === OXEGE || includesAny(q, ["oxege", "oxage", "oxegee", "ogexe", "oche", "och", "professional cybersecurity program", "ceh v13", "ceh ai", "587 topics", "three month program", "3 month program"])) {
        if (includesAny(q, ["price", "fee", "cost", "charges", "payment"])) return response(`${OXEGE.name} is listed at PKR ${OXEGE.price.toLocaleString("en-US")} after a reduction from PKR ${OXEGE.originalPrice.toLocaleString("en-US")}. Approximate international pricing is USD $${OXEGE.approximateUsdPrice} after USD $${OXEGE.approximateUsdOriginalPrice}, or ₹${OXEGE.approximateInrPrice.toLocaleString("en-US")} INR after ₹${OXEGE.approximateInrOriginalPrice.toLocaleString("en-US")} INR.`, [action("View program pricing", homeSection("#courses")), action("Oxege curriculum", URLS.oxegeCurriculum)]);
        if (includesAny(q, ["online", "physical", "classroom", "rahim yar khan", "location", "venue"])) return response(`${OXEGE.name} is available online and as physical instructor-led classes in ${OXEGE.physicalLocation}.`, [action("Oxege program", URLS.oxege)]);
        if (includesAny(q, ["official", "authorized", "ec council", "certification", "accredited"])) return response(`${OXEGE.name} is independent professional training aligned with relevant CEH v13 / CEH AI subject areas. It is not official EC-Council courseware, is not presented as an EC-Council-authorized training program, and this website does not claim that it awards CEH certification.`, [action("Program context", URLS.oxege), action("Full curriculum", URLS.oxegeCurriculum)]);
        if (includesAny(q, ["who teach", "instructor", "specialist", "provider", "where", "employment", "contract", "partner"])) return response(`${OXEGE.name} is delivered with independent training partner ${OXEGE.organization} by ${OXEGE.instructor}, ${OXEGE.role}. Oxege Technologies is not owned by HackStark. The engagement is listed for ${OXEGE.year}.`, [action("Oxege program", URLS.oxege), action("Instructor experience", URLS.experience)]);
        if (includesAny(q, ["tool", "platform", "software"])) return response(`${OXEGE.name} references tools across ${OXEGE.toolGroups.length} practice groups, including ${OXEGE.toolGroups.flatMap((group) => group.tools).slice(0, 18).join(", ")}, and more. These are curriculum references for controlled, authorized learning.`, [action("Tools and curriculum", URLS.oxege), action("Responsible use", URLS.responsible)]);
        if (includesAny(q, ["curriculum", "syllabus", "module", "topic", "outline", "cover", "how many", "track"])) return response(`${OXEGE.name} is a ${OXEGE.duration.toLowerCase()} with ${OXEGE.moduleCount} numbered modules and ${OXEGE.topicCount} topics, plus Course Introduction and Cybersecurity Lab Setup. Part I contains ${OXEGE.coreModuleCount} CEH v13 / CEH AI-aligned core modules; Part II contains ${OXEGE.professionalModuleCount} professional cybersecurity modules.`, [action("Search all 587 topics", URLS.oxegeCurriculum)]);
        return response(`${courseSummary(OXEGE)}\n${OXEGE.description}\nOxege Technologies is an independent training partner.`, courseActions(OXEGE));
      }

      if (includesAny(q, ["three courses", "three programs", "all courses", "all programs", "compare courses", "compare programs", "course options"])) {
        return response(`${COURSES.map(courseSummary).join("\n\n")}\nTechFly and Oxege Technologies are independent training partners. The homepage shows three comparison boxes, three enrollment rows, then three course previews. Full details are on each dedicated course page.`, [...COURSES.map((course) => action(`Course ${course.sequence}: View Course`, course.pageUrl)), action("Compare Programs", homeSection("#courses"))]);
      }

      if (selectedCourse === CYBERSTART || includesAny(q, ["cyberstart", "cyber start", "cyberstert", "cybrstart", "techfly", "tech fly", "tekfly"])) {
        const asksDifference = includesAny(q, ["same", "difference", "ethical hacking course", "hackstark course", "separate"]);
        if (includesAny(q, ["price", "fee", "cost", "charges", "payment"])) return response(`${CYBERSTART.name} is listed at PKR ${CYBERSTART.price.toLocaleString("en-US")} after a reduction from PKR ${CYBERSTART.originalPrice.toLocaleString("en-US")}. Approximate international pricing is USD $${CYBERSTART.approximateUsdPrice} after USD $${CYBERSTART.approximateUsdOriginalPrice}, or ₹${CYBERSTART.approximateInrPrice.toLocaleString("en-US")} INR after ₹${CYBERSTART.approximateInrOriginalPrice.toLocaleString("en-US")} INR.`, [action("View program pricing", homeSection("#courses")), action("CyberStart curriculum", URLS.cyberstartCurriculum)]);
        if (includesAny(q, ["schedule", "timing", "time", "weekend", "days", "online", "batch"])) return response(`${CYBERSTART.name} is presented as an online ${CYBERSTART.batchDuration.toLowerCase()} weekend batch delivered with training partner TechFly. The listed schedule is ${CYBERSTART.schedule}.`, [action("TechFly program", URLS.cyberstart), action("View curriculum", URLS.cyberstartCurriculum)]);
        if (asksDifference) return response(`No. ${CYBERSTART.name}, the ${BEGINNER_COURSE.name}, and the Oxege professional program are separate. CyberStart is a ${CYBERSTART.durationHours}-hour instructor-led foundation program delivered with independent training partner TechFly. The HackStark course is HackStark's self-paced beginner program with ${BEGINNER_COURSE.videoLessonCount}+ lessons. Oxege is an independent training partner for the three-month professional program with ${OXEGE.moduleCount} modules and ${OXEGE.topicCount} topics.`, [action("CyberStart", URLS.cyberstart), action("All programs", homeSection("#courses"))]);
        if (includesAny(q, ["tool", "technology", "platform"])) return response(`${CYBERSTART.name} includes curriculum-supported technologies and concepts such as ${CYBERSTART.tools.join(", ")}. Tools are used only in supervised, authorized labs and intentionally vulnerable training environments where applicable.`, [action("Explore CyberStart", URLS.cyberstart), action("Responsible use", URLS.responsible)]);
        if (includesAny(q, ["assessment", "final practical", "final exam"])) return response(`${CYBERSTART.assessment.title} is Lecture 16. It covers ${CYBERSTART.assessment.areas.join(", ")}. The source curriculum does not state a grade, certificate or accreditation.`, [action("View Lecture 16", URLS.cyberstartCurriculum)]);
        if (includesAny(q, ["lab", "practical", "hands on", "hands-on"])) return response(`Yes. ${CYBERSTART.name} includes supervised, authorized laboratory exercises: ${CYBERSTART.practicalLabs.join("; ")}. Web-security practice uses intentionally vulnerable training environments such as DVWA, WebGoat and OWASP Juice Shop. ${CYBERSTART.safetyNotice}`, [action("Practical labs", URLS.cyberstart), action("Responsible use", URLS.responsible)]);
        if (includesAny(q, ["who teach", "instructor", "trainer", "where", "delivered", "partner"])) return response(`${CYBERSTART.name} is delivered by ${CYBERSTART.instructor}, ${CYBERSTART.instructorRole}, with independent training partner ${CYBERSTART.provider} in ${CYBERSTART.location}. TechFly is not owned by HackStark. The partner engagement is listed for ${CYBERSTART.year}.`, [action("Training experience", URLS.experience), action("CyberStart", URLS.cyberstart)]);
        if (includesAny(q, ["cover", "topic", "curriculum", "syllabus", "lecture", "how many", "outline"])) return response(`${CYBERSTART.name} contains ${CYBERSTART.lectureCount} lectures, ${CYBERSTART.durationHours} total hours and ${CYBERSTART.topicCount} topics. Its learning areas are:
${CYBERSTART.learningAreas.map((area) => `• ${area}`).join("\n")}`, [action("Full 16-lecture curriculum", URLS.cyberstartCurriculum)]);
        return response(`${courseSummary(CYBERSTART)}\n${CYBERSTART.description}\nDelivered by ${CYBERSTART.instructor} with independent training partner ${CYBERSTART.provider}, ${CYBERSTART.location}.`, courseActions(CYBERSTART));
      }

      if (includesAny(q, ["experience", "professional experience", "work experience", "career", "employment", "job history", "work history", "toyota", "sugar mills", "itsolera", "techfly", "oxege", "navttc", "udemy", "devcastle", "codealpha", "prodigy infotech"])) {
        const roles = DATA.founderExperience.map((item) => `• ${item.role}, ${item.organization} (${item.period}): ${item.summary}`).join("\n");
        return response(`${DATA.founder.name} has ${DATA.statistics.experienceClaim} years of experience across enterprise IT operations, CyberSecurity instruction, penetration testing and security projects. His professional record includes:\n${roles}`, [
          action("Professional experience", URLS.experience), action("LinkedIn", URLS.linkedin), action("Full portfolio", DATA.founder.website)
        ]);
      }

      if (includesAny(q, ["skill", "skills", "skilz", "founder skills", "talha skills", "tahla skills", "talha skilz", "tahla skilz", "technical expertise", "technical skills", "security tools", "infrastructure skills", "technology exposure", "active directory", "fortinet", "pfsense", "mikrotik", "powershell", "scapy", "sentinel", "crowdstrike", "wazuh"])) {
        const groups = [
          ["CyberSecurity & VAPT", DATA.founderSkills.cybersecurity],
          ["Security tools", DATA.founderSkills.tools],
          ["Networking & infrastructure", DATA.founderSkills.infrastructure],
          ["Scripting & technology exposure", DATA.founderSkills.exposure]
        ].map(([label, items]) => `${label}: ${items.join(", ")}`).join("\n");
        return response(`${DATA.founder.name}'s technical expertise includes:\n${groups}`, [action("Founder profile", URLS.founder), action("Projects", URLS.projects)]);
      }

      if (includesAny(q, ["education", "degree", "cgpa", "certificate", "certificates", "certification", "training", "islamia university", "iub", "cybrary", "isc2", "isc 2"])) {
        const credentials = DATA.founderTraining.map((item) => `• ${item.name} — ${item.provider} (${item.detail})`).join("\n");
        return response(`${DATA.founder.name} earned a ${DATA.founder.education.degree} from ${DATA.founder.education.institution}, with a CGPA of ${DATA.founder.education.cgpa}. Verified education and training listed on the site:\n${credentials}`, [action("Education & training", URLS.credentials), action("Full portfolio", DATA.founder.website)]);
      }

      if (includesAny(q, ["speaker", "panelist", "conference", "bzu", "ai threats", "quantum security", "human firewall"])) {
        return response(`${DATA.founder.name} served as a ${DATA.speaking.role} at the ${DATA.speaking.event} in ${DATA.speaking.date}. Topics included ${DATA.speaking.topics.join("; ")}.`, [action("Founder profile", URLS.founder), action("Speaking evidence", DATA.founder.evidence.speaking)]);
      }

      if (includesAny(q, ["open to work", "job opportunity", "job opportunities", "hire talha", "availability", "available for work"])) {
        return response(`${DATA.founder.name} is ${DATA.founder.availability.toLowerCase()}. He is based in ${DATA.founder.location}.`, [action("Email Muhammad", URLS.founderEmail), action("LinkedIn", URLS.linkedin), action("Experience", URLS.experience)]);
      }

      if (includesAny(q, ["contact muhammad", "contact talha", "email muhammad", "email talha", "phone muhammad", "phone talha", "talha whatsapp", "founder contact"])) {
        return response(`Contact ${DATA.founder.name} at ${DATA.founder.email}, phone/WhatsApp ${DATA.founder.phone}, or LinkedIn at linkedin.com/in/ahmedtalha470. He is based in ${DATA.founder.location}.`, [action("Email Muhammad", URLS.founderEmail), action("Call or WhatsApp", URLS.founderPhone), action("LinkedIn", URLS.linkedin)]);
      }

      if (includesAny(q, ["founder", "ceo", "muhammad", "mohammad", "mohammed", "muhamad", "ahmed talha", "ahmad talha", "talha", "talaha", "tahla", "who is he", "about him", "about talha", "profile talha"])) {
        return response(`${DATA.founder.name} is ${DATA.founder.title} and a ${DATA.founder.role}. ${DATA.founder.summary} His profile records ${DATA.statistics.managedWorkstationsClaim} workstations managed, ${DATA.statistics.trainedStudentsClaim} students trained and ${DATA.statistics.securityToolsAndProjectsClaim} projects and custom security tools. He is based in ${DATA.founder.location} and is ${DATA.founder.availability.toLowerCase()}.`, [
          action("Founder profile", URLS.founder), action("Founder website", DATA.founder.website), action("LinkedIn", URLS.linkedin)
        ]);
      }

      if (includesAny(q, ["focus", "focus area", "focus areas", "focous", "focous area", "focous areas", "foucs", "foucs area", "foucs areas", "skills", "topics", "expertise", "specializations", "specialisations", "what do you teach", "what does hackstark teach", "what does hack stark teach", "what does the hackstark teach", "what can i learn", "what will i learn", "subjects taught", "learn about", "cybersecurity areas"])) {
        return response(`HackStark focuses on:\n${DATA.focusAreas.map((area) => `• ${area}`).join("\n")}`, [
          action("Explore focus areas", URLS.focus), action("Watch tutorials", URLS.learn)
        ]);
      }

      if (includesAny(q, ["who can learn", "target audience", "prerequisite", "programming experience", "coding experience", "absolute beginner"])) {
        return response(`${HISTORICAL_PROFILE.learningPromise} HackStark is designed for curious beginners as well as learners developing practical security skills. The recommended path starts with virtualization, Kali Linux lab setup, networking basics and ethical hacking foundations before advancing to specialized topics. Programming becomes useful later for automation, tooling and understanding code, but it is not treated as an entry barrier.`, [action("Start with Academy", URLS.learn), action("Responsible use", URLS.responsible)]);
      }

      if (includesAny(q, ["raw data", "hackstark.txt", "original profile", "old profile", "original description", "describe original hackstark"])) {
        return response(`${HISTORICAL_PROFILE.source} describes HackStark as “${HISTORICAL_PROFILE.originalDescription}” It says the original community has been active since ${HISTORICAL_PROFILE.communitySince}, spent time learning and practicing penetration testing, and aimed to help people understand their gadgets, strengthen internet skills and clarify hacking concepts. It also says beginners do not need previous programming experience. These are historical descriptions; HackStark is now a cybersecurity education and open source organization with a broader focus on defense and authorization.`, [action("Current About page", URLS.about), action("Responsible use", URLS.responsible)]);
      }

      if (includesAny(q, ["who is hackstark", "what is hackstark", "about hackstark", "community", "organization", "organisation"])) {
        return response(`HackStark is an independent cybersecurity education and open source organization that began as a learning community in ${HISTORICAL_PROFILE.communitySince}. Its original profile emphasized IoT in penetration testing, gadgets and better internet skills. Today the organization covers ethical hacking, network defense, IoT and wireless security, OSINT, Linux labs, security automation, tutorials, public projects and community programs. Every area is framed around education and authorized use.`, [
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
        const list = metrics.map(({ item, values }) => `• ${item.name}: ${values.language}; ${values.stars} stars; ${values.forks} forks`).join("\n");
        const portfolioList = PORTFOLIO_PROJECTS.map((item) => `• ${item.name}: ${item.category}`).join("\n");
        return response(`The website presents ${PORTFOLIO_PROJECTS.length} founder security project groups:\n${portfolioList}\n\nIt also preserves HackStark’s ${PROJECTS.length} featured public repositories (${metrics[0].values.source}):\n${list}`, [
          action("View projects", URLS.projects), action("Founder GitHub", URLS.founderGithub), action("HackStark GitHub", URLS.github)
        ]);
      }

      if (includesAny(q, ["curriculum", "course outline", "course map", "all topics", "syllabus", "modules"])) {
        return response(`HackStark Academy's ${BEGINNER_COURSE?.name || "beginner course"} contains ${BEGINNER_COURSE?.videoLessonCount || 50}+ lessons, ${BEGINNER_COURSE?.numberedModuleCount || 21} numbered modules and ${BEGINNER_COURSE?.labLessonCount || 4} lab setup lessons. It covers:\n${COURSE_AREAS.map((area) => `• ${area}`).join("\n")}\nLegacy and dual use topics are clearly labeled and framed for defense, education and explicitly authorized labs.`, [action("Open curriculum", URLS.curriculum), action("Responsible use", URLS.responsible)]);
      }

      if (includesAny(q, ["official ceh", "ceh certification", "ec council", "certification course"])) {
        return response("HackStark's beginner course and the Oxege professional program are independent education. The Oxege curriculum is aligned with relevant CEH v13 / CEH AI subject areas, but neither program is presented as official EC-Council courseware or authorized EC-Council training, and this site does not claim that completion awards CEH certification.", [action("Oxege program context", URLS.oxege), action("Official CEH information", BEGINNER_COURSE?.officialReferences?.ceh || "https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/")]);
      }

      if (includesAny(q, ["course progress", "lesson progress", "reset progress", "where is progress stored"])) {
        return response("The streamlined HackStark curriculum no longer records lesson progress. Use the single View Full Curriculum button to browse the course outline; no completion status is stored.", [action("Open curriculum", URLS.curriculum)]);
      }

      if (includesAny(q, ["coming soon", "video unavailable", "missing video", "available lessons", "linked lessons"])) {
        return response(`The learning program includes ${BEGINNER_COURSE?.videoLessonCount || 50}+ lessons. The structured website catalog currently exposes ${BEGINNER_COURSE?.numberedModuleCount || 21} numbered modules plus ${BEGINNER_COURSE?.labLessonCount || 4} lab setup lessons, and only verified video destinations are clickable. ${LINKED_COURSE_LESSONS} catalog lessons currently have direct verified YouTube links; unavailable destinations are labeled “Included in Full Course.”`, [action("Browse curriculum", URLS.curriculum), action("YouTube channel", URLS.youtube)]);
      }

      if (selectedCourse === BEGINNER_COURSE || includesAny(q, ["academy", "tutorial", "tutorials", "video", "videos", "youtube", "course", "beginner", "no programming", "kali lab", "learning path"])) {
        return response(`${courseSummary(BEGINNER_COURSE)}\n${BEGINNER_COURSE.description}\nNo previous penetration testing experience is required. The course page includes ${BEGINNER_COURSE.reviewCount} reviews and free practical demonstrations.`, [...courseActions(BEGINNER_COURSE), action("View 51 Reviews", BEGINNER_COURSE.reviewsUrl), action("Watch Free Previews", URLS.learn)]);
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
        return topicAnswer("Social engineering awareness", "This area studies how attackers manipulate people. Defensive practice includes identity verification, MFA designed to resist phishing, reporting processes and awareness training. Never impersonate or deceive real people without a sanctioned exercise.");
      }

      if (includesAny(q, ["denial of service", "ddos", "dos", "slow http", "slowloris"])) {
        return topicAnswer("Denial of service resilience", "HackStark’s slowlorisdos repository is framed as controlled lab research. Defensive study focuses on rate limits, timeouts, reverse proxies, monitoring and incident response; no real service should be targeted.", [action("View lab repository", PROJECTS[3].url), action("Responsible use", URLS.responsible)]);
      }

      if (includesAny(q, ["malware", "virus", "trojan", "ransomware"])) {
        return topicAnswer("Malware threats", "HackStark’s broader learning map includes understanding malware categories and their defensive indicators. Safe learning uses isolated samples, reputable sandboxes and incident response practices. It does not include creation or deployment.");
      }

      if (includesAny(q, ["firewall", "ids", "ips", "honeypot", "session hijacking"])) {
        return topicAnswer("Network and session defense", "The historical course map covers IDS, firewalls, honeypots and session security. Defensive priorities include layered filtering, alert review, secure cookies, TLS, session rotation and rapid revocation.");
      }

      if (includesAny(q, ["cloud", "vps", "mobile security", "android security"])) {
        return topicAnswer("Platform security", "HackStark’s broader course map includes cloud and VPS security plus mobile platform security. Core practices include least privilege, secure configuration, patching, encryption, logging and testing only assets within an approved scope.");

      }

      if (includesAny(q, ["cryptography", "cipher", "encryption"])) {
        return topicAnswer("Cryptography", "HackStark introduces classical ciphers through its Python SubstitutionCipher project. Classical substitution is educational, not suitable for protecting modern data; production systems should use reviewed modern cryptographic libraries.", [action("View cipher project", PROJECTS[4].url), action("All projects", URLS.projects)]);
      }

      if (includesAny(q, ["linux", "kali", "vmware", "lab", "labs"])) {
        return response("HackStark’s Linux learning path covers Kali Linux, package repositories, virtualization, security tooling and isolated practice labs. Labs should use systems you own or have explicit permission to assess.", [
          action("Linux projects", URLS.projects), action("Lab tutorials", URLS.learn)
        ]);
      }

      if (includesAny(q, ["ethical hacking", "penetration testing", "pentest", "responsible", "responsibility", "responsibilities", "permission", "legal", "safe", "authorized use", "acceptable use"])) {
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
        return response(`For employment and professional inquiries, contact ${DATA.founder.name} at ${DATA.founder.email}, phone/WhatsApp ${DATA.founder.phone}, or LinkedIn at linkedin.com/in/ahmedtalha470. For HackStark course and organization inquiries, email ${DATA.organization.email} or use the Google contact form.`, [
          action("Email Muhammad", URLS.founderEmail), action("Call or WhatsApp", URLS.founderPhone), action("LinkedIn", URLS.linkedin), action("Google contact form", URLS.contactForm)
        ]);
      }

      return contactTalha(`I couldn’t confidently match “${question.trim()}” to a verified answer in the HackStark knowledge base.`);
    }
  }

  const knowledgeProvider = new HackStarkKnowledge();
  window.JarvisHackStarkKnowledge = Object.freeze({
    answer: (question) => knowledgeProvider.respond(String(question || ""))
  });

  const safeUrl = (url) => {
    if (url.startsWith("#")) return url;
    try {
      const parsed = new URL(url, window.location.href);
      return ["http:", "https:", "mailto:", "tel:"].includes(parsed.protocol) ? url : "#";
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
        clear: root.querySelector("#jarvis-clear-btn")
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
      this.el.launcher.setAttribute("aria-label", "Close JARVIS, HackStark Assistant");
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
      this.el.launcher.setAttribute("aria-label", "Open JARVIS, HackStark Assistant");
      window.setTimeout(() => { if (!this.isOpen()) this.el.window.hidden = true; }, 260);
      const hero = document.querySelector("#home");
      const deferLauncher = window.innerWidth <= 480 && hero && window.scrollY < Math.max(240, hero.offsetHeight - 120);
      document.body.classList.toggle("jarvis-launcher-deferred", Boolean(deferLauncher));
      this.el.launcher.inert = Boolean(deferLauncher);
      this.el.launcher.setAttribute("aria-hidden", String(Boolean(deferLauncher)));
      if (!deferLauncher) this.el.launcher.focus();
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
      this.addMessage("bot", response("Hello! I’m JARVIS. Explore Course 1: HackStark Ethical Hacking for Beginners, Course 2: TechFly CyberStart Level 1, or Course 3: Oxege Professional Cybersecurity. Ask about fees, languages, curriculum PDFs, enrollment, international payments, schedules or Course 1’s 51 reviews. I can also help with the instructor’s experience, projects and contact details."), [
        ["About", "What is HackStark?"],
        ["Experience", "Tell me about Muhammad Ahmed Talha's professional experience"],
        ["Skills", "What are Muhammad Ahmed Talha's technical skills?"],
        ["Learning topics", "What does HackStark teach?"],
        ["Projects", "Show me HackStark projects"],
        ["Course 1", "Tell me about course 1"],
        ["Course 2", "Tell me about course 2"],
        ["Course 3", "Tell me about course 3"],
        ["Compare programs", "Compare all three programs"],
        ["Course fees", "Show all course fees"],
        ["Languages", "Which languages are used for teaching?"],
        ["Enroll", "How do I enroll in a course?"],
        ["51 Reviews", "Where are the 51 course reviews?"],
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
        this.addMessage("bot", contactTalha("I couldn’t generate a reliable response this time."), [
          ["Try again", question], ["Contact Talha", "How can I contact Talha?"]
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
        const destination = new URL(link.href, window.location.href);
        const isSitePage = destination.origin === window.location.origin
          && (destination.pathname.endsWith(".html") || destination.pathname.endsWith("/"));
        if (!isSitePage && !["mailto:", "tel:"].includes(destination.protocol)) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
        if (isSitePage) link.addEventListener("click", () => this.close());
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
        const hero = document.querySelector("#home");
        const deferLauncher = width <= 480 && hero && window.scrollY < Math.max(240, hero.offsetHeight - 120) && !this.isOpen();
        document.body.classList.toggle("jarvis-launcher-deferred", Boolean(deferLauncher));
        this.el.launcher.inert = Boolean(deferLauncher);
        this.el.launcher.setAttribute("aria-hidden", String(Boolean(deferLauncher)));
      };
      const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
      update();
      window.addEventListener("resize", schedule, { passive: true });
      window.addEventListener("scroll", schedule, { passive: true });
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
    ask: (question) => controller.ask(String(question || "")),
    answer: (question) => controller.provider.respond(String(question || ""))
  });
})();
