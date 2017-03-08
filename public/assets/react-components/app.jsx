// Include jQuery and make it global
window.$ = $;
import $ from "jquery";

require("../js/common.js");

import React from 'react';
import ReactDOM from 'react-dom';

import Todo from './todo';

ReactDOM.render(<Todo />, document.getElementById("app"));
