import React, {useState, useMemo, useRef, useEffect } from "react";
import {useParams, useLocation, useHistory} from 'react-router-dom';
import SplitView from "../structure/SplitView";
import PageHeader from "../structure/PageHeader";
import EditTextForm from "../forms/EditTextForm";
import GeneralSidebar from "../general/GeneralSidebar";
import {fetchText} from "../../services/text";
import {fetchClaims} from "../../services/claim";
import Text from "./Text";
import pluralizeCheck from '../../services/pluarlizeCheck';
import Mark from 'mark.js'


const TextDetail = (props) => {
  const {authenticated, currentUser, setCurrentUser} = props;
  const location = useLocation();
  let getTextObj = location.itemData ? location.itemData : null;
  const {textId} = useParams();
  const [itemData, setItemData] = useState(getTextObj);
  const [title, setTitle] = useState(itemData ? itemData.title : '');
  const [contentDisplayed, setContentDisplayed] = useState(itemData ? true : false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const history = useHistory();
  const [claims, setClaims] = useState([]);
  const [analysisState, setAnalysisState] = useState({
    claim: false,
    hitCount: 0,
  })


  // Setup the display of main and sidebar
  const display = (() => {
    const show = ["view", "edit", "analyze"].filter((str) => location.pathname.includes(str))
    const mainPre = show[0].toUpperCase();
    return {main: `${mainPre}-TEXT`, sidebar: mainPre === "ANALYZE" ? "ANALYZE": "USER"};
  })()

  const ANALYSIS = display.main === 'ANALYZE-TEXT';

  // Track text state change and revise content display retry to allow reload
  const priorState = useMemo(() => {setContentDisplayed(false); return textId}, [textId])
  const retry = useRef(false);

  // Check for text data and fetch if none
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
            setContentDisplayed(true);
          }
        })();
      }
      else if (getTextObj !== itemData) {
        // Process passed data
        setItemData(getTextObj);
        setTitle(getTextObj.title)
        setContentDisplayed(true);
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



  // Function to set mark's as valid or ignored hits
  const handleMarkClick = (e) => {
    const range = document.createRange();
    range.setStartBefore(e.target);
    range.setStartAfter(e.target);

    alert('mark-'+ e.target.id + '@range: ' + range.startOffset);
    console.log('mark-'+ e.target.id, range);
  }

  // Get claims for processing analysis
  useEffect(() => {
    if (!ANALYSIS) return;

    (async () => {
      const claims = await fetchClaims();
      if (!claims.errors) {
        setClaims(claims.claims)
      }
      else {
        //TODO Error handler for no claims to analyze
      }
    })();

  }, [ANALYSIS, setClaims]);

  // Do analysis
  useEffect(() => {
    if (ANALYSIS && analysisState.claim && contentDisplayed) {

      const claim = analysisState.claim;
      const textElem = document.getElementById('ev-display-text');

      // Check if analysis for this claim was already run and exit if so
      let claimMeta = textElem.querySelector(`script[data-claim-${claim.id}]`);
      if (claimMeta) {
        const hitCount = document.querySelectorAll(`[data-claim-id=${claim.id}]`).length;
        setAnalysisState({...analysisState, hitCount});
        return;
      }
      // Otherwise, check if any script has been added for claim tracking
      else {
        claimMeta = textElem.querySelector(`script[data-claims-analyzed]`);
        if (!claimMeta) {
          const newMeta = document.createElement('script');
          newMeta.setAttribute('type', 'text/plain');
          newMeta.setAttribute('data-claims-analyzed', '');
          textElem.appendChild(newMeta);
          claimMeta = newMeta;
        }
        claimMeta.setAttribute(`data-claim-${claim.id}`);
      }

      const hitKeys = claim.hitKeys.map(keyObj => keyObj.key);
      let counter = 0;

      const highlights = new Mark(textElem);
      highlights.unmark();
      highlights.mark(pluralizeCheck(hitKeys), {
        className: 'hit-highlight',
        exclude: [],
        separateWordSearch: false,
        accuracy: {
          value: "exactly",
          limiters: ":;.,-–—‒_(){}[]!'\"+=".split("")
        },
        synonyms: {},
        acrossElements: true,
        caseSensitive: false,
        ignoreJoiners: false,
        ignorePunctuation: ":;.,-–—‒_(){}[]!'\"+=".split(""),
        each: mark => {
          mark.setAttribute('data-claim-id', claim.id)
          mark.setAttribute('id', `hit-mark-${claim.id}-${++counter}`);
          mark.onclick = handleMarkClick;
        },
        done: hitCount => {
          setAnalysisState({...analysisState, hitCount});
          setAnalysisDone(true)
        }
      });

      //TODO Save analysis results as hits
    }
    // eslint-disable-next-line
  }, [ANALYSIS, analysisState.claim, contentDisplayed])


  const viewProps = {...props, display, itemData, handleRetry}
  const headerProps = {display, itemData, handleRetry, currentUser, title, handleTitleInput, contentDisplayed, analysisDone};
  const textProps = {currentUser, itemData, setItemData, handleRetry, setTitle, title, setContentDisplayed, setCurrentUser, analysisState, setAnalysisState};
  const sideBarProps = {display, authenticated, currentUser, itemData, analysisDone, setAnalysisDone, analysisState, setAnalysisState, claims};

  const itemKey = itemData ? `${itemData.title}-${itemData.content}` : `initial`;

  return (
    <SplitView {...viewProps}>
    <PageHeader key={`${display.main}-header-${itemKey}}`} {...headerProps} />
    { (itemData && (
          ((display.main === "VIEW-TEXT" || ANALYSIS) &&
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
