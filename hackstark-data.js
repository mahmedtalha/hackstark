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

  const portfolioProjects = [
    { id: "info-gathering", name: "Information Gathering Framework", aliases: ["information gathering framework", "info gathering", "recon framework"], category: "Recon & VAPT", description: "A unified Python assessment workflow for domain and IP intelligence, enumeration, port scanning and OSINT.", technologies: ["Python", "Nmap", "Masscan", "OpenVAS", "OSINT"], sources: [{ label: "View source", url: "https://github.com/mahmedtalha/info-gathering" }] },
    { id: "user-finder", name: "User Finder Zeta – OSINT Scanner", aliases: ["user finder", "user finder zeta", "osint scanner"], category: "OSINT Reconnaissance", description: "A multithreaded scanner that checks public username and email presence across platforms and generates structured reports.", technologies: ["Python", "Multithreading", "OSINT", "API Scraping"], sources: [{ label: "View source", url: "https://github.com/mahmedtalha/user-finder" }] },
    { id: "metadata-extractor", name: "Zeta Metadata & OSINT Extractor", aliases: ["metadata extractor", "zeta metadata", "metadata osint"], category: "Digital Forensics", description: "A multi-format utility that extracts structured metadata from PDF, DOCX and image files.", technologies: ["Python", "EXIF", "PDF/DOCX", "Digital Forensics"], sources: [{ label: "View source", url: "https://github.com/mahmedtalha/meta-data-extractor-zeta" }] },
    { id: "wifi-deauth-detector", name: "Wi-Fi Deauth Detector NodeMCU", aliases: ["wifi deauth detector", "wi-fi deauth detector", "nodemcu detector"], category: "Wireless Defense", description: "An ESP8266 monitoring device that detects IEEE 802.11 deauthentication activity and alerts administrators.", technologies: ["NodeMCU ESP8266", "C++", "802.11", "Embedded Systems"], sources: [{ label: "View source", url: "https://github.com/mahmedtalha/WiFiDeauthDetectorNodeMCU" }] },
    { id: "watermark-remover", name: "AI Video & Image Watermark Remover Pro", aliases: ["watermark remover", "ai video watermark", "image watermark remover"], category: "AI & Vision Application", description: "A desktop GUI that combines object detection, segmentation and reconstruction in one media-processing workflow.", technologies: ["Python", "Florence-2", "LaMA AI", "PyQt GUI"], sources: [{ label: "View source", url: "https://github.com/mahmedtalha/AI-Video-Watermark-Remover-Pro" }] },
    { id: "slowloris-advanced", name: "Slowloris Advanced DoS Simulator", aliases: ["slowloris advanced", "dos simulator", "stress testing simulator"], category: "Stress Testing", description: "A socket-based simulator for observing web-server connection handling in isolated, authorized resilience labs.", technologies: ["Python", "Socket Programming", "DoS Simulation", "Load Testing"], sources: [{ label: "View source", url: "https://github.com/mahmedtalha/slowlorisAdvancedVersion" }] },
    { id: "endpoint-detectors", name: "Live Website & Proxy Detectors", aliases: ["live website detector", "live proxy detector", "website proxy detectors"], category: "Recon & Network Security", description: "Two concurrent network utilities for validating web targets and active proxy servers, including SSL state, response codes and latency.", technologies: ["Python", "Async IO", "Multithreading", "SSL & Proxy Audit"], sources: [{ label: "Website source", url: "https://github.com/mahmedtalha/live-website-detector" }, { label: "Proxy source", url: "https://github.com/mahmedtalha/live-proxy-detector" }] },
    { id: "prodigy-suite", name: "Prodigy Cyber Security Research Suite", aliases: ["prodigy suite", "packet sniffer", "endpoint telemetry", "pixel image encryption"], category: "Grouped Security Suite", description: "Three controlled-lab implementations covering Scapy packet inspection, endpoint keystroke telemetry and reversible pixel manipulation.", technologies: ["Python", "Scapy", "Cryptography", "Endpoint Security"], sources: [{ label: "Packet Sniffer source", url: "https://github.com/mahmedtalha/PRODIGY_CS_05_packet_sniffer" }, { label: "Telemetry source", url: "https://github.com/mahmedtalha/PRODIGY_CS_04_keylogger" }, { label: "Image Encryption source", url: "https://github.com/mahmedtalha/PRODIGY_CS_02_Pixel_Manipulation_Image_Encryption" }] }
  ].map((project) => Object.freeze({ ...project, aliases: Object.freeze(project.aliases), technologies: Object.freeze(project.technologies), sources: Object.freeze(project.sources.map(Object.freeze)) }));

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

  const courseLesson = (id, title, originalFile, category, options = {}) => Object.freeze({
    id, title, originalFile, type: "video", category, videoUrl: "", legacy: false, labOnly: false, ...options
  });
  const courseResource = (title, type, options = {}) => Object.freeze({
    title, type, url: "", originalFile: "", label: "", ...options
  });
  const courseModule = (number, title, category, filter, lessons, options = {}) => Object.freeze({
    number, title, category, filter, lessons: Object.freeze(lessons), resources: Object.freeze(options.resources || []),
    description: options.description || "", badge: options.badge || "", legacy: Boolean(options.legacy)
  });

  const ethicalHackingCourse = Object.freeze({
    id: "ethical-hacking-beginners",
    name: "Ethical Hacking Course for Beginners",
    shortName: "EH Course 4 Beginners",
    provider: "HackStark",
    level: "Beginner",
    delivery: "Self-paced",
    videoLessonCount: 46,
    numberedModuleCount: 21,
    labLessonCount: 4,
    description: "A practical introduction to ethical hacking, cybersecurity fundamentals, lab setup, reconnaissance, vulnerability assessment, network security, web security, wireless security, IoT, cryptography and continued security research.",
    disclaimer: "This independent HackStark course covers ethical-hacking topics historically aligned with CEH v11-era learning domains. It is an educational resource and is not an official EC-Council certification course.",
    sections: Object.freeze([
      Object.freeze({
        id: "introduction",
        title: "Course Introduction",
        description: "Begin with the course purpose, structure and responsible-learning expectations.",
        modules: Object.freeze([
          courseModule("Introduction", "Welcome to the Course", "Foundation", "foundation", [
            courseLesson("intro-01", "Introduction to the Course", "0.1 Introduction to the Course.mp4", "Foundation", { videoUrl: "https://www.youtube.com/watch?v=YnGy6A-ZPtE" })
          ])
        ])
      }),
      Object.freeze({
        id: "lab-setup",
        title: "Part 1 — Lab Setup",
        description: "Build an isolated virtualization environment and prepare Kali Linux for cybersecurity practice.",
        modules: Object.freeze([
          courseModule("Lab 01", "Downloading & Installing VMware", "Lab Setup", "foundation", [
            courseLesson("lab-01", "Downloading & Installing VMware", "1.1 Downloading & installing VMWare Software.mp4", "Lab Setup", { labOnly: true })
          ], { resources: [
            courseResource("VMware Download Resources", "external", { label: "Official documentation", url: "https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion", originalFile: "Download VMWare Player Direct Link.url; Download VMWare Player.url" })
          ] }),
          courseModule("Lab 02", "Enabling Virtualization Technology", "Lab Setup", "foundation", [
            courseLesson("lab-02", "Enabling Virtualization Technology (VT-x / AMD-V)", "1.2 Enabling Virtualization Technology (VTx).mp4", "Lab Setup", { labOnly: true })
          ], {
            description: "Learn what hardware virtualization is and how to enable the required processor feature through BIOS/UEFI when supported.",
            resources: [courseResource("Virtualization Reference", "external", { label: "Reference article", url: "https://en.wikipedia.org/wiki/Hardware_virtualization", originalFile: "Virtualization (Wikipedia).url" })]
          }),
          courseModule("Lab 03", "Installing Kali Linux on VMware", "Lab Setup", "foundation", [
            courseLesson("lab-03", "Installing Kali Linux on VMware", "1.3 installing Kali Linux on VMWare.mp4", "Lab Setup", { videoUrl: "https://www.youtube.com/watch?v=7Tl3fexB3yk", labOnly: true })
          ], { resources: [
            courseResource("Current Kali Linux Downloads", "external", { label: "Official downloads", url: "https://www.kali.org/get-kali/", originalFile: "Download Kali Linux.url; Kali Linux Download.url" }),
            courseResource("Kali in VMware", "external", { label: "Official documentation", url: "https://www.kali.org/docs/virtualization/install-vmware-guest-vm/" })
          ] }),
          courseModule("Lab 04", "Kali Repository & User Configuration", "Lab Setup", "foundation", [
            courseLesson("lab-04", "Setting Up Repositories & User Configuration in Kali Linux", "1.4 Setting up Repository & User in Kali Linux .mp4", "Lab Setup", { videoUrl: "https://www.youtube.com/watch?v=Z9Hs6R5t4Eg", legacy: true, labOnly: true })
          ], {
            legacy: true,
            description: "An earlier Kali workflow retained for historical value. Consult current Kali documentation before changing package sources.",
            resources: [courseResource("Current Kali Repository Documentation", "external", { label: "Official documentation", url: "https://www.kali.org/docs/general-use/kali-linux-sources-list-repositories/" })]
          })
        ])
      }),
      Object.freeze({
        id: "ethical-hacking-modules",
        title: "Part 2 — Ethical Hacking Modules",
        description: "Progress from cybersecurity fundamentals through reconnaissance, assessment, networks, systems, web security, wireless, IoT, cloud and cryptography.",
        modules: Object.freeze([
          courseModule("Module 01", "Introduction to Ethical Hacking", "Foundation", "foundation", [
            courseLesson("m01-l01", "Introduction to Ethical Hacking", "2.1 introduction to Ethical Hacking.mp4", "Foundation", { videoUrl: "https://www.youtube.com/watch?v=xTstJNBFTwU" })
          ], { description: "Understand the role, responsibilities, scope and ethical boundaries of security testing." }),
          courseModule("Module 02", "Footprinting & Reconnaissance", "Reconnaissance", "osint", [
            courseLesson("m02-l01", "Information Gathering", "2.1 Information gathering.mp4", "Reconnaissance", { videoUrl: "https://www.youtube.com/watch?v=6pd9O3o7og0" }),
            courseLesson("m02-l02", "Footprinting & Reconnaissance", "2.2.2 Footprinting.mp4", "Reconnaissance")
          ]),
          courseModule("Module 03", "Scanning Networks", "Network Security", "networking", [
            courseLesson("m03-l01", "Network Scanning", "2.3 Scanning Networks.mp4", "Network Security", { videoUrl: "https://www.youtube.com/watch?v=hEsuzIZyMdA", labOnly: true })
          ], { description: "Keep demonstrations scoped to private lab networks and authorized systems.", resources: [
            courseResource("Network Scanning with Nmap — Supporting Guide", "pdf", { originalFile: "Scanning Network Using Nmap.pdf" }),
            courseResource("Nmap Network Scanning Demo", "external", { label: "Watch demonstration", url: "https://www.youtube.com/watch?v=TJVNQ2dNxQo" })
          ] }),
          courseModule("Module 04", "Enumeration", "Reconnaissance / OSINT", "osint", [
            courseLesson("m04-l01", "Enumeration Fundamentals", "2.4 Enumeration.mp4", "Reconnaissance / OSINT", { videoUrl: "https://www.youtube.com/watch?v=fncTkUqhrNQ", labOnly: true }),
            courseLesson("m04-l02", "OSINT with SpiderFoot", "2.4.2 SpiderFoot OSINT.mp4", "Reconnaissance / OSINT", { videoUrl: "https://www.youtube.com/watch?v=8nZfCiw-WyI" })
          ]),
          courseModule("Module 05", "Vulnerability Analysis", "Vulnerability Assessment", "vulnerability", [
            courseLesson("m05-l01", "Vulnerability Analysis & Nikto", "2.5 Vulnerability Analysis + Nikto Vulnerability Scanner.mp4", "Vulnerability Assessment", { labOnly: true }),
            courseLesson("m05-l02", "Vulnerability Management with Nexpose / InsightVM", "2.5.2 Nexpose & insightvm .mp4", "Vulnerability Assessment", { legacy: true, labOnly: true })
          ], { legacy: true }),
          courseModule("Module 06", "System Security", "System Security", "system", [
            courseLesson("m06-l01", "Windows System Security & Controlled Exploitation Concepts", "2.6 Windows Sysyem Hacking.mp4", "System Security", { labOnly: true }),
            courseLesson("m06-l02", "Android Security Fundamentals & Lab Demonstration", "2.6.2 Android Hacking.mp4", "System Security", { labOnly: true })
          ], { badge: "Lab only", resources: [courseResource("System Security Resource", "external", { originalFile: "System Hacking.url" })] }),
          courseModule("Module 07", "Malware Threats", "Malware Awareness", "system", [
            courseLesson("m07-l01", "Malware Threats", "2.7 Malware Threats.mp4", "Malware Awareness"),
            courseLesson("m07-l02", "Malware Tool Awareness: AhMyth & TheFatRat", "2.7.2 AhMyth & FAT-Rat.mp4", "Malware Awareness", { legacy: true, labOnly: true })
          ], { legacy: true, badge: "Lab only", description: "Legacy offensive tooling is presented only for security awareness, detection and controlled analysis." }),
          courseModule("Module 08", "Sniffing & Network Analysis", "Network Analysis", "networking", [
            courseLesson("m08-l01", "Packet Sniffing Fundamentals", "2.8 Sniffing.mp4", "Network Analysis", { labOnly: true }),
            courseLesson("m08-l02", "Wireshark & Ettercap", "2.8.2 WireShark & Ettercap.mp4", "Network Analysis", { labOnly: true }),
            courseLesson("m08-l03", "PRTG, Omnipeek & NetFlow Analysis", "2.8.3 Paessler PRTG , Savvius Omnipeek & NetFlow Analysier.mp4", "Network Analysis", { legacy: true })
          ], { legacy: true }),
          courseModule("Module 09", "Social Engineering", "Human Security", "foundation", [
            courseLesson("m09-l01", "Social Engineering Fundamentals", "2.9 Social Engineering.mp4", "Human Security"),
            courseLesson("m09-l02", "Understanding How Social Engineering Works", "2.9.2 How Social Engeneering Works.mp4", "Human Security")
          ], { description: "Focus on awareness, manipulation recognition, defensive controls, security culture and authorized simulation.", resources: [
            courseResource("Social Engineering Reference", "external", { originalFile: "Social_engineering_(Wiki).url" }),
            courseResource("Social Engineering Guide", "pdf", { originalFile: "Social Engineering.pdf" })
          ] }),
          courseModule("Module 10", "Denial-of-Service Concepts & Resilience", "Availability / Network Defense", "networking", [
            courseLesson("m10-l01", "DoS/DDoS Concepts and Legacy Tool Demonstration", "2.10 DDos + Using LOIC & ZDoser.mp4", "Availability / Network Defense", { legacy: true, labOnly: true }),
            courseLesson("m10-l02", "Slowloris & HTTP Service Resilience", "2.10.2 SlowLoris DOS Attack.mp4", "Availability / Network Defense", { legacy: true, labOnly: true })
          ], { legacy: true, badge: "Controlled lab only", description: "Study availability risks, monitoring, rate limiting, connection management, detection and mitigation—never service disruption." }),
          courseModule("Module 11", "Session Security", "Web / Session Security", "web", [
            courseLesson("m11-l01", "Session Hijacking Concepts & Cookie Security", "2.11 Session Hijacking & Cookies Stealing.mp4", "Web / Session Security"),
            courseLesson("m11-l02", "Session Security — Controlled Lab Demonstration", "2.11.2 Session Hijacking & Cookies Stealing Practical.mp4", "Web / Session Security", { labOnly: true })
          ], { badge: "Lab only", description: "Understand insecure session handling and the controls used to prevent it." }),
          courseModule("Module 12", "IDS, Firewalls & Honeypots", "Network Defense", "networking", [
            courseLesson("m12-l01", "Understanding IDS, Firewalls, Honeypots & Evasion Concepts", "2.12 Evading IDS, Firewalls, and Honeypots.mp4", "Network Defense", { legacy: true, labOnly: true })
          ], { legacy: true, description: "Learn how defensive controls detect adversarial behavior so they can be designed and evaluated more effectively." }),
          courseModule("Module 13", "Web Server Security", "Web Security", "web", [
            courseLesson("m13-l01", "Web Server Security Fundamentals", "2.13 Hacking Web Servers.mp4", "Web Security"),
            courseLesson("m13-l02", "Web Server Security — Lab Practice", "2.13.2 Hacking Web Servers Practice.mp4", "Web Security", { labOnly: true })
          ], { badge: "Lab only" }),
          courseModule("Module 14", "Web Application Security", "Application Security", "web", [
            courseLesson("m14-l01", "Web Application Security Fundamentals", "2.14.1 Hacking Web Applications.mp4", "Application Security"),
            courseLesson("m14-l02", "Practice with DVWA & OWASP WebGoat", "2.14.2 DVWA & WebGoat.mp4", "Application Security", { videoUrl: "https://www.youtube.com/watch?v=x6ICJDVH1Xw", labOnly: true })
          ], { badge: "Lab only", resources: [courseResource("OWASP WebGoat", "external", { label: "Official project", url: "https://owasp.org/www-project-webgoat/" })] }),
          courseModule("Module 15", "SQL Injection", "Application Security", "web", [
            courseLesson("m15-l01", "SQL Injection Fundamentals", "2.15 SQL Injection.mp4", "Application Security"),
            courseLesson("m15-l02", "SQL Injection — Authentication Security Lab", "2.15.2 SQL Injection Pratical (Admin Panel Bypass).mp4", "Application Security", { labOnly: true })
          ], { badge: "Lab only", description: "Focus on vulnerable query construction, authentication weaknesses, parameterized queries, input handling and remediation." }),
          courseModule("Module 16", "Wireless Network Security", "Wireless Security", "wireless", [
            courseLesson("m16-l01", "WPA/WPA2 Security Fundamentals", "2.16.1 Wpa & Wpa2 Security.mp4", "Wireless Security"),
            courseLesson("m16-l02", "Wireless Security Testing with Aircrack-ng — Lab", "2.16.2 Wi-Fi hacking with aircrack-ng & capturing handshake.mp4", "Wireless Security", { labOnly: true }),
            courseLesson("m16-l03", "Password Security & Wireless Auditing Tools — Lab", "2.16.3 Cracking with John-The-Ripper & Linset on WifiSlax.mp4", "Wireless Security", { legacy: true, labOnly: true })
          ], { legacy: true, badge: "Authorized networks only" }),
          courseModule("Module 17", "Mobile Platform Security", "Mobile Security", "mobile", [
            courseLesson("m17-l01", "Android Security Fundamentals", "2.17 Hacking Mobile PlatForms (Android-Linux-Based).mp4", "Mobile Security"),
            courseLesson("m17-l02", "Android Security Testing Tools — Controlled Lab", "2.17.2 Evil-Droid (Auto Payload Generator).mp4", "Mobile Security", { legacy: true, labOnly: true }),
            courseLesson("m17-l03", "Mobile Security Controls & Protection Mechanisms", "2.17.3 Bypass Play Protect.mp4", "Mobile Security", { legacy: true, labOnly: true })
          ], { legacy: true, badge: "Controlled lab only" }),
          courseModule("Module 18", "IoT Security", "IoT Security", "iot", [
            courseLesson("m18-l01", "IoT Security Fundamentals", "2.18 IoT Hacking.mp4", "IoT Security"),
            courseLesson("m18-l02", "IoT Security — Practical Lab", "2.18.2 IoT Hacking Practical.mp4", "IoT Security", { labOnly: true })
          ], { badge: "HackStark core topic", resources: [courseResource("IoT Security Guide", "pdf", { originalFile: "2.18 IoT Hacking.pdf" })] }),
          courseModule("Module 19", "Cloud Computing", "Cloud", "cloud", [
            courseLesson("m19-l01", "Cloud Computing Fundamentals", "2.19 Cloud Computing .mp4", "Cloud"),
            courseLesson("m19-l02", "Virtual Private Server (VPS) Practical", "2.19.2 VPS Practical.mp4", "Cloud", { labOnly: true })
          ], { resources: [courseResource("Cloud Computing Guide", "pdf", { originalFile: "2.19 Cloud Computing .pdf" })] }),
          courseModule("Module 20", "Cryptography", "Cryptography", "cryptography", [
            courseLesson("m20-l01", "Cryptography Fundamentals", "2.20 Cryptography .mp4", "Cryptography")
          ], { description: "Explore foundational concepts behind encryption, confidentiality, integrity and secure data protection." }),
          courseModule("Module 21", "Additional Security Content", "Additional / Legacy Content", "system", [
            courseLesson("m21-l01", "Malware Obfuscation Awareness & Defensive Detection Concepts", "2.21 Encrypting Virus Files.mp4", "Additional / Legacy Content", { legacy: true, labOnly: true })
          ], { legacy: true, badge: "Legacy lab content", description: "An additional HackStark module outside the historical 20-module outline, focused on layered detection, behavioral analysis and sandboxing—not evasion." })
        ])
      }),
      Object.freeze({
        id: "research-continuation",
        title: "Part 3 — Continuing Your Research",
        description: "Conclude with a responsible plan for continued cybersecurity learning and research.",
        modules: Object.freeze([
          courseModule("Conclusion", "Continue Your Cybersecurity Research", "Security Research", "foundation", [
            courseLesson("conclusion-01", "How to Continue Your Cybersecurity Research", "3.1 How to Continue Your Research in Hacking.mp4", "Security Research")
          ], { description: "Continue through documentation, isolated labs, CTFs, open-source projects and responsible experimentation." })
        ])
      })
    ]),
    officialReferences: Object.freeze({
      kaliVirtualization: "https://www.kali.org/docs/virtualization/",
      kaliVmware: "https://www.kali.org/docs/virtualization/install-vmware-guest-vm/",
      webGoat: "https://owasp.org/www-project-webgoat/",
      ceh: "https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/"
    })
  });

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
    socials: Object.freeze({ github: githubProfile, founderGithub: "https://github.com/mahmedtalha", contactForm: "https://docs.google.com/forms/d/e/1FAIpQLScdbT_vnWj5tRU2b-XP_PdamjncAMHc3sgl6rGEUI8EHMe4QQ/viewform?usp=sharing", youtube: "https://www.youtube.com/@hackstark8829", facebook: "https://facebook.com/hackstarkk/", telegramChannel: "https://t.me/hackstarkofficial", telegramContact: "https://t.me/hackstarkk", instagram: "https://www.instagram.com/hackstark/" }),
    projects: Object.freeze(projects),
    portfolioProjects: Object.freeze(portfolioProjects),
    videos: Object.freeze(videos),
    courses: Object.freeze([ethicalHackingCourse]),
    focusAreas: Object.freeze(["Ethical hacking and penetration testing", "Network security", "IoT and wireless security", "OSINT and reconnaissance", "Security automation", "Linux and controlled security labs"]),
    securityWorkflow: Object.freeze([
      Object.freeze({ id: "understand", number: "01", name: "Understand", summary: "Concept & scope", label: "Security mindset / Understand", title: "Learn how the system behaves.", description: "Map the concept, define the authorized scope and understand the expected behavior before testing anything." }),
      Object.freeze({ id: "practice", number: "02", name: "Practice", summary: "Controlled lab", label: "Security mindset / Practice", title: "Validate safely in a controlled lab.", description: "Reproduce the concept only in an isolated environment or on systems you own or have explicit permission to assess." }),
      Object.freeze({ id: "harden", number: "03", name: "Harden", summary: "Defensive action", label: "Security mindset / Harden", title: "Turn findings into stronger defenses.", description: "Apply remediation, verify the fix, document the evidence and share the defensive lesson responsibly." })
    ]),
    courseAreas: Object.freeze(["virtualization and Kali Linux lab setup", "ethical-hacking foundations and authorization", "footprinting, reconnaissance and OSINT", "network scanning and enumeration", "vulnerability analysis", "system and endpoint security", "malware threats and defensive analysis", "traffic analysis and sniffing", "social-engineering awareness", "denial-of-service resilience", "session security", "IDS, firewalls and honeypots", "web-server and web-application security", "DVWA, WebGoat, XSS and SQL-injection concepts", "wireless security", "mobile-platform security", "IoT security", "cloud-computing and VPS fundamentals", "cryptography", "continued research and responsible practice"]),
    statistics: Object.freeze({ snapshotDate: "2026-09-07", publicRepositories: 5, projectRecords: 13, githubFollowers: 9, publicGists: 0, featuredVideos: 10, courseLessons: 46, courseModules: 21, labLessons: 4, linkedCourseLessons: 9, trainedStudentsClaim: "3,000+", securityToolsAndProjectsClaim: "10+" }),
    history: Object.freeze({ source: "HackStark.txt", communitySince: 2015, originalDescription: "A community sharing knowledge of IoT (Internet of Things) in penetration testing.", originalGoal: "Teach people what they can do with their gadgets, improve their internet skills and develop clearer concepts about hacking and the internet.", learningPromise: "No previous programming experience is needed to begin the ethical-hacking learning path.", historicalHandles: Object.freeze({ facebook: "facebook.com/hackstarkofficial", telegramGroup: "@hackstarkk", telegramChannel: "@hackstarkofficial", instagram: "@hackstark", github: "@hackstarkofficial", twitter: "@HackStarkk" }), historicalWhatsAppCommunities: Object.freeze(["HackStark Official", "HackStark 2.O Official", "Hacking Courses 4 Free"]) }),
    runtime: { repositories: null, githubLoadedAt: null }
  };

  window.hackstarkData = Object.freeze(data);
})();
