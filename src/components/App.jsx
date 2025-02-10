import { useState } from "react";
import { languages } from "../languages";

function App() {
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

  //initializing state for random word
  const [curruntWord, setCurrentWord] = useState("family");

  //creating an array of uppercase letters
  const wordArray = curruntWord.toUpperCase().split("");

  const letters = wordArray.map((letter) => <span>{letter}</span>);

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
    </main>
  );
}

export default App;
