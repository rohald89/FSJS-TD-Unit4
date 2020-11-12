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

document.addEventListener('keydown', e => {
    document.querySelectorAll('.key').forEach(button => {
        if (button.textContent === e.key && button.disabled === false) {
            game.handleInteraction(button);
        }
    })
});

document.querySelector('#volume').addEventListener('click', e => {
    game.toggleSound(e.target);
});

document.querySelector('#gethint').addEventListener('click', () => {
    game.getHint();
});