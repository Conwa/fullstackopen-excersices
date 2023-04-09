import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  let content = "";
  console.log(action);
  switch (action.type) {
    case "VOTE":
      content = action.payload;
      state = `You voted for "${content}" blog!`;
      return state;
    case "CREATE":
      content = action.payload;
      state = `Blog "${content}" succesfully added!`;
      return state;
    default:
      state = "";
      return state;
  }
};

const NotifcationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotifcationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotifcationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const counterAndDispatch = useContext(NotifcationContext);
  return counterAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const counterAndDispatch = useContext(NotifcationContext);
  return counterAndDispatch[1];
};

export default NotifcationContext;
