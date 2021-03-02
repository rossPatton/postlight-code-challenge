import React, { useContext, useEffect, useState } from 'react';

import { DBContext } from '../context/DBContext';

type Props = { match: ts.match };
const User = (props: Props) => {
  const { db } = useContext(DBContext);
  const [user, setState] = useState({} as ts.DirectoryListing);
  const { match: { params = {} } = {} } = props;
  const { id = '1' } = params;

  useEffect(() => {
    const fetchUser = async () => {
      const user = await db['directory']
        .where('id')
        .equals(parseInt(id, 10))
        .first();

      setState(user);
    };

    fetchUser();
  }, []);

  if (!user) return (
    <>404! Nobody here!</>
  );

  return (
    <div className='flex flex-col justify-center text-center items-center animate-fade-in-up transition-all'>
      <img
        alt=""
        className="mb-2 rounded-full"
        height="128"
        src={user.photo}
        width="128"
      />
      <h1 className='text-4xl font-bold'>
        {user.fname} {user.lname}
      </h1>
      <h2 className='text-3xl'>
        {user.email}
      </h2>
      <h3 className='text-2xl'>
        {user.phone}
      </h3>
    </div>
  );
}

export default User;
