import React from 'react';
import ReactDOM from 'react-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faBalanceScaleRight, faChartBar, faCircleNotch, faCloudUploadAlt, faEye, faFileUpload, faHome, faLayerGroup, faPlus, faSave, faSearch, faSignInAlt, faSignOutAlt, faUserEdit, faUserPlus, faUserSlash, faVoteYea, faWindowClose, faUsers, faEdit, faFile, faUserCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import 'normalize.css'
import './index.css';
import App from './App';

library.add(faCloudUploadAlt, faEye, faFileUpload, faVoteYea, faWindowClose, faHome, faChartBar, faBalanceScaleRight, faCircleNotch, faSignOutAlt, faSignInAlt, faSearch, faUserEdit, faUserSlash, faUserPlus, faLayerGroup, faPlus, faSave, faUsers, faEdit, faFile, faUserCircle, faInfoCircle )

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
