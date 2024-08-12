import Data from "./data/data.json";

export default function Home() {
  const data: any = Data.quiz.questions;
  const randomQuestions: any = data
    .filter(() => Math.random() < 20 / data.length)
    .slice(0, 65);
  return (
    <div>
      {randomQuestions.map((a: any) => (
        <div key={a.key}>
          <br />
          <p>{a.question}</p>

          <p>
            {a.answers.map((a: any) => {
              a;
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
