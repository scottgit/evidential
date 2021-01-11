import React, {useState} from "react";
import SplitView from "./structure/SplitView";
import ControlListings from "./control/ControlListings"

const Home = (props) => {
  //props has: authenticated, currentUser
  const [display, setDisplay] = useState(
    props.authenticated ? {main: "HOME", sidebar: "USER"}
                        : {main: "WELCOME", sidebar: "ABOUT"}
  );

  const addProps = {display, setDisplay};

  return (
    <SplitView {...props} {...addProps}>
      <h1>{props.currentUser.firstName}</h1>
      <ControlListings setDisplay={setDisplay}/>
      <div>Sidebar</div>
    </SplitView>
  )
}

export default Home
