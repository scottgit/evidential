import React from 'react';
import {NavLink} from 'react-router-dom';
import FAI from '../includes/FAI';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const TextEditLink = ({text, allowEdit}) => {
  const canEdit = !text.locked && allowEdit;

  return (
    <>
    {canEdit && (<> &#40;
      <NavLink to={{
        pathname: `/text/edit/${text.id}`,
        textUnlock: true
      }}>
        <FAI  icon={faEdit}
              className="ev-icon in-text --hover-flip"
              title={"Edit text"}
        />
      </NavLink>
      &#41; </>)}
    </>
  )
}

export default TextEditLink
