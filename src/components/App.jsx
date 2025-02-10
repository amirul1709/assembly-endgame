import { useState } from "react";
import { languages } from "../languages";
import Chip from "./Chip";

function App() {
  const chips = languages.map((lang) => (
    <Chip
      key={lang.name}
      lang={lang.name}
      backgroundColor={lang.backgroundColor}
      color={lang.color}
    />
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
      <section className="chips-container">{chips}</section>
    </main>
  );
}

export default App;
