
import persons from "./persons.json" with { type: "json" };

function renderPersons() {
    const tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";

    for (const person of persons) {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = person.id;
        tr.appendChild(tdId);
        const tdName = document.createElement("td");
        tdName.textContent = person.name;
        tr.appendChild(tdName);
        const tdAge = document.createElement("td");
        tdAge.textContent = person.alter;
        tr.appendChild(tdAge);
        const tdHeight = document.createElement("td");
        tdHeight.textContent = person.groesse;
        tr.appendChild(tdHeight);
        const tdBirthDate = document.createElement("td");
        tdBirthDate.textContent = person.geburtsdatum;
        tr.appendChild(tdBirthDate);
        const tdOrigin = document.createElement("td");
        tdOrigin.textContent = person.herkunft;
        tr.appendChild(tdOrigin);
        const tdWeight = document.createElement("td");
        tdWeight.textContent = person.gewicht;
        tr.appendChild(tdWeight);

        tbody.appendChild(tr);
    }
}

const thId = document.getElementById("thid");
let thIdAsc = true;
thId.addEventListener("click", () => {
    console.log("thId was clicked");
    persons.sort((a, b) => {
        if (thIdAsc) return a.id - b.id;
        else return b.id - a.id;
    });
    thIdAsc = !thIdAsc;
    renderPersons();
});

const thname = document.getElementById("thname");
let thnameAsc = true;
thname.addEventListener("click", () => {
    console.log("thname was clicked");
    persons.sort((a, b) => {
        if (thnameAsc) return a.name.localeCompare(b.name);
        else return b.name.localeCompare(a.name);
    });
    thnameAsc = !thnameAsc;
    renderPersons();
});

const thage = document.getElementById("thage");
let thageAsc = true;
thage.addEventListener("click", () => {
    console.log("thage was clicked");
    persons.sort((a, b) => {
        if (thageAsc) return a.alter - b.alter;
        else return b.alter - a.alter;
    });
    thageAsc = !thageAsc;
    renderPersons();
});

const thsize = document.getElementById("thheight");
let thheightAsc = true;
thsize.addEventListener("click", () => {
    console.log("thsize was clicked");
    persons.sort((a, b) => {
        if (thheightAsc) return a.groesse - b.groesse;
        else return b.groesse - a.groesse;
    });
    thheightAsc = !thheightAsc;
    renderPersons();
});

const thbirth = document.getElementById("thbirth");
let thbirthAsc = true;
thbirth.addEventListener("click", () => {
    console.log("thbirth was clicked");
    persons.sort((a, b) => {
        if (thbirthAsc) return a.geburtsdatum.localeCompare(b.geburtsdatum);
        else return b.geburtsdatum.localeCompare(a.geburtsdatum);
    });
    thbirthAsc = !thbirthAsc;
    renderPersons();
});

const thorigin = document.getElementById("thorigin");
let thoriginAsc = true;
thorigin.addEventListener("click", () => {
    console.log("thorigin was clicked");
    persons.sort((a, b) => {
        if (thoriginAsc) return a.herkunft.localeCompare(b.herkunft);
        else return b.herkunft.localeCompare(a.herkunft);
    });
    thoriginAsc = !thoriginAsc;
    renderPersons();
});

const thweight = document.getElementById("thweight");
let thweightAsc = true;
thweight.addEventListener("click", () => {
    console.log("thweight was clicked");
    persons.sort((a, b) => {
        if (thweightAsc) return a.gewicht - b.gewicht;
        else return b.gewicht - a.gewicht;
    });
    thweightAsc = !thweightAsc;
    renderPersons();
});

renderPersons();