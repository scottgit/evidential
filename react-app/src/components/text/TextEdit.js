import React, {useState, useEffect } from "react";
import {useParams, useLocation} from 'react-router-dom';
import SplitView from "../structure/SplitView";
import TextHeader from "./TextHeader";
import EditTextForm from "../forms/EditTextForm";
import GeneralSidebar from "../general/GeneralSidebar";
import {fetchText} from "../../services/text";

const TextEdit = (props) => {
  const location = useLocation();
  const getTextObj = location.textObj ? location.textObj : window.history.state;
  const {authenticated, currentUser} = props;
  const {textId} = useParams();
  const [display, setDisplay] = useState({main: "EDIT-TEXT", sidebar: "USER"});
  const [textObj, setTextObj] = useState(
    getTextObj ? getTextObj : null
  );
  const [isLoaded, setIsLoaded] = useState(0);
  const [title, setTitle] = useState(
    getTextObj ? getTextObj.title : ''
    );

  //Preserve location state information on hard refresh
  window.history.replaceState(textObj, 'textObj');

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

  const handleTitleInput = (e) => {
    setTitle(e.target.value)
  }

  const viewProps = {...props, display, setDisplay, textObj, setTextObj, isLoaded, handleRetry}
  const headerProps = {display, textObj, handleRetry, isLoaded, currentUser, title, handleTitleInput};
  const textProps = {currentUser, textObj, handleRetry, handleTitleInput, title};
  const sideBarProps = {display, authenticated, currentUser, textObj};

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
