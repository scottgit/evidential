import React, {useContext, useState} from 'react';
import AddArgumentNotesField from '../fields/AddArgumentNotesField';
import AddArgumentStatementFields from '../fields/AddArgumentStatementFields';
import {ClaimFormContext} from '../AddClaimForm';
import FAI from '../../includes/FAI';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ArgumentGroup = ({uniqueId, listIndex, getArgList, setArgList, fixedSupport}) => {
  const formContext = useContext(ClaimFormContext);
  const [showConfirm, setShowConfrim] = useState(false);

  /* Process incoming data for proper storage
      At this stage, `formContext.argumentsSet` is an object with integer keys to argument objects that looks like this pattern:
      1: {
        statement: "Blah!",
        argumentNotes: "Blah, blah.",
        supports: 1   // or 0
      }
  */

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
        // Since supports can be 0 need a ternary
        supports: argData.supports === '' ? '' : argData.supports
      }
    }

    formContext.argumentsSet = {...currentData, ...updateData};
  }

  const handleKeyedConfirm = (e) => {
    if (e.key === 'Enter' && e.target.id === `trash-${uniqueId}`) /* enter */ {
      setShowConfrim(true);
    }
  }

  const toggleShowConfirm = (e) => {
    setShowConfrim(!showConfirm);
  }

  const doDelete = (e) => {
    if (uniqueId in formContext.argumentsSet) {
      delete formContext.argumentsSet[uniqueId];
    }
    const newList = [...getArgList()]
    newList.splice(listIndex, 1);
    setArgList(newList);
    setShowConfrim(false);
  }

  const statementProps = ({
    uniqueId,
    setArgListData,
    fixedSupport
  })

  const noteProps = ({
    uniqueId,
    setArgListData
  })



  return (
    <div className="ev-argument-group">
      <h4 className="ev-group-heading">Argument</h4>
      <AddArgumentStatementFields {...statementProps}/>
      <AddArgumentNotesField {...noteProps} />
      {!fixedSupport &&
        <div className="ev-argument-delete">
          { showConfirm &&
          <span className="ev-argument-delete-confirm">
            <button className="ev-button --warning" type='button' onClick={doDelete}>Delete</button>
            <button className="ev-button --safe" type='button' onClick={toggleShowConfirm}>Cancel</button>
          </span>
          }
          <FAI
            id={`trash-${uniqueId}`}
            icon={faTrashAlt}
            onClick={(e) => !showConfirm && toggleShowConfirm(e)}
            onKeyDown={handleKeyedConfirm}
            tabIndex="0"
            title="Delete Argument"
            className="--dark --hover-tilt"
          />
        </div>
      }
    </div>
  )
}

export default ArgumentGroup
