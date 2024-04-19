import { useContext, useState, useCallback } from "react";
import AuthContext from "../context/auth-context";
import "./documentStyles.css";

function Documents() {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const getDataHandler = useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetch("http://localhost:49302/api/test", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setIsLoading(false);
          console.log(data);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <h1>Documents screen</h1>
      <button onClick={getDataHandler}>Get data</button>
      <div onClick={authCtx.onLogout} className="logout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="logout-user"
          viewBox="0 0 512 512"
        >
          {/* <title>Log Out</title> */}
          <path
            d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
        </svg>
        <span className="logout-tooltip">Logout</span>
      </div>
    </>
  );
}

export default Documents;
