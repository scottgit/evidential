import React, {useState, useEffect } from "react";
import {useParams, useLocation} from 'react-router-dom';
import SplitView from "../structure/SplitView";
import TextHeader from "./TextHeader";
import EditTextForm from "../forms/EditTextForm";
import GeneralSidebar from "../general/GeneralSidebar";
import {fetchText} from "../../services/text";
import Text from "./Text";

const TextDetail = (props) => {
  const {authenticated, currentUser} = props;
  const location = useLocation();
  let getTextObj = location.itemData ? location.itemData : null
  const {textId} = useParams();
  // const [display, setDisplay] = useState({main: "EDIT-TEXT", sidebar: "USER"});
  const [itemData, setTextObj] = useState(getTextObj);
  const [title, setTitle] = useState(itemData ? itemData.title : '');
  const display = {main: "VIEW-TEXT", sidebar: "USER"};

  useEffect(() => {
    let stillMounted = true;
    if (!getTextObj) {
      (async () => {
        const text = await fetchText(textId, stillMounted);
        setTextObj(text);
        setTitle(text.title);
      })();
    }
    else if (getTextObj !== itemData) {
      setTextObj(getTextObj);
      setTitle(getTextObj.title)
    }
    return function cleanUp() {
      stillMounted = false;
    }
  }, [textId]);

  const handleRetry = (e) => {
    getTextObj = null;
  }

  const handleTitleInput = (e) => {
    setTitle(e.target.value)
  }

  const viewProps = {...props, display, itemData, handleRetry}
  const headerProps = {display, itemData, handleRetry, currentUser, title, handleTitleInput};
  const textProps = {currentUser, itemData, handleRetry, handleTitleInput, title};
  const sideBarProps = {display, authenticated, currentUser, itemData};

  return (
    <SplitView {...viewProps}>
    <TextHeader key={`text-viewheader-${!!itemData ? itemData.id : 0}`} {...headerProps} />
    { (itemData &&
        <Text key={`text-viewbody-${itemData.id}`} {...textProps} />
      )
      ||
      <>{/* Failed to load */}</>
    }
    { (itemData &&
        <GeneralSidebar {...sideBarProps} />
      )
      ||
      <>{/* Failed to load */}</>
    }
    </SplitView>
  )
}

export default TextDetail
