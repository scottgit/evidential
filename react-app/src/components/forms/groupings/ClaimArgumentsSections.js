import React, {useContext} from 'react';
import ArgumentGroup from './ArgumentGroup';
import AddArgumentsGroup from './AddArgumentsGroup';
import {ClaimFormContext} from '../AddClaimForm';

const ClaimArgumentsSections = ({uniqueIdRef}) => {
  const formContext = useContext(ClaimFormContext);

  // Generator function to create and send unique id's to an ArgumentGroup that is paired
  let argSupport = null;
  const balancer = () => {
    argSupport = argSupport ? 'rebut' : 'support';
    return argSupport;
  };

  let assigned = -1;
  const assignId = () => {
    const argLength = formContext.pairedArgIds.length;
    if (argLength < 2) {
      const uid = ++uniqueIdRef.current;
      formContext.pairedArgIds[argLength] = uid;
      return uid
    }
    return formContext.pairedArgIds[++assigned]
  }
  const makePairedArgumentProps = () => ({
    uniqueId: assignId(),
    fixedSupport: balancer()
  })

  // Pass the uniqueIdRef and needed items to the AddArgumentsGroup
  const passProps = {
    uniqueIdRef,
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

export default React.memo(ClaimArgumentsSections);
