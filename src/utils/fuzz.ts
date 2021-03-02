// this is a fuzzy matching algo that i got from npm a long time
// i dont remember the original package, it's been tweaked a bunch anyway
// good for "soft", quick, "searches" (filtering) when you have data already

type tObjWithScore = {
  [key: string]: any,
  score: number,
};

type tOpts = {
  // if dealing with a big list, we might want to filter it first by some criteria
  prefilter?: { key: string, value: string },
  input?: ts.Directory,
  key?: 'fname',
  search?: string,
};


// return numeric score based on fuzzy match strength
// If `pattern` matches `string`, wrap each matching character
export const fuzzyScore = (search: string = '', string: string = '') => {
  const result = [];
  const len = string.length;
  let totalScore = 0;
  let currScore = 0;

  // string to compare against, whitespace removed
  // this might be a lowercase version of the raw string
  const compareString = string.toLowerCase();
  // string to search with
  const pattern = search.toLowerCase();
  let ch;

  // For each character in the string, either add it to the result
  // or wrap in template if it's the next string in the pattern
  let idx = 0;
  let patternIdx = 0;
  for (idx; idx < len; idx++) {
    ch = string[idx];
    if (compareString[idx] === pattern[patternIdx]) {
      patternIdx += 1;

      // consecutive characters should increase the score more than linearly
      currScore += 1 + currScore;
    } else {
      currScore = 0;
    }

    totalScore += currScore;
    result[result.length] = ch;
  }

  return totalScore;
};

// takes an array of objects, returns a sorted and filtered array
// defaults to fuzzy matching against a 'name' key
// but can filter by any key, as long as the value is a string
export const fuzzFilterList = (opts: tOpts): ts.Directory => {
  let { input = [] } = opts;
  const { key, search } = opts;

  if (!key && search === '') return input;

  if (key && search === '') {
    const filtered = input.filter(item => {
      const doesItMatch = item[key] !== key;
      return doesItMatch;
    });
    return filtered;
  }

  const scores = input.map(obj => {
    const tokens = [obj[key], ...obj[key].split(' ')] as string[];
    let score = 0;
    tokens.map(token => {
      const tokenScore = fuzzyScore(search, token);
      if (tokenScore > score) score = tokenScore;
    });

    return { ...obj, score };
  });

  const scoresAboveZero = scores.filter((obj: tObjWithScore) => obj.score > 0);

  return scoresAboveZero.sort((
    a: tObjWithScore,
    b: tObjWithScore) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  });
};
