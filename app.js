/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/




var scores, roundScore, activePlayer, gamePlaying, previousScore, dice, defaultScore;

defaultScore = 100;

init()


document.querySelector('.btn-roll').addEventListener('click', function () {

    if(gamePlaying) {

    // 1. Random number =========================================================== ВОТ ТУТ
    previousScore = dice;
    dice = Math.floor(Math.random() * 6 + 1);

    // 2. Display the result
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'img/dice-' + dice + '.png';


    // 3. Lose when player rolls 6 in a row;
    if (previousScore === 6 && dice === 6) {
        resetScores();
        nextPlayer();
    }

    // 4.
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {  
        nextPlayer();
    }

}

});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if(gamePlaying) {

    //Reset score when player roll two 6 in a row;
    if (previousScore === 6 && dice === 6) {
        resetScores();
    }

    //Add current score in global score;
    scores[activePlayer] += roundScore;


    //Update the UI;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


    //Check if the player won a game;
    if (scores[activePlayer] >= defaultScore) {

        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;

    }

    else {

    nextPlayer();

    }

}


});

//Create listener function get value from input
document.querySelector('.btn-value').addEventListener('click', function() {
    defaultScore = document.querySelector('.totalscore').value;

    var winningScore;

//Show message when user write undefined, 0, or '';
    if (defaultScore > 0) {
        defaultScore;
    } else {
        alert('Final score set as default 100, it\'s because you wrote not a number or number <= 0');
        defaultScore = 100;
    }
});



function nextPlayer() {
    //Next player;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

};


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.querySelector('.totalscore').value = '';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

function resetScores() {
    scores[activePlayer] = 0;
    document.querySelector('#score-' + activePlayer).textContent = '0';
}

