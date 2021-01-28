import React, { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import db from "../db";
import Widget from "../src/components/Widget";
import QuizBackground from "../src/components/QuizBackground";
import QuizContainer from "../src/components/Container";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import QuizLogo from "../src/components/QuizLogo";

const Input = styled.input`
  width: 100%;
  height: 38px;
  padding: 3%;
  padding-left: 4%;
  background: transparent;
  color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 24px;
  height: 38px;
  padding: 3%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  font-family: Lato;
  border: 0px solid;
  border-radius: 4px;
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/quiz?name=${name}`);
  };

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
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Digite seu nome"
                onChange={(event) => setName(event.target.value)}
              />
              <Button
                type="submit"
                disabled={name.length === 0}
                style={{
                  cursor: name.length === 0 ? "default" : "pointer",
                  backgroundColor: name.length === 0 ? "gray" : "",
                }}
              >
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quiz da galera</h1>
            <p>Dá uma olhada nesses outroz quizes dahora!!</p>
            <ul>
              <li>clebinhodj/showdomilhaoalura</li>
              <li>joaokleberprogramador/aluraqiz</li>
              <li>demervalthelegend/imersao-alura</li>
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
        <GitHubCorner projectUrl="https://github.com/GiorgioDeMoraesRossa" />
      </QuizContainer>
    </QuizBackground>
  );
}
