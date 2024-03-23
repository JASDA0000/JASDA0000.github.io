var board = [];
var rows = 8;
var columns = 8;

var minesCount = 5;
var minesLocation = []; // "2-2" , "3-4", "2-1"

var tilesClicked = 0; //goal to click all titles except the ones containing mines
var flagEnaled = false;


var gameOver = false;

window.onload = function() {
    startGame();
}
function setMines(){
    minesLocation.push("2-2");
    minesLocation.push("2-3");
    minesLocation.push("5-6");
    minesLocation.push("3-4");
    minesLocation.push("1-1");
}
function startGame() {
    document.getElementById("mines-count").innerHTML = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();

    //populate our board
    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++){
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }

    console.log(board);
}

function setFlag(){
    if(flagEnaled) {
        flagEnaled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    }
    else {
        flagEnaled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    }
}


function clickTile() {
    let tile = this;
    if (flagEnaled) {
        if(tile.innerText == ""){
            tile.innerText = "🚩";
        }
        else if (tile.innerHTML == "🚩"){
            tile.innerText = "";
        }
        return;
    }

    if(minesLocation.includes(tile.id)) {
        // alert("GAME OVER");
        gameOver = true;
        revealMines();
        return;
    }
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";
            }
        }
    }
}