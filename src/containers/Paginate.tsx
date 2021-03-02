import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import * as H from 'history';
import React from 'react';

import { getSliceOfArray } from '../utils/getSliceOfArray';

// normally, I would separate types, constants, etc, into a separate file
// and group everything in folders
type Props = RouteComponentProps<any> & {
  count?: number,
  items: ts.Directory,
  location: H.Location,
  render: (itemsToRender: ts.Directory) => React.ReactNode,
};

const PaginateContainer = (props: Props) => {
  const { count = 12, items = [], match: { params = {} } = {} } = props;
  const { page = 1 } = params;
  const activePage = parseInt(page, 10);

  // a _.range equivalent. sort of, for rendering the pagination
  const pageCount = Math.ceil(items.length / count);
  const pages = Array(pageCount).fill(null);

  // takes the items to render and slices it to match the current page
  const itemsToRender = getSliceOfArray({
    count,
    offset: activePage,
    items,
  });

  return (
    <>
      {props.render(itemsToRender)}
      <div className="overflow-scroll p-1 mt-4">
        <ul className='flex flex-row justify-center'>
          <li>
            {activePage <= 1 && 'Previous'}
            {activePage > 1 && (
              <Link
                to={`/${activePage - 1}`}
                className="underline block ml-2 mr-2" >
                Previous
              </Link>
            )}
          </li>
          {pages.map((_, i) => {
            const pageNo = i + 1;
            const isActive = activePage === pageNo;
            const to = `/${pageNo}`;

            return (
              <li key={i}>
                {isActive && (
                  <span className="font-extrabold block ml-2 mr-2">
                    {pageNo}
                  </span>
                )}
                {!isActive && (
                  <Link
                    to={to}
                    className="underline block ml-2 mr-2" >
                    {pageNo}
                  </Link>
                )}
              </li>
            );
          })}
          <li>
            {activePage >= pages.length - 1 && 'Next'}
            {activePage < pages.length - 1 && (
              <Link
                to={`/${activePage + 1}`}
                className="underline block ml-2 mr-2" >
                Next
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export const Paginate = withRouter(PaginateContainer);
