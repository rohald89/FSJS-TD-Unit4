class Game {
    constructor() {
        this.missed = 0;
        this.sound = false;
        this.phrases = [
            {
                phrase: "A Long Time Ago in a Galaxy Far Far Away",
                hint: "First phrase of the intro of each movies"
            }, {
                phrase: "A new hope",
                hint: "Title of the first Star Wars movie"
            }, {
                phrase: "The Mandalorian",
                hint: "Name of the tv show created by Disney"
            }, {
                phrase: "I am your father",
                hint: "Famous quote by Darth Vader"
            }, {
                phrase: "May the force be with you",
                hint: "Phrase used to wish someone good luck or good will"
            },];
        this.activePhrase = null;
    }

    /**
     * If the overlay has the win or lose class reset the game
     * hide the overlay, get a new random phrase and add it to the display
     */
    startGame() {
        const overlay = document.querySelector('#overlay');
        if (overlay.className === 'win' || overlay.className === 'lose') {
            this.resetGame();
        }
        overlay.style.display = 'none';
        this.activePhrase = new Phrase(this.getRandomPhrase());
        this.activePhrase.addPhraseToDisplay();
        // make sure if the sound is on to start playing again on restart
        if (!document.querySelector('#volume').classList.contains('fa-volume-mute')) {
            this.sound = true;
            document.querySelector('#theme').play();
        };
    }

    /**
     *  randomly select a phrase from the phrases array
     */
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }

    /**
     * Disable clicked button, if the letter is not present in the phrase add the wrong class and remove a life
     * otherwise add the chosen class, show the letters 
     * check if the game is won, if so run the game over function
     */
    handleInteraction(clickedButton) {
        if (clickedButton.tagName === "BUTTON") {
            clickedButton.disabled = true;
            if (!this.activePhrase.checkLetter(clickedButton.textContent)) {
                clickedButton.classList.add('wrong');
                this.removeLife();
            } else {
                clickedButton.classList.add('chosen');
                this.activePhrase.showMatchedLetter(clickedButton.textContent);
                //reset the blaster sound for when 2 buttons are pressed right after eachother
                if (this.sound) {
                    document.querySelector('#blaster').currentTime = 0;
                    document.querySelector('#blaster').play();
                }
                if (this.checkForWin()) {
                    this.gameOver();
                }
            }
        }
    }

    /**
     * select all buttons and if the textcontent matches the typed letter run the click() method on it to simulate a mouseclick so the above methods get triggered.
     */
    handleKeyboard(key) {
        document.querySelectorAll('.key').forEach(button => {
            if (key === button.textContent) {
                button.click();
            }
        });
    }

    /**
     * set pointer events to none during the animation to avoid animation from breaking
     * start lightsaber animation to remove a liveHeart and increase the missed counter by one
     * when player hits 5 misses run gameOver method.
     */
    removeLife() {
        document.querySelectorAll('.key').forEach(key => key.style.pointerEvents = "none");
        document.querySelector('.saber').classList.add('active');
        // move lightsaber so it hits the correct heart
        document.querySelector('.lightsaber').style.right = `${-35 * this.missed}px`;
        // play lightsaber sound
        if (this.sound) { document.querySelector('#saberon').play(); }
        setTimeout(() => {
            if (this.sound) { document.querySelector('#swing').play(); }
        }, 1150);
        setTimeout(() => {
            document.querySelectorAll('[src="images/liveStormtrooper.png"]')[0].src = 'images/lostStormtrooper.png';
        }, 1700);
        setTimeout(() => {
            document.querySelectorAll('.key').forEach(key => key.style.pointerEvents = "initial");
            document.querySelector('.saber').classList.remove('active');
            this.missed++;
            if (this.missed === 4) {
                `At the end your rule is and not short enough it was!`;
            }
            if (this.missed === 5) {
                this.gameOver();
            }
        }, 2500);

    }

    /**
     * Check if the game has won by comparing the amount of letters in the phrase and the amount of elements with the show class.
     */
    checkForWin() {
        const letters = document.querySelectorAll('.letter');
        const chosen = document.querySelectorAll('.show');
        return letters.length === chosen.length;
    }

    /**
     * display the Overlay again and change the classname to either win or lose with a message about the result. 
     */
    gameOver() {
        document.querySelector('#theme').pause();
        const overlay = document.querySelector('#overlay');
        overlay.style.display = 'flex';
        if (this.checkForWin()) {
            overlay.className = 'win';
            document.querySelector('#game-over-message').textContent = `At last the Jedi are no more`;
        } else {
            overlay.className = 'lose';
            document.querySelector('#game-over-message').textContent = `If so powerfull you are, Why leave?`;
        }
        document.querySelector('#btn__reset').textContent = `Play again`;
    }

    /**
     * Reset the heart images, phrase ul and onscreen keyboard
     */
    resetGame() {
        document.querySelectorAll('[src="images/lostStormtrooper.png"]').forEach(life => life.src = "images/liveStormtrooper.png");
        this.missed = 0;
        document.querySelector('#phrase ul').innerHTML = '';
        document.querySelectorAll('.key').forEach(key => {
            key.className = 'key';
            key.disabled = false;
        });
        // reset position of the lightsaber
        document.querySelector('.lightsaber').style.right = `${-35 * this.missed}px`;
    }

    /**
     * Toggel sound on / off
     */
    toggleSound(e) {
        if (!e.classList.contains('fa-volume-mute')) {
            e.className = 'fas fa-2x fa-volume-mute';
            this.sound = false;
            document.querySelector('#theme').pause();
        } else {
            e.className = 'fas fa-2x fa-volume';
            this.sound = true;
            document.querySelector('#theme').play();
            document.querySelector('#theme').loop = true;
        }
    }

    getHint() {
        const hint = document.querySelector('#hint');
        hint.innerHTML = this.activePhrase.hint;
        hint.classList.toggle('showhint');
    }
}