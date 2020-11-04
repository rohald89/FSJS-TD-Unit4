/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game{
    constructor(){
        this.missed = 0;
        this.phrases = ["this will be phrase ONE", 
                        "this will be phrase TWO", 
                        "this will be phrase THREE", 
                        "this will be phrase FOUR", 
                        "this will be phrase FIVE"];
        this.activePhrase = null;
    }

     /**
      * hides the start screen overlay, 
      * calls the getRandomPhrase() method, and sets the activePhrase property with the chosen phrase. 
      * It also adds that phrase to the board by calling the addPhraseToDisplay() method on the active Phrase object.
      */
    startGame(){
        const overlay = document.querySelector('#overlay');
        if(overlay.className === 'win' || overlay.className === 'lose'){
            this.resetGame();
        }
        overlay.style.display = 'none';
        this.activePhrase = new Phrase(this.getRandomPhrase());
        this.activePhrase.addPhraseToDisplay();
    }

     /**
      *  this method randomly retrieves one of the phrases stored in the phrases array and returns it.
      */
    getRandomPhrase(){
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

     /**
      * It checks to see if the button clicked by the player matches a letter in the phrase, 
      * and then directs the game based on a correct or incorrect guess.
      */
    handleInteraction(clickedButton){
        if(clickedButton.tagName === "BUTTON"){
            clickedButton.disabled = true;
            if(!this.activePhrase.checkLetter(clickedButton.textContent)){
                clickedButton.classList.add('wrong');
                this.removeLife();
            } else {
                clickedButton.classList.add('chosen');
                this.activePhrase.showMatchedLetter(clickedButton.textContent);
                if(this.checkForWin()){
                    this.gameOver();
                }
            }
        }
        /** 
         * Disable the selected letter’s onscreen keyboard button.
         *   If the phrase does not include the guessed letter, add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method.
         *   If the phrase includes the guessed letter, add the chosen CSS class to the selected letter's keyboard button, call the showMatchedLetter() method on the phrase, *   and then call the checkForWin() method. If the player has won the game, also call the gameOver() method.
         */
    }

     /**
      * removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image (found in the images folder) and 
      * increments the missed property. If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.
      */
    removeLife(){
        document.querySelectorAll('[src="images/liveHeart.png"]')[0].src = 'images/lostHeart.png';
        this.missed ++;
        if(this.missed === 5){
            this.gameOver();
        }
        console.log('POOF a life is gone!');
    }

     /**
      * this method checks to see if the player has revealed all of the letters in the active phrase.
      */
    checkForWin(){
        const letters = document.querySelectorAll('.letter');
        const chosen = document.querySelectorAll('.show');
        return letters.length === chosen.length;
    }

     /**
      * displays the original start screen overlay, and depending on the outcome of the game, updates the overlay h1 element with a friendly win or loss message, 
      * and replaces the overlay’s start CSS class with either the win or lose CSS class.
      */
    gameOver(){
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'flex';
        if(this.checkForWin()){
            overlay.className = 'win';
            document.querySelector('#game-over-message').textContent = `Congratulations you've won!`;
        } else {
            overlay.className = 'lose';
            document.querySelector('#game-over-message').textContent = `Better luck next time`;
        }
    }

    /**
     * Reset the heart images, phrase ul and onscreen keyboard
     */
    resetGame(){
        document.querySelectorAll('[src="images/lostHeart.png"]').forEach( heart => heart.src = "images/liveHeart.png");
        this.missed = 0;
        document.querySelector('#phrase ul').innerHTML = '';
        document.querySelectorAll('.key').forEach(key => {
            key.className = 'key';
            key.disabled = false;
        })
    }
}