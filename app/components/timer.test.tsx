import { render, screen, fireEvent } from "@testing-library/react";
import Timer from "./timer";

// fire button clicks on each button
// render the titles start, pause and clear
// able to view the time (?!)

test("calls 'Start' clicked", () => {
  const handleClick = jest.fn();
  render(<Timer />);

  fireEvent.click(screen.getByText(/Start/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("calls 'Pause' clicked", () => {
  const handleClick = jest.fn();
  render(<Timer />);

  fireEvent.click(screen.getByText(/Pause/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("calls 'Clear' clicked", () => {
  const handleClick = jest.fn();
  render(<Timer />);

  fireEvent.click(screen.getByText(/Clear/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
