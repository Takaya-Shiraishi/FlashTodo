import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders todo list title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Flash Todo/i);
  expect(titleElement).toBeInTheDocument();
});

test("adds and displays new task", () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/What are you going to do\?/i);
  const addButtonElement = screen.getByText(/追加/i);
  fireEvent.change(inputElement, { target: { value: "Test Task" } });
  fireEvent.click(addButtonElement);
  const taskElement = screen.getByText(/Test Task/i);
  expect(taskElement).toBeInTheDocument();
});

test("edits and displays edited task", () => {
  render(<App />);
  const addButtonElement = screen.getByText(/追加/i);
  fireEvent.click(addButtonElement);
  const editButtonElement = screen.getByText(/編集/i);
  fireEvent.click(editButtonElement);
  const editInputElement = screen.getByLabelText(/タスク名を変更できます/i);
  const saveButtonElement = screen.getByText(/保存/i);
  fireEvent.change(editInputElement, { target: { value: "Edited Task" } });
  fireEvent.click(saveButtonElement);
  const editedTaskElement = screen.getByText(/Edited Task/i);
  expect(editedTaskElement).toBeInTheDocument();
});

test("deletes task", () => {
  render(<App />);
  const addButtonElement = screen.getByText(/追加/i);
  fireEvent.click(addButtonElement);
  const deleteButtonElement = screen.getByText(/削除/i);
  fireEvent.click(deleteButtonElement);
  const taskElement = screen.queryByText(/Test Task/i);
  expect(taskElement).not.toBeInTheDocument();
});
