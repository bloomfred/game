//import { BrowserRouter as Routes, Route, Link } from 'react-router-dom';
//import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startGame, makeAGuess } from "./store/hangman";
import "./App.css";
import image1 from "./images/state1.GIF";
import image2 from "./images/state2.GIF";
import image3 from "./images/state3.GIF";
import image4 from "./images/state4.GIF";
import image5 from "./images/state5.GIF";
import image6 from "./images/state6.GIF";
import image7 from "./images/state7.GIF";
import image8 from "./images/state8.GIF";
import image9 from "./images/state9.GIF";
import image10 from "./images/state10.GIF";
import image11 from "./images/state11.GIF";
//import Help from './components/Help';

function App() {
  // Define state for user input
  //const [userInput, setUserInput] = useState("");

  // Define the required slices of state
  const turnsLeft = useSelector((state) => state.hangman.turnsLeft);
  const turnsTaken = useSelector((state) => state.hangman.turnsTaken);
  const displayWord = useSelector((state) => state.hangman.displayWord);
  const wrongGuesses = useSelector((state) => state.hangman.wrongGuesses);
  const dispatch = useDispatch();

  // initialize the images array
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
  ];

  // generate the image src based on the number of turns left
  const imageSrc = images[0 + wrongGuesses];

  // Tried to load the dictionary but couldnt get it to work with hangman.js
  // Load the list of words from a text file when the component mounts
  // useEffect(() => {
  //   fetch("dictionary.txt")
  //     .then((response) => response.text())
  //     .then((text) => {
  //       const words = text.trim().split("\n");
  //       console.log(words);
  //       dispatch(setWords(words)); // dispatch the setWords action with the words array
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // Handle the submission of the user's guess
  // const handleGuessSubmit = (event) => {
  //   event.preventDefault();
  //   dispatch(makeAGuess({ userLetter: userInput }));
  //   setUserInput("");
  // };

  const availableLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const lettersUsed = useSelector((state) => state.hangman.lettersUsed);

  return (
    <div>
      <h1 className="title">Let's play Hangman!</h1>      
      <img src={imageSrc} alt="hangman" />
      <h2 className="wordToGuess">
        {displayWord.map((letter, index) => (
          <span key={index}>{letter || "_"}</span>
        ))}        
      </h2>
      <h3 className="turns"><span>Guesses left: {turnsLeft}</span> <span>Guesses made: {turnsTaken}</span></h3>
      <div className="keyboard">
        {availableLetters.map((letter, index) => (
          <button
            key={index}
            onClick={() => {
              if (!lettersUsed.includes(letter)) {
                dispatch(makeAGuess({ userLetter: letter }));
              }
            }}
            disabled={lettersUsed.includes(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <button className="btnStart" onClick={() => dispatch(startGame())}>Start game</button>
      <button className="btnReset" onClick={() => dispatch(startGame())}>Reset</button>
      {/* <Link to="/help">Help</Link>
      <Routes>
        <Route path="/help" element={<Help />} />
      </Routes> */}

      {/* Help button to show/hide rules? */}
      <div className='rules'>
        <h4>How to play Hangman</h4>
        <ul>
          <li>
          The computer selects a random word and displays a series of dashes, representing the word you must guess. Each dash represents a letter in the word. If the word is "banana", you will see _ _ _ _ _ _.
          </li>
          <li>
          Start guessing letters by tapping them on the keyboard. If your guess is correct, the computer will reveal the letter in the correct blank space(s). For example, if you guess "a", the dashes will look like _ a _ a _ a.
          </li>
          <li>
          But be careful! If your guess is wrong the computer will display a part of the hangman figure. Can you guess all the letters before the hangman is fully drawn? You get 10 wrong guesses before it's game over!
          </li>
        </ul>
      </div>


    </div>
    
  );
}

export default App;