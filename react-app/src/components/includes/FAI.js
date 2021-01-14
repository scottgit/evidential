import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FAI = (props) => {
  let additionalClasses = props.className ? props.className : '';
  return (
      <FontAwesomeIcon {...props} className={`ev-icon ${additionalClasses}`} />
  )
}

export default FAI
