import React, { useState, useEffect } from "react";
import TextsList from "./text/TextsList";

const Home = ({currentUser, authenticated}) => {

  return (
    <div className="content-wrapper">
      <h1>Home ({currentUser.firstName})</h1>
      <TextsList />
    </div>
  )
}

export default Home
