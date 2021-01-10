import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../includes/Loader";

const TextsList = () => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/texts");
      const responseData = await response.json();
      setTexts(responseData.texts);
    }
    fetchData();
  }, []);

  const textsList = texts.map((text) => {
    return (
      <li key={text.id}>
        <NavLink to={`/texts/${text.id}`}>{text.title}</NavLink>
      </li>
    );
  });

  return (
    <div className="link-list">
      <h2>Text Titles</h2>
      { (!!texts.length &&
          <ul>{textsList}</ul>
        )
        ||
        <p>Loading texts <Loader className="in-text" /></p>
      }
    </div>
  );
}

export default TextsList
