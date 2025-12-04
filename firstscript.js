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


