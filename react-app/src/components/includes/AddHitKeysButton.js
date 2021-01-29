import React, {useState} from 'react';
import ReactModal from 'react-modal';
import FAI from './FAI';
import { faKey, faPlus } from '@fortawesome/free-solid-svg-icons';
import AddKeysForm from '../forms/AddKeysForm';


ReactModal.setAppElement('#root');

const AddHitKeysButton = ({currentUser, setCurrentUser, claim, hide=false}) => {
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
        <FAI icon={faKey} className="ev-icon --dark" />
        <FAI icon={faPlus} className="ev-icon --sub --hc --dark" />
      </span>
      <ReactModal
        isOpen={showModal}
        closeTimeoutMS={500}
        overlayClassName="ev-modal-overlay"
      >
      <AddKeysForm currentUser={currentUser} setCurrentUser={setCurrentUser} claim={claim} handleCloseModal={handleCloseModal}/>
      </ReactModal>
    </>
  )
}

export default AddHitKeysButton
