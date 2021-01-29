/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import db from "../../db";
import QuizScreen from "../../src/Screens/Quiz";

export default function QuizPage() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <QuizScreen
      externalQuestions={db.questions}
      externalBg={db.bg}
      name={name}
    />
  );
}
