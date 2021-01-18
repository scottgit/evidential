import React, {useState, useEffect} from "react";
import SplitView from "../structure/SplitView";
import List from "../includes/List";
import HomeIntro from "./HomeIntro";
import GeneralSidebar from "./GeneralSidebar";

const Home = ({authenticated, currentUser, setCurrentUser}) => {
  //props has: authenticated, currentUser
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    function doDisplay() {
      setDisplay(
        authenticated
        ? {main: "HOME", sidebar: "USER"}
        : {main: "WELCOME", sidebar: "ABOUT"}
      )
    }
    doDisplay();
  }, [authenticated])


  const sendProps = {display, setDisplay, authenticated, currentUser};

  return (
    <>
    {(!display && `Loading` )}
    {(<SplitView {...sendProps}>
        <header>{
          ((display.main === "HOME") &&
          <h1>Home: {currentUser.firstName}</h1>)
          ||
          ((display.main === "WELCOME") &&
          <h1>Welcome to Evidential</h1>)
          }
        </header>
        <>
          <HomeIntro display={display}/>
          <div className="ev-list-columns">
            <List
              setDisplay={setDisplay}
              listType={"text"}
              linkPath={'/text/view/'}
              canAddItem={authenticated ? true : false}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
            <List
              setDisplay={setDisplay}
              listType={"claim"}
              linkPath={'/claim/'}
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
