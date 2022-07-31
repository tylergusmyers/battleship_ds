const readlineSync = require('readline-sync');
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const shipLengths = [2, 3, 3, 4, 5];
let unitsLeft =  17;
let guessesArray = [];
let coordinates = [];

const validGridLocations = (lettersArray) => {
    let array = [];
    for (let i = 1; i < 11; i++) {
        array.push(lettersArray.map(value => value + i))
    } 
    return array;
}

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
grid  = gridCreate(10, 10);

const overflowCheck = (startAndLength) => {
    console.log('tyler');
    for (let i = 0; i < startAndLength.length + 1; i++) {
        if (startAndLength[i][0] + startAndLength[i][1] > 10) {
            startAndLength[i][0] = 1 + startAndLength[i][0] - startAndLength[i][1];
            console.log(startAndLength);
            return startAndLength;
            verticalOrHorizontal(startAndLength);
        } else {
            console.log(startAndLength);
            verticalOrHorizontal(startAndLength);
        }
    }   
}

const coordinatesCheck = (coordinates) => {
    if (array.includes(coordinates)){
        startingSpot();
    }
}


const horizontal = (item, grid) => {
    console.log(item[0], item[1], 'horiz');
    for (let i = 0; i < item[1]; i++) {
        grid[item[1]][item[0] + i] = "X";
    }
    console.log(coordinates);
    console.log(grid);
}

const vertical = (item, grid) => {
    console.log(item[0], item[1] , 'vert');
    for (let i = 0; i < item[1]; i++) {
      grid[item[1] + i][item[0]] = "X";
    }
    console.log(coordinates);
    console.log(grid);
}

const verticalOrHorizontal = (startAndLength) => {
    console.log(startAndLength);
    for (item in startAndLength) {
        let direction = Math.floor(Math.random() * 2);
        if (direction < 0.5) {
            horizontal(startAndLength[item], grid);
        } else {
            vertical(startAndLength[item], grid);
        }
    }
}

// Math.floor(Math.random() * 3);
const startingSpot = (grid) => {
    let startAndLength = [];
    for (ship in shipLengths) {
        const startingSpot = Math.floor(Math.random() * (grid.length));
        startAndLength.push([startingSpot, shipLengths[ship]]);
    }
    // console.log(startAndLength);
    overflowCheck(startAndLength);
}
startingSpot(gridCreate(10,10));


const pressStartKey = () => {
    let pressedKey = readlineSync.keyIn("Press any key to start the game.");
    if (pressedKey) { 
        validEntry(unitsLeft, guessesArray);
    }
}


const validEntry = (unitsLeft, guessesArray) => {
    const gridLocations = validGridLocations(letters);
    let guess = readlineSync.question("Enter a location to strike ie 'A2'");  
    if (gridLocations.includes(guess)) {
        console.log( {guess, unitsLeft, grid} );
        guessConverter(guess, unitsLeft, guessesArray);
    } else {
        console.log("Invalid Entry");
        validEntry(unitsLeft, guessesArray);
    }
}    

const guessConverter = (guess, unitsLeft, guessesArray) => {
    [rowLetter, columnNumber] = [...guess.split('')];
    columnNumber = Number(columnNumber);
    rowNumber = (letters.indexOf(rowLetter));
    let convertedGuess = [rowNumber, columnNumber, rowLetter];
    console.log(unitsLeft + "tyler");
    repeat(convertedGuess, unitsLeft, guessesArray);
}

const repeat = (convertedGuess, unitsLeft, guessesArray) => {
    console.log(convertedGuess, unitsLeft, guessesArray);
    if (guessesArray.includes(String(convertedGuess))) {
        console.log("You have already picked this location. Miss!");
        validEntry(boatsLeft, guessesArray);
    } else {
        guessesArray.push(String(convertedGuess));
        if (unitsLeft === 2) {
            unitsLeft--;
            gamePlay(convertedGuess, grid, unitsLeft);
        } else {
            gamePlay(convertedGuess, grid, unitsLeft);
        }
    }
}

const gamePlay = (convertedGuess, grid, unitsLeft) => {
    [rowNumber, columnNumber, rowLetter] = [...convertedGuess];
    if (grid[rowNumber][columnNumber - 1] != "X") {
        console.log('You have missed!'); 
        validEntry(unitsLeft, guessesArray);
    }  else if (grid[rowNumber][columnNumber - 1] === "X" && unitsLeft > 0) {
        console.log("Hit! Guess again!");
        unitsLeft--;
        validEntry(unitsLeft, guessesArray);
    }  else if (grid[rowNumber][columnNumber - 1] === "X" && unitsLeft === 0) {
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
    unitsLeft = 17;
    guessesArray = [];
    coordinates = [];
    grid  = gridCreate(10, 10);
    console.log(grid);
    pressStartKey();
}

// playGame();