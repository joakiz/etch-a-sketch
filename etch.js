const container = document.getElementById('container');

//greate the grid-items and append items to container
function makeGrid(rows, columns) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-columns', columns);

    for (c = 0; c < (rows * columns); c++) {
        let cell = document.createElement('div');
        container.appendChild(cell).className = "grid-item";
    };

    //function to change the color of the grid items as the mouse moves over them
    //brightness decreases each time user hovers until item is black using filter
    const colorChange = document.querySelectorAll(".grid-item");
    for (var i = 0; i < colorChange.length; i++) { //iterate through the items
        colorChange[i].addEventListener("mouseover", function (e) {
            let brightness = getComputedStyle(e.target).getPropertyValue("filter").split(/\(([^)]+)\)/);

            if (brightness == "none") { // check to see current brightness
                e.target.style.backgroundColor = 'hsl(0, 3%, 93%)';
                e.target.style.filter = "brightness(1)"; //set initial brightness to 1
            } else if (brightness[1] > 0) {
                e.target.style.filter = `brightness(${brightness[1] - 0.1})`; //decrease brightness of item
            }

        });
    };

};

makeGrid(16, 16);

//eventlistener for resetbutton with a prompt asking how big the new grid should be
const btnClick = document.querySelector("#btn");
btnClick.addEventListener('click', function (e) {
    clear();
    var userInput = prompt("How many rows & columns should the grid contain? (1-100)");
    makeGrid(userInput, userInput);
})

//clear grid by removing each item
function clear() {
    const clearDiv = document.querySelectorAll('.grid-item');
    clearDiv.forEach(function (divEl) {
        divEl.remove();
    })
};
