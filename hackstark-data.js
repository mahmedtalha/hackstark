(() => {
  "use strict";

  const githubProfile = "https://github.com/hackstarkofficial";
  const projects = [
    { repository: "FastestRepositoryForKali", name: "FastestRepositoryForKali", aliases: ["fastestrepositoryforkali", "fastest repository", "kali repository"], description: "A Kali Linux resource for configuring efficient package repositories.", language: "Configuration", created: "2020-05-23", updated: "2025-03-20", stars: 3, forks: 0, branch: "master", license: null, url: `${githubProfile}/FastestRepositoryForKali` },
    { repository: "fastrepo4kali", name: "fastrepo4kali", aliases: ["fastrepo4kali", "fast repo"], description: "A utility for optimizing Kali Linux repository configuration.", language: "Configuration", created: "2020-12-13", updated: "2025-08-20", stars: 2, forks: 3, branch: "main", license: null, url: `${githubProfile}/fastrepo4kali` },
    { repository: "C-Plus-Plus-Basic-Structure-Cheat-Sheet", name: "C++ Basic Structure Cheat Sheet", aliases: ["c++", "cplusplus", "cheat sheet", "basic structure"], description: "A concise C++ syntax and program-structure reference for beginners.", language: "C++", created: "2020-10-27", updated: "2020-10-27", stars: 0, forks: 0, branch: "main", license: null, url: `${githubProfile}/C-Plus-Plus-Basic-Structure-Cheat-Sheet` },
    { repository: "slowlorisdos", name: "slowlorisdos", aliases: ["slowloris", "slowlorisdos", "dos research"], description: "Controlled-lab research for understanding slow HTTP connections and web-server resilience. Intended only for authorized laboratory use.", language: "Python", created: "2021-03-02", updated: "2021-05-04", stars: 0, forks: 0, branch: "main", license: "MIT", url: `${githubProfile}/slowlorisdos` },
    { repository: "SubstitutionCipher", name: "SubstitutionCipher", aliases: ["substitutioncipher", "substitution cipher", "cryptography"], description: "An educational Python implementation of classical substitution-cipher concepts.", language: "Python", created: "2022-11-17", updated: "2022-11-17", stars: 0, forks: 0, branch: "main", license: null, url: `${githubProfile}/SubstitutionCipher` }
  ].map(Object.freeze);

  const videos = [
    { id: "TJVNQ2dNxQo", aliases: ["nmap", "network scanning", "port scanning", "ping scan"], title: "NMAP Network Scanning Demo", topic: "Host discovery, ping scanning and open-port identification in an authorized lab." },
    { id: "x6ICJDVH1Xw", aliases: ["xss", "reflected xss", "dvwa"], title: "XSS Reflected Attack Demonstration on DVWA & Online Website", topic: "A reflected cross-site scripting demonstration; use DVWA or another deliberately vulnerable lab only." },
    { id: "8nZfCiw-WyI", aliases: ["spiderfoot", "osint"], title: "SpiderFoot OSINT # 2.4.2", topic: "Automated collection and correlation of public information for lawful OSINT research." },
    { id: "fncTkUqhrNQ", aliases: ["enumeration", "footprinting"], title: "What is Enumeration | Enumeration & FootPrinting # 2.4", topic: "The concepts and defensive value of enumeration and footprinting." },
    { id: "hEsuzIZyMdA", aliases: ["scan network", "scanning networks"], title: "How to scan network | Scanning Networks # 2.3", topic: "Network scanning fundamentals for systems you own or are authorized to assess." },
    { id: "6pd9O3o7og0", aliases: ["information gathering", "recon"], title: "What is information Gathering | Information gathering # 2.1", topic: "The information-gathering phase of an ethical security assessment." },
    { id: "xTstJNBFTwU", aliases: ["what is ethical hacking", "ethical hacking introduction"], title: "What is Ethical Hacking | introduction to Ethical Hacking # 2.1", topic: "Ethical hacking foundations, scope and permission-first practice." },
    { id: "Z9Hs6R5t4Eg", aliases: ["setup repository", "root user", "kali repository setup"], title: "How to Setup Repository & Root User in Kali Linux", topic: "Preparing a Kali Linux learning environment and its package repositories." },
    { id: "7Tl3fexB3yk", aliases: ["install kali", "kali vmware", "vmware"], title: "How to install Kali Linux on VMware", topic: "Creating an isolated Kali Linux virtual-machine lab." },
    { id: "YnGy6A-ZPtE", aliases: ["course introduction", "introduction course", "start course"], title: "Introduction to Ethical Hacking Course By HackStark", topic: "An overview and starting point for the HackStark ethical-hacking course." }
  ].map((video) => Object.freeze({ ...video, url: `https://www.youtube.com/watch?v=${video.id}` }));

  const data = {
    organization: Object.freeze({
      name: "HackStark",
      type: "Cybersecurity education and open-source organization",
      email: "hackstarkofficial@gmail.com",
      description: "An independent cybersecurity education and open-source organization focused on practical, ethical and responsible security learning.",
      origin: "HackStark began as a cybersecurity learning community in 2015 and has since evolved into an organization while preserving its community-first roots."
    }),
    founder: Object.freeze({
      name: "Muhammad Ahmed Talha",
      title: "Founder & Lead — HackStark",
      role: "Cybersecurity & IT Infrastructure Professional",
      website: "https://talha.dpdns.org/",
      linkedin: "https://linkedin.com/in/ahmedtalha470",
      evidence: Object.freeze({
        students: "https://talha.dpdns.org/#stats",
        projects: "https://talha.dpdns.org/#projects",
        speaking: "https://talha.dpdns.org/#speaking",
        education: "https://talha.dpdns.org/#certifications"
      })
    }),
    socials: Object.freeze({ github: githubProfile, youtube: "https://www.youtube.com/@hackstark8829", facebook: "https://facebook.com/hackstarkk/", telegramChannel: "https://t.me/hackstarkofficial", telegramContact: "https://t.me/hackstarkk", instagram: "https://www.instagram.com/hackstark/" }),
    projects: Object.freeze(projects),
    videos: Object.freeze(videos),
    focusAreas: Object.freeze(["Ethical hacking and penetration testing", "Network security", "IoT and wireless security", "OSINT and reconnaissance", "Security automation", "Linux and controlled security labs"]),
    securityWorkflow: Object.freeze([
      Object.freeze({ id: "understand", number: "01", name: "Understand", summary: "Concept & scope", label: "Security mindset / Understand", title: "Learn how the system behaves.", description: "Map the concept, define the authorized scope and understand the expected behavior before testing anything." }),
      Object.freeze({ id: "practice", number: "02", name: "Practice", summary: "Controlled lab", label: "Security mindset / Practice", title: "Validate safely in a controlled lab.", description: "Reproduce the concept only in an isolated environment or on systems you own or have explicit permission to assess." }),
      Object.freeze({ id: "harden", number: "03", name: "Harden", summary: "Defensive action", label: "Security mindset / Harden", title: "Turn findings into stronger defenses.", description: "Apply remediation, verify the fix, document the evidence and share the defensive lesson responsibly." })
    ]),
    courseAreas: Object.freeze(["virtualization and Kali Linux lab setup", "ethical-hacking foundations and authorization", "footprinting, reconnaissance and OSINT", "network scanning and enumeration", "vulnerability analysis", "system and endpoint security", "malware threats and defensive analysis", "traffic analysis and sniffing", "social-engineering awareness", "denial-of-service resilience", "session security", "IDS, firewalls and honeypots", "web-server and web-application security", "DVWA, WebGoat, XSS and SQL-injection concepts", "wireless security", "mobile-platform security", "IoT security", "cloud-computing and VPS fundamentals", "cryptography", "continued research and responsible practice"]),
    statistics: Object.freeze({ snapshotDate: "2026-09-07", publicRepositories: 5, githubFollowers: 9, publicGists: 0, featuredVideos: 10, trainedStudentsClaim: "3,000+", securityToolsAndProjectsClaim: "10+" }),
    identityStages: Object.freeze([
      Object.freeze({ id: "community", label: "2015 — Community roots", title: "HackStark began as a learning community.", description: "The original community shared practical knowledge about gadgets, IoT, penetration testing and internet skills, giving beginners a place to learn together." }),
      Object.freeze({ id: "organization", label: "Today — Organization", title: "HackStark is now a cybersecurity organization.", description: "Today HackStark operates as a cybersecurity education and open-source organization delivering structured learning, practical tutorials, security projects, responsible research and community programs." })
    ]),
    history: Object.freeze({ source: "HackStark.txt", communitySince: 2015, originalDescription: "A community sharing knowledge of IoT (Internet of Things) in penetration testing.", originalGoal: "Teach people what they can do with their gadgets, improve their internet skills and develop clearer concepts about hacking and the internet.", learningPromise: "No previous programming experience is needed to begin the ethical-hacking learning path.", historicalHandles: Object.freeze({ facebook: "facebook.com/hackstarkofficial", telegramGroup: "@hackstarkk", telegramChannel: "@hackstarkofficial", instagram: "@hackstark", github: "@hackstarkofficial", twitter: "@HackStarkk" }), historicalWhatsAppCommunities: Object.freeze(["HackStark Official", "HackStark 2.O Official", "Hacking Courses 4 Free"]) }),
    runtime: { repositories: null, githubLoadedAt: null }
  };

  window.hackstarkData = Object.freeze(data);
})();
