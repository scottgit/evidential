import React, {useRef} from 'react';
import ArgumentGroup from './ArgumentGroup';
import FAI from '../../includes/FAI';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UIDProvider from '../../includes/UIDProvider';

const AddArgumentsGroup = ({uniqueIdRef, argStatements, setArgStatements}) => {
  const additionals = useRef(null);

  // Generator function to create and send unique id's to an ArgumentGroup
  const makeArgumentProps = () => ({
    uniqueId: ++uniqueIdRef.current,
    groupData: argStatements,
    formSetterFn: setArgStatements,
  })

  const handleAddArgumentGroup = (e) => {
    const adder = e.target;
    additionals.current.insertBefore(<ArgumentGroup {...makeArgumentProps()}/>, adder);
  }

  const Additionals = ({children}) => {

    return (
      <UIDProvider>
        {children.map((child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {key: `arg-group-${++uniqueIdRef.current}`})
            }
          return child;
        })}
      </UIDProvider>
    )
  }

  const test = [
    <ArgumentGroup {...makeArgumentProps()}/>,
    <ArgumentGroup {...makeArgumentProps()}/>,
    <ArgumentGroup {...makeArgumentProps()}/>,
    <ArgumentGroup {...makeArgumentProps()}/>,
  ]

  return (
    <section className="ev-additional-arguments">
    <h3>Additional Arguments</h3>
    <p>Add additional arguments</p>

    <div className="ev-form-split" ref={additionals}>
      <Additionals children={test}/>
      <div className="ev-argument-add --hover-sub-tilt" onClick={handleAddArgumentGroup}>
          <p>Create another argument</p>
          <FAI icon={faPlus} className="in-text add-item --sub" />
      </div>
    </div>
  </section>
  )
}

export default AddArgumentsGroup
