const toggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check if the user has a saved theme preference
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeIcon.classList.remove('icon-sun');
    themeIcon.classList.add('icon-moon');
}

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    // Toggle theme icon
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('icon-sun');
        themeIcon.classList.add('icon-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('icon-moon');
        themeIcon.classList.add('icon-sun');
        localStorage.setItem('theme', 'light');
    }
});
