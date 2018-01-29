import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRoot from './app/app-component/app-component';

if (typeof document !== 'undefined') {
    const appNode = document.getElementById('app');
    if (appNode) {
        ReactDOM.hydrate(<AppRoot />, appNode);
    }
}
