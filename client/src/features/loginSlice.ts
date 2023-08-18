export const login = () => {
    return {
      type: "LOG_IN"
    };
  };
  
  export const logout = () => {
    return {
      type: "LOG_OUT"
    };
  };
  

interface UserState {
    isLoggedIn: boolean;
  }
  
  interface Action {
    type: string;
  }
  
  const initialState: UserState = {
    isLoggedIn: false
  };
  
  const loginReducer = (state: UserState = initialState, action: Action): UserState => {
    switch (action.type) {
      case "LOG_IN":
        return {
          isLoggedIn: true
        };
      case "LOG_OUT":
        return {
          isLoggedIn: false
        };
      default:
        return state;
    }
  };
  
  export default loginReducer;
  