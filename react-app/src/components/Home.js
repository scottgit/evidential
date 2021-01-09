import React, { useState, useEffect } from "react";

const Home = ({currentUser}) => {

  return (
    <div className="content-container">
      <h1>Home ({currentUser.firstName})</h1>
      change and more change
    </div>
  )
}

export default Home
