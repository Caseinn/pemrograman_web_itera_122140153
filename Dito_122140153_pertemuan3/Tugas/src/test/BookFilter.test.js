import { render, fireEvent, screen } from "@testing-library/react";
import { BookFilter } from "../components/BookFilter";

test("should change filter value when user selects a different option", () => {
  const mockOnChange = jest.fn();
  render(<BookFilter value="All" onChange={mockOnChange} />);

  fireEvent.click(screen.getByText("Own"));

  expect(mockOnChange).toHaveBeenCalledWith("Own");
});
