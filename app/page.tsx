"use client";
import { useState, useEffect } from "react";
import Data from "./data/data.json";

export default function Home() {
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: { [key: string]: boolean };
  }>({});
  const [score, setScore] = useState<number>(0);
  const [randomQuestions, setRandomQuestions] = useState<any[]>([]);
  const [scoredQuestions, setScoredQuestions] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const data: any = Data.quiz.questions;
    const generatedQuestions = data
      .filter(() => Math.random() < 66 / data.length)
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
    const isMultiSelect = question.answers.length === 5;

    const currentSelections = {
      ...selectedAnswers[questionId],
      [answerId]: isCorrect,
    };

    const totalCorrectAnswers = question.answers.filter(
      (a) => a.isCorrect
    ).length;
    const correctSelections = Object.values(currentSelections).filter(
      (value) => value
    ).length;

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
  };

  return (
    <div>
      <h1>Total Score: {score}</h1>
      <ol>
        {randomQuestions.map((q: any) => (
          <div key={q.id}>
            <br />
            <li>{q.question}</li>

            <ul>
              {q.answers.map((a: any) => (
                <li key={a.id}>
                  <button
                    className={
                      selectedAnswers[q.id]?.[a.id] !== undefined
                        ? selectedAnswers[q.id][a.id]
                          ? "bg-green-500"
                          : "bg-red-500"
                        : ""
                    }
                    onClick={(event) =>
                      handleAnswerClick(q.id, a.id, a.isCorrect, event)
                    }
                    disabled={scoredQuestions[q.id] !== undefined}
                  >
                    {a.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ol>
    </div>
  );
}
