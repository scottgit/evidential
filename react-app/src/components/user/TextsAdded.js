import React from 'react';
import {NavLink} from 'react-router-dom';
import TextEditLink from '../includes/TextEditLink';
import TextAnalyzeLink from '../includes/TextAnalyzeLink';

const TextsAdded = ({user, currentUser}) => {


  const getTextsAdded = () => (
    <div>
      <h4>Texts Added</h4>
      <ul>
        {user.textsAdded.map(text => {
          return (
            <li key={'text-'+ text.id}>
              Added "<NavLink to={{
                pathname: `/text/view/${text.id}`,
                itemData: text
              }}>{text.title}</NavLink>" on {text.createdAt}
              <TextEditLink text={text} currentUser={currentUser}/>
              <TextAnalyzeLink text={text} currentUser={currentUser}/>
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
