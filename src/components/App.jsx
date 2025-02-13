import { useState } from "react";
import { languages } from "../languages";
import clsx from "clsx";
import { getFarewellText } from "../utils";
import { generate } from "random-words";

export default function App() {
  //initializing state for user's guessed letters
  const [guessedLetters, setGuessedLetters] = useState([]);

  //initializing state for random word
  const [currentWord, setCurrentWord] = useState("react");

  //checking if the last guessed letter is correct
  const isCorrect = currentWord.includes(
    guessedLetters[guessedLetters.length - 1]
  );

  //doing a count of wrong guesses
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  //checking if game is over
  const gameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const gameLost = wrongGuessCount >= languages.length - 1;

  const isGameOver = gameWon || gameLost;

  //adding languages to the page
  const chips = languages.map((lang, index) => {
    const isLost = index < wrongGuessCount;
    const className = clsx("chip", isLost && "lost");

    return (
      <span
        className={className}
        key={lang.name}
        style={{
          backgroundColor: lang.backgroundColor,
          color: lang.color,
        }}
      >
        {lang.name}
      </span>
    );
  });

  //creating an array of uppercase letters
  const wordArray = currentWord.split("");

  //displaying each letter in the word
  const letters = wordArray.map((letter, index) => {
    const isCorrect = guessedLetters.includes(letter);

    return <span key={index}>{isCorrect ? letter.toUpperCase() : ""}</span>;
  });

  //create a string of letters in the alphabet
  const alphabet = "qwertyuiopasdfghjklzxcvbnm";

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

  //setting class names for the status section
  const statusClassName = clsx("status", {
    won: gameWon,
    lost: gameLost,
    wrong: wrongGuessCount > 0 && !isCorrect,
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
      <section className={statusClassName}>
        {isGameOver ? (
          gameWon ? (
            <>
              <h3>You win!</h3>
              <p>Well done! 🎉</p>
            </>
          ) : (
            <>
              <h3>You lose!</h3>
              <p>Better start learning assembly! 🥲</p>
            </>
          )
        ) : wrongGuessCount > 0 && !isCorrect ? (
          <p>{getFarewellText(languages[wrongGuessCount - 1].name)} 🫡</p>
        ) : null}
      </section>
      <section className="lang-container">{chips}</section>
      <section className="word-container">{letters}</section>
      <section className="keyboard-container">{keys}</section>
      <section className="ng-button-container">
        {isGameOver ? <button>New Game</button> : null}
      </section>
    </main>
  );
}
