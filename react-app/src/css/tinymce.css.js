// A js file to store this text string to set css for the tinymce editor
const tinyCSS = `
  /* Copy of key scrollbar props from main css
    to insert into head of iframe html for TinyMCE
  */

  html {
    --primary-color-light: rgb(183, 183, 212);
    --primary-color-dark: rgb(85, 26, 139);
    }

  * {

    scrollbar-width: 12px;
  }


  *::-webkit-scrollbar-track,
  *::-webkit-scrollbar-corner {
    background: var(--primary-color-light);
  }

  *::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--primary-color-dark);
    border-radius: 6px;
    border: 1px solid rgba(204, 203, 203, 0);
    background-clip: padding-box;
  }
`
export default tinyCSS;
