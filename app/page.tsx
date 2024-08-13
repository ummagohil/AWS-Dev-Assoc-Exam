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

    // If the question has already been answered, do nothing
    if (scoredQuestions[questionId]) {
      return;
    }

    setSelectedAnswers((prevState) => ({
      ...prevState,
      [questionId]: {
        ...prevState[questionId],
        [answerId]: isCorrect,
      },
    }));

    // If the answer is correct and the question hasn't been scored yet
    if (isCorrect && !scoredQuestions[questionId]) {
      setScore((prevScore) => prevScore + 1);
    }

    // Mark the question as scored (i.e., answered)
    setScoredQuestions((prevScored) => ({
      ...prevScored,
      [questionId]: true,
    }));
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
