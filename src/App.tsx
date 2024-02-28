import { DragEventHandler, useEffect, useState } from 'react';

import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import TodoCard from './components/TodoCard';
import { todoStore } from './store/todos';

function App() {
  const [value, setValue] = useState('');
  const [floatId, setFloatId] = useState(0);
  const [overId, setOverId] = useState(0);
  const [order, setOrder] = useState<number[]>([]);
  const todos = todoStore();

  useEffect(() => {
    setOrder(todos.data.map((t) => t.id));
  }, []);

  const onDragStart = (id: number) => {
    setFloatId(id);
  };
  const onDragEnd = () => {
    const overIndex = order.findIndex((o) => o === overId);
    const scoped = [...order].filter((f) => f !== floatId);
    const slicedOrder = [
      ...scoped.slice(0, overIndex),
      floatId,
      ...scoped.slice(overIndex),
    ];
    setOrder([...slicedOrder]);
  };
  const onDragOver: DragEventHandler<HTMLLIElement> = (e) => {
    e.preventDefault();
    setOverId(Number((e.target as Element).getAttribute('id')));
  };

  return (
    <article>
      <Header />

      <section className="body-wrapper">
        <div
          style={{
            paddingTop: '40px',
            maxHeight: '1009px',
            height: '100%',
            width: '100%',
          }}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="add something to do"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                todos.add(value);
                setValue('');
              }
            }}
            style={{
              padding: '16px',
              borderRadius: '4px',
              fontSize: '18px',
              fontWeight: 600,
            }}
          />
          <div
            style={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                position: 'relative',
              }}
            >
              <h1 className="title">todo</h1>

              <ul className="todos-wrapper">
                {todos.data.filter((t) => !t.done).length ? (
                  todos.data
                    .sort(
                      (a, b) =>
                        order.findIndex((o) => o === a.id) -
                        order.findIndex((o) => o === b.id)
                    )
                    .filter((t) => !t.done)
                    .map((todo) => (
                      <li
                        key={todo.id}
                        draggable
                        onDragStart={() => onDragStart(todo.id)}
                        onDragEnd={onDragEnd}
                        onDragOver={onDragOver}
                      >
                        <TodoCard {...todo} />
                      </li>
                    ))
                ) : (
                  <p>Everything is Done!</p>
                )}
              </ul>
            </div>
            <div
              style={{
                position: 'relative',
              }}
            >
              <h1 className="title">done</h1>

              <ul className="todos-wrapper">
                {todos.data.filter((t) => t.done).length ? (
                  todos.data
                    .sort(
                      (a, b) =>
                        order.findIndex((o) => o === a.id) -
                        order.findIndex((o) => o === b.id)
                    )
                    .filter((t) => t.done)
                    .map((todo) => (
                      <li
                        key={todo.id}
                        draggable
                        onDragStart={() => onDragStart(todo.id)}
                        onDragEnd={onDragEnd}
                        onDragOver={onDragOver}
                      >
                        <TodoCard {...todo} />
                      </li>
                    ))
                ) : (
                  <p>Nothing has Done!</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </article>
  );
}

export default App;
