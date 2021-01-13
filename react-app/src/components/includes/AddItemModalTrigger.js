import React, {useState} from 'react';
import ReactModal from 'react-modal';
import FAI from './FAI';
import { faPlus, faWindowClose } from '@fortawesome/free-solid-svg-icons';


ReactModal.setAppElement('#root');

const AddItemModalTrigger = ({type, children}) => {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = (e) => {
    setShowModal(true);
  }

  const handleCloseModal = (e) => {
    setShowModal(false);
  }

  return (
    <>
      <FAI icon={faPlus} className="in-text add-item" title={`Add ${type}`} onClick={handleShowModal} tabIndex="0"/>
      <ReactModal
        isOpen={showModal}
        closeTimeoutMS={500}
      >
        <button className="button icon ev-modal-close" onClick={handleCloseModal}>
          <FAI icon={faWindowClose} />
        </button>
        {children}
      </ReactModal>
    </>
  )
}

export default AddItemModalTrigger
