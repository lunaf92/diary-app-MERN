import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import diariesReducer from './store/reducers/diaries';
import newDiaryReducer from './store/reducers/newDiary';
import fullDiaryReducer from './store/reducers/fullDiary';

const masterReducer = combineReducers({
    diaries: diariesReducer,
    newDiary: newDiaryReducer,
    fullDiary: fullDiaryReducer
})

const store = createStore(masterReducer, compose(applyMiddleware(thunk)))

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
