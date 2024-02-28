import { TodoType, todoStore } from '../store/todos';

export default function TodoCard(data: TodoType) {
  const todos = todoStore();

  return (
    <div className="todo-card-wrapper">
      <div
        style={{
          display: 'flex',
          gap: '8px',
        }}
      >
        <input
          type="checkbox"
          checked={data.done}
          onChange={() => todos.update(data)}
        />
        <p
          style={{
            margin: 0,
          }}
        >
          {data.description}
        </p>
      </div>
      <p
        style={{
          margin: 0,
          width: 'fit-content',
          cursor: 'pointer',
        }}
        onClick={() => todos.delete(data)}
      >
        X
      </p>
    </div>
  );
}
