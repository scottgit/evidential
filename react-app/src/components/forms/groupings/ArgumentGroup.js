import React, {useState, useCallback, useContext} from 'react';
import AddArgumentNotesField from '../fields/AddArgumentNotesField';
import AddArgumentStatementFields from '../fields/AddArgumentStatementFields';
import {ClaimFormContext} from '../AddClaimForm';

const ArgumentGroup = ({uniqueId}) => {
  const formContext = useContext(ClaimFormContext);
  // const [argListData, _setArgListData] = useState({});

  /* Process incoming data for proper storage
      At this stage, argListData is an object with integer keys to argumetn objects that looks like:
      1: {
        statement: "Blah!",
        argumentNotes: "Blah, blah.",
        supports: 1   // See further explanation
      }
  */

  // const stateUpdate = useCallback(() => {argListDataRef.current = [Object.values(argListData)]; console.log('cb', argListData, argListDataRef.current)}, [argListData, argListDataRef]);

  const setArgListData = (key, argData) => {
    const updateData = {};
    key = parseInt(key);
    const currentData =  formContext.argumentsSet;

    if (key in currentData) {
      updateData[key] = {...currentData[key], ...argData}
    } else {
      updateData[key] = {
        statement: argData.statement || '' ,
        argumentNotes: argData.argumentNotes || '',
        supports: argData.supports  || ''
      }
    }

    formContext.argumentsSet = {...currentData, ...updateData};
  }

  const groupProps = ({
    uniqueId,
    setArgListData,
  })

  return (
    <div className="ev-argument-group">
      <h4 className="ev-group-heading">Argument</h4>
      <AddArgumentStatementFields {...groupProps}/>
      <AddArgumentNotesField {...groupProps} />
    </div>
  )
}

export default ArgumentGroup
