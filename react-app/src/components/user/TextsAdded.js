import React from 'react';
import {NavLink} from 'react-router-dom';
import TextEditLink from '../includes/TextEditLink';

const TextsAdded = ({user, allowEdit}) => {


  const getTextsAdded = () => (
    <div>
      <h4>Texts Added</h4>
      <ul>
        {user.textsAdded.map(text => {
          return (
            <li key={'text-'+ text.id}>
              Added "<NavLink to={`/text/view/${text.id}`}>{text.title}</NavLink>" on {text.createdAt} <TextEditLink text={text} allowEdit={allowEdit}/>
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
