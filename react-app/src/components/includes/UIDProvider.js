import React, {useRef, createContext} from 'react';

const UIDContext = createContext()

const UIDProvider = ({passToGroup, children}) => {

  const uniqueIdRef = useRef(0);
  // Make a single child into an array for purpose of the map to come
  if (!Array.isArray(children)) children = [children];

  return (
    <UIDContext.Provider value={uniqueIdRef}>
      <UIDContext.Consumer >
        {(uniqueIdRef) =>  (children.map((child, idx) => {
          let passProps = {key: `uid-child-${uniqueIdRef.current}-${idx}`};
          if (passToGroup) {
            //Pass the Ref down a level to a grouping component
            passProps = {...passProps, uniqueIdRef}
          }
          else {
            //Update and pass the uid
            ++uniqueIdRef.current;
            passProps = {...passProps, uniqueId: uniqueIdRef.current}
          }
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {...passProps});
          }
          return child;
        }))}
      </UIDContext.Consumer>
    </UIDContext.Provider>
  )
}

export default React.memo(UIDProvider);
