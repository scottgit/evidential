import React, {useRef, useState, useEffect, useContext} from 'react';
import {ClaimFormContext} from '../AddClaimForm';


const FormTextAreaInputPackage = ({
  fieldType,
  uniqueId,
  formSetterFn,
  auxilary,
  settings={
    label: 'You need to set a label string!',
    explanation: '',
    maxLength: 200,
    rows: 3,
    placeholder: '',
    required: false
  }
}) => {
  const uid = uniqueId;
  const {label, explanation, maxLength, rows, placeholder, required} = settings;
  const [value, setValue] = useState('');
  const [showInfo, setShowInfo] = useState(false);
  const [charsLeft, setCharsLeft] = useState(maxLength);
  const charCountRef = useRef(null)
  const idString = (label.split(' ').join('-')); //Make ids without spaces


  const formContext = useContext(ClaimFormContext);

  const isArgumentStatement = fieldType === 'Argument Statement';
  const isArgumentNotes = fieldType === 'Argument Notes';

  useEffect(() => {
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

  const handleRadioSelect = (e) => {
    // Need to use integers for true/false for backend wtforms
    setState({supports: e.target.value === 'support' ? 1 : 0})
  }

  const setState = (data) => {
    if (isArgumentStatement || isArgumentNotes) {
      formSetterFn(uid, data)
    } else {
      formSetterFn(formContext, data)
    }
  }

  return (
    <>
      { (isArgumentStatement &&
        <div className="ev-sup-reb">
          <div>
            <label htmlFor={`sup-${uid}`}>
            <input type="radio" id={`sup-${uid}`}
            name={`sup-reb-${uid}`} value="support" onClick={handleRadioSelect} required={true}/>
            Supports</label>
          </div>
          <div>
            <label htmlFor={`reb-${uid}`}>
            <input type="radio" id={`reb-${uid}`}
            name={`sup-reb-${uid}`} value="rebut" onClick={handleRadioSelect} />
            Rebuts</label>
          </div>
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
