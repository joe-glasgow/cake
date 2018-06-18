import * as React from 'react';
// react-dom (what we'll use here)
import {Route} from 'react-router-dom';
import CakeList from 'components/cakeList';
import AddCake from 'components/addCakes';

const AppRoutes = () => <div className="container">
    <Route exact path="/" component={CakeList}/>
    <Route exact path="/add" component={AddCake}/>
</div>;
export default AppRoutes;