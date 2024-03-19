import './globals.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';

// @ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
