import React from 'react';
import { render } from 'react-dom';
import App from './App';
import WebIM from './webim/WebIM';

window.WebIM = WebIM;
render(<App />, document.getElementById('root'));
