import React from "react"
import LoginComponent from "../components/LoginComponent"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { authActions } from "../store/auth-slice"

// styles
import classes from '../styles/pages/Login.module.css'

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const from = location?.state?.from?.pathname || "/"

  const auth = useSelector((state) => state.auth.isAuth)
  const dispatch = useDispatch()

  const loginHandler = () => {
    dispatch(authActions.login())
    navigate(from, {replace: true})
  };

  return (
    <div className={classes.login}>
      <LoginComponent onLoginHandler={loginHandler} />
    </div>
  );
};

export default Login;
