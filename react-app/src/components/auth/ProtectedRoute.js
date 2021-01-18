import React from 'react';
import { Route, Redirect, matchPath, withRouter } from 'react-router-dom';

const ProtectedRoute = props => {
  const isTextEditRoute = matchPath(props.location.pathname, {
    path: "/text/edit/:textId",
    exact: true
  });

  const textUnlock = isTextEditRoute && props.currentUser.textsAdded.find(text => !text.locked && text.createdBy.id === props.currentUser.id);

  return (
    <Route {...props}>
      {(props.authenticated)
        ? ( !isTextEditRoute || (isTextEditRoute && textUnlock)
            ? props.children
            : <Redirect to={`/text/view/${isTextEditRoute.params.textId}`} />
          )
        : <Redirect to="/login" />
      }
    </Route>
  )
};


export default withRouter(ProtectedRoute);
