import pluralize from 'pluralize';

export default function pluralizeCheck (hitKeys) {
  const expandedKeys = [...hitKeys];

  for (let i=0; i<hitKeys.length; i++) {
    const key = hitKeys[i];
    const words = key.split(" ");

    // Build array of potential plural/single word mirrors
    for (let j=0; j<words.length; j++) {
      const word = words[j];
      let otherForm = '';
      if (pluralize.isSingular(word)) {
        otherForm = pluralize.plural(word);
      }
      else if (pluralize.isPlural(word)) {
        otherForm = pluralize.singular(word);
      }

      if (otherForm) {
        expandedKeys.push(key.replace(word, otherForm));
      }
    }
  }
  return expandedKeys;
}
