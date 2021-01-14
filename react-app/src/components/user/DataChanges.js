import React from 'react'

const DataChanges = ({user}) => {
  const getDataChanges = () => (
    <div>
      <h4>Data Changes</h4>
      <ul>
        {user.dataChanges.map(change => (
          <li key={'change-'+ change.id}>
            Changed {change.table} on {change.changedAt}
        {/* "oldData": json.loads(self.old_data),
        "newData": json.loads(self.new_data), */}
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    getDataChanges()
  )
}

export default DataChanges
