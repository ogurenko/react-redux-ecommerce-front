

export const userReducer = (state = null, action) => {
 
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "LOGOUT":
      return action.payload; // user=null no value in the state
    default:
      return state;
  }
}

