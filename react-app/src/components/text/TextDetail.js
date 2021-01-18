import React, {useState, useMemo, useRef } from "react";
import {useParams, useLocation, useHistory} from 'react-router-dom';
import SplitView from "../structure/SplitView";
import TextHeader from "./TextHeader";
import EditTextForm from "../forms/EditTextForm";
import GeneralSidebar from "../general/GeneralSidebar";
import {fetchText} from "../../services/text";
import useEffectAsyncSafeFetch from "../../services/useEffectAsyncSafeFetch";
import Text from "./Text";

const TextDetail = (props) => {
  const {authenticated, currentUser} = props;
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


  useEffectAsyncSafeFetch(
    {
      //ininitCb: () => null Using default "do nothing"
      // If not text data came, go fetch it
      actionCondition: !getTextObj,
      fetchFn: fetchText,
      pathEndpoint: textId,
      //fetchData,  No data sent for GET
      successCb: (data) => {
        setItemData(data);
        setTitle(data.title);
      },
      // We have data sent, but it does not match current view item, so update
      backupCondition: getTextObj !== itemData,
      backupCb: () => {
        setItemData(getTextObj);
        setTitle(getTextObj.title)
      },
      //defaultCb: () => null,  Using default "do nothing"
      errorCb: (err) => {
        if (!retry.current) { //Allow a retry message to be displayed once
          setContentDisplayed(true);
        } else { // After retry send 404
          retry.current = false;
          history.push('/page-not-found')
        }
      }

      // The useMemo's dependecy array functions as the updating array for the
      // nested useEffect, triggering a change in value for
      // the useEffect on the Memo's dependency array change by updating the string value
      // for the useEffect dep
    }, useMemo(() => `${priorState}${retry.current}`, [priorState, retry.current]))


  const handleRetry = (e) => {
    getTextObj = null;
    retry.current = true;
    setContentDisplayed(false);
  }

  const handleTitleInput = (e) => {
    setTitle(e.target.value)
  }

  const viewProps = {...props, display, itemData, handleRetry}
  const headerProps = {display, itemData, handleRetry, currentUser, title, handleTitleInput, contentDisplayed};
  const textProps = {currentUser, itemData, setItemData, handleRetry, setTitle, title, setContentDisplayed,                    contentDisplayed};
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
