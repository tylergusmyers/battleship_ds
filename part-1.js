const playGame = () => {
    gridInit();
    pressStartKey();
    firstGuess(entry); // return guess
    entryValidty(guess); // return valid or invalid guess. Invalid goes back to firstGuess() - valid move on
    repeatEntry(validornot); // return repeat or not. Repeat goes back to firstGuess() - not move on + push to array
    gamePlayOne(nonrepeating_guess); // hit move to secondGuess miss go to firstGuess
    secondGuess(entry2); // return guess
    entryValidty(guess2); // return valid or invalid guess. Invalid goes back to firstGuess() - valid move on
    repeatEntry(validornot); // return repeat or not. Repeat goes back to secondGuess() - not move on + push to array
    gamePlayTwo(nonrepeating_guess2); // hit askPlayAgain - miss secondGuess
    askPlayAgain() // yes playGame() - no exit program
}

const readlineSync = require('readline-sync');
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
    let guessesArray = [];
    let grid = gridCreate(3, 3);
    gridPlacement(grid);
    return [grid]; 
}
const pressStartKey = () => {
    let pressedKey = readlineSync.keyIn("Press any key to start the game.");
    if (pressedKey) { firstGuess(); }
}
const firstGuess = () => { 
    let guessNumber = 1;
    let guessOne = readlineSync.question("Enter a location to strike ie 'A2'");
    let validGuess = validEntry(guessOne);
    let convertedGuess = guessConverter(validGuess);
    return convertedGuess;
}
const validEntry = (anyGuess) => {
    const gridLocations = ["A1", "B1", "C1", "A2", "B2", "C2", "A3", "B3", "C3"];
    if (!gridLocations.includes(anyGuess) && guessNumber === 1) {
        console.log("Invalid entry");
        firstGuess();
    } else if (!gridLocations.includes(anyGuess) && guessNumber === 2) {
        console.log("Invalid entry");
        secondGuess();
    } else {
        return validGuess;
    }
}
const guessConverter = (guess) => {
    [rowLetter, columnNumber] = [...guess.split('')];
    columnNumber = Number(columnNumber);
    const letters = ["A", "B", "C"];
    rowNumber = (letters.indexOf(rowLetter));
    return (rowNumber, columnNumber, rowLetter);
}
const secondGuess = () => { 
    let guessNumber = 2;
    let guessTwo = readlineSync.question("Enter a location to strike ie 'A2'");
    let validGuess = validEntry(guessTwo);
    let convertedGuess = guessConverter(validGuess);
    return convertedGuess;
}
const askPlayAgain = () => readlineSync.keyInYN("You have destroyed all battleships. Would you like to play again? Y/N");
if (playAgain === true) {
    firstGuess();
} else {
    process.exit();
}
const gamePlay = () => {
    if (grid[rowNumber][columnNumber - 1] != "X" && guessNumber === 1) {
        console.log('You have missed!'); 
        firstGuess();
    }   else if (grid[rowNumber][columnNumber - 1] != "X" && guessNumber === 2) {
        console.log('You have missed!'); 
        secondGuess();
    }   else if (grid[rowNumber][columnNumber - 1] === "X" && guessNumber === 1) {
        console.log("Hit. You have sunk a battleship. 1 ship remaining.")
        secondGuess(); 
    }   else {
        askPlayAgain();
    }    
}

