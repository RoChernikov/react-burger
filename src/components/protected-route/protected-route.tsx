import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
//--------------------------------------------------------------------------------

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useAppSelector(state => state.user);
  //-------------------------------------------------------------------------------

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
