const gallery = document.getElementById("gallery");
const statusText = document.getElementById("status");
const reloadBtn = document.getElementById("reloadBtn");

let pictureArray = [];


// NASA API laden
async function loadPictures() {
  statusText.textContent = "Lade Bilder …";
  gallery.innerHTML = ""; // DOM löschen

  try {
    const res = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=6"
    );
    const data = await res.json();

    // Nur Bilder behalten
    pictureArray = data.filter(pic => pic.media_type === "image");

    if (pictureArray.length === 0) {
      statusText.textContent = "Keine Bilddaten erhalten.";
      return;
    }

    renderGallery(); // DOM erzeugen
    statusText.textContent = "Fertig geladen.";
  } catch (err) {
    statusText.textContent = "Fehler beim Laden der NASA-API.";
    console.error(err);
  }
}


// Galerie rendern (DOM erzeugen)
function renderGallery() {
  gallery.innerHTML = ""; // vorherige DOM‑Nodes löschen

  pictureArray.forEach((pic, index) => {
    const fig = document.createElement("figure");
    fig.style.background = "var(--white)";
    fig.style.borderRadius = "var(--radius)";
    fig.style.boxShadow = "var(--shadow-card)";
    fig.style.overflow = "hidden";
    fig.style.position = "relative";

    fig.innerHTML = `
      <img src="${pic.url}" alt="${pic.title}"
            style="width:100%;height:220px;object-fit:cover;">
      <figcaption style="padding:.8rem 1rem;">
        <strong style="color:var(--azure-dark);">${pic.title}</strong><br>
        <span style="font-size:.8rem;color:var(--text-light);">${pic.date}</span>
      </figcaption>

      <button class="toggle-text-btn"
              style="position:absolute;top:10px;right:10px;padding:.3rem .8rem;font-size:.7rem;"
              data-index="${index}">
        Löschen
      </button>`;

    gallery.appendChild(fig);
  });

  // Event Listener für Löschen‑Buttons
  document.querySelectorAll("[data-index]").forEach(btn => {
    btn.addEventListener("click", deletePicture);
  });
}

// Bild löschen (DOM + Array)
function deletePicture(event) {
  const index = Number(event.target.dataset.index);

  // Aus Array entfernen
  pictureArray.splice(index, 1);

  // Galerie neu rendern
  renderGallery();

  if (pictureArray.length === 0) {
    statusText.textContent = "Alle Bilder gelöscht.";
  }
}

// Galerie neu laden
reloadBtn.addEventListener("click", loadPictures);

// Initial laden
loadPictures();