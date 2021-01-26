import React from 'react';
import {NavLink} from 'react-router-dom';
// import claimEditLink from '../includes/claimEditLink';

const ClaimsAdded = ({user, currentUser}) => {


  const getClaimsAdded = () => (
    <div>
      <h4>Claims Added</h4>
      <ul>
        {user.claimsAdded.map(claim => {
          return (
            <li key={'claim-'+ claim.id}>
              Added "<NavLink to={{
                pathname: `/claim/view/${claim.id}`,
                itemData: claim
              }}>{claim.assertion}</NavLink>" on {claim.createdAt}
              {/*<claimEditLink claim={claim} currentUser={currentUser}/>*/}
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    getClaimsAdded()
  )
}

export default ClaimsAdded
