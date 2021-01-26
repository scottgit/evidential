import React, {useState, useCallback, useRef} from 'react';
import AddKeys from './fields/FormTextAreaInputPackage';

const AddKeysForm = (claim) => {
  const [keys, _setKeys] = useState();
  const currentKeys = useRef(null);

  const checkDuplicates = useCallback((setKeys, newKeys) => {
    // Remove any previous alerts
    const currentDups = currentKeys.querySelectorAll('.ev-hk-dup');
    currentDups.forEach(dup => dup.classList.remove('ev-hk-dup'));
    const dupWarn = currentKeys.querySelector(`#ev-hk-dup-warn`);
    dupWarn.classList.add('--hide');

    let foundDup = false;
    for (let i=0; i<newKeys.length; i++) {
      const newKey = newKeys[i].trim();
      // Alert user if they have entered a duplicate key
      if (setKeys.includes(newKey)) {
        currentKeys.querySelector(`#ev-hk-unique-${newKey.replace(' ','-')}`).classList.add('ev-hk-dup');
        foundDup = true;
      }
    }
    if (foundDup) {
      dupWarn.classList.remove('--hide');
    }
    return foundDup;
  }, [currentKeys])

  const setKeys = useCallback((newKeys) => {
    _setKeys(newKeys);
    checkDuplicates(claim.hitKeys, newKeys.trim().split(','))
  }, [_setKeys, checkDuplicates, claim.hitKeys]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //Clean up the keys and make into an array
    const hitKeys = keys.trim().split(',').map(key => key.trim());

    const data = {hitKeys}
    console.log(data);
  }

  const keyProps = {required: true, formSetterFn: setKeys}

  return (
    <form id="ev-hk-add" class="ev-hk-add" onSubmit={handleSubmit}>
      <h3>Set Hit Keys for Claim:</h3>
      <p className="ev-hk-claim">{claim.assertion}</p>
      <AddKeys {...keyProps}/>
      <div className="ev-hk-current" ref={currentKeys}>
        <h4>Current Keys <span id="ev-hk-dup-warn" className="--hide ev-error">{"(Duplicates Being Set!)"}</span></h4>
        {(!!claim.hitKeys.length && claim.hitKeys.map(key => {
          return (<>
            <span id={`ev-hk-unique-${key.replace(' ','-')}`} key={key}>{key}</span>,
          </>)
        }))
          ||
          "None set yet."
        }
      </div>
    </form>
  )
}

export default AddKeysForm
