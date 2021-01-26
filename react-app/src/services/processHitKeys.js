export default function processHitKeys (str) {
  const array =  str.trim()         //Remove white space at ends
                    .split(',')     //Commas are the separators for keys
                    .map(key => {
                      return (      // Remove most punctuation not tied to a word
                        key.replace(/[^\w][.\/#!$%\^\*;:{}=\-_`~()]+[^\w]/g," ")
                           .replace(/\s\s+/g, ' ') //and multiple spaces in phrased keys
                           .trim()   //Cleanup extra white space around keys
                      )
                    })
                    .filter(key => {  //Filter for disallowed keys
                      return key !== ''
                    });

  return array
}
