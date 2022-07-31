const readlineSync = require('readline-sync');
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const validGridLocations = (lettersArray) => {
    let array = [];
    for (let i = 1; i < 11; i++) {
        array.push(lettersArray.map(value => value + i))
    } 
    return array;
}

// console.log(validGridLocations(letters));
// gridLocations = validGridLocations(letters);
// console.log(JSON.stringify(gridLocations).includes("A1"));

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

// Math.floor(Math.random() * 3);


const randomShipPlacement = (grid) => {
    const shipLengths = [2, 3, 3, 4, 5];
    
    for (ship in shipLengths) {
        const startingSpot = Math.floor(Math.random() * (grid.length - ship));
        console.log(startingSpot)
    }

}

randomShipPlacement(gridCreate(10,10))

//there needs to be a way to store all of the ship 'X''s in an array and make sure that none of the values in
// one 'ship placement array' match any other placements



const validEntry = () => {
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