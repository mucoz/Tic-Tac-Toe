
let board;
let playerX = 'X';
let playerO = 'O';
let currPlayer;
let winnerPlayer;
let gameOver = false;

window.onload = function(){
    setGame();
}

function setGame(){

    //Set winner player to nobody
    winnerPlayer = '';
    //Assign X for the first move
    currPlayer = playerX;
    gameOver = false;
    //clear inside the board element at the beginning of the game
    document.getElementById("board").innerHTML = '';
    //Make restart button hidden. It will be visible at the end only
    document.getElementById("info").innerHTML = 'player : ' + currPlayer;
    
    board = [
        [' ',' ', ' '],
        [' ',' ', ' '],
        [' ',' ', ' ']
    ]

    for (let r=0; r<3; r++){
        for (let c=0; c<3; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r === 0 || r === 1){
                tile.classList.add("horizontal-line");
            }
            if (c === 0 || c === 1){
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", setTile);
            document.getElementById("board").append(tile);
        }
    }

}

function setTile(){
    if (gameOver){
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] !== ' '){
        return;
    }

    board[r][c] = currPlayer;    
    this.innerText = currPlayer;
    

    if (currPlayer == playerO){
        currPlayer = playerX;
    }
    else{
        currPlayer = playerO;
    }

    //Update the info section
    document.getElementById("info").innerHTML = 'player : ' + currPlayer;

    checkWinner();
    setRestart();
}

function checkWinner(){
    //horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            //if we found the winning row
            //apply the winner style to that row
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
                tile.classList.add(currPlayer);
            }
            gameOver = true;
            return;
        }
    }

    //vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            //if we found the winning col
            //apply the winner style to that col
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
                tile.classList.add(currPlayer);
            }
            gameOver = true;
            return;
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
            tile.classList.add(currPlayer);
        }
        gameOver = true;
        return;
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");
        tile.classList.add(currPlayer);

        //1-1
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");
        tile.classList.add(currPlayer);

        //2-0
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        tile.classList.add(currPlayer);
        gameOver = true;
        return;
    }
}

function setRestart(){

    if (!gameOver){
        return;
    } else{
        document.getElementById("info").innerHTML = '';
        let restartBtn = document.createElement("button");
        restartBtn.setAttribute("id", "restart");
        restartBtn.innerHTML= "Restart";
        document.getElementById("info").append(restartBtn);
        restartBtn.addEventListener('click', setGame);
    }

}