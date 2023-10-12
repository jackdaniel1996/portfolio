function init() {
    toggleNavbarClass();
    gradientHover();
    anchorScroll();

    const section = document.querySelectorAll('section');
    const burger = document.querySelector('.burger-menu');

    window.addEventListener('scroll', function(event) {
        section.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add("inView");
            }
        });

        let elem = document.querySelector('.footer-elem');
        if(isInViewport(elem)) {
            expandFooter(true);
        } else {
            expandFooter(false);
        }
    });

    burger.addEventListener('click', toggleMobileNav);
}

function anchorScroll() {  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function toggleNavbarClass() {
    const navbar = document.getElementById('nav');
    if (window.scrollY > 0) {
        navbar.classList.add('glass-bg');
    } else {
        navbar.classList.remove('glass-bg');
    }
    window.addEventListener('scroll', toggleNavbarClass);
}

function gradientHover() {
    let element = document.querySelectorAll(".hover-gradient");
    element.forEach(function (elem) {
        elem.onmousemove = e => {
            const rect = elem.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;
        
            elem.style.setProperty("--mouse-x", `${x}px`);
            elem.style.setProperty("--mouse-y", `${y}px`);
        }
    });     
}


function isInViewport(elem) {
    var distance = elem.getBoundingClientRect();
    return (
        distance.top >= 0 &&
        distance.left >= 0 &&
        distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function expandFooter(grow) {    
    let footer = document.querySelector('.footer-bg-block');
    let content = document.querySelector('.footer-content-container');
    if(grow) {
        footer.classList.add('full-screen');
        content.classList.add('full-screen');
    } else {
        footer.classList.remove('full-screen');
        content.classList.add('full-screen');
    }
}

function toggleMobileNav() {
    const body = document.body;
    const links = document.querySelectorAll('.mobile-nav a');
    const isOpen = body.classList.contains('open');
    const delay = 100;

    body.classList.toggle('open', !isOpen);
    links.forEach(function (elem, i) {
        setTimeout(function () {
            const action = isOpen ? 'remove' : 'add';
            elem.classList[action]('in');
        }, i * delay);
    });
}