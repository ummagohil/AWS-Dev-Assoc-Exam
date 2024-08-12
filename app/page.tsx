"use client";
import Data from "./data/data.json";

export default function Home() {
  const data: any = Data.quiz.questions;
  const randomQuestions: any = data
    .filter(() => Math.random() < 66 / data.length)
    .slice(0, 65);

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
