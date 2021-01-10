import React, { useState, useEffect } from "react";
import ReactHtmlParser from 'react-html-parser';

const Text = ({text}) => {

  return (
    <section className="text-view">
      {text && ReactHtmlParser(text.content)}
    </section>
  )
}

export default Text
