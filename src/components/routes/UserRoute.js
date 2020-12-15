import React from "react";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";

import { useSelector } from "react-redux";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default UserRoute;
