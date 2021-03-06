import React, { useState, useEffect } from "react";
import List from "../includes/List";

const Claim = ({itemData, setContentDisplayed, currentUser, setCurrentUser}) => {
  const [claim, setClaim] = useState('');

  useEffect(() => {
    let stillMounted = true;
    if (stillMounted) {
      setClaim(itemData);
    }
    return function cleanUp() {
      stillMounted = false;
    }
  }, [itemData])

  useEffect(() => {
    let stillMounted = true;
    if (stillMounted) {
      // When rendering of content is done, then show the page loaded
      setContentDisplayed(true);
    }
    return function cleanUp() {
      stillMounted = false;
    }
  }, [claim, setContentDisplayed])

  const hasKeys = claim && claim.hitKeys && !!claim.hitKeys.length;

  return (
    <div className={`ev-claim-info ${hasKeys ? '--columns' : ''}`}>
      {claim &&
        <div>
          <section>
            <h2>Assertion</h2>
            <div>Created By: {claim.createdBy.siteIdentifier} on {claim.createdAt}</div>
            <p>{claim.assertion}</p>
            <h3>Notes</h3>
            <div>{claim.notes}</div>
          </section>
          <section>
            <h2>Arguments</h2>
            <List
              key={`sup-${claim.supportingArguments.length}`}
              heading={'h3'}
              listType={"supporting argument"}
              listData={claim.supportingArguments}
              canAddItem={false}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
            <List
              key={`reb-${claim.rebutingArguments.length}`}
              heading={'h3'}
              listType={"rebutting argument"}
              listData={claim.rebutingArguments}
              canAddItem={false}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </section>
        </div>
      }
      {claim && hasKeys &&
        <section className="hit-keys-list">
          <List
            key={`hk-${claim.hitKeys.length}`}
            heading={'h3'}
            listType={"hit key"}
            listData={claim.hitKeys}
            canAddItem={true}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            otherData={claim}
          />
        </section>
      }
    </div>
  )
}

export default Claim
