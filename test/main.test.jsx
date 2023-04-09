import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Container from "../src/App";

describe('App', () => {
    it('renders the page title', () => {
        render(<Container />);
        const pageTitle = screen.getByRole('heading', { name: /Flash Todo/i });
        expect(pageTitle).toBeInTheDocument();
    });

    it('renders the add task input', () => {
        render(<Container />);
        const addTaskInput = screen.getByPlaceholderText(/What are you going to do\?/i);
        expect(addTaskInput).toBeInTheDocument();
    });

    it('adds a new task when the "Add" button is clicked', () => {
        render(<Container />);
        const addTaskInput = screen.getByPlaceholderText(/What are you going to do\?/i);
        const addButton = screen.getByRole('button', { name: /追加/i });

        // Add a task
        fireEvent.change(addTaskInput, { target: { value: 'New task' } });
        fireEvent.click(addButton);

        // Check that the new task has been added
        const taskTitle = screen.getByText('New task');
        expect(taskTitle).toBeInTheDocument();
    });

    it('deletes a task when the "Delete" button is clicked', () => {
        render(<Container />);
        const addTaskInput = screen.getByPlaceholderText(/What are you going to do\?/i);
        const addButton = screen.getByRole('button', { name: /追加/i });

        // Add a task
        fireEvent.change(addTaskInput, { target: { value: 'New task' } });
        fireEvent.click(addButton);

        // Delete the task
        const deleteButton = screen.getByRole('button', { name: /削除/i });
        fireEvent.click(deleteButton);

        // Check that the task has been deleted
        const taskTitle = screen.queryByText('New task');
        expect(taskTitle).not.toBeInTheDocument();
    });

    it('edits a task when the "Edit" button is clicked', () => {
        render(<Container />);
        const addTaskInput = screen.getByPlaceholderText(/What are you going to do\?/i);
        const addButton = screen.getByRole('button', { name: /追加/i });

        // Add a task
        fireEvent.change(addTaskInput, { target: { value: 'New task' } });
        fireEvent.click(addButton);

        // Edit the task
        const editButton = screen.getByRole('button', { name: /編集/i });
        fireEvent.click(editButton);
        const saveButton = screen.getByRole('button', { name: /保存/i });
        fireEvent.click(saveButton);
    });
});