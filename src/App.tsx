import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

import { DBProvider } from './context/DBContext';

const Home = lazy(() => import('./pages/Home'));
const User = lazy(() => import('./pages/User'));
const SearchResults = lazy(() => import('./pages/SearchResults'));

export const App = () => (
  <BrowserRouter>
    <Suspense fallback={<>Loading...</>}>
      <Switch>
        <DBProvider>
          <main className="dark:bg-gray-700 dark:text-white p-20">
            <Route exact path="/:page?" component={Home} />
            <Route path="/user/:id" component={User} />
            <Route path="/search/:query" component={SearchResults} />
          </main>
        </DBProvider>
      </Switch>
    </Suspense>
  </BrowserRouter>
);
