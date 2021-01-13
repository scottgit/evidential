import React from 'react';
import {useDropzone} from 'react-dropzone';


const AddTextForm = (props) => {

  const onDrop = (e) => {
    console.log('Did drop');
  }

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'text/html, text/plain, .doc, .pdf, .docx',
    maxFiles: 1,
    onDrop: onDrop,
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors  }) => {
    return (
      <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map(e => <li key={e.code}>{e.message}</li>)}
          </ul>

      </li>
    )
  });

  const handleURLDrop = (e) => {
    console.log(e.dataTransfer.getData('URL'))
  }


  return (
    <>
      <div {...getRootProps({className: "ev-drop-zone"})}>
        <input {...getInputProps()} />
        {isDragAccept && (<p>All files will be accepted</p>)}
        {isDragReject && (<p>Some files will be rejected</p>)}
        {!isDragActive && (<p>Drop some files here ...</p>)}
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
      <input type="text" onDrop={handleURLDrop}/>
    </>
  )
}

export default AddTextForm
