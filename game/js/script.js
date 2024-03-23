const me = document.querySelector('.me');
const rock = document.querySelector('.rock');

let level = 1;
let score = 0;

const jump = () => {
    me.classList.add('jump');

    setTimeout(() => {
        me.classList.remove('jump');
    }, 500)
}

const loop = setInterval( () => {
    const rockPosition = rock.offsetLeft;
    const mePosition = +window.getComputedStyle(me).bottom.replace('px', '');

    
if(rockPosition <= 115 && rockPosition > 0 && mePosition < 60){

    rock.style.animation = 'none';
    rock.style.left = `${rockPosition}px`;

    me.style.animation = 'none';
    me.style.bottom  = `${mePosition}px`;

    me.src = '../images/me-gameover1.gif';

    gameOver();

} else if(rockPosition <= 0){
    score++;
    updateScore();
}

}, 10);

// Score

const updateScore = () => {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
}

document.addEventListener('keydown', jump);

const gameOver = () => {
    // Game over logic
    clearInterval(loop);
    // Save score or display game over screen, etc.
}