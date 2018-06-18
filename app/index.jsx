// React bootstrapping
import * as React from "react";
import * as ReactDOM from "react-dom";
// Components
import Main from './js/main';

const renderApp = id => ReactDOM.render((
    <Main/>), document.getElementById(id));

renderApp("app");