function gridCreate(row, column) {
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
grid[1][2] = 9;
console.log(grid);