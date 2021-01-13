import React, {useState} from "react";
import SplitView from "./structure/SplitView";
import List from "./includes/List";

const Home = (props) => {
  //props has: authenticated, currentUser
  const [display, setDisplay] = useState(
    props.authenticated ? {main: "HOME", sidebar: "USER"}
                        : {main: "WELCOME", sidebar: "ABOUT"}
  );

  const addProps = {display, setDisplay};

  return (
    <SplitView {...props} {...addProps}>
      <header><h1>Home: {props.currentUser.firstName}</h1></header>
      <div className="ev-list-columns">
        <List setDisplay={setDisplay} listType={"text"} linkPath={'/text/view/'} canAddItem={true}/>
        <List setDisplay={setDisplay} listType={"claim"} linkPath={'/claim/'} canAddItem={true}/>
      </div>
      <div>Sidebar</div>
    </SplitView>
  )
}

export default Home
