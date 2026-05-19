
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

// Einzelnes Bild hinzuladen
async function loadOnePicture() {
  statusText.textContent = "Lade ein neues Bild …";
 
  try {
    const res = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1"
    );
    const data = await res.json();
 
    const newPics = data.filter(pic => pic.media_type === "image");
 
    if (newPics.length === 0) {
      statusText.textContent = "Kein Bild erhalten – bitte erneut versuchen.";
      return;
    }
 
    pictureArray.push(...newPics);
    renderGallery();
    statusText.textContent = `${pictureArray.length} Bild(er) geladen.`;
  } catch (err) {
    statusText.textContent = "Fehler beim Laden des Bildes.";
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

    // Lightbox: Klick auf Bild
  document.querySelectorAll("[data-lightbox]").forEach(img => {
    img.addEventListener("click", e => {
      openLightbox(Number(e.target.dataset.lightbox));
    });
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

function openLightbox(index) {
  const pic = pictureArray[index];
  if (!pic) return;
 
  // Overlay
  const overlay = document.createElement("div");
  overlay.id = "lightbox-overlay";
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,.88);
    display:flex;align-items:center;justify-content:center;
    padding:1.5rem;box-sizing:border-box;
    animation:lbFadeIn .2s ease;
  `;
 
  overlay.innerHTML = `
    <style>
      @keyframes lbFadeIn { from { opacity:0 } to { opacity:1 } }
    </style>
 
    <div style="
      position:relative;max-width:900px;width:100%;
      background:#0d0d1a;border-radius:12px;overflow:hidden;
      box-shadow:0 8px 40px rgba(0,0,0,.7);
    ">
      <!-- Schließen-Button -->
      <button id="lb-close" style="
        position:absolute;top:12px;right:14px;z-index:10;
        background:rgba(0,0,0,.5);border:none;color:#fff;
        font-size:1.4rem;line-height:1;padding:.3rem .6rem;
        border-radius:6px;cursor:pointer;
      ">✕</button>
 
      <!-- Bild -->
      <img src="${pic.url}" alt="${pic.title}"
           style="width:100%;max-height:70vh;object-fit:contain;display:block;background:#000;">
 
      <!-- Info -->
      <div style="padding:1rem 1.2rem 1.2rem;">
        <strong style="font-size:1.1rem;color:#c8d8ff;">${pic.title}</strong>
        <span style="display:block;font-size:.8rem;color:#7a8aaa;margin:.2rem 0 .6rem;">${pic.date}</span>
        ${pic.explanation
          ? `<p style="font-size:.875rem;color:#b0bcd8;line-height:1.6;margin:0;
                       max-height:180px;overflow-y:auto;">${pic.explanation}</p>`
          : ""}
      </div>
    </div>
  `;
 
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
 
  // Schließen
  const close = () => {
    overlay.remove();
    document.body.style.overflow = "";
  };
 
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  overlay.querySelector("#lb-close").addEventListener("click", close);
  document.addEventListener("keydown", function onKey(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", onKey); }
  });
}

// Bilder neu laden
reloadBtn.addEventListener("click", loadPictures);
addOneBtn.addEventListener("click", loadOnePicture);

// Initial laden
loadPictures();