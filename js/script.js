const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const projectLists = document.querySelectorAll(".project-list");
const backToTop = document.getElementById('back-to-top');

let visibleSections = new Set();

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const id = entry.target.id;

            if (entry.isIntersecting) {
                visibleSections.add(id);
            } else {
                visibleSections.delete(id);
            }

            navLinks.forEach((link) => {
                const sectionId = link.getAttribute('href').substring(1);
                if (visibleSections.has(sectionId)) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            projectLists.forEach((list, index) => {
                const parentSection = list.closest('section');
                if (visibleSections.has(parentSection.id)) {
                    list.classList.add('show');
                } else if (!entry.isIntersecting && entry.target === parentSection) {
                    list.classList.remove('show');
                }
            });
        });
    },
    {
        threshold: [0, 0.3],
        rootMargin: "-10% 0px -10% 0px"
    }
);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0
    });
});

sections.forEach((section) => {observer.observe(section)});

setTimeout(() => {
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= -window.innerHeight * 0.1 && rect.bottom <= window.innerHeight * 1.1) {
            visibleSections.add(section.id);
            if (section.id === 'web-projects' || section.id === 'github-projects') {
                document.querySelector(`#${section.id} .project-list`).classList.add('show');
            }
        }
    });
}, 100);