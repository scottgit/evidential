import React from 'react';
import AddArgumentNotesField from '../fields/AddArgumentNotesField';
import AddArgumentStatementFields from '../fields/AddArgumentStatementFields';

const ArgumentGroup = ({uniqueId, argStatements, setArgStatements, checkPairedArguments, setCheckPairedArguments}) => {

  const statementProps = ({
    uniqueId,
    groupData: argStatements,
    formSetterFn: setArgStatements,
    checkPairedArguments,
    setCheckPairedArguments
  })

  const notesProps = ({
    uniqueId,
    formSetterFn: setArgStatements
  })

  return (
    <div className="ev-argument-group">
      <h4 className="ev-group-heading">Argument</h4>
      <AddArgumentStatementFields {...statementProps}/>
      <AddArgumentNotesField {...notesProps} />
    </div>
  )
}

export default ArgumentGroup
