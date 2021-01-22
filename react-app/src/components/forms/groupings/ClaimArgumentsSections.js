import React, {useState} from 'react';
import ArgumentGroup from './ArgumentGroup';
import FAI from '../../includes/FAI';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const ClaimArgumentsSections = ({uniqueIdRef, argStatements, setArgStatements}) => {
  const [checkPairedArguments, setCheckPairedArguments] = useState(false);

  // Generator function to create and send unique id's to the Argument groups
  const makeArgumentProps = () => ({
    uniqueId: ++uniqueIdRef.current,
    groupData: argStatements,
    formSetterFn: setArgStatements,
    checkPairedArguments,
    setCheckPairedArguments
  })

  return (
    <>
      <section className="ev-claim-required-arguments">
        <h3>Required Arguments</h3>
        <p>Two arugments are required, one in support and one in rebuttal to the position of the claim's assertion. Additional arguments can be added.</p>
        <div className="ev-claim-form-split">
          <ArgumentGroup {...makeArgumentProps()}/>
          <ArgumentGroup {...makeArgumentProps()}/>
        </div>
      </section>
      <section className="ev-claim-additional-arguments">
        <h3>Additional Arguments</h3>
        <p>Add additional arguments</p>
        <div className="ev-claim-form-split">
          <ArgumentGroup {...makeArgumentProps()}/>
          <ArgumentGroup {...makeArgumentProps()}/>
          <ArgumentGroup {...makeArgumentProps()}/>
          <ArgumentGroup {...makeArgumentProps()}/>
          <div className="ev-argument-group --adder --hover-sub-tilt">
            <p>Create another argument</p>
            <FAI icon={faPlus} className="in-text add-item --sub" />
          </div>
        </div>
      </section>
    </>
  )
}

export default ClaimArgumentsSections;
