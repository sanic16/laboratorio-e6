import React from "react"

// styles
import classes from '../styles/components/LoginComponent.module.css'

// icons
import {AiOutlineUser, AiOutlineLock} from 'react-icons/ai'

const LoginComponent = ({onLoginHandler}) => {
  const loginHandler = (e) => {
    e.preventDefault()
    onLoginHandler()
  }
  return (
    <div className={classes.wrapper}>
      <form onSubmit={loginHandler}>
        <h1>Login</h1>

        <div className={classes['input-box']}>
          <input type="text" placeholder="Username" required />
          <AiOutlineUser />
        </div>

        <div className={classes['input-box']}>
          <input type="password" placeholder="Password" required />
          <AiOutlineLock />
        </div>  

        <div className={classes['remember-forgot']}>
          <label>
            <input type="checkbox" /> 
            Remember me
          </label>
          <a href="#">Forgot password ?</a>
        </div>

        <button type="submit" className={classes.btn}>
          Login
        </button>

        <div className={classes['register-link']}>
          <p>Don't have an account? <a href="#">Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
