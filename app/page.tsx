"use client";
import { useState, useEffect, Key } from "react";
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
    const data = Data.quiz.questions;
    // Shuffle the array of questions
    const shuffledQuestions = data.sort(() => 0.5 - Math.random());

    // Select the first 65 questions
    const generatedQuestions = shuffledQuestions.slice(0, 65);
    setRandomQuestions(generatedQuestions);
  }, []);

  const handleAnswerClick = (
    questionId: number,
    answerId: string,
    isCorrect: any,
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
      (a: { isCorrect: boolean }) => a.isCorrect
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

  const resetScore = () => {
    setScore(0);
  };

  const resetAnsweredQuestions = () => {
    setSelectedAnswers({});
    setScoredQuestions({});
    setShowCorrectAnswers({});
    resetScore();
  };

  return (
    <div className="p-4 h-full w-full bg-red-100 bg-[linear-gradient(to_right,red_1px,transparent_1px),linear-gradient(to_bottom,red_1px,transparent_1px)] bg-[size:50px_50px]">
      <Header
        score={score}
        resetScore={resetScore}
        resetAnsweredQuestions={resetAnsweredQuestions}
      />
      <ol className="shadow-solid-black list-decimal list-inside bg-white p-8 mt-4 mx-24 rounded-xl text-blue-600">
        {randomQuestions.map((q) => (
          <div key={q.id}>
            <br />
            <li>{q.question}</li>
            <ul className="list-disc list-inside">
              {q.answers.map((a: { id: Key }) => (
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
