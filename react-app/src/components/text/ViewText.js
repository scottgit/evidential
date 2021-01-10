import React, { useState, useEffect } from "react";
import Loader from "../includes/Loader";
import Text from "./Text";

const ViewText = ({authenticated, currentUser}) => {
  const {text, setText} = useState(false);


  return (
    <div className="content-wrapper">
      <h1>Text: {(text && text.title) || <>"Loading " <Loader /></>}

      </h1>
      <Text text={text}/>
    </div>
  )
}

export default ViewText
