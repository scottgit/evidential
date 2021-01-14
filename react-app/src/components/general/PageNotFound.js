import React from 'react';
import {useLocation} from 'react-router-dom';

const PageNotFound = (props) => {
  const location = useLocation();
  if (!location.state) location.state = {}

  return (
    <div className="ev-content-wrapper --single-page">
      <main className="ev-main">
      <header>
        <h1>Page Not Found</h1>
      </header>
        <div className="ev-text-content">
        We are sorry, the requested page {
          ("formerPath" in location.state) ? `('${location.state.formerPath}')` : ""
        } was not found.
        </div>
      </main>
    </div>
  )
}

export default PageNotFound
