class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * split the phrase into an array and loop over it. 
     * if the character is a space give it the space class otherwise the letter class
     */
    addPhraseToDisplay() {
        this.phrase.split("").forEach(letter => {
            if (letter === " ") {
                document.querySelector('#phrase ul').innerHTML += `<li class="space">${letter}</li>`;
            } else {
                document.querySelector('#phrase ul').innerHTML += `<li class="hide letter ${letter}">${letter}</li>`;
            }
        });
    }

    /**
     *  Check to see if the clicked letter is present in the phrase
     */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    /**
     * selects all the letters in the phrase that match the clicked letter
     * remove hide class and add show class to make them visible
     */
    showMatchedLetter(letter) {
        const matchedLetter = document.querySelectorAll(`.${letter}`);
        matchedLetter.forEach(letter => {
            letter.classList.remove('hide');
            letter.classList.add('show');
        });
    }
}