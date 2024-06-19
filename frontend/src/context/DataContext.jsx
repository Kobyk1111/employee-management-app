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
  employeeLeaveRequests: [],
  allEmployeesLeaveRequests: [],
  allEmployees: [],
  adminAccountSettingsInputs: {},
  employeeAccountSettingsInputs: {},
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

    case "SET_LEAVE_INPUTS": {
      return {
        ...currentState,
        leaveInputs: {},
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

    case "SET_EMPLOYEE_LEAVE_REQUESTS": {
      return {
        ...currentState,
        employeeLeaveRequests: action.payload,
      };
    }

    case "SET_ALL_EMPLOYEES_LEAVE_REQUESTS": {
      return {
        ...currentState,
        allEmployeesLeaveRequests: action.payload,
      };
    }

    case "SET_ALL_EMPLOYEES": {
      return {
        ...currentState,
        allEmployees: action.payload,
      };
    }

    case "SET_ADMIN_ACCOUNT_SETTINGS_INPUTS": {
      return {
        ...currentState,
        adminAccountSettingsInputs: {
          ...currentState.adminAccountSettingsInputs,
          ...action.payload,
        },
      };
    }

    case "SET_EMPLOYEE_ACCOUNT_SETTINGS_INPUTS": {
      return {
        ...currentState,
        employeeAccountSettingsInputs: {
          ...currentState.employeeAccountSettingsInputs,
          ...action.payload,
        },
      };
    }

    case "SET_EMPLOYEE_ACCOUNT_SETTINGS_BANK_INPUTS": {
      return {
        ...currentState,
        employeeAccountSettingsInputs: {
          ...currentState.employeeAccountSettingsInputs,
          bankAccountDetails: {
            ...currentState.employeeAccountSettingsInputs.bankAccountDetails,
            ...action.payload,
          },
        },
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

  async function handleHTTPRequestWithToken(url, settings) {
    const firstAccessResponse = await fetch(url, settings);

    if (firstAccessResponse.ok) {
      return firstAccessResponse;
    } else {
      let error;
      try {
        const responseClone = firstAccessResponse.clone();
        error = await responseClone.json();
      } catch (err) {
        console.error("Failed to parse JSON response", err);
      }

      if (error.status !== 401) {
        return firstAccessResponse;
      }

      console.log("Expired token");

      const refreshResponse = await fetch("http://localhost:4001/refresh-token", { credentials: "include" });

      if (refreshResponse.ok) {
        console.log("New cookies received");

        const secondAccessResponse = await fetch(url, settings);
        return secondAccessResponse;
      } else {
        return refreshResponse;
      }
    }
  }

  return (
    <DataContext.Provider value={{ state, dispatch, handleHTTPRequestWithToken }}>{children}</DataContext.Provider>
  );
}

export default DataContextProvider;
