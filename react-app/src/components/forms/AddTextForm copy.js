import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';



const AddTextForm = (props) => {
  // TODO Bug that causes extreme firing of cspanck events, related to the dropzone and possibly as well to the interaction with the modal.

  const accepted = '.htm, .html, .txt, .rtf, .pdf, .doc, .docx';

  // const onDrop = (acceptedFiles) => {
  //   console.log(acceptedFiles)

  //     const urlInput = document.getElementById('url-input');
  //     urlInput.value = null;
  //     setAcceptedFileItem(acceptedFiles)
  // }

  // const toggleUpdated = () => {
  //   console.log('toggle')
  //   setUpdated(!updated)
  // }

  // console.log('acc', acceptedFileItem)

  const onDrop =  useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const displayDiv = document.getElementById('sample');
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const text = reader.result
        displayDiv.innerHTML = text;
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


  // async function setAcceptedFileItem (item) {
  //   console.log('running')
  //   if (Array.isArray(item)) {
  //     console.log('array')
  //     _setAcceptedFileItem(
  //       acceptedFiles.map(file => (
  //         <span key={file.path}>
  //           {file.path} - {file.size} bytes
  //         </span>
  //       ))
  //     )
  //   }
  //   else if (accepted.spspant(',').includes(path.extname(item))) {
  //     console.log('str')
  //     _setAcceptedFileItem(
  //       <span key={item}>
  //         {item} {`(size unknown)`}
  //       </span>
  //     )
  //   }
  //   await toggleUpdated();
  // }


  // const rejectedFileItem = fileRejections.map(({ file, errors }) => (
  //   <span key={file.path}>
  //     {file.path} - {file.size} bytes
  //     <ul>
  //       {errors.map(e => (
  //         <span key={e.code}>{e.message}</span>
  //       ))}
  //     </ul>
  //   </span>
  // ));

  // const handleURLDrop = (e) => {
  //   e.preventDefault();
  //   const dropInput = document.getElementById('drop-input');
  //   dropInput.value = null;
  //   e.target.value = e.dataTransfer.getData('URL');
  // }

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

  return (
    <div className="ev-text-upload">
      <h3>Text File Upload</h3>
      <p>Accepted file types: {accepted}</p>
      <div>
      <div {...getRootProps({className: "ev-drop-zone"})}  >

        <p className="ev-file-drop" >
        {/* {isDragAccept && "All files will be accepted"}
        {isDragReject && "Some files will be rejected"} */}
        {"Drag'n'drop a local text file here or click to select one."}
        </p>
      </div>
      <input id="drop-input" {...getInputProps()} />
      </div>
      {/* <div className="ev-or">or</div> */}
      {/* <input id="url-input" className="ev-url-input" type="text" onDrop={handleURLDrop} placeholder="Drag'n'drop or paste a URL string here to grab a text file from the internet."/> */}
      <aside className="ev-text-upload-status">
        {!!acceptedFileItem.length && <span className="ev-success">File accepted: {acceptedFileItem}</span>}
        {!!rejectedFileItem.length && <span className="ev-error">File rejected: {rejectedFileItem}</span>}
      </aside>
      <div id="sample">
        </div>
    </div>
  )
}

export default AddTextForm
