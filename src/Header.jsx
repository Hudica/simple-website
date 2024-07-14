import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';  // Ensure you have your CSS styles defined

function Header() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : undefined}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined}>
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/portfolio" className={({ isActive }) => isActive ? 'active' : undefined}>
                            Portfolio
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
