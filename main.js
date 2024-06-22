import getRandomWord from './src/randomWord';
import setSharkImage from './src/sharkImage';
import setupGuesses from './src/guess.js';
import { setupWord, isLetterInWord, revealLetterInWord } from './src/word.js';

import './style.css';

document.querySelector('#app').innerHTML = `
  <section id="shark-img"></section>

  <section id="game-status"></section>

  <section id="word-container"></section>

  <section id="letter-buttons"></section>
`;

const initSharkwords = () => {
  let numWrong = 0;
  const sharkImg = document.querySelector('#shark-img');
  const status = document.querySelector('#game-status');

  const word = getRandomWord();
  setSharkImage(sharkImg, numWrong);
  setupWord(document.querySelector('#word-container'), word);
  let isComplete = true;
  const handleGuess = (guessEvent, letter) => {
    const btn = guessEvent.target;
    const letterboxes = document.querySelectorAll('.letter-box')
    btn.disabled = true;
    if(isLetterInWord(letter)) {
      revealLetterInWord(letter);
    } else {
      numWrong++;
      setSharkImage(sharkImg, numWrong); 
    }
    
    // tests if every letterbox is filled, returns false if one value is empty
    isComplete = Array.from(letterboxes).every(
      (el) => el.innerText !== '',
    );
    if(isComplete || numWrong == 5) {
      const btns = document.querySelectorAll('button');
      btns.forEach((ele) => {
        ele.disabled = true;
      });
    }
    
    if(numWrong == 5) {
      // End Game
      status.innerText = "You lose!";
    }

    if(isComplete) {
      status.innerText = "You win!";
    }
  };
  
  setupGuesses(document.querySelector('#letter-buttons'), handleGuess);

  // for debugging:
  console.log(`[INFO] Correct word is: ${word}`);
  console.log(isLetterInWord(word[0]), '(should be true)');
  console.log(isLetterInWord('1'), '(should be false)');

};

initSharkwords();
