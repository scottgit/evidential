import React, {useCallback, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import  {Editor } from '@tinymce/tinymce-react';
import {useDropzone} from 'react-dropzone';
import DOMPurify from "dompurify";
import {uploadText} from '../../services/text';
import FAI from '../includes/FAI';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

const AddTextForm = ({currentUser, handleCloseModal}) => {
  const [editor, setEditor] = useState('');
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [textDetails, _setTextDetails] = useState({
    content: '',
    source: ''
  })
  const [title, setTitle] = useState('');
  const setTextDetails = useCallback((details) => {
    _setTextDetails({...textDetails, ...details});
    return;
  }, [textDetails]);
  const history =  useHistory();


  // GOAL is to support these document types at least
  // const accepted = '.htm, .html, .txt, .rtf, .pdf, .doc, .docx, .md';
  const accepted = '.htm, .html, .txt, .md';

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const res = reader.result
        const content = DOMPurify.sanitize(res, {FORBID_TAGS: ['img']});
        setTextDetails({
          content,
          source: file.path,
        })

      }
      reader.readAsText(file)
    })
  }, [setTextDetails])

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: accepted,
    maxFiles: 1,
    minSize: 1,
    maxSize: 1000000,
    onDrop,
    multiple: false,
  });

  const acceptedFileItem = acceptedFiles.map(file => (
    <span key={file.path}>
      {file.path} - {file.size} bytes
    </span>
  ));

  const rejectedFileItem = fileRejections.map(({ file, errors  }) => {
    return (
      <span key={file.path}>
           {file.path} - {file.size} bytes
           <ul>
             {errors.map(e => <li key={e.code}>{e.message}</li>)}
          </ul>
      </span>
    )
   });

   useEffect(() => {
    if (title && textDetails.content && textDetails.source && acceptedFiles.length) {
      setReadyToSubmit(true);
    } else {
      setReadyToSubmit(false);
    }
  }, [title, textDetails, acceptedFiles])

  const handleTitleInput = (e) => {
    setTitle(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const createdByUserId = currentUser.id;
    const wordCount = editor.plugins.wordcount.body.getWordCount();
    try {
      const text = await uploadText({
        title,
        ...textDetails,
        wordCount,
        createdByUserId
      })
      if ('id' in text) {
        handleCloseModal();
        setTimeout(() => history.push(`/text/edit/${text.id}`), 400)
      }

    } catch (err) {
      console.error('Failed to upload text:' + err)
    }


  }

  return (
    <form className="ev-text-upload" onSubmit={handleSubmit}>
      <h3>Text File Upload</h3>
      <input type="text" className="ev-title-input" value={title} placeholder="Please input text title here." onChange={handleTitleInput} required={true} maxLength="200" />
      <div {...getRootProps({className: "ev-drop-zone"})}  >
        <div className="ev-file-drop" >
          Drag'n'drop a local text file here or click to select one.
            <div className="ev-text-upload-status">
            {!!acceptedFileItem.length && <span className="ev-success">File accepted: {acceptedFileItem}</span>}
            {!!rejectedFileItem.length && <span className="ev-error">File rejected: {rejectedFileItem}</span>}
          </div>
        </div>
      </div>
      <input id="drop-input" {...getInputProps()} />
      {readyToSubmit &&
            <button className="ev-button icon submit" type="submit">
              <FAI icon={faFileUpload} title={`Upload file`} tabIndex="0"/>
            </button>
          }


      <Editor
         apiKey={process.env.REACT_APP_TINY_API}
         initialValue={textDetails.content}
         value={textDetails.content}
         init={{
           setup: (editor) => {setEditor(editor); editor.hide()},
           menubar: false,
           plugins: ['wordcount'],
           toolbar: false,
           body_id: 'ev-editor'
         }}
       />
    </form>
  )
}

export default AddTextForm
