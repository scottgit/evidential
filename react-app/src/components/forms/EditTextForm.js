import React, {useRef, useState, useEffect} from 'react';
import ReactDOMServer from 'react-dom/server';
import  {Editor } from '@tinymce/tinymce-react';
import DOMPurify from "dompurify";
import {editText} from '../../services/text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';



const EditTextForm = ({currentUser, itemData, title, setTitle, setItemData}) => {
  const EDITOR = useRef();
  const [feedback, setFeedback] = useState('');
  const [textDetails, _setTextDetails] = useState({})
  const initialState = useRef({...itemData});
  const [editorKey, setEditorKey] = useState(0);
  const [errors, setErrors] = useState([]);

  const setTextDetails = (details) => {
    _setTextDetails({...textDetails, ...details});
  };
  if (!textDetails.content) {
    setTextDetails(initialState.current);
  }

  const handleDelete = (e) => {
    alert('You tried to delete!')
  }

  const handleEditorChange = (content, editor) => {
    const wordCount = EDITOR.current.plugins.wordcount.body.getWordCount();
    setTextDetails({content, wordCount});
  }

  const EditorComp = (
    <Editor
        key={editorKey}
        apiKey={process.env.REACT_APP_TINY_API}
        initialValue={null}
        value={textDetails.content}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
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
                  // This callback was enclosing handleSave and not passing updated textDetails data on save, so I needed to have it set its own key property on save to update it and push the handleSave into the setup of the editor.
                  setEditorKey(Date.now());
                }
              });
              editor.ui.registry.addMenuItem('delete', {
                icon: 'trash',
                text: 'Delete',
                onAction: () => handleDelete()
              });
            }
        }}
       />
  )

  useEffect(() => {

    const handleSave = async () => {
      if (feedback === '' || feedback === 'Saved!') return;
      setErrors([]);

      try {
        const source = (textDetails.source.includes('(with additional edits)')
                      ? textDetails.source
                      : textDetails.source + ' (with additional edits)');
        const content = DOMPurify.sanitize(textDetails.content, {FORBID_TAGS: ['img']});

        const text = await editText({
          ...textDetails,
          title,
          content,
          source,
          createdByUserId: currentUser.id
        })

        if (!text.errors) {
          setFeedback('Saved!');
          // setTextDetails({...text});
          // Save at a higher level to update all links
          setTimeout(() => setItemData({...text}), 500);
          // setTitle(text.title);
        } else {
          throw Error(text.errors)
        }

      } catch (err) {
        setFeedback('***ERROR***: Failed to save! ');
        console.error(err)
        setErrors(err)
      }
    }

    handleSave()
  }, [editorKey]) //Editor key change is triggered on a save action

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
  }, [title, textDetails])




  return (
    <div className="ev-text-edit">
      {feedback && <div className={feedback === 'Saved!' ? 'ev-success' : 'ev-error'}>{feedback}</div>}
      { (!!errors.length) &&
        <div className="ev-form-errors" key={`${errors}`}>
          {errors.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </div>
      }
      {EditorComp}
    </div>
  )

}

export default EditTextForm
