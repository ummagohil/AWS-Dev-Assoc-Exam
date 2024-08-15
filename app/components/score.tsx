type Props = {
  score: number;
};

export default function Score({ score }: Props) {
  return (
    <>
      {score >= 47 ? (
        <h1
          className="text-green-500"
          style={{ fontSize: "40px", fontWeight: "bold" }}
        >
          PASS
        </h1>
      ) : (
        <h1
          className="text-red-500"
          style={{ fontSize: "40px", fontWeight: "bold" }}
        >
          FAIL
        </h1>
      )}
    </>
  );
}
