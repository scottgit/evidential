import React, {useState} from 'react';
import ArgumentGroup from './ArgumentGroup';
import AddArgumentsGroup from './AddArgumentsGroup';


const ClaimArgumentsSections = ({uniqueIdRef, argStatements, setArgStatements}) => {
  const [checkPairedArguments, setCheckPairedArguments] = useState(false);

  // Generator function to create and send unique id's to an ArgumentGroup that is paired
  const makePairedArgumentProps = () => ({
    uniqueId: ++uniqueIdRef.current,
    groupData: argStatements,
    formSetterFn: setArgStatements,
    checkPairedArguments,
    setCheckPairedArguments
  })

  // Pass the uniqueIdRef and needed items to the AddArgumentsGroup
  const passProps = {
    uniqueIdRef,
    argStatements,
    setArgStatements,
  }

  return (
    <>
      <section className="ev-claim-required-arguments">
        <h3>Required Arguments</h3>
        <p>Two arugments are required, one in support and one in rebuttal to the position of the claim's assertion. Additional arguments can be added.</p>
        <div className="ev-form-split">
          <ArgumentGroup {...makePairedArgumentProps()}/>
          <ArgumentGroup {...makePairedArgumentProps()}/>
        </div>
      </section>
      <AddArgumentsGroup {...passProps} />
    </>
  )
}

export default ClaimArgumentsSections;
