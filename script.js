const gridWidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");

const gridSketchArea = document.querySelector("#grid-sketch-area");
const slider = document.querySelector("#myRange");
const sliderValue = document.querySelector("#slider-value");
const gridToggle = document.querySelector("#grid-toggle");

let squaresAside = 16;
let interactionsCount = 0;
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
/*
Modifying the background color of the grid cell to take random rgb values
function changeBackgroundColor(e) {
    if (e.type === "mousedown") {
        drawing = true;
        e.target.style.backgroundColor = "black";
    } else if (e.type === "mouseover" && drawing) {
        e.target.style.backgroundColor = "black";
    } else drawing = false;
}*/

function changeBackgroundColor(e) {
    if (e.type === "mousedown" || drawing) {
        drawing = true;
        // Increment interactions count
        interactionsCount++;

        // Random RGB values
        const randomRed = Math.floor(Math.random() * 256);
        const randomGreen = Math.floor(Math.random() * 256);
        const randomBlue = Math.floor(Math.random() * 256);

        // Darkening
        const darkeningFactor = 0.9 ** interactionsCount;

        // Darkened RGB values
        const darkenedRed = Math.floor(randomRed * darkeningFactor);
        const darkenedGreen = Math.floor(randomGreen * darkeningFactor);
        const darkenedBlue = Math.floor(randomBlue * darkeningFactor);

        // Construct RGB color string and apply to grid cell
        e.target.style.backgroundColor = `rgb(${darkenedRed}, ${darkenedGreen}, ${darkenedBlue})`;

        // If interactions reach 10, reset count for next iteration
        if (interactionsCount === 10) {
            interactionsCount = 0;
        }
    }
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
        /*gridCell.addEventListener("mousedown", (e) => changeBackgroundColor(e));
        gridCell.addEventListener("mouseover", (e) => changeBackgroundColor(e));
        gridCell.addEventListener("mouseup", (e) => changeBackgroundColor(e));*/

        gridCell.addEventListener("mousedown", function(e) {
            drawing = true;
            changeBackgroundColor(e);
        });

        gridCell.addEventListener("mouseover", function(e) {
            if (drawing) {
                changeBackgroundColor(e);
            }
        });

        gridCell.addEventListener("mouseup", function(e) {
            drawing = false;
        });

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