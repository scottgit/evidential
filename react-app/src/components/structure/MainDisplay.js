import React from 'react'

const MainView = ({currentUser, display, setDisplay, children}) => {
  //props has: authenticated, currentUser, display, setDisplay, textId, setTextId

  return (
    <>
      <main className={`ev-main ${display.main === 'EDIT-TEXT' ? '--editor-grid' : ''}`}>
        <header>{children[0]}</header>
        {children[1]}
      </main>
    </>
  )
}

export default MainView
