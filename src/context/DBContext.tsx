import React, { useEffect, useState } from 'react';
import Dexie from 'dexie';

// this ts class just exists to satisfy typescript, code completion
class DirectoryDB extends Dexie {
  directory: Dexie.Table<ts.DirectoryListing, number>;

  constructor() {
    super('postlightCodeChallenge');

    // define schema, if not already exists
    this.version(1).stores({
      directory: '++,id,uuid,fname,lname,email,phone,photo,title',
    });
  }
}

// initialize indexDB database if not already done
const db = new DirectoryDB();
db.open().catch(err => {
  console.error(err.stack || err);
});

type Props = { children: React.ReactNode };
export const DBProvider = (props: Props) => {
  const [directory, setState] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const directoryTable = await db['directory'].toArray()
      if (Array.isArray(directoryTable) && directoryTable.length > 0) {
        return setState(directoryTable);
      }

      const json = await fetch('https://randomuser.me/api?results=250')
        .then(res => res.json());

      const { results }: { results: ts.ApiResult[] } = json;

      const mappedResults = results.map((result: ts.ApiResult, i) => ({
        id: i + 1,
        uuid: result.id.value,
        fname: result.name.first,
        lname: result.name.last,
        email: result.email,
        phone: result.phone,
        photo: result.picture.large,
        title: result.name.title,
      }));

      await db['directory'].bulkAdd(mappedResults);
      setState(mappedResults);
    };

    fetchData();
  }, []);

  return (
    <DBContext.Provider value={{ directory, db }}>
      {props.children}
    </DBContext.Provider>
  );
}

export const DBContext = React.createContext(null);
