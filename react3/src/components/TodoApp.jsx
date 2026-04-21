import { useMemo, useState } from 'react';
import TodoForm from './TodoForm';
import FilterBar from './FilterBar';
import TodoList from './TodoList';

const STORAGE_KEY = 'react3_todos';

function readInitialTodos() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function TodoApp() {
  const [todos, setTodos] = useState(readInitialTodos);
  const [filter, setFilter] = useState('all');

  function updateTodos(nextTodos) {
    setTodos(nextTodos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTodos));
  }

  function addTodo(title) {
    const todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString()
    };
    updateTodos([todo, ...todos]);
  }

  function toggleTodo(id) {
    const nextTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    updateTodos(nextTodos);
  }

  function deleteTodo(id) {
    const nextTodos = todos.filter((todo) => todo.id !== id);
    updateTodos(nextTodos);
  }

  function clearCompleted() {
    const nextTodos = todos.filter((todo) => !todo.completed);
    updateTodos(nextTodos);
  }

  const visibleTodos = useMemo(() => {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [todos, filter]);

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <main className="container">
      <h1>TODO Application</h1>
      <p className="subtitle">Create, track, and complete your daily tasks.</p>

      <TodoForm onAdd={addTodo} />

      <section className="toolbar">
        <FilterBar current={filter} onChange={setFilter} />
        <div className="row">
          <span className="badge">
            {completedCount} / {todos.length} completed
          </span>
          <button
            type="button"
            className="btn-danger"
            onClick={clearCompleted}
            disabled={completedCount === 0}
          >
            Clear Completed
          </button>
        </div>
      </section>

      <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </main>
  );
}

export default TodoApp;
