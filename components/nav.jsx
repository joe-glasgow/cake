import * as React from 'react';
import {NavLink} from 'react-router-dom';

export const MainNav = () => <div>
    <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add">Add a Cake</NavLink>
    </nav>
</div>;
