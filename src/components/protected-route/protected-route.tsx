import React, { FC, useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { getUser } from '../../services/slices/user';
//--------------------------------------------------------------------------------

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(state => state.user);
  //-------------------------------------------------------------------------------

  useEffect(() => {
    isAuth && dispatch(getUser());
  }, [dispatch, isAuth]);

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
