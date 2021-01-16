import React, {useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import SplitView from "../structure/SplitView";
import Text from "./Text";
import GeneralSidebar from "../general/GeneralSidebar";
import {fetchText} from "../../services/text";
import TextHeader from "./TextHeader";

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
  const headerProps = {display, textObj, handleRetry, isLoaded, currentUser};
  const textProps = {currentUser, textObj, handleRetry};
  const sideBarProps = {display, authenticated, currentUser, textObj};

  return (
    <SplitView {...props} {...addProps}>
      <TextHeader {...headerProps} />
      { (isLoaded === 1 && ("content" in textObj) && <Text  {...textProps} />)}
      <GeneralSidebar {...sideBarProps} />
    </SplitView>
  )
}

export default TextDetail
