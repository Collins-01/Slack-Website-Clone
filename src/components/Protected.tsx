import React from 'react'
import { Navigate } from 'react-router-dom';


export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

function Protected({isAuthenticated, authenticationPath, outlet}: ProtectedRouteProps) {

  if(isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
}

export default Protected