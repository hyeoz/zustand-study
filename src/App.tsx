import { useState } from 'react';

import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import TodoCard from './components/TodoCard';
import { todoStore } from './store/todos';

function App() {
  const [value, setValue] = useState('');
  const todos = todoStore();

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
              <h1
                style={{
                  width: '100%',
                  fontSize: '2.4rem',
                  fontWeight: 400,
                  padding: '32px 0',
                  margin: 0,
                  position: 'absolute',
                  background: 'white',
                }}
              >
                todo
              </h1>

              <ul
                style={{
                  marginTop: '122px',
                  maxHeight: '750px',
                  overflowY: 'scroll',
                }}
              >
                {todos.data.filter((t) => !t.done).length ? (
                  todos.data
                    .filter((t) => !t.done)
                    .map((todo) => (
                      <li key={todo.id}>
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
              <h1
                style={{
                  width: '100%',
                  fontSize: '2.4rem',
                  fontWeight: 400,
                  padding: '32px 0',
                  margin: 0,
                  position: 'absolute',
                }}
              >
                done
              </h1>

              <ul
                style={{
                  marginTop: '122px',
                  maxHeight: '750px',
                  overflowY: 'scroll',
                }}
              >
                {todos.data.filter((t) => t.done).length ? (
                  todos.data
                    .filter((t) => t.done)
                    .map((todo) => (
                      <li key={todo.id}>
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
