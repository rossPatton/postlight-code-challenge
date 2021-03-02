import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { DBContext } from '../context/DBContext';
import { DirectoryList } from '../components/DirectoryList';
import { Paginate } from '../containers/Paginate';
import { fuzzFilterList } from '../utils/fuzz';

const Home = withRouter((props) => {
  const { directory }: { directory: ts.Directory } = useContext(DBContext);
  const [search, setState] = useState('');
  const [filterKey, onChange] = useState('');

  const filteredDirectory = directory.filter(item => {
    if (!filterKey) return true;
    return item.title === filterKey;
  });

  // this allows you to sort in real time as you type
  const directoryToRender = fuzzFilterList({
    input: filteredDirectory || [],
    key: 'fname',
    search,
  });

  return (
    <>
      <div className="flex flex-row items-baseline justify-center">
        <form
          className="flex justify-center mr-4 w-3/12"
          // this will do an actual DB query and redirect to a results page
          onSubmit={() => {
            props.history.push(`/search/${search}`);
          }}>
          <input
            autoComplete="on"
            className="dark:bg-gray-700 border mb-4 p-2 pl-4 pr-4 rounded-md text-center w-full"
            type="search"
            placeholder="Search for someone by name"
            onChange={ev => setState(ev.currentTarget.value)}
            value={search}
          />
        </form>
        <select
          // you need to fix the pagination bug
          className="dark:bg-gray-700 border p-3 rounded-md w-3/12"
          onChange={ev => onChange(ev.currentTarget.value)}>
          <option value="">Or filter by title:</option>
          <option value="Mr">Mr</option>
          <option value="Miss">Miss</option>
          <option value="Mrs">Mrs</option>
        </select>
      </div>
      {directoryToRender && (
        <Paginate
          items={directoryToRender}
          render={(paginatedDirectory) => (
            <DirectoryList
              directory={paginatedDirectory}
            />
          )}
        />
      )}
    </>
  );
});

export default Home;
