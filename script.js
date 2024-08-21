const diceImages = [
    "d1.gif", // 1
    "d2.gif", // 2
    "d3.gif", // 3
    "d4.gif", // 4
    "d5.gif", // 5
    "d6.gif"  // 6
];

let players = [];
let currentPlayerIndex = 0;
let currentSum = 0;
let consecutiveDoubles = 0;
const winningScore = 100;

function initializeGame() {
    const playerCount = document.getElementById('playerCount').value;
    players = [];
    currentPlayerIndex = 0;
    currentSum = 0;
    consecutiveDoubles = 0;

    const playersContainer = document.getElementById('playersContainer');
    playersContainer.innerHTML = '';

    for (let i = 0; i < playerCount; i++) {
        players.push({
            totalScore: 0,
            currentScore: 0
        });

        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        if (i === 0) playerDiv.classList.add('active');
        playerDiv.id = `player${i + 1}`;
        playerDiv.innerHTML = `
            <h2>Pelaaja ${i + 1}</h2>
            <p>Kokonaispisteet: <span id="total${i + 1}">0</span></p>
            <p>Nykyinen summa: <span id="current${i + 1}">0</span></p>
        `;
        playersContainer.appendChild(playerDiv);
    }

    document.getElementById('message').textContent = '';
    document.getElementById('rollBtn').disabled = false;
    document.getElementById('holdBtn').disabled = false;
}

function rollDice() {
    const diceValue1 = Math.floor(Math.random() * 6) + 1;
    const diceValue2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceImage1').src = diceImages[diceValue1 - 1];
    document.getElementById('diceImage2').src = diceImages[diceValue2 - 1];

    if (diceValue1 === 1 && diceValue2 === 1) {
        currentSum += 25;
        document.getElementById(`current${currentPlayerIndex + 1}`).textContent = currentSum;
        hold();
    } else if (diceValue1 === 1 || diceValue2 === 1) {
        currentSum = 0;
        consecutiveDoubles = 0;
        switchPlayer();
    } else if (diceValue1 === diceValue2) {
        currentSum += (diceValue1 + diceValue2) * 2;
        consecutiveDoubles++;
        if (consecutiveDoubles >= 3) {
            currentSum = 0;
            switchPlayer();
        } else {
            document.getElementById(`current${currentPlayerIndex + 1}`).textContent = currentSum;
        }
    } else {
        currentSum += diceValue1 + diceValue2;
        consecutiveDoubles = 0;
        document.getElementById(`current${currentPlayerIndex + 1}`).textContent = currentSum;
    }
}

function hold() {
    players[currentPlayerIndex].totalScore += currentSum;
    document.getElementById(`total${currentPlayerIndex + 1}`).textContent = players[currentPlayerIndex].totalScore;

    if (players[currentPlayerIndex].totalScore >= winningScore) {
        document.getElementById('message').textContent = `Pelaaja ${currentPlayerIndex + 1} voitti!`;
        disableButtons();
    } else {
        switchPlayer();
    }
}

function switchPlayer() {
    currentSum = 0;
    consecutiveDoubles = 0;
    document.getElementById(`current${currentPlayerIndex + 1}`).textContent = currentSum;

    document.getElementById(`player${currentPlayerIndex + 1}`).classList.remove('active');
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    document.getElementById(`player${currentPlayerIndex + 1}`).classList.add('active');
    document.getElementById('message').textContent = `Pelaajan ${currentPlayerIndex + 1} vuoro`;
}

function disableButtons() {
    document.getElementById('rollBtn').disabled = true;
    document.getElementById('holdBtn').disabled = true;
}