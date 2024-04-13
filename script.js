// initializing variables
let level = 1;
let score = 0;
let stonesSkipped = 0;
let selectedCharacter = null;
let loop = null;

//Chosen character
let chosenCharacter = '';

// function to start the selection os character
function startGame(){

    document.getElementById('menu').classList.add('hidden');

    document.getElementById('select-character').classList.remove('hidden');
}

//function to choose character and start game
function chooseCharacter(character, gifSrc){
    chosenCharacter = character;

    console.log(document.getElementById('character-gif'));
    
    pe = document.getElementById('character-gif');

    pe.src = gifSrc;

    document.getElementById('character-div').classList.remove('hidden');

    document.querySelector('.game-board').classList.remove('hidden');

    startLoop();
}

//function to start loop
function startLoop(){

    document.getElementById('select-character').classList.add('hidden');

    rock = document.querySelector('.rock');

    loop = setInterval(loopFunction, 10);
    
    document.querySelector('.game').classList.remove('hidden');

    playGameSong(); 
}

function playGameSong() {
    var gameSong = document.getElementById("game-song");
    gameSong.play();
}

function stopGameSong() {
    var gameSong = document.getElementById("game-song");
    gameSong.pause();
    gameSong.currentTime = 0; // Reinicia o áudio para o início
}

//function to show the developer comment
function showComment(){
    alert('comment...');
}

// jump animation
const jump = () => {
    document.getElementById('character-gif').classList.add('jump');

    setTimeout(() => {
        document.getElementById('character-gif').classList.remove('jump');
    }, 500)
}

//main game function
const loopFunction = () => {
    const rockPosition = rock.offsetLeft;
    const pePosition = +window.getComputedStyle(pe).bottom.replace('px', '');

    // lose
    if (rockPosition <= 115 && rockPosition > 0 &&    pePosition < 60) {
        rock.style.animation = 'none';
        rock.style.left = `${rockPosition}px`;

        pe.style.animation = 'none';
        pe.style.bottom = `${pePosition}px`;

        pe.src = './images/me-gameover1.gif';
    
        stopGameSong(); // Parar o áudio do jogo

        gameOver();
      
    // Victory
    } else if (rockPosition <= 0) {
        stonesSkipped++;
        score += 1;
        updateScore();
    }
}

// Update score
const updateScore = () => {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;

    if(score % 30 === 0 && score > 0){
        level = score / 30 + 1;
        nextLevel();
    }
}

    // next level
    const nextLevel = () => {
        const levelElement = document.getElementById('level');
        levelElement.textContent = `Level: ${level}`;
        // Incrementar o nível
        level++;
    }
    
    // call jump
    document.addEventListener('keydown', jump);
    
    // game end
    const gameOver = () => {
            clearInterval(loop);
            document.getElementById('game-over').classList.remove('hidden');
        // Salvar pontuação ou exibir tela de fim de jogo, etc.
    }

    function returnToMenu() {
        document.getElementById('game-over').classList.add('hidden');
        document.querySelector('.game-board').classList.add('hidden');
        document.getElementById('menu').classList.remove('hidden');
        clearInterval(loop); 
        restartGame();
    }

    
    function restartGame() {
        // Recarregar a página
        location.reload();
    }
    
    function playClickSound() {
        var audio = document.getElementById("click-sound");
        audio.play();
      }
      
