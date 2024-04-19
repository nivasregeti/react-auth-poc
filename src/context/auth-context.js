import React, { useState, useEffect, useCallback } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (userName, password) => {},
  token: null,
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    // if (storedUserLoggedInInformation === "1") {
    //   setIsLoggedIn(true);
    // }
  }, []);

  const fetchTokenHandler = useCallback((formBody) => {
    setIsLoading(true);
    setError(null);
    fetch("http://localhost:49302/oauth/token", {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "'application/x-www-form-urlencoded;charset=UTF-8'",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((token) => {
        if (token) {
          setToken(token?.access_token);
          setIsLoggedIn(true);
          setIsLoading(false);
          console.log(token?.access_token);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };
  const loginHandler = (userName, password) => {
    let credentials = {
      grant_type: "password",
      userName,
      password,
    };
    const userCredentials = Object.keys(credentials)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(credentials[key])
      )
      .join("&");

    fetchTokenHandler(userCredentials);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        token: token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
