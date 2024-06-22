const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function setupGuesses(element, handleGuess) {
  // for all letters in alphabet
  alphabet.split('').forEach((letter) => {
    // create a button with each letter in the alphabet
    const btn = document.createElement('button');
    btn.innerText = letter;
    // attach handleGuess event to click event of each button
    btn.addEventListener('click', (e) => handleGuess(e, letter));
    // add button to element
    element.append(btn);
  });
}

export default setupGuesses;
