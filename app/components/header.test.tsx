import { render, screen } from "@testing-library/react";
import Header from "./header";

test("<Header /> renders component without props", () => {
  const { container } = render(<Header />);
  expect(container).toMatchSnapshot();
});

test("<Header /> renders correct title with props", () => {
  render(<Header score={10} />);
  expect(
    screen.findAllByText(/AWS Developer Associate Exam Practice/)
  ).toBeTruthy();
});

test("<Header /> renders correct score", () => {
  render(<Header score={10} />);
  expect(screen.findAllByText(/10/)).toBeTruthy();
});
