import React, {useState, useEffect} from "react";
import SplitView from "../structure/SplitView";
import List from "../includes/List";
import HomeIntro from "./HomeIntro";
import GeneralSidebar from "./GeneralSidebar";

const Home = ({authenticated, currentUser, setCurrentUser}) => {
  const [display, setDisplay] = useState(
    authenticated
    ? {main: "HOME", sidebar: "USER"}
    : {main: "WELCOME", sidebar: "ABOUT"}
  );

  useEffect(() => {
    function doDisplay() {
      setDisplay(
        authenticated
        ? {main: "HOME", sidebar: "USER"}
        : {main: "WELCOME", sidebar: "ABOUT"}
      )
    }
    doDisplay();
  }, [authenticated, currentUser])


  const sendProps = {display, setDisplay, authenticated, currentUser};

  return (
    <>
    {(!display && `Loading` )}
    {(<SplitView {...sendProps}>
        <header>{
          ((display.main === "HOME") &&
          <h1>Home: {currentUser ? currentUser.firstName : ''}</h1>)
          ||
          ((display.main === "WELCOME") &&
          <h1>Welcome to Evidential</h1>)
          }
        </header>
        <>
          <HomeIntro display={display}/>
          <div className="ev-list-columns">
            <List
              listType={"text"}
              linkPath={'/text/view/'}
              canAddItem={authenticated ? true : false}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
            <List
              listType={"claim"}
              linkPath={'/claim/view/'}
              canAddItem={authenticated ? true : false}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </div>
        </>
        <GeneralSidebar
          display={display}
          authenticated={authenticated}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
    </SplitView>
    )}
    </>
  )
}

export default Home
