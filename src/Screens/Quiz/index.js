/* eslint-disable quotes */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Widget from "../../components/Widget";
import Footer from "../../components/Footer";
import QuizBackground from "../../components/QuizBackground";
import Button from "../../components/Button";
import QuizContainer from "../../components/QuizContainer";
import AlternativeForm from "../../components/AlternativeForm";
import QuizLogo from "../../components/QuizLogo";
import BackLinkArrow from "../../components/BackLinkArrow";

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>[Desafio do Loading]</Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results, name }) {
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
        Total dos resultados para {name}
      </Widget.Header>

      <Widget.Content>
        <p>Voce acertou {results.filter((x) => x).length} perguntas</p>
        <ul>
          {results.map((result, index) => (
            <li key={`result_${result}`}>
              #{index + 1} resultado:
              {result === true ? " acertou" : " errou"}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
  name,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isFormSubmited, setIsFormSubmited] = useState();
  const QuestionId = `question_${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>{`Jogador: ${name}`}</h3>
      </Widget.Header>
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>
          {` Pergunta ${questionIndex + 1} de
           ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativeForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsFormSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsFormSubmited(false);
              setSelectedAlternative(undefined);
            }, 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const altenativeStatus = isCorrect ? "SUCCESS" : "ERROR";
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                key={alternativeId}
                as="label"
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isFormSubmited && altenativeStatus}
              >
                <input
                  style={{ display: "none" }}
                  id={alternativeId}
                  type="radio"
                  name={QuestionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/*
        Debug
        <pre>{JSON.stringify(question, null, 4)}</pre>
        */}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isFormSubmited && isCorrect && <p>Voce acertou!</p>}
          {isFormSubmited && !isCorrect && <p>Voce errou!</p>}
        </AlternativeForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOAGIND",
  RESULT: "RESULT",
};

export default function QuizPage({ externalQuestions, externalBg, name }) {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestions = externalQuestions.length;
  const question = externalQuestions[questionIndex];
  const bg = externalBg;
  function addResult(result) {
    setResults([...results, result]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setQuestionIndex(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
            name={name}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} name={name} />
        )}

        <Footer />
      </QuizContainer>
    </QuizBackground>
  );
}
