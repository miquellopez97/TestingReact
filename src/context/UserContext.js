import { createContext, useState, useEffect } from "react";

const UserContext = createContext({
  userId: 0,
  token: "",
  getToken: () => {},
  setToken: () => {},
});

export default UserContext;

export function UserContextProvider(props) {
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");

  const getToken = () => {
    const token = JSON.parse(sessionStorage.getItem("react-token"));
    console.log("t", token);
    if (token) {
      //TODO: decrypt token
      setToken(token.token);
      setUserId(token.userId);
    }
  };

  useEffect(() => {
    getToken();
  }, [userId, token]);

  const context = {
    userId,
    token,
    getToken,
    setToken
  };

  return (
    <createContext.Provider value={context}>
      {props.children}
    </createContext.Provider>
  );
}
