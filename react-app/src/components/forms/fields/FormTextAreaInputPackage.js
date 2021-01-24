import React, {useRef, useState, useEffect, useContext, useCallback} from 'react';
import {ClaimFormContext} from '../AddClaimForm';


const FormTextAreaInputPackage = ({
  fieldType,
  uniqueId,
  formSetterFn,
  settings={
    label: 'You need to set a label string!',
    explanation: '',
    maxLength: 200,
    rows: 3,
    placeholder: '',
    required: false
  }
}) => {
  const formContext = useContext(ClaimFormContext);
  const uid = uniqueId;
  const {fixedSupport, label, explanation, maxLength, rows, placeholder, required} = settings;
  const isArgumentStatement = fieldType === 'Argument Statement';
  const isArgumentNotes = fieldType === 'Argument Notes';
  const validArg = formContext.argumentsSet && formContext.argumentsSet[uid];

  const persistArgumentData = () => {
    if (isArgumentStatement && validArg) return validArg.statement;
    if (isArgumentNotes && validArg) return validArg.argumentNotes;
    return '';
  }

  const [value, setValue] = useState(persistArgumentData());
  const [showInfo, setShowInfo] = useState(false);
  const [charsLeft, setCharsLeft] = useState(maxLength);
  const charCountRef = useRef(null)
  const idString = (label.split(' ').join('-')); //Make ids without spaces

  // const setState = (data) => {

  // }

  const setState = useCallback((data) => {
    if (isArgumentStatement || isArgumentNotes) {
      formSetterFn(uid, data)
    } else {
      formSetterFn(formContext, data)
    }
  }, [formSetterFn, isArgumentStatement, isArgumentNotes, uid, formContext])

  const handleRadioSelect = useCallback((e, givenTarget) => {
    // Need to use integers for true/false for backend wtforms
    if (!givenTarget) givenTarget = e.target;
    setState({supports: givenTarget.value === 'support' ? 1 : 0})
  }, [setState]);

  useEffect(() => {
    // Show field information clicks
    const timer = setTimeout(() => {
      const explaination = document.getElementById(`${idString}-explanation-${uid}`)
      if (showInfo) {
        explaination.classList.remove('--unclicked');
        explaination.classList.add('--show');
        explaination.previousElementSibling.classList.add('--show');
      } else {
        explaination.classList.remove('--show');
        explaination.previousElementSibling.classList.remove('--show');
      }
    }, 100);
    return () => {
      clearTimeout(timer);
    }
  }, [showInfo, uid, idString])

  useEffect(() => {
    if (!fixedSupport) return;
    // Set data for required arguments on load
    const sup = document.getElementById(`sup-${uid}`);
    if (sup) handleRadioSelect(null, sup)
    const reb = document.getElementById(`reb-${uid}`);
    if (reb) handleRadioSelect(null, reb)
  }, [handleRadioSelect, uid])

  const textInputHandler = (e) => {
    const value = e.target.value;
    setValue(value);

    if (isArgumentStatement) {
      setState({statement: value})
    }
    else if (isArgumentNotes) {
      setState({argumentNotes: value})
    }
    else {
      setState(value);
    }

    const charsLeft = maxLength - value.length;
    setCharsLeft(charsLeft);
    if (charCountRef.current) {
      if (!parseInt(charsLeft)) {
        charCountRef.current.classList.add("ev-error");
      }
      else {
        charCountRef.current.classList.remove("ev-error");
      }
    }
  }

  const toggleShow = (e) => {
    if (e.target.classList.contains('ev-explanation-control')) {
      e.preventDefault();
      e.stopPropagation();
      setShowInfo(!showInfo);
    }
  }





  const argumentCheckedState = (value) => {
    // Set required argument's status to checked to its needed value
    if (!!fixedSupport) {
      return {checked: fixedSupport};
    }
    // Set added argument's last state
    if (validArg) {
      if (  (validArg.supports === 1 && value === 'support')
          ||(validArg.supports === 0 && value === 'rebut')) {

        return {defaultChecked: true}
      }
    }
    return {}
  }

  return (
    <>
      { (isArgumentStatement &&
        <div className="ev-sup-reb">
          {/* JSX balks at any "checked" property attempting to be set on a button
          that is not readOnly or have an onChange; so here, I needed to not even
          try to set "checked" if it wasn't a fixedSupport, and found this pattern
          of a solution online: {...(!!fixedSupport ? {checked: fixedSupport} : {}) } */}
          {(fixedSupport === 'support' || !fixedSupport) &&
            <div>
              <label htmlFor={`sup-${uid}`} readOnly={!!fixedSupport}>
              <input
                type="radio"
                id={`sup-${uid}`}
                name={`sup-reb-${uid}`}
                value="support"
                onClick={handleRadioSelect}
                required={true}
                {...argumentCheckedState('support')}
                readOnly={!!fixedSupport}
              />
              Supports</label>
            </div>
          }
          {(fixedSupport === 'rebut' || !fixedSupport) &&
            <div>
              <label htmlFor={`reb-${uid}`} readOnly={!!fixedSupport}>
              <input
                type="radio"
                id={`reb-${uid}`}
                name={`sup-reb-${uid}`}
                value="rebut"
                onClick={handleRadioSelect}
                {...argumentCheckedState('rebut')}
                readOnly={!!fixedSupport}
              />
              Rebuts</label>
            </div>
          }
        </div>)
      }
      <label className="ev-data-label" htmlFor={`${idString}-${uid}`}>
        <h4 className="ev-data-heading">{label}</h4>
        {explanation && <div className="ev-data-info"><span onClick={toggleShow} className="ev-explanation-control">What is this?</span>
          <div id={`${idString}-explanation-${uid}`} className="ev-data-explanation --unclicked">
            <p>{explanation}</p>
          </div>
        </div>
        }
        <textarea id={`${idString}-${uid}`} autoComplete={'off'} rows={rows} className="ev-text-area" value={value} placeholder={placeholder} onChange={textInputHandler} required={required} maxLength={maxLength} spellCheck={true}></textarea>
        <div className="ev-characters-remaining" ref={charCountRef}>{charsLeft} characters remaining</div>
      </label>
    </>
  )
}

export default FormTextAreaInputPackage;
