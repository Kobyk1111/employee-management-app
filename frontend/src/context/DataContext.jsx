/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const DataContext = createContext();

const initialState = {
  loggedInAdmin: "",
  isToRegister: false,
  logOrRegisterAdminInputs: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  },
  error: "",
};

function reducer(currentState, action) {
  switch (action.type) {
    case "ADMIN_INPUTS_CHANGE": {
      return {
        ...currentState,
        logOrRegisterAdminInputs: { ...currentState.logOrRegisterAdminInputs, ...action.payload },
      };
    }

    case "SET_ADMIN_LOGIN": {
      return {
        ...currentState,
        loggedInAdmin: action.payload,
      };
    }

    case "SET_IS_TO_REGISTER": {
      return {
        ...currentState,
        isToRegister: action.payload,
      };
    }

    case "SET_ERROR": {
      return {
        ...currentState,
        error: action.payload,
      };
    }
  }
}

function DataContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
}

export default DataContextProvider;
