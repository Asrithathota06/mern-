import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }
    onAdd(trimmed);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="row" aria-label="Add todo form">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit" className="btn-primary">
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
