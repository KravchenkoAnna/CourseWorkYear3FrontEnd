import React from "react";
import {NavLink} from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar justify-content-center navbar-brand bg-success-subtle">
            <div className="bg-success-subtle w-100">
                <ul className="navbar-nav w-100 justify-content-center list-group-horizontal">
                    <li className="nav-item m-2">
                        <NavLink
                            className="nav-link"
                            to="/"
                            activeClassName="active"
                            exact>
                            Trades
                        </NavLink>
                    </li>
                    <li className="nav-item m-2">
                        <NavLink
                            className="nav-link"
                            to="/detals"
                            activeClassName="active">
                            Detals
                        </NavLink>
                    </li>
                    <li className="nav-item m-2">
                        <NavLink
                            className="nav-link"
                            to="/suppliers"
                            activeClassName="active">
                            Suppliers
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
