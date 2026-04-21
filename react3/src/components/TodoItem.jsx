function TodoItem({ item, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <div>
        <p className={`todo-title ${item.completed ? 'done' : ''}`}>{item.title}</p>
        <p className="todo-meta">Created: {new Date(item.createdAt).toLocaleString()}</p>
      </div>
      <div className="row">
        <button type="button" className="btn-secondary" onClick={() => onToggle(item.id)}>
          {item.completed ? 'Mark Active' : 'Mark Done'}
        </button>
        <button type="button" className="btn-danger" onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
