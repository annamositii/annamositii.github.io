const canvas = document.getElementById("canvas");

let isDragging = false;
let startX;
let startY;

let viewBox = {
    x: -5000,
    y: -5000,
    width: 10000,
    height: 10000
};

canvas.setAttribute(
    "viewBox",
    `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
);

canvas.addEventListener("mousedown", function(event) {
    isDragging = true;

    startX = event.clientX;
    startY = event.clientY;

    canvas.style.cursor = "grabbing";
});

canvas.addEventListener("mousemove", function(event) {
    if (!isDragging) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    viewBox.x -= dx * (viewBox.width / canvas.clientWidth);
    viewBox.y -= dy * (viewBox.height / canvas.clientHeight);

    canvas.setAttribute(
        "viewBox",
        `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
    );

    startX = event.clientX;
    startY = event.clientY;
});

canvas.addEventListener("mouseup", function() {
    isDragging = false;
    canvas.style.cursor = "grab";
});

canvas.addEventListener("mouseleave", function() {
    isDragging = false;
    canvas.style.cursor = "grab";
});

canvas.addEventListener("wheel", function(event) {
    event.preventDefault();

    // Decide whether to zoom in or out
    const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;

    // Find the mouse position on the screen
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Convert the mouse position into SVG coordinates
    const svgX =
        viewBox.x +
        (mouseX / canvas.clientWidth) * viewBox.width;

    const svgY =
        viewBox.y +
        (mouseY / canvas.clientHeight) * viewBox.height;

    // Change the size of the viewing area
    const newWidth = viewBox.width * zoomFactor;
    const newHeight = viewBox.height * zoomFactor;

    // Move the viewBox so the mouse stays over the same point
    viewBox.x = svgX - (mouseX / canvas.clientWidth) * newWidth;
    viewBox.y = svgY - (mouseY / canvas.clientHeight) * newHeight;

    viewBox.width = newWidth;
    viewBox.height = newHeight;

    // Update the SVG
    canvas.setAttribute(
        "viewBox",
        `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
    );
});


const svg = document.querySelector("svg");
const coordinates = document.getElementById("coordinates");

document.addEventListener("mousemove", (event) => {
  const point = svg.createSVGPoint();

  point.x = event.clientX;
  point.y = event.clientY;

  const svgPoint = point.matrixTransform(
    svg.getScreenCTM().inverse()
  );

  coordinates.textContent =
    `X: ${Math.round(svgPoint.x)} | Y: ${Math.round(svgPoint.y)}`;
});

const triggers = document.querySelectorAll(".popover-trigger");
const popover = document.getElementById("popover");

triggers.forEach(trigger => {

    trigger.addEventListener("mouseenter", () => {

        const position = trigger.getBoundingClientRect();
        const title = trigger.dataset.title;

        popover.querySelector("h3").textContent = title;

        popover.style.left = position.right + 10 + "px";
        popover.style.top = position.top + "px";

        popover.style.display = "block";

    });

const popupContent = {

    uyghur: `
        <h3>Uyghur</h3>
        <p>A Turkic language spoken primarily in the Xinjiang Uyghur Autonomous Region.</p>
        <a href="uyghur.html">Learn more</a>
    `,

    uzbek: `
        <h3>Uzbek</h3>
        <p>A Turkic language spoken primarily in Uzbekistan.</p>
        <a href="uzbek.html">Learn more</a>
    `,

    kazakh: `
        <h3>Kazakh</h3>
        <p>A Turkic language spoken primarily in Kazakhstan.</p>
        <a href="kazakh.html">Learn more</a>
    `

};

});