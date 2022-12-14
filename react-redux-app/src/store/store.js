import { createStore } from "redux";
import taskReducer from './task';

function configureStore() {
    return createStore(
        taskReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
}

export default configureStore;