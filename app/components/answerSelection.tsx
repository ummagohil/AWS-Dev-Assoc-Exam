export default function AnswerSelect({
  selectedAnswers,
  q,
  a,
  showCorrectAnswers,
  handleAnswerClick,
  scoredQuestions,
}: any) {
  return (
    <button
      className={
        selectedAnswers[q.id]?.[a.id] !== undefined
          ? selectedAnswers[q.id][a.id]
            ? "text-green-500"
            : "text-red-500"
          : showCorrectAnswers[q.id] && a.isCorrect
          ? "bg-yellow-300 text-green-600"
          : ""
      }
      onClick={(event) => handleAnswerClick(q.id, a.id, a.isCorrect, event)}
      disabled={scoredQuestions[q.id] !== undefined}
    >
      {a.text}
    </button>
  );
}
