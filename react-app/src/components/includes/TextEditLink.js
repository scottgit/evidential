import React from 'react';
import {NavLink} from 'react-router-dom';
import FAI from '../includes/FAI';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const TextEditLink = ({text, currentUser, noParenthesis=false, inNav=false, hide=false}) => {
  const canEditText = () => {
    if (currentUser && text) {
      return (!text.locked && text.createdBy.id === currentUser.id)
    } else {
      return false;
    }
  }

  hide = hide ? '--hide' : '';
  const startParenthesis = noParenthesis ? "" : "(";
  const endParenthesis = noParenthesis ? "" : ")";
  const className = `ev-icon in-text ${(inNav && '--stretch --hover-tilt') || '--hover-flip'}`

  return (
    <>
    {canEditText() && (<> {startParenthesis}
      <NavLink to={{
        pathname: `/text/edit/${text.id}`,
        itemData: text
      }} className={hide}>
        <FAI  icon={faEdit}
              className={className}
              title={"Edit text"}
        />
      </NavLink>{endParenthesis}</>)}
    </>
  )
}

export default TextEditLink
