// Button for drop down in "Books" section
function toggleBookDescription(button) {
    const description = button.closest('.book-description');
    description.classList.toggle('show-content');

    if (description.classList.contains('show-content')) {
        button.textContent = 'Less ▲';
        button.setAttribute('class', 'read-more-less');
    } else {
        button.textContent = 'More ▼';
        button.setAttribute('class', 'read-more');
    }
}

// Button for drop down in "About Me" section
function toggleAboutMeContent(button) {
    const description = button.closest('#text');
    description.classList.toggle('show-content');

    if (description.classList.contains('show-content')) {
        button.textContent = 'Less ▲';
        button.setAttribute('class', 'read-more-less');
    } else {
        button.textContent = 'More ▼';
        button.setAttribute('class', 'read-more');
    }
}

//Back to top functionality
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (window.scrollY > 500) {
        document.getElementById('back-to-top-btn').style.display = 'block';
    } else {
        document.getElementById('back-to-top-btn').style.display = 'none';
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
}