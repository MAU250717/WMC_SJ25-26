function toggleText() {
  const textDiv = document.getElementById("mehrText");
  if (textDiv.style.display == "none") {
   textDiv.style.display = "block";
  } else {
    textDiv.style.display = "none";
  }
}