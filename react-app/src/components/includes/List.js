import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../includes/Loader";
import AddItemModalTrigger from "../includes/AddItemModalTrigger";
import AddTextForm from '../forms/AddTextForm';
import {AddClaimForm} from '../forms/AddClaimForm';
import AddArgumentsForm from '../forms/AddArgumentsForm';
import AddKeysForm from '../forms/AddKeysForm';
import TextEditLink from '../includes/TextEditLink';
import TextAnalyzeLink from "../includes/TextAnalyzeLink";

const List = ({ currentUser, setCurrentUser, listType, linkPath, canAddItem=false, listData=[], heading='h2', otherData}) => {
  const [listItems, setListItems] = useState(listData);
  const [isLoaded, setIsLoaded] = useState(0);

  let pluralType;
  let displayKey = null;
  let modalContent = null;
  ((type) => {
    switch (type) {
      case 'text':
        displayKey = 'title';
        modalContent = <AddTextForm currentUser={currentUser} setCurrentUser={setCurrentUser}/>;
        break;
      case 'claim':
        displayKey = 'assertion';
        modalContent = <AddClaimForm currentUser={currentUser} setCurrentUser={setCurrentUser}/>;
        break;
      case 'argument':
      case 'supporting argument':
      case 'rebutting argument':
        displayKey = 'statement';
        modalContent = <AddArgumentsForm currentUser={currentUser} setCurrentUser={setCurrentUser}/>;
        break;
      case 'hit key':
        displayKey = 'key';
        modalContent = <AddKeysForm currentUser={currentUser} setCurrentUser={setCurrentUser} claim={otherData}/>;
        break;
      case 'rating':
        displayKey = 'rating';
        break;
      default:
    }
    if (displayKey) pluralType = `${type}s`
  })(listType);


  useEffect(() => {
    if (listItems.length) {
      setIsLoaded(1);
      return;
    };
    async function fetchData() {
      if (isLoaded) return; //Only load if nothing is loaded and no error
      try {
        const response = await fetch(`/api/${pluralType}`);
        if (response.ok) {
          const responseData = await response.json();
          setListItems(responseData[pluralType]);
          setIsLoaded(1);
        } else {
          throw Error('Failed to load content.');
        }
      } catch (e) {
        setIsLoaded(-1);
      }
    }
    fetchData();
  }, [isLoaded, pluralType, listItems.length]);

  const list = listItems.map((item) => {

    const identifier = `${listType}-${item.id}`;

    return (
      <li key={identifier} className={`ev-list-item ${linkPath ? 'ev-links-list' : ''}`}>
        { (linkPath &&
            <>
            <NavLink to={{
              pathname: `${linkPath}${item.id}`,
              itemData: item
              }} >
              {item[displayKey]}
            </NavLink>
            {listType === 'text' &&
              <>
                <TextEditLink text={item} currentUser={currentUser}/>
                <TextAnalyzeLink text={item} currentUser={currentUser}/>
              </>
            }
            </>
          )
          ||
          item[displayKey]
        }
      </li>
    );
  });

  const handleRetry = (e) => {
    setIsLoaded(0)
  }

  const HTag = `${heading}`;

  return (
    <div className="ev-list">
      <header className="ev-list-header">
        <HTag>
          {pluralType.replace(/\b[a-z]/g, char => char.toUpperCase())}
          {canAddItem && currentUser &&
          // The claim form handles its own close, so hideClose is set
          <AddItemModalTrigger type={listType} hideClose={displayKey === 'assertion' || displayKey === 'key'}>
            {modalContent}
          </AddItemModalTrigger>
          }
        </HTag>
      </header>
      { (isLoaded === 1 &&
          ((
          !!list.length && displayKey &&
            <ul>{list}</ul>
          )
          ||
          (
            <p>No {pluralType} were found.</p>
          ))
        )
        ||
        <p>Loading "{pluralType}"
          {
           (!isLoaded && <Loader className="in-text" />)
           ||
           (isLoaded === -1 && <><span className="ev-error"> **ERROR!**</span> <button type="button" onClick={handleRetry} className="ev-button in-text">Retry?</button></>)
          }
        </p>
      }
    </div>
  );
}

export default List
