// grid creation
// const gridCreate = (row, column) => {
//     let arr = [];
//     for (let i = 0; i < row; i++ ) {
//         arr[i] = [];
//         for(let j = 0; j < column; j++){
//             arr[i][j]= [];
//         }
//     }
//     return arr;
// }
// const grid = gridCreate(3, 3);

// Random placement 
// const randomPlacement = () => {
//    let num1;
//    let num2;
//    do {
//         num1 = Math.floor(Math.random() * 10);
//         num2 = Math.floor(Math.random() * 10);
//     return {num1, num2};
//    } while (num1 === num2);
// }
// console.log(randomPlacement());

// verify letter input is in A-J range
// const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
// for (const letter in letters) {
//     if (letters[letter] != -1) {
//         letterToNum(letter);
//     } else {
//         "return to previous question";
//     }
// }
 
// Letter input to number converter
// const letterToNum = (letter) => {
//     const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
//     return letters.indexOf(letter);
// }  

// Logic for game continuation
// if ('number of ships' != 0) {
//    "continue game"
// } else {
//     "end game / would you like to play again"
// }