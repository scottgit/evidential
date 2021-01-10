import React, { useState, useEffect } from "react";
import Loader from "../includes/Loader";
import Text from "./Text";


const ViewText = ({textId}) => {
  const [text, setText] = useState({});
  const [isLoaded, setIsLoaded] = useState(0);

  useEffect(() => {
    async function fetchData() {
      console.log('is loaded inside', isLoaded)
      if (isLoaded) return; //Only load if nothing is loaded and no error
      try {
        const response = await fetch(`/api/texts/${textId}`);
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData)
          setText(responseData);
          setIsLoaded(1);
        } else {
          throw Error('Failed to load content.');
        }
      } catch (e) {
        console.log("in error", e)
        setIsLoaded(-1);
      }
    }
    fetchData();
  }, [isLoaded, textId]);

  const handleRetry = (e) => {
    setIsLoaded(0)
  }
  console.log('is loaded outside', isLoaded)
  return (
    <div className="content-wrapper">
      <h2>Text:
        {
          (!isLoaded && <> Loading <Loader className="in-text" /></>)
          ||
          (isLoaded === -1 && <><span className="error"> **ERROR!**</span> <button type="button" onClick={handleRetry} className="in-text">Retry?</button></>)
          ||
          ` ${text.title}`
        }
      </h2>
       { (isLoaded === 1 && <Text text={text}/>)}
    </div>
  )
}

export default ViewText
