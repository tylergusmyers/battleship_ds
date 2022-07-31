const readlineSync = require('readline-sync');
let boatsLeft = 2;
let guessesArray = [];

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

const gridPlacement = (array) => {
    let num1 = Math.floor(Math.random() * 3);
    let num2 = Math.floor(Math.random() * 3);
    let num3 = Math.floor(Math.random() * 3);
    let num4 = Math.floor(Math.random() * 3);
    // need to make sure     [num1][num2] != [num3][num4]
    if (array[num1][num2] === array[num3][num4]) {
        gridPlacement(array);
        return;
    } else {
        array[num1][num2] = "X";
        array[num3][num4] = "X";
    }
    return array;
}
//   let guessesArray = [];
const gameGrid = () => {
    let grid = gridCreate(3, 3);
    gridPlacement(grid);
    return (grid); 
}

const pressStartKey = () => {
    let pressedKey = readlineSync.keyIn("Press any key to start the game.");
    if (pressedKey) { 
        validEntry(boatsLeft, guessesArray);
    }
}

const validEntry = (boatsLeft, guessesArray) => {
        const gridLocations = ["A1", "B1", "C1", "A2", "B2", "C2", "A3", "B3", "C3"];
        let guess = readlineSync.question("Enter a location to strike ie 'A2'");  
        if (gridLocations.includes(guess)) {
            console.log( {guess, boatsLeft, grid} );
            guessConverter(guess, boatsLeft, guessesArray);
        } else {
            console.log("Invalid Entry");
            validEntry(boatsLeft, guessesArray);
        }
}    


const guessConverter = (guess, boatsLeft, guessesArray) => {
    [rowLetter, columnNumber] = [...guess.split('')];
    columnNumber = Number(columnNumber);
    const letters = ["A", "B", "C"];
    rowNumber = (letters.indexOf(rowLetter));
    let convertedGuess = [rowNumber, columnNumber, rowLetter];
    console.log(boatsLeft + "tyler");
    repeat(convertedGuess, boatsLeft, guessesArray);
}

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

const repeat = (convertedGuess, boatsLeft, guessesArray) => {
    console.log(convertedGuess, boatsLeft, guessesArray);
    if (guessesArray.includes(String(convertedGuess))) {
        console.log("You have already picked this location. Miss!");
        validEntry(boatsLeft, guessesArray);
    } else {
        guessesArray.push(String(convertedGuess));
        if (boatsLeft === 2) {
            boatsLeft--;
            gamePlay(convertedGuess, grid, boatsLeft);
        } else {
            gamePlay(convertedGuess, grid, boatsLeft);
        }
    }
}

const gamePlay = (convertedGuess, grid, boatsLeft) => {
    [rowNumber, columnNumber, rowLetter] = [...convertedGuess];
    if (grid[rowNumber][columnNumber - 1] != "X") {
        console.log('You have missed!'); 
        validEntry(boatsLeft, guessesArray);
    }  else if (grid[rowNumber][columnNumber - 1] === "X" && boatsLeft === 1) {
        console.log("Hit. You have sunk a battleship. 1 ship remaining.");
        boatsLeft--;
        validEntry(boatsLeft, guessesArray);
    }  else if (grid[rowNumber][columnNumber - 1] === "X" && boatsLeft === 0) {
        askPlayAgain();
    }
}

const askPlayAgain = () => {
    let playAgain = readlineSync.keyInYN("You have destroyed all battleships. Would you like to play again? Y/N");
        if (playAgain === true) {
            playGame();
        } else {
            process.exit();
        }
}

const playGame = () => {
    boatsLeft = 2;
    guessesArray = [];
    grid  = gameGrid();
    console.log(grid);
    pressStartKey();
}

playGame();
