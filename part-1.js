const readlineSync = require('readline-sync');
let boatsLeft;

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
    return ([grid, guessesArray]); 
}
const pressStartKey = () => {
    let pressedKey = readlineSync.keyIn("Press any key to start the game.");
}

const entry = (pressedKey) => {
    if (pressedKey) { 
        let guessOne = readlineSync.question("Enter a location to strike ie 'A2'");
        return guessOne;
    } 
}

const validEntry = () => {
            const gridLocations = ["A1", "B1", "C1", "A2", "B2", "C2", "A3", "B3", "C3"];
            let guess = readlineSync.question("Enter a location to strike ie 'A2'");
        if (guessesArray.includes(guess)) {
            console.log("You have already picked this location. Miss!")
            validEntry();
        } else {   
            do {
                if (gridLocations.includes(guess)) {
                    guessConverter(guess);
                } else {
                    console.log("Invalid Entry");
                    validEntry();
                }
            } while (guess);
        }    
}

const guessConverter = (guess) => {
    [rowLetter, columnNumber] = [...guess.split('')];
    columnNumber = Number(columnNumber);
    const letters = ["A", "B", "C"];
    rowNumber = (letters.indexOf(rowLetter));
    let convertedGuess = [rowNumber, columnNumber, rowLetter];
    if (boatsLeft === 2) {
        guessesArray.push(convertedGuess);
        gamePlay(convertedGuess);
    } else {
        guessesArray.push(convertedGuess);
        gamePlay(convertedGuess);
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

const gamePlay = (convertedGuess, grid) => {
    console.log('hello');
    [rowNumber, columnNumber, rowLetter] = [...convertedGuess];
    console.log(rowNumber, columnNumber, rowLetter);
    if (grid[rowNumber][columnNumber - 1] != "X") {
        console.log('You have missed!'); 
        validEntry();
    }  else if (grid[rowNumber][columnNumber - 1] === "X" && boatsLeft === 2) {
        console.log("Hit. You have sunk a battleship. 1 ship remaining.");
        validEntry();
    }  else if (grid[rowNumber][columnNumber - 1] === "X" && boatsLeft === 1) {
        askPlayAgain();
    }
}

const playGame = () => {
    boatsLeft = 2;
    [grid, guessesArray]  = [...gameGrid()];
    pressStartKey();
    console.log(grid, guessesArray);
    validEntry();
    // gamePlayFirst(convertedGuessOne, grid);
    // console.log(tyler);
}

playGame();

export { gridCreate };