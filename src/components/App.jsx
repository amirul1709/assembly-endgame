import { useState } from "react";
import { languages } from "../languages";
import clsx from "clsx";
import { generate } from "random-words";

export default function App() {
  //initializing state for user's guessed letters
  const [guessedLetters, setGuessedLetters] = useState([]);

  //initializing state for random word
  const [currentWord, setCurrentWord] = useState("react");

  //doing a count of wrong guesses
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

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
  const wordArray = currentWord.split("");

  //displaying each letter in the word
  const letters = wordArray.map((letter, index) => {
    const isCorrect = guessedLetters.includes(letter);

    return <span key={index}>{isCorrect ? letter.toUpperCase() : ""}</span>;
  });

  //create a string of letters in the alphabet
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  //creating an array of uppercase letters
  const alphabetArray = alphabet.split("");

  //guess state update user guesses
  function handleClick(button) {
    setGuessedLetters((prevGuess) =>
      prevGuess.includes(button) ? prevGuess : [...prevGuess, button]
    );
  }

  //displaying each key for our keyboard
  const keys = alphabetArray.map((button) => {
    const isGuessed = guessedLetters.includes(button);
    const isCorrect = isGuessed && wordArray.includes(button);
    const isWrong = isGuessed && !wordArray.includes(button);

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        key={button}
        onClick={() => handleClick(button)}
        className={className}
      >
        {button.toUpperCase()}
      </button>
    );
  });

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within {8 - wrongGuessCount} attempts to keep the
          programming world safe from Assembly!
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
