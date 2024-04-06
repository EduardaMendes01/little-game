// Elements
const me = document.querySelector('.me');
const rock = document.querySelector('.rock');
const him = document.querySelector('.him');

// initializing variables
let level = 1;
let score = 0;
let stonesSkipped = 0;
let isHimVisible = false; // Adicionado para controlar a visibilidade de 'him'

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

    checkCollision();
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

// check collision between 'me' e 'him'
const checkCollision = () => {
    const meRect = me.getBoundingClientRect();
    const himRect = him.getBoundingClientRect();

    if (
        meRect.left < himRect.right &&
        meRect.right > himRect.left &&
        meRect.top < himRect.bottom &&
        meRect.bottom > himRect.top
    ) {
        // 'me' e 'him' colidem, lidar com a lógica de colisão aqui
        // Por exemplo, não perder o jogo

        // Parar a animação dos obstáculos
        rock.style.animation = 'none';
        rock.style.display = 'none';

        // Mudar a imagem de 'me' para o gif
        me.src = '../images/us-loving.gif';

               // Aguardar 5 segundos antes de continuar o jogo
               setTimeout(() => {
                // Continuar o jogo
                rock.style.display = 'block';
                rock.style.animation = ''; // reiniciar a animação
                him.style.display = 'none'; // esconder 'him'
                me.src = ''; // reiniciar a imagem de 'me'
                isHimVisible = false; // Adicionado para controlar a visibilidade de 'him'
            }, 5000);
        }
    }
    
    // next level
    const nextLevel = () => {
        const levelElement = document.getElementById('level');
        levelElement.textContent = `Level: ${level}`;
    
        // Parar a animação dos obstáculos
        rock.style.animation = 'none';
    
        // Mostrar o personagem 'him'
        him.style.display = 'block';
        isHimVisible = true; // Adicionado para controlar a visibilidade de 'him'
    
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
    