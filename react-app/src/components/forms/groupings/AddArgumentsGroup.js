import React, {useState} from 'react';
import ArgumentGroup from './ArgumentGroup';
import FAI from '../../includes/FAI';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const AddArgumentsGroup = ({uniqueIdRef}) => {
  const [argList, setArgList] = useState([])

  // Generator function to create and send unique id's to an ArgumentGroup
  const makeArgumentProps = () => ({
    uniqueId: ++uniqueIdRef.current,
  })

  const handleAddArgumentGroup = (e) => {
    setArgList([...argList, <ArgumentGroup {...makeArgumentProps()}/>]);
  }

  const Additionals = ({children}) => {
    return (
      <>
        {children.map((child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {key: `arg-group-${++uniqueIdRef.current}`})
            }
          return child;
        })}
      </>
    )
  }

  return (
    <section className="ev-additional-arguments">
    <h3>Additional Arguments</h3>
    <p>Add additional arguments</p>

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
