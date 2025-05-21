// Dark Mode toggle with smooth animation
const darkToggle = document.getElementById("dark-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function setDarkMode(on) {
  if (on) {
    document.body.classList.add("dark-mode");
    darkToggle.textContent = "☀️";
    darkToggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    document.body.classList.remove("dark-mode");
    darkToggle.textContent = "🌙";
    darkToggle.setAttribute("aria-label", "Switch to dark mode");
  }
}

// Check local storage for preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setDarkMode(savedTheme === "dark");
} else {
  // Use OS preference
  setDarkMode(prefersDarkScheme.matches);
}

darkToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-mode");
  setDarkMode(!isDark);
  localStorage.setItem("theme", !isDark ? "dark" : "light");
});
