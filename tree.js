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