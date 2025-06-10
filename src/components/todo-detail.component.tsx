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
  const [todo, setTodo] = useState<Todo | null>(null); // set to null initially
  const [error, setError] = useState<string | null>(null); // to handle error cuz you can't throw error directly in the fetch?

  useEffect(() => {
    const getDetails = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
        if (res.ok) {
          const details: Todo = await res.json();
          setTodo(details);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError('Failed: ' + err.message);
        } else {
          setError('Failed: Unknown error');
        }
      }
    };

    if (todoId) {
      getDetails();
    }
  }, [todoId]);

  if (error) {
    return <p>error loading todo</p>;
  }

  if (!todo) {
    return <p>error loading todo</p>;
  }

  return (
    <div className="todo-detail">
      <h1>{todo.title}</h1>
      <h2>
        Todo ID: {todo.id}, User ID: {todo.userId}
      </h2>
      <h3>Status: </h3>
      <h3>{todo.completed ? 'Completed' : 'Not Complete'}</h3>
    </div>
  );
};
