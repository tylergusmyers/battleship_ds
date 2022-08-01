const readlineSync = require('readline-sync');
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const shipLengths = [2, 3, 3, 4, 5];
let unitsLeft =  17;
let guessesArray = [];
let coordinates = [];

const hasDuplicate = (array) => array.length !== new Set(array).size;

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

const overflowCheck = (startAndLength, grid) => {
    for (let i = 0; i < startAndLength.length; i++) {
        if ((startAndLength[i][0] + startAndLength[i][2]) > 10) {
            startAndLength[i][0] = 1 + startAndLength[i][0] - startAndLength[i][2];
        } 
        if ((startAndLength[i][1] + startAndLength[i][2]) > 10) {
            startAndLength[i][1] = 1 + startAndLength[i][1] - startAndLength[i][2];
        }
        console.log(startAndLength);
    } 
    verticalOrHorizontal(startAndLength);
}

const coordinateDuplicateCheck = (coordinates) => {
    if (hasDuplicate(coordinates)) {
        startingSpot(gridCreate(10, 10));
    } else {
        console.log(coordinates);
        placeBoats(coordinates);
    }
}

const coordinateSpread = (num1, num2) => {
    // console.log(num1, num2);
    let array = [];
    for (let i = 0; i < num2; i++) {
        array.push((num1 - 1) + (num2 - i));
    }
    return array;
}

const spreadArray = (xArray, yArray) => {
    if (xArray.length === 1) {
        for (let i = 0; i < yArray.length; i++) {
            coordinates.push(`${xArray[0]},${yArray[i]}`);
        }
    }
    if (yArray.length === 1) {
        for (let i = 0; i < xArray.length; i++) {
            coordinates.push(`${xArray[i]},${yArray[0]}`);
        }
    } 
    return coordinates;
} 

const placeBoats = (coordinates) => {
    grid[item[0] + i][item[1]] = "X";
}

const verticalOrHorizontal = (startAndLength) => {
    for (item in startAndLength) {
        let direction = Math.floor(Math.random() * 2);        
        if (direction < 0.5) {
            coordinates = spreadArray((coordinateSpread(startAndLength[item][0],startAndLength[item][2])), [startAndLength[item][1]]);  
        } else {
            coordinates = spreadArray([startAndLength[item][0]], (coordinateSpread(startAndLength[item][1], startAndLength[item][2])));  
        } 
    }     
    coordinateDuplicateCheck(coordinates);
}    

// Then make sure none of the coordinates overlap

// Math.floor(Math.random() * 3);
const startingSpot = (grid) => {
    let startAndLength = [];
    for (ship in shipLengths) {
        const startingSpot1 = Math.floor(Math.random() * (grid.length));
        const startingSpot2 = Math.floor(Math.random() * (grid.length));
        startAndLength.push([startingSpot1, startingSpot2 ,shipLengths[ship]]);
    }
    overflowCheck(startAndLength, grid);
}
startingSpot(gridCreate(10, 10));

const pressStartKey = () => {
    let pressedKey = readlineSync.keyIn("Press any key to start the game.");
    if (pressedKey) { 
        validEntry(unitsLeft, guessesArray);
    }
}

const validEntry = (unitsLeft, guessesArray) => {
    let gridLocations = validGridLocations(letters);
    let guess = readlineSync.question("Enter a location to strike ie 'A2'");  
    for (let i = 0; i < gridLocations.length; i++) {
        if (gridLocations[i].includes(guess)) {
            guessConverter(guess, unitsLeft, guessesArray);
        } else {
            validEntry(unitsLeft, guessesArray);
        }
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
    pressStartKey();
}

