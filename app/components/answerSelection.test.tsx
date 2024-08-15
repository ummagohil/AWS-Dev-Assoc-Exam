import { render, screen, fireEvent } from "@testing-library/react";
import AnswerSelect from "./answerSelection";
import "@testing-library/jest-dom/extend-expect";

describe("AnswerSelect Component", () => {
  const mockHandleAnswerClick = jest.fn();
  const defaultProps = {
    selectedAnswers: {},
    q: { id: "1" },
    a: { id: "1", text: "Answer 1", isCorrect: true },
    showCorrectAnswers: {},
    handleAnswerClick: mockHandleAnswerClick,
    scoredQuestions: {},
  };

  it("renders the button with the correct text", () => {
    render(<AnswerSelect {...defaultProps} />);
    const button = screen.getByRole("button", { name: /answer 1/i });
    expect(button).toBeTruthy();
  });

  it("applies correct class for a selected correct answer", () => {
    const props = {
      ...defaultProps,
      selectedAnswers: {
        "1": { "1": true },
      },
    };
    render(<AnswerSelect {...props} />);
    const button = screen.getByRole("button", { name: /answer 1/i });
    expect(button.className).toContain("text-green-500");
  });

  it("applies correct class for a selected incorrect answer", () => {
    const props = {
      ...defaultProps,
      selectedAnswers: {
        "1": { "1": false },
      },
    };
    render(<AnswerSelect {...props} />);
    const button = screen.getByRole("button", { name: /answer 1/i });
    expect(button.className).toContain("text-red-500");
  });

  it("applies correct class when showing correct answers", () => {
    const props = {
      ...defaultProps,
      showCorrectAnswers: {
        "1": true,
      },
    };
    render(<AnswerSelect {...props} />);
    const button = screen.getByRole("button", { name: /answer 1/i });
    expect(button.className).toContain("bg-yellow-300");
    expect(button.className).toContain("text-green-600");
  });

  it("does not apply any class if the answer is not selected or correct answers are not shown", () => {
    render(<AnswerSelect {...defaultProps} />);
    const button = screen.getByRole("button", { name: /answer 1/i });
    expect(button.className).not.toContain("text-green-500");
    expect(button.className).not.toContain("text-red-500");
    expect(button.className).not.toContain("bg-yellow-300");
    expect(button.className).not.toContain("text-green-600");
  });

  it("calls handleAnswerClick when the button is clicked", () => {
    render(<AnswerSelect {...defaultProps} />);
    const button = screen.getByRole("button", { name: /answer 1/i });
    fireEvent.click(button);
    expect(mockHandleAnswerClick).toHaveBeenCalledWith(
      "1",
      "1",
      true,
      expect.any(Object)
    );
  });

  it("disables the button if the question is scored", () => {
    const props = {
      ...defaultProps,
      scoredQuestions: {
        "1": true,
      },
    };
    render(<AnswerSelect {...props} />);
    const button = screen.getByRole("button", { name: /answer 1/i });
    expect(button.getAttribute("disabled")).toBe(true);
  });

  it("enables the button if the question is not scored", () => {
    render(<AnswerSelect {...defaultProps} />);
    const button = screen.getByRole("button", { name: /answer 1/i });
    expect(button.getAttribute("disabled")).toBe(null);
  });
});
