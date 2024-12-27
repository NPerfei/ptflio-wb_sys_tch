function game() {
    function designateTurn() {
        playerIndicators.forEach((indicator) => {
            indicator.classList.remove("active");
        });

        playerIndicators[turn - 1].classList.add("active");
    }

    function checkBoard() {
        // check rows
        for (let i = 0; i < board.length; i++) {
            if ((board[i][0] == board[i][1] && board[i][1] == board[i][2]) && board[i][0] != "") {
                return [`${i}${0}`, `${i}${1}`, `${i}${2}`];
            }
        }

        // check columns
        for (let i = 0; i < board.length; i++) {
            if ((board[0][i] == board[1][i] && board[1][i] == board[2][i]) && board[0][i] != "") {
                return [`${0}${i}`, `${1}${i}`, `${2}${i}`];
            }
        }

        // check diagonals
        if ((board[0][0] == board[1][1] && board[1][1] == board[2][2]) && board[0][0] != "") {
            return [`${0}${0}`, `${1}${1}`, `${2}${2}`];
        }
        if ((board[0][2] == board[1][1] && board[1][1] == board[2][0]) && board[0][2] != "") {
            return [`${0}${2}`, `${1}${1}`, `${2}${0}`];
        }

        return false;
    }

    function noMovesLeft() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    return false;
                }
            }
        }

        return true;
    }

    function mark(e) {
        if (e.currentTarget.classList.contains("occupied")) {
            invalidSound.play();
            return;
        }
        
        markSound.play()
        let id = e.currentTarget.id.split("").map(index => Number(index));
        let codeMark = turn == 1 ? 1 : 2;
        let boardMark = turn == 1 ? "X" : "O";
        let player = turn == 1 ? "one" : "two";
        
        board[id[0]][id[1]] = codeMark;
        e.currentTarget.classList.add("occupied");
        e.currentTarget.innerHTML = `<p class=${player}>${boardMark}</p>`;

        let result = checkBoard();

        if (!result) {
            if (noMovesLeft()) {
                drawEvent();
            }
            else {
                turn = turn == 1 ? 2 : 1;
                designateTurn();
            }
        }
        else {
            winEvent(result);
        }
    }

    function winEvent(indices) {
        winSound.play()
        playerIndicators.forEach((indicator) => {
            indicator.classList.remove("active");
        });
        document.getElementById("move-blocker").classList.remove("hidden");

        indices.forEach((index) => document.getElementById(index).classList.add("win"));

        playerIndicators[turn - 1].classList.add("win");

        if (!newListenerAdded) {
            let startModal = document.querySelector(".start-modal");

            startModal.children[1].textContent = "Press Any Key To Restart"

            startModal.removeEventListener('click', start);
            startModal.removeEventListener('keydown', start);

            startModal.addEventListener('click', resetBoard);
            startModal.addEventListener('keydown', resetBoard);

            newListenerAdded = true;
        }

        setTimeout(() => {
            document.getElementById("move-blocker").classList.add("hidden");
            document.querySelector(".start-modal").classList.remove('hidden');
        }, 2500);

    }

    function drawEvent() {
        drawSound.play()
        playerIndicators.forEach((indicator) => {
            indicator.classList.remove("active");
        });
        document.getElementById("move-blocker").classList.remove("hidden");

        cells.forEach((cell) => cell.classList.add("draw"));

        playerIndicators.forEach(player => player.classList.add("win"));

        if (!newListenerAdded) {
            let startModal = document.querySelector(".start-modal");

            startModal.children[1].textContent = "Press Any Key To Restart"

            startModal.removeEventListener('click', start);
            startModal.removeEventListener('keydown', start);

            startModal.addEventListener('click', resetBoard);
            startModal.addEventListener('keydown', resetBoard);

            newListenerAdded = true;
        }

        setTimeout(() => {
            document.getElementById("move-blocker").classList.add("hidden");
            document.querySelector(".start-modal").classList.remove('hidden');
        }, 2500);
    }

    function resetBoard() {
        document.querySelector(".start-modal").classList.add('hidden');
        board = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
        turn = 1;

        let cells = document.querySelectorAll(".cell");
        let playerIndicators = document.querySelectorAll(".player-name")

        cells.forEach(cell => {
            cell.classList.remove("win", "occupied", "draw");
            cell.firstElementChild.textContent = "";
        })
        playerIndicators.forEach(player => player.classList.remove("win"))

        startSound.play()

        designateTurn()
    }

    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    let turn = 1;
    let newListenerAdded = false;

    let cells = document.querySelectorAll(".cell");
    let playerIndicators = document.querySelectorAll(".player-name")

    // sounds
    let startSound = new Audio("../assets/sound/start.mp3");
    let markSound = new Audio("../assets/sound/mark.mp3");
    let invalidSound = new Audio("../assets/sound/invalid.mp3");
    let winSound = new Audio("../assets/sound/win.mp3");
    let drawSound = new Audio("../assets/sound/draw.mp3")

    startSound.play()

    cells.forEach(cell => {
        cell.addEventListener('click', mark)
    });

    designateTurn()
}

function start() {
    document.querySelector(".start-modal").classList.add('hidden');
    game();
}

document.querySelector(".start-modal").addEventListener('click', start)
document.querySelector(".start-modal").addEventListener('keydown', start)