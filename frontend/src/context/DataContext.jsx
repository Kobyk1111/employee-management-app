/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const DataContext = createContext();

const initialState = {
  loggedInAdmin: "",
  loggedInEmployee: "",
  isToRegister: false,
  logOrRegisterAdminInputs: {},
  logEmployeeInputs: {},
  error: "",
  createEmployeeInputs: {},
  updateEmployeeId: "",
  leaveInputs: {},
};

function reducer(currentState, action) {
  switch (action.type) {
    case "ADMIN_INPUTS_CHANGE": {
      return {
        ...currentState,
        logOrRegisterAdminInputs: { ...currentState.logOrRegisterAdminInputs, ...action.payload },
      };
    }

    case "EMPLOYEE_INPUTS_CHANGE": {
      return {
        ...currentState,
        logEmployeeInputs: {
          ...currentState.logEmployeeInputs,
          ...action.payload,
        },
      };
    }

    case "LEAVE_INPUTS_CHANGE": {
      return {
        ...currentState,
        leaveInputs: {
          ...currentState.leaveInputs,
          ...action.payload,
        },
      };
    }

    case "SET_ADMIN_LOGIN": {
      return {
        ...currentState,
        loggedInAdmin: action.payload,
        logOrRegisterAdminInputs: {},
        createEmployeeInputs: {},
      };
    }

    case "SET_EMPLOYEE_LOGIN": {
      return {
        ...currentState,
        loggedInEmployee: action.payload,
        logEmployeeInputs: {},
      };
    }

    case "SET_CREATE_EMPLOYEE_INPUTS": {
      return {
        ...currentState,
        createEmployeeInputs: { ...currentState.createEmployeeInputs, ...action.payload },
      };
    }

    case "SET_BANK_INPUTS": {
      return {
        ...currentState,
        createEmployeeInputs: {
          ...currentState.createEmployeeInputs,
          bankAccountDetails: {
            ...currentState.createEmployeeInputs.bankAccountDetails,
            ...action.payload,
          },
        },
      };
    }

    case "SET_IS_TO_REGISTER": {
      return {
        ...currentState,
        isToRegister: action.payload,
      };
    }

    case "SET_EMPLOYEE_ID": {
      return {
        ...currentState,
        updateEmployeeId: action.payload,
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
