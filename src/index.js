import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import calendarStore from "./store/calendarStore";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={calendarStore}>
            <Router>
            <App/>
            </Router>
        </Provider>
    </React.StrictMode>
);
