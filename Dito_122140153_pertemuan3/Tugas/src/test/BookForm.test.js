
import { render, fireEvent, screen } from "@testing-library/react";
import BookForm from "../components/BookForm";

test("should submit the form with correct data", () => {
  const handleSubmit = jest.fn();
  render(<BookForm onSubmit={handleSubmit} current={null} />);

  const titleInput = screen.getByPlaceholderText("Title");
  const authorInput = screen.getByPlaceholderText("Author");
  const statusSelect = screen.getByText("Select Status");
  const submitButton = screen.getByText(/add/i);
  fireEvent.change(titleInput, { target: { value: "Test Book" } });
  fireEvent.change(authorInput, { target: { value: "Test Author" } });
  fireEvent.change(statusSelect, { target: { value: "Reading" } });
  fireEvent.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledWith({
    id: expect.any(String),
    title: "Test Book",
    author: "Test Author",
    status: "Reading",
  });
});

test("submit button should be disabled if fields are empty", () => {
    const handleSubmit = jest.fn();
    render(<BookForm onSubmit={handleSubmit} current={null} />);
  
    const submitButton = screen.getByText(/add/i);
  
    expect(submitButton).toBeDisabled(); 
  });
  
