//Vettore contente i movimenti del cavallo
let coordinatesDirection =  [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]];

//Funzione ricorsiva per il piazzamento del cavallo in tutte le caselle, restituisce true se possibile, false altrimenti
function placeKnight(y, x, board) {

    if (board[y][x] === (board.length**2)) { //Se il numero della casella corrente è uguale al numero massimo di caselle
        return true; //Restituisce true
    }
    else {
        for (let i = 0; i < 8; i++) { //Prova a piazzare, utilizzando tutte le 8 direzioni possibili, un cavallo
            let y_current = y + coordinatesDirection[i][0]; //coordinate y della posizione da provare
            let x_current = x + coordinatesDirection[i][1]; //coordinate x della posizione da provare

            if (board[y_current] !== undefined && //Se la coordinata y non è undefined
                board[y_current][x_current] !== undefined // e la coordinata x associata alla coordinata y non è undefined
                && board[y_current][x_current] === 0) // e la casella è uguale a 0
            {
                board[y_current][x_current] = board[y][x] + 1; //Aggiorna il valore della casella incrementando il precedente
                if(placeKnight(y_current, x_current, board)) { //Se la posizione corrente porta alla soluzione del problema (ricorsione)
                    return true; //Restituisce true
                }

                board[y_current][x_current] = 0; //Altrimenti reimposta a zero il valore della casella e prova le posizioni successive
            }
        }

        return false; //Se non esiste posizione disponibile per il cavallo restituisce false
    }
}

//Crea una matrice della dimensione passata come parametro e la restituisce
function createBoard(board_dim) {
    let board = new Array(board_dim); //Crea una array di dimensione board_dim

    for (let i = 0; i < board.length; i++) { //Cicla board.length volte
        board[i] = []; //Crea un vettore vuoto per ogni indice
    }

    resetBoard(board); //Assegna 0 ad ogni valore della matrice

    return board; //Restituisce la matrice
}

//Funzione che stampa una matrice passata
function printBoard(board) {
    for (let i = 0; i < board.length; i++) { //Cicla le righe
        for (let j = 0; j < board.length; j++) { //Cicla le caselle della riga corrente
            process.stdout.write(board[i][j].toString().padStart(4) + ", "); //Stampa il valore della casella con una spaziatura di 4 caratteri compresi quelli del valore
        }
        process.stdout.write("\n\n"); //Aggiunge una riga vuota alla fine di ogni riga
    }
}

//Azzera i valori di una matrice passata come argomento
function resetBoard(board) {
    for (let i = 0; i < board.length; i++) { //Cicla le righe
        for (let j = 0; j < board.length; j++) { //Cicla le caselle della riga corrente
            board[i][j] = 0; //Imposta il valore della casella a zero
        }
    }
}


//Funzione che fornisce informazioni riguardo alla possibilità di effetuare il tour di cavallo partendo da una posizione indicata in una scacchiera di dimensione n*n
function knightTour(y, x, board_dim, showBoard) {
    if (board_dim > 0) { //Se la dimensione passata è maggiore di 0
        let board = createBoard(board_dim); //Viene creata una nuova matrice con la dimensione passata come parametro

        if (board[y] !== undefined && board[y][x] !== undefined) //Se la casella di partenza è valida
        {
            board[y][x] = 1; //Imposta la casella di partenza a 1
            if (placeKnight(y, x, board)) { //Se placeKnight restituisce true
                console.log("✔ Partendo da x: " + x + " e y: " + y + ", percorso trovato\n");
                if (showBoard) { //Se showBoard è uguale a true
                    printBoard(board);
                }
            } else { //Se placeKnight restituisce false
                console.log("✘ Partendo da x: " + x + " e y: " + y + ", percorso non trovato\n");
            }

        } else { //Se la casella di partenza non è valida
            console.log("Coordinate di partenza non valide!");
        }
    } else { //Se la dimensione passata è minore o uguale a 0
        console.log("Dimensione non valida!");
    }
}

//Funzione cerca una soluzione per ogni casella di partenza della scacchiera
function tryAllPositions(board_dim, showBoard) {
    for (let i = 0; i < board_dim; i++) {
        for (let j = 0; j < board_dim; j++) {
            knightTour(i, j, board_dim, showBoard);
        }
    }
}

tryAllPositions(5, false);