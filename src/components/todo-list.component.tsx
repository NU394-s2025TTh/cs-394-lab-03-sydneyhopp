// src/components/TodoList.tsx

import React, { useEffect } from 'react';

import { Todo } from '../types/todo-type';

interface TodoListProps {
  onSelectTodo: (id: number) => void;
}

type Filters = 'All' | 'Open' | 'Completed';

interface FetchTodosParams {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
/**
 * fetchTodos function fetches todos from the API and updates the state.
 * @param setTodos - React setState Function to set the todos state.
 * @param setFilteredTodos - React setState Function to set the filtered todos state.
 * @param setLoading - react setState Function to set the loading state.
 * @param setError - react setState Function to set the error state.
 *
 * @returns {Promise<void>} - A promise that resolves when the todos are fetched and state is updated.  You should call this in useEffect.
 * setup useEffect to call this function when the component mounts
 * wraps the fetch API call in a try-catch block to handle errors gracefully and update the loading and error states accordingly.
 * The function uses async/await syntax to handle asynchronous operations, making the code cleaner and easier to read.
 * fetch from the URL https://jsonplaceholder.typicode.com/todos
 */
// remove eslint-disable-next-line @typescript-eslint/no-unused-vars when you use the parameters in the function
export const fetchTodos = async ({
  setTodos,

  setFilteredTodos,

  setLoading,

  setError,
}: FetchTodosParams): Promise<void> => {
  setLoading(true);
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    if (res.ok) {
      const data: Todo[] = await res.json();
      setTodos(data);
      setFilteredTodos(data);
    } else {
      throw new Error('HTTP error! Status: 404');
    }
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Failed: Unknown error');
    }
  } finally {
    setLoading(false);
  }
};

/**
 * TodoList component fetches todos from the API and displays them in a list.
 * It also provides filter buttons to filter the todos based on their completion status.
 * @param onSelectTodo - A function that is called when a todo is selected. It receives the todo id as an argument.
 * @returns
 */

// remove the following line when you use onSelectTodo in the component

export const TodoList: React.FC<TodoListProps> = ({ onSelectTodo }) => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [filteredTodos, setFilteredTodos] = React.useState<Todo[]>([]);
  const [filter, setFilter] = React.useState<Filters>('All');

  useEffect(() => {
    fetchTodos({ setTodos, setFilteredTodos, setLoading, setError });
  }, []);

  useEffect(() => {
    let ftd;
    if (filter == 'Open') {
      ftd = todos.filter((todo) => todo.completed == false);
    } else if (filter == 'Completed') {
      ftd = todos.filter((todo) => todo.completed);
    } else {
      ftd = todos;
    }
    setFilteredTodos(ftd);
  }, [filter, todos]);

  return (
    <div className="todo-list">
      <h2>Todo List</h2>
      <p>
        These are the filter buttons. the tests depend on the data-testids; and use
        provided styles. Implement click event handlers to change the filter state and
        update the UI accordingly to show just those todo&apos;s. other hints: you can
        change the styling of the button with <code>className</code> property. if the
        className of a button is &quot;active&quot; it will use the{' '}
        <code> .todo-button.completed</code> CSS style in App.css
      </p>
      <div className="filter-buttons">
        <button data-testid="filter-all" onClick={() => setFilter('All')}>
          All
        </button>
        <button data-testid="filter-open" onClick={() => setFilter('Open')}>
          Open
        </button>
        <button data-testid="filter-completed" onClick={() => setFilter('Completed')}>
          Completed
        </button>
      </div>

      {loading && <p>Loading todos</p>}
      {error && <p className="error">Error loading todos: {error}</p>}

      <p>
        Show a list of todo&apos;s here. Make it so if you click a todo it calls the event
        handler onSelectTodo with the todo id to show the individual todo
      </p>
      <div>
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <button onClick={() => onSelectTodo(todo.id)}>{todo.title}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
