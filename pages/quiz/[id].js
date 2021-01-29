import React from "react";
import QuizScreen from "../../src/Screens/Quiz";
import { ThemeProvider } from "styled-components";

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestions={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, gitHubUser] = context.query.id.split("___");
  const dbExterno = await fetch(
    `https://${projectName}.${gitHubUser}.vercel.app/api/db`
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Falha no fetch");
    })
    .then((respostaConvertida) => respostaConvertida)
    .catch((err) => {
      console.log(err);
    });

  return {
    props: {
      dbExterno,
    },
  };
}
