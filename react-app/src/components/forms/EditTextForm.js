import React, {useRef, useState, useEffect, useCallback} from 'react';
import ReactDOMServer from 'react-dom/server';
import  {Editor } from '@tinymce/tinymce-react';
import DOMPurify from "dompurify";
import {editText} from '../../services/text';
import FAI from '../includes/FAI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { text } from '@fortawesome/fontawesome-svg-core';

const EditTextForm = ({currentUser, itemData, title, setTitle, setItemData}) => {
  const EDITOR = useRef();
  const [feedback, setFeedback] = useState('');
  const [textDetails, _setTextDetails] = useState({
    id: itemData.id,
    title: itemData.title,
    content: itemData.content,
    source: itemData.source,
    wordCount: itemData.wordCount
  })
  const initialState = useRef({...itemData});
  const [editorKey, setEditorKey] = useState(itemData.content);

  const setTextDetails = (details) => {
    const newData = {...textDetails, ...details};
    _setTextDetails(newData);
    setItemData({...itemData, ...newData})
  };

  useEffect(() => {
    if (feedback !== 'You have unsaved changes.') return;
    handleSave()
  }, [editorKey])

  useEffect(() => {
    const init = initialState.current;
    const content = textDetails.content;
    if (title && content
        && (title !== init.title || content !== init.content)
      ) {
      setFeedback('You have unsaved changes.');
    } else {
      setFeedback('');
    }
  }, [title, textDetails])

  const getTextDetails = () => textDetails;
  const getEditor = () => EDITOR;

  const handleSave = async () => {
    const wordCount = EDITOR.current.plugins.wordcount.body.getWordCount();
    const source = (textDetails.source.includes('(with additional edits)')
                    ? textDetails.source
                    : textDetails.source + ' (with additional edits)');
    const content = DOMPurify.sanitize(textDetails.content, {FORBID_TAGS: ['img']});
    console.log('HANDLE', textDetails);
    try {
      const text = await editText({
        id: textDetails.id,
        title,
        content: DOMPurify.sanitize(textDetails.content, {FORBID_TAGS: ['img']}),
        wordCount,
        source,
        createdByUserId: currentUser.id
      })
      setTextDetails({...text});
      setItemData({...text});
      setTitle(text.title);
      setFeedback('Saved!');
    } catch {
      setFeedback('***ERROR***: Failed to save! ');
    }
  }


  const handleDelete = (e) => {
    alert('You tried to delete!')
  }

  const handleEditorChange = (content, editor) => {
    setTextDetails({content});
  }
  // setTimeout(handleSave, 100);
  return (
    <div className="ev-text-edit">
      {feedback && <span className={feedback === 'Saved!' ? 'ev-success' : 'ev-error'}>{feedback}</span>}
      <button onClick={handleSave}>TEST</button>
      <Editor
        key={editorKey}
        apiKey={process.env.REACT_APP_TINY_API}
        initialValue={textDetails.content}
        value={textDetails.content}
        onEditorChange={handleEditorChange}
        init={{
          setup: (editor) => {
          EDITOR.current = editor;

          // Custom Icons for Menu
          editor.ui.registry.addIcon('save', ReactDOMServer.renderToString(<FontAwesomeIcon icon={faSave} />));
          editor.ui.registry.addIcon('trash', ReactDOMServer.renderToString(<FontAwesomeIcon icon={faTrash} />));

          // Custom Menu Items
          editor.ui.registry.addMenuItem('save', {
            icon: 'save',
            text: `Save`,
            onAction: () => {
              // This callback was enclosing handleSave and not updating textDetails data, so I needed to have it set its own key property on save to update it and push the handleSave out of the Editor component to get a true update.
              setEditorKey(editor.getContent());
            }
          });
          editor.ui.registry.addMenuItem('delete', {
            icon: 'trash',
            text: 'Delete',
            onAction: () => handleDelete()
          });

        },
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
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
       />
    </div>
  )

}

export default EditTextForm
