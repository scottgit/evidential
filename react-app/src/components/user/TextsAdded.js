import React from 'react'

const TextsAdded = ({user}) => {
  const getTextsAdded = () => (
    <div>
      <h4>Texts Added</h4>
      <ul>
        {user.textsAdded.map(text => (
          <li key={'text-'+ text.id}>
            Added "{text.title}" on {text.createdAt}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    getTextsAdded()
  )
}

export default TextsAdded
