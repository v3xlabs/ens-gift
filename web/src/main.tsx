import './globals.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { SWRConfig } from 'swr';

import { App } from './App';

// @ts-ignore
BigInt.prototype.toJSON = function () {
    return this.toString();
};

function localStorageProvider() {
    // When initializing, we restore the data from `localStorage` into a map.
    const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'));

    // Before unloading the app, we write back all the data into `localStorage`.
    window.addEventListener('beforeunload', () => {
        const appCache = JSON.stringify(Array.from(map.entries()));

        localStorage.setItem('app-cache', appCache);
    });

    // We still use the map for write & read for performance.
    return map;
}

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
    <React.StrictMode>
        <SWRConfig
            value={{
                provider: localStorageProvider as any,
            }}
        >
            <App />
        </SWRConfig>
    </React.StrictMode>
);
