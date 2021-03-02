import React, { useContext, useEffect, useState } from 'react';

import { DBContext } from '../context/DBContext';
import { DirectoryList } from '../components/DirectoryList';

type Props = { match: ts.match };
const SearchResults = (props: Props) => {
  const { db } = useContext(DBContext);
  const [results, setState] = useState([]);
  const { match: { params = {} } = {} } = props;
  const { query = '' } = params;

  useEffect(() => {
    const fetchResults = async () => {
      const results = await db['directory']
        .where('fname')
        .equalsIgnoreCase(query)
        .toArray();

      setState(results);
    };

    fetchResults();
  }, []);

  return (
    <>
      <h1 className='text-3xl font-bold mb-4'>
        Search results for query: {query}
      </h1>
      <DirectoryList
        directory={results}
      />
    </>
  );
}

export default SearchResults;
