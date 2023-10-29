import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
// styles
import classes from "../styles/components/NavBar.module.css";
// icons
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.isAuth);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        LabE6
      </Link>

      <input type="checkbox" className={classes.check} id="check" />
      <label htmlFor="check" className={classes.icons}>
        <AiOutlineMenu className={classes["menu-icon"]} />
        <AiOutlineClose className={classes["close-icon"]} />
      </label>

      <nav className={classes.navbar}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/login" className={classes.login}>Login</Link>
        <Link to="/register" className={classes.register}>Register</Link>
      </nav>

      <div className={classes.auth}>
        <a
          className=""
          onClick={
            auth
              ? logoutHandler
              : () => {
                  navigate("/login");
                }
          }
        >
          {auth ? "Logout" : "Login"}
        </a>
        <a>Register</a>
      </div>
    </header>
  );
};

export default NavBar;
