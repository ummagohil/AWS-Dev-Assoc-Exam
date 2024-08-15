import Timer from "./timer";

export default function Header({ score }: any) {
  return (
    <>
      <div className="bg-white w-full p-8 text-center border-b-8 border-b-orange-300">
        <h1 className="text-outline-black text-8xl font-bold">
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
          <Timer />
        </div>
      </div>
    </>
  );
}
