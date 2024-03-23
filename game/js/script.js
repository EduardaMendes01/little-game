const me = document.querySelector('.me')

const jump = () => {
    me.classList.add('jump');

    setTimeout(() => {
        me.classList.remove('jump');
    }, 500)
}

document.addEventListener('keydown', jump);