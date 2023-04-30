import React from "react";
import AuthContext from "../../store/auth-contex";
import classes from "./Navigation.module.css";
import { useContext } from "react";
const Navigation = (props) => {
  const ctx = useContext(AuthContext)
  return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLoggedIn && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
};

export default Navigation;
