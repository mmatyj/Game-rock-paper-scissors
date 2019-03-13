var output = document.querySelectorAll('.output');

const buttons = document.querySelectorAll('.player-move');

let message;

const gameParams = {
    winningRounds: null,
    roundNumber: 0,
    playerScore: 0,
    computerScore: 0,
    draws: 0
}

document.getElementById('new-game-button').addEventListener('click', newGame);

buttons.forEach(button =>
    button.addEventListener('click', handleButtonClick)
)

function handleButtonClick() {
    const playerChoice = this.dataset.option;
    playerMove(playerChoice)
}

function getComputerChoice() {
    return buttons[Math.floor(Math.random() * buttons.length)].dataset.option;
}

function checkResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    } else if ((playerChoice === "papier" && computerChoice === "kamień") || (playerChoice === "kamień" && computerChoice === "nożyczki") || (playerChoice === "nożyczki" && computerChoice === "papier")) {
        return 'win';
    } else {
        return 'loss';
    }
}

function playerMove(playerChoice) {
    if (!gameParams.winningRounds) {
        return false;
    }

    const computerChoice = getComputerChoice();
    gameParams.roundNumber++;

    message = 'Runda ' + gameParams.roundNumber + ': ';
    document.querySelector('p.rounds_numbers span').textContent = gameParams.roundNumber;

    switch (checkResult(playerChoice, computerChoice)) {
        case 'draw':
            gameParams.draws++;
            message += 'Remis!';
            document.querySelector('p.draws span').textContent = gameParams.draws;
            break;
        case 'win':
            gameParams.playerScore++;
            message += 'Wygrałeś!';
            document.querySelector('p.wins span').textContent = gameParams.playerScore;
            break;
        case 'loss':
            gameParams.computerScore++;
            message += 'Przegrałeś!'
            document.querySelector('p.losses span').textContent = gameParams.computerScore;
            break;
    }


    message += ' Wybrałeś ' + playerChoice + ', a komputer wybrał ' + computerChoice + '.<br>Gracz ' + gameParams.playerScore + ':' + gameParams.computerScore + ' Komputer.';
    output[0].innerHTML = message;
    if (gameParams.computerScore === gameParams.winningRounds || gameParams.playerScore === gameParams.winningRounds) {
        if (gameParams.computerScore > gameParams.playerScore) {
            message = 'Tralalona gra skończona! Bardzo się starałeś, lecz z gry wyleciałeś!'
        } else {
            message = 'Wygrałeś!'
        }
        showModal()
        message += ' Wynik gry: <br> Gracz ' + gameParams.playerScore + ' : ' + gameParams.computerScore + ' Komputer.';

        gameParams.winningRounds = null;

    }
}

function newGame() {
    const newGameWinningRounds = parseInt(window.prompt('Do ilu gramy?'));

    if (isNaN(newGameWinningRounds) || !newGameWinningRounds) {
        return alert('Podaj liczbę!')
    }
    gameParams.winningRounds = newGameWinningRounds;
    gameParams.roundNumber = 0;
    gameParams.playerScore = 0;
    gameParams.computerScore = 0;
    output[0].innerHTML = 'Zaczynamy! Gramy do ' + gameParams.winningRounds + ' wygranych!';
}

// MODALS

var showModal = function (event) {
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector('.modal').classList.add('show');
    message += ' Wynik gry: <br> Gracz ' + gameParams.playerScore + ' : ' + gameParams.computerScore + ' Komputer.';
    output[1].innerHTML = message;
};


var modalLinks = document.querySelectorAll('.show-modal');

for (var i = 0; i < modalLinks.length; i++) {
    modalLinks[i].addEventListener('click', showModal);
}


var hideModal = function (event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal .close');

for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);

var modals = document.querySelectorAll('.modal');

for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function (event) {
        event.stopPropagation();
    });
}