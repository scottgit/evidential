import React, {useCallback, useState} from 'react';
import  {Editor } from '@tinymce/tinymce-react';
import {useDropzone} from 'react-dropzone';

const AddTextForm = (props) => {
  const [text, setText] = useState('');
  const [evEditor, setEvEditor] = useState(null)
  const accepted = '.htm, .html, .txt, .rtf, .pdf, .doc, .docx';

  const onDrop =  useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const displayDiv = document.getElementById('sample');
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const res = reader.result
        setText(res);
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


  const handleEditorChange = (content, editor) => {
    setText(content)
  }

  return (
    <div className="ev-text-upload">
      <h3>Text File Upload</h3>
      <div {...getRootProps({className: "ev-drop-zone"})}  >

        <p className="ev-file-drop" >
        {/* {isDragAccept && "All files will be accepted"}
        {isDragReject && "Some files will be rejected"} */}
        {"Drag'n'drop a local text file here or click to select one."}
        </p>
      </div>
      <input id="drop-input" {...getInputProps()} />
      <Editor
         apiKey={process.env.REACT_APP_TINY_API}
         initialValue="<p>This is the initial content of the editor</p>"
         value={text}
         init={{

           height: 500,
           menubar: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         onEditorChange={handleEditorChange}
       />
    </div>
  )
}

export default AddTextForm
