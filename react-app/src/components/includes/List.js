import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../includes/Loader";
import AddItemModalTrigger from "../includes/AddItemModalTrigger";
import AddTextForm from '../forms/AddTextForm';
import AddClaimForm from '../forms/AddClaimForm';
import AddArgumentsForm from '../forms/AddArgumentsForm';
import AddKeysForm from '../forms/AddKeysForm';

const ControlList = ({setDisplay, currentUser, listType, linkPath, canAddItem=false}) => {
  const [listItems, setListItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(0);

  let pluralType;
  let displayKey = null;
  let modalContent = null;
  ((type) => {
    switch (type) {
      case 'text':
        displayKey = 'title';
        modalContent = <AddTextForm currentUser={currentUser}/>;
        break;
      case 'claim':
        displayKey = 'assertion';
        modalContent = <AddClaimForm urrentUser={currentUser}/>;
        break;
      case 'argument':
        displayKey = 'statement';
        modalContent = <AddArgumentsForm urrentUser={currentUser} />;
        break;
      case 'key':
        displayKey = 'key';
        modalContent = <AddKeysForm urrentUser={currentUser}/>;
        break;
      case 'rating':
        displayKey = 'rating';
        break;
      default:
    }
    if (displayKey) pluralType = `${type}s`
  })(listType);


  useEffect(() => {
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
  }, [isLoaded, pluralType]);

  const list = listItems.map((item) => {
    const identifier = `${listType}-${item.id}`;

    return (
      <li key={identifier} className={`ev-list-item ${linkPath ? 'ev-links-list' : ''}`}>
        { (linkPath &&
            <NavLink to={`${linkPath}${item.id}`}>
              {item[displayKey]}
            </NavLink>
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

  return (
    <div className="ev-list">
      <header className="ev-list-header">
        <h2>
          {pluralType[0].toUpperCase()+pluralType.slice(1)}
          {canAddItem && currentUser &&
          <AddItemModalTrigger type={listType}>
            {modalContent}
          </AddItemModalTrigger>
          }
        </h2>
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
           (isLoaded === -1 && <><span className="ev-error"> **ERROR!**</span> <button type="button" onClick={handleRetry} className="in-text">Retry?</button></>)
          }
        </p>
      }
    </div>
  );
}

export default ControlList
