import React, {useRef, useState, useEffect} from 'react';


const FormTextAreaInputPackage = ({
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



  const textInputHandler = (e) => {
    const v = e.target.value;
    console.log('v', v)
    setValue(v);
    // formSetterFn(v);
    const charsLeft = maxLength - v.length;
    setCharsLeft(charsLeft);
    if (charCountRef.current) {
      console.log(charCountRef.current)
      console.log(charsLeft)
      if (!parseInt(charsLeft)) {
        charCountRef.current.classList.add("ev-error");
      }
      else {
        charCountRef.current.classList.remove("ev-error");
      }
    }
  }

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
  }, [showInfo, uid])

  const toggleShow = (e) => {
    if (e.target.classList.contains('ev-explanation-control')) {
      e.preventDefault();
      e.stopPropagation();
      setShowInfo(!showInfo);
    }
  }

  return (
    <>
      { label === 'Statement' &&
        <div className="ev-sup-reb">
          <div>
            <input type="radio" id={`sup-${uid}`}
            name={`sup-reb-${uid}`} value="support" />
            <label htmlFor={`sup-${uid}`}>Supports</label>
          </div>
          <div>
            <input type="radio" id={`reb-${uid}`}
            name={`sup-reb-${uid}`} value="rebut" />
            <label htmlFor={`reb-${uid}`}>Rebuts</label>
          </div>
        </div>
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
