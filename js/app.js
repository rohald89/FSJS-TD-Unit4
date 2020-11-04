/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

 document.querySelector('#btn__reset').addEventListener('click', () => {
     const game = new Game();
     game.startGame();
 });
 
 document.querySelector('#qwerty').addEventListener('click', e => {
     game.checkLetter(e.target);
 });
 document.addEventListener('keyup', e => game.checkLetter(e))