import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import AuthContext from "../context/auth-context";

import Input from "../UI/input";
import "./loginStyles.css";
import CascadeIcon from "./cascade-icon.png";

//state here is the last/latest state
const userNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 3 };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 3 };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [userNameState, dispatchUserName] = useReducer(userNameReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const userNameInputRef = useRef();
  const passwordInputRef = useRef();

  const { isValid: userNameIsValid } = userNameState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(userNameIsValid && passwordIsValid);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [userNameIsValid, passwordIsValid]);

  const userNameChangeHandler = (event) => {
    dispatchUserName({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateUserNameHandler = () => {
    dispatchUserName({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(userNameState.value, passwordState.value);
    } else if (!userNameIsValid) {
      userNameInputRef.current.focusTextBox();
    } else {
      passwordInputRef.current.focusTextBox();
    }
  };

  return (
    <div className="login-card">
      <div className="login-header">
        Cascade Suite
        <img src={CascadeIcon} className="header-icon" />
      </div>

      <form onSubmit={submitHandler}>
        <Input
          ref={userNameInputRef}
          id="userName"
          label="User name"
          isValid={userNameIsValid}
          value={userNameState.value}
          onChange={userNameChangeHandler}
          onBlur={validateUserNameHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className="actions">
          <button type="submit" className="login-btn">
            Login
          </button>
          <a href="#" className="forgot-pwd">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
