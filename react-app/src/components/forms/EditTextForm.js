import React, {useRef, useState, useEffect} from 'react';
import ReactDOMServer from 'react-dom/server';
import {useHistory} from 'react-router-dom';
import  {Editor } from '@tinymce/tinymce-react';
import DOMPurify from "dompurify";
import {editText, deleteText} from '../../services/text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import ConfirmModal from '../includes/ConfirmModal';
import { updateCurrentUserInfo } from '../../services/user';
import tinyCSS from '../../css/tinymce.css.js';


const EditTextForm = ({currentUser, itemData, title, setItemData, setContentDisplayed, setCurrentUser}) => {
  const EDITOR = useRef();
  const [feedback, setFeedback] = useState('');
  const [textDetails, _setTextDetails] = useState({})
  const initialState = useRef({...itemData});
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const doSaveRef = useRef(null);
  const modalMsgRef = useRef(null);
  const savedMsg = 'Saved! (Message removed in 1 second.)';

  // Initializing and editing of text details

  const setTextDetails = (details) => {
    _setTextDetails({...textDetails, ...details});
  };

  if (!textDetails.content) {
    setTextDetails(initialState.current);
  }

  // Code for Delete of the text item, with modal confirmation
  // Initiated in the Editor Delete action
  const history = useHistory();

  const handleShowModal = () => {
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleDelete = async () => {
    //Protected by a confirm modal
    setErrors([]);
    const pathInfo = textDetails.id;
    const sendData = {createdByUserId: currentUser.id};
    try {
      const msg = await deleteText(pathInfo, sendData);
      if (msg.success) {
        modalMsgRef.current.innerHTML = '<p className="ev-success">File deleted!</p><p>Redirecting to "Home" in 1 second.</p>';
        updateCurrentUserInfo(setCurrentUser, currentUser.id);
        setTimeout(() => {
          if (true) {
            history.push('');
          }
        }, 1500);
      }
    } catch (err) {
      setErrors(err.errors)
    }
  }

  const modalProps = {modalMsgRef, showModal, handleCloseModal, affirmAction: handleDelete, message: `Delete file titled "${title}"?`}

  // Saving of edits
  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (feedback === '' || feedback === savedMsg) return;

    setErrors([]);
    const wordCount = EDITOR.current.plugins.wordcount.body.getWordCount();
    const source = (textDetails.source.includes('(with additional edits)')
    ? textDetails.source
    : textDetails.source + ' (with additional edits)');
    const content = DOMPurify.sanitize(textDetails.content, {FORBID_TAGS: ['img']});

    const newData ={
            ...textDetails,
            title,
            content,
            source,
            wordCount,
            createdByUserId: currentUser.id
          }

    try {
      const data = await editText(textDetails.id, newData);
      if(data.errors) {
        throw data;
      }
      else {
        setFeedback(savedMsg);
        updateCurrentUserInfo(setCurrentUser, currentUser.id);
        setTimeout(() => setItemData({...data}), 1000);
      }
    } catch (err) {
      // console.error('err', err)
      setErrors(err.errors)
    }
  }

  // Code for Edit of text item
  // Initiated via the Editor Save action (triggered by Editor rerender because of bugs otherwise)
  const handleEditorChange = (content, editor) => {
    setTextDetails({content});
  }

  // Detect changed text
  useEffect(() => {
    let stillMounted = true;
    const init = initialState.current;
    const content = textDetails.content;
    if (title && content
        && (title !== init.title || content !== init.content)
        && stillMounted
      ) {
      setFeedback('You have unsaved changes.');
    } else if (stillMounted) {
      setFeedback('');
    }
    return function cleanUp() {
      stillMounted = false;
    }
  }, [title, textDetails]);

  //Editor styling injection
  useEffect(() => {
    const cssLink = document.createElement("style");
    cssLink.setAttribute('type', 'text/css');
    cssLink.innerHTML = tinyCSS;

    const iframe = document.querySelector('iframe[id^="tiny"]');
    if (iframe) {
      iframe.contentDocument.head.appendChild(cssLink);
    }

  }, [])

  return (
    <div className="ev-text-edit">
      {feedback && <div className={feedback === savedMsg ? 'ev-success' : 'ev-error'}>{feedback}</div>}
      <button ref={doSaveRef} style={{display: 'none', visibility: 'hidden'}} onClick={handleSave}></button>
      { (!!errors.length) &&
        <div className="ev-form-errors" key={`${errors}`}>
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      }
      <Editor
        apiKey={process.env.REACT_APP_TINY_API}
        initialValue={null}
        value={textDetails.content}
        onEditorChange={handleEditorChange}
        init={{
          height: '100%',
          resize: false,
          menu: {
          file: {title: 'File', items: 'save delete | preview | print'},
          edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
          view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
          insert: { title: 'Insert', items: 'link  template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
          format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat' },
          tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
          table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
          help: { title: 'Help', items: 'help' }
          },
          plugins: [
            'advlist autolink lists charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            setup: (editor) => {
              EDITOR.current = editor;

              // Custom Icons for Menu
              editor.ui.registry.addIcon('save', ReactDOMServer.renderToString(<FontAwesomeIcon icon={faSave} />));
              editor.ui.registry.addIcon('trash', ReactDOMServer.renderToString(<FontAwesomeIcon icon={faTrash} />));

              // Custom Menu Items
              editor.ui.registry.addMenuItem('save', {
                icon: 'save',
                text: `Save`,
                onAction: (editor) => {
                  // This callback was enclosing handleSave and not passing updated textDetails data on save, so I needed to have it use a button element outside itself handle the save event.
                  doSaveRef.current.click();
                }
              });
              editor.ui.registry.addMenuItem('delete', {
                icon: 'trash',
                text: 'Delete',
                onAction: () => handleShowModal()
              });
              // Let header know editor is setup to display
              editor.on('LoadContent', function(e) {
                setContentDisplayed(true);
              });
            }
        }}
       />
      <ConfirmModal {...modalProps} />
    </div>
  )

}

export default EditTextForm
