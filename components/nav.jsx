import * as React from 'react';
import {NavLink} from 'react-router-dom';

export const MainNav = () => <div>
    <nav>
        <ul className="o-list-inline main-nav">
            <li className="o-list-inline__item">
                <NavLink to="/">Home</NavLink>
            </li>
            <li className="o-list-inline__item">
                <NavLink to="/add">Add a Cake</NavLink>
            </li>
        </ul>
    </nav>
</div>;
