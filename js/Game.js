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
      * If the overlay has the win or lose class reset the game
      * hide the overlay, get a new random phrase and add it to the display
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
      *  randomly select a phrase from the phrases array
      */
    getRandomPhrase(){
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

     /**
      * Disable clicked button, if the letter is not present in the phrase add the wrong class and remove a life
      * otherwise add the chosen class, show the letters 
      * check if the game is won, if so run the game over function
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
    }

    /**
     * select all buttons and if the textcontent matches the typed letter run the click() method on it to simulate a mouseclick so the above methods get triggered.
     */
    handleKeyboard(key){
        document.querySelectorAll('.key').forEach(button => {
            if(key === button.textContent){
                button.click();
            }
        });
    }

     /**
      * remove a liveHeart and increase the missed counter by one
      * when player hits 5 misses run gameOver method.
      */
    removeLife(){
        document.querySelectorAll('[src="images/liveHeart.png"]')[0].src = 'images/lostHeart.png';
        this.missed ++;
        if(this.missed === 5){
            this.gameOver();
        }
    }

     /**
      * Check if the game has won by comparing the amount of letters in the phrase and the amount of elements with the show class.
      */
    checkForWin(){
        const letters = document.querySelectorAll('.letter');
        const chosen = document.querySelectorAll('.show');
        return letters.length === chosen.length;
    }

     /**
      * display the Overlay again and change the classname to either win or lose with a message about the result. 
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
        });
    }
}