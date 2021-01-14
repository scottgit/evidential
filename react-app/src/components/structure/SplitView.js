import React from "react";
import MainDisplay from "./MainDisplay";
import Sidebar from "./Sidebar";


const SplitView = (props) => {
  /*****
   Expects three children:
   1. A <header> for the page to be placed within the <main> by <MainDisplay>
   2. A <div> or other wrapper to be CONTENT placed within a <main> by <MainDisplay>
   3. A <div> or other wrapper to be the CONTENT placed with a <section> by <Sidebar>
  ******/

  return (
    <div className="ev-content-wrapper">
      <MainDisplay {...props}>
        {props.children[0]}
        {props.children[1]}
      </MainDisplay>
      <Sidebar {...props} >
        {props.children[2]}
      </Sidebar>
    </div>
  )
}

export default SplitView
