// Elements
const me = document.querySelector('.me');
const rock = document.querySelector('.rock');
const him = document.querySelector('.him');

// initializing variables
let level = 1;
let score = 0;
let stonesSkipped = 0;

// jump animation
const jump = () => {
    me.classList.add('jump');

    setTimeout(() => {
        me.classList.remove('jump');
    }, 500)
}

// Função principal do jogo
const loopFunction = () => {
    const rockPosition = rock.offsetLeft;
    const mePosition = +window.getComputedStyle(me).bottom.replace('px', '');

    // lose
    if (rockPosition <= 115 && rockPosition > 0 && mePosition < 60) {
        rock.style.animation = 'none';
        rock.style.left = `${rockPosition}px`;

        me.style.animation = 'none';
        me.style.bottom = `${mePosition}px`;

        me.src = '../images/me-gameover1.gif';

        gameOver();
      
    // Victory
    } else if (rockPosition <= 0) {
        stonesSkipped++;
        score += 1;
        updateScore();
    }
}

let loop = setInterval(loopFunction, 10);

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
        // Logic of end game
        clearInterval(loop);
        // Salvar pontuação ou exibir tela de fim de jogo, etc.
    }
    