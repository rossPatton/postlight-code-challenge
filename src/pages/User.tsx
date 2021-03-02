import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import * as H from 'history';
import React, { useContext, useEffect, useState } from 'react';
import { remove } from 'lodash';

import { DBContext } from '../context/DBContext';

type Props = RouteComponentProps<any> & { location: H.Location, match: ts.match };
const User = withRouter((props: Props) => {
  const { db, directory } = useContext(DBContext);
  const [user, setState] = useState({} as ts.DirectoryListing);
  const [userIsDeleted, setIsDeleted] = useState(false);
  const { match: { params = {} } = {} } = props;
  const { id = '1' } = params;
  const idNum = parseInt(id, 10);

  const deleteUser = async () => {
    await db['directory'].delete(idNum);
    remove(directory, (item: ts.DirectoryListing) => item.id === idNum);
    setIsDeleted(true);
    setTimeout(() => {
      props.history.push('/postlight-code-challenge/');
    }, 1000);
  }

  useEffect(() => {
    const fetchUser = async () => {
      const user = await db['directory']
        .where('id')
        .equals(idNum)
        .first();

      setState(user);
    };

    fetchUser();
  }, []);

  if (!user) return (
    <>404! Nobody here!</>
  );

  if (userIsDeleted) {
    return (
      <h1 className='text-4xl font-bold text-center'>
        User deleted!
      </h1>
    );
  }

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
      <h3 className='text-2xl mb-4'>
        {user.phone}
      </h3>
      <button
        onClick={deleteUser}
        className='p-3 border rounded-md'>
        Delete this user
      </button>
    </div>
  );
})

export default User;
