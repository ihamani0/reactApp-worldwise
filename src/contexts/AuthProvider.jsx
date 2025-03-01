/* eslint-disable react/prop-types */
import { useContext, useReducer } from "react";
import { createContext } from "react";


const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthneticated: false,
};

function reducre(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthneticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthneticated: false,
      };

    default:
      throw new Error("Ther is not Selected choice her");
  }
}
const AuthContext = createContext();

const AuthProvider = ({ children }) => {


  const [{ user, isAuthneticated }, dispatch] = useReducer(
    reducre,
    initialState
  );

  const login = (email, password) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthneticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Use the context inside the Provider");
  return context;
}

export default AuthProvider;
