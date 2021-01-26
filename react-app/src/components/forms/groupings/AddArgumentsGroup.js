import React, {useState, useEffect, useCallback, useContext} from 'react';
import ArgumentGroup from './ArgumentGroup';
import FAI from '../../includes/FAI';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {ClaimFormContext} from '../AddClaimForm';


const AddArgumentsGroup = ({uniqueIdRef}) => {
  const formContext = useContext(ClaimFormContext);

  const [argList, _setArgList] = useState([]);
  // Memoize to send to children
  const setArgList = useCallback((data) => _setArgList(data), [_setArgList]);

  // Getter function to avoid child rerenders on argList change
  const getArgList = useCallback(() => argList, [argList]);

  // Generator function to create and send unique id's to an ArgumentGroup
  const makeArgumentProps = useCallback((uid) => {
    const uniqueId = uid || ++uniqueIdRef.current;
    return ({
      uniqueId,
      setArgList
    })
  }, [setArgList, uniqueIdRef]);

  // IFFY to persist data from context on rerenders
  const persistList = useCallback(() => {
    const list = [];
    const requiredList = formContext.pairedArgIds;
    for (let key in formContext.argumentsSet) {
      if ( !requiredList.includes(parseInt(key)) ) {
        list.push(<ArgumentGroup {...makeArgumentProps(key)}/>)
      }
    }
    setArgList(list);
  }, [setArgList, formContext.argumentsSet, formContext.pairedArgIds, makeArgumentProps]);

  useEffect(() => {
    persistList();
    // eslint-disable-next-line
  }, [])

  const handleAddArgumentGroup = (e) => {
    const newList = [...argList, <ArgumentGroup {...makeArgumentProps()}/>];
    setArgList(newList);
  }

  const Additionals = ({children}) => {
    return (
      <>
        {children.map((child, idx) => {
            if (React.isValidElement(child)) {
              const uid = child.props.uniqueId;
              return React.cloneElement(child, {key: `arg-group-${uid}`, getArgList, setArgList, listIndex: idx});
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
