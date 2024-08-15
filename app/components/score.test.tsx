import { render, screen } from "@testing-library/react";
import Score from "./score";

test("<Header /> renders component without props", () => {
  const { container } = render(<Score />);
  expect(container).toMatchSnapshot();
});

test("<Header /> renders correct title with props", () => {
  render(<Score score={10} />);
  expect(screen.findAllByText(/FAIL/)).toBeTruthy();
});

test("<Header /> renders correct score", () => {
  render(<Score score={50} />);
  expect(screen.findAllByText(/PASS/)).toBeTruthy();
});
