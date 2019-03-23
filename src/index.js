module.exports = function solveSudoku(matrix) {
    let gCol = 0;
    let gRow = 0;

    function ingress() {
        let masNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let col = 0; col < matrix[gRow].length; col++) {
           if (matrix[gRow][col] > 0 && masNumber.indexOf(matrix[gRow][col]) >= 0) {
               masNumber.splice(masNumber.indexOf(matrix[gRow][col]), 1);
           }
        }
        for (let row = 0; row < matrix.length; row++) {
            if (matrix[row][gCol] > 0 && masNumber.indexOf(matrix[row][gCol]) >= 0) {
                masNumber.splice(masNumber.indexOf(matrix[row][gCol]), 1);
            }
        }
        for (let row = Math.floor(gRow / 3) * 3; row < Math.floor(gRow / 3 + 1) * 3; row++) {
            for (let col = Math.floor(gCol / 3) * 3; col < Math.floor(gCol / 3 + 1) * 3; col++) {
                if (matrix[row][col] > 0 && masNumber.indexOf(matrix[row][col]) >= 0 ) {
                    masNumber.splice(masNumber.indexOf(matrix[row][col]), 1);
                }
            }
        }
        return masNumber;
    }

    function recfrugalbust(matrix) {
        if (gCol > 8) {
            gCol = 0;
            gRow++;
        }
        if( gRow > 8) {
            return matrix;
        }
        if (matrix[gRow][gCol]) {
            gCol++;
            if (recfrugalbust(matrix)) return matrix;
            gCol--;
            if(gCol < 0) {
                gCol = 8;
                gRow--;
            }
            return 0;
        }
        let position = ingress();
        for (let i = 0; i < position.length; i++) {
            matrix[gRow][gCol] = position[i];
            gCol++;
            if (recfrugalbust(matrix)) return matrix;
        }
        matrix[gRow][gCol] = 0;
        gCol--;
        if (gCol < 0) {
            gCol = 8;
            gRow--;
        }
        return 0;
    }
    return recfrugalbust(matrix);
};
