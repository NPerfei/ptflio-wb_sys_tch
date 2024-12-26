const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove("active"));
                sections.forEach((section) => {section.firstElementChild.classList.remove("active")})

                const id = entry.target.id;
                document.querySelector(`nav a[href="#${id}"]`).classList.add('active');
                document.getElementById(`${id}`).firstElementChild.classList.add('active');
            }
        });
    },
    {
        threshold: 0.7,
    }
);

sections.forEach((section) => {observer.observe(section)});
