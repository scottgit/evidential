// import React, { useState, useEffect } from "react";
import React from "react";
import TextsList from "./text/TextsList";
import ClaimsList from "./claim/ClaimsList";
import ViewText from "./text/ViewText";



const Home = ({currentUser, authenticated}) => {

  return (
    <div className="content-wrapper">
      <h1>Home ({currentUser.firstName})</h1>
      {/* <TextsList />
      <ClaimsList /> */}
      <ViewText textId={2} />
    </div>
  )
}

export default Home
