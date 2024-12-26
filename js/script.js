const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");


const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove("active"));

                const id = entry.target.id;
                document.querySelector(`nav a[href="#${id}"]`).classList.add('active');
            }
        });
    },
    {
        threshold: 0.6,
    }
);

sections.forEach((section) => {observer.observe(section)});

