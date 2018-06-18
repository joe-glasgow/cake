// React bootstrapping
import * as React from "react";
import * as ReactDOM from "react-dom";
// Components
import Footer from '../components/footer';
import Header from '../components/header';

const Main = (props) => <div>
    {/* Header component */}
    <Header/>
    {/* React Router logic for the following section*/}
    <section>Content Section</section>
    {/* Header component */}
    <Footer/>
</div>;

const renderApp = id => ReactDOM.render((
    <Main/>), document.getElementById(id));

renderApp("app");