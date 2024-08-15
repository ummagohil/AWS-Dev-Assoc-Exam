"use client";
import { useState, useEffect } from "react";
import Data from "./data/data.json";
import JSConfetti from "js-confetti";
import AnswerSelect from "./components/answerSelection";
import Result from "./components/score";
import Header from "./components/header";

export default function Home() {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: { [key: string]: boolean };
  }>({});
  const [score, setScore] = useState<number>(0);
  const [randomQuestions, setRandomQuestions] = useState<any[]>([]);
  const [scoredQuestions, setScoredQuestions] = useState<{
    [key: number]: boolean;
  }>({});
  const [showCorrectAnswers, setShowCorrectAnswers] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const data: any = Data.quiz.questions;
    const generatedQuestions = data
      .filter(() => Math.random() < 80 / data.length)
      .slice(0, 65);

    setRandomQuestions(generatedQuestions);
  }, []);

  const handleAnswerClick = (
    questionId: number,
    answerId: string,
    isCorrect: boolean,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (scoredQuestions[questionId]) {
      return;
    }

    const question = randomQuestions.find((q) => q.id === questionId);
    const isMultiSelect =
      question.answers.length === 5 || question.answers.length === 6;

    const currentSelections = {
      ...selectedAnswers[questionId],
      [answerId]: isCorrect,
    };

    const totalCorrectAnswers = question.answers.filter(
      (a: any) => a.isCorrect
    ).length;
    const correctSelections = Object.values(currentSelections).filter(
      (value) => value
    ).length;

    if (correctSelections) {
      const jsConfetti = new JSConfetti();

      jsConfetti.addConfetti({ confettiRadius: 5, confettiNumber: 2000 });
    }

    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: currentSelections,
    }));

    // Logic for questions with 5 options
    if (isMultiSelect) {
      // If all correct answers are selected, update the score and mark the question as completed
      if (correctSelections === totalCorrectAnswers) {
        setScore((prevScore) => prevScore + 1);
        setScoredQuestions((prevScored) => ({
          ...prevScored,
          [questionId]: true,
        }));
      }
    } else {
      // For questions with fewer than 5 options, mark as complete after one selection
      setScore((prevScore) => prevScore + (isCorrect ? 1 : 0));
      setScoredQuestions((prevScored) => ({
        ...prevScored,
        [questionId]: true,
      }));
    }

    if (!isCorrect) {
      // If the answer is wrong, display the correct answer
      setShowCorrectAnswers((prevShow) => ({
        ...prevShow,
        [questionId]: true,
      }));
    }
  };

  // to do: ensure confetti turns up AFTER the user has completed the test
  // to do: figure out what to do about code blocks (add to json or separate file with specified questions related to code)
  // to do: show the correct answer if wrong answer is selected
  // add a tracker of what question the user is one and then fire this event below
  // score >= 47 &&
  //   jsConfetti.addConfetti({ confettiRadius: 5, confettiNumber: 2000 });

  // hoist state from timer here and then reset the score to zero if the user clicks start/clear

  return (
    <div className=" h-full w-full bg-red-100 bg-[linear-gradient(to_right,red_1px,transparent_1px),linear-gradient(to_bottom,red_1px,transparent_1px)] bg-[size:50px_50px]">
      <Header score={score} />

      <ol className="list-decimal list-inside bg-white p-8 mt-4 mx-24 rounded-xl text-blue-600">
        {randomQuestions.map((q: any) => (
          <div key={q.id}>
            <br />
            <li>{q.question}</li>
            <ul className="list-disc list-inside">
              {q.answers.map((a: any) => (
                <li key={a.id}>
                  <AnswerSelect
                    selectedAnswers={selectedAnswers}
                    q={q}
                    a={a}
                    showCorrectAnswers={showCorrectAnswers}
                    handleAnswerClick={handleAnswerClick}
                    scoredQuestions={scoredQuestions}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Result score={score} />
      </ol>
    </div>
  );
}
