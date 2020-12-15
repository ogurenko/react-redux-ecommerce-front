/* we want to know if user click pay cash on delivery, boolean true or false and update the redux state as well */

export const CODReducer = (state = false, action) => {
  
  switch (action.type) {
    case "COD":
      return action.payload;

    default:
      return state;
  }
};