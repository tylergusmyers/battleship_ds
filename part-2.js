const readlineSync = require('readline-sync');
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const validGridLocations = (lettersArray) => {
    let array = [];
    for (let i = 1; i < 11; i++) {
        array.push(lettersArray.map(value => value + i))
    } 
    return array;
}

console.log(validGridLocations(letters));

const gridCreate = (row, column) => {
    let array = [];
    for (let i = 0; i < row; i++ ) {
        array[i] = [];
        for(let j = 0; j < column; j++){
            array[i][j]= [];
        }
    }
    return array;
}

// Math.floor(Math.random() * 3);
const randomShipPlacement = (grid) => {
    const shipLengths = [2, 3, 3, 4, 5];
    for (ship in shipLengths) {
        const startingSpot = Math.floor(Math.random() * (grid.length - ship));
        console.log(startingSpot)
    }
}

// randomShipPlacement(gridCreate(10,10))
//there needs to be a way to store all of the ship 'X''s in an array and make sure that none of the values in
// one 'ship placement array' match any other placements

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
    }  else if (grid[rowNumber][columnNumber - 1] === "X" && boatsLeft > 0) {
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
    boatsLeft = 5;
    guessesArray = [];
    grid  = gameGrid();
    console.log(grid);
    pressStartKey();
}

playGame();