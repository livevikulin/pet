import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { taskCompleted, taskDeleted, titleChanged } from './store/task';
import configureStore from "./store/store";

const store = configureStore();

const App  = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState());
        })
    }, []);

    const completeTask = (taskId) => {
        store.dispatch(taskCompleted(taskId));
    };

    const changeTitle = (taskId) => {
        store.dispatch(titleChanged(taskId));
    };

    const deleteTask = (taskId) => {
        store.dispatch(taskDeleted(taskId));
    };

    return (
        <>
            <h1>Redux</h1>

            <ul>
                {state.map(el => <li key={el.id}>
                    <p>{el.title}</p>
                    <p>{`Completed: ${el.completed}`}</p>
                    <button onClick={() => completeTask(el.id)}>Completed</button>
                    <button onClick={() => changeTitle(el.id)}>Change title</button>
                    <button onClick={() => deleteTask(el.id)}>Delete task</button>
                    <hr/>
                </li>)}
            </ul>
        </>
    )
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
