import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <div className="empty">No tasks found for this filter.</div>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} item={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TodoList;
