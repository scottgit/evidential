import React, {useState} from 'react';
import TextsAdded from '../user/TextsAdded';
import ClaimsAdded from '../user/ClaimsAdded';
import DataChanges from '../user/DataChanges';
import AddTextButton from '../includes/AddTextButton';
import AddHitKeysButton from '../includes/AddHitKeysButton';
import TextEditLink from "../includes/TextEditLink";
import TextViewLink from "../includes/TextViewLink";
import TextAnalyzeLink from "../includes/TextAnalyzeLink";
import FAI from '../includes/FAI';
import { faUserCircle, faInfoCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import AddClaimButton from '../includes/AddClaimButton';
import SelectSearch from 'react-select-search';

const GeneralSidebar = ({display, authenticated, currentUser, setCurrentUser, itemData}) => {
  // const showMain = display.main;
  const showSidebar = display.sidebar;
  const [showAbout, setShowAbout] = useState(showSidebar.includes('ABOUT'));
  const [showUser, setShowUser] = useState(showSidebar.includes('USER'));
  const [showAnalysis, setShowAnalysis] = useState(showSidebar.includes('ANALYZE'));

  const About = () => (
    <div className="ev-about-sidebar">
      <header><h3>About Evidential</h3></header>
      <p>For purposes of understanding this site and defining terms in relation to the context of Evidential's textual analysis, the following definitons are given (any quotes are from Merriam-Webster online dictionary as of 1/14/2021)</p>
      <dl>
        <dt>Text</dt>
        <dd>A non-fictional written work that attempts to make one or more <em>arguments</em> related to one or more <em>claims</em>.</dd>
        <dt>Claim</dt>
        <dd>An "<a href="https://www.merriam-webster.com/dictionary/claim" target="_blank" rel="noopener noreferrer">assertion open to challenge</a>"</dd>
        <dt>Argument</dt>
        <dd>A statement labeling a type of "<a href="https://www.merriam-webster.com/dictionary/argument" target="_blank" rel="noopener noreferrer">reason given for or against a matter under discussion</a>" (that matter being a <em>claim</em>). Arguments must be categorized as either in <em>support</em> or in <em>rebut</em> to a given <em>claim</em> it is associated to. Additionally, they should be fairly short and concise.</dd>
        <dt>Support</dt>
        <dd>An <em>argument's</em> relation to a <em>claim</em> that makes an attempt <a href="https://www.merriam-webster.com/dictionary/support" target="_blank" rel="noopener noreferrer">"to uphold or defend as valid or right</a>" that <em>claim</em>.</dd>
        <dt>Rebut</dt>
        <dd>An <em>argument's</em> relation to a <em>claim</em> that makes an attempt <a href="https://www.merriam-webster.com/dictionary/rebut" target="_blank" rel="noopener noreferrer">"to contradict or oppose ... [via] countervailing proof</a>" against that <em>claim</em>.</dd>
        <dt>Hit Key</dt>
        <dd>A key word (or short phrase) used to automate analysis of a <em>text</em> in relation to a <em>claim</em>.</dd>
        <dt>Hit</dt>
        <dd>To "<a href="https://www.merriam-webster.com/dictionary/hit" target="_blank" rel="noopener noreferrer">attain</a>" a connection between a text and an argument via a particular <em>hit key</em>.</dd>
        <dt>Rating</dt>
        <dd>A manual scoring given on a <em>hit</em> in a <em>text</em> for the value, power, and clarity of that <em>argument</em> in relation to the given <em>claim</em> being analyzed.</dd>
        <dt>Profile</dt>
        <dd>A graphic display of statistical information about a <em>text</em> and its <em>ratings</em> in relation to the <em>arguments</em> it offers in <em>support</em> of or <em>rebuttal</em> against a <em>claim</em>.</dd>
        <dt>Verified (User Status)</dt>
        <dd>A status that allows uploading <em>texts</em>; creating <em>claims</em>, <em>arguments</em> and <em>hit keys</em> (and associating those to each other); and making <em>ratings</em>. (NOTE: Currently all users are given verified status.)</dd>
      </dl>
      <aside>
        <h3>About the Developer</h3>
        <strong>Evidential</strong> is <a href="https://github.com/scottgit" target="_blank" rel="noopener noreferrer"><strong>Scott Smith's</strong></a> individual, capstone student project for graduation on January 29th, 2021 from <a href="https://www.appacademy.io/course/software-engineer-online" target="_blank" rel="noopener noreferrer">App Academy's highly recommened 24-week, online, full-stack software engieering program</a>.
      </aside>
    </div>
  )

  const handleContextualButtons = (e) => {
    let button = e.target;
    if (!button.id) button = button.parentElement;
    switch (button.id) {
      case 'ev-About':
        setShowAbout(true);
        setShowUser(false);
        setShowAnalysis(false);
        break;
      case 'ev-User':
        setShowAbout(false);
        setShowUser(true);
        setShowAnalysis(false);
        break;
      case 'ev-Analysis':
        setShowAbout(false);
        setShowUser(false);
        setShowAnalysis(true);
        break;
      default:
        break;
    }
  }

  const textOptionLinks = () => {
    if (display.main && display.main.includes("-TEXT") && itemData) {
      return (
        <>
          <TextAnalyzeLink text={itemData} currentUser={currentUser} noParenthesis={true} inNav={true} hide={display.main === "ANALYZE-TEXT"}/>
          <TextEditLink text={itemData} currentUser={currentUser} noParenthesis={true} inNav={true} hide={display.main === "EDIT-TEXT"}/>
          <TextViewLink text={itemData} hide={display.main === "VIEW-TEXT"}/>
        </>
      )
    }
  }

  const claimOptionLinks = () => {
    if (display.main && display.main.includes("-CLAIM") && itemData) {
      return (
        <>
          <AddHitKeysButton currentUser={currentUser} setCurrentUser={setCurrentUser} claim={itemData} />
        </>
      )
    }
  }

  const AboutButton = <FAI id="ev-About" icon={faInfoCircle} className="in-text --dark --hover-tilt" title={`Show About`}/>

  const UserButton = <FAI id="ev-User" icon={faUserCircle} className="in-text --dark --hover-tilt" title={`Show User`}/>

  const AnalysisButton = <>
    <span id="ev-Analysis" className={`fa-layers fa-fw --hover-sub-tilt`} tabIndex="0" title={`Show Analysis`} >
      <FAI icon={faCircle} className="--dark" />
      <FAI icon={faSearchengin} className="--sub --mid" />
    </span>
  </>

  return (
    <>
      { authenticated &&
        <nav className="ev-sidebar-nav">
          {claimOptionLinks()}
          <AddClaimButton currentUser={currentUser} setCurrentUser={setCurrentUser} />
          {textOptionLinks()}
          <AddTextButton currentUser={currentUser} setCurrentUser={setCurrentUser} />
          {display.sidebar === "USER" &&
            <span className="fa-layers fa-fw" onClick={handleContextualButtons} tabIndex="0" >
            { showAbout && UserButton}
            { !showAbout && AboutButton}
            </span>
          }
          {display.sidebar === "ANALYZE" &&
            <span className="ev-context-button-group" onClick={handleContextualButtons} tabIndex="0" >
              { (showUser || showAbout) && !showAnalysis && AnalysisButton }
              { (showAnalysis || showUser) && !showAbout && AboutButton }
              { (showAnalysis || showAbout) && !showUser && UserButton }
            </span>
          }
        </nav>
      }
    { ((display.sidebar === "ABOUT" || !currentUser || showAbout) &&
      <About />
    ) || ((currentUser && showUser) &&
      <div className="ev-user-sidebar">
          <header><h3>Logged in as: {currentUser.siteIdentifier}</h3></header>
          <ul>
            <li><strong>Verified?: </strong>{currentUser.verified ? "Yes" : "No"}</li>
            <li><strong>Joined: </strong>{currentUser.createdAt}</li>
            <li><strong>Last Updated Profile: </strong>{currentUser.updatedAt}</li>
            <li><strong>Email: </strong>{currentUser.email}</li>
          </ul>

          {(currentUser.dataChanges && <DataChanges user={currentUser} />)}
          {(currentUser.textsAdded && <TextsAdded user={currentUser} currentUser={currentUser} />)}
          {(currentUser.claimsAdded && <ClaimsAdded user={currentUser} currentUser={currentUser} />)}
      </div>
    ) || ((currentUser && showAnalysis) &&
      <div className="ev-analysis-sidebar">
        <SelectSearch
          name="claim-analysis"
          value=""
          search={true}
          className="ev-claim-analysis-select"
          placeholder="Select Claim to Analyze on this Text"
          onChange= {(e) => alert(e.target.value)}
          renderOption={null}
          options={[

          ]}
        />
      </div>
    )
    }
    </>
  )
}

export default GeneralSidebar
