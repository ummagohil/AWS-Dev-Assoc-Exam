import Timer from "./timer";

type Props = {
  score: number;
  resetScore: () => void;
  resetAnsweredQuestions: () => void;
};

export default function Header({
  score,
  resetScore,
  resetAnsweredQuestions,
}: Props) {
  return (
    <>
      <div className="bg-white w-full p-8 text-center border-b-8 border-b-orange-300">
        <h1 className="text-outline-black sm:text-md text-8xl font-bold">
          AWS Developer Associate Exam Practice
        </h1>
      </div>
      <div className="flex justify-center items-center pt-8 mx-24 justify-between">
        <div>
          <h1
            className="text-blue-500"
            style={{ fontSize: "40px", fontWeight: "bold" }}
          >
            Score: {score}/65
          </h1>
        </div>
        <div>
          <Timer
            resetScore={resetScore}
            resetAnsweredQuestions={resetAnsweredQuestions}
          />
        </div>
      </div>
    </>
  );
}
