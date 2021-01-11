import React from 'react'

const Sidebar = ({currentUser, display, setDisplay, children}) => {

  return (
    <section className="ev-sidebar">
      {children}
    </section>
  )
}

export default Sidebar
