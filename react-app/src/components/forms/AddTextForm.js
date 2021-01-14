import React, {useCallback, useState} from 'react';
import  {Editor } from '@tinymce/tinymce-react';
import {useDropzone} from 'react-dropzone';
import DOMPurify from "dompurify";
// import uploadText from

const AddTextForm = ({currentUser}) => {
  const [editor, setEditor] = useState('');
  const [textDetails, _setTextDetails] = useState({
    title: '',
    content: '',
    source: '',
    wordCount: ''
  })
  const setTextDetails = (details) => {
    _setTextDetails({...textDetails, ...details});
    return;
  };
  console.log(textDetails)
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
          title: '',
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

  const handleTitleInput = (e) => {
    setTextDetails({title: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdByUserId = currentUser.id;
    const wordCount = editor.plugins.wordcount.body.getWordCount();
    // const wordCount = editorWordCount.body.getWordCount();
    // console.log({...textDetails, wordCount})
  }

  return (
    <form className="ev-text-upload">
      <h3>Text File Upload</h3>
      <div {...getRootProps({className: "ev-drop-zone"})}  >
        <p className="ev-file-drop" >
        {/* {isDragAccept && "All files will be accepted"}
        {isDragReject && "Some files will be rejected"} */}
        {"Drag'n'drop a local text file here or click to select one."}
        </p>
      </div>
      <input id="drop-input" {...getInputProps()} />
      <div className="ev-text-upload-status">
        {!!acceptedFileItem.length && <span className="ev-success">File accepted: {acceptedFileItem}</span>}
          {!!rejectedFileItem.length && <span className="ev-error">File rejected: {rejectedFileItem}</span>}
      </div>
      <input type="text" value={textDetails.title} placeholder="Input title" onChange={handleTitleInput} required={true} maxLength="200" />
      <button type='submit' onClick={handleSubmit}>Upload</button>
      <Editor
         className
         apiKey={process.env.REACT_APP_TINY_API}
         initialValue={textDetails.content}
         value={textDetails.content}
         init={{
           setup: (editor) => setEditor(editor),
           height: 0,
           menubar: false,
           plugins: ['wordcount'],
           toolbar: false,
         }}
       />
    </form>
  )
}

export default AddTextForm
