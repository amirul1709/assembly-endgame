import { useState } from "react";
import { languages } from "../languages";
import clsx from "clsx";
import { getFarewellText } from "../utils";
import { generate } from "random-words";
import Confetti from "react-confetti";

export default function App() {
  //initializing state for user's guessed letters
  const [guessedLetters, setGuessedLetters] = useState([]);

  //initializing state for random word
  const [currentWord, setCurrentWord] = useState(() => generate());

  //checking if the last guessed letter is wrong
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessWrong =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  //doing a count of wrong guesses
  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  //checking if the game is won
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

    return (
      <span
        key={index}
        className={clsx(
          "letter-chip",
          isGameOver && !isCorrect ? "reveal" : ""
        )}
      >
        {isCorrect
          ? letter.toUpperCase()
          : gameLost
          ? letter.toUpperCase()
          : ""}
      </span>
    );
  });

  //create a string of letters in the alphabet
  const alphabet = "qwertyuiopasdfghjklzxcvbnm";

  //creating an array of uppercase letters
  const alphabetArray = alphabet.split("");

  //displaying each key for our keyboard
  const keys = alphabetArray.map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && wordArray.includes(letter);
    const isWrong = isGuessed && !wordArray.includes(letter);

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    //guess state update user guesses
    function handleKeyClick(letter) {
      setGuessedLetters((prevGuess) =>
        prevGuess.includes(letter) ? prevGuess : [...prevGuess, letter]
      );
    }

    return (
      <button
        key={letter}
        onClick={() => handleKeyClick(letter)}
        className={className}
        disabled={isGameOver}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  //setting class names for the status section
  const statusClassName = clsx("status", {
    won: gameWon,
    lost: gameLost,
    wrong: !isGameOver && isLastGuessWrong,
  });

  function handleNewGameClick() {
    setCurrentWord(generate());
    setGuessedLetters([]);
  }

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
        ) : isLastGuessWrong ? (
          <p>{getFarewellText(languages[wrongGuessCount - 1].name)} 🫡</p>
        ) : null}
      </section>
      <section className="lang-container">{chips}</section>
      <section className="word-container">{letters}</section>
      <section className="keyboard-container">{keys}</section>
      <section className="ng-button-container">
        {isGameOver ? (
          <button onClick={handleNewGameClick}>New Game</button>
        ) : null}
      </section>
    </main>
  );
}
