// Include jQuery and make it global
window.$ = $;
import $ from "jquery";

// Include CSS file
// require("../main.css");

import React from 'react';
import ReactDOM from 'react-dom';

import Todo from './todo';

ReactDOM.render(<Todo />, document.getElementById("app"));
