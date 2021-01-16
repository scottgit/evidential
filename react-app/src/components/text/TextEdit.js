import React, {useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import SplitView from "../structure/SplitView";
import TextHeader from "./TextHeader";
import EditTextForm from "../forms/EditTextForm";
import GeneralSidebar from "../general/GeneralSidebar";
import {fetchText} from "../../services/text";

const TextEdit = (props) => {
  const {authenticated, currentUser} = props;
  const {textId} = useParams();
  const [display, setDisplay] = useState({main: "EDIT-TEXT", sidebar: "USER"});
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

  const viewProps = {...props, display, setDisplay, textObj, setTextObj, isLoaded, handleRetry}
  const headerProps = {display, textObj, handleRetry, isLoaded};
  const textProps = {textObj, handleRetry};
  const sideBarProps = {display, authenticated, currentUser};

  return (
    <SplitView {...viewProps}>
      <TextHeader {...headerProps} />
      { (isLoaded === 1 && ("content" in textObj) &&
        <EditTextForm  {...textProps} />)
        ||
        <>{/* Failed to load */}</>
      }
      <GeneralSidebar {...sideBarProps} />
    </SplitView>
  )
}

export default TextEdit
