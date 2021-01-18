import React, {useState, useMemo, useRef } from "react";
import {useParams, useLocation} from 'react-router-dom';
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

  const display = (() => {
    const show = ["view", "edit", "analyze"].filter((str) => location.pathname.includes(str))
    return {main: `${show[0].toUpperCase()}-TEXT`, sidebar: "USER"};
  })()

  const priorState = useMemo(() => setContentDisplayed(false), [textId]);

  useEffectAsyncSafeFetch(
    {
      //ininitCb: () => null Using default "do nothing"
      actionCondition: !getTextObj,
      fetchFn: fetchText,
      pathEndpoint: textId,
      //fetchData,  No data for GET
      successCb: (data) => {
        setItemData(data);
        setTitle(data.title);
      },
      backupCondition: getTextObj !== itemData,
      backupCb: () => {
        setItemData(getTextObj);
        setTitle(getTextObj.title)
      },
      //defaultCb: () => null,  Using default "do nothing"
      //errorCb: (err) => err,  Using default "return errors object"

      // The useMemo's dependecy array functions as the updating array for the
      // nested useEffect, triggering a change in value for
      // the useEffect on the Memo's dependency array change by updating the string value
      // for the useEffect dep
    }, useMemo(() => `${textId}`, [textId]))


  const handleRetry = (e) => {
    getTextObj = null;
  }

  const handleTitleInput = (e) => {
    setTitle(e.target.value)
  }

  const viewProps = {...props, display, itemData, handleRetry}
  const headerProps = {display, itemData, handleRetry, currentUser, title, handleTitleInput, contentDisplayed};
  const textProps = {currentUser, itemData, setItemData, handleRetry, setTitle, title, setContentDisplayed};
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
