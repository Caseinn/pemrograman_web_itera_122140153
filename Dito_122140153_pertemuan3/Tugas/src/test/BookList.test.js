import { render, fireEvent, screen } from "@testing-library/react";
import { BookList } from "../components/BookList";

test("should call onDelete when delete button is clicked", () => {
  const mockDelete = jest.fn();
  const books = [
    { id: "1", title: "Test Book 1", author: "Author 1", status: "Reading" },
    { id: "2", title: "Test Book 2", author: "Author 2", status: "Own" },
  ];

  render(<BookList books={books} onEdit={() => {}} onDelete={mockDelete} />);

  fireEvent.click(screen.getAllByText(/delete/i)[1]);

  expect(mockDelete).toHaveBeenCalledWith("2");
});

test("should display grid with responsive layout", () => {
  const books = [
    { id: "1", title: "Test Book 1", author: "Author 1", status: "Reading" },
    { id: "2", title: "Test Book 2", author: "Author 2", status: "Own" },
  ];

  render(<BookList books={books} onEdit={() => {}} onDelete={() => {}} />);

  const grid = screen.getByRole("grid");
  expect(grid).toBeInTheDocument();

});
