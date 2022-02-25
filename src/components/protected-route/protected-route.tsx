import React, { FC, useEffect, useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
// import { getUser } from '../../services/slices/user';
//--------------------------------------------------------------------------------

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();

  // const { user } = useAppSelector(state => state.user);

  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    // dispatch(getUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);
  console.log(isUserLoaded);
  if (!isUserLoaded) {
    return null;
  }

  return (
    <div></div>
    // <Route
    //   {...rest}
    //   render={({ location }) =>
    //     user.name ? (
    //       children
    //     ) : (
    //       <Redirect
    //         to={{
    //           pathname: '/login',
    //           state: { from: location }
    //         }}
    //       />
    //     )
    //   }
    // />
  );
};

export default ProtectedRoute;
