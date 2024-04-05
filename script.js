const gridWidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");

const gridSketchArea = document.querySelector("#grid-sketch-area");
const slider = document.querySelector("#myRange");
const sliderValue = document.querySelector("#slider-value");
const gridToggle = document.querySelector("#grid-toggle");

let squaresAside = 16;
let gridOn = false;
let drawing = false;

function toggleGrid(){
    gridOn = !gridOn;
    gridToggle.style.color = gridOn ? accentColor : inactiveColor;
    if (gridOn) {
        createGridCells();
    }
   else {removeGridCells();
   }

}
function changeBackgroundColor(e) {
    if (e.type === "mousedown") {
        drawing = true;
        e.target.style.backgroundColor = "black";
    } else if (e.type === "mouseover" && drawing) {
        e.target.style.backgroundColor = "black";
    } else drawing = false;
}
function createGridCells() {
    const sumOfSquares = squaresAside ** 2;
    let widthOrHeight;
    for (let i = 0; i < (sumOfSquares); i++) {
        const gridCell = document.createElement("div");
        if (gridOn) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresAside) - 2}px`
            gridCell.style.border = `1px solid whitesmoke`
        } else if (!gridOn) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresAside)}px`
            gridCell.style.border = "none";
        }
        gridCell.style.width = widthOrHeight;
        gridCell.style.height = widthOrHeight;
        gridCell.addEventListener("mousedown", (e) => changeBackgroundColor(e));
        gridCell.addEventListener("mouseover", (e) => changeBackgroundColor(e));
        gridCell.addEventListener("mouseup", (e) => changeBackgroundColor(e));

        gridSketchArea.appendChild(gridCell);


    }

}

function removeGridCells() {
    while (gridSketchArea.firstChild) {
        gridSketchArea.removeChild(gridSketchArea.firstChild);
    }
}

slider.oninput = function() {
    sliderValue.textContent = `${this.value}x${this.value} (Resolution)`;
    squaresAside = parseInt(this.value);
    removeGridCells();
    createGridCells();
}
gridToggle.addEventListener("click", toggleGrid);
createGridCells();