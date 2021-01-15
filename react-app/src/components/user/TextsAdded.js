import React from 'react';
import {NavLink} from 'react-router-dom';
import FAI from '../includes/FAI';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const TextsAdded = ({user, allowEdit}) => {


  const getTextsAdded = () => (
    <div>
      <h4>Texts Added</h4>
      <ul>
        {user.textsAdded.map(text => {
          const canEdit = !text.locked && allowEdit;

          return (
            <li key={'text-'+ text.id}>
              {canEdit &&
              <NavLink to={{
                pathname: `/text/edit/${text.id}`,
                textUnlock: true
              }}>
                <FAI  icon={faEdit}
                      className="ev-icon in-text --hover-flip"
                      title={"Edit text"}
                />
              </NavLink>
              }
              Added "{text.title}" on {text.createdAt}
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    getTextsAdded()
  )
}

export default TextsAdded
