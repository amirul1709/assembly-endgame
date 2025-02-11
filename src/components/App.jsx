import { useState } from "react";
import { languages } from "../languages";

export default function App() {
  //initializing state for user's guessed letters
  const [guessedLetters, setGuessedLetters] = useState([]);

  //initializing state for random word
  const [curruntWord, setCurrentWord] = useState("react");

  //adding languages to the page
  const chips = languages.map((lang) => (
    <span
      key={lang.name}
      style={{
        backgroundColor: lang.backgroundColor,
        color: lang.color,
      }}
    >
      {lang.name}
    </span>
  ));

  //creating an array of uppercase letters
  const wordArray = curruntWord.toUpperCase().split("");

  //displaying each letter in the word
  const letters = wordArray.map((letter, index) => (
    <span key={index}>{letter}</span>
  ));

  //create a string of letters in the alphabet
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  //creating an array of uppercase letters
  const alphabetArray = alphabet.toUpperCase().split("");

  //guess state update user guesses
  function handleClick(button) {
    setGuessedLetters((prevGuess) =>
      prevGuess.includes(button) ? prevGuess : [...prevGuess, button]
    );
  }

  //displaying each key for our keyboard
  const keys = alphabetArray.map((button) => (
    <button key={button} onClick={() => handleClick(button)}>
      {button}
    </button>
  ));

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="status">
        <h3>You win!</h3>
        <p>Well done! 🎉</p>
      </section>
      <section className="lang-container">{chips}</section>
      <section className="word-container">{letters}</section>
      <section className="keyboard-container">{keys}</section>
      <div className="ng-button-container">
        <button>New Game</button>
      </div>
    </main>
  );
}
