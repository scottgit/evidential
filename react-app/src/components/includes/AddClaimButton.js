import React, {useState} from 'react';
import ReactModal from 'react-modal';
import FAI from './FAI';
import { faCommentAlt, faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import AddTextForm from '../forms/AddTextForm';
import { AddClaimForm } from '../forms/AddClaimForm';


ReactModal.setAppElement('#root');

const AddClaimButton = ({currentUser, setCurrentUser, hide=false}) => {
  const [showModal, setShowModal] = useState(false)
  hide = hide ? '--hide' : '';

  const handleShowModal = (e) => {
    setShowModal(true);
  }

  const handleCloseModal = (e) => {
    setShowModal(false);
  }

  return (
    <>
      <span className={`fa-layers fa-fw --hover-sub-tilt ${hide}`} onClick={handleShowModal} tabIndex="0" title={`Add Text`} >
        <FAI icon={faCommentAlt} className="ev-icon --dark" />
        <FAI icon={faPlus} className="ev-icon --sub --mid" />
      </span>
      <ReactModal
        isOpen={showModal}
        closeTimeoutMS={500}
        overlayClassName="ev-modal-overlay"
      >
      <AddClaimForm currentUser={currentUser} setCurrentUser={setCurrentUser} handleCloseModal={handleCloseModal}/>
      </ReactModal>
    </>
  )
}

export default AddClaimButton
