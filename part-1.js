const readlineSync = require('readline-sync');

// Create a grid of any dimension. Each row is an array of empty arrays.
const gridCreate = (row, column) => {
    let arr = [];
    for (let i = 0; i < row; i++ ) {
        arr[i] = [];
        for(let j = 0; j < column; j++){
            arr[i][j]= [];
        }
    }
    return arr;
}

// This will place one random ship (represented by 'X') on the grid.
const gridPlacement = (array) => {
    num1 = Math.floor(Math.random() * 3);
    num2 = Math.floor(Math.random() * 3);
    num3 = Math.floor(Math.random() * 3);
    num4 = Math.floor(Math.random() * 3);
    array[num1][num2] = "X";
    array[num3][num4] = "X";
}

// OVERALL GAME PLAY.
let pressedKey = readlineSync.keyIn("Press any key to start the game.");
if (pressedKey) {
    let grid = gridCreate(3, 3);
    gridPlacement(grid);
    console.log(grid)
} 

// Turn a letter entry into the corresponding row.
const strikeLocation = () => {
    const letters = ["A", "B", "C"];
    rowValue = letters.indexOf(entry);
}