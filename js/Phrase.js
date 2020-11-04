/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase{
     constructor(phrase){
         this.phrase = phrase.toLowerCase();
     }

     /**
      * split the phrase into an array and loop over it. 
      * if the character is a space give the li the class space else give it the class of letter
      */
     addPhraseToDisplay(){
        this.phrase.split("").forEach(letter => {
            if(letter === " "){
                document.querySelector('#phrase ul').innerHTML += `<li class="space">${letter}</li>`;
            } else {
                document.querySelector('#phrase ul').innerHTML += `<li class="hide letter ${letter}">${letter}</li>`;
            }
        });
     }

     /**
      *  Check to see if the clicked letter is present in the phrase
      */
     checkLetter(letter){
        return this.phrase.includes(letter.textContent);
     }

     /**
      * 
      */
     showMatchedLetter(){

     }
 }