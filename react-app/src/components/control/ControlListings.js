import React from 'react';
import ControlList from "./ControlList";

const ControlListings = ({setDisplay}) => {
  return (
    <>
      <ControlList setDisplay={setDisplay} listType={"text"} />
      <ControlList setDisplay={setDisplay} listType={"claim"} />
    </>
  )
}

export default ControlListings
