import React, {useState} from 'react';
import ArgumentGroup from '../groupings/ArgumentGroup';


const ClaimRequiredArgumentsSection = ({uniqueIdRef, argStatements, setArgStatements}) => {
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
    <section className="ev-claim-required-arguments">
      <h3>Required Arguments</h3>
      <p>Two arugments are required, one in support and one in rebuttal to the position of the claim's assertion. Additional arguments can be added.</p>
      <div className="ev-claim-form-split">
        <ArgumentGroup {...makeArgumentProps()}/>
        <ArgumentGroup {...makeArgumentProps()}/>
      </div>
    </section>
  )
}

export default ClaimRequiredArgumentsSection;
