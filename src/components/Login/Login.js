import React, { useState, useEffect,useReducer } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import classes from "./Login.module.css";

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT'){
    return {value : action.val, isValid :action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR'){
    return {value : state.value,isValid : state.value.includes('@')}
  }
  return {value : '', isValid : false}
}
const passReducer = (state,action) => {
  if(action.type === 'USER_INPUT'){
    return {value : action.val,isValid : action.val.trim().length > 6}
  }
  if(action.type === 'INPUT_BLUR'){
    return {value : state.value,isValid : state.value.trim().length > 6}
  }
  return {value : '',isValid : false}
}
const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState("");
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState("");
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState,dispatchEmail] = useReducer(emailReducer, {value: '',isValid: null,})
  const [passState,dispatchPass] =useReducer(passReducer,{value : '',isValid:null})
  //using object destructing 
  const {isValid : emailIsValid} = emailState
  const {isValid : passIsValid} = passState
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking form validity');
      setFormIsValid(
        emailIsValid && passIsValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier)
      console.log('clean up');
    };
  }, [emailIsValid, passIsValid]);
  const emailChangeHandler = (event) => {
    dispatchEmail({type : 'USER_INPUT',val : event.target.value});
    setFormIsValid(
      event.target.value.includes('@') && passState.value.trim().length > 6 
    )
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPass({type : 'USER_INPUT',val: event.target.value})
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 
    ) 
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPass({type : 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          type="text"
          id="email"
          label='E-mail'
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          type="password"
          id="password"
          label='password'
          isValid={passIsValid}
          value={passState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
