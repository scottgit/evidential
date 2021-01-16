import React, {useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import SplitView from "../structure/SplitView";
import Loader from "../includes/Loader";
import Text from "./Text";
import GeneralSidebar from "../general/GeneralSidebar";
import {fetchText} from "../../services/text";

const TextDetail = (props) => {
  const {authenticated, currentUser} = props;
  const {textId} = useParams();
  const [display, setDisplay] = useState({main: "VIEW-TEXT", sidebar: "USER"});
  const [textObj, setTextObj] = useState(null);
  const [isLoaded, setIsLoaded] = useState(0)

  useEffect(() => {
    let stillMounted = true;
    fetchText(textId, stillMounted, setTextObj, setIsLoaded);
    return function cleanUp() {
      stillMounted = false;
    }
  }, [isLoaded, textId]);

  const handleRetry = (e) => {
    setIsLoaded(0)
  }

  const addProps = {display, setDisplay, textObj, setTextObj, isLoaded, handleRetry}
  const textProps = {textObj, handleRetry}
  return (
    <SplitView {...props} {...addProps}>
        <header><h1>Text (View):
        {
          (!isLoaded && <> Loading <Loader className="in-text" /></>)
          ||
          (isLoaded === -1 && <><span className="ev-error"> **ERROR!**</span> <button type="button" onClick={handleRetry} className="in-text">Retry?</button></>)
          ||
          ` ${textObj.title}`
        }
      </h1></header>
      { (isLoaded === 1 && ("content" in textObj) && <Text  {...textProps} />)}
      <GeneralSidebar
          display={display}
          authenticated={authenticated}
          currentUser={currentUser}
        />
    </SplitView>
  )
}

export default TextDetail
