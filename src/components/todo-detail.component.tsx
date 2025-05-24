// src/components/TodoDetail.tsx

import React, { useEffect, useState } from 'react';

import { Todo } from '../types/todo-type';

interface TodoDetailProps {
  todoId: number;
}
/**
 * TodoDetail component fetches and displays the details of a specific todo item based on the provided todoId.
 * It uses the useEffect hook to fetch the todo details from the API when the component mounts or when the todoId changes.
 * @param todoId - The ID of the todo item to fetch and display.
 */
export const TodoDetail: React.FC<TodoDetailProps> = ({ todoId }) => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      setError(null);
      setTodo(null);
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${todoId}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Todo = await response.json();
        setTodo(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (todoId) {
      fetchTodo();
    }
  }, [todoId]);

  if (loading) return <p>Loading todo details...</p>;
  if (error) return <p className="error">Error loading todo: {error}</p>;
  if (!todo) return <p>No todo found.</p>;

  return (
    <div>
      <h2>Todo Details</h2>
      <p>ID: {todo.id}</p>
      <p>
        <span>{todo.title}</span>
      </p>
      <p>Completed</p>
      <p>Status: {todo.completed ? 'Yes' : 'No'}</p>
      <p>User ID: {todo.userId}</p>
    </div>
  );
};
