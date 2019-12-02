function game() {
    let moveCounter = 0;
    let finish = false;
    let players = [
        {
            name: 'pies'
        },
        {
            name: 'kot'
        }
    ];

    let win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let currentPlayer = players[0];
    let opponentPlayer = players[1];

    displayCurrentPlayer();

    let elementBoard = document.querySelector('.board');

    elementBoard.addEventListener('click', move)

    function displayCurrentPlayer() {
        let status = document.querySelector('.status');
        status.innerText = `Bieżący gracz: ${currentPlayer.name}`;
    }

    function move(event) {
        if (!finish && isCellEmpty(event.target) && isTargetCorrect(event.target)) {
            event.target.classList.add(`board__cell--${currentPlayer.name}`);
            event.target.classList.remove(`board__cell--${opponentPlayer.name}`);
            if (checkWin()) {
                document.querySelector('.result').innerText = 'wygrana!'
                finish = true;
                return;
            }
            if(moveCounter===8) {
                document.querySelector('.result').innerText = 'remis!'
                finish = true;
            }
            moveCounter++;
            opponentPlayer = players[((Math.abs(moveCounter - 1)) % 2)];
            currentPlayer = players[(moveCounter % 2)];
            displayCurrentPlayer();
        }


    }

    function checkWin() {
        if (moveCounter < 4) {
            return console.log('nocheck yet');
        }

        let cells = Array.from(document.querySelectorAll('.board__cell'))
            .map(cell => {
                if (isTargetPies(cell)) return {
                    name: 'pies'
                }
                if (isTargetKot(cell)) return {
                    name: 'kot'
                }
                return {
                    name: undefined
                }
            });

        let symbol = currentPlayer.name;
        let possibleWins = win.map(function (triple) {
            return tripleIsTheSame(triple, cells, symbol);
        })
        return possibleWins.includes(true);
    }

    function tripleIsTheSame(triple, cells, symbol) {
        for (let i = 0; i < triple.length; i++) {
            if (cells[triple[i]].name !== symbol) return false;
        }
        return true;
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        document.getElementById("changeTheme").innerHTML+= ":)"
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }      

    document.getElementById("changeTheme").addEventListener("click", function(){
       color = getRandomColor();
        document.body.style.backgroundColor = color;
    });

    function isTargetCorrect(target) {
        return target.classList.contains("board__cell");
    }

    function isTargetKot(target) {
        return target.classList.contains("board__cell--kot");
    }

    function isTargetPies(target) {
        return target.classList.contains("board__cell--pies");
    }

    function isCellEmpty(target) {
        return !isTargetPies(target) && !isTargetKot(target);
    }
}
document.writeln("Dziękujemy za odwiedziny!")
window.onload = game;
var name = prompt("Jak masz na imię?");
if ((Math.random(Math.floor(parseInt(5,10)))<parseFloat("0.0317E+2"))){
   window.alert(name + "? Ładne imię!");
}
