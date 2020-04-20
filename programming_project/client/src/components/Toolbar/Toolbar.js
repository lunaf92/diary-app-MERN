import React from 'react'; 
import classes from './Toolbar.module.css' 
import {NavLink} from 'react-router-dom'

const Toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <nav >
                <ul className={classes.NavigationItems}>
                    <li className={classes.NavigationItem}>
                        <NavLink to="/diaries">Homepage</NavLink>
                    </li>
                    <li className={classes.NavigationItem}>
                        <NavLink to="/new-diary">Create new diary</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
} 
 
export default Toolbar