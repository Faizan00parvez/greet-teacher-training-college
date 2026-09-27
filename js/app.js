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

  /* ---------- "Our Colleges" dropdowns ---------- */
  function closeDrops() {
    Array.prototype.slice.call(document.querySelectorAll(".nav-drop.open")).forEach(function (d) {
      d.classList.remove("open");
      var b = d.querySelector(".nav-drop-btn");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }
  Array.prototype.slice.call(document.querySelectorAll(".nav-drop-btn")).forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var drop = btn.closest(".nav-drop");
      var wasOpen = drop.classList.contains("open");
      closeDrops();
      if (!wasOpen) {
        drop.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-drop")) closeDrops();
  });

  /* ---------- header shadow ---------- */
  var header = document.getElementById("siteHeader");
  window.addEventListener("scroll", function () {
    header.classList.toggle("scrolled", window.scrollY > 8);
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
