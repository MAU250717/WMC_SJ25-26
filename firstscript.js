function toggleText() {
  const textDiv = document.getElementById("mehrText");
  if (textDiv.style.display == "none") {
   textDiv.style.display = "block";
  } else {
    textDiv.style.display = "none";
  }
}

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

let manuallyOpened = false;

toggleBtn.addEventListener("click", () => {
    manuallyOpened = !manuallyOpened;

    if (manuallyOpened) {
        sidebar.classList.add("open");
    } else {
        sidebar.classList.remove("open");
    }
});

/* Hover soll nur wirken, wenn Nutzer NICHT manuell geöffnet hat */
sidebar.addEventListener("mouseenter", () => {
    if (!manuallyOpened) {
        sidebar.classList.add("open");
    }
});

sidebar.addEventListener("mouseleave", () => {
    if (!manuallyOpened) {
        sidebar.classList.remove("open");
    }
});

// Aktuellen Dateinamen holen (z.B. "about.html")
const currentPage = window.location.pathname.split("/").pop();

// Alle Nav-Links durchgehen
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {
    // Dateiname des Links holen
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }
});


