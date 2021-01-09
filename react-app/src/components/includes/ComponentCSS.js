import React from 'react'

const CSSImport = React.lazy(({cssFilePath}) => import(cssFilePath))

const ComponentCSS = ({children, cssFilePath=false}) => {
  return (
    <>
      <React.Suspense fallback={() => null}>
        {cssFilePath && <CSSImport cssFilePath={cssFilePath} />}
      </React.Suspense>
      {children}
    </>
  )
}

export default ComponentCSS;
