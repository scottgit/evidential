import React, {useState, useCallback, useRef} from 'react';
import AddKeys from './fields/AddKeys';
import FormHeader from '../includes/FormHeader';

const AddKeysForm = ({currentUser, setCurrentUser, claim, handleCloseModal}) => {
  const [keys, _setKeys] = useState();
  const [showConfirm, setShowConfrim] = useState(false);
  const [errors, setErrors] = useState([]);
  const currentKeysElem = useRef(null);

  const toggleShowConfirm = (e) => {
    setShowConfrim(!showConfirm);
  }

  const doCancel = (e) => {
    handleCloseModal()
  }

  const checkDuplicates = useCallback((setKeys, newKeys) => {
    // Get key string from hitKey object
    setKeys = setKeys.map(key => key.key);
    // Remove any previous alerts
    const currentKeys = currentKeysElem.current;
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
  }, [currentKeysElem])

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

  const keyProps = {required: true, formSetterFn: setKeys, placeholder: "(Required) At least one"}

  const headerProps = {headerTitle: 'Add Hit Keys', errors, doCancel, showConfirm, toggleShowConfirm}
  return (
    <form id="ev-hk-add" className="ev-hk-add" onSubmit={handleSubmit}>
      <FormHeader {...headerProps} />
      <h3>Claim:</h3>
      <p className="ev-hk-claim">{claim.assertion}</p>
      <AddKeys {...keyProps}/>
      <div className="ev-hk-current" ref={currentKeysElem}>
        <h4>Current Keys <span id="ev-hk-dup-warn" className="--hide ev-error">{"(Duplicates Being Set!)"}</span></h4>
        <div className="ev-hk-keyset">
        {(!!claim.hitKeys.length && claim.hitKeys.map((key, idx) => {
          const hitKey = key.key;
          return (<React.Fragment key={hitKey} >
            <span id={`ev-hk-unique-${hitKey.replace(' ','-')}`} >{hitKey}</span>{idx !== (claim.hitKeys.length - 1) && ', '}
          </React.Fragment>)
        }))
          ||
          "None set yet."
        }
        </div>
      </div>
    </form>
  )
}

export default AddKeysForm
