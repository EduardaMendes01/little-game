const audioB = document.getElementById("audio-button");
const audioH = document.getElementById("audio-hover");
const menuLinks = document.getElementsByClassName("links");

Array.from(menuLinks).forEach(link => {
    link.addEventListener('mouseenter', () => {
        audioH.play();
    });

    link.addEventListener('mouseleave', () => {
        audioH.pause();
        audioH.currentTime = 0;
    });

    link.addEventListener('click', () => {
        audioB.play();
    })
});
