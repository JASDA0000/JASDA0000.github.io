var board = []; // เก็บตารางของเกม Minesweeper
var rows = 8; // จำนวนแถวในตาราง
var columns = 8; // จำนวนคอลัมน์ในตาราง

var minesCount = 5; // จำนวนของลูกศรในเกม Minesweeper
var minesLocation = []; // พิกัดของลูกศร

var tilesClicked = 0; // จำนวนของช่องที่ถูกคลิก (เป้าหมายคือการคลิกช่องทุกช่องยกเว้นช่องที่มีลูกศร)
var flagEnabled = false; // สถานะของธงที่เปิดใช้งานหรือไม่

var gameOver = false; // สถานะของเกมว่าจบหรือยัง

window.onload = function() {
    startGame(); // เริ่มเกมเมื่อหน้าเว็บโหลดเสร็จ
}

// ฟังก์ชันสำหรับกำหนดพิกัดของลูกศร
function setMines(){
    let minesLeft = minesCount;
    while (minesLeft > 0){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if(!minesLocation.includes(id))
        {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

// เริ่มเกม
function startGame() {
    document.getElementById("mines-count").innerHTML = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    setMines();

    //สร้างตาราง
    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++){
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

// สลับสถานะธง
function setFlag(){
    if(flagEnabled) {
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    }
    else {
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    }
}

// จัดการเมื่อคลิกที่ช่อง
function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")){
        return;
    }

    let tile = this;
    if (flagEnabled) {
        if(tile.innerText == ""){
            tile.innerText = "🚩";
        }
        else if (tile.innerHTML == "🚩"){
            tile.innerText = "";
        }
        return;
    }

    if(minesLocation.includes(tile.id)) {
        alert("GAME OVER");
        gameOver = true;
        revealMines();
        return;
    }

    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);

}

// โชว์ลูกศรทั้งหมด
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

// ตรวจสอบลูกศร
function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns)
    {
        return;
    }
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    }

    board[r][c].classList.add("tile-clicked");

    let minesFound = 0;

    minesFound += checkTile(r-1, c-1);
    minesFound += checkTile(r-1, c);
    minesFound += checkTile(r-1, c+1);
    
    minesFound += checkTile(r, c-1);
    minesFound += checkTile(r, c+1);

    minesFound += checkTile(r+1, c-1);
    minesFound += checkTile(r+1, c);
    minesFound += checkTile(r+1, c+1);

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else {
        checkMine(r-1, c-1);
        checkMine(r-1, c);
        checkMine(r-1, c+1);

        checkMine(r, c-1);
        checkMine(r, c+1);

        checkMine(r+1, c-1);
        checkMine(r+1, c);
        checkMine(r+1, c+1);
    }

    if(tilesClicked == rows * columns - minesCount){
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
    }
}

// ตรวจสอบช่องที่คลิก
function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns)
    {
        return 0;
    }
    if (minesLocation.includes(r.toString() + "-" + c.toString())){
        return 1;
    }
    return 0;
}
