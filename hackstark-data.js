(() => {
  "use strict";

  const githubProfile = "https://github.com/hackstarkofficial";
  const projects = [
    { repository: "FastestRepositoryForKali", name: "FastestRepositoryForKali", aliases: ["fastestrepositoryforkali", "fastest repository", "kali repository"], description: "A Kali Linux resource for configuring efficient package repositories.", language: "Configuration", created: "2020-05-23", updated: "2025-03-20", stars: 3, forks: 0, branch: "master", license: null, url: `${githubProfile}/FastestRepositoryForKali` },
    { repository: "fastrepo4kali", name: "fastrepo4kali", aliases: ["fastrepo4kali", "fast repo"], description: "A utility for optimizing Kali Linux repository configuration.", language: "Configuration", created: "2020-12-13", updated: "2025-08-20", stars: 2, forks: 3, branch: "main", license: null, url: `${githubProfile}/fastrepo4kali` },
    { repository: "C-Plus-Plus-Basic-Structure-Cheat-Sheet", name: "C++ Basic Structure Cheat Sheet", aliases: ["c++", "cplusplus", "cheat sheet", "basic structure"], description: "A concise C++ syntax and program structure reference for beginners.", language: "C++", created: "2020-10-27", updated: "2020-10-27", stars: 0, forks: 0, branch: "main", license: null, url: `${githubProfile}/C-Plus-Plus-Basic-Structure-Cheat-Sheet` },
    { repository: "slowlorisdos", name: "slowlorisdos", aliases: ["slowloris", "slowlorisdos", "dos research"], description: "Controlled lab research for understanding slow HTTP connections and web server resilience. Intended only for authorized laboratory use.", language: "Python", created: "2021-03-02", updated: "2021-05-04", stars: 0, forks: 0, branch: "main", license: "MIT", url: `${githubProfile}/slowlorisdos` },
    { repository: "SubstitutionCipher", name: "SubstitutionCipher", aliases: ["substitutioncipher", "substitution cipher", "cryptography"], description: "An educational Python implementation of classical substitution cipher concepts.", language: "Python", created: "2022-11-17", updated: "2022-11-17", stars: 0, forks: 0, branch: "main", license: null, url: `${githubProfile}/SubstitutionCipher` }
  ].map(Object.freeze);

  const portfolioProjects = [
    { id: "info-gathering", name: "Information Gathering Framework", aliases: ["information gathering framework", "info gathering", "recon framework"], category: "Recon & VAPT", description: "A Python CLI/GUI that combines Nmap, Masscan, OpenVAS, DNS, CMS and HTTP checks, storing port, OS, service, URL, DNS and vulnerability findings in structured, report-ready output.", technologies: ["Python", "Nmap", "Masscan", "OpenVAS", "DNS/HTTP"], sources: [{ label: "View source", url: "https://github.com/mahmedtalha/info-gathering" }] },
    { id: "user-finder", name: "User Finder Zeta: OSINT Scanner", aliases: ["user finder", "user finder zeta", "osint scanner"], category: "OSINT Reconnaissance", description: "A CLI/GUI OSINT search tool with username permutations, filters, proxies, APIs and concurrent requests that exports authorized public-footprint results to CSV, TXT and PDF.", technologies: ["Python", "OSINT", "APIs", "CSV/PDF"], sources: [{ label: "View source", url: "https://github.com/mahmedtalha/user-finder" }] },
    { id: "metadata-extractor", name: "Zeta Metadata & OSINT Extractor", aliases: ["metadata extractor", "zeta metadata", "metadata osint"], category: "Digital Forensics", description: "A Python CLI/GUI that extracts authors, dates, software, geolocation and meta-metadata from PDFs, DOCX files, images and other supported files.", technologies: ["Python", "PyPDF", "Pillow", "python-docx"], sources: [{ label: "View source", url: "https://github.com/mahmedtalha/meta-data-extractor-zeta" }] },
    { id: "wifi-deauth-detector", name: "Wi-Fi Deauth Detector NodeMCU (Fork)", aliases: ["wifi deauth detector", "wi-fi deauth detector", "nodemcu detector"], category: "Wireless Defense", description: "A forked NodeMCU/ESP8266 sketch that detects Wi-Fi deauthentication activity without external LEDs for wireless-monitoring research.", technologies: ["NodeMCU", "ESP8266", "Arduino/C++", "802.11"], sources: [{ label: "View source", url: "https://github.com/mahmedtalha/WiFiDeauthDetectorNodeMCU" }] },
    { id: "watermark-remover", name: "AI Video Watermark Remover Pro", aliases: ["watermark remover", "ai video watermark", "image watermark remover"], category: "AI & Vision Application", description: "An identified AI video watermark-removal repository whose published files currently contain a title-only README; no implementation, capability or output is presently documented. Use only with owned or licensed media.", technologies: ["Not documented"], sources: [{ label: "View source", url: "https://github.com/mahmedtalha/AI-Video-Watermark-Remover-Pro" }] },
    { id: "slowloris-advanced", name: "Slowloris Advanced Version", aliases: ["slowloris advanced", "dos simulator", "stress testing simulator"], category: "Stress Testing", description: "A Python Slowloris implementation that holds incomplete HTTP connections open, sends periodic headers and replaces closed sockets for authorized lab resilience testing only.", technologies: ["Python", "Sockets", "HTTP", "Slowloris"], sources: [{ label: "View source", url: "https://github.com/mahmedtalha/slowlorisAdvancedVersion" }] },
    { id: "endpoint-detectors", name: "Live Website & Proxy Detectors", aliases: ["live website detector", "live proxy detector", "website proxy detectors"], category: "Recon & Network Security", description: "A website checker and concurrent proxy checker that classifies HTTP 200 URLs, tests proxies with timeouts and writes good/bad URL lists and live proxies to files.", technologies: ["Python", "Requests", "ThreadPoolExecutor", "File Output"], sources: [{ label: "Website source", url: "https://github.com/mahmedtalha/live-website-detector" }, { label: "Proxy source", url: "https://github.com/mahmedtalha/live-proxy-detector" }] },
    { id: "prodigy-suite", name: "Prodigy CyberSecurity Research Suite", aliases: ["prodigy suite", "packet sniffer", "endpoint telemetry", "pixel image encryption"], category: "Grouped Security Suite", description: "Three controlled-lab Python GUIs for packet sniffing, endpoint keystroke telemetry and image encryption by pixel manipulation, producing packet logs, key logs and encrypted/decrypted images.", technologies: ["Python", "Scapy", "Tkinter", "Pynput/Pillow"], sources: [{ label: "Sniffer source", url: "https://github.com/mahmedtalha/PRODIGY_CS_05_packet_sniffer" }, { label: "Telemetry source", url: "https://github.com/mahmedtalha/PRODIGY_CS_04_keylogger" }, { label: "Encryption source", url: "https://github.com/mahmedtalha/PRODIGY_CS_02_Pixel_Manipulation_Image_Encryption" }] }
  ].map((project) => Object.freeze({ ...project, aliases: Object.freeze(project.aliases), technologies: Object.freeze(project.technologies), sources: Object.freeze(project.sources.map(Object.freeze)) }));

  const videos = [
    { id: "YnGy6A-ZPtE", aliases: ["course introduction", "introduction course", "start course"], title: "Introduction to Ethical Hacking Course By HackStark", topic: "An overview and starting point for the HackStark ethical hacking course." },
    { id: "7Tl3fexB3yk", aliases: ["install kali", "kali vmware", "vmware"], title: "How to install Kali Linux on VMware", topic: "Creating an isolated Kali Linux virtual machine lab." },
    { id: "Z9Hs6R5t4Eg", aliases: ["setup repository", "root user", "kali repository setup"], title: "How to Setup Repository & Root User in Kali Linux", topic: "Preparing a Kali Linux learning environment and its package repositories." },
    { id: "x6ICJDVH1Xw", aliases: ["xss", "reflected xss", "dvwa"], title: "XSS Reflected Attack Demonstration on DVWA & Online Website", topic: "A reflected cross site scripting demonstration; use DVWA or another deliberately vulnerable lab only." },
    { id: "84NSaznk-bw", aliases: ["rio", "encrypted video", "rio player"], title: "How to Play RIO Encrypted Video Files", topic: "A practical guide to playing RIO encrypted video files." }
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
    sequence: 1,
    shortName: "EH Course 4 Beginners",
    provider: "HackStark",
    level: "Beginner",
    delivery: "Self paced",
    currency: "PKR",
    originalPrice: 4999,
    price: 1999,
    usdCurrency: "USD",
    usdOriginalPrice: 19.99,
    usdPrice: 7.99,
    inrCurrency: "INR",
    inrPrice: 799,
    technologyCount: 26,
    videoLessonCount: 50,
    numberedModuleCount: 21,
    labLessonCount: 4,
    description: "A practical introduction to ethical hacking, cybersecurity fundamentals, lab setup, reconnaissance, vulnerability assessment, network security, web security, wireless security, IoT, cryptography and continued security research.",
    disclaimer: "This independent HackStark course covers ethical hacking topics historically aligned with CEH v11 learning domains. It is an educational resource and is not an official EC Council certification course.",
    sections: Object.freeze([
      Object.freeze({
        id: "introduction",
        title: "Course Introduction",
        description: "Begin with the course purpose, structure and responsible learning expectations.",
        modules: Object.freeze([
          courseModule("Introduction", "Welcome to the Course", "Foundation", "foundation", [
            courseLesson("intro-01", "Introduction to the Course", "0.1 Introduction to the Course.mp4", "Foundation", { videoUrl: "https://www.youtube.com/watch?v=YnGy6A-ZPtE" })
          ])
        ])
      }),
      Object.freeze({
        id: "lab-setup",
        title: "Part 1: Lab Setup",
        description: "Build an isolated virtualization environment and prepare Kali Linux for cybersecurity practice.",
        modules: Object.freeze([
          courseModule("Lab 01", "Downloading & Installing VMware", "Lab Setup", "foundation", [
            courseLesson("lab-01", "Downloading & Installing VMware", "1.1 Downloading & installing VMWare Software.mp4", "Lab Setup", { labOnly: true })
          ]),
          courseModule("Lab 02", "Enabling Virtualization Technology", "Lab Setup", "foundation", [
            courseLesson("lab-02", "Enabling Virtualization Technology (VT x / AMD V)", "1.2 Enabling Virtualization Technology (VTx).mp4", "Lab Setup", { labOnly: true })
          ], {
            description: "Learn what hardware virtualization is and how to enable the required processor feature through BIOS/UEFI when supported."
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
            description: "An earlier Kali workflow retained for historical value. Consult current Kali documentation before changing package sources."
          })
        ])
      }),
      Object.freeze({
        id: "ethical-hacking-modules",
        title: "Part 2: Ethical Hacking Modules",
        description: "Progress from cybersecurity fundamentals through reconnaissance, assessment, networks, systems, web security, wireless, IoT, cloud and cryptography.",
        modules: Object.freeze([
          courseModule("Module 01", "Introduction to Ethical Hacking", "Foundation", "foundation", [
            courseLesson("m01-l01", "Introduction to Ethical Hacking", "2.1 introduction to Ethical Hacking.mp4", "Foundation")
          ], { description: "Understand the role, responsibilities, scope and ethical boundaries of security testing." }),
          courseModule("Module 02", "Footprinting & Reconnaissance", "Reconnaissance", "osint", [
            courseLesson("m02-l01", "Information Gathering", "2.1 Information gathering.mp4", "Reconnaissance"),
            courseLesson("m02-l02", "Footprinting & Reconnaissance", "2.2.2 Footprinting.mp4", "Reconnaissance")
          ]),
          courseModule("Module 03", "Scanning Networks", "Network Security", "networking", [
            courseLesson("m03-l01", "Network Scanning", "2.3 Scanning Networks.mp4", "Network Security", { labOnly: true })
          ], { description: "Keep demonstrations scoped to private lab networks and authorized systems.", resources: [
            courseResource("Network Scanning with Nmap: Supporting Guide", "pdf", { originalFile: "Scanning Network Using Nmap.pdf" })
          ] }),
          courseModule("Module 04", "Enumeration", "Reconnaissance / OSINT", "osint", [
            courseLesson("m04-l01", "Enumeration Fundamentals", "2.4 Enumeration.mp4", "Reconnaissance / OSINT", { labOnly: true }),
            courseLesson("m04-l02", "OSINT with SpiderFoot", "2.4.2 SpiderFoot OSINT.mp4", "Reconnaissance / OSINT")
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
          courseModule("Module 10", "Denial of Service Concepts & Resilience", "Availability / Network Defense", "networking", [
            courseLesson("m10-l01", "DoS/DDoS Concepts and Legacy Tool Demonstration", "2.10 DDos + Using LOIC & ZDoser.mp4", "Availability / Network Defense", { legacy: true, labOnly: true }),
            courseLesson("m10-l02", "Slowloris & HTTP Service Resilience", "2.10.2 SlowLoris DOS Attack.mp4", "Availability / Network Defense", { legacy: true, labOnly: true })
          ], { legacy: true, badge: "Controlled lab only", description: "Study availability risks, monitoring, rate limiting, connection management, detection and mitigation. Never disrupt a service." }),
          courseModule("Module 11", "Session Security", "Web / Session Security", "web", [
            courseLesson("m11-l01", "Session Hijacking Concepts & Cookie Security", "2.11 Session Hijacking & Cookies Stealing.mp4", "Web / Session Security"),
            courseLesson("m11-l02", "Session Security: Controlled Lab Demonstration", "2.11.2 Session Hijacking & Cookies Stealing Practical.mp4", "Web / Session Security", { labOnly: true })
          ], { badge: "Lab only", description: "Understand insecure session handling and the controls used to prevent it." }),
          courseModule("Module 12", "IDS, Firewalls & Honeypots", "Network Defense", "networking", [
            courseLesson("m12-l01", "Understanding IDS, Firewalls, Honeypots & Evasion Concepts", "2.12 Evading IDS, Firewalls, and Honeypots.mp4", "Network Defense", { legacy: true, labOnly: true })
          ], { legacy: true, description: "Learn how defensive controls detect adversarial behavior so they can be designed and evaluated more effectively." }),
          courseModule("Module 13", "Web Server Security", "Web Security", "web", [
            courseLesson("m13-l01", "Web Server Security Fundamentals", "2.13 Hacking Web Servers.mp4", "Web Security"),
            courseLesson("m13-l02", "Web Server Security: Lab Practice", "2.13.2 Hacking Web Servers Practice.mp4", "Web Security", { labOnly: true })
          ], { badge: "Lab only" }),
          courseModule("Module 14", "Web Application Security", "Application Security", "web", [
            courseLesson("m14-l01", "Web Application Security Fundamentals", "2.14.1 Hacking Web Applications.mp4", "Application Security"),
            courseLesson("m14-l02", "Practice with DVWA & OWASP WebGoat", "2.14.2 DVWA & WebGoat.mp4", "Application Security", { videoUrl: "https://www.youtube.com/watch?v=x6ICJDVH1Xw", labOnly: true })
          ], { badge: "Lab only", resources: [courseResource("OWASP WebGoat", "external", { label: "Official project", url: "https://owasp.org/www-project-webgoat/" })] }),
          courseModule("Module 15", "SQL Injection", "Application Security", "web", [
            courseLesson("m15-l01", "SQL Injection Fundamentals", "2.15 SQL Injection.mp4", "Application Security"),
            courseLesson("m15-l02", "SQL Injection: Authentication Security Lab", "2.15.2 SQL Injection Pratical (Admin Panel Bypass).mp4", "Application Security", { labOnly: true })
          ], { badge: "Lab only", description: "Focus on vulnerable query construction, authentication weaknesses, parameterized queries, input handling and remediation." }),
          courseModule("Module 16", "Wireless Network Security", "Wireless Security", "wireless", [
            courseLesson("m16-l01", "WPA/WPA2 Security Fundamentals", "2.16.1 Wpa & Wpa2 Security.mp4", "Wireless Security"),
            courseLesson("m16-l02", "Wireless Security Testing with Aircrack ng: Lab", "2.16.2 Wi-Fi hacking with aircrack-ng & capturing handshake.mp4", "Wireless Security", { labOnly: true }),
            courseLesson("m16-l03", "Password Security & Wireless Auditing Tools: Lab", "2.16.3 Cracking with John-The-Ripper & Linset on WifiSlax.mp4", "Wireless Security", { legacy: true, labOnly: true })
          ], { legacy: true, badge: "Authorized networks only" }),
          courseModule("Module 17", "Mobile Platform Security", "Mobile Security", "mobile", [
            courseLesson("m17-l01", "Android Security Fundamentals", "2.17 Hacking Mobile PlatForms (Android-Linux-Based).mp4", "Mobile Security"),
            courseLesson("m17-l02", "Android Security Testing Tools: Controlled Lab", "2.17.2 Evil-Droid (Auto Payload Generator).mp4", "Mobile Security", { legacy: true, labOnly: true }),
            courseLesson("m17-l03", "Mobile Security Controls & Protection Mechanisms", "2.17.3 Bypass Play Protect.mp4", "Mobile Security", { legacy: true, labOnly: true })
          ], { legacy: true, badge: "Controlled lab only" }),
          courseModule("Module 18", "IoT Security", "IoT Security", "iot", [
            courseLesson("m18-l01", "IoT Security Fundamentals", "2.18 IoT Hacking.mp4", "IoT Security"),
            courseLesson("m18-l02", "IoT Security: Practical Lab", "2.18.2 IoT Hacking Practical.mp4", "IoT Security", { labOnly: true })
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
          ], { legacy: true, badge: "Legacy lab content", description: "An additional HackStark module outside the historical 20 module outline, focused on layered detection, behavioral analysis and sandboxing rather than evasion." })
        ])
      }),
      Object.freeze({
        id: "research-continuation",
        title: "Part 3: Continuing Your Research",
        description: "Conclude with a responsible plan for continued cybersecurity learning and research.",
        modules: Object.freeze([
          courseModule("Conclusion", "Continue Your Cybersecurity Research", "Security Research", "foundation", [
            courseLesson("conclusion-01", "How to Continue Your Cybersecurity Research", "3.1 How to Continue Your Research in Hacking.mp4", "Security Research")
          ], { description: "Continue through documentation, isolated labs, CTFs, open source projects and responsible experimentation." })
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

  const cyberStartLecture = (number, title, learningArea, topics) => Object.freeze({
    number, title, learningArea, durationMinutes: 60, topics: Object.freeze(topics)
  });

  const cyberStartCourse = Object.freeze({
    id: "cyberstart-level-1",
    name: "CyberStart Level 1",
    sequence: 2,
    poster: "techfly-cyber-security-engineer-poster.png",
    subtitle: "Cybersecurity Foundation Program",
    provider: "TechFly",
    relationship: "Independent training partner",
    location: "Multan",
    instructor: "Muhammad Ahmed Talha",
    instructorRole: "CyberSecurity Instructor / Trainer",
    employmentType: "Part-Time / Contract",
    year: 2026,
    deliveryMode: "Online Instructor-Led Weekend Training",
    batchDuration: "2 Months",
    schedule: "Friday, Saturday & Sunday · 7:00 PM–8:30 PM PKT",
    currency: "PKR",
    originalPrice: 24999,
    price: 9999,
    approximateUsdPrice: 35.99,
    approximateInrPrice: 3499,
    durationHours: 16,
    lectureCount: 16,
    topicCount: 51,
    level: "Foundation Level",
    description: "A focused cybersecurity foundation program covering cybersecurity fundamentals, Linux, ethical hacking, network scanning, Fortinet-oriented firewall and network security, cyber defense, practical labs, real-world case studies and career development.",
    deliveryDescription: "The program combines concepts, demonstrations, supervised laboratory exercises, applied discussion and a final practical assessment.",
    learningAreas: Object.freeze([
      "Introduction to Cybersecurity", "Linux Fundamentals", "Ethical Hacking Basics",
      "Firewall & Network Security (Fortinet)", "Cyber Defense & Threat Prevention",
      "Hands-on Practical Labs", "Real-world Case Studies", "Career Guidance & Next Steps"
    ]),
    tools: Object.freeze([
      "Kali Linux", "VMware", "APT", "dpkg", "Nmap", "Nmap NSE", "Nikto", "OpenVAS",
      "VLANs", "ACLs", "DMZ", "FortiGate", "NGFW", "NAC", "IPsec VPN", "SSL VPN",
      "DNS Security", "DHCP Security", "Antivirus", "EDR/XDR", "Snort", "Suricata",
      "Wireshark", "DVWA", "WebGoat", "OWASP Juice Shop", "Burp Suite", "OWASP ZAP"
    ]),
    practicalLabs: Object.freeze([
      "Vulnerability Assessment Practical", "Wireshark Network Analysis Practical",
      "Web Application Security Practical", "Integrated Practical Assessment"
    ]),
    safetyNotice: "Practical exercises are intended only for isolated laboratory environments, systems owned by the learner, or systems for which explicit authorization has been provided.",
    assessment: Object.freeze({
      title: "Integrated Practical Assessment",
      areas: Object.freeze(["Network discovery", "Service identification", "Vulnerability assessment", "Defensive review", "Security analysis", "Findings", "Remediation report"])
    }),
    outcomes: Object.freeze([
      "Explain core cybersecurity and information-security concepts, including the CIA triad and basic security principles.",
      "Use Kali Linux in an isolated virtual lab and work with Linux users, permissions, files and packages.",
      "Understand authorization, ethical-hacking scope and safe laboratory practice.",
      "Perform introductory information gathering, reconnaissance, Nmap scanning and enumeration.",
      "Understand vulnerability assessment, findings validation, evidence and remediation.",
      "Understand network segmentation, VLANs, ACLs, DMZ architecture and FortiGate firewall fundamentals.",
      "Understand VPN, DNS and DHCP security fundamentals.",
      "Recognize malware and ransomware risks, endpoint defense, IDS/IPS and security-monitoring concepts.",
      "Analyze network traffic using Wireshark and document suspicious findings.",
      "Practice web-security assessment in intentionally vulnerable training applications.",
      "Document security findings and remediation.",
      "Understand cybersecurity career paths and skill-development options."
    ]),
    lectures: Object.freeze([
      cyberStartLecture("01", "Cybersecurity Fundamentals", "Introduction to Cybersecurity", [
        "1.1 Cybersecurity, Information Security & Ethical Hacking Overview",
        "1.2 CIA Triad - Confidentiality, Integrity & Availability",
        "1.3 Authentication, Authorization, Accountability & Non-Repudiation",
        "1.4 Threats, Vulnerabilities, Risks, Exploits & Attack Surfaces"
      ]),
      cyberStartLecture("02", "Linux Fundamentals", "Linux Fundamentals", [
        "2.1 Virtualization Overview & Installing Kali Linux on VMware",
        "2.2 Kali Linux Repositories, Users, Updates & Basic System Setup",
        "2.3 Linux Users, Groups, Files, Directories & Permissions",
        "2.4 Linux File System Structure & Essential Directories"
      ]),
      cyberStartLecture("03", "Linux Package Management", "Linux Fundamentals", [
        "3.1 Linux Package Management Fundamentals - APT & dpkg",
        "3.2 Installing, Updating & Upgrading Linux Packages",
        "3.3 Removing Packages, Dependencies & Package Maintenance"
      ]),
      cyberStartLecture("04", "Ethical Hacking Foundations", "Ethical Hacking Basics", [
        "4.1 Ethical Hacking Ethics, Authorization, Scope & Lab Safety",
        "4.2 Hacker Types, Attack Categories & Ethical Hacking Phases",
        "4.3 Black-Box, Gray-Box & White-Box Testing",
        "4.4 Isolated Ethical Hacking Lab, VM Networking & Snapshots"
      ]),
      cyberStartLecture("05", "Reconnaissance, Network Scanning & Enumeration", "Ethical Hacking Basics", [
        "5.1 Information Gathering, Footprinting & Reconnaissance",
        "5.2 Network Scanning with Nmap - Host Discovery, Ports, Services & Version Detection",
        "5.3 Enumeration Fundamentals & Service Identification",
        "5.4 Nmap NSE & Basic Network Service Enumeration"
      ]),
      cyberStartLecture("06", "Vulnerability Assessment Practical", "Hands-on Practical Labs", [
        "6.1 Vulnerability Scanning vs Vulnerability Assessment vs Penetration Testing",
        "6.2 Network & Web Vulnerability Discovery with Nmap & Nikto",
        "6.3 OpenVAS Vulnerability Assessment - Findings Validation, Severity, False Positives, Evidence & Remediation"
      ]),
      cyberStartLecture("07", "Secure Network Architecture", "Firewall & Network Security (Fortinet)", [
        "7.1 Secure Network Architecture & Network Segmentation Fundamentals",
        "7.2 VLANs & Access Control Lists - ACLs",
        "7.3 DMZ Architecture & Controlled Service Exposure"
      ]),
      cyberStartLecture("08", "Fortinet / FortiGate Firewall Security", "Firewall & Network Security (Fortinet)", [
        "8.1 Firewall Types, NGFW Concepts & FortiGate Security Fundamentals",
        "8.2 Firewall Policies, Rule Management & Secure Configuration",
        "8.3 Network Access Control - NAC & Access Security Fundamentals"
      ]),
      cyberStartLecture("09", "VPN & Core Network Services Security", "Firewall & Network Security (Fortinet)", [
        "9.1 VPN Fundamentals, IPsec/SSL VPN & Secure Remote Access",
        "9.2 DNS Security Fundamentals",
        "9.3 DHCP Security Fundamentals"
      ]),
      cyberStartLecture("10", "Malware, Ransomware & Endpoint Defense", "Cyber Defense & Threat Prevention", [
        "10.1 Malware & Ransomware Threats - Malware Types & Indicators of Compromise",
        "10.2 Endpoint Protection - Antivirus, EDR/XDR, Application Allowlisting & Security Baselines",
        "10.3 Malware & Ransomware Detection, Prevention & Recovery"
      ]),
      cyberStartLecture("11", "IDS/IPS & Security Monitoring", "Cyber Defense & Threat Prevention", [
        "11.1 IDS/IPS Concepts, Traffic Inspection, Snort & Suricata Fundamentals",
        "11.2 Security Logs, Events, Alerts & Monitoring Fundamentals",
        "11.3 Detection Logic, IOC/Behavior-Based Detection & Alert Triage"
      ]),
      cyberStartLecture("12", "Wireshark Network Analysis Practical", "Hands-on Practical Labs", [
        "12.1 Wireshark Packet Capture & Network Traffic Analysis Fundamentals",
        "12.2 Capture Filters, Display Filters & Protocol Analysis",
        "12.3 Identifying Suspicious Network Traffic & Documenting Findings"
      ]),
      cyberStartLecture("13", "Web Application Security Practical", "Hands-on Practical Labs", [
        "13.1 Web Security Lab Setup - DVWA, WebGoat & OWASP Juice Shop",
        "13.2 Web Application Testing with Burp Suite & OWASP ZAP",
        "13.3 Vulnerability Identification, Evidence & Remediation"
      ]),
      cyberStartLecture("14", "Real-World Cybersecurity Case Studies", "Real-world Case Studies", [
        "14.1 Vulnerability Assessment & Web Security Case Study",
        "14.2 Network, Firewall & Cyber Defense Case Study",
        "14.3 SOC Incident Response, Lessons Learned & Remediation"
      ]),
      cyberStartLecture("15", "Cybersecurity Career Guidance & Skill Development", "Career Guidance & Next Steps", [
        "15.1 Cybersecurity Career Paths & Role Selection",
        "15.2 Practical Skill Development - Home Labs, CTFs, Portfolio & GitHub",
        "15.3 Interviews, Certifications & Continuous Learning Roadmap"
      ]),
      cyberStartLecture("16", "Integrated Practical Assessment", "Hands-on Practical Labs / Next Steps", [
        "16.1 Integrated Cybersecurity Practical - Network Discovery, Service Identification, Vulnerability Assessment & Defensive Review",
        "16.2 Security Analysis, Findings & Remediation Report"
      ])
    ])
  });

  const oxegeSource = window.oxegeCurriculumSource;
  const oxegeCybersecurityProgram = Object.freeze({
    id: "oxege-professional-cybersecurity",
    name: "Professional Cybersecurity & Ethical Hacking Program",
    sequence: 3,
    poster: "oxege-cyber-security-workshop-poster.jpg",
    shortName: "Oxege Professional Cybersecurity Program",
    subtitle: "CEH v13 / CEH AI-Aligned Curriculum",
    organization: "Oxege Technologies",
    relationship: "Independent training partner",
    location: "Rahim Yar Khan, Pakistan",
    instructor: "Muhammad Ahmed Talha",
    role: "CyberSecurity Specialist & Instructor",
    employmentType: "Part-Time / Contract",
    year: 2026,
    deliveryMode: "Online & Physical Instructor-Led Training",
    physicalLocation: "Rahim Yar Khan",
    currency: "PKR",
    originalPrice: 89999,
    price: 44999,
    approximateUsdPrice: 159,
    approximateInrPrice: 15499,
    duration: "Three-Month Program",
    alignment: "Curriculum aligned with CEH v13 / CEH AI topics",
    officialDisclaimer: "This is an independent professional cybersecurity curriculum aligned with relevant CEH v13 / CEH AI subject areas. It is not presented as official EC-Council courseware or an EC-Council-authorized training program.",
    coreModuleCount: 20,
    professionalModuleCount: 12,
    moduleCount: 32,
    introductorySectionCount: 2,
    topicCount: 587,
    audience: Object.freeze(["Beginners", "Students", "Job seekers", "Aspiring cybersecurity professionals"]),
    description: "A three-month instructor-led cybersecurity and ethical-hacking training program delivered in partnership with the independent organization Oxege Technologies, combining a CEH v13 / CEH AI-aligned ethical-hacking core with broader professional cybersecurity coverage across defensive security, SOC/SIEM, threat hunting, DFIR, cloud security, DevSecOps, AI security, practical assessments, reporting and career development.",
    safetyNotice: "All offensive-security exercises, attack simulations, exploitation, password auditing, wireless testing, malware analysis, DoS simulation, social-engineering simulation and related activities are intended only for systems owned by the learner or systems for which explicit written authorization has been provided, preferably inside isolated lab environments.",
    tracks: Object.freeze([
      Object.freeze({ id: "core", number: "01", name: "CEH v13 / CEH AI-Aligned Core", moduleCount: 20, topics: Object.freeze(["Ethical hacking", "Reconnaissance", "Scanning", "Enumeration", "Vulnerability analysis", "System security", "Malware", "Network analysis", "Social engineering", "Availability", "Session security", "Network defense", "Web & API", "SQL", "Wireless", "Mobile", "IoT/OT", "Cloud", "Cryptography"]) }),
      Object.freeze({ id: "professional", number: "02", name: "Professional Cybersecurity", moduleCount: 12, topics: Object.freeze(["GRC", "Network infrastructure", "IAM", "Endpoint security", "SOC/SIEM", "Threat intelligence", "Threat hunting", "DFIR", "Backup/DR", "DevSecOps", "AI security", "Penetration testing", "Purple team", "Reporting", "Career development"]) })
    ]),
    outcomeGroups: Object.freeze([
      Object.freeze({ name: "Offensive Security", topics: Object.freeze(["Ethical hacking methodology", "Reconnaissance, scanning & enumeration", "Vulnerability assessment", "Authorized penetration testing", "Web/API & wireless security"]) }),
      Object.freeze({ name: "Defensive Security", topics: Object.freeze(["Security hardening", "Endpoint & malware defense", "IDS/IPS & firewall architecture", "Detection & monitoring"]) }),
      Object.freeze({ name: "Security Operations", topics: Object.freeze(["SOC & SIEM fundamentals", "Alert triage & detection logic", "Threat hunting", "Threat intelligence"]) }),
      Object.freeze({ name: "Incident Response & DFIR", topics: Object.freeze(["Incident handling", "Evidence fundamentals", "Disk, memory & network forensics", "Forensic reporting"]) }),
      Object.freeze({ name: "Enterprise Security", topics: Object.freeze(["GRC", "IAM & Active Directory", "Network security", "Backup, disaster recovery & continuity"]) }),
      Object.freeze({ name: "Modern Security", topics: Object.freeze(["Cloud, containers & Kubernetes", "DevSecOps & software supply chain", "AI & machine learning security"]) }),
      Object.freeze({ name: "Professional Development", topics: Object.freeze(["Assessment methodology", "Reporting & capstones", "Portfolio & GitHub projects", "Interviews & career roadmaps"]) })
    ]),
    toolGroups: Object.freeze([
      Object.freeze({ name: "Reconnaissance", tools: Object.freeze(["Nmap", "Masscan", "SpiderFoot", "theHarvester", "Shodan"]) }),
      Object.freeze({ name: "Vulnerability Management", tools: Object.freeze(["Nikto", "OpenVAS", "Nessus", "Rapid7 InsightVM"]) }),
      Object.freeze({ name: "System Security", tools: Object.freeze(["John the Ripper", "Hashcat", "Hydra", "Metasploit", "BloodHound"]) }),
      Object.freeze({ name: "Network & Defense", tools: Object.freeze(["Wireshark", "Snort", "Suricata", "Cowrie", "FortiGate", "pfSense"]) }),
      Object.freeze({ name: "Web Security", tools: Object.freeze(["Burp Suite", "OWASP ZAP", "DVWA", "WebGoat", "OWASP Juice Shop", "sqlmap"]) }),
      Object.freeze({ name: "Malware / DFIR", tools: Object.freeze(["Ghidra", "YARA", "Autopsy", "Volatility"]) }),
      Object.freeze({ name: "SOC / SIEM", tools: Object.freeze(["Wazuh", "Splunk", "Elastic Security", "Security Onion", "Sigma"]) }),
      Object.freeze({ name: "Mobile", tools: Object.freeze(["ADB", "JADX", "APKTool", "MobSF", "Frida"]) }),
      Object.freeze({ name: "Cloud / DevSecOps", tools: Object.freeze(["AWS", "Azure", "Google Cloud", "Docker", "Trivy", "Kubernetes"]) })
    ]),
    curriculum: oxegeSource || Object.freeze({ counts: Object.freeze({}), sections: Object.freeze([]) }),
    sources: Object.freeze(["EC-Council CEH program", "NIST Cybersecurity Framework 2.0", "MITRE ATT&CK", "OWASP API Security Project"])
  });

  const data = {
    organization: Object.freeze({
      name: "HackStark",
      type: "Cybersecurity education and open source organization",
      email: "hackstarkofficial@gmail.com",
      description: "An independent cybersecurity education and open source organization focused on practical, ethical and responsible security learning.",
      origin: "HackStark began as a cybersecurity learning community in 2018 and has since evolved into an organization while preserving its community roots."
    }),
    trainingPartners: Object.freeze([
      Object.freeze({ name: "TechFly", relationship: "Independent training partner", program: "CyberStart Level 1" }),
      Object.freeze({ name: "Oxege Technologies", relationship: "Independent training partner", program: "Professional Cybersecurity & Ethical Hacking Program" })
    ]),
    founder: Object.freeze({
      name: "Muhammad Ahmed Talha",
      nameAliases: Object.freeze(["Muhammad Ahmed Talha", "Muhammad Talha", "Ahmed Talha", "Talha", "M. Ahmed Talha"]),
      title: "Founder & CEO of HackStark",
      role: "CyberSecurity & IT Infrastructure Professional | Instructor & Infrastructure Manager",
      location: "Rahim Yar Khan, Pakistan",
      email: "ahmedtalha470@gmail.com",
      phone: "+92 3023070227",
      availability: "Open to CyberSecurity, VAPT, Red Team and IT Infrastructure opportunities",
      summary: "CyberSecurity instructor and IT infrastructure manager with 6+ years of experience spanning security training, hands-on projects, penetration testing and enterprise IT operations. Most recently served as IT Assistant Manager at Toyota Royal Motors.",
      website: "https://mahmedtalha.github.io/portfolio/",
      resume: "M-Ahmed-Talha-Resume-2026.pdf?v=20260922-2",
      linkedin: "https://linkedin.com/in/ahmedtalha470",
      github: "https://github.com/mahmedtalha",
      education: Object.freeze({ degree: "BS Cyber Security", institution: "Islamia University of Bahawalpur (RYK)", cgpa: "3.5 / 4.0", years: "2020 – 2024" }),
      evidence: Object.freeze({
        students: "https://mahmedtalha.github.io/portfolio/#stats",
        projects: "https://mahmedtalha.github.io/portfolio/#projects",
        speaking: "https://mahmedtalha.github.io/portfolio/#speaking",
        education: "https://mahmedtalha.github.io/portfolio/#certifications"
      })
    }),
    founderSkills: Object.freeze({
      cybersecurity: Object.freeze(["Penetration Testing", "Red Teaming", "Vulnerability Assessment (VAPT)", "Digital Forensics", "OWASP Top 10", "WAPT", "OSINT", "Security Auditing"]),
      tools: Object.freeze(["Metasploit", "Nmap", "Nessus", "OpenVAS", "Wireshark", "Recon-ng", "Aircrack-ng", "Hashcat"]),
      infrastructure: Object.freeze(["TCP/IP & Subnetting", "VLANs & VPNs", "DHCP / DNS", "Fortinet Firewall", "pfSense & MikroTik", "Active Directory", "Group Policy (GPO)", "Windows Server", "Linux System Administration", "IP CCTV & NVR"]),
      exposure: Object.freeze(["Python (Scapy/PyQt)", "PowerShell", "Bash Scripting", "AWS", "Microsoft Azure", "Google Cloud", "VMware / Hyper-V", "Splunk", "Microsoft Sentinel", "CrowdStrike Falcon", "Wazuh", "Ghidra", "Git & GitHub", "Acronis Backup"])
    }),
    founderExperience: Object.freeze([
      Object.freeze({ role: "IT Assistant Manager", organization: "Toyota Royal Motors", location: "Rahim Yar Khan", period: "2025 – 2026", summary: "Managed three network environments, SQL-based Windows servers, NAS, routers, endpoints, backup and disaster recovery, centralized VNC support, Google Workspace, attendance systems, IP CCTV/NVR and staff CyberSecurity awareness." }),
      Object.freeze({ role: "IT Assistant", organization: "Chaudhry Sugar Mills Ltd", period: "2024 – 2025", summary: "Led network and system upgrades across three weighbridges and 70+ workstations; supported Active Directory, Group Policy, Windows, pfSense, MikroTik, Fortinet and NETGATE environments." }),
      Object.freeze({ role: "Internship Trainee (CyberSecurity)", organization: "ITSOLERA PVT LTD", period: "2024", summary: "Performed web application penetration testing and vulnerability assessment, led Team Zeta in Red Team exercises, and built Python/Bash OSINT, metadata and reconnaissance tools." }),
      Object.freeze({ role: "CyberSecurity Specialist & Instructor", organization: "Oxege Technologies", employmentType: "Training Partner Engagement", period: "2026", summary: "Through an independent training partnership, delivers a three-month professional cybersecurity and ethical-hacking program with 32 modules and 587 topics." }),
      Object.freeze({ role: "CyberSecurity Instructor / Trainer", organization: "TechFly, Multan", employmentType: "Training Partner Engagement", period: "2026", summary: "Through an independent training partnership, delivers CyberStart Level 1 in an online two-month weekend format with supervised labs and a final practical assessment." }),
      Object.freeze({ role: "Teaching Assistant (CyberSecurity)", organization: "NAVTTC, IUB-RYK Campus", period: "2022", summary: "Facilitated hands-on VAPT, scanning, controlled exploitation and malware-analysis instruction while mentoring 50+ students." }),
      Object.freeze({ role: "CyberSecurity Project Intern", organization: "Prodigy InfoTech", period: "2024", summary: "Developed controlled-lab Python tools for image encryption, packet analysis and endpoint event capture." }),
      Object.freeze({ role: "Project Experience", organization: "CodeAlpha", period: "2024", summary: "Completed Python and CyberSecurity-focused project work as additional technical experience." }),
      Object.freeze({ role: "IT Administration", organization: "DevCastle BuiltinSoft", period: "2024", summary: "Managed IT support, computer-lab operations, network configuration and office administration for a software house." }),
      Object.freeze({ role: "Course Instructor", organization: "Udemy", period: "2021 – 2024", summary: "Developed and delivered 30+ hands-on CEH v11 modules and virtual labs, contributing to 5,000+ students trained across his teaching work." }),
      Object.freeze({ role: "Founder & CEO", organization: "HackStark", period: "Ongoing", summary: "Leads CyberSecurity education, open-source initiatives, research, practical labs and a structured beginner ethical-hacking course with 50+ lessons covering 25+ tools and platforms." })
    ]),
    founderTraining: Object.freeze([
      Object.freeze({ type: "Degree", name: "BS Cyber Security", provider: "Islamia University of Bahawalpur (RYK)", detail: "CGPA 3.5 / 4.0 | 2020 – 2024" }),
      Object.freeze({ type: "Government training certificate", name: "Certificate in Cyber Security", provider: "NAVTTC Govt. Pakistan", detail: "Mar 2022 – Dec 2022" }),
      Object.freeze({ type: "Professional training", name: "Offensive Penetration Testing", provider: "Cybrary.com", detail: "15 hours | Dec 3, 2020" }),
      Object.freeze({ type: "Professional training", name: "Advanced Penetration Testing", provider: "Cybrary.com", detail: "15 hours | Dec 4, 2020" }),
      Object.freeze({ type: "Certification training", name: "Certified in CyberSecurity (CC) Training", provider: "(ISC)²", detail: "Official self-paced training | Jun 12, 2023" }),
      Object.freeze({ type: "Course completion", name: "Ethical Hacking Essentials", provider: "Code Red | EC-Council", detail: "Fundamental Pen-Testing Credential" })
    ]),
    speaking: Object.freeze({ event: "BZU Multan CIT Conference", date: "Aug 2026", role: "CyberSecurity Panelist & Speaker", topics: Object.freeze(["AI-enhanced cyber threats", "Quantum computing implications for cryptography and password security", "Human-firewall strategies", "Digital defense"]) }),
    website: Object.freeze({
      privacyPolicy: "privacy.html",
      termsOfService: "terms.html",
      responsibleUse: "#responsible-security",
      jarvisPrivacy: "JARVIS answers from website data in the browser. Questions and conversation history are kept in memory for the current page session and are not sent to an external AI service by HackStark.",
      accountProvider: "Clerk",
      enrollment: "Course enrollment and transaction review are handled manually. A prepared WhatsApp message or payment proof does not itself confirm payment or activate access."
    }),
    socials: Object.freeze({ github: githubProfile, founderGithub: "https://github.com/mahmedtalha", contactForm: "https://docs.google.com/forms/d/e/1FAIpQLScdbT_vnWj5tRU2b-XP_PdamjncAMHc3sgl6rGEUI8EHMe4QQ/viewform?usp=sharing", youtube: "https://www.youtube.com/@hackstark8829", facebook: "https://facebook.com/hackstarkk/", telegramChannel: "https://t.me/hackstarkofficial", telegramContact: "https://t.me/hackstarkk", instagram: "https://www.instagram.com/hackstark/" }),
    projects: Object.freeze(projects),
    portfolioProjects: Object.freeze(portfolioProjects),
    videos: Object.freeze(videos),
    courses: Object.freeze([ethicalHackingCourse, cyberStartCourse, oxegeCybersecurityProgram]),
    cyberStartCourse,
    oxegeCybersecurityProgram,
    focusAreas: Object.freeze(["Ethical hacking and penetration testing", "Network security", "IoT and wireless security", "OSINT and reconnaissance", "Security automation", "Linux and controlled security labs"]),
    securityWorkflow: Object.freeze([
      Object.freeze({ id: "understand", number: "01", name: "Understand", summary: "Concept & scope", label: "Security mindset / Understand", title: "Understand before applying.", description: "Learn the concept, ethical scope and defensive purpose before using a technique." }),
      Object.freeze({ id: "practice", number: "02", name: "Practice", summary: "Controlled lab", label: "Security mindset / Practice", title: "Practice safely.", description: "Apply the concept inside an authorized, controlled lab." }),
      Object.freeze({ id: "harden", number: "03", name: "Harden", summary: "Defensive action", label: "Security mindset / Harden", title: "Strengthen defenses.", description: "Remediate findings, verify fixes and document defensive evidence." })
    ]),
    courseAreas: Object.freeze(["virtualization and Kali Linux lab setup", "ethical hacking foundations and authorization", "footprinting, reconnaissance and OSINT", "network scanning and enumeration", "vulnerability analysis", "system and endpoint security", "malware threats and defensive analysis", "traffic analysis and sniffing", "social engineering awareness", "denial of service resilience", "session security", "IDS, firewalls and honeypots", "web server and web application security", "DVWA, WebGoat, XSS and SQL injection concepts", "wireless security", "mobile platform security", "IoT security", "cloud computing and VPS fundamentals", "cryptography", "continued research and responsible practice"]),
    statistics: Object.freeze({ snapshotDate: "2026-09-07", publicRepositories: projects.length, projectRecords: "15+", githubFollowers: 9, publicGists: 0, featuredVideos: videos.length, courseLessons: 50, courseModules: 21, labLessons: 4, linkedCourseLessons: 4, experienceClaim: "6+", managedWorkstationsClaim: "400+", trainedStudentsClaim: "5,000+", securityToolsAndProjectsClaim: "15+" }),
    history: Object.freeze({ source: "HackStark.txt", communitySince: 2018, originalDescription: "A community sharing knowledge of IoT (Internet of Things) in penetration testing.", originalGoal: "Teach people what they can do with their gadgets, improve their internet skills and develop clearer concepts about hacking and the internet.", learningPromise: "No previous programming experience is needed to begin the ethical hacking learning path.", historicalHandles: Object.freeze({ facebook: "facebook.com/hackstarkofficial", telegramGroup: "@hackstarkk", telegramChannel: "@hackstarkofficial", instagram: "@hackstark", github: "@hackstarkofficial", twitter: "@HackStarkk" }), historicalWhatsAppCommunities: Object.freeze(["HackStark Official", "HackStark 2.O Official", "Hacking Courses 4 Free"]) }),
    runtime: { repositories: null, githubLoadedAt: null }
  };

  window.hackstarkData = Object.freeze(data);
})();
