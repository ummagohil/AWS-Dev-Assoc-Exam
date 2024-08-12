"use client";
import Data from "./data/data.json";

export default function Home() {
  const data: any = Data.quiz.questions;
  const randomQuestions: any = data
    .filter(() => Math.random() < 66 / data.length)
    .slice(0, 65);

  /**
   * @TODO:
   * - create a state to store counter of isCorrect for score
   * - change button background or text when answer isCorrect is true
   * - add all other questions to json file
   * - add a timer [check allocated time for exam] with stop and start - maybe modal to check results or automatically update score at top
   * - add type check safety to everything
   * - unit tests
   * - styling
   * - documentation (readme)
   */

  return (
    <ol>
      {randomQuestions.map((a: any) => (
        <div key={a.key}>
          <br />
          <li>{a.question}</li>

          <ul key={a.question.id}>
            {a.answers.map((a: any) => (
              <li key={a?.answers?.id}>
                <button onClick={() => console.log(a?.isCorrect)}>
                  {a.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </ol>
  );
}
