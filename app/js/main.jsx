import * as React from 'react';
// react-dom (what we'll use here)
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes';
// Components
import Footer from 'components/footer';
import Header from 'components/header';


const PageContent = () => <div className="page-layout">
    <div className="container">
        {/* header inside router for navigation styling assistance */}
        <Header/>
    </div>
    <AppRoutes/>
    <div className="container">
        <Footer/>
    </div>
</div>;
const Main = () => <div className="wrapper">
    {/* React Router logic for the following section*/}
    <BrowserRouter>
        <PageContent/>
    </BrowserRouter>
</div>;

export default Main;