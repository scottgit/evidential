import React, {useState, useMemo, useRef, useEffect } from "react";
import {useParams, useLocation, useHistory} from 'react-router-dom';
import SplitView from "../structure/SplitView";
import PageHeader from "../structure/PageHeader";
import EditClaimForm from "../forms/EditClaimForm";
import GeneralSidebar from "../general/GeneralSidebar";
import {fetchClaim} from "../../services/claim";
import Claim from "./Claim";

const ClaimDetail = (props) => {
  const {authenticated, currentUser, setCurrentUser} = props;
  const location = useLocation();
  let getClaimObj = location.itemData ? location.itemData : null;
  const doUpdate = location.update ? location.update : 0;
  const {claimId} = useParams();
  const [itemData, setItemData] = useState(getClaimObj);
  const [contentDisplayed, setContentDisplayed] = useState(false);
  const history = useHistory();
  console.log(doUpdate)
  // Setup the display of main and sidebar
  const display = (() => {
    const show = ["view", "edit"].filter((str) => location.pathname.includes(str))
    return {main: `${show[0].toUpperCase()}-CLAIM`, sidebar: "USER"};
  })()

  // Track text state change and revisce content display retry attempt to load allowed
  const priorState = useMemo(() => {setContentDisplayed(false); return claimId}, [claimId])
  const retry = useRef(false);


  const handleClaimLoad = () => {
    try {
      // Check if the effect should actually run
      if (!getClaimObj) {
        // Perform the fetch request
        (async () => {
          const data = await fetchClaim(claimId);
          // DB errors come through as "clean" from fetch and need handled here
          if (data.errors) {
            throw data
          }
          else {
          // Process successful fetch
            setItemData(data);
          }
        })();
      }
      else if (getClaimObj !== itemData) {
        // Process passed data
        setItemData(getClaimObj);
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
      handleClaimLoad()
    }
    return function cleanUp() {
      stillMounted = false
    }
    // eslint-disable-next-line
  }, [priorState, doUpdate]) //Only do textload if prior claimId changed or update needed

  const handleRetry = (e) => {
    getClaimObj = null;
    retry.current = true;
    setContentDisplayed(false);
    handleClaimLoad();
  }


  const viewProps = {...props, display, itemData, handleRetry}
  const headerProps = {display, itemData, handleRetry, currentUser, contentDisplayed};
  const claimProps = {currentUser, itemData, setItemData, handleRetry, setContentDisplayed, setCurrentUser};
  const sideBarProps = {display, authenticated, currentUser, itemData};

  const itemKey = itemData ? `${itemData.assertion}-${itemData.notes}-${doUpdate}` : `initial`;

  console.log(itemKey)

  return (
    <SplitView {...viewProps}>
    <PageHeader key={`${display.main}-header-${itemKey}`} {...headerProps} />
    { (itemData && (
          (display.main === "VIEW-CLAIM" &&
            <Claim key={`${display.main}-viewbody-${itemKey}`} {...claimProps} />
          )
          ||
          (display.main === "EDIT-CLAIM" &&
            <EditClaimForm key={`${display.main}-editbody-${itemKey}`} {...claimProps} />
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

export default ClaimDetail
