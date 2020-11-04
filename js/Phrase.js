/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

 class Phrase{
     constructor(phrase){
         this.phrase = phrase.toLowerCase();
     }

     /**
      * 
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
      * 
      */
     checkLetter(e){
        console.log(e)
     }

     /**
      * 
      */
     showMatchedLetter(){

     }
 }