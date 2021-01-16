import React, {useCallback, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import  {Editor } from '@tinymce/tinymce-react';
import {useDropzone} from 'react-dropzone';
import DOMPurify from "dompurify";
import {uploadText} from '../../services/text';
import FAI from '../includes/FAI';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

const EditTextForm = ({currentUser, handleCloseModal, itemData, title, handleTitleInput}) => {
  const [editor, setEditor] = useState('');
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [textDetails, _setTextDetails] = useState({
    content: itemData.content,
    source: itemData.source
  })



  const setTextDetails = (details) => {
    _setTextDetails({...textDetails, ...details});
    return;
  };

  const history =  useHistory();

  useEffect(() => {
    if (title && textDetails.content && textDetails.source) {
      setReadyToSubmit(true);
    } else {
      setReadyToSubmit(false);
    }
  }, [title, textDetails])

  // console.log(textDetails)
  // const accepted = '.htm, .html, .txt, .rtf, .pdf, .doc, .docx, .md';
  const accepted = '.htm, .html, .txt, .md';

  const onDrop =  useCallback((acceptedFiles) => {
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

  }, [])

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: accepted,
    maxFiles: 1,
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

    } catch {
      console.error('Failed to upload text.')
    }


  }

  return (
    <form className="ev-text-edit" onSubmit={handleSubmit}>
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
            <button className="icon submit" type="submit">
              <FAI icon={faFileUpload} title={`Upload file`} tabIndex="0"/>
            </button>
          }


      <Editor
         apiKey={process.env.REACT_APP_TINY_API}
         initialValue={textDetails.content}
         value={textDetails.content}
         init={{
           setup: (editor) => {setEditor(editor);},
           height: 500,
           menubar: true,
           plugins: [
             'advlist autolink lists charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
       />
    </form>
  )
}

export default EditTextForm
