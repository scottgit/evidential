import React, {useState, useCallback, useContext} from 'react';
import ArgumentGroup from './ArgumentGroup';
import FAI from '../../includes/FAI';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {ClaimFormContext} from '../AddClaimForm';


const AddArgumentsGroup = ({uniqueIdRef}) => {
  const formContext = useContext(ClaimFormContext);
  const [argList, _setArgList] = useState([]);
  const setArgList = useCallback((data) => _setArgList(data), [_setArgList]);

  // Generator function to create and send unique id's to an ArgumentGroup
  const makeArgumentProps = () => {
    return ({
      uniqueId: ++uniqueIdRef.current,
      setArgList
    })
  }

  const handleAddArgumentGroup = (e) => {
    const newList = [...argList, <ArgumentGroup {...makeArgumentProps()}/>];
    setArgList(newList);
    console.log('newList', newList)
    formContext.persistArgsList = [...formContext.persistArgsList, newList[newList.length-1].props.uniqueId];
  }

  const Additionals = ({children}) => {
    console.log('persist', formContext.persistArgsList)
    return (
      <>
        {children.map((child, idx) => {
            if (React.isValidElement(child)) {
              const uid = formContext.persistArgsList[idx];
              return React.cloneElement(child, {key: `arg-group-${uid}`, setArgList, listIndex: idx});
            }
          return child;
        })}
      </>
    )
  }

  return (
    <section className="ev-additional-arguments">
    <h3>Additional Arguments</h3>
    <p>Optionally add additional arguments to this claim's analysis.</p>

    <div className="ev-form-split" >
      <Additionals children={argList}/>
      <div className="ev-argument-add --hover-sub-tilt" onClick={handleAddArgumentGroup}>
          <p>Create another argument</p>
          <FAI icon={faPlus} className="in-text add-item --sub" />
      </div>
    </div>
  </section>
  )
}

export default AddArgumentsGroup
