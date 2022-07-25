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

const grid = gridCreate(3, 3);
// Math.floor(Math.random() * 10);


// This will be for the letter input
const letterToNum = (row, letter) => {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    gridCreate(row, letters.indexOf(letter));
}   

console.log(letterToNum(10, "D"));