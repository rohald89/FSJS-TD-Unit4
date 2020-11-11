class Phrase {
    constructor(phrase, hint) {
        this.phrase = phrase.toLowerCase();
        this.hint = hint;
    }

    /**
     * split the phrase into an array of words to give each of them their own div, then loop over each letter for the class of letter 
     */
    addPhraseToDisplay() {
        this.phrase.split(" ").forEach(word => {
            const wrapper = document.createElement('DIV');
            word.split('').forEach(letter => {
                wrapper.innerHTML += `<li class="hide letter ${letter}">${letter}</li>`;
            });
            document.querySelector('#phrase ul').append(wrapper);
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