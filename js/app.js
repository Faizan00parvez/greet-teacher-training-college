/* GREET site — hash router, menu, reveals, testimonials */
(function () {
  "use strict";

  /* ---------- testimonials (real, from greetteachertrainingcollege.in) ---------- */
  var TESTIMONIALS = [
    {
      img: "images/t-piyush.jpg",
      quote: "I am overwhelmed on completing my B.Ed. I appreciate the support and guidance I got from the team of GREET Teacher Training College. I enhanced my skills and carved a niche for my teaching abilities. Thank you!",
      name: "Piyush Kumar Singh",
      batch: "B.Ed · 2015–17"
    },
    {
      img: "images/t-mahesh.jpg",
      quote: "I enjoyed studying the course and gained the knowledge I needed to advance my career. The staff was very supportive and the course coordinators very helpful — they guided me through the course with attention and care.",
      name: "Mahesh Kumar Das",
      batch: "B.Ed · 2015–17"
    },
    {
      img: "images/t-babita.jpg",
      quote: "I'm very glad a friend suggested GREET to me. I found the courses informative and knowledge-gaining. The material was easy to understand with good examples, and GREET gave me real insight into the fields I'm interested in.",
      name: "Babita Kumari",
      batch: "B.Ed · 2015–17"
    },
    {
      img: "images/t-binita.jpg",
      quote: "It was a nice experience — the way of approaching students is fabulous, and the material was so good and easy to understand. Coming from a non-teaching background, I now understand how to teach and approach students. Very happy and fully satisfied. Thank you so much.",
      name: "Binita Kumari",
      batch: "B.Ed · 2015–17"
    },
    {
      img: "images/t-sandhya.jpg",
      quote: "It was a wonderful learning experience throughout the course — I gained knowledge of teaching methodology that has been very useful in my real-time work. I thank the mentors and coordinators for the learning.",
      name: "Sandhya Kumari",
      batch: "B.Ed · 2017–19"
    },
    {
      img: "images/t-ashik.jpg",
      quote: "My two years at GREET Teacher Training College were excellent — a memory to cherish for a lifetime. Full of learning opportunities, fun and frolic, and the academic grind one has to go through.",
      name: "Ashik Raja",
      batch: "B.Ed · 2017–19"
    }
  ];

  var grid = document.getElementById("testiGrid");
  if (grid) {
    grid.innerHTML = TESTIMONIALS.map(function (t) {
      return (
        '<article class="testi reveal">' +
          '<p class="testi-quote">' + t.quote + "</p>" +
          '<div class="testi-who">' +
            '<img src="' + t.img + '" alt="Photo of ' + t.name + '" loading="lazy">' +
            "<div><strong>" + t.name + "</strong><small>" + t.batch + "</small></div>" +
          "</div>" +
        "</article>"
      );
    }).join("");
  }

  /* ---------- hash router ---------- */
  var routes = ["", "about", "about-mission", "about-achievements", "about-faculties", "about-infrastructure",
                "disclosures", "disclosure-affiliation", "disclosure-recognition", "disclosure-approvals",
                "disclosure-land-affidavit", "disclosure-12a", "disclosure-qci",
                "courses", "gallery", "contact"];
  var views = Array.prototype.slice.call(document.querySelectorAll(".view"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".navbar a[data-route]"));

  /* ---------- per-route SEO: title + meta description ---------- */
  var SITE = "Greet Teacher Training College";
  var ROUTE_META = {
    "":                  { t: SITE + " | B.Ed & D.El.Ed in Rajdhanwar, Giridih, Jharkhand",
                           d: "Greet Teacher Training College, Pachrukhi (Rajdhanwar, Giridih) — NCTE-recognised B.Ed and D.El.Ed programmes affiliated to Vinoba Bhave University, Hazaribag and Jharkhand Academic Council, Ranchi. Empowering educators since 2007." },
    "about":             { t: "About Us | " + SITE + ", Giridih",
                           d: "About Greet Teacher Training College, Pachrukhi (Rajdhanwar, Giridih, Jharkhand) — established 2007 by the Gulam Roshan Education Empowerment Trust to train the next generation of teachers." },
    "about-mission":     { t: "Mission & Vision | " + SITE,
                           d: "Our mission: quality teacher education at an affordable cost — B.Ed and D.El.Ed programmes shaping confident, employable educators for Jharkhand and beyond." },
    "about-achievements":{ t: "Achievements | " + SITE,
                           d: "Milestones of Greet Teacher Training College, Rajdhanwar (Giridih) — NCTE recognition, university affiliations and a decade of teacher-training excellence." },
    "about-faculties":   { t: "Our Faculties | " + SITE,
                           d: "Meet the experienced teaching and non-teaching faculty of Greet Teacher Training College — B.Ed and D.El.Ed educators at Pachrukhi, Giridih, Jharkhand." },
    "about-infrastructure": { t: "Infrastructure & Facilities | " + SITE,
                           d: "1.6-acre Wi-Fi campus at Pachrukhi, Rajdhanwar (Giridih): 20 classrooms, laboratories, computer centre, library, auditorium and hostels." },
    "disclosures":       { t: "Mandatory Disclosures | " + SITE,
                           d: "Mandatory disclosures of Greet Teacher Training College — affiliation, NCTE recognition, approvals, land affidavit and 12A documents." },
    "disclosure-affiliation": { t: "Affiliation — VBU & JAC | " + SITE,
                           d: "Affiliation documents: Greet Teacher Training College is affiliated to Vinoba Bhave University, Hazaribag (B.Ed) and Jharkhand Academic Council, Ranchi (D.El.Ed)." },
    "disclosure-recognition": { t: "NCTE Recognition | " + SITE,
                           d: "NCTE recognition letters for the B.Ed and D.El.Ed programmes of Greet Teacher Training College, Giridih, Jharkhand." },
    "disclosure-approvals": { t: "Approvals | " + SITE,
                           d: "Statutory approvals of Greet Teacher Training College, Rajdhanwar (Giridih, Jharkhand)." },
    "disclosure-land-affidavit": { t: "Land Affidavit | " + SITE,
                           d: "Land affidavit of Greet Teacher Training College — campus land at Pachrukhi, Dhanwar, Giridih, Jharkhand." },
    "disclosure-qci":    { t: "QCI Report | " + SITE,
                           d: "QCI report — request the document from Greet Teacher Training College, Rajdhanwar (Giridih, Jharkhand)." },
    "courses":           { t: "B.Ed & D.El.Ed Courses | " + SITE + ", Jharkhand",
                           d: "B.Ed and D.El.Ed courses at Greet Teacher Training College, Pachrukhi (Rajdhanwar, Giridih, Jharkhand) — 2-year NCTE-recognised programmes. Apply via JCECEB counselling." },
    "gallery":           { t: "Gallery | " + SITE,
                           d: "Campus gallery of Greet Teacher Training College, Pachrukhi (Rajdhanwar, Giridih, Jharkhand)." },
    "contact":           { t: "Contact Us | " + SITE + ", Giridih",
                           d: "Contact Greet Teacher Training College — Railway Station Road, Dhanwar, Pachrukhi, Rajdhanwar, Giridih, Jharkhand 825412. Call 8409 923 795." }
  };
  function setRouteMeta(r) {
    var m = ROUTE_META[r] || ROUTE_META[""];
    document.title = m.t;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", m.d);
    var ogt = document.querySelector('meta[property="og:title"]');
    if (ogt) ogt.setAttribute("content", m.t);
    var ogd = document.querySelector('meta[property="og:description"]');
    if (ogd) ogd.setAttribute("content", m.d);
  }

  function currentRoute() {
    var h = window.location.hash.replace(/^#\/?/, "").replace(/\/$/, "");
    return routes.indexOf(h) === -1 ? "" : h;
  }

  function render() {
    var r = currentRoute();
    views.forEach(function (v) {
      v.classList.toggle("active", v.getAttribute("data-view") === (r === "" ? "home" : r));
    });
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-route") === r);
    });
    /* highlight the parent dropdown button when a child page is active */
    Array.prototype.slice.call(document.querySelectorAll(".nav-drop")).forEach(function (drop) {
      var btn = drop.querySelector(".nav-drop-btn");
      var hasActive = drop.querySelector("a.active") !== null;
      if (btn) btn.classList.toggle("active", hasActive);
    });
    closeMenu();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    setRouteMeta(r);
    requestAnimationFrame(observeReveals);
  }
  window.addEventListener("hashchange", render);

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("mainNav");
  function closeMenu() {
    nav.classList.remove("open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    closeDrops();
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeMenu();
  });

  /* ---------- nav dropdowns: hover-only on desktop, tap-toggle on touch ---------- */
  var fineHover = window.matchMedia("(hover:hover) and (pointer:fine)");
  function desktopHover() { return window.innerWidth > 1280 && fineHover.matches; }
  function pointInTriangle(px, py, ax, ay, bx, by, cx, cy) {
    var d = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);
    if (!d) return false;
    var l1 = ((by - cy) * (px - cx) + (cx - bx) * (py - cy)) / d;
    var l2 = ((cy - ay) * (px - cx) + (ax - cx) * (py - cy)) / d;
    return l1 >= 0 && l2 >= 0 && (1 - l1 - l2) >= 0;
  }
  function closeDrops() {
    Array.prototype.slice.call(document.querySelectorAll(".nav-drop.open, .nav-drop.hover-lock, .nav-drop.grace")).forEach(function (d) {
      d.classList.remove("open", "hover-lock", "grace");
      var b = d.querySelector(".nav-drop-btn");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }
  Array.prototype.slice.call(document.querySelectorAll(".nav-drop")).forEach(function (drop) {
    var btn = drop.querySelector(".nav-drop-btn");
    var menu = drop.querySelector(".nav-drop-menu");
    if (!btn || !menu) return;
    /* Clicks: on desktop-hover the menu is hover-only, so mouse clicks on the
       button are ignored (keyboard Enter/Space still toggles for a11y).
       On touch/mobile the tap toggles the accordion as before. */
    btn.addEventListener("click", function (e) {
      if (desktopHover() && e.detail !== 0) return;
      e.stopPropagation();
      var isOpen = drop.classList.contains("open");
      closeDrops();
      if (!isOpen) {
        drop.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
    /* Safe-triangle grace: when the cursor leaves the dropdown, keep the menu
       alive while it travels toward the menu/button (diagonal moves across the
       gap), and deactivate it the moment it veers elsewhere. */
    var graceTimer = null;
    function onGraceMove(ev) {
      if (drop.matches(":hover")) { endGrace(false); return; } /* back inside: CSS resumes */
      var t = drop._tri;
      if (t && pointInTriangle(ev.clientX, ev.clientY, t[0], t[1], t[2], t[3], t[4], t[5])) return;
      endGrace(true); /* veered away: deactivate */
    }
    function endGrace(lockIt) {
      if (graceTimer) { clearTimeout(graceTimer); graceTimer = null; }
      document.removeEventListener("mousemove", onGraceMove);
      drop.classList.remove("grace");
      drop._tri = null;
      if (lockIt) drop.classList.add("hover-lock");
    }
    drop.addEventListener("mouseenter", function () {
      if (!desktopHover()) return;
      endGrace(false);
      drop.classList.remove("hover-lock");
    });
    drop.addEventListener("mouseleave", function (e) {
      var wasLocked = drop.classList.contains("hover-lock");
      drop.classList.remove("hover-lock");
      if (!desktopHover() || wasLocked) return;
      var btnR = btn.getBoundingClientRect();
      var menuR = menu.getBoundingClientRect();
      var sx = e.clientX, sy = e.clientY, ax, ay, bx, by;
      if (sy < menuR.top) { ax = menuR.left; ay = menuR.top; bx = menuR.right; by = menuR.top; }
      else { ax = btnR.left; ay = btnR.bottom; bx = btnR.right; by = btnR.bottom; }
      drop._tri = [sx, sy, ax, ay, bx, by];
      drop.classList.add("grace");
      graceTimer = setTimeout(function () { endGrace(true); }, 500);
      document.addEventListener("mousemove", onGraceMove);
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-drop")) closeDrops();
  });

  /* ---------- header shadow ---------- */
  var header = document.getElementById("siteHeader");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 8);
    /* A hover-opened desktop dropdown would otherwise stay stuck open while
       the page scrolls under it (no mouseleave fires during scroll), so
       truly deactivate it: lock it shut until the mouse leaves the area. */
    if (fineHover.matches && window.innerWidth > 1280) {
      Array.prototype.slice.call(document.querySelectorAll(".nav-drop")).forEach(function (d) {
        if (d.matches(":hover") && !d.classList.contains("open") && !d.classList.contains("hover-lock")) {
          d.classList.add("hover-lock");
        }
      });
    }
  }, { passive: true });

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  function observeReveals() {
    document.querySelectorAll(".view.active .reveal:not(.in)").forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---------- contact form → mailto ---------- */
  var form = document.getElementById("queryForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var subject = "Admission query — " + (d.get("course") || "General");
      var body =
        "Name: " + d.get("name") + "\n" +
        "Email: " + d.get("email") + "\n" +
        "Course: " + d.get("course") + "\n\n" +
        d.get("message");
      window.location.href =
        "mailto:greetteachertrainingcollege@gmail.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  /* ---------- misc ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  render();
})();
