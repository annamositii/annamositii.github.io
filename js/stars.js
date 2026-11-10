
const starfield = document.querySelector(".starfield");

const starCount = Math.min(
  140,
  Math.max(45, Math.floor(
    window.innerWidth * window.innerHeight / 12000
  ))
);

for (let i = 0; i < starCount; i++) {
  const star = document.createElement("span");

  star.classList.add("star");

  const size = Math.random() * 2 + 1;
  const duration = Math.random() * 4 + 2;
  const delay = Math.random() * -6;

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;

  star.style.animationDuration = `${duration}s`;
  star.style.animationDelay = `${delay}s`;

  starfield.appendChild(star);
}
