import React, {useState, useCallback} from 'react';
import ArgumentGroup from './ArgumentGroup';
import FAI from '../../includes/FAI';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const AddArgumentsGroup = ({uniqueIdRef}) => {
  const [argList, _setArgList] = useState([]);
  // Memoize to send to children
  const setArgList = useCallback((data) => _setArgList(data), [_setArgList]);

  // Getter function to avoid child rerenders on argList change
  const getArgList = useCallback(() => argList, [argList]);

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
