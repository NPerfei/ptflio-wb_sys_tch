const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const projectLists = document.querySelectorAll(".project-list")

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove("active"));
                projectLists.forEach((projectList) => projectList.classList.remove("show"));

                const id = entry.target.id;
                document.querySelector(`nav a[href="#${id}"]`).classList.add('active');

                if (id == "web-projects") {
                    projectLists[0].classList.add("show");
                }
                else if (id == "github-projects") {
                    projectLists[1].classList.add("show");
                }
            }
        });
    },
    {
        threshold: 0.6,
    }
);

sections.forEach((section) => {observer.observe(section)});