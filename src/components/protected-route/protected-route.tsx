import React, { FC, useEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { getUser } from '../../services/slices/user';
//--------------------------------------------------------------------------------

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();
  const [isUserLoaded, setUserLoaded] = useState(false);
  const { isAuth } = useAppSelector(state => state.user);
  //-------------------------------------------------------------------------------

  const init = async () => {
    dispatch(getUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

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
