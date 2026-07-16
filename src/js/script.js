function init() {
    window.addEventListener("load", function () {
        // ladeanimation
        const ladeanimation = document.querySelector(".loading");
        const kreis = document.querySelector(".loading-bg");
        const minDimension = Math.min(window.innerWidth, window.innerHeight);
        setTimeout(function () {
            ladeanimation.classList.add("done");
            document.body.style.overflow = "visible";
            kreis.style.width = `${minDimension * 2}px`;
            kreis.style.height = `${minDimension * 2}px`;
            setTimeout(function () {
                ladeanimation.style.display = "none";
            }, 1000);
        }, 500);
        start();
    });
}

function setAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.querySelector("#age").innerHTML = age;
}

function start() {
    setAge("1996/10/30");
    toggleNavbarClass();
    gradientHover();
    anchorScroll();
    // slider initialisieren
    document.querySelectorAll('.slider').forEach(initSlider);

    const burger = document.querySelector(".burger-menu");
    const headline = document.querySelectorAll("section .section-headline");
    const modeToggle = document.querySelectorAll(".mode-toggle-icon");
    const mobileNavElems = document.querySelectorAll(".mobile-nav a");

    window.addEventListener("scroll", function (event) {
        headline.forEach((element) => {
            if (isInViewport(element)) {
                element.classList.add("inView");
            }
        });

        let elem = document.querySelector(".footer-elem");
        if (isInViewport(elem)) {
            expandFooter(true);
        } else {
            expandFooter(false);
        }
    });

    burger.addEventListener("click", toggleMobileNav);
    mobileNavElems.forEach(function (elem) {
        elem.addEventListener("click", toggleMobileNav);
    });

    modeToggle.forEach(function (elem) {
        elem.addEventListener("click", toggleMode);
    });

    const mode = localStorage.getItem("mode");
    if (mode == "light_mode") {
        toggleMode();
    }

    let scrollIndicator = document.querySelector(".scroll-indicator");
    setTimeout(function () {
        scrollIndicator.classList.remove("hidden");
    }, 4000);
}

function anchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
}

function toggleNavbarClass() {
    const navbar = document.getElementById("nav");
    if (window.scrollY > 0) {
        navbar.classList.add("glass-bg");
    } else {
        navbar.classList.remove("glass-bg");
    }
    window.addEventListener("scroll", toggleNavbarClass);
}

function gradientHover() {
    let element = document.querySelectorAll(".hover-gradient");
    element.forEach(function (elem) {
        elem.onmousemove = (e) => {
            const rect = elem.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            elem.style.setProperty("--mouse-x", `${x}px`);
            elem.style.setProperty("--mouse-y", `${y}px`);
        };
    });
}

function isInViewport(elem) {
    var distance = elem.getBoundingClientRect();
    return (
        distance.top >= 0 &&
        distance.left >= 0 &&
        distance.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
        distance.right <=
            (window.innerWidth || document.documentElement.clientWidth)
    );
}

function expandFooter(grow) {
    let footer = document.querySelector(".footer-bg-block");
    let content = document.querySelector(".footer-content-container");
    if (grow) {
        footer.classList.add("full-screen");
        content.classList.add("full-screen");
    } else {
        footer.classList.remove("full-screen");
        content.classList.add("full-screen");
    }
}

function toggleMobileNav() {
    const body = document.body;
    const links = document.querySelectorAll(".mobile-nav a");
    const isOpen = body.classList.contains("open");
    const delay = 100;

    body.classList.toggle("open", !isOpen);
    links.forEach(function (elem, i) {
        setTimeout(function () {
            const action = isOpen ? "remove" : "add";
            elem.classList[action]("in");
        }, i * delay);
    });
}

function toggleMode() {
    const body = document.body;
    const modeToggle = document.querySelectorAll(".mode-toggle-icon");
    const isLightMode = body.classList.contains("lightMode");
    const action = isLightMode ? "remove" : "add";
    const mode = !isLightMode ? "dark_mode" : "light_mode";
    body.classList[action]("lightMode");
    localStorage.setItem("mode", isLightMode ? "dark_mode" : "light_mode");

    modeToggle.forEach(function (elem) {
        elem.innerHTML = mode;
    });
}

function showMore(btn, target) {
    const overlay = document.querySelector(target);
    const status = overlay.getAttribute("data-expanded");
    const show = "Mehr Details anzeigen";
    const hide = "Weniger Details anzeigen";

    if (status > 0) {
        overlay.setAttribute("data-expanded", 0);
        overlay.parentElement.setAttribute("data-expanded", 0);
        btn.innerHTML = show;
    } else {
        overlay.setAttribute("data-expanded", 1);
        overlay.parentElement.setAttribute("data-expanded", 1);
        btn.innerHTML = hide;
    }
}

function initSlider(sliderEl) {
    const slidesEl = sliderEl.querySelector('.slides');
    const slides = slidesEl.querySelectorAll('img');
    const dotsEl = sliderEl.querySelector('.dots');
    const prevBtn = sliderEl.querySelector('.prev');
    const nextBtn = sliderEl.querySelector('.next');

    let current = 0;
    const total = slides.length;

    // Dots erzeugen
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsEl.appendChild(dot);
    });
    const dots = dotsEl.querySelectorAll('.dot');

    function updateSlider() {
      slidesEl.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    function goToSlide(index) {
      current = (index + total) % total;
      updateSlider();
    }

    prevBtn.addEventListener('click', () => goToSlide(current - 1));
    nextBtn.addEventListener('click', () => goToSlide(current + 1));

    // Automatisches Weiterschalten
    let autoplay = setInterval(() => goToSlide(current + 1), 4000);

    // Autoplay pausieren bei Hover (nur für diesen Slider)
    sliderEl.addEventListener('mouseenter', () => clearInterval(autoplay));
    sliderEl.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goToSlide(current + 1), 4000);
    });

    // Tastatursteuerung nur, wenn dieser Slider fokussiert/gehovert ist
    sliderEl.setAttribute('tabindex', '0'); // damit der Slider fokussierbar ist
    sliderEl.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goToSlide(current - 1);
      if (e.key === 'ArrowRight') goToSlide(current + 1);
    });
}