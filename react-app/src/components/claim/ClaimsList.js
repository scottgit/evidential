import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../includes/Loader";

const ClaimsList = () => {
  const [claims, setClaims] = useState([]);
  const [isLoaded, setIsLoaded] = useState(0);

  useEffect(() => {
    async function fetchData() {

      if (isLoaded) return; //Only load if nothing is loaded and no error
      try {
        const response = await fetch("/api/claims");
        if (response.ok) {
          const responseData = await response.json();
          setClaims(responseData.claims);
          setIsLoaded(1);
        } else {
          throw Error('Failed to load content.');
        }
      } catch (e) {
        setIsLoaded(-1);
      }
    }
    fetchData();
  }, [isLoaded]);

  const claimsList = claims.map((claim) => {
    return (
      <li key={claim.id}>
        <NavLink to={`/claims/${claim.id}`}>{claim.assertion}</NavLink>
      </li>
    );
  });

  const handleRetry = (e) => {
    setIsLoaded(0)
  }

  return (
    <div className="link-list">
      <h2>Claims</h2>
      { (isLoaded === 1 &&
          ((
          !!claims.length &&
            <ul>{claimsList}</ul>
          )
          ||
          (
            <p>No claims were found.</p>
          ))
        )
        ||
        <p>Loading "claims"
          {
           (!isLoaded && <Loader className="in-text" />)
           ||
           (isLoaded === -1 && <><span className="error"> **ERROR!**</span> <button type="button" onClick={handleRetry} className="in-text">Retry?</button></>)
          }
        </p>
      }
    </div>
  );
}

export default ClaimsList
