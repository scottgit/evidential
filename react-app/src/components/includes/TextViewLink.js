import React from 'react';
import {NavLink} from 'react-router-dom';
import FAI from './FAI';
import { faEye, faFile } from '@fortawesome/free-solid-svg-icons';

const TextViewLink = ({text, hide=false}) => {
  hide = hide ? '--hide' : '';

  return (
    <>
      <NavLink to={`/text/view/${text.id}`}>
        <span className={`fa-layers fa-fw --hover-sub-tilt ${hide}`} tabIndex="0" title={`View Text`} >
          <FAI icon={faFile} className="ev-icon --dark" />
          <FAI icon={faEye} className="ev-icon --sub --lc" />
        </span>
      </NavLink>
    </>
  )
}

export default TextViewLink
