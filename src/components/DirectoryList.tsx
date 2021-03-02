import React from 'react';
import { Link } from 'react-router-dom';

type Props = { directory: ts.Directory }
export const DirectoryList = (props: Props) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {props.directory.map((d, i) => (
      <li key={i}>
        <Link
          to={`/user/${d.id}`}
          className="bg-gray-100 dark:bg-gray-700 border flex flex-col items-center p-2 rounded-lg text-center hover:nudge transition-transform">
          <img
            alt=""
            className="mb-1.5 rounded-full"
            height="128"
            src={d.photo}
            width="128"
          />
          {d.fname} {d.lname}
        </Link>
      </li>
    ))}
  </ul>
);
