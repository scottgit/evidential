import React from 'react'

const MainView = ({currentUser, display, setDisplay, children}) => {
  //props has: authenticated, currentUser, display, setDisplay, textId, setTextId

  return (
    <>
      <main className="ev-main">
        {children}
      </main>
    </>
  )
}

export default MainView
