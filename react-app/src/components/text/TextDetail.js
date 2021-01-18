import React, {useState, useMemo, useRef, useEffect } from "react";
import {useParams, useLocation, useHistory} from 'react-router-dom';
import SplitView from "../structure/SplitView";
import TextHeader from "./TextHeader";
import EditTextForm from "../forms/EditTextForm";
import GeneralSidebar from "../general/GeneralSidebar";
import {fetchText} from "../../services/text";
import Text from "./Text";

const TextDetail = (props) => {
  const {authenticated, currentUser, setCurrentUser} = props;
  const location = useLocation();
  let getTextObj = location.itemData ? location.itemData : null;
  const {textId} = useParams();
  const [itemData, setItemData] = useState(getTextObj);
  const [title, setTitle] = useState(itemData ? itemData.title : '');
  const [contentDisplayed, setContentDisplayed] = useState(false);
  const history = useHistory();

  // Setup the display of main and sidebar
  const display = (() => {
    const show = ["view", "edit", "analyze"].filter((str) => location.pathname.includes(str))
    return {main: `${show[0].toUpperCase()}-TEXT`, sidebar: "USER"};
  })()

  // Track text state change and revisce content display retry attempt to load allowed
  const priorState = useMemo(() => {setContentDisplayed(false); return textId}, [textId])
  const retry = useRef(false);


  const handleTextLoad = () => {
    try {
      // Check if the effect should actually run
      if (!getTextObj) {
        // Perform the fetch request
        (async () => {
          const data = await fetchText(textId);
          // DB errors come through as "clean" from fetch and need handled here
          if (data.errors) {
            throw data
          }
          else {
          // Process successful fetch
            setItemData(data);
            setTitle(data.title);
          }
        })();
      }
      else if (getTextObj !== itemData) {
        // Process passed data
        setItemData(getTextObj);
        setTitle(getTextObj.title)
      }
    } catch (err) {
      // Other errors get handled here
      if (!retry.current) { //Allow a retry message to be displayed once
        setContentDisplayed(true);
      } else { // After retry send 404
        retry.current = false;
        history.push('/page-not-found')
      }
    }
  }

  useEffect(() => {
    let stillMounted = true;
    if (stillMounted) {
      handleTextLoad()
    }
    return function cleanUp() {
      stillMounted = false
    }
    // eslint-disable-next-line
  }, [priorState]) //Only do textload if prior textId changed

  const handleRetry = (e) => {
    getTextObj = null;
    retry.current = true;
    setContentDisplayed(false);
    handleTextLoad();
  }

  const handleTitleInput = (e) => {
    setTitle(e.target.value)
  }

  const viewProps = {...props, display, itemData, handleRetry}
  const headerProps = {display, itemData, handleRetry, currentUser, title, handleTitleInput, contentDisplayed};
  const textProps = {currentUser, itemData, setItemData, handleRetry, setTitle, title, setContentDisplayed, setCurrentUser};
  const sideBarProps = {display, authenticated, currentUser, itemData};

  const itemKey = itemData ? `${itemData.title}-${itemData.content}` : `initial`;

  return (
    <SplitView {...viewProps}>
    <TextHeader key={`${display.main}-header-${itemKey}`} {...headerProps} />
    { (itemData && (
          (display.main === "VIEW-TEXT" &&
            <Text key={`${display.main}-viewbody-${itemKey}`} {...textProps} />
          )
          ||
          (display.main === "EDIT-TEXT" &&
            <EditTextForm key={`${display.main}-editbody-${itemKey}`} {...textProps} />
          )
        )
      )
      ||
      <>{/* Failed to load */}</>
    }
    { (itemData &&
        <GeneralSidebar key={`${display}-sidebar-${itemKey}`} {...sideBarProps} />
      )
      ||
      <>{/* Failed to load */}</>
    }
    </SplitView>
  )
}

export default TextDetail
