const me = document.querySelector('.me');
const rock = document.querySelector('.rock');
const him = document.querySelector('.him');

let level = 1;
let score = 0;
let stonesSkipped = 0;


//jump animation
const jump = () => {
    me.classList.add('jump');

    setTimeout(() => {
        me.classList.remove('jump');
    }, 500)
}


const loopFunction = () => {
    const rockPosition = rock.offsetLeft;
    const mePosition = +window.getComputedStyle(me).bottom.replace('px', '');

    if (rockPosition <= 115 && rockPosition > 0 && mePosition < 60) {
        rock.style.animation = 'none';
        rock.style.left = `${rockPosition}px`;

        me.style.animation = 'none';
        me.style.bottom = `${mePosition}px`;

        me.src = '../images/me-gameover1.gif';

        gameOver();
        
    } else if (rockPosition <= 0) {
        stonesSkipped++;
        score += 1;
        updateScore();
    }

    checkCollision();
}

let loop = setInterval(loopFunction, 10);


// Score

const updateScore = () => {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;

    if(score % 30 === 0 && score > 0){
        level = score / 30 + 1;
            nextLevel();
        }
    }

//Collision me and him
const checkCollision = () => {
    const meRect = me.getBoundingClientRect();
    const himRect = him.getBoundingClientRect();

    if (
        meRect.left < himRect.right &&
        meRect.right > himRect.left &&
        meRect.top < himRect.bottom &&
        meRect.bottom > himRect.top
    ) {
        rock.style.animation = 'none';
        rock.style.animation = 'hidden';
        me.src = 'none';
        him.src = '../images/us-loving.gif';
        // 'me' and 'him' characters collide, handle collision logic here
        // For example, don't lose the game
    }
}

// Function to transition to the next level
const nextLevel = () => {
    const levelElement = document.getElementById('level');
    levelElement.textContent = `Level: ${level}`;
    // Increment level
    level++;

    // Pause the game loop
    clearInterval(loop);

    // Hide rock and show him
    rock.style.display = 'none';
    him.style.display = 'block';

    // After 5 seconds, hide him and show rock
    setTimeout(() => {
        him.style.display = 'none';
        rock.style.display = 'block';

        // Resume the game loop after the interaction
        loop = setInterval(loopFunction, 10);
    }, 5000);

    // Reset game elements, adjust game parameters, etc. for the next level
}


document.addEventListener('keydown', jump);

const gameOver = () => {
    // Game over logic
    clearInterval(loop);
    // Save score or display game over screen, etc.
}
