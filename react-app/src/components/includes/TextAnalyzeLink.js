import React from 'react';
import {NavLink} from 'react-router-dom';
import FAI from '../includes/FAI';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';

const TextAnalyzeLink = ({text, currentUser, noParenthesis=false, inNav=false, hide=false}) => {
  const canAnalyzeText = () => {
    if (currentUser && text) {
      // Only texts that have been analyzed once by the creator (and so locked) are open to other users running analysis
      return (text.locked || (!text.locked && text.createdBy.id === currentUser.id))
    } else {
      return false;
    }
  }

  hide = hide ? '--hide' : '';
  const startParenthesis = noParenthesis ? "" : "(";
  const endParenthesis = noParenthesis ? "" : ")";
  const className = `in-text --hover-tilt ${(inNav && '--stretch --hover-tilt')}`

  return (
    <>
    {canAnalyzeText() && (<> {startParenthesis}
      <NavLink to={{
        pathname: `/text/analyze/${text.id}`,
        itemData: text
      }} className={hide}>
        <FAI icon={faSearchengin} className={className} />
      </NavLink>{endParenthesis}</>)}
    </>
  )
}

export default TextAnalyzeLink
