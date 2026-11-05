const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const textElements = document.querySelectorAll(
  ".title-card h1 a, nav a, .project-card a"
);

textElements.forEach(element => {
   if (element.querySelector("img")) return;
  
  const text = element.textContent;
  element.textContent = "";

  
  [...text].forEach((letter, index) => {
    if (letter === " ") {
      element.appendChild(document.createTextNode(" "));
      return;
    }

    const span = document.createElement("span");
    span.textContent = letter;
    span.classList.add("letter");
    span.style.animationDelay = `${index * 50}ms`;

    element.appendChild(span);
  });
});