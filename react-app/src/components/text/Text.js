import React, { useState, useEffect } from "react";
import ReactHtmlParser from 'react-html-parser';
import DOMPurify from "dompurify";

const Text = ({itemData, setContentDisplayed}) => {
  const [content, _setContent] = useState('');
  // Make sure any content change is cleaned before display in browser
  const setContent = (content) => _setContent(DOMPurify.sanitize(content, {FORBID_TAGS: ['img', 'input', 'form']}));

  useEffect(() => {
    let stillMounted = true;
    if (stillMounted) {
      setContent(itemData.content);
    }
    return function cleanUp() {
      stillMounted = false;
    }
  }, [itemData])

  useEffect(() => {
    let stillMounted = true;
    if (stillMounted) {
      // When rendering of text content is done of content, then show the title loaded
      setContentDisplayed(true);
    }
    return function cleanUp() {
      stillMounted = false;
    }
  }, [content, setContentDisplayed])

  return (
    <div id="ev-display-text" className="ev-text-content">
      {ReactHtmlParser(content)}
    </div>
  )
}

export default Text
