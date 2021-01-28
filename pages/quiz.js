import React from "react";
import Widget from "../src/components/Widget";
import Footer from "../src/components/Footer";
import db from "../db";
import QuizBackground from "../src/components/QuizBackground";
import QuizContainer from "../src/components/Container";
import QuizLogo from "../src/components/QuizLogo";

export default function QuizPage() {
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>Dota 2</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Teste seus conhecimentos sobre Dota 2 e divirta-se!</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}
