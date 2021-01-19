import React from 'react'

const MainView = ({currentUser, display, setDisplay, children}) => {
  //props has: authenticated, currentUser, display, setDisplay, textId, setTextId
  const gridDisplay = ['EDIT-TEXT', 'VIEW-CLAIM'].includes(display.main);

  return (
    <>
      <main className={`ev-main ${gridDisplay ? '--grid' : ''}`}>
        {children[0]}
        {children[1]}
      </main>
    </>
  )
}

export default MainView
