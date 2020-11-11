/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;

document.querySelector('#btn__reset').addEventListener('click', () => {
    game = new Game();
    game.startGame();
});

document.querySelector('#qwerty').addEventListener('click', e => {
    game.handleInteraction(e.target);
});
document.addEventListener('keydown', e => game.handleKeyboard(e.key));
document.querySelector('#volume').addEventListener('click', e => {
    if (!e.target.classList.contains('fa-volume-mute')) {
        e.target.className = 'fas fa-2x fa-volume-mute';
        game.sound = false;
        document.querySelector('#theme').pause();
    } else {
        e.target.className = 'fas fa-2x fa-volume';
        game.sound = true;
        document.querySelector('#theme').play();
        document.querySelector('#theme').loop = true;
    }
});