import {useEffect, useMemo} from 'react';

/*
  This function has mounting checks and try conditions in place to alleviate any issues with component mounting and errors

  Use a useMemo to set a single variable as a dependency trigger for the use effect, but use that Memo's dependency list as the actual triggers
*/

const useEffectAsyncSafeFetch = ({
  initCb=() => null,        //Bundled processes to run before any checks
  actionCondition=true,     //Condition to make fetch
  fetchFn,                  //Fetch function to use
  pathEndpoint='',          //Unique path string for that function resolve; default is no additonal
  fetchData,                //Data needed by fetch function
  successCb=(data) => data, //Bundled processes to run if success
  backupCondition=false,    //Secondary condition check; bipassed by default
  backupCb=() => null,      //Bundled processes to run if backup condition is instead successful
  defaultCb=() => null,     //Default action if no errors, but also no conditional successes
  errorCb=(err) => err,     //Bundled processes to handle error conditions
}, dependencyMemo) => {     //The standard useEffect dependency array set to memoize in the main function down to a single value to show change needed state params

  // Make all parameters memoized so that they only update and trigger useEffect if needed
  initCb          = useMemo(() => initCb, [initCb]);
  actionCondition = useMemo(() => actionCondition, [actionCondition]);
  fetchFn         = useMemo(() => fetchFn, [fetchFn]);
  pathEndpoint    = useMemo(() => pathEndpoint, [pathEndpoint]);
  fetchData       = useMemo(() => fetchData, [fetchData]);
  successCb       = useMemo(() => successCb, [successCb]);
  backupCondition = useMemo(() => backupCondition, [backupCondition]);
  backupCb        = useMemo(() => backupCb, [backupCb]);
  defaultCb       = useMemo(() => defaultCb, [defaultCb]);
  errorCb         = useMemo(() => errorCb, [errorCb]);

  useEffect(() => {
    if (!fetchFn) return; // Setting no function causes no useEffect operation
    // Variable to insure mounting of component is still true on return of async
    let stillMounted = true;
    try {
      // Do any initialization before doing check
      initCb();
      // Check if the effect should actually run
      if (actionCondition) {
        // Perform the fetch request
        (async () => {
          const data = await fetchFn(pathEndpoint, fetchData);
console.log(data);
          if (stillMounted) {
            // DB errors come through as "clean" from fetch and need handled here
            if (data.errors) {
              errorCb(data);
            }
            else {
console.log('IN SUCCESS')
            // Process successful fetch
              successCb(data);
            }
          }
        })();
      }
      else if (backupCondition && stillMounted) {
console.log('IN BACKUP')
        // Process conditional backup plans if fetch not being done
        backupCb()
      }
      else if (stillMounted) {
        // Do default (which by default is set to do nothing; let effect do without processing)
console.log('IN DEFAULT')
        defaultCb()
      }
    } catch (err) {
console.log('IN ERROR')
      if (stillMounted) {
        // Other errors get handled here
        errorCb(err);
      }
    }
    // This clears any processes from running if component dismounts
    return function cleanUp() {
      stillMounted = false;
    }
    // Pass dependencies to useEffect
  }, [
    // initCb,
    // actionCondition,
    // fetchFn,
    // pathEndpoint,
    // fetchData,
    // successCb,
    // backupCondition,
    // backupCb,
    // defaultCb,
    // errorCb,
    dependencyMemo
  ]);

}

export default useEffectAsyncSafeFetch
