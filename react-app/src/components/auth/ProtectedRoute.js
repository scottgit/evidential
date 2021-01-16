import React from 'react';
import { Route, Redirect, matchPath, withRouter } from 'react-router-dom';

const ProtectedRoute = props => {
  const isTextEditRoute = matchPath(props.location.pathname, {
    path: "/text/edit/:textId",
    exact: true
  });

  return (
    <Route {...props}>
      {(props.authenticated)
        ? ( !isTextEditRoute || (isTextEditRoute && props.location.textUnlock)
            ? props.children
            : <Redirect to={`/text/view/${isTextEditRoute.params.textId}`} />
          )
        : <Redirect to="/login" />
      }
    </Route>
  )
};


export default withRouter(ProtectedRoute);
