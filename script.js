const statusDisplay = document.querySelector('.game_status');

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));//cell classlarına sahip elemanları seçip click olayını addEventListener ile dinliyoruz, fuction parametresi olarak handleCellClick argümanını veriyoruz.

document.querySelector('.game_restart').addEventListener('click', handleRestartGame);

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];//Her bir dizi elemenı kutuların içeriğini temsil eder. Başlangıçta boştur.

const winningMessage = () => `Player ${currentPlayer} has won!`; 
const drawMessage = () => `Game finished!`; 
const currentPlayerTurn = () => `${currentPlayer}`;

statusDisplay.innerHTML = currentPlayerTurn();
//Kazanma şartları gameState indexleri ile temsil edilir.
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//bir hücreye tıklandığında çalışır.
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;//tıklanan hücre clickedCell atanır.
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell_index'));//html cell_index [cell_index] attribütünden hücrenin indexi okunur.

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;//tıklanan hücrenin index değerine göre gameState dizisinin indexine oyuncunun değeri atanır. X veya O
    clickedCell.innerHTML = currentPlayer; //tıklanan hücreye oyuncunun değeri yazdırılır. V veya O
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
} //Oyuncuyu değiştirir. X ise O yapar O ise X yapar ve sıra hangi oyuncuda ise yazar.

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];//Kazanma durumunu winningConditions içerisinde dönerek belirliyoruz.
        let a = gameState[winCondition[0]]; //0,3,6,..
        let b = gameState[winCondition[1]]; //1,4,7,..
        let c = gameState[winCondition[2]]; //2,5,8,..
        if (a === '' || b === '' || c === '') {
            continue;
        }// a,b veya c den herhangi biri boş ise kazanılmış bir oyun yok demektir.
        if (a === b && b === c) {
            roundWon = true;
            break
        }//Eğer her hangi bir kazanma durumuna eşit ise roundWon===true döner.döngüden çıkar. Oyunun artık kazananı vardır.
    } 

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }//Kazanma mesajı yazdırılır, oyun bitirilir.

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}
//Oyuna reset atar 
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}