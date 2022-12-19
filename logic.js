
let playerTurn = document.getElementById('player')
let restart = document.getElementById('restartButton')
let winner= document.getElementById('winningMessageText')
let cells = Array.from(document.getElementsByClassName('cell'))
const PLAYER_O_TEXT="O"
const PLAYER_X_TEXT="X"
let currentplayer =PLAYER_X_TEXT
let cellArray = Array(9).fill(null)
let winnerCombColor = getComputedStyle(document.body).getPropertyValue(' --winningComb')
playerTurn.innerHTML = "Turn " + currentplayer

const startGame= () => {
    cells.forEach(cell => cell.addEventListener('click',cellClick))
    console.log(cells)
}

const winningComb = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
restart.addEventListener('click',restartButton)

function cellClick(e) {
    const id = e.target.id
    if(!cellArray[id])
    {
        cellArray[id] = currentplayer
        e.target.innerHTML=currentplayer

        if(ifHasWon())
        {
            winner.innerHTML = currentplayer + " Has Won"
            cells.forEach(cell => cell.removeEventListener('click',cellClick))
            let winningComb = ifHasWon()
            winningComb.forEach(cell => cells[cell].style.Color = winnerCombColor)
        }
    }
    currentplayer = currentplayer == PLAYER_X_TEXT ? PLAYER_O_TEXT : PLAYER_X_TEXT
    playerTurn.innerHTML = "Turn " + currentplayer
}

function ifHasWon(){
    for(const comb of winningComb)
    {
        let [a,b,c] = comb

        if(cellArray[a]==currentplayer && cellArray[b] ==currentplayer && cellArray[c]==currentplayer)
        {
            return [a,b,c]
        }
        
    }
    return false
}

function restartButton(){
    cellArray.fill(null)
    cells.forEach(cell => {
        cell.innerText = ''
        cell.style.Color = ''
    })
    winner.innerHTML = ''
    startGame()
}

startGame()