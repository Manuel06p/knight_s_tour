<div class="titlingpage">

![knight_image](https://github.com/user-attachments/assets/9f5ad3d5-99e4-4b47-9c7e-83c6385c41b8)

</div>

# Introduzione

Il problema del “Percorso del cavallo" o “Cavaliere di Euler", noto
anche come “Knight’s Tour" in inglese, rappresenta un intrigante
rompicapo proveniente dal mondo degli scacchi. La sfida posta è se sia
possibile per un cavallo, nel rispetto delle regole di movimento degli
scacchi, attraversare ogni casella di una scacchiera una sola volta. In
altre parole, il cavallo dovrebbe compiere una serie di spostamenti
secondo le regole consentite, senza mai ripetere una casella, fino a
esaurire tutte le caselle disponibili sulla scacchiera.

![dubbio_cavaliere_di_euler](https://github.com/user-attachments/assets/5b36f5c0-0787-489f-9b1f-303c0ceb6b48)

Questa problematica non solo attrae l’attenzione nel contesto degli
scacchi, ma presenta anche una rilevanza computazionale significativa.
La sua complessità intrinseca è legata alla teoria dei grafi, rendendo
il “Cavaliere di Euler" un esempio classico di problema NP-hard. Nella
risoluzione del problema esploreremo l’applicazione del backtracking, un
approccio ricorsivo che si dimostra efficace nell’affrontare questo tipo
di situazioni.

# Backtracking e ricorsione

Per la risoluzione del “Cavaliere di Euler" strategie come la
programmazione dinamica risultano incredibilmente potenti. In questo
caso specifico andremo ad utilizzare la tattica di backtracking che
prevede di provare una scelta e proseguire nel caso in cui essa sia
valida. Nel caso in cui invece non vi siano scelte valide, sarà
necessario tornare sui propri passi fino a trovare nuovamente una scelta
valida. Seguendo questo procedimento si arriverà ad un punto in cui la
soluzione verrà trovata o sarà possibile determinare che non esistano
soluzioni valide al problema.

<img width="2320" height="1040" alt="backtracking" src="https://github.com/user-attachments/assets/348505a1-fcd7-4db4-a5df-232453221783" />
  
Il programma che andremo successivamente ad analizzare, permetterà di
stabilire se, in una scacchiera di dimensione n\*n, sia possibile
completare il “Percorso del cavallo" partendo da una casella a scelta.
Per farlo il programma tenterà una alla volta le 8 mosse del cavallo,
fino a trovarne una valida. Provvederà poi a continuare il procedimento
fino alla scoperta della soluzione o, per mancanza di scelte, il ritorno
ad un passaggio precedente. Questo processo verrà gestito da una
funzione ricorsiva, che restituirà true nel caso in cui esista una
soluzione o false altrimenti.

# Programma

Il programma che andremo ad analizzare, verrà scomposto in varie parti
per facilitarne la descrizione. Verrà strutturato in modo da provare
tutte le caselle di partenza di una scacchiera di dimensione a scelta
(nel caso di prova 5), e stabilire quali conducano ad una soluzione del
problema del cavallo. Il codice è interamente scritto in JavaScript e
prevede l’utilizzo di una matrice per rappresentare la scacchiera.

## Lista di movimenti

Il cavallo, negli scacchi, può muoversi in 8 modi diversi (nel caso in
cui non esca dalla scacchiera), seguendo sempre un movimento di 2
caselle in una direzione e successivamente, un movimento di una casella
in direzione perpendicolare. Il movimento del cavallo viene spesso
descritto ad L, proprio perché i suoi movimenti ricordano quelli della
lettera.

![knight_moves](https://github.com/user-attachments/assets/07ed5f06-58a5-4724-89ad-c949c88a1e70)

  
Con questo concetto in mente, possiamo stabilire in un vettore le
possibili variazioni di coordinate in modo da poterle usare nelle
funzioni successive.

<div class="tcolorbox">

``` javascript
//Vettore contente i movimenti del cavallo
let coordinatesDirection =  [[2, 1], 
                            [1, 2], 
                            [-1, 2], 
                            [-2, 1],
                            [-2, -1], 
                            [-1, -2], 
                            [1, -2], 
                            [2, -1]];
```

</div>

## Creazione della scacchiera

Come accenato sopra, andremo ad utilizzare una matrice per rappresentare
le caselle della scacchiera. Ogni casella avrà come valore di partenza
0, il quale verrà poi modificato per tenere traccia dei movimenti del
cavallo.

<div class="tcolorbox">

``` javascript
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
```

</div>

## Preparazione per la ricerca della soluzione

Prima di andare a ricercare se esiste una soluzione con i valori scelti,
bisogna eseguire alcune operazioni preliminari. Questa funzione si
occupa di gestire la creazione della matrice con le dimensioni date,
impostare la casella di inizio su 1 (le altre caselle verrano
incrementate in base all’ordine in cui il cavallo le passerà), eseguire
alcuni controlli e gestire l’output all’utente. Sarà inoltre possibile
scegliere, tramite il parametro “showBoard", attivare e disattivare
l’output della scacchiera in caso di soluzione positiva. La
visualizzazione della matrice in console, ci permetterà di sapere con
esattezza le mosse compiute dal cavallo nella soluzione trovata.

<div class="tcolorbox">

``` javascript
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
```

</div>

## Ricerca della soluzione

Una volta preparata la matrice, sarà possibile iniziare la ricerca della
soluzione. Per farlo utilizzeremo una funzione ricorsiva, che opererà
nel seguente modo:  
Nel caso in cui la casella corrente sia uguale al numero di caselle
della scacchiera, la soluzione sarà stata trovata e sarà quindi
possibile restituire true.  
Se la prima condizione non dovesse essere vera, il programma inizierà a
provare le 8 mosse del cavallo fino a trovare la prima valida tra
esse.  
Nel caso in cui dovesse trovarla procederà a marcare la casella nella
matrice e a controllare se partendo da quella sia possibile trovare una
soluzione valida (ricorsione).  
Nel caso in cui le soluzioni da quel punto non siano valide, la casella
nella matrice verrà resettata a zero, e si proveranno le altre scelte.  
Nel caso in cui non esistano altre scelte disponibili il programma
restituirà false, attivando la procedura di backtracking.

<div class="tcolorbox">

``` javascript
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
```

</div>

## Test delle caselle di partenza

Per eseguire automaticamente il test di tutte le caselle di partenza
della scacchiera, potremmo utilizzare una funzione che calcoli
automaticamente le coordinate di esse, come la seguente.

<div class="tcolorbox">

``` javascript
//Funzione cerca una soluzione per ogni casella di partenza della scacchiera
function tryAllPositions(board_dim, showBoard) {
    for (let i = 0; i < board_dim; i++) {
        for (let j = 0; j < board_dim; j++) {
            knightTour(i, j, board_dim, showBoard);
        }
    }
}
```

</div>

## Test

Se dovessimo attivare la ricerca delle soluzioni in una scacchiera di
dimensione 5\*5, otterremmo i seguenti risultati:

<div class="tcolorbox">

``` javascript
tryAllPositions(5, false);
```

</div>

<div class="tcolorbox">

``` javascript
✔ Partendo da x: 0 e y: 0, percorso trovato
✘ Partendo da x: 1 e y: 0, percorso non trovato
✔ Partendo da x: 2 e y: 0, percorso trovato
✘ Partendo da x: 3 e y: 0, percorso non trovato
✔ Partendo da x: 4 e y: 0, percorso trovato
✘ Partendo da x: 0 e y: 1, percorso non trovato
✔ Partendo da x: 1 e y: 1, percorso trovato
✘ Partendo da x: 2 e y: 1, percorso non trovato
✔ Partendo da x: 3 e y: 1, percorso trovato
✘ Partendo da x: 4 e y: 1, percorso non trovato
✔ Partendo da x: 0 e y: 2, percorso trovato
✘ Partendo da x: 1 e y: 2, percorso non trovato
✔ Partendo da x: 2 e y: 2, percorso trovato
✘ Partendo da x: 3 e y: 2, percorso non trovato
✔ Partendo da x: 4 e y: 2, percorso trovato
✘ Partendo da x: 0 e y: 3, percorso non trovato
✔ Partendo da x: 1 e y: 3, percorso trovato
✘ Partendo da x: 2 e y: 3, percorso non trovato
✔ Partendo da x: 3 e y: 3, percorso trovato
✘ Partendo da x: 4 e y: 3, percorso non trovato
✔ Partendo da x: 0 e y: 4, percorso trovato
✘ Partendo da x: 1 e y: 4, percorso non trovato
✔ Partendo da x: 2 e y: 4, percorso trovato
✘ Partendo da x: 3 e y: 4, percorso non trovato
✔ Partendo da x: 4 e y: 4, percorso trovato
```

</div>

# Fonti

-   Google (motore di ricerca)

-   Chat GPT

-   DALL-E 3

-   Wikipedia
